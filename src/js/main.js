new WOW().init();
burgerMenu();
openPopup();

document.addEventListener('DOMContentLoaded', function () {
  const featuresItems = document.querySelectorAll('.item_name');
  const featuresSwiperContainer = document.querySelector('.features_swiper');
  if (featuresSwiperContainer) {
    const swiper = new Swiper('.features_swiper', {
      loop: true,
      autoplay: true,
      loopAddBlankSlides: false,
      loopPreventsSliding: false,
      slidesPerView: 1.7,
      spaceBetween: 10,
      centeredSlides: true,
      slideToClickedSlide: true,
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
  }

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

const cardsSwiperContainer = document.querySelector('.cards_swiper');
if (cardsSwiperContainer) {
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
}

if (window.innerWidth < 1024) {
  const testimonialsSwiperContainer = document.querySelector(
    '.testimonials_swiper',
  );
  if (testimonialsSwiperContainer) {
    const swiperCardReview = new Swiper('.testimonials_swiper', {
      loop: true,
      loopAddBlankSlides: 3,
      slidesPerView: 1.7,
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
}

function burgerMenu() {
  const burger = document.querySelector('.burger_menu');
  const navMenu = document.querySelector('.menu');
  const linkList = document.querySelectorAll('.menu_link');

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger_active');
    navMenu.classList.toggle('menu_active');
    document.body.classList.toggle('body_lock');
  });

  linkList.forEach((item) => {
    item.addEventListener('click', () => {
      burger.classList.remove('burger_active');
      navMenu.classList.remove('menu_active');
      document.body.classList.remove('body_lock');
    });
  });
}

function openPopup() {
  const btn = document.querySelectorAll('.app_store_btn');
  const popUp = document.querySelectorAll('.app_store_popUp');
  const popupContainer = document.querySelectorAll('.popUp_container');
  const closeElem = document.querySelectorAll('.close_elem');

  btn.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      popUp.forEach((item) => {
        item.classList.add('popUp_active');
      });
      popupContainer.forEach((item) => {
        item.style.display = 'block';
      });
      document.body.classList.add('popup_lock');
    });
  });

  closeElem.forEach((item) => {
    item.addEventListener('click', () => {
      popUp.forEach((item) => {
        item.classList.remove('popUp_active');
      });
      popupContainer.forEach((item) => {
        item.style.display = 'none';
      });
      document.body.classList.remove('popup_lock');
    });
  });
}
