(function ($) {
    "use strict";
    var scrollOffset = -50;
     var enableSmoothScroll = false;



//google font script load script
    var WebFontConfig = {
        google: {families: ['Poppins:400,300,500,700,600:latin']}
    };


    (function () {
        var wf = document.createElement('script');
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

    $('.svg-icon').svgInject();

    Pace.on("done", function () {
        $('#status').fadeOut(); // will first fade out the loading animation
        $('body').scrollspy({target: '.navbar'});
        $('body').data()['bs.scrollspy'].options.offset = Math.abs(scrollOffset); // Set the new offset 
        $('body').data()['bs.scrollspy'].process(); // Force scrollspy to recalculate the offsets to your targets 
        $('body').scrollspy('refresh'); // Refresh the scrollspy.

        (function (a) {
            (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
        })(navigator.userAgent || navigator.vendor || window.opera);

        $(".touch-hover").on('touchstart mouseenter', function () {
            $(this).addClass('jshover');
        }).on('mouseleave touchend ', function () {
            $(this).removeClass('jshover');
        });
        if ($('.dropdown-toggle').length > 0 && !jQuery.browser.mobile) {

            $('.dropdown > a').dropdownHover({instantlyCloseOthers: true});
        } else {
            if (jQuery.browser.mobile) {
                $('.dropdown-toggle').dropdown();
            }
        }

        if ($("table").length > 0) {
            $("table").each(function () {
                var el = $(this);
                if (!el.hasClass('table')) {
                    el.addClass("table table-bordered");
                    el.wrap("<div class='table-responsive'></div>");
                }
            });
        }

        function swapNav() {
            if ($(window).width() < 765) {
                $('.navbar').parent().prependTo($('#nav-bar .row'));
                $('#logo').parent().appendTo($('#nav-bar .row'));
            } else {
                $('.navbar').parent().appendTo($('#nav-bar .row'));
                $('#logo').parent().prependTo($('#nav-bar .row'));
            }
        }

//resize updates functions 
        $(window).resize(function () {
            updateAffix();
            fixViewHeight();
            refreshIsotope();
        });


//scroll reveal trigger

        window.sr = ScrollReveal({duration: 1000});

// Customizing a reveal set
        sr.reveal('.show-on-scroll', {reset: true}, 100);
        sr.reveal('.show-on-scroll-init', {reset: false}, 100);
        sr.reveal('.timeline-bar,.timeline-item', {reset: false}, 200);
        sr.reveal('.fact-item', {reset: false}, 200);
        sr.reveal('.skill.star label,.star .fa', {reset: false}, 100);

        function getImgSize(el, imgSrc) {
            var newImg = new Image();
            newImg.onload = function () {
                var height = newImg.height;
                var width = newImg.width;
                el.css('height', height);
            };
            newImg.src = imgSrc;
        }

        if ($('.bg-image[data-bg-image]').length > 0) {

            $('.bg-image[data-bg-image]').each(function () {
                var el = $(this);
                var sz = getImgSize(el, el.attr("data-bg-image"));
                el.css('background-position', 'center').css('background-image', "url('" + el.attr("data-bg-image") + "')").css('background-size', 'cover').css('background-repeat', 'no-repeat');
            });
        }

        if ($('.bg-color[data-bg-color]').length > 0) {
            $('.bg-color[data-bg-color]').each(function () {
                var el = $(this);
                el.css('background-color', el.attr("data-bg-color"));
            });
        }

        $('[data-placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('data-placeholder')) {
                input.val('');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('data-placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('data-placeholder'));
            }
        }).blur();

        $('[data-placeholder]').parents('form').submit(function () {
            $(this).find('[data-placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('data-placeholder')) {
                    input.val('');
                }
            });
        });
    });

    function refreshIsotope() {
        if ($('#portfolio-filterable').length > 0) {
            $container.isotope("updateSortData");
        }
    }

//portfolio filtarable
    if ($('#portfolio-filterable').length > 0) {
        var $container = $('#portfolio-grid');
        $container.isotope({filter: '*',
            itemSelector: '.portfolio-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.portfolio-item',
            }
        });

        $container.isotope('hideItemElements', $container.find('.portfolio-item.hidden-init'));
        $container.find('.portfolio-item').each(function (i) {
            var el = $(this);
            el.removeClass('hidden-init');
            var imgH = el.find('img').attr('height');
            el.css('min-height', imgH);
            el.imagesLoaded().progress(function (imgLoad, image) {
                $container.isotope('revealItemElements', el);
                $container.isotope('layout');
            });
        })

        $('.group-selectors a').click(function (e) {
            $('.portfolio-item.show-item').removeClass('show-item');
            e.preventDefault();
            var selector = $(this).attr('data-filter');
            $container.isotope({filter: selector});
            $('.group-selectors a.active').removeClass('active');
            $(this).toggleClass('active');
            return false;
        });

        $('.group-selectors a').each(function () {
            var grup = $(this).attr('data-filter');
            if (grup === '*') {
                $(this).attr('data-original-title', $('#portfolio-grid .portfolio-item').length);
            } else {
                var items = $(this).parent().parent().find('.portfolio-item' + grup);
                $(this).attr('data-original-title', items.length);
            }
        });

        $('.group-selectors a').tooltip();

    }




//timeline setup
    if ($('.timeline-holder').length > 0) {
        $('.timeline-holder').prepend(' <div class="timeline-bar"></div>');
    }

//sliders setup
    if ($('#header-slider .carousel').length > 0) {
        $('#header-slider .carousel').flickity({
            bgLazyLoad: true,
            pageDots: false,
            autoPlay: 5000,
        });
    }


    if ($('#portfolio .carousel').length > 0) {
        $('#portfolio .carousel').flickity({
            contain: true,
            adaptiveHeight: true,
            cellAlign: 'left',
            percentPosition: false,
            pageDots: false,
            autoPlay: 5000,
            wrapAround: true
        });
    }

    if ($('#testimonail-slider').length > 0) {
        $('#testimonail-slider').flickity({
            cellAlign: 'left',
            percentPosition: false,
            pageDots: true,
            contain: true,
            autoPlay: 5000,
            wrapAround: true
        });
    }


//portfolio
    $('.open-modal').click(function (e) {
        e.preventDefault();
        var el = $(this);
        var target = el.attr('href');
        $(target).modal();
    });
    var oldscrollDistance = scrollDistance;

    $(window).on('shown.bs.modal', function () {
        oldscrollDistance = scrollDistance;
        scrollDistance = 0;

    })

    $(window).on('hidden.bs.modal', function () {
        scrollDistance = oldscrollDistance;
    })

//skills animator
    if ($('.skill.percent').length > 0) {
        $('.skill.percent').each(function (index) {
            var el = $(this);
            var percent = el.attr('data-percent');
            el.find('label').prepend("<span class='percent'>" + percent + "%</span>");
            el.append("<div class='bar-wrap'><div class='bar'></div></div>");

            el.waypoint(function () {
                el.find('.bar').delay(index * 200).animate({'width': percent + "%"}, 2000, 'easeOutElastic');
            }, {
                triggerOnce: true,
                offset: 'bottom-in-view'
            });
        });
    }

    $("#contact").waypoint(function () {
        $("#contact-box").addClass("animated slideInUp");
    }, {
        offset: '30%'
    });


    if ($('.skill.star').length > 0) {
        $('.skill.star').each(function (index) {
            var el = $(this);
            var star = parseInt(el.attr('data-star'));
            var oStar = 5 - star;
            el.append("<div class='stars-wrap'></div>");
            el.find('.stars-wrap').append(new Array(++star).join("<span class='fa fa-star'></span>"));
            el.find('.stars-wrap').append(new Array(++oStar).join("<span class='fa fa-star-o '></span>"));
            el.find('.star').delay(index * 100).animate({'opacity': 1}, 1500, 'easeOutBounce');
        });
    }

//lightbox plugin triggers
    $(".lightbox-video").magnificPopup({
        type: 'iframe',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });


    $(".lightbox").magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

//scroll indicator
    $("#scroll-indicator").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: $("header").height()}, 1000, 'easeOutQuint');
        // $(window).animate({"scrollTop":$(window).height()});

    });


