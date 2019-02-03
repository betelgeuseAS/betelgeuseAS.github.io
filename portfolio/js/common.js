$(function() {

	//Preloader
	$(window).on('load', function () {
    var $preloader = $('#p_prldr');
    //     $svg_anm   = $preloader.find('.svg_anm');
    // $svg_anm.fadeOut();
    $preloader.delay(500).fadeOut('slow');
  });



	//Change images:
	// var currentBackgroundImageNumber = 1,
	// 		maxBackgroundImages = 5,
	// 		t = 10000,
	// 		timer = setInterval(function() {
	// 			currentBackgroundImageNumber++;
	// 			if(currentBackgroundImageNumber > maxBackgroundImages) {
	// 				currentBackgroundImageNumber = 1;
	// 			}
	// 			$('header').css('background-image', 'url(img/Header/pic' + currentBackgroundImageNumber + '.jpg)');
	// 		}, t);
  //Random (for start page):
  var startPage =  document.querySelector('header');
  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }
  var rand = randomInteger(1, 5);
  startPage.style.backgroundImage = 'url(img/Header/pic' + rand + '.jpg';



	// Parallax
	$(window).scroll(function() {
		var st = $(this).scrollTop();
		$('.header-text').css({
			'transform' : 'translate(0%, ' + st/4 + '%'
			// 'transform' : 'translate(0%, ' + st + '%'
			// 'transform' : 'translate(0%, -' + st/2 + '%'
		});
	});



	//Equal height for blocks:
	var item = document.querySelectorAll('.blocks .item');
	var maxHeight = 0;
	for(var i = 0; i < item.length; i++) {
		if(item[i].offsetHeight > maxHeight) {
			maxHeight = item[i].offsetHeight;
		}
	}
  for(var i = 0; i < item.length; i++) {
    item[i].style.height = maxHeight + 'px';
  }



	//Hamburger
	var menu = $('nav ul');
	var hamburgers = document.querySelector(".hamburger");
	hamburgers.addEventListener("click", function() {
	  this.classList.toggle("is-active");
	  menu.slideToggle();
	}, false);
	$(window).resize(function(){ //Для того що меню було видно кои назад збільшуєш вікно, бо так воно не відображається.
		var w = $(window).width();
		if(w > 320 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});



	// PageScroll2Id
	$('nav a, .toTop').mPageScroll2id({
    layout:"auto",
		offset: 20,
		// scrollSpeed: 100
	});




	// Mix it up
	var mixer = mixitup('.cont', {
      // selectors: {
      //   target: '.mix',
      // },
      // animation: {
      //     duration: 300
      // }
  });



  //Колбек на кнопку відправки форми
  document.querySelector('form .butt').addEventListener('click', function(event) {
  	event.preventDefault();
  	alert('Sorry, unable to send request.');
  });



	//WOW
	new WOW().init({
		// offset: 200,
		mobile: false
	});


});
