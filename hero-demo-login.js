(() => {
  const assetBase = document.currentScript
    ? new URL(".", document.currentScript.src)
    : new URL("./", window.location.href);

  const stylesheetId = "finance-demo-hero-login-styles";

  if (!document.getElementById(stylesheetId)) {
    const stylesheet = document.createElement("link");
    stylesheet.id = stylesheetId;
    stylesheet.rel = "stylesheet";
    stylesheet.setAttribute("data-demo-allow-navigation", "");
    stylesheet.href = new URL("hero-demo-login.css", assetBase).href;
    document.head.append(stylesheet);
  }

  const mountHeroDemoLogin = () => {
    const masthead = document.getElementById("mastheadContainerModule");
    const rail = masthead?.querySelector(".masthead-children");

    if (!masthead || !rail) {
      return false;
    }

    if (rail.querySelector("#finance-demo-hero-panel")) {
      return true;
    }

    const panel = document.createElement("aside");
    panel.id = "finance-demo-hero-panel";
    panel.className = "finance-demo-hero-panel";
    panel.setAttribute("aria-label", "Local educational demo sign in");
    panel.innerHTML = `
      <section class="finance-demo-hero-card" aria-label="Demo sign in">
        <div class="finance-demo-hero-accent" aria-hidden="true"></div>
        <div class="finance-demo-hero-card-content">
          <div data-finance-demo-hero-form-screen>
            <form class="finance-demo-hero-form" novalidate autocomplete="off">
              <label for="finance-demo-hero-user-id">User ID</label>
              <input id="finance-demo-hero-user-id" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-1p-ignore="true" data-lpignore="true">
              <label for="finance-demo-hero-password">Password</label>
              <input id="finance-demo-hero-password" type="password" autocomplete="off" data-1p-ignore="true" data-lpignore="true">
              <label class="finance-demo-hero-check" for="finance-demo-hero-save-id">
                <input id="finance-demo-hero-save-id" type="checkbox">
                <span>Save demo ID</span>
              </label>
              <button class="finance-demo-hero-submit" type="submit">Log in</button>
            </form>
            <div class="finance-demo-hero-links" aria-label="Demo sign-in links">
              <button type="button" data-finance-demo-hero-inert>Forgot demo ID/password</button>
              <span aria-hidden="true">•</span>
              <button type="button" data-finance-demo-hero-inert>Security &amp; Help</button>
              <span aria-hidden="true">•</span>
              <button type="button" data-finance-demo-hero-inert>Enroll</button>
            </div>
          </div>
          <div class="finance-demo-hero-confirmation" data-finance-demo-hero-confirmation hidden>
            <p class="finance-demo-hero-kicker">Demo Login</p>
            <h2>Demo Login</h2>
            <p>This is an educational finance demo — no real account was accessed.</p>
            <button class="finance-demo-hero-submit" type="button" data-finance-demo-hero-continue>Continue to demo dashboard</button>
            <button class="finance-demo-hero-back" type="button" data-finance-demo-hero-back>Back to demo sign in</button>
          </div>
        </div>
      </section>
      <button class="finance-demo-hero-open-account" type="button" data-finance-demo-hero-inert><span aria-hidden="true">$</span> Open a Demo Account</button>`;

    rail.prepend(panel);
    masthead.classList.add("finance-demo-hero-ready");

    const form = panel.querySelector(".finance-demo-hero-form");
    const formScreen = panel.querySelector("[data-finance-demo-hero-form-screen]");
    const confirmation = panel.querySelector("[data-finance-demo-hero-confirmation]");
    const continueButton = panel.querySelector("[data-finance-demo-hero-continue]");
    const backButton = panel.querySelector("[data-finance-demo-hero-back]");
    const userId = panel.querySelector("#finance-demo-hero-user-id");

    const showForm = () => {
      form.reset();
      confirmation.hidden = true;
      formScreen.hidden = false;
      userId.focus();
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      form.reset();
      formScreen.hidden = true;
      confirmation.hidden = false;
      continueButton.focus();
    });

    panel.querySelectorAll("[data-finance-demo-hero-inert]").forEach((button) => {
      button.addEventListener("click", (event) => event.preventDefault());
    });

    continueButton.addEventListener("click", () => {
      document.dispatchEvent(new Event("finance-demo:dashboard"));
    });

    backButton.addEventListener("click", showForm);
    return true;
  };

  if (!mountHeroDemoLogin()) {
    const observer = new MutationObserver(() => {
      if (mountHeroDemoLogin()) {
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
