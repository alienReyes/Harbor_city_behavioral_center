var map;
var dataContent;
var jsonFile='js/data.json';
var markers={}

function init() {
 map= L.map('map', {
   attributionControl: false,
        minZoom:0,
        maxZoom:2,
        zoom:1,
         zoomControl: false,
        crs: L.CRS.Simple
    }).setView([-450, 912], 1);
    var w=3000,
        h=1500,
        url='images/big_map.jpg';
        // calculate the edges of the image, in coordinate space
  var southWest = map.unproject([0, h], map.getMaxZoom()-1);
  var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
  var bounds = new L.LatLngBounds(southWest, northEast);
  L.imageOverlay(url, bounds).addTo(map);
  map.setMaxBounds(bounds);
  map.dragging.disable();
   map.touchZoom.disable();
   map.doubleClickZoom.disable();
   map.scrollWheelZoom.disable();

}


$( document ).ready(function() {
  $('.closeBtn').hide();
  init ();
  $.getJSON(jsonFile, function (data) {
    var template = document.getElementById('templatePanel').innerHTML;
     var html = Mustache.to_html(template, data);
     $('#accordion').append(html);
    for (var i in data.markers) {
      var xPos= data.markers[i].xPos;
      var yPos= data.markers[i].yPos;
      var id= data.markers[i].id;
       //createMarker(xPos, yPos,id);
    }
  }).done(function() {
    console.log ('json ready');
    $('#healthCenter').collapse('toggle');
     $('.pannel-side').toggleClass('pannel-side__closed')

  })


  $('body').on('click', '.item', function(){
    var frame= $(this).data('iframe');
     var type= $(this).data('type');
     switch(type) {
       case "link":
          if (frame==true){
            $(".extContainer").attr("src",$(this).data('url') );
            $(".extContainer").animate({top:0}, 500, function() {})
              //$(".extContainer").toggleClass("extContainer--open")
              $('.closeBtn').fadeIn(300);
          }
           break;
           case "document":
           var url="documents/"+$(this).data('url');
           window.open(url);

             break;
       case "video":
         break;
       }
  });


});




$('.closeBtn').click(function() {
  $('.closeBtn').hide();
  var delta=$( window ).height();
  console.log (delta+"<<<")
  $(".extContainer").animate({top:delta}, 500, function() {
    $(".extContainer").attr("src",null );
      $('.closeBtn').fadeOut(300);
  })

});












function createMarker (xPos,yPos,id){
  var coordinates= map.unproject( [xPos,yPos] )
  var marker = L.marker(coordinates).on('click', onClick);
  marker.id=id;
  marker.addTo(map);
  console.log ('marker Created')
};


function onClick(e) {
$('#'+e.target.id).collapse('toggle')
map.setView([e.latlng.lat, e.latlng.lng], 1);

if ($('.pannel-side').hasClass('pannel-side__closed'))
{
   $('.pannel-side').toggleClass('pannel-side__closed');
};

};
