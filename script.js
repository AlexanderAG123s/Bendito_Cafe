/**
 * Bendito Cafe - Advanced JavaScript
 * Handles navigation, premium animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar Setup & Glassmorphism ---
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    const handleScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init check
    
    // --- Mobile Menu Toggle ---
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
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
            if(icon) icon.classList.replace('ph-x', 'ph-list');
        });
    });

    // --- Advanced Scroll Animations (Staggered Reveals) ---
    // We group elements by section to apply staggered delays naturally
    const sections = document.querySelectorAll('section');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all reveal elements inside this section
                const reveals = entry.target.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
                
                reveals.forEach((el, index) => {
                    // Add staggered delay if not explicitly set
                    if (!el.style.transitionDelay && !el.classList.contains('active')) {
                        el.style.transitionDelay = `${index * 0.15}s`;
                    }
                    // Small timeout ensures browser registers the delay before adding active class
                    setTimeout(() => {
                        el.classList.add('active');
                    }, 50);
                });
                
                // Add active to the section itself if it's a reveal element
                if (entry.target.classList.contains('reveal-up') || entry.target.classList.contains('reveal-left') || entry.target.classList.contains('reveal-right')) {
                    entry.target.classList.add('active');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    sections.forEach(sec => {
        revealObserver.observe(sec);
    });

    // Also observe standalone reveal elements outside main sections (like footer)
    const standaloneReveals = document.querySelectorAll('footer .reveal-up');
    standaloneReveals.forEach(el => revealObserver.observe(el));

    // --- Form Handling ---
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reservationForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Processing...';
            btn.disabled = true;
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.innerHTML = 'Confirmed <i class="ph ph-check-circle"></i>';
                btn.style.backgroundColor = '#4CAF50';
                btn.style.borderColor = '#4CAF50';
                btn.style.color = 'white';
                
                reservationForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
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
    
    // --- Magnetic Button Effect (Optional subtle interaction) ---
    const primaryBtns = document.querySelectorAll('.btn-primary');
    primaryBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            // Subtle movement
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseout', function() {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.innerText;
                const isK = text.includes('k');
                const isPlus = text.includes('+');
                const isPercent = text.includes('%');
                
                const targetNumber = parseInt(text.replace(/[^0-9]/g, ''));
                let currentNumber = 0;
                const duration = 2000;
                const increment = targetNumber / (duration / 16);
                
                const updateCounter = () => {
                    currentNumber += increment;
                    if (currentNumber < targetNumber) {
                        target.innerText = Math.ceil(currentNumber) + (isK ? 'k' : '') + (isPlus ? '+' : '') + (isPercent ? '%' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.innerText = text;
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, revealOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
