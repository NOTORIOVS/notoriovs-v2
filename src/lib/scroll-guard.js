export const SCROLL_GUARD = String.raw`
(function () {
  try {
    var UA = navigator.userAgent || '';
    // Instagram y Facebook, iOS y Android. IABMV aparece en el IAB de Meta.
    if (!/FBAN|FBAV|FB_IAB|FBIOS|IABMV|Instagram/i.test(UA)) return;
    if (window.__sg) return;
    window.__sg = 1;

    var WINDOW_MS = 3500;   // ventana de vigilancia
    var TOLERANCE = 32;     // px de holgura antes de considerarlo salto
    var user = false;
    var t0 = Date.now();
    var anchorY = 0;

    // El fragmento nunca debe sobrevivir: si aparece uno que no pusiste, se limpia.
    try {
      if (location.hash) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      history.scrollRestoration = 'manual';
    } catch (e) {}

    // Cualquier gesto real desactiva el guardián de inmediato y para siempre.
    var GESTURES = ['touchstart', 'touchmove', 'wheel', 'pointerdown', 'mousedown', 'keydown'];
    function release() {
      user = true;
      GESTURES.forEach(function (ev) {
        window.removeEventListener(ev, release, true);
      });
    }
    GESTURES.forEach(function (ev) {
      window.addEventListener(ev, release, { capture: true, passive: true });
    });

    // Reset instantáneo aunque el CSS global tenga scroll-behavior: smooth
    function hardScroll(y) {
      var el = document.documentElement;
      var prev = el.style.scrollBehavior;
      el.style.scrollBehavior = 'auto';
      window.scrollTo(0, y);
      el.style.scrollBehavior = prev;
    }

    function tick() {
      if (user) return;
      if (Date.now() - t0 > WINDOW_MS) return;

      var y = window.scrollY || window.pageYOffset || 0;
      if (Math.abs(y - anchorY) > TOLERANCE) {
        // Si el salto vino de un focus (autofill), soltar el campo o volverá a saltar.
        var ae = document.activeElement;
        if (ae && ae !== document.body && ae !== document.documentElement &&
            typeof ae.blur === 'function' &&
            /INPUT|TEXTAREA|SELECT|BUTTON/.test(ae.tagName || '')) {
          try { ae.blur(); } catch (e) {}
        }
        hardScroll(anchorY);
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Si algo reintroduce un hash durante la ventana, se limpia y se revierte.
    window.addEventListener('hashchange', function () {
      if (user) return;
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      hardScroll(anchorY);
    });
  } catch (e) { /* nunca romper la página */ }
})();
`;