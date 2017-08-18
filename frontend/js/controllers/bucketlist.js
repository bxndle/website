(function () {

  angular
    .module('bundle_app')
    .controller('bucketlistCtrl', bucketlistCtrl);

  bucketlistCtrl.$inject = ['$scope', '$http'];

  function bucketlistCtrl($scope, $http) {

    $scope.mapOptions = {
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

    $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);

    var contentList = [
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Accomodations'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Accomodations'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Accomodations'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Accomodations'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Accomodations'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Activities'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Activities'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Activities'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Activities'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Activities'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Art'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Art'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Art'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Art'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Art'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Celebrities'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Celebrities'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Celebrities'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Celebrities'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Celebrities'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Couples'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Couples'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Couples'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Couples'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Couples'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Food'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Food'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Food'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Food'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Food'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Historic'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Historic'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Historic'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Historic'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Historic'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Shopping'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Shopping'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Shopping'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Shopping'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Shopping'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Social'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Social'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Social'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Social'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Social'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Trending'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Trending'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Trending'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Trending'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Trending'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Unique'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Unique'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Unique'
      },
      {
        src : 'https://static.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg',
        name : 'Unique'
      },
      {
        src : 'http://cssdeck.com/uploads/media/items/6/6f3nXse.png',
        name : 'Unique'
      },
    ];

    $scope.activeContentList = contentList;

    var shuffleArray = function(array) {
      var m = array.length, t, i;

      // While there remain elements to shuffle
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    }

    shuffleArray($scope.activeContentList);

    for(var i = 0; i < $scope.activeContentList.length; i++) {
      $scope.activeContentList[i].index = i;
    }

    $scope.categories = [
      'All',
      'Accomodations',
      'Activities',
      'Art',
      'Celebrities',
      'Couples',
      'Food',
      'Historic',
      'Shopping',
      'Social',
      'Trending',
      'Unique'
    ];

    $scope.setFilter = function (category) {
      console.log('filtering');
      if(category === 'All') {
        $scope.categoryFilter = '';
      } else {
        $scope.categoryFilter = category;
      }

      console.log($scope.categoryFilter);
    }

    $(document).ready(function(){
      $('ul.tabs').tabs();

      var scrollStart = 0;
      var startchange = $('#tabs');
      var offset = startchange.offset();
      var tabHeight = $('#tabs').outerHeight();
      if (startchange.length){
        $(document).scroll(function() {
          scrollStart = $(this).scrollTop();
          if(scrollStart > offset.top - 68) {
            $('#tabs').addClass('fixed-tabs');
            $('#tab-gap').css({'height' : tabHeight.toString() + 'px' });
          } else {
            $('#tabs').removeClass('fixed-tabs');
            $('#tab-gap').css({'height' : '0px' });
          }
        });
      }
    });
  }

})();
