# Header
$("./body") {
  $$("#header") {
    foundation.tbar() {
      foundation.tbar_title("Moovweb", "", "menu-icon")
      foundation.tbar_section("right") {     
        insert("li") {
          insert("a", "Docs", href:"#")
        }
        insert("li", class:"divider")
        insert("li") {
          insert("a", "Tutorials", href:"#")
        }
        insert("li", class:"divider")
        insert("li") {            
          insert("a", "Sign In", href:"#")
        }
      }
    }
  }
}