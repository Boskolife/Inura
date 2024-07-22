new WOW().init();
burgerMenu();
openPopup();
timer();
initTabs();
getUserInfo();
closeEmailError();

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

function getUserInfo() {
  const lotterySubmitButton = document.querySelector('#lottery_button_send');

  lotterySubmitButton.addEventListener('click', async () => {
    const currentUrl = window.location.href;
    const currentLang = currentUrl.split('/')[3].split('-')[1];

    const userEmail = document.querySelector('.lottery_input').value;
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/);

    const lotteryStepOne = document.getElementById("lottery_step_one");
    const lotteryStepTwo = document.getElementById("lottery_step_two");

    if (!emailRegex.test(userEmail)) {
      let errorText = "Incorrect email format";

      if (currentLang === "uk") {
        errorText = "Неправильний формат пошти"
      } else if (currentLang === "es") {
        errorText = "Formato de correo electrónico incorrecto";
      } else if (currentLang === "ru") {
        errorText = "Неправильный формат почты";
      }

      showLotteryInputError(errorText);

      return;
    }

    const response = await fetch(`https://lottery-inura.azurewebsites.net/user?email=${userEmail}`);
    const json = await response.json();

    if (!json.name) {
      const lotteryStepError = document.getElementById("lottery_step_error");
      const lotteryInvalidEmail = document.getElementById("lottery_card_email");

      lotteryStepOne.style.display = "none";
      lotteryStepError.style.display = "flex";

      lotteryInvalidEmail.textContent = userEmail;
      document.querySelector('.lottery_input').value = "";

      resetErrorLotteryInput();

      return;
    }


    lotteryStepOne.style.display = "none";
    lotteryStepTwo.style.display = "flex";

    let hiText = "Hi";
    let strangerText = "Stranger";

    if (currentLang === "uk") {
      hiText = "Привіт";
      strangerText = "Незнайомець";
    } else if (currentLang === "es") {
      hiText = "Hola";
      strangerText = "Extraño";
    } else if (currentLang === "ru") {
      hiText = "Привет";
      strangerText = "Незнакомец";
    }

    resetErrorLotteryInput();

    document.getElementById("lottery_card_title").textContent = `${hiText}, ${json.name ?? strangerText}!`;
    document.getElementById("lottery_card_users").textContent = `${json.invitedUsersCount ?? 0}`;
    document.getElementById("lottery_card_chances").textContent = `${json.shances ?? 0}x`;
  });
}

function closeEmailError() {
  const lotteryCross = document.querySelector(".lottery_error_close");

  lotteryCross.addEventListener("click", () => {
    const lotteryStepOne = document.getElementById("lottery_step_one");
    const lotteryStepError = document.getElementById("lottery_step_error");

    lotteryStepError.style.display = "none";
    lotteryStepOne.style.display = "flex";
  });
}

function showLotteryInputError(text) {
  const input = document.querySelector('.lottery_input');
  input.style.border = "1px solid #EF2F6E"

  const inputError = document.querySelector('.lottery_input_error');
  inputError.textContent = text;
  inputError.style.display = "block";
}

function resetErrorLotteryInput() {
  const inputError = document.querySelector('.lottery_input_error');
  inputError.style.display = "none";

  const input = document.querySelector('.lottery_input');
  input.style.border = "1px solid #AA86F7";
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

function timer() {
  var countDownDate = new Date('Jul 17, 2024 22:00:00').getTime();

  var x = setInterval(function () {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
    var days = Math.floor(
      (distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
    );
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var monthsElement = document.getElementById('months_number');
    var daysElement = document.getElementById('days_number');
    var hoursElement = document.getElementById('hours_number');
    var minutesElement = document.getElementById('minutes_number');
    var secondsElement = document.getElementById('seconds_number');

    if (monthsElement) {
      monthsElement.innerHTML = months;
    }
    if (daysElement) {
      daysElement.innerHTML = days;
    }
    if (hoursElement) {
      hoursElement.innerHTML = hours;
    }
    if (minutesElement) {
      minutesElement.innerHTML = minutes;
    }
    if (secondsElement) {
      secondsElement.innerHTML = seconds;
    }

    if (distance < 0) {
      clearInterval(x);
      if (monthsElement) {
        monthsElement.innerHTML = '0';
      }
      if (daysElement) {
        daysElement.innerHTML = '0';
      }
      if (hoursElement) {
        hoursElement.innerHTML = '0';
      }
      if (minutesElement) {
        minutesElement.innerHTML = '0';
      }
      if (secondsElement) {
        secondsElement.innerHTML = '0';
      }
    }
  }, 1000);
}

function initTabs() {
  var faqTabs = document.querySelector('#faqTabs');
  if (!faqTabs) return;
  var tabs = document.querySelectorAll('.tab_title'),
    tabsContent = document.querySelectorAll('.tab_content'),
    tabsParent = document.querySelector('.tab_wrapper'),
    closeItem = document.querySelectorAll('.open_status');

  function showTabContent() {
    var i =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.toggle('show');
    tabs[i].classList.toggle('tab_active');
    closeItem[i].classList.toggle('open_active');
  }

  tabs.forEach(function (item, i) {
    item.addEventListener('click', () => {
      showTabContent(i);
    });
  });
}
