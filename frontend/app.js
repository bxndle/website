'use strict'

var apiUrl = 'http://localhost:3000';

var myApp = angular.module('bundle_sandbox', ['ngRoute'], function ($locationProvider) {
  // Removes hash in url but cannot be used with Github Pages
  // $locationProvider.html5Mode(true);
});

myApp.config(['$routeProvider', function ($routeProvider, $locationProvider, $http) {
    $routeProvider
      .when('/', {
        url: '/',
        controller: 'mainCtrl',
        templateUrl: 'partials/main.html'
      })
      .otherwise({
        redirectTo: '/'
      })
  }
]);

myApp.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
  // $(document).ready(function(){
  //   $('.parallax').parallax();
  // });
  $scope.user_signup = {
    username : '',
    password : ''
  };

  $scope.user_login = {
    username : '',
    password : ''
  };

  $scope.status = 'Nothing.';

  $scope.login = function() {
    $http.get(apiUrl + '/test_login')
      .then(function successCallback(response) {
        // this callback will be called asynchronously
        $scope.status = response.data;
      }, function errorCallback(response) {
        $scope.status = response.data;
      });
  }

  $scope.signup = function() {
    $http.post(apiUrl + '/test_signup', $scope.user_signup)
      .then(function successCallback(response) {
        // this callback will be called asynchronously
        $scope.status = response.data;
      }, function errorCallback(response) {
        $scope.status = response.data;
      });
  }

}])

// myApp.controller('teamCtrl', ['$scope', function ($scope) {
//   $scope.team = [
//     {
//       name : 'Allan Luk',
//       photo : 'img/team/Allan.png',
//       position : 'President',
//       email : 'allan@luk.com',
//       program : 'Mechatronics Engineering'
//     },
//     {
//       name : 'Ron Glozman',
//       photo : 'img/team/Ron.png',
//       position : 'VP Internal',
//       email : 'FILL IN',
//       program : 'FILL IN'
//     },
//     {
//       name : 'Austin Cho-Wong',
//       photo : 'img/team/Austin.png',
//       position : 'VP External',
//       email : 'FILL IN',
//       program : 'FILL IN'
//     },
//     {
//       name : 'Qasim Ali',
//       photo : 'img/team/Qasim.png',
//       position : 'VP Communications',
//       email : 'FILL IN',
//       program : 'FILL IN'
//     },
//     {
//       name : 'Jessica Jiang',
//       photo : 'img/team/Jessica.png',
//       position : 'Secretary',
//       email : 'FILL IN',
//       program : 'FILL IN'
//     },
//     {
//       name : 'Pedja Ristic',
//       photo : 'img/team/Pedja.png',
//       position : 'UI/UX Designer',
//       email : 'FILL IN',
//       program : 'FILL IN'
//     },
//     {
//       name : 'Pavel Shering',
//       // photo : 'img/team/Pavel.png',
//       photo : 'img/team/PavelS.jpg',
//       position : 'VP Technology',
//       email : 'pshering@uwaterloo.ca',
//       program : 'Mechatronics Engineering'
//     },
//     {
//       name : 'Mihai Tiuca',
//       photo : 'img/team/Mihai.png',
//       position : 'VP Technology',
//       email : 'tmtiuca@uwaterloo.ca',
//       program : 'Mechatronics Engineering'
//     }
//   ];
//
// }])
//
// myApp.controller('eventsCtrl', ['$scope','$location', function ($scope, $location) {
//   $scope.eventList = [
//     {
//       month : 'July',
//       day : '09',
//       events: [
//         {
//           name : 'Prod Hacks',
//           image : './img/events/prodhacks.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         }
//       ]
//     },
//     {
//       month : 'April',
//       day : '25',
//       events: [
//         {
//           name : 'Prod Hacks',
//           image : './img/events/prodhacks.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Prod Hacks',
//           image : './img/events/prodhacks.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         },
//         {
//           name : 'Cisco DevNet',
//           image : './img/events/devnet.png',
//           url : 'https://www.facebook.com/events/501109840081880/'
//         }
//       ]
//     }
//   ];
//
// }])
