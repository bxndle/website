(function () {

  angular
    .module('bundle_app')
    .service('dataGetter', dataGetter);

  dataGetter.$inject = ['$http', 'authentication', '$window'];

  function dataGetter ($http, authentication, $window) {

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

    var getContent = $http({
      method : 'GET',
      url : '/api/content/fetch',
      headers: {}
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
      getProfile : getProfile,
      getContent : getContent
    };
  }
})();
