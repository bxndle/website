(function () {

  angular
    .module('bundle_app')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication', '$scope', '$rootScope'];

  function navigationCtrl($location, authentication, $scope, $rootScope) {
    authentication.updateLoginStatus();
    $scope.user = authentication.currentUser();
    $scope.logout = function () { authentication.logout(); }

    $(document).ready(function(){
      var scroll_start = 0;
      var startchange = $('#solidify-navbar');
      var offset = startchange.offset();
      if (startchange.length){
        $(document).scroll(function() {
          scroll_start = $(this).scrollTop();
          if(scroll_start > offset.top) {
            $("#navbar").addClass('full-navbar');
          } else {
            $('#navbar').removeClass('full-navbar');
          }
        });
      }
    });
  }

})();
