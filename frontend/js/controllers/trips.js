(function () {

  angular
    .module('bundle_app')
    .controller('tripsCtrl', tripsCtrl);

  tripsCtrl.$inject = ['$scope', '$http'];

  function tripsCtrl($scope, $http) {

    $scope.pastTrips = [];
    $scope.currentTrips = [];

    $scope.currentTrips = [
      {
        src: 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/ashley-knedler-43546.jpg',
        name: 'Yosemite'
      },
      {
        src: 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/ashley-knedler-43546.jpg',
        name: 'Yosemite'
      },
      {
        src: 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/ashley-knedler-43546.jpg',
        name: 'Yosemite'
      }
    ];

    $scope.pastTrips = [
      {
        src: 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/jakob-owens-224352.jpg',
        name: 'Sweden'
      },
      {
        src: 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/jakob-owens-224352.jpg',
        name: 'Sweden'
      },
      {
        src: 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/jakob-owens-224352.jpg',
        name: 'Sweden'
      }
    ];

    if($scope.pastTrips.length === 0) {
      $('#trip-divider').css('display', 'none');
    }

  }

})();
