// Page Contents nav scrollspy (mirrors original behavior).
(function () {
  const navContainer = document.getElementById('navbar');
  if (!navContainer) return;

  const headings = Array.from(document.querySelectorAll('h2[id]'));
  if (!headings.length) return;

  headings.forEach(h => {
    const a = document.createElement('a');
    a.href = '#' + h.id;
    // Clone the heading's icon (either the <i data-lucide> placeholder, if
    // Lucide hasn't rendered yet, or the rendered <svg>) into the sidebar link.
    const icon = h.querySelector('[data-lucide], svg.lucide');
    if (icon) {
      a.appendChild(icon.cloneNode(true));
      a.appendChild(document.createTextNode(' ' + h.textContent.trim()));
    } else {
      a.textContent = h.textContent.trim();
    }
    navContainer.appendChild(a);
  });

  const links = Array.from(navContainer.querySelectorAll('a'));
  window.addEventListener('scroll', () => {
    let current = headings[0].id;
    const y = window.scrollY + 120;
    for (const h of headings) {
      if (h.offsetTop <= y) current = h.id;
    }
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }, { passive: true });
})();
