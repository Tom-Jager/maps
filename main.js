var myMarker;
var markers = [];
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
    plotMe(my_profile, map);
  });
}

//TODO
function plotMe(me, map) {
  var geo = new google.maps.Geocoder;

  if(me.getHometown() !== null) {
    var hometown = me.getHometown().getName();

  geo.geocode({ 'address': hometown }, function(res, status) {

    if(status == google.maps.GeocoderStatus.OK) {

      var marker = new google.maps.Marker({
        position: res[0].geometry.location,
        map: map,
        title: hometown,
        draggable: true
      });

      var infowindow = new google.maps.InfoWindow({
        content: "Me!"
      });

      google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker);
      });

      google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close(map, marker);
      });

    }
  });
  }
}

function plotFriends(friends, map) {
  for(var i = 0; i < friends.length; i++) {
    plotFriend(friends[i], map, i);
  }
}

function plotFriend(friend, map, i) {
  var geo = new google.maps.Geocoder;
  var name = friend.getName();
  var profilePic = friend.getPicture();

  if(friend.getHometown() !== null) {
    var hometown = friend.getHometown().getName();

	geo.geocode({ 'address': hometown }, function(res, status) {

    if(status == google.maps.GeocoderStatus.OK) {

  		var marker = new google.maps.Marker({
  		  position: res[0].geometry.location,
  		  map: map,
  		  title: hometown,
        icon: profilePic
  		});

      $(marker.id).css("border-radius: 5px;")

      markers[i] = marker;

  		var infowindow = new google.maps.InfoWindow({
  		  content: "Name: " + name
  		});

      infowindows[i] = infowindow;

      google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker);
      });

      google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close(map, marker);
      });

	  }
	});
  }
}

//google.maps.event.addDomListener(window, 'load', init); //now done onload body