//smooth scroll
if(enableSmoothScroll){
    var $window = $(window);
    var $modal = $('.modal-body');
    var scrollTime = 0.5;
    var scrollDistance = 220;
    var modalScrollTime = scrollTime;
    var modalScrollDistance = scrollDistance;

    $window.on("mousewheel DOMMouseScroll", function (event) {
        event.preventDefault();
        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * scrollDistance);
        TweenMax.to($window, scrollTime, {
            scrollTo: {y: finalScroll, autoKill: true},
            ease: Power1.easeOut,
            overwrite: 5
        });
    });



    $modal.on("mousewheel DOMMouseScroll", function (event) {
        event.preventDefault();
        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
        var scrollTop = $modal.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * modalScrollDistance);
        TweenMax.to($modal, modalScrollTime, {
            scrollTo: {y: finalScroll, autoKill: true},
            ease: Power1.easeOut,
            overwrite: 5
        });
    });
    }
    
    $('.goto-top').click(function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 2000);
    });



//affix (sticky header)

 
    var affixEl = $('#nav-bar');
    var affixOffset = $('header').outerHeight();
//    if ($('header').find('#nav-bar').length > 0) {
//        affixOffset = affixEl.height();
//    }

    affixEl.affix({offset: affixOffset});

    affixEl.on('affixed.bs.affix', function () {
        affixEl.addClass('go-show');
        affixEl.removeClass('go-hide');
  if(!$('#header-slider').length>0){
       $('#wrapper').css('padding-top', affixEl.outerHeight());    
     
  }
       
      
    });



    affixEl.on('affixed-top.bs.affix', function () {
        $('#wrapper').css('padding-top', 0);
        affixEl.addClass('go-hide');
        affixEl.removeClass('go-show');
        setTimeout(function () {
            if ($('header').find('#nav-bar').length > 0) {
                
                affixEl.css('margin-top', -1 * affixEl.height()).animate({'margin-top': 0}, 200);
            }
            affixEl.removeClass('go-hide');
        }, 500);

    });

    affixEl.on('affix.bs.affix', function () {
        affixEl.on(
                'affix-bottom.bs.affix', function (e) {
                    e.preventDefault();
                }
        );
    });

   function updateAffix() {
        $(window).off('.affix');
        affixEl.removeData('bs.affix').removeClass('affix affix-top affix-bottom')
        affixEl.affix({offset: affixOffset});
        affixEl.data('bs.affix').options.offset = $('header').outerHeight();
    }

    checkContactForm();
    //Contact form setup
    function checkContactForm() {
        if ($(".contact-form").length > 0) {
            //   ===================================================== 
            //sending contact form
            $(".contact-form").on('submit', function (e) {
                e.preventDefault();

                //  triggers contact form validation

                $(".contact-form .submit").fadeOut(function () {
                    $('#loading').css('visibility', 'visible');
                    $.post('submit.php', $(".contact-form").serialize(),
                            function (data) {
                                $(".contact-form input,.contact-form textarea").not('.submit').val('');
                                $('.message-box').html(data);
                                $('#loading').css('visibility', 'hidden');
                                $(".contact-form").css('display', 'none');
                            }
                    );
                });

            });
        }
    }



