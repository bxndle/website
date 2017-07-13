(function () {

  angular
    .module('bundle_sandbox')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication', '$window'];

  function meanData ($http, authentication, $window) {

    var getProfile = $http({
      method : 'GET',
      url : '/api/profile',
      headers: {
        Authorization : 'Bearer ' + authentication.getToken()
      }
    }).then(
      function successCallback(response) {
        return response.data;
      },
      function errorCallback(e) {
        console.log(e);
        return null;
      }
    );

    return {
      getProfile : getProfile
    };
  }
})();
