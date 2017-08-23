(function () {

  angular
    .module('bundle_app')
    .controller('homepageCtrl', homepageCtrl);

  homepageCtrl.$inject = ['$scope', '$http'];

  function homepageCtrl($scope, $http) {

    $scope.categories = [];
    $scope.subcategories = [];

    $http({
      method : 'GET',
      url : '/api/content/feeds',
      headers: {}
    }).then(
      function successCallback(response) {
        $scope.categories = response.data;

        $scope.subcategories = $scope.categories.unique.feeds;
      },
      function errorCallback(e) {
        console.log(e);
      }
    );

    $(document).ready(function(){
      $('#partial-view').css({'opacity' : 1});
      $('.parallax').parallax();

      $('.category-carousel').slick({
        infinite : true,
        speed : 300,
        slidesToShow : 7,
        slidesToScroll : 1,
        variableWidth : true,
        focusOnSelect : true,
        centerMode : true,
        prevArrow : $('#prev-arrow'),
        nextArrow : $('#next-arrow'),
        asNavFor : '.subcategory-carousel'
      });

      $('.subcategory-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        centerMode: true,
        accessibility : false,
        speed : 300,
        swipe : false,
        arrows: false,
        fade: true
      });

      $('.subcategory-subcarousel').slick({
        infinite : true,
        speed : 300,
        slidesToShow : 3,
        slidesToScroll : 1,
        variableWidth : true,
        focusOnSelect : true,
        centerMode : true,
        swipe : true,
        arrows : false
      });

    });


  }

})();
