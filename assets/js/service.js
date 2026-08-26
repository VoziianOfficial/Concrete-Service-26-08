document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".project-swiper", {
    loop: true,
    slidesPerView: 1,
    autoplay: { delay: 3400 },
    breakpoints: { 760: { slidesPerView: 2 }, 1180: { slidesPerView: 3 } }
  });
});
