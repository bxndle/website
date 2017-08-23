(function () {

  angular
    .module('bundle_app')
    .service('contentData', contentData);

  contentData.$inject = ['$http', 'authentication', '$q'];

  function contentData ($http, authentication, $q) {
    var categories = {};
    var feeds = {};

    var getCategories = function () {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : '/api/content/categories',
        headers: {}
      }).then(
        function successCallback(response) {
          deferred.resolve(response.data);
        },
        function errorCallback(e) {
          console.log(e);
          deferred.reject(error);
        }
      );

      return deferred.promise;
    }

    var getFeed = function (feedName) {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : '/api/content/feed/' + feedName,
        headers: {}
      }).then(
        function successCallback(response) {
          deferred.resolve(response.data);
        },
        function errorCallback(e) {
          console.log(e);
          deferred.reject(error);
        }
      );

      return deferred.promise;
    }

    var getContentItem = function (md5) {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : '/api/content/item/' + md5,
        headers: {}
      }).then(
        function successCallback(response) {
          deferred.resolve(response.data);
        },
        function errorCallback(e) {
          console.log(e);
          deferred.reject(error);
        }
      );

      return deferred.promise;
    }

    return {
      getCategories : getCategories,
      getFeed : getFeed,
      getContentItem : getContentItem
    };
  }
})();
