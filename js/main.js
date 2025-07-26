// --- H&H Custom JavaScript for Animations and Interactions (Updated) ---

document.addEventListener("DOMContentLoaded", function() {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle) {
        // Add ARIA attributes for accessibility
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-controls', 'main-nav');

        navToggle.addEventListener('click', function() {
            const isOpened = mainNav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpened);
        });
    }

    // --- Intersection Observer for Generic Fade-in Effect on Scroll ---
    const fadeSections = document.querySelectorAll('.fade-in-section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Intersection Observer for Staggered List Animation ---
    const staggeredItems = document.querySelectorAll('.project-entry, .service-feature');

    const staggeredObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply a delay based on the item's position in the list
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200 * (index % 3)); // Stagger delay resets every 3 items
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    staggeredItems.forEach(item => {
        staggeredObserver.observe(item);
    });


    // --- Automatic Copyright Year ---
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

});
