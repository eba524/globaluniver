
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
/*
 * jQuery FlexSlider v2.2.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */(function(e){e.flexslider=function(t,n){var r=e(t);r.vars=e.extend({},e.flexslider.defaults,n);var i=r.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,o=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&r.vars.touch,u="click touchend MSPointerUp",a="",f,l=r.vars.direction==="vertical",c=r.vars.reverse,h=r.vars.itemWidth>0,p=r.vars.animation==="fade",d=r.vars.asNavFor!=="",v={},m=!0;e.data(t,"flexslider",r);v={init:function(){r.animating=!1;r.currentSlide=parseInt(r.vars.startAt?r.vars.startAt:0);isNaN(r.currentSlide)&&(r.currentSlide=0);r.animatingTo=r.currentSlide;r.atEnd=r.currentSlide===0||r.currentSlide===r.last;r.containerSelector=r.vars.selector.substr(0,r.vars.selector.search(" "));r.slides=e(r.vars.selector,r);r.container=e(r.containerSelector,r);r.count=r.slides.length;r.syncExists=e(r.vars.sync).length>0;r.vars.animation==="slide"&&(r.vars.animation="swing");r.prop=l?"top":"marginLeft";r.args={};r.manualPause=!1;r.stopped=!1;r.started=!1;r.startTimeout=null;r.transitions=!r.vars.video&&!p&&r.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var n in t)if(e.style[t[n]]!==undefined){r.pfx=t[n].replace("Perspective","").toLowerCase();r.prop="-"+r.pfx+"-transform";return!0}return!1}();r.vars.controlsContainer!==""&&(r.controlsContainer=e(r.vars.controlsContainer).length>0&&e(r.vars.controlsContainer));r.vars.manualControls!==""&&(r.manualControls=e(r.vars.manualControls).length>0&&e(r.vars.manualControls));if(r.vars.randomize){r.slides.sort(function(){return Math.round(Math.random())-.5});r.container.empty().append(r.slides)}r.doMath();r.setup("init");r.vars.controlNav&&v.controlNav.setup();r.vars.directionNav&&v.directionNav.setup();r.vars.keyboard&&(e(r.containerSelector).length===1||r.vars.multipleKeyboard)&&e(document).bind("keyup",function(e){var t=e.keyCode;if(!r.animating&&(t===39||t===37)){var n=t===39?r.getTarget("next"):t===37?r.getTarget("prev"):!1;r.flexAnimate(n,r.vars.pauseOnAction)}});r.vars.mousewheel&&r.bind("mousewheel",function(e,t,n,i){e.preventDefault();var s=t<0?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(s,r.vars.pauseOnAction)});r.vars.pausePlay&&v.pausePlay.setup();r.vars.slideshow&&r.vars.pauseInvisible&&v.pauseInvisible.init();if(r.vars.slideshow){r.vars.pauseOnHover&&r.hover(function(){!r.manualPlay&&!r.manualPause&&r.pause()},function(){!r.manualPause&&!r.manualPlay&&!r.stopped&&r.play()});if(!r.vars.pauseInvisible||!v.pauseInvisible.isHidden())r.vars.initDelay>0?r.startTimeout=setTimeout(r.play,r.vars.initDelay):r.play()}d&&v.asNav.setup();o&&r.vars.touch&&v.touch();(!p||p&&r.vars.smoothHeight)&&e(window).bind("resize orientationchange focus",v.resize);r.find("img").attr("draggable","false");setTimeout(function(){r.vars.start(r)},200)},asNav:{setup:function(){r.asNav=!0;r.animatingTo=Math.floor(r.currentSlide/r.move);r.currentItem=r.currentSlide;r.slides.removeClass(i+"active-slide").eq(r.currentItem).addClass(i+"active-slide");if(!s)r.slides.click(function(t){t.preventDefault();var n=e(this),s=n.index(),o=n.offset().left-e(r).scrollLeft();if(o<=0&&n.hasClass(i+"active-slide"))r.flexAnimate(r.getTarget("prev"),!0);else if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass(i+"active-slide")){r.direction=r.currentItem<s?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction,!1,!0,!0)}});else{t._slider=r;r.slides.each(function(){var t=this;t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",function(e){e.preventDefault();e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1);t.addEventListener("MSGestureTap",function(t){t.preventDefault();var n=e(this),i=n.index();if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass("active")){r.direction=r.currentItem<i?"next":"prev";r.flexAnimate(i,r.vars.pauseOnAction,!1,!0,!0)}})})}}},controlNav:{setup:function(){r.manualControls?v.controlNav.setupManual():v.controlNav.setupPaging()},setupPaging:function(){var t=r.vars.controlNav==="thumbnails"?"control-thumbs":"control-paging",n=1,s,o;r.controlNavScaffold=e('<ol class="'+i+"control-nav "+i+t+'"></ol>');if(r.pagingCount>1)for(var f=0;f<r.pagingCount;f++){o=r.slides.eq(f);s=r.vars.controlNav==="thumbnails"?'<img src="'+o.attr("data-thumb")+'"/>':"<a>"+n+"</a>";if("thumbnails"===r.vars.controlNav&&!0===r.vars.thumbCaptions){var l=o.attr("data-thumbcaption");""!=l&&undefined!=l&&(s+='<span class="'+i+'caption">'+l+"</span>")}r.controlNavScaffold.append("<li>"+s+"</li>");n++}r.controlsContainer?e(r.controlsContainer).append(r.controlNavScaffold):r.append(r.controlNavScaffold);v.controlNav.set();v.controlNav.active();r.controlNavScaffold.delegate("a, img",u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){r.direction=s>r.currentSlide?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},setupManual:function(){r.controlNav=r.manualControls;v.controlNav.active();r.controlNav.bind(u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){s>r.currentSlide?r.direction="next":r.direction="prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},set:function(){var t=r.vars.controlNav==="thumbnails"?"img":"a";r.controlNav=e("."+i+"control-nav li "+t,r.controlsContainer?r.controlsContainer:r)},active:function(){r.controlNav.removeClass(i+"active").eq(r.animatingTo).addClass(i+"active")},update:function(t,n){r.pagingCount>1&&t==="add"?r.controlNavScaffold.append(e("<li><a>"+r.count+"</a></li>")):r.pagingCount===1?r.controlNavScaffold.find("li").remove():r.controlNav.eq(n).closest("li").remove();v.controlNav.set();r.pagingCount>1&&r.pagingCount!==r.controlNav.length?r.update(n,t):v.controlNav.active()}},directionNav:{setup:function(){var t=e('<ul class="'+i+'direction-nav"><li><a class="'+i+'prev" href="#">'+r.vars.prevText+'</a></li><li><a class="'+i+'next" href="#">'+r.vars.nextText+"</a></li></ul>");if(r.controlsContainer){e(r.controlsContainer).append(t);r.directionNav=e("."+i+"direction-nav li a",r.controlsContainer)}else{r.append(t);r.directionNav=e("."+i+"direction-nav li a",r)}v.directionNav.update();r.directionNav.bind(u,function(t){t.preventDefault();var n;if(a===""||a===t.type){n=e(this).hasClass(i+"next")?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(n,r.vars.pauseOnAction)}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";r.pagingCount===1?r.directionNav.addClass(e).attr("tabindex","-1"):r.vars.animationLoop?r.directionNav.removeClass(e).removeAttr("tabindex"):r.animatingTo===0?r.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):r.animatingTo===r.last?r.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):r.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var t=e('<div class="'+i+'pauseplay"><a></a></div>');if(r.controlsContainer){r.controlsContainer.append(t);r.pausePlay=e("."+i+"pauseplay a",r.controlsContainer)}else{r.append(t);r.pausePlay=e("."+i+"pauseplay a",r)}v.pausePlay.update(r.vars.slideshow?i+"pause":i+"play");r.pausePlay.bind(u,function(t){t.preventDefault();if(a===""||a===t.type)if(e(this).hasClass(i+"pause")){r.manualPause=!0;r.manualPlay=!1;r.pause()}else{r.manualPause=!1;r.manualPlay=!0;r.play()}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(e){e==="play"?r.pausePlay.removeClass(i+"pause").addClass(i+"play").html(r.vars.playText):r.pausePlay.removeClass(i+"play").addClass(i+"pause").html(r.vars.pauseText)}},touch:function(){var e,n,i,o,u,a,f=!1,d=0,v=0,m=0;if(!s){function g(s){if(r.animating)s.preventDefault();else if(window.navigator.msPointerEnabled||s.touches.length===1){r.pause();o=l?r.h:r.w;a=Number(new Date);d=s.touches[0].pageX;v=s.touches[0].pageY;i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o;e=l?v:d;n=l?d:v;t.addEventListener("touchmove",y,!1);t.addEventListener("touchend",b,!1)}}function y(t){d=t.touches[0].pageX;v=t.touches[0].pageY;u=l?e-v:e-d;f=l?Math.abs(u)<Math.abs(d-n):Math.abs(u)<Math.abs(v-n);var s=500;if(!f||Number(new Date)-a>s){t.preventDefault();if(!p&&r.transitions){r.vars.animationLoop||(u/=r.currentSlide===0&&u<0||r.currentSlide===r.last&&u>0?Math.abs(u)/o+2:1);r.setProps(i+u,"setTouch")}}}function b(s){t.removeEventListener("touchmove",y,!1);if(r.animatingTo===r.currentSlide&&!f&&u!==null){var l=c?-u:u,h=l>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(h)&&(Number(new Date)-a<550&&Math.abs(l)>50||Math.abs(l)>o/2)?r.flexAnimate(h,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}t.removeEventListener("touchend",b,!1);e=null;n=null;u=null;i=null}t.addEventListener("touchstart",g,!1);}else{t.style.msTouchAction="none";t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",w,!1);t._slider=r;t.addEventListener("MSGestureChange",E,!1);t.addEventListener("MSGestureEnd",S,!1);function w(e){e.stopPropagation();if(r.animating)e.preventDefault();else{r.pause();t._gesture.addPointer(e.pointerId);m=0;o=l?r.h:r.w;a=Number(new Date);i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o}}function E(e){e.stopPropagation();var n=e.target._slider;if(!n)return;var r=-e.translationX,s=-e.translationY;m+=l?s:r;u=m;f=l?Math.abs(m)<Math.abs(-r):Math.abs(m)<Math.abs(-s);if(e.detail===e.MSGESTURE_FLAG_INERTIA){setImmediate(function(){t._gesture.stop()});return}if(!f||Number(new Date)-a>500){e.preventDefault();if(!p&&n.transitions){n.vars.animationLoop||(u=m/(n.currentSlide===0&&m<0||n.currentSlide===n.last&&m>0?Math.abs(m)/o+2:1));n.setProps(i+u,"setTouch")}}}function S(t){t.stopPropagation();var r=t.target._slider;if(!r)return;if(r.animatingTo===r.currentSlide&&!f&&u!==null){var s=c?-u:u,l=s>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(l)&&(Number(new Date)-a<550&&Math.abs(s)>50||Math.abs(s)>o/2)?r.flexAnimate(l,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}e=null;n=null;u=null;i=null;m=0}}},resize:function(){if(!r.animating&&r.is(":visible")){h||r.doMath();if(p)v.smoothHeight();else if(h){r.update(r.pagingCount);r.slides.width(r.computedW);r.setProps()}else if(l){r.viewport.height(r.h);r.setProps(r.h,"setTotal")}else{r.vars.smoothHeight&&v.smoothHeight();r.newSlides.width(r.computedW);r.setProps(r.computedW,"setTotal")}}},smoothHeight:function(e){if(!l||p){var t=p?r:r.viewport;e?t.animate({height:r.slides.eq(r.animatingTo).height()},e):t.height(r.slides.eq(r.animatingTo).height())}},sync:function(t){var n=e(r.vars.sync).data("flexslider"),i=r.animatingTo;switch(t){case"animate":n.flexAnimate(i,r.vars.pauseOnAction,!1,!0);break;case"play":!n.playing&&!n.asNav&&n.play();break;case"pause":n.pause()}},pauseInvisible:{visProp:null,init:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)e[t]+"Hidden"in document&&(v.pauseInvisible.visProp=e[t]+"Hidden");if(v.pauseInvisible.visProp){var n=v.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(n,function(){v.pauseInvisible.isHidden()?r.startTimeout?clearTimeout(r.startTimeout):r.pause():r.started?r.play():r.vars.initDelay>0?setTimeout(r.play,r.vars.initDelay):r.play()})}},isHidden:function(){return document[v.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(f);f=setTimeout(function(){a=""},3e3)}};r.flexAnimate=function(t,n,s,u,a){!r.vars.animationLoop&&t!==r.currentSlide&&(r.direction=t>r.currentSlide?"next":"prev");d&&r.pagingCount===1&&(r.direction=r.currentItem<t?"next":"prev");if(!r.animating&&(r.canAdvance(t,a)||s)&&r.is(":visible")){if(d&&u){var f=e(r.vars.asNavFor).data("flexslider");r.atEnd=t===0||t===r.count-1;f.flexAnimate(t,!0,!1,!0,a);r.direction=r.currentItem<t?"next":"prev";f.direction=r.direction;if(Math.ceil((t+1)/r.visible)-1===r.currentSlide||t===0){r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");return!1}r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");t=Math.floor(t/r.visible)}r.animating=!0;r.animatingTo=t;n&&r.pause();r.vars.before(r);r.syncExists&&!a&&v.sync("animate");r.vars.controlNav&&v.controlNav.active();h||r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");r.atEnd=t===0||t===r.last;r.vars.directionNav&&v.directionNav.update();if(t===r.last){r.vars.end(r);r.vars.animationLoop||r.pause()}if(!p){var m=l?r.slides.filter(":first").height():r.computedW,g,y,b;if(h){g=r.vars.itemMargin;b=(r.itemW+g)*r.move*r.animatingTo;y=b>r.limit&&r.visible!==1?r.limit:b}else r.currentSlide===0&&t===r.count-1&&r.vars.animationLoop&&r.direction!=="next"?y=c?(r.count+r.cloneOffset)*m:0:r.currentSlide===r.last&&t===0&&r.vars.animationLoop&&r.direction!=="prev"?y=c?0:(r.count+1)*m:y=c?(r.count-1-t+r.cloneOffset)*m:(t+r.cloneOffset)*m;r.setProps(y,"",r.vars.animationSpeed);if(r.transitions){if(!r.vars.animationLoop||!r.atEnd){r.animating=!1;r.currentSlide=r.animatingTo}r.container.unbind("webkitTransitionEnd transitionend");r.container.bind("webkitTransitionEnd transitionend",function(){r.wrapup(m)})}else r.container.animate(r.args,r.vars.animationSpeed,r.vars.easing,function(){r.wrapup(m)})}else if(!o){r.slides.eq(r.currentSlide).css({zIndex:1}).animate({opacity:0},r.vars.animationSpeed,r.vars.easing);r.slides.eq(t).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing,r.wrapup)}else{r.slides.eq(r.currentSlide).css({opacity:0,zIndex:1});r.slides.eq(t).css({opacity:1,zIndex:2});r.wrapup(m)}r.vars.smoothHeight&&v.smoothHeight(r.vars.animationSpeed)}};r.wrapup=function(e){!p&&!h&&(r.currentSlide===0&&r.animatingTo===r.last&&r.vars.animationLoop?r.setProps(e,"jumpEnd"):r.currentSlide===r.last&&r.animatingTo===0&&r.vars.animationLoop&&r.setProps(e,"jumpStart"));r.animating=!1;r.currentSlide=r.animatingTo;r.vars.after(r)};r.animateSlides=function(){!r.animating&&m&&r.flexAnimate(r.getTarget("next"))};r.pause=function(){clearInterval(r.animatedSlides);r.animatedSlides=null;r.playing=!1;r.vars.pausePlay&&v.pausePlay.update("play");r.syncExists&&v.sync("pause")};r.play=function(){r.playing&&clearInterval(r.animatedSlides);r.animatedSlides=r.animatedSlides||setInterval(r.animateSlides,r.vars.slideshowSpeed);r.started=r.playing=!0;r.vars.pausePlay&&v.pausePlay.update("pause");r.syncExists&&v.sync("play")};r.stop=function(){r.pause();r.stopped=!0};r.canAdvance=function(e,t){var n=d?r.pagingCount-1:r.last;return t?!0:d&&r.currentItem===r.count-1&&e===0&&r.direction==="prev"?!0:d&&r.currentItem===0&&e===r.pagingCount-1&&r.direction!=="next"?!1:e===r.currentSlide&&!d?!1:r.vars.animationLoop?!0:r.atEnd&&r.currentSlide===0&&e===n&&r.direction!=="next"?!1:r.atEnd&&r.currentSlide===n&&e===0&&r.direction==="next"?!1:!0};r.getTarget=function(e){r.direction=e;return e==="next"?r.currentSlide===r.last?0:r.currentSlide+1:r.currentSlide===0?r.last:r.currentSlide-1};r.setProps=function(e,t,n){var i=function(){var n=e?e:(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo,i=function(){if(h)return t==="setTouch"?e:c&&r.animatingTo===r.last?0:c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:r.animatingTo===r.last?r.limit:n;switch(t){case"setTotal":return c?(r.count-1-r.currentSlide+r.cloneOffset)*e:(r.currentSlide+r.cloneOffset)*e;case"setTouch":return c?e:e;case"jumpEnd":return c?e:r.count*e;case"jumpStart":return c?r.count*e:e;default:return e}}();return i*-1+"px"}();if(r.transitions){i=l?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)";n=n!==undefined?n/1e3+"s":"0s";r.container.css("-"+r.pfx+"-transition-duration",n)}r.args[r.prop]=i;(r.transitions||n===undefined)&&r.container.css(r.args)};r.setup=function(t){if(!p){var n,s;if(t==="init"){r.viewport=e('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(r).append(r.container);r.cloneCount=0;r.cloneOffset=0;if(c){s=e.makeArray(r.slides).reverse();r.slides=e(s);r.container.empty().append(r.slides)}}if(r.vars.animationLoop&&!h){r.cloneCount=2;r.cloneOffset=1;t!=="init"&&r.container.find(".clone").remove();r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden","true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden","true"))}r.newSlides=e(r.vars.selector,r);n=c?r.count-1-r.currentSlide+r.cloneOffset:r.currentSlide+r.cloneOffset;if(l&&!h){r.container.height((r.count+r.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){r.newSlides.css({display:"block"});r.doMath();r.viewport.height(r.h);r.setProps(n*r.h,"init")},t==="init"?100:0)}else{r.container.width((r.count+r.cloneCount)*200+"%");r.setProps(n*r.computedW,"init");setTimeout(function(){r.doMath();r.newSlides.css({width:r.computedW,"float":"left",display:"block"});r.vars.smoothHeight&&v.smoothHeight()},t==="init"?100:0)}}else{r.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"});t==="init"&&(o?r.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+r.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(r.currentSlide).css({opacity:1,zIndex:2}):r.slides.css({opacity:0,display:"block",zIndex:1}).eq(r.currentSlide).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing));r.vars.smoothHeight&&v.smoothHeight()}h||r.slides.removeClass(i+"active-slide").eq(r.currentSlide).addClass(i+"active-slide")};r.doMath=function(){var e=r.slides.first(),t=r.vars.itemMargin,n=r.vars.minItems,i=r.vars.maxItems;r.w=r.viewport===undefined?r.width():r.viewport.width();r.h=e.height();r.boxPadding=e.outerWidth()-e.width();if(h){r.itemT=r.vars.itemWidth+t;r.minW=n?n*r.itemT:r.w;r.maxW=i?i*r.itemT-t:r.w;r.itemW=r.minW>r.w?(r.w-t*(n-1))/n:r.maxW<r.w?(r.w-t*(i-1))/i:r.vars.itemWidth>r.w?r.w:r.vars.itemWidth;r.visible=Math.floor(r.w/r.itemW);r.move=r.vars.move>0&&r.vars.move<r.visible?r.vars.move:r.visible;r.pagingCount=Math.ceil((r.count-r.visible)/r.move+1);r.last=r.pagingCount-1;r.limit=r.pagingCount===1?0:r.vars.itemWidth>r.w?r.itemW*(r.count-1)+t*(r.count-1):(r.itemW+t)*r.count-r.w-t}else{r.itemW=r.w;r.pagingCount=r.count;r.last=r.count-1}r.computedW=r.itemW-r.boxPadding};r.update=function(e,t){r.doMath();if(!h){e<r.currentSlide?r.currentSlide+=1:e<=r.currentSlide&&e!==0&&(r.currentSlide-=1);r.animatingTo=r.currentSlide}if(r.vars.controlNav&&!r.manualControls)if(t==="add"&&!h||r.pagingCount>r.controlNav.length)v.controlNav.update("add");else if(t==="remove"&&!h||r.pagingCount<r.controlNav.length){if(h&&r.currentSlide>r.last){r.currentSlide-=1;r.animatingTo-=1}v.controlNav.update("remove",r.last)}r.vars.directionNav&&v.directionNav.update()};r.addSlide=function(t,n){var i=e(t);r.count+=1;r.last=r.count-1;l&&c?n!==undefined?r.slides.eq(r.count-n).after(i):r.container.prepend(i):n!==undefined?r.slides.eq(n).before(i):r.container.append(i);r.update(n,"add");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.added(r)};r.removeSlide=function(t){var n=isNaN(t)?r.slides.index(e(t)):t;r.count-=1;r.last=r.count-1;isNaN(t)?e(t,r.slides).remove():l&&c?r.slides.eq(r.last).remove():r.slides.eq(t).remove();r.doMath();r.update(n,"remove");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.removed(r)};v.init()};e(window).blur(function(e){focused=!1}).focus(function(e){focused=!0});e.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};e.fn.flexslider=function(t){t===undefined&&(t={});if(typeof t=="object")return this.each(function(){var n=e(this),r=t.selector?t.selector:".slides > li",i=n.find(r);if(i.length===1&&t.allowOneSlide===!0||i.length===0){i.fadeIn(400);t.start&&t.start(n)}else n.data("flexslider")===undefined&&new e.flexslider(this,t)});var n=e(this).data("flexslider");switch(t){case"play":n.play();break;case"pause":n.pause();break;case"stop":n.stop();break;case"next":n.flexAnimate(n.getTarget("next"),!0);break;case"prev":case"previous":n.flexAnimate(n.getTarget("prev"),!0);break;default:typeof t=="number"&&n.flexAnimate(t,!0)}}})(jQuery);;
