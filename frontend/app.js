(function () {
  var apiUrl = 'http://localhost:8081/api';

  var app = angular.module('bundle_app');

  function config ($routeProvider, $locationProvider, socialshareConfProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'partials/homepage.html',
        controller: 'homepageCtrl'
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'resetCtrl'
      })
      .when('/f/:feedName', {
        templateUrl: 'partials/feed.html',
        controller: 'feedCtrl'
      })
      .when('/bucketlist', {
        templateUrl: 'partials/bucketlist.html',
        controller: 'bucketlistCtrl'
      })
      .when('/trips', {
        templateUrl: 'partials/trips.html',
        controller: 'tripsCtrl'
      })
      .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);

      socialshareConfProvider.configure([
        {
          'provider': 'facebook',
          'conf': {
            'url': 'http://720kb.net',
            'trigger': 'mouseover',
            'popupHeight': 1300,
            'popupWidth' : 1000
          }
        }
      ]);

    }

  function run($rootScope, $location, authentication, $rootScope) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if (!($location.path() === '/' || $location.path().substring(0, 3) === '/f/' ) &&  !$rootScope.isLoggedIn) {
        $location.path('/');
        Materialize.toast('Please log in', 4000, 'rounded');
      }
    });
  }

  angular
      .module('bundle_app')
      .config(['$routeProvider', '$locationProvider', 'socialshareConfProvider', config])
      .run(['$rootScope', '$location', 'authentication', '$rootScope', run]);

})();
