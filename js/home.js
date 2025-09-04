// Wait for the entire page to load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // --- SETUP EVENT LISTENERS ---
    setupEventListeners();

    // --- INITIALIZE PAGE FEATURES ---
    initTypingEffect();
    initScrollReveal();
    createParticles();
    handleAuthDisplay(); // This function now correctly handles the login/dashboard button
});

/**
 * Sets up all the primary event listeners for the page.
 */
function setupEventListeners() {
    const toggleBtn = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');

    // 1. Theme toggle functionality
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            toggleBtn.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // 2. Mobile menu toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            mobileToggle.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
        });
    }

    // 3. Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (navLinks && navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    if(mobileToggle) mobileToggle.textContent = '☰';
                }
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 5. Recreate particles on window resize to ensure good layout
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createParticles, 250);
    });
}




// --- PAGE INITIALIZATION FUNCTIONS ---

/**
 * Initializes the theme based on user's saved preference in localStorage.
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const toggleBtn = document.getElementById('theme-toggle');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    } else {
        if (toggleBtn) toggleBtn.textContent = '🌙';
    }
}
// Call initTheme right away to prevent flash of wrong theme
initTheme();


/**
 * Creates a typing effect for the hero section subtitle.
 */
function initTypingEffect() {
    const subtitle = document.querySelector('.Welcome h3');
    if (!subtitle) return;
    
    const text = "Explore my clinical expertise and professional achievements";
    let index = 0;
    subtitle.textContent = '';

    function typeEffect() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 80);
        }
    }
    typeEffect();
}

/**
 * Sets up scroll-triggered animations for sections.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('section, .work-card, .skills li, .Education li, .Languages li');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Creates and animates background particles.
 */
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    container.innerHTML = '';
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 20 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}
