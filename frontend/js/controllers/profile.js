(function () {

  angular
    .module('bundle_app')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location','authentication', 'dataGetter', '$scope'];

  function profileCtrl($location, authentication, dataGetter, $scope) {
    $scope.user = {};

    dataGetter.getProfile.then(function (user) {
      $scope.user = user;
      console.log(user);
    });
  }

})();
