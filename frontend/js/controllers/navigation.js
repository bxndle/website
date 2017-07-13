(function () {

  angular
    .module('bundle_sandbox')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication', '$scope'];

  function navigationCtrl($location, authentication, $scope) {
    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.user = authentication.currentUser();

    $scope.logout = function () {
      authentication.logout();
    }
  }

})();
