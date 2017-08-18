(function () {

  angular
    .module('bundle_app')
    .controller('bucketlistCtrl', bucketlistCtrl);

  bucketlistCtrl.$inject = ['$scope', '$http'];

  function bucketlistCtrl($scope, $http) {

    $scope.mapOptions = {
      zoom: 10,
      center: {lat: 43.96738237259955, lng: -79.43483315429687},
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      scrollwheel: false,
      fullscreenControl: false,
      streetViewControl: false,
      backgroundColor: '#232323',
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      styles: mapStyles
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);

    $scope.contentList = [];

    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }

})();
