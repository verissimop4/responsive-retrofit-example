# Site Functions
# -----------------------------


# Table "dump"
# i.e. Convert tables to divs and spans
#
# EXAMPLE::
#
# table_dump(".//table") {
#   $("./div[class='some_class']") {
#     add_class("mw_more_scopes")
#   }
# }
#
@func XMLNode.table_dump(Text %xpath){
  $(%xpath) {
    name("div")
    add_class("mw_was_table")

    $(".//table | .//tr | .//td | .//th | .//thead | .//tfoot | .//tbody | .//col | .//colgroup | .//caption") {
      %i = index()
      %n = name()
      name("div")
      attributes(data-mw-id: concat("mw_dump_", %n, %i), width: "")
      add_class(concat("mw_was_", %n))
    }

    yield()
  }
}


# Remove Styles Functions
@func XMLNode.remove_external_styles() {
  remove(".//link[@rel='stylesheet'][not(@data-mw-keep)]")
}
@func XMLNode.remove_internal_styles() {
  remove(".//style")
}
@func XMLNode.remove_all_styles() {
  remove_external_styles()
  remove_internal_styles()
}

# Remove Scripts
@func XMLNode.remove_external_scripts() {
  remove(".//script[@src]")
}
@func XMLNode.remove_inline_scripts() {
  remove(".//script[not(@src)]")
}
@func XMLNode.remove_scripts() {
  remove(".//script")
}
@func XMLNode.remove_desktop_js() {
  remove("//script[@src and (not(@data-keep) or @data-keep='false') and not(contains(@src,'ScriptResource.axd'))]")
}

# Remove HTML Comment Tags
@func XMLNode.remove_html_comments() {
  remove(".//comment()")
}

# Remove existing conflicting meta tags
@func XMLNode.remove_meta_tags() {
  # Remove only existing meta tags for which we will add our own
  remove(".//meta[@name='viewport']|.//meta[@name='format-detection']")
}

# Add Meta Tags
@func XMLNode.insert_mobile_meta_tags() {
  $("/html/head") {
    insert("meta", http-equiv: "Content-Type", content: "text/html")
    insert("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert("meta", name: "format-detection", content: "telephone=no")
  }
}

# Add Canonical Tag
@func XMLNode.add_canonical_tag() {
  $("/html/head") {
    # Inject a canonical link as long as there isn't already one.
    $canonical_found = "false"
    $(".//link[@rel='canonical']") {
      $canonical_found = "true"
    }
    match($canonical_found) {
      with(/false/) {
        insert("link", rel: "canonical", href: concat("http://", $source_host, $path))
      }
    }
  }
}

# Clean Meta Tags
@func XMLNode.clean_mobile_meta_tags() {
  remove_meta_tags()
  insert_mobile_meta_tags()
  add_canonical_tag()
}

# Add the favicon
@func XMLNode.add_favicon() {
  $("/html/head") {
    insert("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
  }
}

# Add home screen icons
@func XMLNode.add_apple_touch_icons() {
  $("/html/head") {
    # The images below are placeholders, get real ones from the client
    # Change to -precomposed to not have the glass effect on the icons
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-57x57.png"))
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-114x114.png"))
  }
}

# Add the generated stylesheet
@func XMLNode.add_mobile_stylesheet() {
  $("/html/head") {
    insert("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet), data-mw-keep: "true")
  }
}

# Add the mobile javascript
# Using the variable-setting logic as relying solely on presence of script tags
# is dangerous when removing js or simply on sites with no js.
@func XMLNode.add_mobile_javascript() {
  $("/html/head") {
    $noscript="true"
    $("./script[1]") {
      $noscript="false"
      insert_before("script", data-keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
    }
    match($noscript) {
      with("true") {
        insert_bottom("script", data-keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
      }
    }
  }
}

# Add in our Assets
@func XMLNode.add_assets() {
  add_favicon()
  add_apple_touch_icons()
  add_mobile_stylesheet()
  add_mobile_javascript()
}

# Rewerite meta refresh
@func XMLNode.rewrite_meta_refresh() {
  $("/html/head/meta") {
    %refresh_tag = fetch("@http-equiv")
    match(%refresh_tag) {
      with(/refresh/i) {
        attribute("content") {
          value() {
            replace(/(.*?;)(URL=)?(.*)/i) {
              %timeout = $1
              %prefix = $2
              %url = $3
              %url {
                rewrite_link()
              }
              set(%timeout + %prefix + %url)
            }
          }
        }
      }
    }
  }
}

# Rewrite items
@func XMLNode.rewrite_links() {
  $rewriter_url = "false"
  $("/html/body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite_link()
        }
      }
    }
    $("/html/head/base[@href]") {
      $rewriter_url = fetch("./@href")
      $rewriter_url {
        replace(/.*(\/\/[\w\.]+\/).*/, "$1")
      }
      attribute("href") {
        value() {
          rewrite_link()
        }
      }
    }
    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite_link()
        }
      }
    }
  }
  rewrite_meta_refresh()
}

