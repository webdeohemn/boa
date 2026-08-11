(() => {
  const assetBase = document.currentScript
    ? new URL(".", document.currentScript.src)
    : new URL("./", window.location.href);

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("navbar-demo.css", assetBase).href;
  document.head.append(stylesheet);

  const mobileStylesheet = document.createElement("link");
  mobileStylesheet.rel = "stylesheet";
  mobileStylesheet.href = new URL("mobile-demo.css", assetBase).href;
  document.head.append(mobileStylesheet);

  const legacyModule = document.getElementById("gtUnAuthMainModule");
  const legacyHeader = legacyModule?.closest("section.head-row");

  if (!legacyHeader || document.querySelector(".site-header")) {
    return;
  }

  legacyHeader.style.display = "none";
  legacyHeader.setAttribute("aria-hidden", "true");

  const magnifier = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.25"></circle>
      <path d="m15.5 15.5 5 5" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round"></path>
    </svg>`;

  const globe = `
    <svg class="language-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" stroke-width="1.9"></circle>
      <path d="M2.9 12h18.2M12 2.75c2.55 2.48 3.84 5.57 3.84 9.25S14.55 18.77 12 21.25C9.45 18.77 8.16 14.48 8.16 12S9.45 5.23 12 2.75Z" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round"></path>
    </svg>`;

  const utilityItems = ["Personal", "Wealth Management", "Business", "Corporations & Institutions"];
  const mobileUtilityItems = ["Personal", "Wealth Management", "Business", "Organizations", "Security", "About Us", "Language", "Contact", "Help"];
  const productItems = ["Checking", "Savings & CDs", "Credit Cards", "Home Loans", "Auto Loans", "Investing", "Money Habits®"];
  const utilityButtons = utilityItems
    .map((label, index) => `<li><button class="utility-link${index === 0 ? " utility-link--active" : ""}" type="button">${label}</button></li>`)
    .join("");
  const mobileUtilityButtons = mobileUtilityItems
    .map((label, index) => `<li><button class="utility-link${index === 0 ? " utility-link--active" : ""}" type="button">${label}</button></li>`)
    .join("");
  const productButtons = productItems
    .map((label) => `<li><button class="product-nav-item" type="button">${label}<span class="nav-chevron" aria-hidden="true">▾</span></button></li>`)
    .join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="demo-top-notice" role="note">
      <span class="notice-left">Bank of America deposit products:</span>
      <span class="notice-badge" aria-label="FDIC-style demo badge">FDIC</span>
      <span class="notice-right">FDIC-Insured - Backed by the full faith and credit of the U.S. Government</span>
    </div>
    <nav class="utility-nav" aria-label="Utility navigation">
      <div class="nav-container">
        <ul class="utility-links utility-links--left">${utilityButtons}</ul>
        <ul class="utility-links utility-links--right">
          <li><button class="utility-link" type="button">Security</button></li>
          <li><button class="utility-link" type="button">About Us</button></li>
          <li class="utility-separator" aria-hidden="true"></li>
          <li><button class="utility-link language-link" type="button">${globe}<span>En español</span></button></li>
          <li class="utility-separator" aria-hidden="true"></li>
          <li><button class="utility-link" type="button">Contact Us</button></li>
          <li><button class="utility-link" type="button">Help</button></li>
        </ul>
      </div>
    </nav>
    <div class="brand-row">
      <div class="nav-container">
        <button class="utility-menu-toggle" type="button" aria-expanded="false" aria-controls="demo-mobile-utility-menu">
          <span class="menu-icon" aria-hidden="true"></span><span class="sr-only">Open utility menu</span>
        </button>
        <img class="brand-logo" src="www1.bac-assets.com/homepage/spa-assets/images/logo-bofa-flagscape-18ad22ccaf518c47d77b.svg" alt="Educational finance demo">
        <form class="search-box" role="search">
          <label class="sr-only" for="demo-nav-search">Search the</label>
          <input class="search-input" id="demo-nav-search" name="q" type="search" placeholder="Search" autocomplete="off">
          <button class="search-submit" type="submit" aria-label="Search">${magnifier}</button>
        </form>
        <div class="mobile-actions">
          <button class="mobile-login-button" type="button">Login</button>
          <button class="mobile-search-toggle" type="button" aria-label="Search">${magnifier}</button>
        </div>
      </div>
    </div>
    <nav class="product-nav" aria-label="Product navigation">
      <div class="nav-container"><ul class="product-nav-list">${productButtons}</ul></div>
    </nav>
    <nav class="mobile-utility-panel" id="demo-mobile-utility-menu" aria-label="Mobile utility navigation" hidden>
      <ul class="mobile-utility-links">
        ${mobileUtilityButtons}
      </ul>
    </nav>`;

  legacyHeader.insertAdjacentElement("beforebegin", header);

  const search = header.querySelector(".search-box");
  search.addEventListener("submit", (event) => event.preventDefault());

  const mobileMenuToggle = header.querySelector(".utility-menu-toggle");
  const mobilePanel = header.querySelector(".mobile-utility-panel");
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobilePanel.hidden = isOpen;
    mobilePanel.classList.toggle("is-open", !isOpen);
  });

  const mobileStyleSnapshots = new WeakMap();
  const setMobileStyle = (element, styles) => {
    if (!mobileStyleSnapshots.has(element)) {
      mobileStyleSnapshots.set(element, element.getAttribute("style"));
    }

    Object.entries(styles).forEach(([property, value]) => {
      element.style.setProperty(property, value, "important");
    });
  };

  const restoreStyle = (element) => {
    if (!mobileStyleSnapshots.has(element)) {
      return;
    }

    const originalStyle = mobileStyleSnapshots.get(element);
    if (originalStyle === null) {
      element.removeAttribute("style");
    } else {
      element.setAttribute("style", originalStyle);
    }
    mobileStyleSnapshots.delete(element);
  };

  const syncMobileHeroTypography = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const heading = document.querySelector("#mastheadContainerModule .four-card-red-headline .headline");
    const cardCtas = [...document.querySelectorAll("#mastheadContainerModule .mobile-cta .card-cta")];

    if (!isMobile) {
      [heading, ...cardCtas].filter(Boolean).forEach(restoreStyle);
      return;
    }

    if (heading) {
      setMobileStyle(heading, {
        "font-size": "clamp(37px, 9.8vw, 40px)",
        "line-height": "1.15",
        "letter-spacing": "-0.6px"
      });
    }

    cardCtas.forEach((cta) => {
      setMobileStyle(cta, {
        "font-size": "clamp(20px, 5.8vw, 24px)",
        "line-height": "1.15"
      });
    });
  };

  const masthead = document.getElementById("mastheadContainerModule");
  if (masthead) {
    syncMobileHeroTypography();
    new MutationObserver(syncMobileHeroTypography).observe(masthead, { childList: true, subtree: true });
    window.addEventListener("resize", syncMobileHeroTypography);
  }
})();
