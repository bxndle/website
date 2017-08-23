(function () {
  var apiUrl = 'http://localhost:8081/api';

  var app = angular.module('bundle_app');

  function config ($routeProvider, $locationProvider, socialshareConfProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/resetRequest', {
        templateUrl: 'partials/resetRequest.html',
        controller: 'resetRequestCtrl'
      })
      .when('/reset/:token', {
        templateUrl: 'partials/resetComplete.html',
        controller: 'resetCompleteCtrl'
      })
      .when('/landing', {
        templateUrl: 'partials/landing.html'
      })
      .when('/homepage', {
        templateUrl: 'partials/homepage.html',
        controller: 'homepageCtrl'
      })
      .when('/f/:feedName', {
        templateUrl: 'partials/feed.html',
        controller: 'feedCtrl'
      })
      .when('/bucketlist', {
        templateUrl: 'partials/bucketlist.html',
        controller: 'bucketlistCtrl'
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
      if ($location.path() === '/landing' && !$rootScope.isLoggedIn) {
        $location.path('/');
      }
    });
  }

  angular
      .module('bundle_app')
      .config(['$routeProvider', '$locationProvider', 'socialshareConfProvider', config])
      .run(['$rootScope', '$location', 'authentication', '$rootScope', run]);

})();
