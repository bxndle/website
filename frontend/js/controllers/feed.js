(function () {

  angular
    .module('bundle_app')
    .controller('feedCtrl', feedCtrl);

  feedCtrl.$inject = ['$scope', '$http', 'contentData', '$routeParams', 'authentication', '$rootScope'];

  function feedCtrl($scope, $http, contentData, $routeParams, authentication, $rootScope) {

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

            if($rootScope.isLoggedIn) {
              contentData.getSaves(authentication.currentUser().id, $routeParams.feedName).then(function(saves) {
                if(saves.hasOwnProperty(contentItem.md5)){
                  contentItem.saved = true;
                } else {
                  contentItem.saved = false;
                }
              });
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

    $scope.contentAction = function (content) {

      if($rootScope.isLoggedIn) {
        var action = 'SAVE';
        if(content.saved) {
          action = 'REMOVE';
        }

        $http({
          method : 'POST',
          url : '/api/content/action',
          data: {
            contentID : content.md5,
            email : authentication.currentUser().email,
            action : action,
            feedName : $routeParams.feedName
          }
        }).then(
          function successCallback(response) {
            if(content.saved) {
              content.saved = false;
            } else {
              content.saved = true;
            }
          },
          function errorCallback(e) {
            console.log(e);
          }
        );
      } else {
        Materialize.toast('Please login to save content :)', 4000);
      }

    }
  }

})();
