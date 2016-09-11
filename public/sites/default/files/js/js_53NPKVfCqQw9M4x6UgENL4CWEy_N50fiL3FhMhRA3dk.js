(function ($) {  
  
  Drupal.behaviors.accordion = {
    attach: function(context, settings) {
      $(".node .accordion").accordion({ collapsible: true, autoHeight: false, heightStyle: "content", heightstyle: "content"})
    }
  };
  
  Drupal.behaviors.toggle = {
    attach: function(context, settings) {
      $('.toggle h3').each(function(){
        $(this).append('<span class="ui-icon"></span>');
        $(this).next().addClass('ui-toggle-content').hide();
        $(this).click(function(){
          $(this).toggleClass('ui-state-active active').next().slideToggle();
        });
      });
    }
  }
  
  Drupal.behaviors.tabs = {
    attach: function(context, settings) {
      $(".node .tabs").tabs();
    }
  }
  
  /*Drupal.behaviors.createTabs = {
    attach: function (context, settings) {
      $('.node-type-organization .l-content, .node-type-program .l-content').once('tabs', function(){
        var ul = $(document.createElement('ul'));
        var tab = $(document.createElement('div'));
        var content = $(this);
        var description_tab = $(document.createElement('div')).attr('id', 'program_description');
        ul.append('<li><a href="#program_description">Description</a></li>');
        var faculty_tab = $(document.createElement('div')).attr('id', 'faculty_and_staff');
        content.find('.node--full').each(function(){
          content.find('.block--views-image-slideshows-slideshow').each(function(){
            description_tab.append($(this));
          });         
          description_tab.append($(this));
        });
        tab.append(description_tab);
        content.find('.block--views-programs-center-programs').each(function(){
          var href = $(this).attr('id');
          var title = $(this).find('.block__title').text();
          ul.append('<li><a href="#'+href+'">'+title+'</a></li>');
          $(this).find('.block__title').detach();
          tab.append($(this));
        });
        ul.append('<li><a href="#faculty_and_staff">Faculty &amp; Staff</a></li>');        
        content.find('.block--views-faculty-and-staff-org-faculty, .block--views-faculty-and-staff-org-staff, .block--views-faculty-and-staff-prog-faculty, .block--views-faculty-and-staff-prog-staff').each(function(){
          faculty_tab.append($(this));
        });
        tab.append(faculty_tab);
        tab.prepend(ul);
        tab.tabs();
        $('.l-region--secondary-navigation').addClass('ui-tabs').addClass('ui-widget').append(tab.find('.ui-tabs-nav'));
        $('.l-region--secondary-navigation .block--boxes-empty-block').detach();
        $(this).append(tab);
      });
    }
  }*/

  Drupal.behaviors.sidebarTabs = {
    attach: function (context, settings) {
      if ($('.l-region--sidebar-second').length > 0 && 
          ($('.block--views-events-org-event').length > 0 || $('.block--views-news-org-blog').length > 0 ||
          $('.block--views-events-prog-event').length > 0 || $('.block--views-news-prog-blog').length > 0)){
        $('.l-region--sidebar-second').once('tabs', function(){
          var ul = $(document.createElement('ul'));
          var tabs = $(document.createElement('div'));
          var view_id, title, sidebar;
          var wrap_div = '<div id="block--views-news-and-events"></div>';
          // Put placeholder around events
          if ($('.block--views-events-org-event').length > 0){
            $('.block--views-events-org-event').wrap(wrap_div);
          }else if ($('.block--views-news-org-blog').length > 0) {
            $('.block--views-news-org-blog').wrap(wrap_div);
          }else if ($('.block--views-events-prog-event').length > 0){
            $('.block--views-events-prog-event').wrap(wrap_div);
          }else if ($('.block--views-news-prog-blog').length > 0) {
            $('.block--views-news-prog-blog').wrap(wrap_div);
          }
          $(this).find('.block--views-events-org-event, .block--views-news-org-blog, .block--views-events-prog-event, .block--views-news-prog-blog').each(function(){
            title = $(this).find('.block__title').text();
            view_id = title.replace(/ /g,'_').toLowerCase();
            var tab = $(document.createElement('div'));
            tab.append($(this).addClass('tab-content'));
            tab.attr('id', view_id);
            $(this).find('.block__title').detach();
            ul.append('<li><a href="#'+view_id+'">'+title+'</a></li>');
            tabs.append(tab);
          });          
          tabs.prepend(ul);
          $("#block--views-news-and-events").append(tabs);
          tabs.tabs();
        });
      }
    }
  }

  Drupal.behaviors.insideccd = {
    attach: function (context, settings) {
      $(window).load($.recalcFlex);
      $(window).resize($.recalcFlex);
    }
  }

  $.recalcFlex = function recalcFlex() {
    var currentWidth = window.innerWidth || document.documentElement.clientWidth;
    var cols, margin;
    if (currentWidth < 768){
      cols = 1; margin = 0;
    }else if (currentWidth < 960){
      cols = 2; margin = 16;
    }else if (currentWidth < 1260){
      cols = 3; margin = 20;
    }else {
      cols = 4; margin = 30;
    }
    var flexslider1 = $('#block-views-events-front-events .flexslider').data('flexslider');
    if (flexslider1){
      flexslider1.vars.minItems = cols;
      flexslider1.vars.maxItems = cols;
      flexslider1.vars.itemMargin = margin;
    }
    if (currentWidth < 960){
      cols = 1; margin = 0;
    }else if (currentWidth < 1260){
      cols = 3; margin = 20;
    }else {
      cols = 4; margin = 30;
    }
    var flexslider2 = $('#block-views-news-front-blog .flexslider').data('flexslider');
    if (flexslider2){
      flexslider2.vars.minItems = cols;
      flexslider2.vars.maxItems = cols;
      flexslider2.vars.itemMargin = margin;
    }
  }

  /**
   * Handle mobile display including navigation (meanMenu)
   */
  Drupal.behaviors.mobileToggle = {
    attach: function (context, settings) {
      if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ) {
        var isMobile = true;
      }
      if ((navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i))) {
        // add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
        jQuery('html').css("overflow-y" , "scroll");
      }

      var menuOn = false;
      var meanMenuExist = false;
      var meanContainer = '.l-navigation-wrapper';
      var meanMenu = '#block-nice-menus-1 .block__content';
      var meanMenuClone = $(meanMenu).clone();
      var meanRevealClass = ".meanmenu-reveal";
      var meanMenuOpen = "<span /><span /><span />";
      var meanMenuClose = 'X';
      var meanMenuCloseSize = "18px";
      var meanShowChildren = true;
      var meanExpandableChildren = true;
      var meanExpand = '+';
      var meanContract = '-';
      var meanNavPush = "";
      meanMenuClone.find('.contextual-links-wrapper').remove().find('ul.contextual-links').remove();

      //re-instate original nav (and call this on window.width functions)
      function meanOriginal() {
        $('.mean-bar,.mean-push').remove();
        $(meanContainer).removeClass("mean-container");
        $(meanMenu).show();
        menuOn = false;
        meanMenuExist = false;
      }

      function showMeanMenu() {
        if (!meanMenuExist){
          meanMenuExist = true;
          // add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
          $(meanContainer).addClass("mean-container");
          $('.mean-container').prepend('<div class="mean-bar"><a href="/" class="meanmenu-home"><span></span></a><a href="#nav" class="meanmenu-reveal">Show Navigation</a><nav class="mean-nav"></nav></div>');

          //push meanMenu navigation into .mean-nav
          var meanMenuContents = $(meanMenuClone).html();
          $('.mean-nav').html(meanMenuContents);

          $('nav.mean-nav *').each(function() {
            $(this).removeAttr("class");
            $(this).removeAttr("id");
          });

          // Items from header menu to main menu
          $('.nice-menu-menu-header-menu > li').each(function(){
            var menu_item = $(this).clone();
            $('.mean-nav > ul').append(menu_item);
          });
          
          // add last class to tidy up borders
          //$('.mean-nav > ul > li:last').addClass('mean-last');
      
          // push in a holder div (this can be used if removal of nav is causing layout issues)
          $(meanMenu).before('<div class="mean-push" />');
          $('.mean-push').css("margin-top", meanNavPush);

          // hide current navigation and reveal mean nav link
          $(meanMenu).hide();
          $(".meanmenu-reveal").show();

          // turn 'X' on or off
          $(meanRevealClass).html(meanMenuOpen);
          var navreveal = $(meanRevealClass);

          //hide mean-nav ul
          $('.mean-nav ul').hide();

          // hide sub nav
          if(meanShowChildren) {
            // allow expandable sub nav(s)
            if(meanExpandableChildren){
              $('.mean-nav ul ul').each(function() {
                if($(this).children().length){
                  $(this,'li:first').parent().append('<a class="mean-expand" href="#" style="font-size: '+ meanMenuCloseSize +'">'+ meanExpand +'</a>');
                }
              });
              $('.mean-expand').on("click",function(e){
                e.preventDefault();
                if ($(this).hasClass("mean-clicked")) {
                  $(this).text(meanExpand);
                  $(this).prev('ul').slideUp(300, function(){});
                } else {
                  $(this).text(meanContract);
                  $(this).prev('ul').slideDown(300, function(){});
                }
                $(this).toggleClass("mean-clicked");
              });
            } else {
              $('.mean-nav ul ul').show();
            }
          } else {
            $('.mean-nav ul ul').hide();
          }

          // add last class to tidy up borders
          //$('.mean-nav ul li').last().addClass('mean-last');

          navreveal.removeClass("meanclose");
          $(navreveal).click(function(e){
            e.preventDefault();
            if(menuOn == false) {
              navreveal.css("text-align", "center");
              navreveal.css("text-indent", "0");
              navreveal.css("font-size", meanMenuCloseSize);
              $('.mean-nav ul:first').slideDown();
              navreveal.html(meanMenuClose);
              menuOn = true;
            } else {
              $('.mean-nav ul:first').slideUp();
              navreveal.html(meanMenuOpen);
              menuOn = false;
            }
            navreveal.toggleClass("meanclose");
          });
        }
      }

      function mobileSearch(){
        if ($('.search-clone').length == 0){
          $('.meanmenu-reveal').before('<a href="#search" class="search-reveal fa fa-search searchclose"></a>');
          $('.meanmenu-reveal').after('<div class="search-bar"></div>');
          var block = $('#block-views-exp-site-search-page .block__content').clone();
          block.addClass('search-clone');
          $('.search-bar').hide();
          $('.search-bar').prepend(block);
          var searchreveal = $('.search-reveal');
          $(searchreveal).click(function(e){
            e.preventDefault();
            if(searchreveal.hasClass('searchclose')) {
              $('.search-bar').slideDown();
              searchreveal.css("text-align", "center");
              searchreveal.css("text-indent", "0");
              searchreveal.css("font-size", meanMenuCloseSize);
              searchreveal.html(meanMenuClose);
              searchreveal.removeClass('fa').removeClass('fa-search');
            } else {
              $('.search-bar').slideUp();
              searchreveal.html('');
              searchreveal.css("font-size", '20px');
              searchreveal.addClass('fa').addClass('fa-search');
            }
            searchreveal.toggleClass("searchclose");
          });
          $('.search-button').click(function(e){
            e.preventDefault();
            $('.search-bar form').submit();
          });
          if ($('.page-search-results').length > 0){
            searchreveal.click();
          }
        }
      }
      
      function originalSearch(){
        $('.search-clone').remove();
      }
      
      function processMobile() {
        var currentWidth = window.innerWidth || document.documentElement.clientWidth;
        if (currentWidth < 960) {
          showMeanMenu();
          mobileSearch();
        } else {
          meanOriginal();
          originalSearch();
        }
      }
      
      var previousOrientation = window.orientation;
      var previousInnerWidth = window.innerWidth
      if (!isMobile) {
        //reset menu on resize above breakpoint
        $(window).resize(function(){
          processMobile();
        });
      }
      else {
        $(window).resize(function(){
          if(window.orientation !== previousOrientation || window.innerWidth !== previousInnerWidth){
            previousOrientation = window.orientation;
            previousInnerWidth = window.innerWidth;
            // orientation changed
            processMobile();
          }
        });
      }
      
      processMobile();
    }
  }
  
  Drupal.behaviors.equalheight = {
    attach : function(context) {
      /* Thanks to CSS Tricks for pointing out this bit of jQuery
       http://css-tricks.com/equal-height-blocks-in-rows/
       It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */
      equalheight = function(container){
        var currentTallest = 0,
          currentRowStart = 0,
          rowDivs = new Array(),
          $el,
          topPosition = 0;
        $(container).each(function() {
          $el = $(this);
          if ($($el).is(":visible")){
            $($el).height('auto');
            topPostion = $el.position().top;
            if (currentRowStart != topPostion) {
              for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
              }
              rowDivs.length = 0; // empty the array
              currentRowStart = topPostion;
              currentTallest = $el.height();
              rowDivs.push($el);
            } else {
              rowDivs.push($el);
              currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
              rowDivs[currentDiv].height(currentTallest);
            }
          }
        });
      }

      $(window).load(function() {
        equalheight('.view-id-programs .views-row');
        equalheight('.view-display-id-departments .views-row');
        equalheight('.view-display-id-front_events .slides li');
        equalheight('.view-display-id-featured_events .views-row');
        equalheight('.view-display-id-front_blog .node--blog-article');
      });

      $(window).resize(function(){
        equalheight('.view-id-programs .views-row');
        equalheight('.view-display-id-departments .views-row');
        equalheight('.view-display-id-front_events .slides li');
        equalheight('.view-display-id-featured_events .views-row');
        equalheight('.view-display-id-front_blog .node--blog-article');
      });

    }
  }
  
  Drupal.behaviors.areaClickThru = {
    attach: function (context, settings) {
      $('.view-id-programs, .view-display-id-departments, .view-display-id-front_events, .view-display-id-featured_events').once('clickthru', function(){
        $(this).find('.views-row').each(function(){
          var href = $(this).find('.views-field-title a').attr('href');
          if (typeof href != 'undefined'){
            $(this).click(function(){
              window.location.href = href;
            });
          }
        });
      });
      $('.view-id-events .slides').once('clickthru', function(){
        $(this).find('li').each(function(){
          var href = $(this).find('.views-field-title a').attr('href');
          if (typeof href != 'undefined'){
            $(this).click(function(){
              window.location.href = href;
            });
          }
        });
      });
      $('.view-id-documents').once('clickthru', function(){
        $(this).find('table tr').each(function(){
          var href = $(this).find('.views-field-field-display-title a').attr('href');
          if (typeof href != 'undefined'){
            $(this).click(function(){
              window.location.href = href;
            });
          }
        });
      });      
    }
  }

  Drupal.behaviors.searchClick = {
    attach: function (context, settings) {
      $('#overlay').addClass('ready');
      $('.search-icon').click(function(){
        if ($('html').hasClass('lt-ie9')){
          window.location.href = 'search-results.html';
        } else {
          $('#overlay').removeClass('hide');
          $('.l-search-overlay-wrapper').addClass('show');
          setTimeout(function(){$('#edit-search').focus();}, 1000);
        }
      });
      $('.search-icon').keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          $(this).click();
        }
      });
      $('.views-exposed-form-site-search-page .form-item-search').append('<button type="submit" class="search-button"><i class="fa fa-search"></i></button>');
      $('.l-search-overlay-wrapper .views-exposed-form-site-search-page .views-exposed-widgets').append('<div class="search-close"><i class="fa fa-times"></i></div>');
      $('.search-close').click(function(){
        $('#overlay').addClass('hide');
        $('.l-search-overlay-wrapper').removeClass('show');
      });
    }
  }
  
  Drupal.behaviors.addFrontIcons = {
    attach: function (context, settings) {
      var stack = '<span class="fa fa-stack fa-3x"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-{icon} fa-stack-1x"></i></span>';
      $('.front .l-post-content-wrapper').prepend(stack.replace('{icon}', 'users'));
      $('.front .l-postscript-wrapper').prepend(stack.replace('{icon}', 'calendar'));
      $('.front .l-post-postscript-wrapper').append(stack.replace('{icon}', 'rss'));
    }
  }
  
  Drupal.behaviors.hideAttachments = {
    attach: function(context, settings) {
      if ($('.node--full .group-attachments').length > 0){
        if ($('.node--full .group-attachments .download-file').length == 0) {
          $('.node--full .group-attachments').hide();
        }
      }
    }
  }
  
  Drupal.behaviors.disqusCommentCount = {
    attach : function(context) {
      if (typeof Drupal.settings.disqus != 'undefined'){
        var disqusPublicKey = Drupal.settings.disqus.api_key;
        var disqusShortname = Drupal.settings.disqus.domain;
        var urlArray = [], urlArrayPart = [];

        $('.disqus-comment-wrapper').once('disqus', function(){
          var url = $(this).attr('data-disqus-url');
          urlArray.push('link:' + url);
        });

        if (urlArray.length > 0){
          while (urlArray.length > 0){
            // Only have 10 threads per request to avoid url being too long
            urlArrayPart = urlArray.splice(0, 10);
            $.ajax({
              type: 'GET',
              url: "https://disqus.com/api/3.0/threads/set.jsonp",
              data: {api_key: disqusPublicKey, forum: disqusShortname, thread: urlArrayPart}, // URL method
              cache: false,
              dataType: 'jsonp',
              success: function (result) {
                for (var i in result.response) {
                  $('div[data-disqus-url="' + result.response[i].link + '"]').html('<span class="disqus-comment-count">' + result.response[i].posts + '</span>');
                }
                // Make sure any new comment counts are linked
                $('.node--full .disqus-comment-count').once('count', function(){
                  $(this).click(function(e){
                    $('html,body').animate({scrollTop: $("#block-disqus-disqus-comments").offset().top - 160}, 'slow');
                  });
                });
              }
            });
          }
        }
      }
    }
  }
  
  Drupal.behaviors.disqusCommentCountLinks = {
    attach : function(context) {
      $('.node--full .disqus-comment-count').once('count', function(){
        $(this).click(function(e){
          $('html,body').animate({scrollTop: $("#block-disqus-disqus-comments").offset().top - 160}, 'slow');
        });
      });
    }
  }
  
})(jQuery);

