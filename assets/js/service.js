document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".project-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 18,
    autoplay: { delay: 3400 },
    navigation: {
      nextEl: ".project-swiper-shell .swiper-button-next",
      prevEl: ".project-swiper-shell .swiper-button-prev"
    },
    breakpoints: { 760: { slidesPerView: 2 }, 1180: { slidesPerView: 3 } }
  });
});
