(() => {
  const assetBase = document.currentScript
    ? new URL(".", document.currentScript.src)
    : new URL("./", window.location.href);

  const stylesheetId = "finance-demo-styles";
  if (!document.getElementById(stylesheetId)) {
    const stylesheet = document.createElement("link");
    stylesheet.id = stylesheetId;
    stylesheet.rel = "stylesheet";
    stylesheet.setAttribute("data-demo-allow-navigation", "");
    stylesheet.href = new URL("demo-login.css", assetBase).href;
    document.head.append(stylesheet);
  }

  if (document.getElementById("finance-demo-overlay")) {
    return;
  }

  const icon = (name) => {
    const icons = {
      transfer: "⇄",
      bills: "▤",
      send: "↗",
      deposit: "▣",
      more: "•••",
      menu: "☰",
      profile: "●",
      search: "⌕",
      chat: "◌"
    };
    return `<span class="finance-demo-icon" aria-hidden="true">${icons[name]}</span>`;
  };

  const root = document.createElement("section");
  root.id = "finance-demo-overlay";
  root.className = "finance-demo-overlay";
  root.hidden = true;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Northstar Finance educational demo");
  root.innerHTML = `
    <div class="finance-demo-screen finance-demo-login-screen" data-finance-screen="login">
      <div class="finance-demo-login-backdrop">
        <main class="finance-demo-login-wrap">
          <div class="finance-demo-brand finance-demo-brand--login" aria-label="Northstar Finance Demo">
            <span class="finance-demo-brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
            <span>Northstar Finance</span>
          </div>
          <p class="finance-demo-mode-label">Educational demo mode · no account access</p>
          <section class="finance-demo-login-panel" aria-labelledby="finance-demo-login-title">
            <div class="finance-demo-panel-accent" aria-hidden="true"></div>
            <div class="finance-demo-login-panel-content">
              <h1 id="finance-demo-login-title">Demo sign in</h1>
              <p class="finance-demo-login-copy">Any text will open the fictional demo dashboard. Nothing entered here is saved or sent.</p>
              <form class="finance-demo-login-form" novalidate autocomplete="off">
                <label for="finance-demo-user-id">User ID</label>
                <input id="finance-demo-user-id" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-1p-ignore="true" data-lpignore="true">
                <label for="finance-demo-password">Password</label>
                <input id="finance-demo-password" type="password" autocomplete="off" data-1p-ignore="true" data-lpignore="true">
                <label class="finance-demo-check-row" for="finance-demo-save-id">
                  <input id="finance-demo-save-id" type="checkbox">
                  <span>Save user ID</span>
                </label>
                <button class="finance-demo-login-submit" type="submit">Log in</button>
              </form>
              <div class="finance-demo-login-links" aria-label="Demo account links">
                <button type="button" data-finance-inert>Forgot user ID/password</button>
                <button type="button" data-finance-inert>Security &amp; Help</button>
                <button type="button" data-finance-inert>Enroll</button>
              </div>
            </div>
          </section>
          <p class="finance-demo-privacy-note">Fictional interface and fictional data only. Do not enter real credentials.</p>
        </main>
      </div>
    </div>

    <div class="finance-demo-screen finance-demo-dashboard-screen" data-finance-screen="dashboard" hidden>
      <div class="finance-demo-dashboard">
        <header class="finance-demo-dashboard-header">
          <div class="finance-demo-mobile-header">
            <button class="finance-demo-mobile-control" type="button" data-finance-menu-toggle aria-expanded="false" aria-controls="finance-demo-mobile-menu">${icon("menu")}<span>Menu</span></button>
            <div class="finance-demo-brand" aria-label="Northstar Finance Demo">
              <span class="finance-demo-brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
              <span>Northstar</span>
            </div>
            <button class="finance-demo-mobile-control" type="button" data-finance-inert>${icon("profile")}<span>Profile</span></button>
          </div>
          <div class="finance-demo-topbar">
            <div class="finance-demo-brand" aria-label="Northstar Finance Demo">
              <span class="finance-demo-brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
              <span>Northstar Finance</span>
            </div>
            <button class="finance-demo-personal" type="button" data-finance-inert>Personal <span aria-hidden="true">⌄</span></button>
            <label class="finance-demo-search">
              <span class="finance-demo-search-label">Search demo</span>
              <input type="search" placeholder="Search the demo" autocomplete="off">
              ${icon("search")}
            </label>
            <div class="finance-demo-user-actions">
              <button type="button" data-finance-inert>Welcome, Demo User <span aria-hidden="true">⌄</span></button>
              <button type="button" data-finance-inert>Profile &amp; Settings</button>
              <button type="button" data-finance-signout>Sign Out</button>
            </div>
          </div>
          <nav class="finance-demo-secondary-nav" aria-label="Demo dashboard navigation">
            <button class="is-active" type="button" data-finance-inert>Accounts</button>
            <button type="button" data-finance-inert>Pay &amp; Transfer</button>
            <button type="button" data-finance-inert>Rewards &amp; Deals</button>
            <button type="button" data-finance-inert>Tools &amp; Investing</button>
            <button type="button" data-finance-inert>Security Center</button>
            <button type="button" data-finance-inert>Open an Account</button>
            <button type="button" data-finance-inert>Help &amp; Support</button>
          </nav>
          <nav id="finance-demo-mobile-menu" class="finance-demo-mobile-menu" aria-label="Demo dashboard mobile navigation" hidden>
            <button type="button" data-finance-inert>Accounts</button>
            <button type="button" data-finance-inert>Pay &amp; Transfer</button>
            <button type="button" data-finance-inert>Rewards &amp; Deals</button>
            <button type="button" data-finance-inert>Tools &amp; Investing</button>
            <button type="button" data-finance-inert>Security Center</button>
            <button type="button" data-finance-inert>Help &amp; Support</button>
            <button type="button" data-finance-signout>Sign Out</button>
          </nav>
        </header>

        <main class="finance-demo-main" tabindex="-1">
          <section class="finance-demo-column finance-demo-column--accounts" aria-labelledby="finance-demo-accounts-title">
            <article class="finance-demo-card finance-demo-accounts-card">
              <div class="finance-demo-card-heading"><h1 id="finance-demo-accounts-title">Accounts</h1><span aria-hidden="true">ⓘ</span></div>
              <div class="finance-demo-account-group">
                <h2>Banking Accounts</h2>
                <div class="finance-demo-account-row">
                  <span class="finance-demo-account-symbol finance-demo-account-symbol--checking" aria-hidden="true">C</span>
                  <div><strong>Demo Checking</strong><b>$5,482.21</b><small>Available Balance</small></div>
                  <button type="button" data-finance-inert aria-label="Demo Checking options">⋮</button>
                </div>
                <div class="finance-demo-account-row">
                  <span class="finance-demo-account-symbol finance-demo-account-symbol--savings" aria-hidden="true">S</span>
                  <div><strong>Demo Savings</strong><b>$12,856.37</b><small>Available Balance</small></div>
                  <button type="button" data-finance-inert aria-label="Demo Savings options">⋮</button>
                </div>
              </div>
              <div class="finance-demo-account-group">
                <h2>Credit Cards</h2>
                <div class="finance-demo-account-row">
                  <span class="finance-demo-card-art finance-demo-card-art--rewards" aria-hidden="true"></span>
                  <div><strong>Demo Rewards Card</strong><b>$1,245.32</b><small>Current Balance</small></div>
                  <button type="button" data-finance-inert aria-label="Demo Rewards Card options">⋮</button>
                </div>
                <div class="finance-demo-account-row">
                  <span class="finance-demo-card-art finance-demo-card-art--travel" aria-hidden="true"></span>
                  <div><strong>Demo Travel Card</strong><b>$0.00</b><small>Current Balance</small></div>
                  <button type="button" data-finance-inert aria-label="Demo Travel Card options">⋮</button>
                </div>
              </div>
            </article>
          </section>

          <section class="finance-demo-column finance-demo-column--activity" aria-label="Demo account activity">
            <article class="finance-demo-card">
              <div class="finance-demo-card-heading"><h2>Quick Actions</h2></div>
              <div class="finance-demo-quick-actions">
                <button type="button" data-finance-inert>${icon("transfer")}<span>Transfer</span></button>
                <button type="button" data-finance-inert>${icon("bills")}<span>Pay Bills</span></button>
                <button type="button" data-finance-inert>${icon("send")}<span>Send Money</span></button>
                <button type="button" data-finance-inert>${icon("deposit")}<span>Deposit Checks</span></button>
                <button type="button" data-finance-inert>${icon("more")}<span>More</span></button>
              </div>
            </article>
            <article class="finance-demo-card finance-demo-spending-card">
              <div class="finance-demo-card-heading"><h2>Spending &amp; Budgeting</h2><span aria-hidden="true">ⓘ</span></div>
              <div class="finance-demo-spending-content">
                <div class="finance-demo-spending-total"><b>$3,158.48</b><span>Fictional monthly spending</span><button type="button" data-finance-inert>View spending</button></div>
                <svg class="finance-demo-donut" viewBox="0 0 42 42" role="img" aria-label="Fictional spending chart">
                  <circle class="finance-demo-donut-base" cx="21" cy="21" r="15.9"></circle>
                  <circle class="finance-demo-donut-segment finance-demo-donut-segment--housing" cx="21" cy="21" r="15.9" pathLength="100" stroke-dasharray="42 58" stroke-dashoffset="25"></circle>
                  <circle class="finance-demo-donut-segment finance-demo-donut-segment--food" cx="21" cy="21" r="15.9" pathLength="100" stroke-dasharray="26 74" stroke-dashoffset="-18"></circle>
                  <circle class="finance-demo-donut-segment finance-demo-donut-segment--travel" cx="21" cy="21" r="15.9" pathLength="100" stroke-dasharray="18 82" stroke-dashoffset="-44"></circle>
                  <circle class="finance-demo-donut-segment finance-demo-donut-segment--other" cx="21" cy="21" r="15.9" pathLength="100" stroke-dasharray="14 86" stroke-dashoffset="-62"></circle>
                </svg>
                <ul class="finance-demo-chart-legend">
                  <li><i class="legend-housing"></i><span>Housing</span><b>$1,450</b></li>
                  <li><i class="legend-food"></i><span>Food &amp; dining</span><b>$520</b></li>
                  <li><i class="legend-travel"></i><span>Transportation</span><b>$680</b></li>
                  <li><i class="legend-other"></i><span>Other</span><b>$508</b></li>
                </ul>
              </div>
            </article>
            <article class="finance-demo-card finance-demo-transactions-card">
              <div class="finance-demo-card-heading"><h2>Recent Transactions</h2><button type="button" data-finance-inert>View all</button></div>
              <ul class="finance-demo-transactions">
                <li><span class="finance-demo-transaction-icon">☕</span><div><strong>Coffee Shop</strong><small>Today · Fictional purchase</small></div><b>-$5.45</b></li>
                <li><span class="finance-demo-transaction-icon">G</span><div><strong>Grocery Store</strong><small>Yesterday · Fictional purchase</small></div><b>-$87.23</b></li>
                <li><span class="finance-demo-transaction-icon">F</span><div><strong>Fuel</strong><small>May 24 · Fictional purchase</small></div><b>-$45.00</b></li>
                <li><span class="finance-demo-transaction-icon">⇣</span><div><strong>Direct Deposit - Demo Employer</strong><small>May 23 · Fictional deposit</small></div><b class="is-credit">+$2,350.00</b></li>
              </ul>
            </article>
          </section>

          <aside class="finance-demo-column finance-demo-column--support" aria-label="Demo help and offers">
            <article class="finance-demo-card finance-demo-help-card">
              <div class="finance-demo-card-heading"><h2>Have a Question?</h2></div>
              <p><strong>Demo Support is here to help.</strong></p>
              <p>Explore this fictional finance experience with no real account access.</p>
              <button class="finance-demo-primary-action" type="button" data-finance-chat>${icon("chat")}Chat Demo</button>
              <p class="finance-demo-status" aria-live="polite"></p>
            </article>
            <article class="finance-demo-card finance-demo-security-card">
              <div class="finance-demo-card-heading"><h2>Security Center</h2></div>
              <p>Review your demo security settings.</p>
              <button class="finance-demo-text-action" type="button" data-finance-inert>Review demo settings</button>
            </article>
            <article class="finance-demo-card finance-demo-offers-card">
              <div class="finance-demo-card-heading"><h2>Offers &amp; Demo</h2></div>
              <div class="finance-demo-offer finance-demo-offer--cash"><span>Cash</span><div><strong>Demo Cash Rewards</strong><p>Fictional rewards offer for educational use.</p><button type="button" data-finance-inert>Explore demo</button></div></div>
              <div class="finance-demo-offer finance-demo-offer--travel"><span>Travel</span><div><strong>Demo Travel Rewards</strong><p>Fictional travel benefits and insights.</p><button type="button" data-finance-inert>Explore demo</button></div></div>
            </article>
          </aside>
        </main>
      </div>
    </div>`;

  document.body.append(root);

  const loginScreen = root.querySelector('[data-finance-screen="login"]');
  const dashboardScreen = root.querySelector('[data-finance-screen="dashboard"]');
  const loginForm = root.querySelector(".finance-demo-login-form");
  const dashboardMain = root.querySelector(".finance-demo-main");
  const dashboardMenu = root.querySelector("#finance-demo-mobile-menu");
  const dashboardMenuToggle = root.querySelector("[data-finance-menu-toggle]");
  const demoStatus = root.querySelector(".finance-demo-status");
  const homepage = document.querySelector('[data-sparta-container="homepage"]');

  const setHomepageInert = (isInert) => {
    if (homepage) {
      homepage.inert = isInert;
    }
  };

  const showLogin = () => {
    loginForm.reset();
    setHomepageInert(true);
    root.hidden = false;
    loginScreen.hidden = false;
    dashboardScreen.hidden = true;
    dashboardMenu.hidden = true;
    dashboardMenuToggle.setAttribute("aria-expanded", "false");
    root.scrollTop = 0;
    window.setTimeout(() => root.querySelector("#finance-demo-user-id")?.focus(), 0);
  };

  const showDashboard = () => {
    loginForm.reset();
    setHomepageInert(true);
    root.hidden = false;
    loginScreen.hidden = true;
    dashboardScreen.hidden = false;
    dashboardMenu.hidden = true;
    dashboardMenuToggle.setAttribute("aria-expanded", "false");
    demoStatus.textContent = "";
    root.scrollTop = 0;
    dashboardMain.focus();
  };

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showDashboard();
  });

  root.querySelectorAll("[data-finance-signout]").forEach((button) => {
    button.addEventListener("click", showLogin);
  });

  root.querySelectorAll("[data-finance-inert]").forEach((button) => {
    button.addEventListener("click", (event) => event.preventDefault());
  });

  root.querySelector("[data-finance-chat]").addEventListener("click", () => {
    demoStatus.textContent = "Demo chat is a local visual-only interaction.";
  });

  dashboardMenuToggle.addEventListener("click", () => {
    const willOpen = dashboardMenu.hidden;
    dashboardMenu.hidden = !willOpen;
    dashboardMenuToggle.setAttribute("aria-expanded", String(willOpen));
  });

  const openDemoLogin = () => showLogin();
  document.addEventListener("finance-demo:open", openDemoLogin);
  document.addEventListener("finance-demo:dashboard", showDashboard);
  document.querySelectorAll(".mobile-login-button").forEach((button) => {
    button.addEventListener("click", openDemoLogin);
  });
})();
