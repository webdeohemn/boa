(() => {
  "use strict";

  const homeView = document.querySelector("#home-view");
  const dashboardView = document.querySelector("#dashboard-view");
  const dashboardMain = document.querySelector("#dashboard-main");
  const demoLoginForm = document.querySelector("#demo-login-form");
  const loginFormScreen = document.querySelector("[data-login-form-screen]");
  const loginConfirmation = document.querySelector("[data-login-confirmation]");
  const demoUserId = document.querySelector("#demo-user-id");
  const dashboardContinue = document.querySelector("[data-dashboard-continue]");
  const confirmationBack = document.querySelector("[data-confirmation-back]");
  const promoBar = document.querySelector("#promo-bar");
  const appStatus = document.querySelector("#app-status");
  const homeMenu = document.querySelector("#mobile-site-menu");
  const homeMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
  const dashboardMenu = document.querySelector("#dashboard-mobile-menu");
  const dashboardMenuToggle = document.querySelector("[data-dashboard-mobile-menu]");

  const setStatus = (message) => {
    if (appStatus) {
      appStatus.textContent = message;
    }
  };

  const closeProductMenus = () => {
    document.querySelectorAll("[data-product-popover]").forEach((popover) => {
      popover.hidden = true;
    });

    document.querySelectorAll("[data-dropdown-toggle]").forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
    });
  };

  const closeHomeMenu = () => {
    if (homeMenu) {
      homeMenu.hidden = true;
    }
    if (homeMenuToggle) {
      homeMenuToggle.setAttribute("aria-expanded", "false");
    }
  };

  const closeDashboardMenu = () => {
    if (dashboardMenu) {
      dashboardMenu.hidden = true;
    }
    if (dashboardMenuToggle) {
      dashboardMenuToggle.setAttribute("aria-expanded", "false");
    }
  };

  const showHome = (focusLogin = false) => {
    if (demoLoginForm) {
      demoLoginForm.reset();
    }

    if (loginConfirmation) {
      loginConfirmation.hidden = true;
    }
    if (loginFormScreen) {
      loginFormScreen.hidden = false;
    }
    if (dashboardView) {
      dashboardView.hidden = true;
    }
    if (homeView) {
      homeView.hidden = false;
    }
    if (promoBar) {
      promoBar.hidden = false;
    }

    closeProductMenus();
    closeHomeMenu();
    closeDashboardMenu();
    window.scrollTo({ top: 0, behavior: "auto" });

    if (focusLogin && demoUserId) {
      window.setTimeout(() => {
        demoUserId.focus({ preventScroll: true });
      }, 0);
    }
  };

  const showDashboard = () => {
    if (demoLoginForm) {
      demoLoginForm.reset();
    }
    if (homeView) {
      homeView.hidden = true;
    }
    if (dashboardView) {
      dashboardView.hidden = false;
    }
    if (promoBar) {
      promoBar.hidden = true;
    }

    closeProductMenus();
    closeHomeMenu();
    closeDashboardMenu();
    window.scrollTo({ top: 0, behavior: "auto" });

    if (dashboardMain) {
      dashboardMain.focus({ preventScroll: true });
    }
    setStatus("Demo dashboard opened. All displayed accounts and activity are fictional.");
  };

  if (demoLoginForm) {
    demoLoginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      demoLoginForm.reset();

      if (loginFormScreen) {
        loginFormScreen.hidden = true;
      }
      if (loginConfirmation) {
        loginConfirmation.hidden = false;
      }
      if (dashboardContinue) {
        dashboardContinue.focus({ preventScroll: true });
      }
      setStatus("Demo Login. This is an educational finance demo — no real account was accessed.");
    });
  }

  if (dashboardContinue) {
    dashboardContinue.addEventListener("click", showDashboard);
  }

  if (confirmationBack) {
    confirmationBack.addEventListener("click", () => {
      if (demoLoginForm) {
        demoLoginForm.reset();
      }
      if (loginConfirmation) {
        loginConfirmation.hidden = true;
      }
      if (loginFormScreen) {
        loginFormScreen.hidden = false;
      }
      if (demoUserId) {
        demoUserId.focus({ preventScroll: true });
      }
      setStatus("Returned to the local demo sign-in form.");
    });
  }

  document.querySelectorAll("[data-show-login]").forEach((button) => {
    button.addEventListener("click", () => showHome(true));
  });

  document.querySelectorAll("[data-focus-login]").forEach((button) => {
    button.addEventListener("click", () => showHome(true));
  });

  document.querySelectorAll("[data-focus-search]").forEach((button) => {
    button.addEventListener("click", () => {
      const homeSearch = document.querySelector("#home-search");
      if (homeSearch) {
        homeSearch.focus({ preventScroll: true });
      }
    });
  });

  document.querySelectorAll("[data-sign-out]").forEach((button) => {
    button.addEventListener("click", () => {
      showHome(true);
      setStatus("Signed out of the local demo. No information was saved.");
    });
  });

  document.querySelectorAll("[data-dropdown-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const popover = document.querySelector(`#${toggle.getAttribute("aria-controls")}`);
      const willOpen = Boolean(popover && popover.hidden);

      closeProductMenus();
      if (popover && willOpen) {
        popover.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });

  if (homeMenuToggle) {
    homeMenuToggle.addEventListener("click", () => {
      const willOpen = Boolean(homeMenu && homeMenu.hidden);
      closeHomeMenu();
      if (homeMenu && willOpen) {
        homeMenu.hidden = false;
        homeMenuToggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  if (dashboardMenuToggle) {
    dashboardMenuToggle.addEventListener("click", () => {
      const willOpen = Boolean(dashboardMenu && dashboardMenu.hidden);
      closeDashboardMenu();
      if (dashboardMenu && willOpen) {
        dashboardMenu.hidden = false;
        dashboardMenuToggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  document.querySelectorAll("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.reset();
      setStatus("Demo search is visual only and does not send a request.");
    });
  });

  document.querySelectorAll("[data-local-action]").forEach((button) => {
    button.addEventListener("click", () => {
      setStatus("This is a local, visual-only demo control.");
    });
  });

  document.querySelectorAll("[data-chat-demo]").forEach((button) => {
    button.addEventListener("click", () => {
      setStatus("Demo Support is a visual-only local interaction.");
    });
  });

  const promoClose = document.querySelector("[data-close-promo]");
  if (promoClose && promoBar) {
    promoClose.addEventListener("click", () => {
      promoBar.hidden = true;
      setStatus("Promotional bar closed.");
    });
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (!target.closest(".product-nav")) {
      closeProductMenus();
    }
    if (!target.closest("[data-mobile-menu-toggle]") && !target.closest("#mobile-site-menu")) {
      closeHomeMenu();
    }
    if (!target.closest("[data-dashboard-mobile-menu]") && !target.closest("#dashboard-mobile-menu")) {
      closeDashboardMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProductMenus();
      closeHomeMenu();
      closeDashboardMenu();
    }
  });
})();
