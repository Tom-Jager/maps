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
  var name, hometown, point, infowindow;

  for(var i = 0; i < friends.length; i++) {

    if(friends[i].getHometown() !== null) {
      name = friends[i].getName();
      hometown = friends[i].getHometown().getName();

      geo.geocode({ 'address': hometown }, function(res, status) {

        if(status == google.maps.GeocoderStatus.OK) {

          point = new google.maps.Marker({
            position: res[0].geometry.location,
            map: map,
            title: name
          });

          infowindow = new google.maps.InfoWindow({
            content: hometown
          });

          google.maps.event.addListener(point, 'click', function() {
            infowindow.open(map, point);
          });

        }
      });
    }
  }
}

//google.maps.event.addDomListener(window, 'load', init); //now done onload body
