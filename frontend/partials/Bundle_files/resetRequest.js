(function () {

  angular
    .module('bundle_app')
    .controller('resetRequestCtrl', resetRequestCtrl);

  resetRequestCtrl.$inject = ['$scope', '$http'];

  function resetRequestCtrl($scope, $http) {
    $scope.tokenGenerated = false;

    $scope.resetRequest = function () {
      $http.post('/api/reset/request', {
          email : $scope.email
        }).then(
        function successfullCallback (response) {
          $scope.token = response.data.token;
          console.log($scope.token);
          $scope.tokenGenerated = true;
        },
        function errorCallback (err) {
          console.log(err);
        }
      );
    }
  }

})();
