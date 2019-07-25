function initiateMap() {
  var center = mids;
  var q = data.map(w => [...w[0]]);

  var x = data.map(da => [da[0], ...da[1].split(",")]);
  var xy = new Array();
  for (var i = 0; i < x.length; i++) {
    xy[i] = x[i].map(g => {
      if (g.indexOf("<") >= 0) {
        return g;
      } else {
        return parseFloat(g);
      }
    });
  }
  //console.log(xy);
  var locations = xy;

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: center
  });
  var infowindow = new google.maps.InfoWindow({});
  var marker, count;
  for (count = 0; count < locations.length; count++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        locations[count][1],
        locations[count][2]
      ),
      map: map,
      title: locations[count][0]
    });
    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, count) {
        return function() {
          infowindow.setContent(locations[count][0]);
          infowindow.open(map, marker);
        };
      })(marker, count)
    );
  }
}
