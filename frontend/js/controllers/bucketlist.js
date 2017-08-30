(function () {

  angular
    .module('bundle_app')
    .controller('bucketlistCtrl', bucketlistCtrl);

  bucketlistCtrl.$inject = ['$scope', '$http', 'authentication', 'contentData'];

  function bucketlistCtrl($scope, $http, authentication, contentData) {

    $scope.user = authentication.currentUser();

    $scope.creatingTrip = false;

    var newTripList = {};

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
      var tmpContentList = [];

      for(var i = 0; i < contentList[currentCategory].length; i++) {
        if(map.getBounds().contains(contentList[currentCategory][i].marker.getPosition())) {
          console.log('Contained ' + i.toString());
          tmpContentList.push(contentList[currentCategory][i]);
        }
      }

      $scope.activeContentList = tmpContentList;
      $scope.$apply();
    }

    map.addListener('dragend', function() { updateVisibleContent(); });
    map.addListener('zoom_changed', function() { updateVisibleContent(); });

    contentData.getSaves($scope.user.id, 'ALL').then(function(saves) {
      var feeds = Object.keys(saves);
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

            contentItem.borderClass = 'available-border';

            contentList.all[contentItem.md5] = contentItem;
            $scope.activeContentList[contentItem.md5] = contentItem;

            for(var k = 0; k < contentItem.tags.bundle.length; k++) {
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
    }

    $scope.bounceMarker = function (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);

      $('html, body').stop().animate({scrollTop : 0}, 500, 'swing');

      setTimeout(function() {
        marker.setAnimation(null);
      }, 10 * 700);

    }

    $scope.createTrip = function (name) {
      $scope.creatingTrip = true;
      $('#create-trip-start').css('display', 'none');
      $('#create-trip-done').css('display', 'block');
    }

    $scope.addToTrip = function (md5) {
      if($scope.activeContentList[md5].borderClass === 'active-border') {
        delete newTripList[md5];
        $scope.activeContentList[md5].borderClass = 'available-border';
      } else {
        newTripList[md5] = $scope.activeContentList[md5];
        $scope.activeContentList[md5].borderClass = 'active-border';
      }
    }

    $scope.doneCreatingTrip = function () {
      console.log(newTripList);
      $scope.creatingTrip = false;
      $('#create-trip-start').css('display', 'block');
      $('#create-trip-done').css('display', 'none');

      for(var md5 in newTripList) {
        if(newTripList.hasOwnProperty(md5)) {
          $scope.activeContentList[md5].borderClass = 'available-border';
        }
      }

      $http({
        method : 'POST',
        url : '/api/trip/create',
        data : {
          content : newTripList,
          userID : $scope.user.id
        },
        headers: {}
      }).then(
        function successCallback(response) {
          newTripList = {};
        },
        function errorCallback(e) {
          newTripList = {};
          Materialize.toast('There was an error creating your trip.', 4000, 'rounded');
          console.log(e);
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
            $("#create-trip-start").removeClass('hidden');
            $("#create-trip-done").removeClass('hidden');
          } else {
            $('#create-trip-start').addClass('hidden');
            $('#create-trip-done').addClass('hidden');
          }
        });
      }
    });
  }

})();
