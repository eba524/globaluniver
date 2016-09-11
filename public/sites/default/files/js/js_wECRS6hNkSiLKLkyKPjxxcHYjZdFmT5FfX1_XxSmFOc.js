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
/*!
	Colorbox 1.5.14
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(z+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in y[0]&&!y[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),y.focus())}function c(t){c.str!==t&&(y.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){z=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),z=W.index(_.el),-1===z&&(W=W.add(_.el),z=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!$){$=q=!0,c(_.get("className")),y.css({visibility:"hidden",display:"block",opacity:""}),L=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(L),D=T.height()+k.height()+b.outerHeight(!0)-b.height(),j=C.width()+H.width()+b.outerWidth(!0)-b.width(),A=L.outerHeight(!0),N=L.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=(l!==!1?Math.min(h,a(l,"x")):h)-N-j,_.h=(f!==!1?Math.min(s,a(f,"y")):s)-A-D,L.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(F).hide(),y.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}var p=parseFloat(_.get("opacity"));v.css({opacity:p===p?p:"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){y||(V=!1,E=t(i),y=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),S=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),x=n(se,"Wrapper"),b=n(se,"Content").append(F=n(se,"Title"),I=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),R=n("button","Slideshow"),S),B=t('<button type="button"/>').attr({id:Z+"Close"}),x.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(I).add(R)),e.body&&!y.parent().length&&t(e.body).append(v,y.append(x,M))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return y?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;$&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),$&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if(q=!0,U=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-A-D:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-N-j:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-N-j,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-A-D,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){S.show()},100),_.get("inline")){var c=t(e);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),U=new Image,t(U).addClass(Z+"Photo").bind("error",function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;t.each(["alt","longdesc","aria-describedby"],function(e,i){var n=t(_.el).attr(i)||t(_.el).attr("data-"+i);n&&U.setAttribute(i,n)}),_.get("retinaImage")&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){U.height-=U.height*e,U.width-=U.width*e},_.mw&&U.width>_.mw&&(e=(U.width-_.mw)/U.width,o()),_.mh&&U.height>_.mh&&(e=(U.height-_.mh)/U.height,o())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),W[1]&&(_.get("loop")||W[z+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",h(U)},1)}),U.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,y,x,b,T,C,H,k,W,E,L,M,S,F,I,R,K,P,B,O,_,D,j,A,N,z,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[z+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){R.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),y.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),R.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),y.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,R.hide(),t(),ae.unbind(ne,e).unbind(ie,t),y.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),R.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;if(e=e||{},t.isFunction(o))o=t("<a/>"),e.open=!0;else if(!o[0])return o;return o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(y[0].style.width,10)-j+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(y[0].style.height,10)-D+"px"}var r,h,s,l=0,d=0,c=y.offset();if(E.unbind("resize."+Z),y.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,y.css({position:"fixed"})):(l=h,d=s,y.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-N-j-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-N-j,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-A-D-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-A-D,0)/2),y.css({top:c.top,left:c.left,visibility:"visible"}),x[0].style.width=x[0].style.height="9999px",r={width:_.w+N+j,height:_.h+A+D,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||y.css(r),y.dequeue().animate(r,{duration:e||0,complete:function(){n(),q=!1,x[0].style.width=_.w+N+j+"px",x[0].style.height=_.h+A+D+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),t.isFunction(i)&&i()},step:n})},J.resize=function(t){var e;$&&(t=t||{},t.width&&(_.w=a(t.width,"x")-N-j),t.innerWidth&&(_.w=a(t.innerWidth,"x")),L.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-A-D),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=L.scrollTop(),L.css({height:"auto"}),_.h=L.height()),L.css({height:_.h}),e&&L.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||L.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||L.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var d,g="none"===_.get("transition")?0:_.get("speed");L.remove(),L=n(se,"LoadedContent").append(i),L.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(U).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&y[0].style.removeAttribute("filter")}var n,o,a=W.length;$&&(o=function(){clearTimeout(Q),S.hide(),u(ne),_.get("onComplete")},F.html(_.get("title")).show(),L.show(),a>1?("string"==typeof _.get("current")&&I.html(_.get("current").replace("{current}",z+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>z?"show":"hide"]().html(_.get("next")),P[_.get("loop")||z?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=e.createElement("iframe"),"frameBorder"in n&&(n.frameBorder=0),"allowTransparency"in n&&(n.allowTransparency="true"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0}).one("load",o).appendTo(L),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?y.fadeTo(g,1,i):i())},"fade"===_.get("transition")?y.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!q&&W[1]&&(_.get("loop")||W[z+1])&&(z=h(1),f(W[z]))},J.prev=function(){!q&&W[1]&&(_.get("loop")||z)&&(z=h(-1),f(W[z]))},J.close=function(){$&&!G&&(G=!0,$=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),y.stop().fadeTo(_.get("fadeOut")||0,0,function(){y.hide(),v.hide(),u(he),L.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){y&&(y.stop(),t[Y].close(),y.stop(!1,!0).remove(),v.remove(),G=!1,y=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);

    $(context).bind('cbox_complete', function () {
      Drupal.attachBehaviors('#cboxLoadedContent');
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(context).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;

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
/*
 *  Create the splitter, set the viewport size, and set the position of the scrollbar to the first item.
 */
(function($){
  Drupal.behaviors.calendarSetScroll = {
  attach: function(context) {
    // Make multi-day resizable - stolen/borrowed from textarea.js
    $('.header-body-divider:not(.header-body-divider-processed)').each(function() {
      var divider = $(this).addClass('header-body-divider-processed');
      var start_y = divider.offset().top;

      // Add the grippie icon
      $(this).prepend('<div class="grippie"></div>').mousedown(startDrag);

      function startDrag(e) {
        start_y = divider.offset().top;
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        var offset = e.pageY - start_y;
        var mwc = $('#multi-day-container');
        var sdc = $('#single-day-container');
        var mwc_height = mwc.height();
        var sdc_height = sdc.height();
        var max_height = mwc_height + sdc_height;
        mwc.height(Math.min(max_height,Math.max(0,mwc_height + offset)));
        sdc.height(Math.min(max_height,Math.max(0,sdc_height - offset)));
        start_y = divider.offset().top;
        return false;
      }

      function endDrag(e) {
        $(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
      }
     });

    $('.single-day-footer:not(.single-day-footer-processed)').each(function() {
      var divider = $(this).addClass('single-day-footer-processed');
      var start_y = divider.offset().top;

      // Add the grippie icon
      $(this).prepend('<div class="grippie"></div>').mousedown(startDrag);

      function startDrag(e) {
        start_y = divider.offset().top;
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        var offset = e.pageY - start_y;
        var sdc = $('#single-day-container');
        sdc.height(Math.max(0,sdc.height() + offset));
        start_y = divider.offset().top;
        return false;
      }

      function endDrag(e) {
        $(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
      }
     });

     // Size the window
     calendar_resizeViewport($);
  }
};
})(jQuery);

// Scroll the viewport to the first item
function calendar_scrollToFirst($) {
   if ($('div.first_item').size() > 0 ) {
      var y = $('div.first_item').offset().top - $('#single-day-container').offset().top ;
      $('#single-day-container').scrollTop(y);
   }
}

// Size the single day view
function calendar_resizeViewport($) {
  // Size of the browser window
  var viewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
  var top = $('#single-day-container').offset().top;

  // Give it a 20 pixel margin at the bottom
  //$('#single-day-container').height(viewportHeight - top - 20);
}
;
