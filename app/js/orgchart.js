
 var panZoom;
 var eventsHandler;



$(window).resize(function(){
//  resizeSvg();
  panZoom.resize();
  panZoom.fit();
  panZoom.center();
})

// event handler
eventsHandler = {
  haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
, init: function(options) {
    var instance = options.instance
      , initialScale = 1
      , pannedX = 0
      , pannedY = 0

    // Init Hammer
    // Listen only for pointer and touch events
    this.hammer = Hammer(options.svgElement, {
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
    })

    // Enable pinch
    this.hammer.get('pinch').set({enable: true})

    // Handle double tap
    this.hammer.on('doubletap', function(ev){
      instance.zoomIn()
    })

    // Handle pan
    this.hammer.on('panstart panmove', function(ev){
      // On pan start reset panned variables
      if (ev.type === 'panstart') {
        pannedX = 0
        pannedY = 0
      }

      // Pan only the difference
      instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
      pannedX = ev.deltaX
      pannedY = ev.deltaY
    })

    // Handle pinch
    this.hammer.on('pinchstart pinchmove', function(ev){
      // On pinch start remember initial zoom
      if (ev.type === 'pinchstart') {
        initialScale = instance.getZoom()
        instance.zoom(initialScale * ev.scale)
      }

      instance.zoom(initialScale * ev.scale)

    })

    // Prevent moving the page on some devices when panning over SVG
    options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
  }

, destroy: function(){
    this.hammer.destroy()
  }
}













$( document ).ready(function() {
//resizeSvg();
var panZoom = window.panZoom =  svgPanZoom('.orgchart', {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: false,
    center: 1,
    dblClickZoomEnabled:false,
    customEventsHandler: eventsHandler
  });
  panZoom.resize();
  panZoom.fit();
  panZoom.center();
    $('.roleWrapper').attr("fill","#3d3d3d");


});


function resizeSvg (){
  var  wSvg=  $( window ).width();
  console.log('windows witdht:  ' +$( window ).width())
  var hSvg;
  if  (wSvg >=1200) {
    hsvg=450;
    console.log ('1200')
  }
  else if (wSvg>=992 && wSvg <1200 ){
    hsvg=300;
    console.log ('992')

  }
  else if (wSvg>=768 && wSvg <992 ){
    hsvg=200;
    console.log ('768')

  }
  else if (wSvg>=576 && wSvg <768 ){
    console.log ('576')

    hsvg=250;
  }
  else if (wSvg<576 ){
    hsvg=200;
    console.log ('576<<')

  }
  $('.orgchart').height(hsvg);
  $('.orgchart').width(wSvg);
}


$('body').on('click', '.departmentTitle', function(e){
  var url=$(this).data('url');
  scrollText(url);
  resetColors();
  $(this).children('.titleWrapper').attr("fill","#E74700");
  console.log ()
});


// $('body').on('click', '.menuItem', function(e){
//   $('.menuItem').removeClass('selected');
//   var url=$(this).data('url');
// var gColor=  $("g[data-url='" +url +"']");
//   $(this).toggleClass('selected');
//   resetColors ();
// var fillTgt=  $(".orgchart").find("[data-url='" + url + "']");
// fillTgt.children('.roleWrapper').attr("fill","#E74700");
// fillTgt.children('text').attr("color","#FFF");
//   scrollText(url);
//
// });



$('body').on('click', '.jobRole', function(e){
  resetColors ();
  var url=$(this).data('url');
  $(this).children('.roleWrapper').attr("fill","#E74700");
  $(this).children('text').attr("color","#FFF");
  //scrollText(url);
  showInfo (url)


});

function showInfo (url){
  $('.modal-body').html(null);
  var content = $(url).html();
  console.log (content)
  $('.modal-body').html(content);
  $('#contentModal').modal('show');
}


function scrollText(url)
{
  $('.text-body').animate({
                    scrollTop: $('.text-body').scrollTop() + $(url).position().top
                }, 1000);

}



function resetColors () {
  $('.titleWrapper').attr("fill","#0075FF");
  $('.roleWrapper').attr("fill","#3d3d3d");
}
