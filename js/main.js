// --- H&H Enhanced JavaScript for Animations and Interactions ---

class HHWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupAccessibility();
        this.initializeAnimations();
        this.setupLazyLoading();
        this.setupPerformanceOptimizations();
    }

    setupEventListeners() {
        document.addEventListener("DOMContentLoaded", () => {
            this.initializeMobileNavigation();
            this.setupFormHandling();
            this.setupScrollEffects();
            this.automaticCopyrightYear();
            this.setupImageLightbox();
            this.setupToastNotifications();
            this.setupBeforeAfterSliders(); // Slider functionality initialized here
        });

        // Handle page visibility changes for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    initializeComponents() {
        // Initialize all interactive components
        this.setupButtonEnhancements();
        this.setupImageHoverEffects();
        this.setupSmoothScrolling();
    }

    setupAccessibility() {
        // Add skip link
        this.addSkipLink();
        
        // Setup keyboard navigation
        this.setupKeyboardNavigation();
        
        // Setup ARIA attributes
        this.setupARIAAttributes();
        
        // Setup focus management
        this.setupFocusManagement();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main landmark if not exists
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
    }

    setupKeyboardNavigation() {
        // Handle escape key for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            
            // Handle tab navigation in mobile menu
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    setupARIAAttributes() {
        // Enhanced ARIA attributes for better screen reader support
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach((link, index) => {
            link.setAttribute('role', 'menuitem');
            link.setAttribute('tabindex', '0');
        });

        // Add ARIA labels to social icons
        const socialIcons = document.querySelectorAll('.social-icons a, .footer-social-icons a');
        socialIcons.forEach(icon => {
            const platform = icon.querySelector('i').className.includes('facebook') ? 'Facebook' : 'Instagram';
            icon.setAttribute('aria-label', `Visit our ${platform} page`);
        });
    }

    setupFocusManagement() {
        // Trap focus in mobile menu when open
        const mobileNav = document.getElementById('main-nav');
        const navToggle = document.getElementById('mobile-nav-toggle');

        if (navToggle && mobileNav) {
            navToggle.addEventListener('click', () => {
                const isOpen = mobileNav.classList.contains('is-open');
                if (isOpen) {
                    this.trapFocus(mobileNav);
                } else {
                    this.releaseFocus();
                }
            });
        }
    }

    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });

        firstElement.focus();
    }

    releaseFocus() {
        const navToggle = document.getElementById('mobile-nav-toggle');
        if (navToggle) {
            navToggle.focus();
        }
    }

    initializeMobileNavigation() {
        const navToggle = document.getElementById('mobile-nav-toggle');
        const mainNav = document.getElementById('main-nav');

        if (!navToggle || !mainNav) return;

        // Enhanced ARIA attributes
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-controls', 'main-nav');
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');

        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Close menu when clicking on navigation links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
                if (mainNav.classList.contains('is-open')) {
                    this.closeMobileMenu();
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && mainNav.classList.contains('is-open')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navToggle = document.getElementById('mobile-nav-toggle');
        const mainNav = document.getElementById('main-nav');
        
        const isOpened = mainNav.classList.toggle('is-open');
        navToggle.classList.toggle('active', isOpened);
        navToggle.setAttribute('aria-expanded', isOpened);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpened ? 'hidden' : '';

        // Update button text for screen readers
        navToggle.innerHTML = isOpened ? '✕' : '&#9776;';

        // Add animation class
        if (isOpened) {
            mainNav.style.display = 'flex';
            requestAnimationFrame(() => {
                mainNav.classList.add('menu-opening');
            });
        } else {
            mainNav.classList.add('menu-closing');
            setTimeout(() => {
                mainNav.style.display = 'none';
                mainNav.classList.remove('menu-closing');
            }, 300);
        }
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('mobile-nav-toggle');
        const mainNav = document.getElementById('main-nav');
        
        if (mainNav.classList.contains('is-open')) {
            mainNav.classList.remove('is-open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '&#9776;';
            document.body.style.overflow = '';
        }
    }

    setupFormHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.enhanceForm(form);
        });
    }

    enhanceForm(form) {
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        const inputs = form.querySelectorAll('input, textarea');

        // Add real-time validation
        inputs.forEach(input => {
            this.setupInputValidation(input);
        });

        // Enhanced form submission
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
                return;
            }

            // Show loading state
            if (submitButton) {
                this.setButtonLoading(submitButton, true);
            }

            // If it's the contact form, handle it specially
            if (form.id === 'contact-form') {
                e.preventDefault();
                this.handleContactFormSubmission(form);
            }
        });
    }

    setupInputValidation(input) {
        const errorElement = this.createErrorElement(input);

        input.addEventListener('blur', () => {
            this.validateInput(input, errorElement);
        });

        input.addEventListener('input', () => {
            // Clear error state while typing
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                errorElement.classList.remove('show');
            }
        });
    }

    createErrorElement(input) {
        let errorElement = input.parentNode.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            input.parentNode.appendChild(errorElement);
        }
        return errorElement;
    }

    validateInput(input, errorElement) {
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            errorMessage = `${this.getFieldName(input)} is required.`;
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(input.value) || input.value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }

        // Update UI based on validation
        if (isValid) {
            input.classList.remove('error');
            errorElement.classList.remove('show');
        } else {
            input.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }

        return isValid;
    }

    getFieldName(input) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) return label.textContent;
        
        return input.name.charAt(0).toUpperCase() + input.name.slice(1);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            const errorElement = this.createErrorElement(input);
            if (!this.validateInput(input, errorElement)) {
                isValid = false;
            }
        });

        return isValid;
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Sending...';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            button.textContent = button.dataset.originalText || 'Send Message';
        }
    }

    async handleContactFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        
        try {
            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(object)
            });

            const result = await response.json();

            if (response.ok) {
                this.showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
                
                // Hide form and show success message
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showToast('There was an error sending your message. Please try again.', 'error');
        } finally {
            this.setButtonLoading(submitButton, false);
        }
    }

    setupToastNotifications() {
        // Create toast container if it doesn't exist
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }

    showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toast.style.pointerEvents = 'auto';

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            margin-left: 10px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        closeBtn.onclick = () => this.removeToast(toast);
        toast.appendChild(closeBtn);

        container.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    }

    removeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    setupScrollEffects() {
        // Enhanced scroll observer for animations
        this.setupIntersectionObserver();
        
        // Header scroll effect
        this.setupHeaderScrollEffect();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
    }

    setupIntersectionObserver() {
        // Observer for fade-in sections
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer for staggered animations
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animated');
                    }, 150 * (index % 4));
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Apply observers
        document.querySelectorAll('.fade-in-section').forEach(section => {
            fadeObserver.observe(section);
        });

        document.querySelectorAll('.project-entry, .service-feature, .service-card, .benefit-item, .process-step').forEach(item => {
            staggerObserver.observe(item);
        });
    }

    setupHeaderScrollEffect() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update focus for accessibility
                    targetElement.focus();
                }
            });
        });
    }

    setupLazyLoading() {
        // Implement lazy loading for images
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Apply lazy loading to images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Convert existing images to lazy loading
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            if (img.src && !img.classList.contains('logo')) {
                img.dataset.src = img.src;
                img.src = this.createPlaceholderImage(img.width, img.height);
                img.classList.add('lazy-image');
                imageObserver.observe(img);
            }
        });
    }

    loadImage(img) {
        return new Promise((resolve, reject) => {
            const newImg = new Image();
            newImg.onload = () => {
                img.src = newImg.src;
                img.classList.add('loaded');
                img.classList.remove('lazy-image');
                resolve();
            };
            newImg.onerror = reject;
            newImg.src = img.dataset.src;
        });
    }

    createPlaceholderImage(width, height) {
        // Create a simple placeholder SVG
        const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f0f0f0"/>
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Loading...</text>
        </svg>`;
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }

    setupImageLightbox() {
        // Enhanced lightbox functionality
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-image');
        const closeBtn = document.querySelector('.lightbox-close');
        const imageTriggers = document.querySelectorAll('.lightbox-trigger');

        if (!modal || !modalImg) return;

        let currentZoom = 1;
        let minZoom = 1;
        let maxZoom = 4;
        let zoomStep = 0.5;
        let isDragging = false;
        let startX, startY, translateX = 0, translateY = 0;

        const resetZoom = () => {
            currentZoom = 1;
            translateX = 0;
            translateY = 0;
            this.updateImageTransform(modalImg, currentZoom, translateX, translateY);
        };

        const closeModal = () => {
            modal.style.display = 'none';
            modalImg.src = '';
            resetZoom();
            document.body.style.overflow = '';
            
            // Return focus to trigger element
            const lastFocusedElement = document.activeElement;
            if (lastFocusedElement && lastFocusedElement.classList.contains('lightbox-trigger')) {
                lastFocusedElement.focus();
            }
        };

        // Setup image triggers
        imageTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(modal, modalImg, trigger.src || trigger.href);
                trigger.dataset.lightboxIndex = index;
            });

            // Keyboard support
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openLightbox(modal, modalImg, trigger.src || trigger.href);
                }
            });
        });

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                switch (e.key) {
                    case 'Escape':
                        closeModal();
                        break;
                    case '+':
                    case '=':
                        this.zoomIn(modalImg, currentZoom, maxZoom, zoomStep, translateX, translateY);
                        break;
                    case '-':
                        this.zoomOut(modalImg, currentZoom, minZoom, zoomStep, translateX, translateY);
                        break;
                    case '0':
                        resetZoom();
                        break;
                }
            }
        });

        // Zoom controls
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                const result = this.zoomIn(modalImg, currentZoom, maxZoom, zoomStep, translateX, translateY);
                currentZoom = result.zoom;
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                const result = this.zoomOut(modalImg, currentZoom, minZoom, zoomStep, translateX, translateY);
                currentZoom = result.zoom;
                translateX = result.translateX;
                translateY = result.translateY;
            });
        }

        // Mouse drag support
        modalImg.addEventListener('mousedown', (e) => {
            if (currentZoom > 1) {
                e.preventDefault();
                isDragging = true;
                startX = e.clientX - translateX;
                startY = e.clientY - translateY;
                modalImg.style.cursor = 'grabbing';
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                translateX = e.clientX - startX;
                translateY = e.clientY - startY;
                this.updateImageTransform(modalImg, currentZoom, translateX, translateY);
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            modalImg.style.cursor = currentZoom > 1 ? 'grab' : 'default';
        });

        // Touch support for mobile
        this.setupTouchControls(modalImg, currentZoom, translateX, translateY);
    }

    openLightbox(modal, modalImg, imageSrc) {
        modal.style.display = 'flex';
        modalImg.src = imageSrc;
        document.body.style.overflow = 'hidden';
        
        // Focus management
        modal.focus();
        
        // Add loading state
        modalImg.classList.add('loading');
        modalImg.onload = () => {
            modalImg.classList.remove('loading');
        };
    }

    updateImageTransform(img, zoom, translateX, translateY) {
        img.style.transform = `scale(${zoom}) translate(${translateX}px, ${translateY}px)`;
    }

    zoomIn(img, currentZoom, maxZoom, zoomStep, translateX, translateY) {
        if (currentZoom < maxZoom) {
            const newZoom = Math.min(currentZoom + zoomStep, maxZoom);
            this.updateImageTransform(img, newZoom, translateX, translateY);
            return { zoom: newZoom, translateX, translateY };
        }
        return { zoom: currentZoom, translateX, translateY };
    }

    zoomOut(img, currentZoom, minZoom, zoomStep, translateX, translateY) {
        if (currentZoom > minZoom) {
            const newZoom = Math.max(currentZoom - zoomStep, minZoom);
            let newTranslateX = translateX;
            let newTranslateY = translateY;
            
            if (newZoom === minZoom) {
                newTranslateX = 0;
                newTranslateY = 0;
            }
            
            this.updateImageTransform(img, newZoom, newTranslateX, newTranslateY);
            return { zoom: newZoom, translateX: newTranslateX, translateY: newTranslateY };
        }
        return { zoom: currentZoom, translateX, translateY };
    }

    setupTouchControls(img, currentZoom, translateX, translateY) {
        let initialDistance = 0;
        let initialZoom = 1;
        let lastTouchTime = 0;

        img.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                // Two finger pinch
                e.preventDefault();
                initialDistance = this.getDistance(e.touches[0], e.touches[1]);
                initialZoom = currentZoom;
            } else if (e.touches.length === 1) {
                // Single finger drag
                const now = Date.now();
                if (now - lastTouchTime < 300) {
                    // Double tap to zoom
                    e.preventDefault();
                    if (currentZoom === 1) {
                        currentZoom = 2;
                    } else {
                        currentZoom = 1;
                        translateX = 0;
                        translateY = 0;
                    }
                    this.updateImageTransform(img, currentZoom, translateX, translateY);
                }
                lastTouchTime = now;
            }
        });

        img.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / initialDistance;
                currentZoom = Math.max(1, Math.min(4, initialZoom * scale));
                this.updateImageTransform(img, currentZoom, translateX, translateY);
            }
        });
    }

    getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    setupButtonEnhancements() {
        // Add ripple effect to buttons
        document.querySelectorAll('.cta-button, .card-link').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    createRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 600ms linear;
            background-color: rgba(255, 255, 255, 0.7);
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        if (!document.head.querySelector('style[data-ripple]')) {
            style.setAttribute('data-ripple', 'true');
            document.head.appendChild(style);
        }

        const existingRipple = element.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        ripple.className = 'ripple';
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupImageHoverEffects() {
        // Enhanced hover effects for portfolio and service images
        document.querySelectorAll('.portfolio-item img, .service-card img').forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });

            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    }

    setupPerformanceOptimizations() {
        // Debounce scroll events
        this.debounceScrollEvents();
        
        // Preload critical images
        this.preloadCriticalImages();
        
        // Setup connection-aware loading
        this.setupConnectionAwareLoading();
    }

    debounceScrollEvents() {
        let scrollTimeout;
        const originalScroll = window.onscroll;

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (originalScroll) originalScroll();
            }, 16); // ~60fps
        }, { passive: true });
    }

    preloadCriticalImages() {
        // Preload hero and above-the-fold images
        const criticalImages = [
            'assets/images/logo.png',
            'assets/images/housedecor.jpg',
            'assets/images/kitchenrefurbishment.jpg',
            'assets/images/bathrenovation.webp'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupConnectionAwareLoading() {
        // Adjust loading behavior based on connection speed
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Reduce animation and image quality for slow connections
                document.documentElement.classList.add('slow-connection');
                this.disableNonCriticalAnimations();
            }
        }
    }

    disableNonCriticalAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .slow-connection * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            .slow-connection .cta-button {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    automaticCopyrightYear() {
        const copyrightYearSpan = document.getElementById('copyright-year');
        if (copyrightYearSpan) {
            copyrightYearSpan.textContent = new Date().getFullYear();
        }
    }

    initializeAnimations() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            this.disableAnimations();
            return;
        }

        // Initialize scroll-triggered animations
        this.setupScrollAnimations();
        
        // Initialize hover animations
        this.setupHoverAnimations();
    }

    disableAnimations() {
        document.documentElement.classList.add('reduced-motion');
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollAnimations() {
        // Add scroll-triggered counter animations for statistics
        const stats = document.querySelectorAll('[data-count]');
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            this.animateCounter(stat, target);
        });
    }

    animateCounter(element, target) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.countUp(element, target);
                    observer.unobserve(element);
                }
            });
        });
        observer.observe(element);
    }

    countUp(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    }

    setupHoverAnimations() {
        // Add magnetic effect to buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Initializes all "before and after" image sliders on the page.
     * This method finds all elements with the class '.before-after-slider',
     * wraps the images, adds a draggable handle, and sets up the necessary
     * event listeners for mouse and touch interaction.
     */
    setupBeforeAfterSliders() {
        document.querySelectorAll('.before-after-slider').forEach(slider => {
            const beforeImage = slider.querySelector('img:first-of-type');
            const afterImage = slider.querySelector('img:last-of-type');

            if (!beforeImage || !afterImage) return;

            // Add classes for easier CSS targeting
            beforeImage.classList.add('before-image');
            afterImage.classList.add('after-image');

            // Create and append the handle for dragging
            const handle = document.createElement('div');
            handle.className = 'slider-handle';
            slider.appendChild(handle);

            // Function to move the slider handle and clip the 'before' image
            const moveSlider = (clientX) => {
                const rect = slider.getBoundingClientRect();
                let x = clientX - rect.left;
                // Clamp the position within the slider's bounds
                x = Math.max(0, Math.min(x, rect.width)); 
                const percent = (x / rect.width) * 100;

                beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
                handle.style.left = `${percent}%`;
            };

            let isDragging = false;

            // Mouse event listeners
            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.preventDefault(); // Prevent default image drag behavior
            });
            
            // Touch event listeners
            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            window.addEventListener('touchend', () => {
                isDragging = false;
            });

            window.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    moveSlider(e.clientX);
                }
            });
            
            window.addEventListener('touchmove', (e) => {
                if (isDragging && e.touches.length > 0) {
                     moveSlider(e.touches[0].clientX);
                }
            });

            // Set the initial position of the slider to the middle
            moveSlider(slider.getBoundingClientRect().left + slider.offsetWidth / 2);
        });
    }

    pauseAnimations() {
        document.documentElement.classList.add('animations-paused');
    }

    resumeAnimations() {
        document.documentElement.classList.remove('animations-paused');
    }

    closeAllModals() {
        // Close lightbox
        const lightboxModal = document.getElementById('lightbox-modal');
        if (lightboxModal && lightboxModal.style.display === 'flex') {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = '';
        }

        // Close mobile menu
        this.closeMobileMenu();
    }



    handleTabNavigation(e) {
        const mobileNav = document.getElementById('main-nav');
        if (mobileNav && mobileNav.classList.contains('is-open')) {
            const focusableElements = mobileNav.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    // Public API for external use
    showNotification(message, type = 'info') {
        this.showToast(message, type);
    }

    refreshAnimations() {
        this.setupIntersectionObserver();
    }

    updateFormValidation(formId, rules) {
        const form = document.getElementById(formId);
        if (form) {
            this.enhanceForm(form);
        }
    }
}

// Initialize the website when DOM is ready
const hhWebsite = new HHWebsite();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HHWebsite;
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
