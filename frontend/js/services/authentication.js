(function () {
  var app = angular.module('bundle_sandbox', ['ngRoute']);

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

    var logout = function() {
      console.log('Removing item');
      $window.localStorage.removeItem('mean-token');
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

    var register = function(user) {
      return $http.post('/api/register', user).then(
        function successCallback(response) {
          saveToken(response.data.token);
        },
        function errorCallback(e) {
          console.log(e);
        }
      );
    };

    var login = function(user) {
      return $http.post('/api/login', user).then(
        function successCallback(response) {
          saveToken(response.data.token);
        },
        function errorCallback(response) {
          console.log(response);
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
