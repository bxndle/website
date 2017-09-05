(function () {

  angular
    .module('bundle_app')
    .controller('tripCtrl', tripCtrl);

  tripCtrl.$inject = ['$scope', '$http', 'tripService', '$routeParams', 'contentData', '$timeout', '$location', '$rootScope', 'authentication', '$route'];

  function tripCtrl($scope, $http, tripService, $routeParams, contentData, $timeout, $location, $rootScope, authentication, $route) {
    $('html, body').stop().animate({scrollTop : 100}, 500, 'swing', function () {
      $('html, body').stop().animate({scrollTop : 0}, 500, 'swing');
    });

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

      if($rootScope.isLoggedIn) {
        var user = authentication.currentUser();

        if(trip.owner !== user.id) {
          var isParticipant = false;
          for(i in trip.participants) {
            if(trip.participants[i] === user.id) {
              isParticipant = true;
              break;
            }
          }

          if(!isParticipant) {
            $('#join-trip').css('display', 'block');
          }
        }
      } else {
        $('#join-trip').css('display', 'block');
      }

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
      var bounds = new google.maps.LatLngBounds();

      $scope.title = trip.name;
      tripID = trip._id;

      for(var i = 0; i < trip.content.length; i++) {
        contentData.getContentItem(trip.content[i]).then(function (contentItem) {
          if(contentItem.md5 === trip.content[0]) {
            $('#title-background').css('background-image', 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url("' + contentItem.url + '")');
          }

          contentItem.marker = new google.maps.Marker({
            position: {
              lat: contentItem.location.lat,
              lng: contentItem.location.lon
            },
            map: map
          });

          bounds.extend(contentItem.marker.getPosition());

          if(contentItem.md5 === trip.content[trip.content.length - 1]) {
            map.fitBounds(bounds);
            google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
              if(this.getZoom() <= 12) {
                this.setZoom(this.getZoom() - 2);
              } else {
                this.setZoom(12);
              }

            });
          }

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
        return $location.absUrl();
      }
    });

    $scope.copyLink = function () {
      Materialize.toast('Copied Link!', 3000);
    }

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

    $scope.addSelfToTrip = function () {
      if($rootScope.isLoggedIn) {
        tripService.addParticipant($routeParams.tripID, authentication.currentUser().id).then(function () {
          $route.reload();
        }, function (err) {
          alert(err);
        });
      } else {
        Materialize.toast('Please log in first! :)', 4000);
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
