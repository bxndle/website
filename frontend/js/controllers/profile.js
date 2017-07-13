(function () {

  angular
    .module('bundle_sandbox')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location','authentication', 'meanData'];

  function profileCtrl($location, authentication, meanData) {
    var vm = this;
    vm.user = {};

    meanData.getProfile.then(function (user) {
      vm.user = user;
    });
  }

})();
