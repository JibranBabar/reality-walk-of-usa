/* ====== Index ======

1. MULTIPLE MARKER
2. STYLED MAP

====== End ======*/

$(function() {
  "use strict";

  /*======== 5. MULTIPLE MARKER ========*/
  function multiMarkerMap() {
    var locations = [
      ["Bondi Beach", -33.890542, 151.274856, 4],
      ["Coogee Beach", -33.923036, 151.259052, 5],
      ["Cronulla Beach", -34.028249, 151.157507, 3],
      ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
      ["Maroubra Beach", -33.950198, 151.259302, 1]
    ];

    var center = new google.maps.LatLng(-33.92, 151.25);
    var map = new google.maps.Map(document.getElementById("multiMarkerMap"), {
      zoom: 10,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  }

  /*======== 6. STYLED MAP ========*/
  function styleMap() {
    var style = [
      {
        stylers: [
          {
            hue: "#2c3e50"
          },
          {
            saturation: 250
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            lightness: 50
          },
          {
            visibility: "simplified"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ];

    var dakota = new google.maps.LatLng(44.3341, -100.305);
    var map = new google.maps.Map(document.getElementById("styleMap"), {
      zoom: 7,
      center: dakota,
      mapTypeId: "roadmap",
      styles: style
    });
  }

  if (document.getElementById("google-map")) {
    google.maps.event.addDomListener(window, "load", basicMap);

    google.maps.event.addDomListener(window, "load", markerMap);

    google.maps.event.addDomListener(window, "load", polyMap);

    google.maps.event.addDomListener(window, "load", polylineMap);

    google.maps.event.addDomListener(window, "load", multiMarkerMap);

    google.maps.event.addDomListener(window, "load", styleMap);
  }
});
