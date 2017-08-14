(function () {

  angular
    .module('bundle_app')
    .controller('homepageCtrl', homepageCtrl);

  homepageCtrl.$inject = ['$scope', '$http'];

  function homepageCtrl($scope, $http) {

    $(document).ready(function(){
      $('.carousel').carousel({dist: 0, padding : 50, shift : 5, duration : 50});
      $('.parallax').parallax();
    });
  }

})();
