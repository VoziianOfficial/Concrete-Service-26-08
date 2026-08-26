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

  document.querySelectorAll(".action-swiper").forEach((swiperEl) => new Swiper(swiperEl, {
    loop: true,
    slidesPerView: 1.04,
    spaceBetween: 16,
    autoplay: { delay: 4200 },
    loopAdditionalSlides: 4,
    breakpoints: {
      820: { slidesPerView: 1.18, spaceBetween: 18 },
      1180: { slidesPerView: 2, spaceBetween: 28 }
    }
  }));

  document.querySelectorAll(".testimonial-swiper").forEach((swiperEl) => {
    const avatars = Array.from(swiperEl.closest(".testimonial-copy")?.querySelectorAll(".testimonial-avatar") ?? []);
    const swiper = new Swiper(swiperEl, {
      loop: true,
      autoplay: { delay: 5200 }
    });
    if (!avatars.length || !swiper.realCount) return;

    const syncAvatars = () => {
      const real = ((swiper.activeIndex - swiper.cloneCount) % swiper.realCount + swiper.realCount) % swiper.realCount;
      avatars.forEach((avatar, i) => avatar.classList.toggle("active", i === real));
    };
    avatars.forEach((avatar, i) => avatar.addEventListener("click", () => swiper.goTo(swiper.cloneCount + i)));
    setInterval(syncAvatars, 250);
  });

  const parallaxPhotos = document.querySelectorAll("[data-parallax-photo] img");
  const updateParallaxPhotos = () => {
    parallaxPhotos.forEach((image) => {
      const rect = image.parentElement.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const offset = Math.max(-14, Math.min(8, progress * -18));
      image.style.setProperty("--parallax-y", `${offset}%`);
    });
  };
  if (parallaxPhotos.length) {
    updateParallaxPhotos();
    window.addEventListener("scroll", updateParallaxPhotos, { passive: true });
    window.addEventListener("resize", updateParallaxPhotos);
  }

  const counters = document.querySelectorAll("[data-counter]");
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.counter) || 0;
    const duration = 1300;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased).toString();
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .45 });

    counters.forEach((counter) => counterObserver.observe(counter));
  }

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
