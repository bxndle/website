(function () {

  angular
    .module('bundle_app')
    .controller('feedCtrl', feedCtrl);

  feedCtrl.$inject = ['$scope', '$http'];

  function feedCtrl($scope, $http) {
    $scope.background = 'https://s3.us-east-2.amazonaws.com/bundle-homepage/drake-bg.png';

    $scope.contentList = [];

  }

})();
