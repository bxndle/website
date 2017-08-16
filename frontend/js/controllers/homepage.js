(function () {

  angular
    .module('bundle_app')
    .controller('homepageCtrl', homepageCtrl);

  homepageCtrl.$inject = ['$scope', '$http'];

  function homepageCtrl($scope, $http) {

    $scope.categories = [
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '0',
        name : 'AAA'
      },
      {
        src : 'https://image.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg',
        id : '1',
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

      var scroll_start = 0;
      var startchange = $('#solidify-navbar');
      var offset = startchange.offset();
      if (startchange.length){
        $(document).scroll(function() {
          scroll_start = $(this).scrollTop();
          if(scroll_start > offset.top) {
            $("#navbar").addClass('full-navbar');
            $('#logo').css('opacity', '0');
            $('#logo-white').css('opacity', '1');
          } else {
            $('#navbar').removeClass('full-navbar');
            $('#logo').css('opacity', '1');
            $('#logo-white').css('opacity', '0');
          }
        });
      }

    });
  }

})();
