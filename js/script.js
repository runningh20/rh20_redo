function include(url){
  document.write('<script src="'+url+'"></script>');
  return false ;
}


/* DEVICE.JS
========================================================*/
include('js/device.min.js');


/* Easing library
========================================================*/
include('js/jquery.easing.1.3.js');

/* menu
========================================================*/
include('js/jquery.mousewheel.min.js');
include('js/smoothing-scroll.js');

$(window).load(function() {
  var
    menuSelector = $('.menu')
  , asideMenuSelector = $('.aside-menu')
  , offsetArray = []
  , offsetValueArray = []
  , _document = $(document)
  , currHash = ''
  , isAnim = false
  , isHomePage = $('body').hasClass('home')? true:false
  ;
  
  //--------------------------- Menu navigation ---------------------------

  getPageOffset();
  function getPageOffset(){
    offsetArray = [];
    offsetValueArray = [];
    $('.hashAncor').each(function(){
      var _item = new Object();
      _item.hashVal = "#"+$(this).attr('id');
      _item.offsetVal = $(this).offset().top;
      offsetArray.push(_item);
      offsetValueArray.push(_item.offsetVal);
    })
  }

  function offsetListener(scrollTopValue, anim){
    if(isHomePage){

      scrolledValue = scrollTopValue;
      var nearIndex = 0;

      nearIndex = findNearIndex(offsetValueArray, scrolledValue)
      currHash = offsetArray[nearIndex].hashVal;

      if(window.location.hash != currHash){
        if(anim){
          isAnim = true;
          $('html, body').stop().animate({'scrollTop':scrolledValue}, 600, function(){
            isAnim = false;
            window.location.hash = currHash;
            $('html, body').stop().animate({'scrollTop':scrolledValue},0);
            return false;
          });
        }else{
          window.location.hash = currHash;
          $('html, body').stop().animate({'scrollTop':scrolledValue},0);
          return false;
        }
      }
    }
  }

  function findNearIndex(array, targetNumber){
    var
      currDelta
    , nearDelta
    , nearIndex = -1
    , i = array.length
    ;

    while (i--){
      currDelta = Math.abs( targetNumber - array[i] );
      if( nearIndex < 0 || currDelta < nearDelta )
        {
          nearIndex = i;
          nearDelta = currDelta;
        }
    }
    return nearIndex;
  }

  $(window).on('mousedown',function(){
    isAnim = true;
  })
  $(window).on('mouseup',function(){
    isAnim = false;
    offsetListener(_document.scrollTop(), false);
  })

  $(window).on('mousewheel', function(event){
    offsetListener(_document.scrollTop(), false);
  })
  $(window).on('resize', function(){
    getPageOffset();
  })

  $('> li a[href^="#"]', menuSelector).on('click',function (e) {
    e.preventDefault();
    
    var target = this.hash,
    $target = $(target);
    offsetListener($target.offset().top, true);
    return false;
  });
  $('> li a[href^="#"]', asideMenuSelector).on('click',function (e) {
    e.preventDefault();

    var target = this.hash,
    $target = $(target);
    offsetListener($target.offset().top, true);
    return false;
  });
  

  $(window).on('hashchange', function() {
    var
      target = window.location.hash ? window.location.hash : offsetArray[0].hashVal;

      $('.active-menu-item').removeClass('active-menu-item');
      $('> li a[href="' + target + '"]', menuSelector).parent().addClass('active-menu-item');
      $('> li a[href="' + target + '"]', asideMenuSelector).parent().addClass('active-menu-item');
  }).trigger('hashchange');

})

/* Stellar.js
========================================================*/
include('js/stellar/jquery.stellar.js');
$(document).ready(function() { 
  if ($('html').hasClass('desktop')) {
      $.stellar({
        horizontalScrolling: false,
        verticalOffset: -50
      });
  }  
});


/* TOOGLE
========================================================*/
$(window).load(function(){
  $(".navbar-toggle").click(function(){
    $(".aside-panel").animate({right:"0"},400);
    return false
  });  
  $(".remove-panel").click(function(){
    $(".aside-panel").animate({right:"-290"},400);
    return false
  });  

  var $spinner = $('.content-load-spinner');
  setTimeout(function(){
      $spinner.fadeOut(600);
  }, 700);
})


/* OWL Carousel
========================================================*/
include('js/owl.carousel.min.js');
$(document).ready(function() { 
  var owl = $("#owl"); 
  owl.owlCarousel({
    autoPlay: 8000,
    items : 1, //10 items above 1000px browser width
    itemsDesktop : [1000,1], //5 items between 1000px and 901px
    itemsDesktopSmall : [900,1], // betweem 900px and 601px
    itemsTablet: [600,1], //2 items between 600 and 0
    itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
    pagination: true
  }); 
});




