// Load Lucide icons from CDN and render all <i data-lucide="..."> tags.
(function () {
  var s = document.createElement('script');
  s.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.js';
  s.async = false;
  s.onload = function () { if (window.lucide) window.lucide.createIcons(); };
  document.head.appendChild(s);
})();
