# Homepage Transformation
$("./body") {
  add_class("_home")
  
  # Fix the width attribute on the first table in the document so that content is edge to edge
  # This is equivalent to the following lines in the XSLT example:
  #
  # <!-- Fix the width attribute on the first table in the document so that content is edge to edge-->
  #  <xsl:template match="body/center/table/@width">
  #       <xsl:attribute name="width">
  #           <xsl:value-of select="'100%'"/>
  #       </xsl:attribute>
  #   </xsl:template>
  #
  $(".//table[1]") {
    attribute("width", "100%")
  } 
    
}
