document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-swiper").forEach((swiperEl) => {
    const controlsScope = swiperEl.closest(".project-swiper-shell") || swiperEl.parentElement;
    const isRepairLayout = document.body.classList.contains("repair-layout");

    new Swiper(swiperEl, {
      loop: true,
      slidesPerView: 1.08,
      spaceBetween: 14,
      autoplay: { delay: 3400 },
      navigation: {
        nextEl: controlsScope?.querySelector(".swiper-button-next"),
        prevEl: controlsScope?.querySelector(".swiper-button-prev")
      },
      loopAdditionalSlides: 4,
      breakpoints: isRepairLayout
        ? { 760: { slidesPerView: 2, spaceBetween: 18 } }
        : {
          760: { slidesPerView: 2, spaceBetween: 18 },
          1180: { slidesPerView: 3, spaceBetween: 22 }
        }
    });
  });

  document.querySelectorAll("[data-project-filter]").forEach((tabs) => {
    const grid = tabs.nextElementSibling;
    if (!grid) return;
    const tiles = grid.querySelectorAll("[data-category]");

    tabs.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        tabs.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        tiles.forEach((tile) => {
          tile.style.display = filter === "all" || tile.dataset.category === filter ? "" : "none";
        });
      });
    });
  });
});
