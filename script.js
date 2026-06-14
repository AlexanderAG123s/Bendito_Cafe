/**
 * Bendito Cafe - Main JavaScript
 * Handles navigation, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar Setup ---
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Handle scroll for navbar appearance
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init check
    
    // --- Mobile Menu Toggle ---
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between list and X
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.replace('ph-x', 'ph-list');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Form Handling ---
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic form submission simulation
            const btn = reservationForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Processing...';
            btn.disabled = true;
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.textContent = 'Reservation Confirmed!';
                btn.style.backgroundColor = '#4CAF50';
                btn.style.borderColor = '#4CAF50';
                
                // Reset form
                reservationForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // --- Newsletter Form ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            
            input.value = '';
            input.placeholder = 'Thanks for subscribing!';
            btn.innerHTML = '<i class="ph ph-check"></i>';
            btn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                input.placeholder = 'Enter your email';
                btn.innerHTML = '<i class="ph ph-paper-plane-right"></i>';
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }
});
