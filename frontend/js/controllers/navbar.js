(function () {

  angular
    .module('bundle_app')
    .controller('navbarCtrl', navbarCtrl);

  navbarCtrl.$inject = ['$location','authentication', '$scope', '$rootScope'];

  function navbarCtrl($location, authentication, $scope, $rootScope) {
    authentication.updateLoginStatus();
    $scope.user = authentication.currentUser();
    $scope.logout = function () { authentication.logout(); }

    var mobileAndTabletcheck = function detectmob() {
      if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ){
        console.log('mobile');
        return true;
      } else {
        console.log('desktop');
        return false;
      }
    }

    if(!mobileAndTabletcheck()) {
      $("#navbar").addClass('desktop-navbar');
    }

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
