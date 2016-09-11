(function ($) {  
  
  Drupal.behaviors.flexInit = {
    attach: function (context, settings) {
      $.recalcFlex();
    }
  }
  
})(jQuery);
;
