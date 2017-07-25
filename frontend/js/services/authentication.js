(function () {
  var app = angular.module('bundle_app', ['ngRoute']);

  app.service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      if ($window.localStorage['mean-token']) {
        $window.localStorage.removeItem('mean-token');
      }
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      var token = $window.localStorage['mean-token'];
      return token;
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    }

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    var logout = function() {
      if(isLoggedIn()) {
        var user = currentUser();
        $window.localStorage.removeItem('mean-token');
        $http.post('/api/log/auth', {email: user.email, action: 'LOGOUT'}).then(
          function successCallback() {},
          function errorCallback(err) {
            console.log(err);
          }
        );
      }
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
      isLoggedIn : isLoggedIn,
      currentUser : currentUser,
      register : register,
      login : login
    };
  };

})();
