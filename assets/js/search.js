var map;
var kerry = { lat: 52.261062, lng: -9.683187 };
var typeStore;
var radLocation;
var request;

function initMap() {
  // Create the map.
  map = new google.maps.Map(document.getElementById('map'), {
    center: kerry,
    zoom: 17
  });

  // Create the places service.
  function findPlaces() {
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;
  var typeStore = document.getElementById('outlet').value;
  var radLocation = document.getElementById('radiusSelect').value;
  var moreButton = document.getElementById('more');
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  var request = {
    location: kerry,
    radius: radius,
    keyword: type
    };

}

  // Perform a nearby search

     service.nearbySearch(request)( 
    
    //   {location: kerry, radius: 10000, type: ['hotel']},
      function(results, status, pagination) {
        if (status !== 'OK') return;

        createMarkers(results);
        moreButton.disabled = !pagination.hasNextPage;
        getNextPage = pagination.hasNextPage && function() {
          pagination.nextPage();
        };
      });
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    var li = document.createElement('li');
    li.textContent = place.name;
    placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}