(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- sticky nav background ---- */
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
    });
  });

  /* ---- discography filter ---- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".disco-card");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      var type = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var show = type === "all" || card.getAttribute("data-type") === type;
        card.hidden = !show;
      });
    });
  });

  /* ---- contact modal ---- */
  var contactBtn = document.getElementById("contactTrigger");
  var contactOverlay = document.getElementById("contactModal");
  var contactClose = document.getElementById("contactClose");
  var contactForm = document.getElementById("contactForm");
  var contactSubject = document.getElementById("contactSubject");
  var contactMessage = document.getElementById("contactMessage");
  var contactCount = document.getElementById("contactCount");
  var contactLastFocused = null;

  function openContact() {
    contactLastFocused = document.activeElement;
    contactOverlay.classList.add("is-open");
    contactOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    contactSubject.focus();
  }
  function closeContact() {
    contactOverlay.classList.remove("is-open");
    contactOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (contactLastFocused) { contactLastFocused.focus(); }
  }

  if (contactBtn && contactOverlay) {
    contactBtn.addEventListener("click", openContact);
    contactClose.addEventListener("click", closeContact);
    contactOverlay.addEventListener("click", function (e) {
      if (e.target === contactOverlay) { closeContact(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && contactOverlay.classList.contains("is-open")) {
        closeContact();
      }
    });
    contactMessage.addEventListener("input", function () {
      var remaining = 500 - contactMessage.value.length;
      contactCount.textContent = remaining + " characters left";
      contactCount.classList.toggle("is-near-limit", remaining <= 40);
    });
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var subject = contactSubject.value.trim();
      var message = contactMessage.value.trim();
      var mailto = "mailto:matthew.laforte@gmail.com"
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(message);
      window.location.href = mailto;
      closeContact();
      contactForm.reset();
      contactCount.textContent = "500 characters left";
      contactCount.classList.remove("is-near-limit");
    });
  }

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
