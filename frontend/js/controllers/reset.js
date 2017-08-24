(function () {

  angular
    .module('bundle_app')
    .controller('resetCtrl', resetCtrl);

  resetCtrl.$inject = ['$scope', '$http', '$routeParams'];

  function resetCtrl($scope, $http, $routeParams) {

    $scope.passwordSet = false;

    $scope.submitNewPassword = function () {
      $http.post('/api/reset/set', {
        token : $routeParams.token,
        password : $scope.password
      }).then(
        function successfullCallback(response) {
          $scope.passwordSet = true;
        },
        function errorCallback(err) {
          $scope.passwordSet = false;
          console.log(err);
        }
      );
    }
  }

})();
