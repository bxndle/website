(function () {

  angular
    .module('bundle_app')
    .controller('landingCtrl', landingCtrl);

  landingCtrl.$inject = ['$location', 'dataGetter', '$scope', '$http', 'authentication'];

  function landingCtrl($location, dataGetter, $scope, $http, authentication) {
    $scope.imageStorageBase = 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/';
    $scope.contentLoaded = 1;
    $scope.user = authentication.currentUser();

    dataGetter.getContent.then(function (content) {
      $scope.contentList = content;
      console.log(content[0].users);
      for (var i = 0; i < $scope.contentList.length; i++) {
        if(!$scope.contentList[i].users) {
          $scope.contentList[i].users = {};
          $scope.contentList[i].users[$scope.user.id] = false;
        }
        if(!$scope.contentList[i].users[$scope.user.id]) {
          $scope.contentList[i].users[$scope.user.id] = false;
        }
      }
    });

    
  }

})();
