(() => {
  const disabledAttribute = "data-demo-navigation-disabled";
  const navigationPattern = /(?:window\.)?location(?:\.href)?\s*=|window\.open\s*\(|router\.push\s*\(|\bnavigate\s*\(/i;

  const isNonNavigationalDestination = (value) => {
    const destination = value?.trim();
    return !destination || destination === "#" || destination.startsWith("#") || /^javascript:\s*void\s*\(/i.test(destination);
  };

  const markNavigationDisabled = (element, attribute, value) => {
    element.setAttribute(`data-demo-original-${attribute}`, value);
    element.setAttribute(disabledAttribute, "true");
  };

  const removeNavigationTarget = (element) => {
    if (!element.hasAttribute("data-demo-allow-navigation")) {
      element.removeAttribute("target");
    }
  };

  const disableAnchorNavigation = (anchor) => {
    if (!(anchor instanceof HTMLAnchorElement || anchor instanceof HTMLAreaElement)) {
      return;
    }

    removeNavigationTarget(anchor);
    if (anchor.hasAttribute(disabledAttribute)) {
      return;
    }

    const href = anchor.getAttribute("href");
    if (isNonNavigationalDestination(href) || anchor.hasAttribute("data-demo-allow-navigation")) {
      return;
    }

    markNavigationDisabled(anchor, "href", href);
    anchor.setAttribute("href", "#");
  };

  const disableDataHrefNavigation = (element) => {
    if (!(element instanceof HTMLElement) || element.hasAttribute(disabledAttribute)) {
      return;
    }

    const href = element.getAttribute("data-href");
    if (isNonNavigationalDestination(href) || element.hasAttribute("data-demo-allow-navigation")) {
      return;
    }

    markNavigationDisabled(element, "data-href", href);
    element.setAttribute("data-href", "#");
  };

  const disableClickableElementNavigation = (element) => {
    if (!(element instanceof HTMLElement) || element instanceof HTMLAnchorElement || element instanceof HTMLAreaElement || element.hasAttribute(disabledAttribute)) {
      return;
    }

    const href = element.getAttribute("href");
    if (isNonNavigationalDestination(href) || element.hasAttribute("data-demo-allow-navigation")) {
      return;
    }

    markNavigationDisabled(element, "href", href);
    element.setAttribute("href", "#");
  };

  const disableFormNavigation = (form) => {
    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    removeNavigationTarget(form);
    if (form.hasAttribute(disabledAttribute)) {
      return;
    }

    const action = form.getAttribute("action");
    if (isNonNavigationalDestination(action) || form.hasAttribute("data-demo-allow-navigation")) {
      return;
    }

    form.setAttribute("data-demo-original-action", action);
    form.setAttribute(disabledAttribute, "true");
    form.setAttribute("action", "#");
  };

  const disableNavigationalElements = (root = document) => {
    if (root instanceof HTMLAnchorElement) {
      disableAnchorNavigation(root);
    }
    if (root instanceof HTMLAreaElement) {
      disableAnchorNavigation(root);
    }
    if (root instanceof HTMLFormElement) {
      disableFormNavigation(root);
    }
    if (root instanceof HTMLElement && root.hasAttribute("data-href")) {
      disableDataHrefNavigation(root);
    }
    if (root instanceof HTMLElement && root.hasAttribute("href")) {
      disableClickableElementNavigation(root);
    }
    root.querySelectorAll?.("a[href], area[href]").forEach(disableAnchorNavigation);
    root.querySelectorAll?.("a[target], area[target], form[target]").forEach(removeNavigationTarget);
    root.querySelectorAll?.("form[action]").forEach(disableFormNavigation);
    root.querySelectorAll?.("[data-href]").forEach(disableDataHrefNavigation);
    root.querySelectorAll?.("body [href]:not(a):not(area):not(link)").forEach(disableClickableElementNavigation);
  };

  const getElement = (target) => target instanceof Element ? target : null;

  const preventDisabledLink = (event) => {
    const element = getElement(event.target);
    const disabledControl = element?.closest(`[${disabledAttribute}]`);
    if (!disabledControl) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
  };

  const preventExplicitNavigation = (event) => {
    const element = getElement(event.target);
    const control = element?.closest("[onclick]");
    if (!control || !navigationPattern.test(control.getAttribute("onclick") || "")) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
  };

  disableNavigationalElements();

  document.addEventListener("click", (event) => {
    preventDisabledLink(event);
    preventExplicitNavigation(event);
  }, true);

  document.addEventListener("auxclick", preventDisabledLink, true);

  document.addEventListener("submit", (event) => {
    const form = event.target instanceof HTMLFormElement ? event.target : null;
    if (form?.hasAttribute(disabledAttribute)) {
      event.preventDefault();
    }
  }, true);

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes" && record.target instanceof Element) {
        disableNavigationalElements(record.target);
        continue;
      }

      record.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          disableNavigationalElements(node);
        }
      });
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href", "data-href", "target", "action", "formaction"]
  });

  const disableWindowOpen = () => {
    try {
      window.open = () => null;
    } catch {
      // Browsers may prevent reassignment; click interception above still blocks links.
    }
  };

  disableWindowOpen();
  window.addEventListener("load", disableWindowOpen, { once: true });
})();
