// Titik masuk NusaData: perute berbasis hash.
// Rute berbentuk #/nama-halaman; setiap rute dirender oleh views.js lalu
// dipasang (grafik digambar, kontrol dihubungkan). Tanpa perute, halaman
// beranda yang tampil. Navigasi utama ditandai aktif sesuai rute.

import { ROUTES } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('main-nav');
const navToggle = document.getElementById('nav-toggle');

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : '';
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route];
  app.innerHTML = page.render();
  if (page.mount) page.mount();
  nav.querySelectorAll('a').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === route);
  });
  document.title = route === ''
    ? 'NusaData — Statistik Indonesia'
    : `NusaData — ${nav.querySelector(`[data-route="${route}"]`)?.textContent ?? route}`;
  window.scrollTo(0, 0);
}

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('hashchange', render);
render();