# Absolutize Items
@func XMLNode.absolutize_srcs() {
  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    set($path)
    # remove the query parameters
    replace(/([^\?]+)\?(.*)/, "//1")
    # the 'slash_path' is the path of this page without anything following it's last slash
    replace(/[^\/]+$/, "")
  }
  # Find images and scripts that link to an external host
  $(".//img|.//script[@src and not(contains(@src, 'WebResource.axd') or contains(@src, 'ScriptResource.axd'))]") {
    # GOTCHAS :: Watch out for captcha images, they most likely should
    # not be absolutized
    $src = fetch("./@src") {
			trim()
		}
    match($rewriter_url) {
      not(/false/) {
        # Do nothing :: Use base tag value
      }
      else() {
        $rewriter_url = $source_host
      }
    }
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /\A(?![a-z]+\:)(?!\/\/)(?!\z)/) {
      attribute("src") {
        value() {
					trim()
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend(concat("//", $rewriter_url))
            }
            else() {
              # path-relative URL: add the host and the path
              prepend(concat("//", $rewriter_url, $slash_path))
            }
          }
        }
      }
    }
  }
}

# Moves all scripts to the bottom of the page
# Good for performance reasons
# CAUTION: May break page functionality
@func XMLNode.relocate_scripts() {
  $("/html/body/script") {
    move_to("/html/body", "bottom")
    log("WARNING: Moving scripts to bottom of the page. May break page functionality.")
  }
}


# This function lateloads all images and moves scripts to the bottom of the body, place function at end of html.ts
@func XMLNode.late_load_images() {
  $(".//img") {
    attribute("src") {
      name("data-ur-ll-src")
    }
  }
}

# Helper Functions
# -----------------------------

# Remove non-breaking white space
#
# USAGE:
# remove_nbsp("foo")
#
@func XMLNode.remove_nbsp(Text %replace_text) {
  %text = fetch("./text()") {
    replace(/\xC2\xA0/, %replace_text)
  }
  inner(%text)
}

# Remove empty nodes
# Removes nodes with nothing beyond nbsps
@func XMLNode.remove_empty_nodes() {
  remove("./*[string-length()<=1 and not(*)]")
}

# Appends text to the end of a selected attribute
#
# USAGE:
# append_attribute("value", ' →')
#
@func XMLNode.append_attribute(Text %attribute_name, Text %text_to_append) {
    attribute(%attribute_name, fetch("./@"+%attribute_name) + %text_to_append)
}

# Prepends text to the end of a selected attribute
#
# USAGE:
# prepend_attribute("value", '← ')
#
@func XMLNode.prepend_attribute(Text %attribute_name, Text %text_to_prepend) {
    attribute(%attribute_name, %text_to_prepend + fetch("./@"+%attribute_name))
}


# Import Foundation Functions
@import foundation.ts
