document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".services-swiper").forEach((swiperEl) => new Swiper(swiperEl, {
    loop: true,
    slidesPerView: 1.08,
    spaceBetween: 14,
    watchOverflow: false,
    autoplay: { delay: 3600 },
    navigation: {
      nextEl: swiperEl.querySelector(".swiper-button-next"),
      prevEl: swiperEl.querySelector(".swiper-button-prev")
    },
    loopAdditionalSlides: 4,
    breakpoints: {
      720: { slidesPerView: 2, spaceBetween: 18 },
      1120: { slidesPerView: 3, spaceBetween: 22 }
    }
  }));

  const appData = {
    driveways: ["Driveways", "Load-bearing mixes, clean edge forming, and finish options planned around daily vehicle use.", "assets/images/concrete-driveway.webp"],
    patios: ["Patios", "Outdoor living slabs shaped for drainage, texture, and long-term surface comfort.", "assets/images/concrete-slab.webp"],
    foundations: ["Foundations", "Footings and slab bases prepared with site access, reinforcement, and cure timing in mind.", "assets/images/concrete-site.webp"],
    walkways: ["Walkways", "Practical pedestrian concrete with consistent pitch, joints, and clean transitions.", "assets/images/concrete-finish.webp"],
    slabs: ["Slabs", "Garage, shop, and utility slabs built for flatness, strength, and predictable workflow.", "assets/images/concrete-tools.webp"],
    commercial: ["Commercial Concrete", "Coordinated concrete scopes for retail, industrial, and light commercial sites.", "assets/images/concrete-mixer.webp"]
  };
  const buttons = document.querySelectorAll("[data-application]");
  const title = document.querySelector("[data-application-title]");
  const text = document.querySelector("[data-application-text]");
  const image = document.querySelector("[data-application-image]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      const item = appData[button.dataset.application];
      title.textContent = item[0];
      text.textContent = item[1];
      image.style.opacity = ".35";
      setTimeout(() => { image.src = item[2]; image.alt = item[0]; image.style.opacity = ".78"; }, 140);
    });
  });
});
