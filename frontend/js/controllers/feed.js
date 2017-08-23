(function () {

  angular
    .module('bundle_app')
    .controller('feedCtrl', feedCtrl);

  feedCtrl.$inject = ['$scope', '$http', 'dataGetter'];

  function feedCtrl($scope, $http, dataGetter) {
    $scope.background = 'https://s3.us-east-2.amazonaws.com/bundle-homepage/drake-bg.png';

  }

})();
