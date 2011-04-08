var Karee = {
  container: '#tree_container',

  // Turn the ul into a Kareeifiable ul by adding necessary
  // classes and tags
  water: function(){
    // The first 'li' the id 'root'
    $(Karee.container).find('li:first').attr('id', 'root')
    // All 'li' & 'ul' should have the class 'node'
    $(Karee.container).find('li,ul').addClass('node')
    // All 'li' contents should be wrapped in 2 divs: node_outer, node_inner
    $(Karee.container).find('li.node').each(function(){
      // This catches the case where the contens are plain text
      if($(this).children(':not(ul.node)').size() == 0){
        $(this).contents().first().wrap("<div class='node_outer'/>").wrap("<div class='node_inner'/>")
      }
      else {
        $(this).children(':not(ul.node)').first().wrap("<div class='node_outer'/>").wrap("<div class='node_inner'/>")
      }
    })
  },

  // Draws lines between each node
  grow: function(){
    $(Karee.container).find('li.node').each(function(){
      prev_count = $(this).prev('li.node').size()
      next_count = $(this).next('li.node').size()
      children_count = $(this).find('ul.node').size()

      container = $(this).find('div.node_outer:first')
      container_height = $(container).height()
      container_margin = parseInt($(container).css('margin-top').replace('px', ''))
      container_bottom_border = parseInt($(container).css('border-bottom-width').replace('px', ''))

      topOffset = $(this).position().top
      leftOffset = $(this).position().left
      half_width = $(this).width()/2

      // draw line across the left half of node
      if (prev_count != 0){
        Karee.draw_hline(topOffset, leftOffset, half_width)
      }
    
      // draw line across the right half of node
      if (next_count != 0){
        Karee.draw_hline(topOffset, leftOffset + half_width, half_width)
      }
    
      // Draw line up from node
      if ($(this).parents('li.node').size() != 0){
        Karee.draw_vline(topOffset, leftOffset + half_width, container_margin,'vertical')
      }

      // Draw line down from node
      if (children_count != 0){
        Karee.draw_vline(topOffset+container_height+container_margin+(container_bottom_border*2), leftOffset+half_width, container_margin,'vertical')
      }
    })
  },

  draw_hline: function(topOffset, leftOffset, width){
    $('body').append("<div class='horizontal_line' style='position:absolute; left:"+ leftOffset +"px; top:"+ topOffset +"px; width:"+ width +"px'></div>")
  },

  draw_vline: function(topOffset, leftOffset, height){
    $('body').append("<div class='vertical_line' style='position:absolute; left:"+ leftOffset +"px; top:"+ topOffset +"px;  height:"+ height +"px'></div>")
  }
}

$.fn.kareeify = function(){
  Karee.container = '#' + this.attr('id');
  Karee.water(); // Add requirements to 'ul'
  Karee.grow(); // Add lines between each node
}