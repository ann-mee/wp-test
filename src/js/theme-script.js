jQuery(function($) {

    $('#slider').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        let i = (currentSlide ? currentSlide : 0) + 1;
        let number = i;
        
        if ( i < 10 ){
            number = '0' + i.toString();  
        }
        $(this).find('.slick-counter').text(number);

        if( i > 1 ){
            $(this).find('.slick-status').text('');
        }
        else{
            $(this).find('.slick-status').text('Start');
        }
    });

    $('#slider').slick({
        slidesToShow: 1,
        arrows: false,
        dots: true,
    });

    $('#slider').append('<div class="slick-nav"><div class="slick-counter">01</div><div class="slick-status">Start</div></div>');
    $('#slider .slick-dots').appendTo('.slick-nav');
   
    $('.slick-slide .slider__item').height($(window).height());
    
    $(window).resize(function() {
        $('.slick-slide .slider__item').height($(window).height());
    });
});