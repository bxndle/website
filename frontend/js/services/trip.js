(function () {

  angular
    .module('bundle_app')
    .service('tripService', tripService);

  tripService.$inject = ['$http', '$q'];

  function tripService ($http, $q) {

    var createTrip = function (content, userID) {
      var condensedContentList = {};
      var location = {
        lat : content[Object.keys(content)[0]].location.lat,
        lon : content[Object.keys(content)[0]].location.lon
      };

      for(md5 in content) {
        if(content.hasOwnProperty(md5)) {
          condensedContentList[md5] = {
            md5 : md5,
            type : content[md5].type,
            url : content[md5].url,
            description : content[md5].description,
            location : content[md5].location
          };
        }
      }

      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : '/api/trip/create',
        data : {
          content : condensedContentList,
          userID : userID,
          location : location
        }
      }).then(
        function successCallback(response) {
          deferred.resolve(response.data);
        },
        function errorCallback(e) {
          deferred.reject(e);
        }
      );

      return deferred.promise;
    }

    var setName = function (tripID, newName) {
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : '/api/trip/setName',
        data : {
          tripID : tripID,
          name : newName
        }
      }).then(
        function successCallback(response) {
          deferred.resolve(response.data);
        },
        function errorCallback(e) {
          deferred.reject(e);
        }
      );

      return deferred.promise;
    }

    var getTrip = function (tripID) {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : '/api/trip/' + tripID
      }).then(
        function successCallback(response) {
          deferred.resolve(response.data);
        },
        function errorCallback(e) {
          deferred.reject(e);
        }
      );

      return deferred.promise;
    }

    var getAllTrips = function (userID) {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : '/api/trips/' + userID
      }).then(
        function successCallback(response) {
          deferred.resolve(response.data);
        },
        function errorCallback(e) {
          deferred.reject(e);
        }
      );

      return deferred.promise;
    }

    var addParticipant = function (tripID, participantID) {
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : '/api/trip/addParticipant',
        data : {
          tripID : tripID,
          participantID : participantID
        }
      }).then(
        function successCallback(response) {
          deferred.resolve(response.data);
        },
        function errorCallback(e) {
          deferred.reject(e);
        }
      );

      return deferred.promise;
    }

    return {
      createTrip : createTrip,
      setName : setName,
      getTrip : getTrip,
      getAllTrips : getAllTrips,
      addParticipant : addParticipant
    };
  }
})();
