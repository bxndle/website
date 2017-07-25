(function () {

  angular
    .module('bundle_app')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location','authentication'];

  function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
      .login(vm.credentials)
      .then(function(){
        $location.path('profile');
      });
    };
  }

})();
