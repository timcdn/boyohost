/*

[Main Script]

*/

;(function ($) {
    "use strict";
	
    var $wn = $(window),
        $document = $(document),
        $body = $('body');
        
    /* ------------------------------------------------------------------------- *
     * Check Data
     * ------------------------------------------------------------------------- */
    var checkData = function (data, value) {
        return typeof data === 'undefined' ? value : data;
    };
	
    $(function () {
        /* ------------------------------------------------------------------------- *
         * WHMCS Styles Fix
         * ------------------------------------------------------------------------- */
		var $whmcsStyles = $('link[href*="all.min.css"]');
		
		if ( $whmcsStyles.length ) {
			$whmcsStyles.prependTo( 'head' );
		}
		
        /* ------------------------------------------------------------------------- *
         * Background Image
         * ------------------------------------------------------------------------- */
        var $bgImg = $('[data-bg-img]');
        
        $bgImg.each(function () {
            var $t = $(this);

            $t.css( 'background-image', 'url(' + $t.data('bg-img') + ')' );
        });

        /* ------------------------------------------------------------------------- *
         * Background Video
         * ------------------------------------------------------------------------- */
        var $bgVideo = $('[data-bg-video]');
        
        if ( $bgVideo.length ) {
            $bgVideo.tubular({videoId: $bgVideo.data('bg-video'), wrapperZIndex: 0});
        }

        /* ------------------------------------------------------------------------- *
         * Hover Intent
         * ------------------------------------------------------------------------- */
        var $navHoverIntent = $('.NavHoverIntent');
        
        $navHoverIntent.hoverIntent({
            selector: 'li.dropdown',
            over: function () {
                $(this).addClass('open');
            },   
            out: function () {
                $(this).removeClass('open');
            },
            timeout: 0,
            interval: 0
        });

        /* ------------------------------------------------------------------------- *
         * Tooltip
         * ------------------------------------------------------------------------- */
        var $tooltip = $('[data-toggle="tooltip"]');
        
        $tooltip.mouseover( function(){
            $tooltip.tooltip();
        });

        var $wishlistBtns = $('.yith-wcwl-add-to-wishlist div a');

        if ( $wishlistBtns.length ) {
            $wishlistBtns.attr('title', function () {
                return this.innerText.trim();
            }).tooltip();
        }
        
        /* ------------------------------------------------------------------------- *
         * Animate Scroll
         * ------------------------------------------------------------------------- */
        var $animateScrollLink = $('.AnimateScrollLink'),
            $animateScrollList = $('.AnimateScrollList'),
            animateScrolling = function (e) {
                var target = $(this).attr('href'),
					offset = $('.header--navbar').outerHeight() + 30;
                
                $(target).animatescroll({
                    padding: offset,
                    easing: "easeInOutExpo",
                    scrollSpeed: 1200
                });
                
                e.preventDefault();
            };
        
        $animateScrollLink.on('click', animateScrolling);
        $animateScrollList.on('click', 'a', animateScrolling);
        
        
        /* ------------------------------------------------------------------------- *
         * Magnific Popup
         * ------------------------------------------------------------------------- */
        var $popupImg = $('[data-popup="img"]');
        
        if ( $popupImg.length ) {
            $popupImg.magnificPopup({
                type:'image',
                zoom: {
                    enabled: true
                }
            });
        }
        
        /* ------------------------------------------------------------------------- *
         * StickyJS
         * ------------------------------------------------------------------------- */
        var $sticky = $('[data-sticky]'),
			$wpAdminBar = $('#wpadminbar'),
			stickyOffset = $wpAdminBar.length && $wn.width() > 600 ? $wpAdminBar.outerHeight() : 0;
        
        $sticky.each(function () {
            $(this).sticky({
				topSpacing: stickyOffset,
                zIndex: 999
            });
        });
        
        /* ------------------------------------------------------------------------- *
        * Sticky Logo
        * ------------------------------------------------------------------------- */
            $wn.on( 'load scroll', function(){
                
                var $scrollLogo  = $( '.is-sticky .header--logo .sticky-logo' ),
                    $primaryLogo = $( '.header--logo .sticky-logo' );
                
                if( $wn.scrollTop() > 1 ){
                    $scrollLogo.show( '3000', function(){
                        $sticky.sticky('update');
                    } );
                }else{
                    $primaryLogo.hide( '3000', function(){
                        $sticky.sticky('update');
                    } );
                }
                
            } );
        
        
        /* ------------------------------------------------------------------------- *
         * Counter Up
         * ------------------------------------------------------------------------- */
        var $counterUp = $('[data-counter-up="numbers"]');
            
        if ( $counterUp.length ) {
            $counterUp.counterUp({
                delay: 10,
                time: 1000
            });
        }
        
        /* -------------------------------------------------------------------------*
         * Countdown
         * -------------------------------------------------------------------------*/
        var $countDown = $('[data-counter-down]');
        if( $countDown.length ){
            $countDown.each(function () {
                var $t = $(this);                           
                $t.countdown($t.data('counter-down'), function(e) {
                    $(this).html( '<ul>' + e.strftime('<li><strong>%D</strong><span>Days</span></li><li><strong>%H</strong><span>Hours</span></li><li><strong>%M</strong><span>Minutes</span></li><li><strong>%S</strong><span>Seconds</span></li>') + '</ul>' );
                });
            });
        }

        /* ------------------------------------------------------------------------- *
         * Parallax
         * ------------------------------------------------------------------------- */
        var $parallaxLayers = $('[data-trigger="parallax_layers"]');

        $parallaxLayers.each(function () {
            new Parallax( $(this)[0], {
                selector: '[data-depth]'
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * Banner Slider Nav
         * ------------------------------------------------------------------------- */
        var $bannerSlider = $('.banner--slider'),
            $bannerSliderNav = $('.banner--slider-nav'),
            $bannerSliderNavList = $bannerSliderNav.find('li');
        
        if ( $bannerSliderNav.length ) {
            $bannerSliderNavList.css( 'width', (100 / $bannerSliderNavList.length) + '%' );

            $bannerSlider.on('changed.owl.carousel', function (e) {
                var $goto = e.page.index === -1 ? 0 : e.page.index;
                $bannerSliderNavList.eq( $goto ).addClass('active').siblings().removeClass('active');
            });
        }

        $bannerSliderNav.on('click', 'li', function (e) {
            e.preventDefault();
            var $goto = $(this).index();
            $bannerSlider.trigger( 'to.owl.carousel', [$goto] );
        });
        
        /* ------------------------------------------------------------------------- *
         * Owl Carousel
         * ------------------------------------------------------------------------- */
        // WooCommerce Product Gallery owlCarousel
        var $flexControlThumbs = $('.flex-control-thumbs');
        if ( $flexControlThumbs.length ) {
            $flexControlThumbs.addClass( 'thumbnails owl-carousel' ).attr( 'data-carousel-loop', 'false' );
        }
        
        var $owlCarousel = $('.owl-carousel');
        
        $owlCarousel.each(function () {
            var $t = $(this);
            
            $t.owlCarousel({
                items: checkData( $t.data('carousel-items'), 3 ),
                margin: checkData( $t.data('carousel-margin'), 15 ),
                loop: checkData( $t.data('carousel-loop'), true ),
                smartSpeed: 1200,
                autoplay: checkData( $t.data('carousel-autoplay'), false ),
                autoplaySpeed: checkData( $t.data('carousel-smartspeed'), 1200 ),
                mouseDrag: checkData( $t.data('carousel-mousedrag'), true ),
                autoplayHoverPause: checkData( $t.data('carousel-hover-pause'), false ),
                nav: checkData( $t.data('carousel-nav'), true ),
                navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
                dots: checkData( $t.data('carousel-dots'), false ),
                responsive: checkData( $t.data('carousel-responsive'), {} )
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * Services Tab Area
         * ------------------------------------------------------------------------- */
        var $servicesTabNav = $('.services-tab--nav');
        
        $servicesTabNav
            .find('li [title]').tooltip({ trigger: 'manual' })
                .end()
                .find('li.active [title]').tooltip('show')
                .end()
                .on('shown.bs.tab', function (e) {
                    $(e.target).tooltip('show');
                    $(e.relatedTarget).tooltip('hide');
                });

        /* ------------------------------------------------------------------------- *
         * Pricing Filter
         * ------------------------------------------------------------------------- */
        var $pricingFilter = $('.pricing--filter'),
            $pricingFilterIndicator = $pricingFilter.find('.indicator');

        if ( $pricingFilterIndicator.length ) {
            $pricingFilterIndicator.css({
                'left': function () {
                    var $pos = $(this).siblings('.active').position().left - 5;

                    return $pos;
                },
                'width': function () {
                    var $width = $(this).siblings('.active').width() + 10;

                    return $width;
                }
            });

            $pricingFilter.on('shown.bs.tab', '[data-toggle="tab"]', function () {
                var $el = $(this).parent('.active');

                $el.siblings('.indicator').css({
                    'left': $el.position().left - 5,
                    'width': $el.width() + 10
                });
            });
        }

        /* ------------------------------------------------------------------------- *
         * Pricing Included Area
         * ------------------------------------------------------------------------- */
        var $pricingIncluded = $('#pricingIncluded');
        
        if ( $pricingIncluded.length ) {
            var objPricingIncluded = {
                pricingItemFirst: $pricingIncluded.find('.pricing--item:first-child .pricing--features li:not(:first-child)'),
                pricingItemOther: $pricingIncluded.find('.pricing--item:not(:first-child) .pricing--features li')
            };
            
            objPricingIncluded.pricingItemOther.each(function (i) {
                var $t = $(this),
                    value = objPricingIncluded.pricingItemFirst.eq( $t.index() ).text();
                
                $t.prepend( '<strong class="hidden-md hidden-lg">' + value + '</strong>' );
            });
        }
        
        /* -------------------------------------------------------------------------*
         * Pricing Table Area
         * -------------------------------------------------------------------------*/
        var $pricingTable = $('.PricingTable'),
            $pricingTableHeadings = $pricingTable.find('thead th');
        
        if ( $pricingTable.length ) {
            $pricingTable.find('tbody td').each(function () {
                var $t = $(this),
                    value = $pricingTableHeadings.eq( $t.index() ).text();
                
                $t.prepend( '<strong class="hidden-md hidden-lg">' + value + '</strong>' );
            });
        }
        
        /* ------------------------------------------------------------------------- *
         * VPS Pricing Area
         * ------------------------------------------------------------------------- */
        var $vpsPricing = $('#vpsPricing');
        
        if ( $vpsPricing.length ) {
        
			var    vpsPricingObj = JSON.parse( vpsdataobj.vpsdata );
			
			vpsPricingObj.$slider = $vpsPricing.find('#vpsPricingSlider');
			vpsPricingObj.$putValue = $vpsPricing.find('[data-put-value]');
			vpsPricingObj.$putHref = $vpsPricing.find('[data-put-href]');
				
			vpsPricingObj.slider = function (res) {
				vpsPricingObj.slider.value = 1;
				vpsPricingObj.slider.max = res.length - 1;
				
				vpsPricingObj.slider.changeValue = function (e, ui) {
					vpsPricingObj.slider.value = $.isEmptyObject( ui ) ? vpsPricingObj.slider.value : ui.value;
					
					vpsPricingObj.$slider.find('.ui-slider-handle').html( '<div class="pricing--content"><div class="pricing--header"><h3 class="h4">' + res[ vpsPricingObj.slider.value ].title + '</h3><h4 class="h5">'+ res[ vpsPricingObj.slider.value ].subtitle +'<strong>' + res[ vpsPricingObj.slider.value ].price + '</strong></h4></div><div class="pricing--icon"><i class="fa ' + res[ vpsPricingObj.slider.value ].icon + '"></i></div></div>' );
					
					vpsPricingObj.$putValue.each(function () {
						var $t = $(this);
						
						$t.text( res[ vpsPricingObj.slider.value ][ $t.data('put-value') ] );
					});

					vpsPricingObj.$putHref.attr('href', res[ vpsPricingObj.slider.value ][ vpsPricingObj.$putHref.data('put-href') ] );
				};
				
				vpsPricingObj.$slider.slider({
					animate: 'fast',
					range: 'min',
					min: 0,
					max: vpsPricingObj.slider.max,
					value: vpsPricingObj.slider.value,
					step: 1,
					create: vpsPricingObj.slider.changeValue,
					slide: vpsPricingObj.slider.changeValue
				});
			};
			
			if ( $vpsPricing.length ) {
				vpsPricingObj.slider( vpsPricingObj );
				
				vpsPricingObj.$items = $vpsPricing.find('.vps-pricing--items');
				vpsPricingObj.$tag = $vpsPricing.find('.vps-pricing--tag');
				
				vpsPricingObj.$tag.css( 'height', vpsPricingObj.$items.height() );
				
				$wn.on('resize', function () {
					vpsPricingObj.$tag.css( 'height', vpsPricingObj.$items.height() ); 
				});
			}
        
        
        }
		
        /* ------------------------------------------------------------------------- *
         * Datacenter Area
         * ------------------------------------------------------------------------- */
        var $datacenterSlider = $('.datacenter--slider');
                
        $datacenterSlider.on('changed.owl.carousel', function (e) {
           $datacenterSlider.find('.owl-item').eq( e.item.index ).children('a').tab('show');
        });
        
        /* -------------------------------------------------------------------------*
         * Map
         * -------------------------------------------------------------------------*/
        var $map = $('#map'),
			$contactForm = $('.quotes-form--content'),
            mapHeight = $contactForm.length ? $contactForm.outerHeight() : 400,
            setMap = function () {
                var map = new google.maps.Map($map[0], {
                    
                    center: {lat: parseFloat( mapdata.latitude, 10 ), lng: parseFloat( mapdata.longitude, 10 )},
                    zoom: parseInt( mapdata.zoom, 10 ),
                    scrollwheel: false,
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
                });
        
                if ( mapdata.multimarkup ) {
                    
                    var data = JSON.parse( mapdata.multimarkup ),
                        i = 0;
                    for ( i; i < data.length; i++ ) {
                        new google.maps.Marker({
                            position: {lat: parseFloat( data[i][0], 10 ), lng: parseFloat( data[i][1], 10 )},
                            map: map,
                            animation: google.maps.Animation.DROP,
                            draggable: true
                        });
                    }
                }
            };
                
        if ( $map.length ) {
            $map
                .css('height', mapHeight)
                .next('#contactInfo').css( 'margin-top', -($('#contactInfo').outerHeight()) )
                .prev('#map').css('z-index', -1);
            
            setMap();
        }
        
        /* -------------------------------------------------------------------------*
         * Contact Area
         * -------------------------------------------------------------------------*/
        var $contactForm = $('.contact--form'),
            $contactMap = $('.contact--map'),
            $contactStatus = $('.contact--status'),
            setContactMapHeight = function () {
                $contactMap.children('#map').css( 'height', $contactForm.outerHeight() );
            },
            contactFormAjax = function (el) {
                var $el = $(el),
                    formURL = $el.attr('action'),
                    formData = $el.serialize();
                    
                $.post(formURL, formData, function (res) {
                    $contactStatus.show().html(res).delay(3000).fadeOut('show');
                });
            };
        
        if ( $contactForm.length ) {
            setContactMapHeight();
            
        }
        
        /* ------------------------------------------------------------------------- *
         * Product Single Image
         * ------------------------------------------------------------------------- */
        var $prodcutSingleImg = $('.product--single-img');
        
        $prodcutSingleImg.on('click', '.owl-item a', function () {
            $(this).addClass('active').parent('.owl-item').siblings().children('a').removeClass('active');
        });
		
		/* ------------------------------------------------------------------------- *
		 * Product Quantity
		 * ------------------------------------------------------------------------- */
		var $cartBtn = $('button[name="update_cart"][disabled]');

		$document.on('click', '.product--quantity .fa', function () {
			var $el = $(this),
				$dir = $el.data('dir'),
				$input = $el.siblings('input'),
				min = $input.attr('min'),
				max = $input.attr('max'),
				total = parseInt($input[0].value, 10);
			
			switch ($dir) {
				case 'up':
					if ( max && total < max ) {
						total++;
					} else if (!max) {
						total++;
					}
					break;

				case 'down':
					if ( min && total > min ) {
						total--;
					} else if (!min) {
						total--;
					}
					break;
			}

			$input.val( total );

			if ( $cartBtn.length && $cartBtn.is(':disabled') ) {
				$cartBtn.prop('disabled', false);
			}
		});
        
        /* ------------------------------------------------------------------------- *
         * Product Rating
         * ------------------------------------------------------------------------- */
        var $productRatingSelect = $('#productRatingSelect');
        
        if ( $productRatingSelect.length ) {
            $productRatingSelect.barrating({
                theme: 'bootstrap-stars',
                hoverState: false
            });
        }
        
        /* ------------------------------------------------------------------------- *
         * Coming Soon Slider
         * ------------------------------------------------------------------------- */
        var $comingSoonSlider = $('.coming-soon--slider');
        
        if ( $comingSoonSlider.length ) {
            $comingSoonSlider
                .css( 'height', $('.coming-soon--content').outerHeight() )
                .trigger('refresh.owl.carousel');
        }

    });
    
    $wn.on('load', function () {
        /* ------------------------------------------------------------------------- *
         * Body Scrolling
         * ------------------------------------------------------------------------- */
        var isBodyScrolling = function () {
            if ( $wn.scrollTop() > 1 ) {
                $body.addClass('isScrolling');
            } else {
                $body.removeClass('isScrolling');
            }
        };
        
        isBodyScrolling();
        $wn.on('scroll', isBodyScrolling);
        
        /* ------------------------------------------------------------------------- *
         * Banner Slider
         * ------------------------------------------------------------------------- */
        var $bannerSlider = $('.banner--slider');

        if ( $bannerSlider.length ) {
            $bannerSlider.find('.banner--item').css('min-height', $bannerSlider.outerHeight());
        }
        
        /* ------------------------------------------------------------------------- *
         * Adjust Row
         * ------------------------------------------------------------------------- */
        var $adjustRow = $('.AdjustRow');
        
        if ( $adjustRow.length ) {
            $adjustRow.isotope({layoutMode: 'fitRows'});
        }
        
        /* ------------------------------------------------------------------------- *
         * Masonry Row
         * ------------------------------------------------------------------------- */
        var $masonryRow = $('.MasonryRow');
        
        if ( $masonryRow.length ) {
            $masonryRow.isotope();
        }
        
        /* ------------------------------------------------------------------------- *
         * Features Grid Area
         * ------------------------------------------------------------------------- */
        var $featuresGridLeft = $('.features-grid--left'),
            $featuresGridRight = $('.features-grid--right'),
            featuresGridRightChildH = 0,
            featuresGridRightChildren = function () {
                $featuresGridRight.find('.features-grid--item').each(function (i) {
                    var $t = $(this);
                    
                    featuresGridRightChildH = $t.outerHeight() > featuresGridRightChildH ? $t.outerHeight() : featuresGridRightChildH;
                    
                    $featuresGridRight.children('.row').children('div').css('height', featuresGridRightChildH);
                    
                    if ( i === ($featuresGridRight.length - 1) ) {
                        $featuresGridLeft.css( 'height', $featuresGridRight.outerHeight() );
                    }
                });
            };
            
        featuresGridRightChildren();
        $wn.on('resize', featuresGridRightChildren);
        
        /* ------------------------------------------------------------------------- *
         * Gallery Area
         * ------------------------------------------------------------------------- */
        var $galleryItems = $('.gallery--items'),
            galleryItem = '.gallery--item',
            $galleryFilter = $('.gallery--filter');
        
        if ( $galleryItems.length ) {
            $galleryItems.isotope({
                animationEngine: 'best-available',
                itemSelector: galleryItem
            });
            
            $galleryFilter.on('click', 'li', function () {
                var $t = $(this),
                    f = $t.data('target'),
                    s = (f !== '*') ? '[data-cat~="'+ f +'"]' : f;
                
                $galleryItems.isotope({
                    filter: s
                });
                
                $t.addClass('active').siblings().removeClass('active');
            });
        }
        
        /* -------------------------------------------------------------------------*
         * Contact Info Area
         * -------------------------------------------------------------------------*/
		var $contactInfo = $('#contactInfo'),
			$builderPageWrapper = $('.builder-page-wrapper > .vc_row:nth-last-child(2)'),
			$contactInfoTarget = $builderPageWrapper.find('.hoskia--section'),
			$mapFull = $builderPageWrapper.find('#map:last-child'),
			contactInfoBC = $contactInfoTarget.length ? $contactInfoTarget.css('background-color') : '#fff';
		
		if ( $contactInfo.length ) {
			$contactInfo.css('background-color', contactInfoBC);
		}
		
		// if ( $mapFull.length && $mapFull.width() === $wn.width() ) {
		// 	$contactInfo.addClass('contact__info--overlap');
		// }
        
        /* ------------------------------------------------------------------------- *
         * Preloader
         * ------------------------------------------------------------------------- */
        var $preloader = $('#preloader');
        
        if ( $preloader.length ) {
            $preloader.fadeOut(function () {
                $body.addClass('loaded');
            });
        }

        /* ------------------------------------------------------------------------- *
         * SCROLLING ANIMATIONS
         * ------------------------------------------------------------------------- */
        // var $scrollRevealGroup = $('[data-scroll-reveal="group"]'),
        //     $scrollReveal = '';

        // if ( typeof ScrollReveal === "function" ) {
        //     $scrollReveal = ScrollReveal();

        //     $scrollReveal
        //         .reveal('[data-scroll-reveal="left"]', {origin: 'left', mobile: false, duration: 800})
        //         .reveal('[data-scroll-reveal="right"]', {origin: 'right', mobile: false, duration: 800})
        //         .reveal('[data-scroll-reveal="bottom"]', {duration: 800, mobile: false});

        //     $scrollRevealGroup.each(function () {
        //         $scrollReveal.reveal($(this).children(), {duration: 800, mobile: false}, 150);
        //     });
        // }
    });
    
}(jQuery));
