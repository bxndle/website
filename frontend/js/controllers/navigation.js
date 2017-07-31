(function () {

  angular
    .module('bundle_app')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication', '$scope', '$rootScope'];

  function navigationCtrl($location, authentication, $scope, $rootScope) {
    authentication.updateLoginStatus();
    $scope.user = authentication.currentUser();
    $scope.logout = function () { authentication.logout(); }
  }

})();
