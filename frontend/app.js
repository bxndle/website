(function () {
  var apiUrl = 'http://localhost:8081/api';

  var app = angular.module('bundle_sandbox');

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
      .when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);

    }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }

  angular
      .module('bundle_sandbox')
      .config(['$routeProvider', '$locationProvider', config])
      .run(['$rootScope', '$location', 'authentication', run]);

})();
