# Foundation Library
@namespace foundation, tritium

# Top Bar Functions

# Inserts the out wrapper for the top bar navigation widget
@func XMLNode.tbar() {
  insert("nav", class: "top-bar") {
    yield()
  }
}

# Inserts the title area for the top bar navigation widget
# Parameters: name for the branding area, menu button text and menu icon class
@func XMLNode.tbar_title(Text %name, Text %menu_btn_name, Text %menu_icon) {
  insert("ul", class: "title-area") {
    insert("li", class:"name") {
      insert("h1") {
        insert("a", %name, href:"/")
      }
    }
    insert("li", class:"toggle-topbar "+%menu_icon) {
      insert("a", href:"#") {
        insert("span", %menu_btn_name)
      }
    }
    yield()
  }
}

# Inserts the section area for the top bar navigation widget
# Parameters: position for the unordered list
@func XMLNode.tbar_section(Text %ul_pos) {
  insert("section", class: "top-bar-section") {
    insert("ul", class: %ul_pos) {
      yield()
    }
  }
}

# Section Functions

# Inserts the section wrapper (also known as tabs wrapper)
@func XMLNode.section() {
  insert("div", class: "section-container auto", data-section: " ") {
    yield()
  }
}

# Inserts an individual section item (or tab)
@func XMLNode.section_item(Text %title, Text %href) {
  insert("section") {
    insert("p", class:"title", data-section-title:" ") {
      insert("a", %title, href:%href)
    }
    insert("div", class:"content", data-section-content:" ") {
      yield()
    }
  }
}

# Joyride Functions

# Inserts the joyride wrapper
@func XMLNode.joyride() {
  insert("ol", class:"joyride-list", data-joyride:" ") {
    yield()
  }
}

# Insert an individual joyride item (or each step in the ride)
@func XMLNode.joyride_item(Text %id) {
  insert("li", data-id:%id, data-button:"Next") {
    yield()
  }
}

