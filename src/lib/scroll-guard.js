export const SCROLL_GUARD = String.raw`
(function () {
  try {
    var UA = navigator.userAgent || '';
    // Instagram y Facebook, iOS y Android. IABMV aparece en el IAB de Meta.
    if (!/FBAN|FBAV|FB_IAB|FBIOS|IABMV|Instagram/i.test(UA)) return;
    if (window.__sg) return;
    window.__sg = 1;

    var LOCK_MS   = 900;    // bloqueo duro inicial
    var WINDOW_MS = 3500;   // vigilancia reactiva total
    var TOLERANCE = 4;      // px antes de considerarlo salto

    var anchorY = 0;
    var user = false;
    var locked = false;
    var t0 = Date.now();
    var html = document.documentElement;
    var body = document.body;
    var prev = {};

    // Un fragmento que tú no pusiste no debe sobrevivir.
    try {
      if (location.hash) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      history.scrollRestoration = 'manual';
    } catch (e) {}

    var GESTURES = ['touchstart','touchmove','wheel','pointerdown','mousedown','keydown'];

    function hardScroll(y) {
      var p = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, y);
      html.style.scrollBehavior = p;
    }

    function lock() {
      if (locked) return;
      locked = true;
      prev.hOverflow = html.style.overflow;
      prev.hOverscroll = html.style.overscrollBehavior;
      html.style.overflow = 'hidden';
      html.style.overscrollBehavior = 'none';
      if (body) {
        prev.bOverflow = body.style.overflow;
        body.style.overflow = 'hidden';
      }
    }

    function unlock() {
      if (!locked) return;
      locked = false;
      html.style.overflow = prev.hOverflow || '';
      html.style.overscrollBehavior = prev.hOverscroll || '';
      if (body) body.style.overflow = prev.bOverflow || '';
    }

    function correct() {
      if (user) return;
      var y = window.scrollY || window.pageYOffset || 0;
      if (Math.abs(y - anchorY) > TOLERANCE) {
        // Si el salto vino de un focus (autofill), soltar el campo o reincide.
        var ae = document.activeElement;
        if (ae && ae !== document.body && ae !== html &&
            typeof ae.blur === 'function' &&
            /INPUT|TEXTAREA|SELECT|BUTTON/.test(ae.tagName || '')) {
          try { ae.blur(); } catch (e) {}
        }
        hardScroll(anchorY);
      }
    }

    function onScroll() {
      if (user || Date.now() - t0 > WINDOW_MS) return;
      correct();
    }

    function tick() {
      if (user || Date.now() - t0 > WINDOW_MS) return;
      correct();
      requestAnimationFrame(tick);
    }

    function release() {
      if (user) return;
      user = true;
      unlock();
      GESTURES.forEach(function (ev) {
        window.removeEventListener(ev, release, true);
      });
      window.removeEventListener('scroll', onScroll, true);
    }

    GESTURES.forEach(function (ev) {
      window.addEventListener(ev, release, { capture: true, passive: true });
    });
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });

    lock();
    setTimeout(unlock, LOCK_MS);
    requestAnimationFrame(tick);

    window.addEventListener('hashchange', function () {
      if (user) return;
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch (e) {}
      hardScroll(anchorY);
    });
  } catch (e) { /* nunca romper la página */ }
})();
`;