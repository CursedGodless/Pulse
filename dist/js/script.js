$(document).ready(function () {
  $('.carousel__inner').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    prevArrow: '<button "type="button" class="slick-prev"><img src="icons/left_arrow.png" alt=""></button>',
    nextArrow: '<button "type="button" class="slick-next"><img src="icons/right_arrow.png" alt=""></button>',
    responsive: [{
      breakpoint: 991.8,
      settings: {
        arrows: false,
        dots: true
      }
    }]
  });
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
      });
    });
  }
  toggleSlide('.catalog-item__more');
  toggleSlide('.catalog-item__back');

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay,#consultation').fadeIn();
  });
  $('.modal__close').on('click', function () {
    $('.overlay,#consultation,#order,#thanks').fadeOut();
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay,#order').fadeIn();
    })
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true
        }

      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Ваш email не подходит по виду на name@domain.com"
        }
      }
    });
  }
  validateForms('#consultation-form');
  validateForms('#order form');
  validateForms('#consultation form');

  $('input[name=phone]').mask("+7(999) 999-99-99");
  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),

    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
  $("a[href=#up]").click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top + "px"
    });
    return false;
  });
  new WOW().init();
});