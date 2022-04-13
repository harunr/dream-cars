(function($){
	$(function(){
        // Phone nav click function        
        $('#phone-nav').click(function () {
            var txt = $(this).find('div')
            if(txt.text() === 'MENU'){
                $("body").addClass("navShown");  
                $('#phone-nav').find('div').text('CLOSE');
                $(".nav-wrap").fadeIn();
            }else{
                $("body").removeClass("navShown");  
                $('#phone-nav').find('div').text('MENU');
                $(".nav-wrap").fadeOut();
            }
        });

        $(".main-nav-left > ul > li").find("ul").parent("li").addClass("has-sub-nav");
        
        if($(window).width() < 768 ){
            $(".main-nav-left > ul > li.has-sub-nav > a").bind('click', 'touchend', function (e) {
                e.preventDefault();
                $(".main-nav-left > ul > li").find("> ul:visible").slideUp();
                $(".main-nav-left > ul > li").removeClass("active");
                if ($(this).parent().find("> ul:visible").length) {
                    $(this).removeClass("active");
                    $(this).parent().find("> ul").slideUp();
                } else {
                    $(this).addClass("active");
                    $(this).parent().find("> ul").slideDown();
                }
            });
        }
        
        /* Nav hover effect */
        $('.main-nav-left > ul > li.has-sub-nav').each(function(){
            $(this).mouseover(function(){
                $('body').addClass('navHovered');
            });
            $(this).mouseout(function(){
                $('body').removeClass('navHovered');
            });
        });
        
        
        //  venue-carousel function 
        if($('#activities-slider').length){
            $('#activities-slider').slick({
                dots: false,
                arrows:true,
                autoplay:false,
                autoplaySpeed:5000,
                infinite: true,
                navigation:false,
                speed: 700,
                slidesToShow:3,
                slidesToScroll: 1,
                prevArrow: '.activities-arrow-left',
                nextArrow: '.activities-arrow-right',
                responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                adaptiveHeight:true,
                            },
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ],
                
            });
//            createSlick();
//
//            $(window).on( 'resize orientationchange', createSlick );
           
        };
   
        //  venue-carousel function 

        /*activites treading slider*/

        if($(".slider-thumb-wrap").length){          
            var thumSlider = $(".slider-thumb-wrap");

                thumSlider.slick({
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 700,
                    autoplay: false,
                    fade: true,
                    arrows: true,
                    waitForAnimate: true,
                    asNavFor: '.content-text-wrap',
                    infinite: true,
                 
                });


            var contentSlider =  $(".content-text-wrap");

            var totalSlide = contentSlider.find(".content-text-wrap").length;
                var lastItemIndex = totalSlide -1;
            var $counter = $('.counter dfn');

                contentSlider.on("init", function(event, slick, currentSlide, nextSlide){
                    var lastSlideActiveFigure = $(".content-text-wrap .slick-slide").eq(lastItemIndex).hasClass("slick-current");
                    var firstSlideActiveFigure = $(".content-text-wrap .slick-slide").eq(0).hasClass("slick-current");
                });
            
                contentSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
                    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                    var i = (currentSlide ? currentSlide : 0) + 1;
                    if(totalSlide < 10){
                     $counter.text('0'+i);   
                    }else{
                        $counter.text(i);
                    }
                });

                contentSlider.slick({
                    dots: false,
                    vertical: false,
                    asNavFor: '.slider-thumb-wrap',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 800,
                    autoplay: false,
                    arrows: true,
                    infinite: true,
                    prevArrow: '#arrow-left',
                    nextArrow: '#arrow-right'
           
                })  


            };
       /*activites treading slider*/
        
        $('.discover button').bind('click', 'touchend', function (e){
            var topPos = $(this).parents('section.hero-section').next('section').offset().top;
            $('html, body').stop(true, true).animate({
                scrollTop: topPos
            }, 500)
            console.log(topPos)
        })
        
        
        var $animation_elements = $('.animate');
        var $window = $(window);

        function check_if_in_view() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);

            $.each($animation_elements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if (element_top_position <= window_bottom_position) {
                    $element.addClass('in-view');
                } else {
                    //$element.removeClass('in-view');
                }
            });
        }

        if($('.animate').length){
            $window.on('scroll resize', check_if_in_view);
            $window.trigger('scroll');
        }

        
        // Headroom init function
        var header = new Headroom(document.querySelector(".main-header-section"), {
            tolerance: 5,
            offset : 205,
            classes: {
              initial: "headroom",
              pinned: "slideDown",
              unpinned: "slideUp"
            }
        });
        header.init();
        
        
	})// End ready function.
   
    $(window).on('load', function(){  // Window load function 
        // Preloader function
        TweenMax.to($(".loader .bg"), 1, {
            y: -100 + '%',
            ease: Quart.easeInOut
        });
        $('.loader').delay(1000).fadeOut();
        
        $('body').addClass('loaded');
        
        /*var delayTime = 0;
        if($('.slider-item').length){
            $('.slider-item').each(function(i){
                $(this).css({
                   'animation-delay'  : delayTime + (i * .25) + 's'
                }); 
            });
        }
        if($('.gallery-item').length){
            $('.gallery-item').each(function(i){
                $(this).css({
                   'animation-delay'  : delayTime + (i * .25) + 's'
                }); 
            });
        }
        if($('.latest-thumb').length){
            $('.latest-thumb').each(function(i){
                $(this).css({
                   'animation-delay'  : delayTime + (i * .25) + 's'
                }); 
            });
        }*/
    });  // End window load function 
    
  
    
})(jQuery)

