(function () {
  var app = angular.module('bundle_app', ['ngRoute', '720kb.socialshare']);

  app.service('authentication', authentication);

  authentication.$inject = ['$http', '$window', '$rootScope'];

  function authentication ($http, $window, $rootScope) {

    var saveToken = function (token) {
      if ($window.localStorage['session-token']) {
        $window.localStorage.removeItem('session-token');
      }
      $window.localStorage['session-token'] = token;
      updateLoginStatus();
    };

    var getToken = function () {
      var token = $window.localStorage['session-token'];
      return token;
    };

    var updateLoginStatus = function() {
      var token = getToken();
      var payload;

      if(token){

        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        $rootScope.isLoggedIn = payload.exp > Date.now() / 1000;
      } else {
        $rootScope.isLoggedIn = false;
      }
      return;
    }

    var currentUser = function() {
      updateLoginStatus();
      if($rootScope.isLoggedIn){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          id : payload._id,
          email : payload.email,
          name : payload.name
        };
      }
    };

    var logout = function() {
      updateLoginStatus();
      if($rootScope.isLoggedIn) {
        var user = currentUser();
        $window.localStorage.removeItem('session-token');

        $http.post('/api/log/auth', {email: user.email, action: 'LOGOUT'}).then(
          function successCallback() {},
          function errorCallback(err) {
            console.log(err);
          }
        );
      }
      updateLoginStatus();
    };

    var register = function(user) {
      return $http.post('/api/register', user).then(
        function successCallback(response) {
          saveToken(response.data.token);
        },
        function errorCallback(err) {
          console.log(err);
        }
      );
    };

    var login = function(user) {
      return $http.post('/api/login', user).then(
        function successCallback(response) {
          saveToken(response.data.token);
          $http.post('/api/log/auth', {email: user.email, action: 'LOGIN'}).then(
            function successCallback() {},
            function errorCallback(err) {
              console.log(err);
            }
          );
        },
        function errorCallback(err) {
          console.log(err);
        }
      );
    };

    return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
      updateLoginStatus : updateLoginStatus,
      currentUser : currentUser,
      register : register,
      login : login
    };
  };

})();
