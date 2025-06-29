// Typing Animation
class TypingAnimation {
    constructor(element, texts, speed = 100, pause = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.pause = pause;
        this.currentTextIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const fullText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.currentText = this.currentText.slice(0, -1);
        } else {
            this.currentText = fullText.slice(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let timeout = this.isDeleting ? this.speed / 2 : this.speed;

        if (!this.isDeleting && this.currentText === fullText) {
            timeout = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), timeout);
    }
}

// Matrix Background
class MatrixBackground {
    constructor() {
        this.container = document.getElementById('matrix-bg');
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.columns = Math.floor(window.innerWidth / 20);
        this.drops = [];
        this.init();
    }

    init() {
        this.createColumns();
        this.animate();
    }

    createColumns() {
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
            this.createDrop(i);
        }
    }

    createDrop(columnIndex) {
        const drop = document.createElement('div');
        drop.className = 'matrix-char';
        drop.textContent = this.chars[Math.floor(Math.random() * this.chars.length)];
        drop.style.left = `${columnIndex * 20}px`;
        drop.style.animationDuration = `${2 + Math.random() * 3}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        
        this.container.appendChild(drop);
        
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, 5000);
    }

    animate() {
        setInterval(() => {
            for (let i = 0; i < this.columns; i++) {
                if (Math.random() > 0.98) {
                    this.createDrop(i);
                }
            }
        }, 100);
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.init();
    }

    init() {
        this.createParticles();
    }

    createParticles() {
        setInterval(() => {
            this.createParticle();
        }, 500);
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        if (Math.random() > 0.7) {
            particle.style.background = '#00ff41';
        }
        
        this.container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
}

// Navigation
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleSmoothScroll();
    }

    handleScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    handleMobileMenu() {
        this.mobileMenuBtn.addEventListener('click', () => {
            this.navMenu.style.display = this.navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    handleSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.skillsSection = document.getElementById('skills');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.isVisible = false;
        this.init();
    }

    init() {
        this.observeSection();
    }

    observeSection() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isVisible) {
                    this.isVisible = true;
                    this.animateSkills();
                }
            });
        }, { threshold: 0.3 });

        if (this.skillsSection) {
            observer.observe(this.skillsSection);
        }
    }

    animateSkills() {
        this.skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.setProperty('--width', `${width}%`);
            bar.classList.add('animate');
        });
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.statusDiv = document.getElementById('form-status');
        this.submitBtn = document.getElementById('submit-btn');
        this.submitText = document.getElementById('submit-text');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        this.setLoading(true);
        this.clearStatus();

        try {
            // Replace with your actual form submission endpoint
            // Example: Formspree, Netlify Forms, or your own backend
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                this.showStatus('success', 'Message transmitted successfully!', 'Response expected within 24 hours.');
                this.form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showStatus('error', 'Transmission failed. Please try again.', 'Or contact directly via email.');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.submitBtn.disabled = loading;
        this.submitText.textContent = loading ? 'Transmitting...' : 'Execute Transmission';
    }

    showStatus(type, title, message) {
        const iconSvg = type === 'success' 
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

        this.statusDiv.innerHTML = `
            <div class="status-message status-${type}">
                ${iconSvg}
                <div>
                    <div class="font-semibold">${title}</div>
                    <div class="text-sm">${message}</div>
                </div>
            </div>
        `;
    }

    

    clearStatus() {
        this.statusDiv.innerHTML = '';
    }
}

// Resume Download
class ResumeDownload {
    constructor() {
        this.downloadBtn = document.getElementById('download-resume');
        this.init();
    }

    init() {
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.handleDownload());
        }
    }

    handleDownload() {
        // Replace this URL with your actual resume link
        const resumeUrl = 'https://your-resume-link.com/resume.pdf';
        window.open(resumeUrl, '_blank');
    }
}

// Contact Button
class ContactButton {
    constructor() {
        this.contactBtn = document.getElementById('contact-btn');
        this.init();
    }

    init() {
        if (this.contactBtn) {
            this.contactBtn.addEventListener('click', () => this.scrollToContact());
        }
    }

    scrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const typingTexts = [
            'Cyber Threat Intelligence Analyst',
            'Security+ Certified Professional',
            'IoT Security Researcher',
            'Python Automation Enthusiast'
        ];
        new TypingAnimation(typingElement, typingTexts);
    }

    // Initialize other components
    new MatrixBackground();
    new ParticleSystem();
    new Navigation();
    new SkillsAnimation();
    new ContactForm();
    new ResumeDownload();
    new ContactButton();

    // Handle window resize for matrix background
    window.addEventListener('resize', () => {
        // Reinitialize matrix background on resize
        const matrixContainer = document.getElementById('matrix-bg');
        if (matrixContainer) {
            matrixContainer.innerHTML = '';
            new MatrixBackground();
        }
    });
});

// Utility function for smooth scrolling
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Export for potential external use
window.PortfolioUtils = {
    smoothScrollTo,
    TypingAnimation,
    MatrixBackground,
    ParticleSystem
};