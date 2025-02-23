$(document).ready(function(){
	$(window).scroll(function () {
        if (parseFloat($(window).scrollTop()) >= 80) {    
            $(".page-header").addClass("sticky-top");  
            /*$("#back-top").fadeIn("fast");*/
             $('.catalog-product-view .page-header').removeClass("sticky-top") 
        } else {
            $(".page-header").removeClass("sticky-top");  
            /*$("#back-top").fadeOut("fast");*/
        }
        if($(window).width() > 768){
            if (parseFloat($(window).scrollTop()) >= 900) {
            	$('.catalog-product-view .product_nav').addClass('nav_fixed');
            }else {
            	 $('.catalog-product-view .product_nav').removeClass('nav_fixed'); 
            }
        }
    });
    $(".nav_wrapper .product-title").click(function() {
        $("html, body").animate({
          scrollTop: 0}, {duration: 500,easing: "swing"});
        return false;
    });
    $(".nav_wrapper .overview").click(function() {
        $("html, body").animate({
          scrollTop: $(".maz_pro > .overview").offset().top - 300}, {duration: 500,easing: "swing"});
        return false;
    });
    $(".nav_wrapper .specifications").click(function() {
        $("html, body").animate({
          scrollTop: $(".maz_pro > .specifications").offset().top - 300}, {duration: 500,easing: "swing"});
        return false;
    });
    $(".nav_wrapper .download").click(function() {
        $("html, body").animate({
          scrollTop: $(".feimi-download").offset().top - 300}, {duration: 500,easing: "swing"});
        return false;
    });
    $(".nav_wrapper .faq").click(function() {
        $("html, body").animate({
          scrollTop: $(".product-faq").offset().top - 300}, {duration: 500,easing: "swing"});
        return false;
    });
    if($(window).width() < 768){
        $('.page-footer .footer-links-wrapper .row .footer-box .h3').click(function(){
            $(this).parent('.footer-box').toggleClass("active");
        });
        $(window).scroll(function () {
            if (parseFloat($(window).scrollTop()) >= 180) {
                $('.catalog-product-view .product_nav').addClass('nav_fixed');
            }else {
                $('.catalog-product-view .product_nav').removeClass('nav_fixed');
            }
        })
    }
    $('.pro-cat-faqs').find('ol').find('li').first().addClass('active');
    $('.faqs-list .item .title').on('click', function () {
        if ($(this).parent().children('.description').css('display') !== 'none') {
            $(this).parents('li').removeClass('active');
        } else {
            $(this).parents('.pro-cat-faqs').find('ol li').removeClass('active');
            $(this).parents('li').addClass('active');
        }
        return false;
    });
    
});