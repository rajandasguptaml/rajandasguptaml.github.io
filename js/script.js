// script.js

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById('navbar');
    const headers = document.querySelectorAll('h2');
    if (!navbar || !headers.length) return;

    // Dynamically populate the navbar
    headers.forEach(header => {
        const link = document.createElement('a');
        link.href = `#${header.id}`;

        const icon = header.querySelector('[data-lucide], svg.lucide');
        if (icon) {
            link.appendChild(icon.cloneNode(true));
            link.appendChild(document.createTextNode(' ' + header.textContent.trim()));
        } else {
            link.textContent = header.textContent;
        }

        navbar.appendChild(link);
    });

    // Function to update the active link based on scroll position
    function updateActiveLink() {
        let index = headers.length;

        while (--index && window.scrollY + 300 < headers[index].offsetTop) {}

        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();  // Initialize the active link on page load
});
