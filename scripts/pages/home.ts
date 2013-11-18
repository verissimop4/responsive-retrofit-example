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

  # Fix the coloring of table entries by removing the empty <TR> elements
  # This is equivalent to the following lines in the XSLT example:
  #  
  # <!-- 
  #  Remove the empty <tr> elements that serve as spacers. Then foundation's 
  #  default table stylingthat uses alternate highlighting for rows will work 
  #  great.
  #  -->
  #  <xsl:template match="tr[@style='height:5px']" />
  remove(".//tr[@style='height:5px']")
  
  # Note that in practice a more robust method would be remove the empty
  # <TR> elements in the articles table rather than just all <TR> elements
  # with a specific style attribute as both the XSLT and the above code have done.
  # That would look something like:
  #
  # # Find the table with the articles
  # $("//a[contains(@href, 'vote')]/ancestor::table[1]") {
  #   # Remove the empty TR rows
  #   $("./tr[not(*)][not(node())]") {      
  #     remove()
  #   }
  # }
    
}