/* Video library
========================================================*/
include('js/jquery.vide.js');
$(document).ready(function () {
    $("#home").vide("video/video",{
      volume: 1,
      playbackRate: 1,
      muted: true,
      loop: true,
      autoplay: true,
      position: "50% 50%" // Alignment
  });
    $('#home video').fadeOut(0).delay(200).fadeIn(800);
});


/* Caroufredsel 
========================================================*/
include('js/jquery.carouFredSel-6.0.4-packed.js');
    $(function() {
      $('#carousel').carouFredSel({
        width: '100%',
        items : {
          visible : {
            min : 5,
            max : 5 
          },
          minimum: 1,
          start: 3
        },
        scroll: {
          items: 1,
          fx: "scroll",
          easing: "swing",
          duration: 500,
          onBefore: function( data ) {
          // 0 1 2 3 [ 4 ]
          data.items.old.removeClass('medium').removeClass('large').removeClass('small');

          data.items.visible.eq(0).addClass('small')
          // 0 [ 1 ] 2 3 4
          data.items.visible.eq(1).addClass('medium')
          // 0 1 2 [ 3 ] 4
          data.items.visible.eq(2).addClass('large');

          data.items.visible.eq(3).addClass('medium')


          }
        },
        auto: false,
        swipe:{
          onTouch: true
        },
        prev:".prev_s",
        next:".next_s"
      });     

      });



/* Touchtouch library
========================================================*/
include('js/touchTouch.jquery.js');
$(window).load(function () {       
  $('.zoom').touchTouch();
});



/* Chart.js library
========================================================*/
include('js/chart.js');
include('js/scrollShowTime.js');

$(window).load(function () {  
    function chartStart(){
      var pieData_1 = [
        {
          value: 85,
          color:"#05b4fd"          
        },
         {
          value: 15,
          color:"#0d76a2"
        }

      ];
      var pieData_2 = [
        {
          value: 45,
          color:"#6fd51d"          
        },
         {
          value: 55,
          color:"#4d8a1b"
        }

      ];
      var pieData_3 = [
        {
          value: 89,
          color:"#faf80a"          
        },
         {
          value: 11,
          color:"#a09f10"
        }

      ];
      var pieData_4 = [
        {
          value: 75,
          color:"#fe3131"          
        },
         {
          value: 25,
          color:"#a22727"
        }

      ];

        var ctx = document.getElementById("chart-area_1").getContext("2d");
        window.myPie = new Chart(ctx).Pie(pieData_1, {
          segmentShowStroke : false,
          animationEasing : "ease",
          responsive:true
        });

        var ctx = document.getElementById("chart-area_2").getContext("2d");
        window.myPie = new Chart(ctx).Pie(pieData_2, {
          segmentShowStroke : false,
          animationEasing : "ease",
          responsive:true
        });

        var ctx = document.getElementById("chart-area_3").getContext("2d");
         window.myPie = new Chart(ctx).Pie(pieData_3, {
          segmentShowStroke : false,
          animationEasing : "ease",
          responsive:true
        });

        var ctx = document.getElementById("chart-area_4").getContext("2d");
        window.myPie = new Chart(ctx).Pie(pieData_4, {
          segmentShowStroke : false,
          animationEasing : "ease",
          responsive:true
        });
    } 
    //chartStart();

      if ($('html').hasClass('desktop')) {
            $('#priorities').scrollShowTime({onShow: chartStart})          
      }else{
        chartStart();
      } 
      
    });

/* Wow js
========================================================*/
include('js/wow/wow.min.js');
$(window).load(function () {       
  if ($('html').hasClass('desktop')) {
    new WOW().init();
  }   
});



/* ToTop
========================================================*/
include('js/jquery.ui.totop.js');
$(function () {   
  $().UItoTop({ easingType: 'easeOutQuart' });
});


/* Contact Form
========================================================*/
include('js/TMForm.js');
include('js/modal.js');


/* Copyright Year
========================================================*/
var currentYear = (new Date).getFullYear();
$(document).ready(function() {
  $("#copyright-year").text( (new Date).getFullYear() );
});


/* Orientation tablet fix
========================================================*/
$(function(){
// IPad/IPhone
	var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
	ua = navigator.userAgent,

	gestureStart = function () {viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";},

	scaleFix = function () {
		if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
			viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
			document.addEventListener("gesturestart", gestureStart, false);
		}
	};
	
	scaleFix();
	// Menu Android
	if(window.orientation!=undefined){
  var regM = /ipod|ipad|iphone/gi,
   result = ua.match(regM)
  if(!result) {
   $('.sf-menu li').each(function(){
    if($(">ul", this)[0]){
     $(">a", this).toggle(
      function(){
       return false;
      },
      function(){
       window.location.href = $(this).attr("href");
      }
     );
    } 
   })
  }
 }
});
var ua=navigator.userAgent.toLocaleLowerCase(),
 regV = /ipod|ipad|iphone/gi,
 result = ua.match(regV),
 userScale="";
if(!result){
 userScale=",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0'+userScale+'">')