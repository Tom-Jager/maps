function init() {
  var map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: new google.maps.LatLng(0, 0),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });

  var loader = new FacebookLoader();
  loader.setFriendsLimit(20);
  loader.run(function () {
    var friends = my_profile.getFriends();
    plotFriends(friends, map);
  });
}

function plotFriends(friends, map) {
  for(var i = 0; i < friends.length; i++) {
    plotFriend(friends[i], map);
  }
}

function plotFriend(friend, map) {
  var geo = new google.maps.Geocoder;

  var name = friend.getName();
  var hometown = friend.getHometown().getName();
  var hometownLatLong = getLatLong(hometown);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(hometownLatLong.lat(), hometownLatLong.lng()), //TODO: get long lat from fb hometown
    map: map,
    title: name
  });

  var infowindow = new google.maps.InfoWindow({
    content: hometown
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

function getLatLong(hometown) {
  var geo = new google.maps.Geocoder;

  geo.geocode({
    'address': hometown
  }, function(res, status) {
    return res[0].geometry.location;
  });
}

//google.maps.event.addDomListener(window, 'load', init); //now done onload body
