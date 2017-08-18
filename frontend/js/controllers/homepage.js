(function () {

  angular
    .module('bundle_app')
    .controller('homepageCtrl', homepageCtrl);

  homepageCtrl.$inject = ['$scope', '$http'];

  function homepageCtrl($scope, $http) {
    $scope.categories = [
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/celebrities_main.png',
        name : 'Celebrities'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/accomodations_main.png',
        name : 'Accomodations'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/activities_main.png',
        name : 'Activities'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/art_main.png',
        name : 'Art'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/couples_main.png',
        name : 'Couples'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/food_main.png',
        name : 'Food'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/historic_main.png',
        name : 'Historic'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/shopping_main.png',
        name : 'Shopping'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/social_main.png',
        name : 'Social'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/trending_main.png',
        name : 'Trending'
      },
      {
        src : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/categories/unique_main.png',
        name : 'Unique'
      }
    ]
    $scope.subcategories = [
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        name : 'AAA'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        name : 'BBB'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '2',
        name : 'CCC'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '3',
        name : 'DDD'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '4',
        name : 'EEE'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '5',
        name : 'FFF'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '6',
        name : 'GGG'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '7',
        name : 'HHH'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '8',
        name : 'III'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '9',
        name : 'JJJ'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '10',
        name : 'KKK'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '11',
        name : 'LLL'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '12',
        name : 'MMM'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '13',
        name : 'NNN'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '14',
        name : 'OOO'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '15',
        name : 'PPP'
      }
    ];

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
