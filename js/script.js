/**
 * Script.js
 * Portfolio of Fatim Zahrae Tijani
 * Features: Mobile Menu, Scroll Spy, Header Effects, Anime.js Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Header scroll effect ---
    const siteHeader = document.getElementById('site-header');
    
    function updateHeaderOnScroll() {
        if (!siteHeader) return;
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
    updateHeaderOnScroll();


    // --- 2. Mobile Navigation Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu on nav link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }


    // --- 3. Active Link ScrollSpy ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
    highlightNavOnScroll();


    // --- 4. Entrance & Scroll Reveal Animations (Anime.js) ---
    if (typeof anime !== 'undefined') {
        // Hero entrance animation
        anime({
            targets: [
                '.profile-frame',
                '.location-badge',
                '.hero-name',
                '.hero-role',
                '.hero-academic',
                '.hero-description',
                '.cta-buttons .btn'
            ],
            translateY: [24, 0],
            opacity: [0, 1],
            duration: 900,
            delay: anime.stagger(120, { start: 200 }),
            easing: 'easeOutCubic'
        });

        // Scroll observer for cards and sections
        const revealElements = document.querySelectorAll(`
            .section-header,
            .about-card,
            .skill-category-card,
            .featured-project-card,
            .project-card,
            .education-card,
            .feature-panel,
            .contact-tile
        `);

        // Set initial state for intersection observer
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20px 0px',
            threshold: 0.05
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        translateY: [24, 0],
                        opacity: [0, 1],
                        duration: 700,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }
});
