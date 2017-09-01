(function () {

  angular
    .module('bundle_app')
    .controller('tripCtrl', tripCtrl);

  tripCtrl.$inject = ['$scope', '$http', 'tripService', '$routeParams', 'contentData', '$timeout', '$location'];

  function tripCtrl($scope, $http, tripService, $routeParams, contentData, $timeout, $location) {
    var map;

    $scope.title = '';
    $scope.activeTripContentList = {};
    var tripContentList = {};
    var tripID;

    var updateVisibleContent = function () {
      var tmpContentList = [];

      for(md5 in tripContentList) {
        if(tripContentList.hasOwnProperty(md5)) {
          if(map.getBounds().contains(tripContentList[md5].marker.getPosition())) {
            tmpContentList.push(tripContentList[md5]);
          }
        }
      }

      $timeout(function () {
        $scope.activeTripContentList = tmpContentList;
      });
    }

    tripService.getTrip($routeParams.tripID).then(function(trip) {
      var mapOptions = {
        zoom: 8,
        center: {lat: trip.location.lat, lng: trip.location.lon},
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        backgroundColor: '#232323',
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: mapStyles
      }

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var titleImgUrl = trip.content[Object.keys(trip.content)[0]].url;
      $('#title-background').css('background-image', 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url("' + titleImgUrl + '")');

      $scope.title = trip.name;
      tripID = trip._id;

      for(md5 in trip.content) {
        if(trip.content.hasOwnProperty(md5)) {
          contentData.getContentItem(md5).then(function (contentItem) {
            contentItem.marker = new google.maps.Marker({
              position: {
                lat: contentItem.location.lat,
                lng: contentItem.location.lon
              },
              map: map
            });

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

            $scope.activeTripContentList[contentItem.md5] = contentItem;
            tripContentList[contentItem.md5] = contentItem;
          });
        }
      }

      map.addListener('dragend', function() { updateVisibleContent(); });
      map.addListener('zoom_changed', function() { updateVisibleContent(); });

      $scope.bounceMarker = function (marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);

        $('html, body').stop().animate({scrollTop : 0}, 500, 'swing');

        setTimeout(function() {
          marker.setAnimation(null);
        }, 3 * 700);

      }

    }, function (e) {
      $('#trip').css('display', 'none');
      $('#not-found').css('display', 'block');
    });

    new Clipboard('#shareable-link', {
      text: function(trigger) {
        console.log('hit');
        return $location.absUrl();
      }
    });


    var mobileAndTabletcheck = function detectmob() {
      if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ){
        return true;
      } else {
        return false;
      }
    }

    $(document).ready(function () {
      $('#name-input').on('blur', function () {
        tripService.setName(tripID, $scope.title);
      });

      $('#name-input').on('keyup', function (event) {
        if(event.originalEvent.key === 'Enter') {
          $('#name-input').blur();
        }
      });

      if(mobileAndTabletcheck()) {
        $('#floating-card').css('top', '80vh');
      }
    });



  }

})();
