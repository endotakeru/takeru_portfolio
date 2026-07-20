/* =========================================================================
   Animation orchestration
   - Splits the hero heading into per-word spans for the staggered blur-in.
   - Triggers on-load reveals (nav, hero) once the first frame paints.
   - Reveals below-the-fold elements as they scroll into view.
   ========================================================================= */
(function () {
  "use strict";

  /* ---- 1. Split the hero heading into animatable words ---------------- */
  function splitHeading() {
    var h1 = document.querySelector(".hero h1[data-split]");
    if (!h1) return;

    var words = h1.textContent.trim().split(/\s+/);
    h1.textContent = "";

    words.forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "word";
      span.style.setProperty("--i", i);
      span.textContent = word;
      h1.appendChild(span);
      // keep natural spacing between inline-block words
      if (i < words.length - 1) {
        h1.appendChild(document.createTextNode(" "));
      }
    });
  }

  /* ---- 2. Kick off the load animation sequence ------------------------ */
  function runLoadSequence() {
    // double rAF so the initial (hidden) styles are committed first,
    // then the transition to the visible state actually animates.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add("is-loaded");
      });
    });
  }

  /* ---- 3. Reveal-on-scroll for below-the-fold content ----------------- */
  function setupScrollReveal() {
    var targets = document.querySelectorAll(".reveal.on-scroll");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold 0 = reveal as soon as the element enters the (slightly
      // shrunk) viewport. A non-zero threshold breaks elements taller than
      // ~8 viewports, whose max intersection ratio can never reach it, so
      // they'd stay hidden forever. The -8% bottom margin keeps a small
      // "wait until it's a bit on-screen" feel.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- 4. Project type filter ----------------------------------------- */
  /* Pill buttons toggle which cards show, by their data-type. "all" shows
     everything; the project count reflects what's currently visible. */
  function setupProjectFilters() {
    var bar = document.querySelector(".project-filters");
    if (!bar) return;

    var buttons = bar.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".project-card[data-type]");
    var count = document.querySelector(".projects .section-head .count");

    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }

    function apply(filter) {
      var visible = 0;
      cards.forEach(function (card) {
        var show = filter === "all" || card.getAttribute("data-type") === filter;
        card.classList.toggle("is-hidden", !show);
        if (show) visible++;
      });
      if (count) count.textContent = pad(visible);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        apply(btn.getAttribute("data-filter"));
      });
    });

    // reflect the initial (All) state in the count
    apply("all");
  }

  /* ---- init ----------------------------------------------------------- */
  function init() {
    splitHeading();
    setupScrollReveal();
    setupProjectFilters();
    runLoadSequence();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
