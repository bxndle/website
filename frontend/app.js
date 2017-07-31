(function () {
  var apiUrl = 'http://localhost:8081/api';

  var app = angular.module('bundle_app');

  function config ($routeProvider, $locationProvider) {
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
      .when('/landing', {
        templateUrl: 'partials/landing.html',
      })
      .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);

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
      .config(['$routeProvider', '$locationProvider', config])
      .run(['$rootScope', '$location', 'authentication', '$rootScope', run]);

})();
