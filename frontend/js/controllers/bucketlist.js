(function () {

  angular
    .module('bundle_app')
    .controller('bucketlistCtrl', bucketlistCtrl);

  bucketlistCtrl.$inject = ['$scope', '$http', 'authentication', 'contentData', '$location', 'tripService', '$timeout'];

  function bucketlistCtrl($scope, $http, authentication, contentData, $location, tripService, $timeout) {

    $scope.user = authentication.currentUser();

    $scope.creatingTrip = false;

    newTripList = {};

    var currentCategory = 'all';

    var mapOptions = {
      zoom: 8,
      center: {lat: 44.567, lng: -79.434},
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      scrollwheel: false,
      fullscreenControl: false,
      streetViewControl: false,
      backgroundColor: '#232323',
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapStyles
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var bounds = new google.maps.LatLngBounds();

    $scope.activeContentList = {};

    var contentList = {
      all : {},
      places : {},
      activities : {},
      food : {},
      social : {},
      events : {}
    };

    var updateVisibleContent = function () {
      var tmpContentList = {};

      for(md5 in contentList[currentCategory]) {
        if(contentList[currentCategory].hasOwnProperty(md5)) {
          if(map.getBounds().contains(contentList[currentCategory][md5].marker.getPosition())) {
            tmpContentList[md5] = contentList[currentCategory][md5];
          }
        }
      }

      $timeout(function () {
        $scope.activeContentList = tmpContentList;
      });
    }

    map.addListener('dragend', function() { updateVisibleContent(); });
    map.addListener('zoom_changed', function() { updateVisibleContent(); });

    contentData.getSaves($scope.user.id, 'ALL').then(function(saves) {
      var feeds = Object.keys(saves);

      if(feeds.length === 0) {
        $('#add-experiences').css('display', 'block');
        $('#create-trip-start').css('display', 'none');
        $('.column-container').css('min-height', '50vh');
      } else {
        $('#add-experiences').css('display', 'none');
        $('#create-trip-start').css('display', 'block');
      }

      for(var i = 0; i < feeds.length; i++) {
        var content = Object.keys(saves[feeds[i]]);
        for(var j = 0; j < content.length; j++) {
          contentData.getContentItem(saves[feeds[i]][content[j]].md5).then(function (contentItem) {
            contentItem.marker = new google.maps.Marker({
              position: {
                lat: contentItem.location.lat,
                lng: contentItem.location.lon
              },
              map: map
            });

            bounds.extend(contentItem.marker.getPosition());
            if(contentItem.md5 === saves[feeds[feeds.length - 1]][content[content.length - 1]].md5) {
              map.fitBounds(bounds);
              google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
                this.setZoom(this.getZoom() - 2);
              });
            }

            contentItem.borderClass = 'available-border';

            var contentString = " \
            <img src='" + contentItem.url + "'\
            style='\
            width: 200px;\
            border-radius: 2px;\
            '> <p style='font-family: \"Lato\", sans-serif; width: 200px;'>" + contentItem.description + "</p>";

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            contentItem.marker.addListener('click', function() {
              infowindow.open(map, contentItem.marker);
            });

            contentList.all[contentItem.md5] = contentItem;
            $scope.activeContentList[contentItem.md5] = contentItem;

            for(var k = 0; k < contentItem.tags.bundle.length; k++) {
              console.log(contentItem.tags.bundle[k].toLowerCase());
              contentList[contentItem.tags.bundle[k].toLowerCase()][contentItem.md5] = contentItem;
            }
          });
        }
      }
    });

    $scope.tabs = [
      'All',
      'Places',
      'Activities',
      'Food',
      'Social',
      'Events'
    ];

    $scope.setCategory = function (category) {

      for(var md5 in contentList[currentCategory]) {
        if(contentList[currentCategory].hasOwnProperty(md5)) {
          contentList[currentCategory][md5].marker.setVisible(false);
        }
      }

      currentCategory = category.toLowerCase();
      $scope.activeContentList = contentList[currentCategory];

      for(var md5 in contentList[currentCategory]) {
        if(contentList[currentCategory].hasOwnProperty(md5)) {
          contentList[currentCategory][md5].marker.setVisible(true);
        }
      }

      updateVisibleContent();
    }

    $scope.bounceMarker = function (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);

      $('html, body').stop().animate({scrollTop : 0}, 500, 'swing');

      setTimeout(function() {
        marker.setAnimation(null);
      },3 * 700);
    }

    $scope.createTrip = function (name) {
      $scope.creatingTrip = true;
      $('#create-trip-start').css('display', 'none');
      $('#create-trip-done').css('display', 'block');
      $('#create-trip-done').addClass('disabled');
    }

    $scope.addToTrip = function (md5) {
      if(newTripList.hasOwnProperty(md5)) {
        delete newTripList[md5];
        $scope.activeContentList[md5].borderClass = 'available-border';
        console.log(Object.keys(newTripList).length);
        if(Object.keys(newTripList).length === 0) {
          $('#create-trip-done').addClass('disabled');
        }
      } else {
        newTripList[md5] = $scope.activeContentList[md5];
        $scope.activeContentList[md5].borderClass = 'active-border';
        $('#create-trip-done').removeClass('disabled');
      }

      $scope.activeContentList = contentList[currentCategory];
    }

    $scope.doneCreatingTrip = function () {
      if(newTripList.length === 0) { return; }

      $scope.creatingTrip = false;
      $('#create-trip-start').css('display', 'block');
      $('#create-trip-done').css('display', 'none');
      $('#create-trip-done').removeClass('disabled');

      for(var md5 in newTripList) {
        if(newTripList.hasOwnProperty(md5)) {
          $scope.activeContentList[md5].borderClass = 'available-border';
        }
      }

      tripService.createTrip(newTripList, $scope.user.id).then(
        function successCallback(trip) {
          newTripList = {};
          $location.path('t/' + trip._id);
        },
        function errorCallback(err) {
          newTripList = {};
          Materialize.toast('There was an error creating your trip.', 4000, 'rounded');
        }
      );
    }

    $(document).ready(function(){
      $('ul.tabs').tabs();

      var scrollStart = 0;

      var startchangeTabs = $('#tabs');
      var offsetTabs = startchangeTabs.offset();
      var tabHeight = $('#tabs').outerHeight();
      if (startchangeTabs.length){
        $(document).scroll(function() {
          scrollStart = $(this).scrollTop();
          if(scrollStart > offsetTabs.top - 48) {
            $('#tabs').addClass('fixed-tabs');
          } else {
            $('#tabs').removeClass('fixed-tabs');
          }
        });
      }

      var startchangeAddTrips = $('#solidify-navbar');
      var offsetAddTrips = startchangeAddTrips.offset();
      if (startchangeAddTrips.length){
        $(document).scroll(function() {
          scroll_start = $(this).scrollTop();
          if(scroll_start > offsetAddTrips.top) {
            $("#add-experiences").removeClass('hidden');
            $("#create-trip-start").removeClass('hidden');
            $("#create-trip-done").removeClass('hidden');
          } else {
            $('#add-experiences').addClass('hidden');
            $('#create-trip-start').addClass('hidden');
            $('#create-trip-done').addClass('hidden');
          }
        });
      }
    });
  }

})();
