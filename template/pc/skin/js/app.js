$(function() {
	// 点击展开导航栏
	var mobileScroll;

	function func(e) {
		e.preventDefault();
	}
	$(".nav-btn").click(function() {
		document.addEventListener('touchmove', func, false);
		mobileScroll = new IScroll("#wrapper1", {
			click: true,
			scrollY: true
		});
		$(".bg").css({ "display": "block" });
		$(".iphone-nav").addClass("iphone-nav-active");
	})
	// 关闭导航栏
	$(".bg").click(function() {
		$(".iphone-nav").removeClass("iphone-nav-active");
		$(".bg").css({ "display": "none" });
		document.removeEventListener('touchmove', func, false);
		mobileScroll.destroy();
	})
    checkBrowser();

})

// 判断浏览器
var checkBrowser = function() {
    var userAgent = navigator.userAgent.toLowerCase();
    var msie9 = /msie 9\.0/i.test(userAgent);
    var msie8 = /msie 8\.0/i.test(userAgent);
    var msie7 = /msie 7\.0/i.test(userAgent);
    var msie6 = /msie 6\.0/i.test(userAgent);
    var checkHtml = '';

    // if (msie9 || msie8 || msie7 || msie6) {
    //     $('body').append(checkHtml);
    // };

    if (msie8) {
        checkHtml = '<div class="checkBrowser"><span>您现在使用的是IE8内核，版本过低！建议您升级到IE9+或者使用极速模式浏览，以体验最佳效果!</span><a title="关闭" onclick="checkBrowser.close();">×</a></div>';
        $('body').append(checkHtml);
    } else if (msie7) {
        checkHtml = '<div class="checkBrowser"><span>您现在使用的是IE7内核，版本过低！建议您升级到IE9+或者使用极速模式浏览，以体验最佳效果!</span><a title="关闭" onclick="checkBrowser.close();">×</a></div>';
        $('body').append(checkHtml);
    } else if (msie6) {
        checkHtml = '<div class="checkBrowser"><span>您现在使用的是IE6内核，版本过低！建议您升级到IE9+或者使用极速模式浏览，以体验最佳效果!</span><a title="关闭" onclick="checkBrowser.close();">×</a></div>';
        $('body').append(checkHtml);
    };

    checkBrowser.close = function() {
        $('.checkBrowser').remove();
    }
}

// 判断是否移动设备
var isMobile = function() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    } else {
        return false;
    }
}
/*返回顶部*/
$("#top").click(function() {
	$("body, html").stop().animate({
			"scrollTop": 0
		});
	});
/* 微信提示 */
	var btn=document.getElementById('btn');
	var clipboard=new Clipboard(btn);
	clipboard.on('success', function(e){
		$('#weixin').slideDown().delay(1500).slideUp(500);
		console.log(e);
	});
	clipboard.on('error', function(e){
		$('#weixin').slideDown().delay(1500).slideUp(500);
		console.log(e);
	});
/* 微信弹窗 */
function dkcf(){$('#wxnr').fadeIn("fast");$('#fdwx').fadeOut("fast");}
function gbcf(){$('#fdwx').fadeIn("slow");$('#wxnr').fadeOut("fast");}