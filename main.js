function initialize() {
  var map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: new google.maps.LatLng(0, 0),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });

  plotPoint("", map); //TODO: pass fb data TEST
}

var friendsLoc = new Array();

function runLoader() {
  // Create an instance of FacebookLoader
  // and store it in a variable called loader
  var loader = new FacebookLoader();
  loader.setFriendsLimit(20);
  loader.run(function () {
    var friends = my_profile.getFriends();
    for (var i=0; i<friends.length; i++) {
      friendsLoc[i][0] = friends[i].getName();
      friendsLoc[i][1] = friends[i].getHometown();
      friendsLoc[i][2] = friendsLoc[i][1].getId();
      friendsLoc[i][1] = friendsLoc[i][1].getName();
    }
  });
}

function plotPoint(data, map) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(51.5072, 0.1275), //TODO: get long lat from fb hometown
    map: map,
    title:""
  });

  var infowindow = new google.maps.InfoWindow({
    content: "" //TODO: get info from fb
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
