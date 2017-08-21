(function () {

  angular
    .module('bundle_app')
    .controller('feedCtrl', feedCtrl);

  feedCtrl.$inject = ['$scope', '$http'];

  function feedCtrl($scope, $http) {
    $scope.background = 'https://s3.us-east-2.amazonaws.com/bundle-homepage/drake-bg.png';

    $scope.contentList = [
      {
        src : 'http://www.billboard.com/files/styles/article_main_image/public/media/drake-hotline-bling-vid-2015-billboard-650.jpg',
        orgSrc : 'https://static1.squarespace.com/static/538d2ab9e4b00f1fad49600b/t/584f273a5016e105a0395ae6/1481582398721/',
        poster : 'Director X',
        date : 'August 3',
        place : 'The Studio'
      }
    ];

  }

})();
