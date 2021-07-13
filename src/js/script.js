$(document).ready(function () {
  $('.carousel__inner').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    prevArrow: '<button "type="button" class="slick-prev"><img src="../icons/left_arrow.png" alt=""></button>',
    nextArrow: '<button "type="button" class="slick-next"><img src="../icons/right_arrow.png" alt=""></button>',
    responsive: [
      {
        breakpoint: 991.8,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });
});