//video bgground
    if ($('.video-bg').length > 0 && !jQuery.browser.safari /*  && parseInt(jQuery.browser.version)>=600*/) {
        var $video = $('.video-bg');
        $video.YTPlayer({
            videoId: $video.attr('data-video-id'),
            mute: true,
            playerVars: {
                html5: 1,
                modestbranding: 0,
                autoplay: 1,
                controls: 1,
                showinfo: 0,
                wmode: 'transparent',
                branding: 0,
                rel: 0,
                autohide: 0,
                origin: window.location.origin
            },
            events: {
                'onReady': onPlayerReady,
                'onError': function () {
                    $video.remove();
                }

            }
            ,
            callback: function () {

                var h = $('.ytplayer-player').height();
                var w = $('.ytplayer-player').width();
                $('iframe.ytplayer-player').addClass('youtube-player').attr('type', 'text/html');
            }
        });
    }
    if ($('.video-bg').length > 0 && jQuery.browser.safari /* && parseInt(jQuery.browser.version)<=599 */) {
        $('.video-bg').append("<div class='bg-image' data-bg-image='https://img.youtube.com/vi/" + $('.video-bg').attr('data-video-id') + "/maxresdefault.jpg'></div>")
        $('.video-bg .bg-image[data-bg-image]').each(function () {
            var el = $(this);
            var sz = getImgSize(el, el.attr("data-bg-image"));
            el.css('background-position', 'center').css('background-image', "url('" + el.attr("data-bg-image") + "')").css('background-size', 'cover').css('background-repeat', 'no-repeat');
        });
    }
    fixViewHeight();
    function fixViewHeight() {
        if (jQuery.browser.safari && parseInt(jQuery.browser.version) <= 600) { //safari 9.1 supports VH but lower, NOT!
            $(".view-height").each(function () {
                var el = $(this);
                el.css('height', $(window).outerHeight()).css('overflow', 'hidden');
            });
        }
    }
    function onPlayerReady() {
        var player = $('.video-bg').data('ytPlayer').player;
        player.mute();
    }
//reading time estimate
    var $article = $('#page-content');
    if ($article.length > 0) {
        $article.readingTime({
            readingTimeTarget: $('.reading-time'),
            wordCountTarget: $('.word-count'),
            wordsPerMinute: 275,
            round: false,
            success: function () {
                ;
            },
            error: function (message) {

            }
        });
    }
//hashtag navigation address setup (deeplink)
    // $('.navbar a').address($(this).attr('href'));



    $.address.change(function (event) {
        var pageID = event.value.split('/')[1];
        if (pageID != '' && pageID.indexOf('.') === -1) {
            var el = $(".navbar [href=#" + pageID + "]");
            $('.navbar .active').removeClass('active');
            el.parent().addClass('active');
            scrollToSection("#" + pageID);
        } else {
            if (pageID.indexOf('.') > -1) {
                window.location = pageID;
            }
        }
    });


    $('.navbar a').on('click', function (event) {
        event.preventDefault();
        var clickedMenu = $(this);
        $('.navbar .active').toggleClass('active');
        clickedMenu.parent().toggleClass('active');
        if (clickedMenu.attr('href').substr(0, 1) === "#") {
            scrollToSection(clickedMenu.attr('href'));
        } else {
            window.location = clickedMenu.attr('href');
        }
    });


    function scrollToSection(destSection) {
        $('html, body').stop().animate({
            scrollTop: $(destSection).offset().top + scrollOffset
        }, 2000, 'easeInOutExpo');
    }



    /**
     Provides requestAnimationFrame in a cross browser way.
     @author paulirish / http://paulirish.com/ */
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (/* function FrameRequestCallback / callback, / DOMElement Element */ element) {};
        })();
    }
})(jQuery);