//Implement Youtube API
(function(){ 
  var s = document.createElement("script");
  s.src = "https://www.youtube.com/player_api"; /* Load Player API*/
  var before = document.getElementsByTagName("script")[0];
  before.parentNode.insertBefore(s, before);
})();

var players = {};
var YT_ready=(function(){var b=[],c=false;return function(a,d){if(a===true){c=true;while(b.length){b.shift()()}}else if(typeof a=="function"){if(c)a();else b[d?"unshift":"push"](a)}}})();
YT_ready(function() {
  (function($) {
    $(".flexslider iframe[id]").each(function() {
      var frameID = this.id;
      if (frameID) { //If the frame exists
        players[frameID] = new YT.Player(frameID, {
          events: {
            "onStateChange": function(event) {
              if (event.data == 1 || event.data == 3) {
                $('.flexslider').flexslider("pause");
              }
              else if (event.data == 0 || event.data == 2 || event.data == 5) {
                //$('.flexslider').flexslider("next");
                $('.flexslider').flexslider("play");
              }
            }
          }
        });
      }
    });
  })(jQuery);
});
    
function onYouTubePlayerAPIReady() {
  YT_ready(true)
};

(function($) {

/**
 * Drupal FieldGroup object.
 */
Drupal.FieldGroup = Drupal.FieldGroup || {};
Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {};
Drupal.FieldGroup.groupWithfocus = null;

Drupal.FieldGroup.setGroupWithfocus = function(element) {
  element.css({display: 'block'});
  Drupal.FieldGroup.groupWithfocus = element;
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processFieldset = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.fieldset', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $('legend span.fieldset-legend', $(this)).eq(0).append(' ').append($('.form-required').eq(0).clone());
        }
        if ($('.error', $(this)).length) {
          $('legend span.fieldset-legend', $(this)).eq(0).addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processAccordion = {
  execute: function (context, settings, type) {
    $('div.field-group-accordion-wrapper', context).once('fieldgroup-effects', function () {
      var wrapper = $(this);

      // Get the index to set active.
      var active_index = false;
      wrapper.find('.accordion-item').each(function(i) {
        if ($(this).hasClass('field-group-accordion-active')) {
          active_index = i;
        }
      });

      wrapper.accordion({
        heightStyle: "content",
        active: active_index,
        collapsible: true,
        changestart: function(event, ui) {
          if ($(this).hasClass('effect-none')) {
            ui.options.animated = false;
          }
          else {
            ui.options.animated = 'slide';
          }
        }
      });

      if (type == 'form') {

        var $firstErrorItem = false;

        // Add required fields mark to any element containing required fields
        wrapper.find('div.field-group-accordion-item').each(function(i) {

          if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
            $('h3.ui-accordion-header a').eq(i).append(' ').append($('.form-required').eq(0).clone());
          }
          if ($('.error', $(this)).length) {
            // Save first error item, for focussing it.
            if (!$firstErrorItem) {
              $firstErrorItem = $(this).parent().accordion("activate" , i);
            }
            $('h3.ui-accordion-header').eq(i).addClass('error');
          }
        });

        // Save first error item, for focussing it.
        if (!$firstErrorItem) {
          $('.ui-accordion-content-active', $firstErrorItem).css({height: 'auto', width: 'auto', display: 'block'});
        }

      }
    });
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processHtabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any element containing required fields
      $('fieldset.horizontal-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('horizontalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('horizontalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('horizontalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processTabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {

      var errorFocussed = false;

      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.vertical-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('verticalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('verticalTab').link.parent().addClass('error');
          // Focus the first tab with error.
          if (!errorFocussed) {
            Drupal.FieldGroup.setGroupWithfocus($(this));
            $(this).data('verticalTab').focus();
            errorFocussed = true;
          }
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 *
 * TODO clean this up meaning check if this is really
 *      necessary.
 */
Drupal.FieldGroup.Effects.processDiv = {
  execute: function (context, settings, type) {

    $('div.collapsible', context).once('fieldgroup-effects', function() {
      var $wrapper = $(this);

      // Turn the legend into a clickable link, but retain span.field-group-format-toggler
      // for CSS positioning.

      var $toggler = $('span.field-group-format-toggler:first', $wrapper);
      var $link = $('<a class="field-group-format-title" href="#"></a>');
      $link.prepend($toggler.contents());

      // Add required field markers if needed
      if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
        $link.append(' ').append($('.form-required').eq(0).clone());
      }

      $link.appendTo($toggler);

      // .wrapInner() does not retain bound events.
      $link.click(function () {
        var wrapper = $wrapper.get(0);
        // Don't animate multiple times.
        if (!wrapper.animating) {
          wrapper.animating = true;
          var speed = $wrapper.hasClass('speed-fast') ? 300 : 1000;
          if ($wrapper.hasClass('effect-none') && $wrapper.hasClass('speed-none')) {
            $('> .field-group-format-wrapper', wrapper).toggle();
          }
          else if ($wrapper.hasClass('effect-blind')) {
            $('> .field-group-format-wrapper', wrapper).toggle('blind', {}, speed);
          }
          else {
            $('> .field-group-format-wrapper', wrapper).toggle(speed);
          }
          wrapper.animating = false;
        }
        $wrapper.toggleClass('collapsed');
        return false;
      });

    });
  }
};

/**
 * Behaviors.
 */
Drupal.behaviors.fieldGroup = {
  attach: function (context, settings) {
    settings.field_group = settings.field_group || Drupal.settings.field_group;
    if (settings.field_group == undefined) {
      return;
    }

    // Execute all of them.
    $.each(Drupal.FieldGroup.Effects, function (func) {
      // We check for a wrapper function in Drupal.field_group as
      // alternative for dynamic string function calls.
      var type = func.toLowerCase().replace("process", "");
      if (settings.field_group[type] != undefined && $.isFunction(this.execute)) {
        this.execute(context, settings, settings.field_group[type]);
      }
    });

    // Fixes css for fieldgroups under vertical tabs.
    $('.fieldset-wrapper .fieldset > legend').css({display: 'block'});
    $('.vertical-tabs fieldset.fieldset').addClass('default-fallback');

    // Add a new ID to each fieldset.
    $('.group-wrapper .horizontal-tabs-panes > fieldset', context).once('group-wrapper-panes-processed', function() {
      // Tats bad, but we have to keep the actual id to prevent layouts to break.
      var fieldgroupID = 'field_group-' + $(this).attr('id');
      $(this).attr('id', fieldgroupID);
    });
    // Set the hash in url to remember last userselection.
    $('.group-wrapper ul li').once('group-wrapper-ul-processed', function() {
      var fieldGroupNavigationListIndex = $(this).index();
      $(this).children('a').click(function() {
        var fieldset = $('.group-wrapper fieldset').get(fieldGroupNavigationListIndex);
        // Grab the first id, holding the wanted hashurl.
        var hashUrl = $(fieldset).attr('id').replace(/^field_group-/, '').split(' ')[0];
        window.location.hash = hashUrl;
      });
    });

  }
};

})(jQuery);
;
