$('./body') {
  
  # The lines below create the foundation header. They are roughly accomplishing the 
  # same thing as the following lines in the XSLT example:
  #
  # <!-- Replace the <center> element with our Foundation header -->
  #   <xsl:template match="body/center">
  #     <nav class="top-bar">
  #        <ul class="title-area">
  #          <li class="name">
  #              <h1><a href="#">Hacker News</a></h1>
  #            </li>          
  #            <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>            
  #        </ul>
  #        <section class="top-bar-section">
  #          <ul class="right">
  #            <!-- Pull the menu links from the old header into our new foundation header -->
  #            <xsl:for-each select="//span[@class='pagetop']/a">
  #              <li><xsl:copy-of select="." /></li>
  #            </xsl:for-each>
  #          </ul>
  #        </section>
  #     </nav>
  #     <xsl:apply-templates select="@* | *"/>
  #   </xsl:template>  
  
  # create a new DIV at the top of the document for our header
  insert_top("div") {
    
    # insert a Foundation top-bar
    foundation.tbar() {
      foundation.tbar_title("Hacker News", "Menu", "menu-icon")
      foundation.tbar_section("right") {             
        
        # Pull the menu links from the old header into our new foundation header     
        # and wrap them in LI elements (required by top-bar for each menu item)
        move_here("//span[@class='pagetop']//a"){
          wrap("li")
        }
      }
    }      
  }    
}


# Clean up the document by removing what's left of the table we pulled the links out of
# to create our foundation header. This is equivalent to the following lines from the XSLT
# example:
#  <!--
#  Remove the old header. 
#  Removes the table with the y18.gif <img> that has no <table> descendants.
#  -->
# <xsl:template match="table[descendant::img[contains(@src,'y18.gif')] and not(descendant::table) ]" />
#
remove("//img[contains(@src,'y18.gif')]//ancestor::table[1]")
