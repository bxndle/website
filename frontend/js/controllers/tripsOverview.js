(function () {

  angular
    .module('bundle_app')
    .controller('tripsOverviewCtrl', tripsOverviewCtrl);

  tripsOverviewCtrl.$inject = ['$scope', '$http', 'tripService', 'authentication', '$location'];

  function tripsOverviewCtrl($scope, $http, tripService, authentication, $location) {

    var user = authentication.currentUser();

    tripService.getAllTrips(user.id).then(function (trips) {
      $scope.currentTrips = trips;
      console.log(trips.length);
      if(trips.length === 0) {
        $('#add-trips').css('display', 'block');
      }
    }, function (e) {
      console.log(e);
    });

    $scope.goTo = function (tripID) {
      $location.path('/t/' + tripID);
    }

    $scope.pastTrips = [];

    if($scope.pastTrips.length === 0) {
      $('#trip-divider').css('display', 'none');
    }

  }

})();
