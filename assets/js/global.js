(function () {
  const cfg = window.SiteConfig || {};
  const rel = (path) => {
    const depth = document.body.dataset.depth || "";
    if (!path || /^(https?:|mailto:|#|data:)/.test(path)) return path;
    return depth + path;
  };
  const icon = (name, className = "icon") => `<i class="${className}" data-lucide="${name}" aria-hidden="true"></i>`;
  const brandMark = () => icon("boxes", "brand-icon");

  function applySiteConfig() {
    const titleBase = cfg.browserTitle || cfg.companyName || "";
    const pageTitle = document.body.dataset.pageTitle || titleBase || "Concrete Services";
    document.title = pageTitle && titleBase && pageTitle !== titleBase ? `${pageTitle} | ${titleBase}` : (pageTitle || titleBase);

    const favicon = document.querySelector('link[rel="icon"]') || document.createElement("link");
    favicon.rel = "icon";
    favicon.href = rel(cfg.favicon || "");
    document.head.appendChild(favicon);

    document.querySelectorAll("[data-config]").forEach((el) => {
      const key = el.dataset.config;
      el.textContent = cfg[key] || "";
    });

    document.querySelectorAll("[data-config-content]").forEach((el) => {
      const key = el.dataset.configContent;
      el.setAttribute("content", cfg[key] || "");
    });

    document.querySelectorAll("[data-config-href]").forEach((el) => {
      const key = el.dataset.configHref;
      const value = cfg[key] || "";
      el.href = key === "email" && value ? `mailto:${value}` : rel(value);
    });

    document.querySelectorAll("[data-config-email]").forEach((el) => {
      const email = cfg.email || "";
      el.textContent = email;
      el.href = email ? `mailto:${email}` : "mailto:";
    });

    document.querySelectorAll("[data-config-src]").forEach((el) => {
      const key = el.dataset.configSrc;
      const value = cfg[key] || "";
      if (value) {
        el.src = rel(value);
        el.hidden = false;
      } else {
        el.removeAttribute("src");
        el.hidden = true;
      }
    });

    document.querySelectorAll("[data-config-aria-label]").forEach((el) => {
      const key = el.dataset.configAriaLabel;
      el.setAttribute("aria-label", cfg[key] || "");
    });
  }
  window.applySiteConfig = applySiteConfig;

  const header = document.querySelector("[data-site-header]");
  if (header) {
    const active = document.body.dataset.nav || "home";
    header.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="${rel("index.html")}" data-config-aria-label="companyName">
          ${brandMark()}
          <span data-config="companyName"></span>
        </a>
        <nav class="nav" aria-label="Main navigation">
          <a class="${active === "home" ? "active" : ""}" href="${rel("index.html")}">Home</a>
          <a href="${rel("index.html#about")}">About Us</a>
          <div class="dropdown">
            <button type="button" aria-haspopup="true">Services ${icon("chevron-down", "icon nav-icon")}</button>
            <div class="dropdown-panel">
              <a href="${rel("concrete-installation.html")}">Concrete Installation ${icon("arrow-right", "icon link-icon")}</a>
              <a href="${rel("concrete-repair.html")}">Concrete Repair & Resurfacing ${icon("arrow-right", "icon link-icon")}</a>
            </div>
          </div>
          <a href="${rel("index.html#contact")}">Contact</a>
        </nav>
        <div class="header-cta">
          <a class="btn" href="${rel("index.html#contact")}">Get a Quote ${icon("arrow-right", "icon arrow")}</a>
          <button class="menu-toggle" type="button" aria-label="Open menu"><span class="menu-toggle-icon" aria-hidden="true"></span></button>
        </div>
      </div>`;
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <section class="cta-band">
        <div class="container cta-inner">
          <div>
            <p class="kicker">Concrete-ready support</p>
            <h2 class="headline small">Ready To Set Your <span class="orange">Project</span> In Motion?</h2>
          </div>
          <div class="cta-panel">
            <p class="lead">Tell us what you need poured, repaired, or resurfaced. We will route your request into a clear concrete service brief.</p>
            <a class="btn" href="${rel("index.html#contact")}">Start Request ${icon("arrow-right", "icon arrow")}</a>
            <a class="btn ghost" data-config-href="email" href="mailto:">${icon("mail", "icon")} <span data-config="email"></span></a>
          </div>
        </div>
      </section>
      <div class="container footer-main">
        <div>
          <a class="brand" href="${rel("index.html")}">
            ${brandMark()}
            <span data-config="companyName"></span>
          </a>
          <p data-config="disclaimer"></p>
        </div>
        <div><h3 class="footer-title">Quick Links</h3><div class="footer-links"><a href="${rel("index.html")}">Home</a><a href="${rel("index.html#about")}">About Us</a><a href="${rel("index.html#services")}">Services</a><a href="${rel("index.html#contact")}">Contact</a></div></div>
        <div><h3 class="footer-title">Services</h3><div class="footer-links"><a href="${rel("concrete-installation.html")}">Concrete Installation</a><a href="${rel("concrete-repair.html")}">Repair & Resurfacing</a></div></div>
        <div><h3 class="footer-title">Legal</h3><div class="footer-links"><a href="${rel("privacy-policy.html")}">Privacy Policy</a><a href="${rel("terms.html")}">Terms</a><a href="${rel("cookies.html")}">Cookies</a></div></div>
        <div><h3 class="footer-title">Email</h3><div class="footer-links"><a data-config-email href="mailto:"></a></div></div>
      </div>`;
  }

  const overlay = document.querySelector("[data-mobile-overlay]");
  if (overlay) {
    overlay.innerHTML = `
      <button class="mobile-close" type="button" aria-label="Close menu">${icon("x", "icon")}</button>
      <a class="brand mobile-menu-brand" href="${rel("index.html")}" data-config-aria-label="companyName">
        ${brandMark()}
        <span data-config="companyName"></span>
      </a>
      <div class="mobile-menu-photo" aria-hidden="true"><img src="${rel("assets/images/concrete-mixer.webp")}" alt="" width="1600" height="1067"></div>
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <a href="${rel("index.html")}">${icon("home", "mobile-link-icon")}<span>Home</span></a>
        <a href="${rel("index.html#about")}">${icon("hard-hat", "mobile-link-icon")}<span>About Us</span></a>
        <div class="mobile-services">
          <a href="${rel("concrete-installation.html")}">${icon("construction", "mobile-link-icon")}<span>Concrete Installation</span></a>
          <a href="${rel("concrete-repair.html")}">${icon("wrench", "mobile-link-icon")}<span>Concrete Repair & Resurfacing</span></a>
        </div>
        <a href="${rel("index.html#contact")}">${icon("mail", "mobile-link-icon")}<span>Contact</span></a>
      </nav>`;
    const close = () => { overlay.classList.remove("open"); document.body.classList.remove("menu-open"); };
    document.querySelector(".menu-toggle")?.addEventListener("click", () => { overlay.classList.add("open"); document.body.classList.add("menu-open"); });
    overlay.querySelector(".mobile-close")?.addEventListener("click", close);
    overlay.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  applySiteConfig();

  const revealHeroes = () => {
    requestAnimationFrame(() => {
      document.querySelectorAll(".hero").forEach((hero) => hero.classList.add("is-revealed"));
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealHeroes, { once: true });
  } else {
    revealHeroes();
  }

  const cookie = document.querySelector("[data-cookie-card]");
  if (cookie && localStorage.getItem("sd_cookie_ok") !== "1") {
    cookie.classList.add("show");
    cookie.querySelector("button")?.addEventListener("click", () => {
      localStorage.setItem("sd_cookie_ok", "1");
      cookie.classList.remove("show");
    });
  }

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => button.closest(".faq-item").classList.toggle("open"));
  });

  document.querySelectorAll(".showcase-swiper").forEach((swiperEl) => {
    const wrapper = swiperEl.querySelector(".swiper-wrapper");
    const slides = Array.from(swiperEl.querySelectorAll(".showcase-slide"));
    if (!wrapper || slides.length < 2) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const usesMobileAccordion = Boolean(swiperEl.closest(".home-showcase-section, .installation-showcase-section, .repair-showcase-section"));
    let activeIndex = 0;
    let startX = 0;
    let currentX = 0;
    let timer;
    let isMobileAccordion = false;

    const renderLucideIcons = () => {
      window.lucide?.createIcons({
        attrs: {
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }
      });
    };
    const setToggleIcons = (icon) => {
      if (!usesMobileAccordion) return;
      slides.forEach((slide) => {
        const toggle = slide.querySelector(".showcase-plus");
        if (!toggle || toggle.dataset.showcaseIcon === icon) return;
        toggle.dataset.showcaseIcon = icon;
        toggle.innerHTML = `<i class="icon" data-lucide="${icon}" aria-hidden="true"></i>`;
      });
      renderLucideIcons();
    };
    const sync = () => {
      if (usesMobileAccordion && mobileQuery.matches) return;
      slides.forEach((slide, index) => slide.classList.toggle("is-active", index === activeIndex));
      swiperEl.classList.add("is-ready");
      requestAnimationFrame(() => {
        const active = slides[activeIndex];
        const maxOffset = Math.max(0, wrapper.scrollWidth - swiperEl.clientWidth);
        const centered = active.offsetLeft - (swiperEl.clientWidth - active.offsetWidth) / 2;
        const offset = Math.min(maxOffset, Math.max(0, centered));
        wrapper.style.transform = `translate3d(${-offset}px, 0, 0)`;
      });
    };
    const goTo = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      sync();
    };
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => goTo(activeIndex + 1), 3800);
    };
    const closeMobileSlides = (exceptSlide) => {
      slides.forEach((slide) => {
        if (slide === exceptSlide) return;
        slide.classList.remove("is-mobile-open");
        slide.setAttribute("aria-expanded", "false");
      });
    };
    const enableMobileAccordion = () => {
      if (isMobileAccordion) return;
      isMobileAccordion = true;
      clearInterval(timer);
      wrapper.style.transform = "";
      swiperEl.classList.add("is-ready", "is-mobile-accordion");
      setToggleIcons("chevron-down");
      slides.forEach((slide) => {
        slide.classList.remove("is-active", "swiper-slide-active");
        slide.classList.remove("is-mobile-open");
        slide.setAttribute("role", "button");
        slide.setAttribute("tabindex", "0");
        slide.setAttribute("aria-expanded", "false");
      });
    };
    const enableDesktopShowcase = () => {
      if (isMobileAccordion) {
        isMobileAccordion = false;
        swiperEl.classList.remove("is-mobile-accordion");
        setToggleIcons("plus");
        slides.forEach((slide) => {
          slide.classList.remove("is-mobile-open");
          slide.removeAttribute("role");
          slide.removeAttribute("tabindex");
          slide.removeAttribute("aria-expanded");
        });
      }
      sync();
      restart();
    };
    const updateMode = () => {
      if (usesMobileAccordion && mobileQuery.matches) {
        enableMobileAccordion();
        return;
      }
      enableDesktopShowcase();
    };

    slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        if (isMobileAccordion) {
          const willOpen = !slide.classList.contains("is-mobile-open");
          closeMobileSlides(slide);
          slide.classList.toggle("is-mobile-open", willOpen);
          slide.setAttribute("aria-expanded", String(willOpen));
          return;
        }
        goTo(index);
        restart();
      });
      slide.addEventListener("keydown", (event) => {
        if (!isMobileAccordion || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        slide.click();
      });
    });
    swiperEl.addEventListener("pointerdown", (event) => {
      if (isMobileAccordion) return;
      startX = event.clientX;
      currentX = event.clientX;
    });
    swiperEl.addEventListener("pointermove", (event) => {
      if (isMobileAccordion) return;
      currentX = event.clientX;
    });
    swiperEl.addEventListener("pointerup", () => {
      if (isMobileAccordion) return;
      const delta = currentX - startX;
      if (Math.abs(delta) > 44) {
        goTo(activeIndex + (delta < 0 ? 1 : -1));
        restart();
      }
    });
    window.addEventListener("resize", updateMode);
    updateMode();
  });

  document.querySelectorAll("form[data-ajax-form]").forEach((form) => {
    const status = form.querySelector(".form-status");
    const emailField = form.querySelector('[name="configEmail"]');
    if (emailField) emailField.value = cfg.email || "";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.textContent = "";
      if (!form.reportValidity()) return;
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        const data = await res.json();
        status.textContent = data.message || (res.ok ? "Successfully sent" : "Please try again");
        if (res.ok) form.reset();
      } catch (error) {
        status.textContent = "Message could not be sent right now";
      }
    });
  });

  window.lucide?.createIcons({
    attrs: {
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  });

  window.AOS?.init();
})();
