var points = [];
var infowindows = [];

function init() {
  var map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: new google.maps.LatLng(0, 0),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });

  var loader = new FacebookLoader();
  loader.setFriendsLimit(5);
  loader.run(function () {
    var friends = my_profile.getFriends();
    plotFriends(friends, map);
  });
}

function plotFriends(friends, map) {
  var geo = new google.maps.Geocoder;
  var name, hometown;

  for(var i = 0; i < friends.length; i++) {
    name = friends[i].getName();

    if(friends[i].getHometown() !== null) {
      hometown = friends[i].getHometown().getName();

      geo.geocode({ 'address': hometown }, function(res, status) {

        if(status == google.maps.GeocoderStatus.OK) {

          points[i] = new google.maps.Marker({
            position: res[0].geometry.location,
            map: map,
            title: name
          });

          infowindows[i] = new google.maps.InfoWindow({
            content: hometown
          });

          google.maps.event.addListener(points[i], 'click', function() {
            infowindows[i].open(map, points[i]);
          });

        }
      });
    }
  }
}

//google.maps.event.addDomListener(window, 'load', init); //now done onload body
