/**
 * Accessible Animations
 * Carol Cima Terapia Corporal
 * 
 * Features:
 * - Scroll-triggered animations
 * - Respects prefers-reduced-motion
 * - Intersection Observer API
 * - Smooth, performant animations
 */

(function () {
    'use strict';

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation configuration
    const config = {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };

    // Initialize Intersection Observer
    function initScrollAnimations() {
        // If user prefers reduced motion, skip animations
        if (prefersReducedMotion) {
            console.log('⚡ Animações desabilitadas (prefers-reduced-motion)');
            // Make all elements immediately visible
            document.querySelectorAll('[data-animate]').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        // Create observer
        const observer = new IntersectionObserver(handleIntersection, config);

        // Observe all elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    // Handle intersection
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation delay if specified
                const delay = entry.target.dataset.animateDelay || 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                // Unobserve after animation (performance)
                observer.unobserve(entry.target);
            }
        });
    }

    // Add hover effects to interactive elements
    function initHoverEffects() {
        if (prefersReducedMotion) return;

        // Enhanced button hovers
        document.querySelectorAll('.btn, button').forEach(btn => {
            if (!btn.classList.contains('no-hover')) {
                btn.classList.add('hover-lift');
            }
        });

        // Card hover effects
        document.querySelectorAll('.service-card, .review-card').forEach(card => {
            if (!card.classList.contains('no-hover')) {
                card.classList.add('hover-scale');
            }
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                e.preventDefault();

                // Smooth scroll behavior
                targetElement.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }

                // Focus management for accessibility
                targetElement.focus({ preventScroll: true });
            });
        });
    }

    // Loading animation for async operations
    function showLoading(element) {
        if (!element) return;

        element.classList.add('loading');
        element.setAttribute('aria-busy', 'true');

        // Optionally add spinner
        if (!element.querySelector('.spinner')) {
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            spinner.setAttribute('role', 'status');
            spinner.setAttribute('aria-label', 'Carregando');
            element.appendChild(spinner);
        }
    }

    function hideLoading(element) {
        if (!element) return;

        element.classList.remove('loading');
        element.removeAttribute('aria-busy');

        const spinner = element.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    // Fade in page on load
    function initPageTransition() {
        if (prefersReducedMotion) {
            document.body.classList.add('loaded');
            return;
        }

        // Fade in body
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // Initialize all animations
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initPageTransition();
        initScrollAnimations();
        initHoverEffects();
        initSmoothScroll();

        console.log('✨ Animações inicializadas');
    }

    // Expose API
    window.Animations = {
        showLoading,
        hideLoading,
        prefersReducedMotion
    };

    // Auto-initialize
    init();

})();
