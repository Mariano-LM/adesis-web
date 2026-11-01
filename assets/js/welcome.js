(() => {
  'use strict';
  const root = document.documentElement;
  const brand = document.querySelector('.brand-motion');
  const scene = document.querySelector('.welcome-scene');
  const curtain = document.querySelector('.welcome-curtain');
  const earth = scene?.querySelector('img');
  const letters = [...(brand?.querySelectorAll('.brand-letter') || [])];
  const LETTER_DURATION_MS = 600;
  const LETTER_STAGGER_MS = 150;
  const HOLD_AFTER_LETTERS_MS = 500;
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const pendingClass = 'welcome-pending';
  const inertTargets = [...document.querySelectorAll('body>header, .hero-copy>:not(h1), main>section:not(#inicio), body>footer')];
  const timers = new Set();
  const animations = [];
  let ended = false;
  let started = false;
  function later(fn, ms) {
    const id = setTimeout(() => { timers.delete(id); fn(); }, ms);
    timers.add(id);
    return id;
  }
  function finish() {
    if (ended) return;
    ended = true;
    for (const timer of timers) clearTimeout(timer);
    timers.clear();
    clearTimeout(window.__adesisWelcomeFailSafe);
    for (const animation of animations) animation.cancel();
    brand?.style.removeProperty('transform');
    root.classList.remove(pendingClass, 'welcome-ready', 'welcome-revealing');
    if (scene) scene.hidden = true;
    if (curtain) curtain.hidden = true;
    for (const target of inertTargets) target.inert = false;
    window.removeEventListener('resize', finish);
    window.removeEventListener('hashchange', finish);
    window.removeEventListener('wheel', finish);
    window.removeEventListener('touchstart', finish);
    window.removeEventListener('keydown', finish);
    window.removeEventListener('pagehide', finish);
    document.removeEventListener('visibilitychange', onVisibility);
    motionPreference.removeEventListener('change', finish);
  }
  function onVisibility() { if (document.hidden) finish(); }
  if (!root.classList.contains(pendingClass) || !brand || !scene || !curtain || letters.length !== 6 || motionPreference.matches || location.hash || !brand.animate) {
    finish();
    return;
  }
  scene.hidden = false;
  for (const target of inertTargets) target.inert = true;
  window.addEventListener('resize', finish, { once:true });
  window.addEventListener('hashchange', finish, { once:true });
  window.addEventListener('wheel', finish, { once:true, passive:true });
  window.addEventListener('touchstart', finish, { once:true, passive:true });
  window.addEventListener('keydown', finish, { once:true });
  window.addEventListener('pagehide', finish, { once:true });
  document.addEventListener('visibilitychange', onVisibility);
  motionPreference.addEventListener('change', finish, { once:true });
  function start() {
    if (ended || started) return;
    started = true;
    const final = brand.getBoundingClientRect();
    if (!final.width || !final.height) { finish(); return; }
    const top = Math.max(innerHeight*.40 - final.height/2, final.top + Math.min(100, innerHeight*.10));
    const initial = `translateY(${top-final.top}px)`;
    brand.style.transform = initial;
    root.classList.add('welcome-ready');
    const phaseStart = document.timeline.currentTime;
    const entrance = curtain.animate([{opacity:1},{opacity:0}],{
      duration:1200,easing:'ease-in-out',fill:'forwards'
    });
    if (Number.isFinite(phaseStart)) entrance.startTime = phaseStart;
    animations.push(entrance);
    entrance.finished.then(() => {
      if (ended) return;
      curtain.hidden = true;
    }).catch(finish);
    const letterAnimations = letters.map((letter,index) => {
      const animation = letter.animate([{opacity:0},{opacity:1}],{
        duration:LETTER_DURATION_MS,
        delay:index*LETTER_STAGGER_MS,
        easing:'ease-out',
        fill:'both'
      });
      if (Number.isFinite(phaseStart)) animation.startTime = phaseStart;
      animations.push(animation);
      return animation;
    });
    Promise.all(letterAnimations.map(animation => animation.finished)).then(() => {
      if (ended) return;
      later(() => {
      if (ended) return;
      const timing = { duration:2200, easing:'cubic-bezier(.22,.68,.25,1)', fill:'both' };
      const rise = brand.animate([{transform:initial},{transform:'none'}],timing);
      const fade = scene.animate([{opacity:1},{opacity:0}],timing);
      animations.push(rise,fade);
      later(() => root.classList.add('welcome-revealing'),650);
      Promise.all([rise.finished,fade.finished]).then(finish).catch(finish);
      later(finish,2600);
      },HOLD_AFTER_LETTERS_MS);
    }).catch(finish);
  }
  // Decode the welcome image before starting its visible hold. A broken or slow
  // image never blocks access to the page.
  const decode = earth?.decode ? earth.decode().catch(() => {}) : Promise.resolve();
  Promise.race([decode,new Promise(resolve => later(resolve,1000))]).then(() => {
    if (!ended) requestAnimationFrame(start);
  }).catch(finish);
  later(finish,8500);
})();
