
(function () {

  angular
    .module('bundle_sandbox')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location','authentication'];

  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : '',
      email : '',
      password : ''
    };

    vm.onSubmit = function () {
      authentication
        .register(vm.credentials)
        .then(function(){
          $location.path('profile');
        });
    };
  }

})();
