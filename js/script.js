// script.js: builds the side "Page Contents" list from the page's h2 headings
// and highlights the section currently in view.

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById('navbar');
    const headers = document.querySelectorAll('h2');
    if (!navbar || !headers.length) return;

    headers.forEach(header => {
        const link = document.createElement('a');
        link.href = `#${header.id}`;
        link.textContent = header.textContent.trim();
        navbar.appendChild(link);
    });

    const navLinks = navbar.querySelectorAll('a');
    let activeIndex = -1;

    function updateActiveLink() {
        let index = headers.length;

        while (--index && window.scrollY + 300 < headers[index].offsetTop) {}

        // On short pages the last sections never reach the trigger line,
        // so the bottom of the page counts as the last section.
        const doc = document.documentElement;
        if (window.scrollY > 0 && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
            index = headers.length - 1;
        }

        if (index === activeIndex) return;
        if (navLinks[activeIndex]) navLinks[activeIndex].classList.remove('active');
        if (navLinks[index]) navLinks[index].classList.add('active');
        activeIndex = index;
    }

    // A page has only a handful of headings, so updating on every scroll event is cheap.
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
    if (document.fonts) document.fonts.ready.then(updateActiveLink);
    updateActiveLink();
});
