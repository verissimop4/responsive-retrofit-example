
#
# Install Foundation Responsive Framework into the document
#

# Add Foundation styles & modernizer
$("//head") {
  insert_bottom("script", src: asset("javascript/vendor/custom.modernizr.js"))
}


# Add Foundation JS in the body
$("//body") {
  insert_bottom("script", src: asset("javascript/vendor/zepto.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.js"))  
  insert_bottom("script", src: asset("javascript/foundation/foundation.alerts.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.clearing.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.cookie.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.dropdown.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.forms.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.joyride.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.magellan.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.orbit.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.placeholder.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.reveal.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.section.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.tooltips.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.topbar.js"))
  insert_bottom("script", src: asset("javascript/foundation/foundation.interchange.js"))  
  insert_bottom("script", "$(document).foundation();")
  insert_bottom("script", "$(document).foundation('joyride', 'start');")
}