var duration = 100;
var startMinute = 200;
var page = $('#container').attr('data-category');
var slug = $('#container').attr('data-slug');

navFormat(page);
Template(page);
setSessionNumber(1);

function Template(page) {
	if(page != 'home') { $('#mobile-nav').html(' / '+page); }
	else { $('#mobile-nav').html(''); }

}

$(window).resize(function () { navFormat(page); });

window.onpopstate = function(event) {
	var currentURL = window.location.href;
	var urlSplit = currentURL.split('/');
	var page = urlSplit[3];
	var slug = urlSplit[4];

	if(page=='') {
		var page = 'home';
	}

	Template(page,slug);
}

$('.menu-link').click(function () {
	var href = $(this).attr('href');
	var urlSplit = href.split('/');
	var page = urlSplit[1];
	var slug = urlSplit[2];

	if(page=='') { var page = 'home'; }

	var currentURL = window.location.href;
	var checkURL = window.location.origin+href;

	if(currentURL!=checkURL) { setURL(page,'',href); }

	return false;
});

$('.mobile-menu-link').click(function () {
	var href = $(this).attr('href');
	var urlSplit = href.split('/');
	var page = urlSplit[1];
	var slug = urlSplit[2];

	if(page=='') { var page = 'home'; }

	var currentURL = window.location.href;
	var checkURL = window.location.origin+href;

	if(currentURL!=checkURL) { setURL(page,'',href); }
	else { closeEffect(page) }

	return false;
});

$(window).scroll(function () {
	var width = $(window).width();
	var height = $(window).scrollTop();
	var dataCheck = $('#mobile-menu').attr('data-check');
	
	if(dataCheck == 'false') {
	if(width > 650) {
		if(height > 1) {
			$('#mobile-menu').addClass('mobile-menu-fadeIn');
			//$('#menu').addClass('menu-fadeOut');
			$('#mobile-menu').removeClass('mobile-menu-fadeOut');
			//$('#menu').removeClass('menu-fadeIn');
		} else {
			$('#mobile-menu').addClass('mobile-menu-fadeOut');
			//$('#menu').addClass('menu-fadeIn');
			$('#mobile-menu').removeClass('mobile-menu-fadeIn');
			//$('#menu').removeClass('menu-fadeOut');
		}
	}
	}
});


function navFormat(page) {

	var width = $(window).width();
	var bannerZoom = width/1270;
	var mobileBannerZoom = 0.9*width;
	var dataCheck = $('#mobile-menu').attr('data-check');

	if(width > 650) {

		if(dataCheck == 'true') {
			$('#mobile-menu').css('opacity','1');
		} else {
			$('#mobile-menu').css('opacity','0');
		}
	} else {
		$('#mobile-menu').css('opacity','1');
	}

	if(page == 'home') {

		if(width > 650) {
			$('body').css({'display':'flex','align-items':'center','justify-content':'center'});
			$('#nav').css({'width':'100%','position':'fixed','top':'0','left':'0'});
			$('#float').attr('onclick','nextImage();');
			$('#float').removeClass('back');

			$('.home').css('zoom', bannerZoom);
			$('.home-banner').css('zoom', bannerZoom);

			$('.home-banner li  a').addClass('flash-open');
			setTimeout(function(){ $('.home-banner li a').removeClass('flash-open'); }, 800);
		} else {
			$('body').removeAttr('style');
			$('#nav').removeAttr('style');
			$('#footer').removeAttr('style');

			$('.home').css('zoom', '1');
			$('.mobile-banner li').css('width', mobileBannerZoom);
			$('.mobile-banner li').css('height', mobileBannerZoom);
		}

	} else {
		$('body').removeAttr('style');
		$('#nav').removeAttr('style');
		$('#footer').removeAttr('style');
		$('#float').attr('onclick','Back();');
		$('#float').addClass('back');

		if(page == 'contact') {
			if(width > 650) {
				$('#footer').css('display', 'none');
			} else {
				$('#footer').css('display', 'block');
			}
		}
	}
}

$('#mobile-menu').click(function () {
	var dataCheck = $(this).attr('data-check');
	$(this).attr('data-check','true');

	$('#nav').css('z-index','999999');
	$('#effect').css({'display':'block','z-index':'999998'});
	$('.menu-mask').css('display','flex');
	$('#logo').css('opacity','0');
	$('#menu').css('opacity','0');

	$('#mobile-menu span.t').css({'transform':'rotate(45deg)','top':'20px','background':'#fff'});
	$('#mobile-menu span.b').css({'transform':'rotate(-45deg)','bottom':'20px','background':'#fff'});

	if(dataCheck == 'true') {
		$('#nav').css('z-index','999998');
		$('#effect').css({'display':'none','z-index':'999999'});
		$('.menu-mask').css('display','none');
		$('#logo').css('opacity','1');
		$('#menu').css('opacity','1');

		$('#mobile-menu span.t').removeAttr('style');
		$('#mobile-menu span.b').removeAttr('style');

		$(this).attr('data-check','false');
	}
});

function nextImage() {

	var homeBannerHtml = $('.home-banner li:first-child').html();

	$('.home-banner').css('pointer-events','none');
	$('.home-banner li:first-child').remove();
	$('.home-banner').append('<li class="img-flash">'+homeBannerHtml+'</li>');

	$('.home-banner li:first-child').addClass('img-flash-next');
	setTimeout(function(){ $('.home-banner li').removeClass('img-flash-next'); }, 400);

	$('.home-banner li:nth-child(3) a').addClass('flash-open');
	setTimeout(function(){ $('.home-banner li:nth-child(3) a').removeClass('flash-open'); }, 800);

	setTimeout(function(){ $('.text-transition').removeClass('text-transition-next'); }, 550);

	setTimeout(function(){ $('.home-banner').css('pointer-events','auto'); }, 550);

	setSessionNumber(getSessionNumber()+1);
}

function setSessionNumber(number) {
	var number = Number(number);

	if(number < 1) { number = 4; }
	if(number > 4) { number = 1; }

	if(number == 1) { 
		$('#progress-4').removeClass('active');
		$('#progress-1').addClass('active');
	}
	if(number == 2) { 
		$('#progress-1').removeClass('active');
		$('#progress-2').addClass('active');
	}
	if(number == 3) { 
		$('#progress-2').removeClass('active');
		$('#progress-3').addClass('active');
	}
	if(number == 4) { 
		$('#progress-3').removeClass('active');
		$('#progress-4').addClass('active');
	}

	$.session.set('key', number);
}

function getSessionNumber() {
	return Number($.session.get('key'));
}

$(document).on('mousemove', function(e){
	var width = $(document).width();
	var height = $(document).height();

	if(width > 990) {
	$('#cursor').css({'display':'block','left': Number((e.pageX)-10),'top': Number((e.pageY)-10),'z-index': '9999999'});
	if(Number((e.pageX)+24) > width) { $('#cursor').css({'display': 'none'}); }
	if(Number((e.pageX)) < 10) { $('#cursor').css({'display': 'none'}); }
	if(Number((e.pageY)+24) > height) { $('#cursor').css({'display': 'none'}); }
	if(Number((e.pageY)) < 10) { $('#cursor').css({'display': 'none'}); }

	$('a, #float, button, #mobile-menu').hover(
		function() {
			$('#cursor').css({'transform':'scale(2.5)','border':'none','background':'rgba(0,0,0,0.2)'});
		},
		function() {
			$('#cursor').css({'transform':'scale(1)','border':'3px #333 solid','background':'none'});
		}
	);
	}
});
