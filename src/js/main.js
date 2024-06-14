new WOW().init();
burgerMenu();
document.addEventListener('DOMContentLoaded', function () {
  const featuresItems = document.querySelectorAll('.item_name');

  const swiper = new Swiper('.features_swiper', {
    loop: true,
    slidesPerView: 1.7,
    spaceBetween: 10,
    centeredSlides: true,
    speed: 1500,
    grabCursor: true,
    breakpoints: {
      768: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },

    on: {
      slideChange: function () {
        const activeIndex = this.realIndex;
        featuresItems.forEach((item, index) => {
          if (index === activeIndex) {
            item.classList.add('item_active');
          } else {
            item.classList.remove('item_active');
          }
        });
      },
    },
  });

  const updateActiveClass = () => {
    const activeIndex = swiper.realIndex;
    featuresItems.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add('item_active');
      } else {
        item.classList.remove('item_active');
      }
    });
  };

  updateActiveClass();

  const featureItems = document.querySelectorAll('.features_item');
  featureItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      if (!isNaN(slideIndex)) {
        swiper.slideToLoop(slideIndex);
      } else {
        console.error('Invalid slide index:', this.getAttribute('data-slide'));
      }
    });
  });

  swiper.on('slideChange', updateActiveClass);
});

const swiperCard = new Swiper('.cards_swiper', {
  loop: true,
  autoplay: true,
  slidesPerView: 2.1,
  spaceBetween: 10,
  centeredSlides: true,
  speed: 1500,
  allowTouchMove: false,
  breakpoints: {
    768: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

if (window.innerWidth < 1024) {
  const swiperCardReview = new Swiper('.testimonials_swiper', {
    loop: true,
    loopAddBlankSlides: 3,
    // autoplay: true,
    slidesPerView: 1.7,
    // spaceBetween: 10,
    centeredSlides: true,
    speed: 1500,
    allowTouchMove: true,
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });
}

function burgerMenu() {
  const burger = document.querySelector('.burger_menu');
  const navMenu = document.querySelector('.menu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger_active');
    navMenu.classList.toggle('menu_active');
    document.body.classList.toggle('body_lock');
  });
}
