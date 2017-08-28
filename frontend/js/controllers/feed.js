(function () {

  angular
    .module('bundle_app')
    .controller('feedCtrl', feedCtrl);

  feedCtrl.$inject = ['$scope', '$http', 'contentData', '$routeParams', 'authentication'];

  function feedCtrl($scope, $http, contentData, $routeParams, authentication) {

    $scope.user = authentication.currentUser();

    $scope.contentList = [];

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

    contentData.getSaves($scope.user.id, $routeParams.feedName).then(function(saves) {
      contentData.getFeed($routeParams.feedName).then(function (feed) {
        $scope.background = feed.background;
        $scope.title = feed.name;
        $scope.description = feed.description;
        for (var i = 0; i <= feed.content.length; i++) {
          if (i === feed.content.length) {
            contentData.getContentItem(feed.content[i-1]).then(function (contentItem) {
              if(!mobileAndTabletcheck()) {
                $('.info').addClass('invisible');

                $('.content-container').hover(function () {
                  $(this).find('.info').addClass('visible');
                  $(this).find('.info').removeClass('invisible');
                }, function () {
                  $(this).find('.info').addClass('invisible');
                  $(this).find('.info').removeClass('visible');
                });
              }
            });
          } else {
            contentData.getContentItem(feed.content[i]).then(function (contentItem) {
              if(saves.hasOwnProperty(contentItem.md5)){
                contentItem.saved = true;
              } else {
                contentItem.saved = false;
              }
              $scope.contentList.push(contentItem);
            });
          }
        }
      }, function (e) {
        $('#feed').css('display', 'none');
        $('#not-found').css('display', 'block');
      });
    });


    $scope.contentAction = function (content) {
      var action = 'SAVE';
      if(content.saved) {
        action = 'REMOVE';
        content.saved = false;
      } else {
        content.saved = true;
      }

      $http({
        method : 'POST',
        url : '/api/content/action',
        data: {
          contentID : content.md5,
          email : $scope.user.email,
          action : action,
          feedName : $routeParams.feedName
        }
      }).then(
        function successCallback(response) {},
        function errorCallback(e) {
          console.log(e);
        }
      );
    }
  }

})();
