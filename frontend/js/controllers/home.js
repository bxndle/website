(function() {

  angular
    .module('bundle_sandbox')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl () {
      console.log('Home controller is running');
    }

})();
