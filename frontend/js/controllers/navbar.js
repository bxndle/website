(function () {

  angular
    .module('bundle_app')
    .controller('navbarCtrl', navbarCtrl);

  navbarCtrl.$inject = ['authentication', '$scope', '$rootScope', '$http', '$route', '$location'];

  function navbarCtrl(authentication, $scope, $rootScope, $http, $route, $location) {
    authentication.updateLoginStatus();
    $scope.user = authentication.currentUser();

    $scope.showLoginForm = function () {
      $('#register-form').addClass('hidden');

      if($('#login-form').hasClass('hidden')) {
        $('#login-form').removeClass('hidden');
      } else {
        $('#reset-form').removeClass('show');
        $('#login-form').addClass('hidden');
      }
    }

    $scope.showRegisterForm = function () {
      $('#reset-form').removeClass('show');
      $('#login-form').addClass('hidden');

      if($('#register-form').hasClass('hidden')) {
        $('#register-form').removeClass('hidden');
      } else {
        $('#register-form').addClass('hidden');
      }
    }

    $(document.body).click(function(e){
      var results = $(e.target).parents('.auth-form').length + $(e.target).parents('#nav-buttons').length;
      console.log(e.target);
      console.log(results);

      if(results === 0) {
        $('#login-form').addClass('hidden');
        $('#reset-form').removeClass('show');
        $('#register-form').addClass('hidden');
      }
    });

    $scope.credentials = {
      email : '',
      password : '',
      name : ''
    };

    $scope.onLoginSubmit = function () {
      authentication
      .login($scope.credentials)
      .then(function(){
        $route.reload();
      }, function () {
        $('#invalid-login').css('display', 'block');
        $scope.credentials.password = '';
      });
    };

    $scope.onRegisterSubmit = function () {
      authentication
        .register($scope.credentials)
        .then(function(){});
    };

    $scope.logout = function () {
      authentication.logout();
      $scope.credentials = {
        email : '',
        password : '',
        name : ''
      };
      $('#login-form').addClass('hidden');
      $('#reset-form').removeClass('show');
      $('#register-form').addClass('hidden');
      $('#invalid-login').css('display', 'none');
      $('#invalid-reset-email').css('display', 'none');
      $('#valid-reset-email').css('display', 'block');
    }

    $scope.resetRequest = function () {
      $http.post('/api/reset/request', {
          email : $scope.email
        }).then(
        function successfullCallback (response) {
          var token = response.data.token;
          $('#valid-reset-email').css('display', 'block');
          $('#invalid-reset-email').css('display', 'none');
        },
        function errorCallback (err) {
          $('#valid-reset-email').css('display', 'none');
          $('#invalid-reset-email').css('display', 'block');
          console.log(err);
        }
      );
    }

    $scope.showResetForm = function () {
      if($('#reset-form').hasClass('show')) {
        $('#reset-form').removeClass('show');
      } else {
        $('#reset-form').addClass('show');
      }
    }

    var mobileAndTabletcheck = function detectmob() {
      if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ){
        return true;
      } else {
        return false;
      }
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

      if(mobileAndTabletcheck()) {
        $('.material-tooltip').css('display', 'none');
        $('#homepage-icon').removeClass('waves-effect');
        $('#homepage-icon').on('click touchend', function () { location.path('/'); });
        $('#bucketlist-icon').removeClass('waves-effect');
        $('#bucketlist-icon').on('click touchend', function () { location.path('bucketlist'); });
        $('#trips-icon').removeClass('waves-effect');
        $('#trips-icon').on('click touchend', function () { location.path('trips'); });
        $('#logout-icon').removeClass('waves-effect');
        $('#logout-icon').on('click touchend', function () { location.path('/'); });
      }
    });
  }

})();
