(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const links = [...document.querySelectorAll('nav[aria-label="Primary"] a')];
  const targets = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  const update = () => {
    const offset = window.innerWidth <= 760 ? 145 : 100;
    let current = targets[0];
    for (const target of targets) if (target.getBoundingClientRect().top <= offset) current = target;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = targets[targets.length - 1];
    for (const link of links) {
      if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  let pending = false;
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(() => { update(); pending = false; }); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
