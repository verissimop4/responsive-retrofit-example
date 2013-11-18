# Homepage Transformation
$("./body") {
  add_class("_home")
  $$("#container") {
    # Foundation Grids
    insert("div", id:"image_row", class:"row") {
      insert("div", class:"small-6 large-3 columns") {
        insert("div", class:"image") {
          wrap("a", href:"#", data-reveal-id:"img1")
          insert("img", src:asset("images/build_a_site.png"))
        }
      }
      insert("div", class:"small-6 large-3 columns") {
        insert("div", class:"image") {
          wrap("a", href:"#", data-reveal-id:"img2")
          insert("img", src:asset("images/deploy.png"))
        }
      }
      insert("div", class:"small-6 large-3 columns") {
        insert("div", class:"image") {
          wrap("a", href:"#", data-reveal-id:"img3")
          insert("img", src:asset("images/share.png"))
        }
      }
      insert("div", class:"small-6 large-3 columns") {
        insert("div", class:"image") {
          wrap("a", href:"#", data-reveal-id:"img4")
          insert("img", src:asset("images/build_a_site.png"))
        }
      }
      insert("div", id:"img1", class:"reveal-modal") {
        insert("img", src:asset("images/build_a_site.png"))
        insert("a", "&#215;", class:"close-reveal-modal")
      }
      insert("div", id:"img2", class:"reveal-modal") {
        insert("img", src:asset("images/deploy.png"))
        insert("a", "&#215;", class:"close-reveal-modal")
      }
      insert("div", id:"img3", class:"reveal-modal") {
        insert("img", src:asset("images/share.png"))
        insert("a", "&#215;", class:"close-reveal-modal")
      }
      insert("div", id:"img4", class:"reveal-modal") {
        insert("img", src:asset("images/build_a_site.png"))
        insert("a", "&#215;", class:"close-reveal-modal")
      }
    }

    # Foundation Sections
    foundation.section() {
      foundation.section_item("Section 1", "#panel1") {
        insert("p", "Content of section 1.")
      }
      foundation.section_item("Section 2", "#panel2") {
        insert("p", "Content of section 2.")
      }
    }

    # Joyride Tutorial
    foundation.joyride() {
      foundation.joyride_item("header") {
        insert("p", "Hello and welcome to Moovweb!")
      }
      foundation.joyride_item("image_row"){
        insert("h4", "Step #1")
        inject("<p>You can make your site responsive by filling in the template provided for you using the <code>move_here()</code> function.</p>")
      }
      foundation.joyride_item("footer") {
        attribute("data-options", "tipLocation:top;tipAnimation:fade")
        insert("h4", "Step #2")
        insert("p", "Or simply use our template as a guide for creating your own.")
      }
      foundation.joyride_item(""){
        insert("h4", "Step #3")
        inject("<p>For further instructions, visit <a href='http://console.moovweb.com/learn/tutorials/index'>our tutorials</a>!</p>")
      }
    }
  }
}
