(function () {
  const cfg = window.SiteConfig || {};
  const pageTitle = document.body.dataset.pageTitle || cfg.browserTitle || "Concrete Services";
  document.title = pageTitle === cfg.browserTitle ? cfg.browserTitle : `${pageTitle} | ${cfg.browserTitle}`;
  const favicon = document.querySelector('link[rel="icon"]') || document.createElement("link");
  favicon.rel = "icon";
  favicon.href = cfg.favicon || "assets/icons/favicon.svg";
  document.head.appendChild(favicon);

  const rel = (path) => {
    const depth = document.body.dataset.depth || "";
    if (/^(https?:|mailto:|#)/.test(path)) return path;
    return depth + path;
  };

  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    if (cfg[key]) el.textContent = cfg[key];
  });
  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const key = el.dataset.configHref;
    if (cfg[key]) el.href = key === "email" ? `mailto:${cfg[key]}` : cfg[key];
  });

  const header = document.querySelector("[data-site-header]");
  if (header) {
    const active = document.body.dataset.nav || "home";
    header.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="${rel("index.html")}" aria-label="Home">
          <img src="${rel(cfg.logo || "assets/icons/drop-logo.svg")}" alt="" width="56" height="56">
          <span>${cfg.companyName || ""}</span>
        </a>
        <nav class="nav" aria-label="Main navigation">
          <a class="${active === "home" ? "active" : ""}" href="${rel("index.html")}">Home</a>
          <a href="${rel("index.html#about")}">About Us</a>
          <div class="dropdown">
            <button type="button" aria-haspopup="true">Services +</button>
            <div class="dropdown-panel">
              <a href="${rel("concrete-installation.html")}">Concrete Installation <span>-></span></a>
              <a href="${rel("concrete-repair.html")}">Concrete Repair & Resurfacing <span>-></span></a>
            </div>
          </div>
          <a href="${rel("index.html#contact")}">Contact</a>
        </nav>
        <div class="header-cta">
          <a class="btn" href="${rel("index.html#contact")}">Get a Quote <span class="arrow">-></span></a>
          <button class="menu-toggle" type="button" aria-label="Open menu"><span></span><span></span><span></span></button>
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
            <a class="btn" href="${rel("index.html#contact")}">Start Request <span class="arrow">-></span></a>
            <a class="btn ghost" href="mailto:${cfg.email || ""}">${cfg.email || ""}</a>
          </div>
        </div>
      </section>
      <div class="container footer-main">
        <div>
          <a class="brand" href="${rel("index.html")}">
            <img src="${rel(cfg.logo || "assets/icons/drop-logo.svg")}" alt="" width="56" height="56">
            <span>${cfg.companyName || ""}</span>
          </a>
          <p>${cfg.disclaimer || ""}</p>
        </div>
        <div><h3 class="footer-title">Quick Links</h3><div class="footer-links"><a href="${rel("index.html")}">Home</a><a href="${rel("index.html#about")}">About Us</a><a href="${rel("index.html#services")}">Services</a><a href="${rel("index.html#contact")}">Contact</a></div></div>
        <div><h3 class="footer-title">Services</h3><div class="footer-links"><a href="${rel("concrete-installation.html")}">Concrete Installation</a><a href="${rel("concrete-repair.html")}">Repair & Resurfacing</a></div></div>
        <div><h3 class="footer-title">Legal</h3><div class="footer-links"><a href="${rel("privacy-policy.html")}">Privacy Policy</a><a href="${rel("terms.html")}">Terms</a><a href="${rel("cookies.html")}">Cookies</a></div></div>
        <div><h3 class="footer-title">Email</h3><div class="footer-links"><a href="mailto:${cfg.email || ""}">${cfg.email || ""}</a></div></div>
      </div>`;
  }

  const overlay = document.querySelector("[data-mobile-overlay]");
  if (overlay) {
    overlay.innerHTML = `
      <button class="mobile-close" type="button" aria-label="Close menu">x</button>
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <a href="${rel("index.html")}">Home</a>
        <a href="${rel("index.html#about")}">About Us</a>
        <div class="mobile-services">
          <a href="${rel("concrete-installation.html")}">Concrete Installation</a>
          <a href="${rel("concrete-repair.html")}">Concrete Repair & Resurfacing</a>
        </div>
        <a href="${rel("index.html#contact")}">Contact</a>
      </nav>`;
    const close = () => { overlay.classList.remove("open"); document.body.classList.remove("menu-open"); };
    document.querySelector(".menu-toggle")?.addEventListener("click", () => { overlay.classList.add("open"); document.body.classList.add("menu-open"); });
    overlay.querySelector(".mobile-close")?.addEventListener("click", close);
    overlay.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
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

  window.AOS?.init();
})();
