// bunniico - Gothic Y2K JavaScript

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate stats counter
    animateStats();

    // Add scroll animations
    addScrollAnimations();

    // Add hover effects to project cards
    addProjectCardEffects();
});

// Show welcome message
function showMessage() {
    const messages = [
        '◇ Welcome to the void ◇',
        '◆ System initialized ◆',
        '◈ Connection established ◈',
        '⟡ Digital realm accessed ⟡',
        '✦ Y2K protocol activated ✦'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create popup element
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(26, 26, 26, 0.98);
        border: 3px solid #b19cd9;
        padding: 3rem 4rem;
        z-index: 10000;
        box-shadow: 0 0 50px rgba(177, 156, 217, 0.8);
        text-align: center;
        font-size: 1.5rem;
        color: #00ffff;
        letter-spacing: 3px;
        animation: fadeIn 0.3s ease;
    `;
    popup.textContent = randomMessage;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(popup);
    
    // Remove after 2 seconds
    setTimeout(() => {
        popup.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 300);
    }, 2000);
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('alt-theme');
    
    // Create glitch effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #b19cd9;
        z-index: 9999;
        animation: glitchFlash 0.5s ease;
        pointer-events: none;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitchFlash {
            0% { opacity: 0; }
            10% { opacity: 0.8; }
            20% { opacity: 0; }
            30% { opacity: 0.6; }
            40% { opacity: 0; }
            50% { opacity: 0.4; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        document.body.removeChild(overlay);
    }, 500);
}

// Animate stats counter
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuad = progress => 1 - (1 - progress) * (1 - progress);
        const value = Math.floor(start + (end - start) * easeOutQuad(progress));
        
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Add scroll animations
function addScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .section {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    sections.forEach(section => observer.observe(section));
}

// Add project card effects
function addProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(177, 156, 217, 0.5);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                this.removeChild(ripple);
            }, 600);
        });
    });
}

// Add parallax effect to matrix background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const matrixBg = document.querySelector('.matrix-bg');
    if (matrixBg) {
        matrixBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to tagline on load
window.addEventListener('load', function() {
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < originalText.length) {
                tagline.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});
