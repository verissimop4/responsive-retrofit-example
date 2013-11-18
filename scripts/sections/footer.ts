# Footer 
$("./body") {
  $$("#footer") {
    # visible only on large tablets or landscape mode and desktop sites
    add_class("large-tablet-desktop")
    insert("div", "Copyright © 2013 Site Powered by Moovweb", class:"_copyright")
  }
}