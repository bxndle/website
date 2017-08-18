(function () {

  angular
    .module('bundle_app')
    .controller('shareTestCtrl', shareTestCtrl);

  shareTestCtrl.$inject = ['sharing', '$scope'];

  function shareTestCtrl(sharing, $scope) {
    $scope.send = function () {
      sharing.facebook().send();
    }

    $scope.share = function () {
      sharing.facebook().share();
    }

    $scope.mobileSend = function () {
      sharing.messenger().send();
    }
  }

})();
