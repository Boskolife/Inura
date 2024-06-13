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

    const activeIndex = swiper.realIndex;
    featuresItems.forEach((item, index) => {
        if (index === activeIndex) {
            item.classList.add('item_active');
        } else {
            item.classList.remove('item_active');
        }
    });
});