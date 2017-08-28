(function () {

  angular
    .module('bundle_app')
    .controller('homepageCtrl', homepageCtrl);

  homepageCtrl.$inject = ['$scope', '$http', 'contentData'];

  function homepageCtrl($scope, $http, contentData) {
    var currentCategory = 'unique';
    var init = false;

    contentData.getCategories().then(function (categories) {
      $scope.categories = categories;
      $scope.subcategories = $scope.categories[currentCategory].feeds;

      $scope.selectCategory = function (categoryName) {
        $scope.subcategories = $scope.categories[categoryName].feeds;
      }

      if(!init) {
        $(document).ready(function(){
          $('#partial-view').css({'opacity' : '1'});
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
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : true,
            focusOnSelect : true,
            centerMode : true,
            swipe : true,
            arrows : false
          });

        });

        init = true;
      }
    });

  }

})();
