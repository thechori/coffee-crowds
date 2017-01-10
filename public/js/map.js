function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.745988, lng: -95.394177},
    // center: {lat: -33.9, lng: 151.2},
    zoom: 13
  });

  setMarkers(map);
}

function setMarkers(map) {
  // var coffeeShop = new google.maps.LatLng(29.745988, -95.394177);

  var coffeeShops = [
    ['Campesino Coffee House', 29.745988, -95.394177, 1],
    ['Black Hole Coffee', 29.732654, -95.395006, 2],
    ['Inversion Coffee House', 29.75127, -95.391722, 3]
  ];

  var image = {
    url: '/img/coffee-cup_50px.png',
    // size: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 30)
  };

  for (var i = 0; i < coffeeShops.length; i++) {
    var coffeeShop = coffeeShops[i];
    var marker = new google.maps.Marker({
      position: {
        lat: coffeeShop[1],
        lng: coffeeShop[2]
      },
      map: map,
      icon: image,
      title: coffeeShop[0],
      zIndex: coffeeShop[3]
    });
  }
}
