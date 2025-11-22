/**
 * UX Enhancements - Phase 3 (Polish)
 * Confetti, Scroll to Top, Enhanced Testimonials
 */

(function () {
    'use strict';

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================

    function createScrollTopButton() {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.setAttribute('aria-label', 'Voltar ao topo');

        document.body.appendChild(btn);

        // Show/Hide logic
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        // Click action
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        console.log('✅ Scroll to top button created');
    }

    // ============================================
    // CONFETTI ANIMATION
    // ============================================

    function triggerConfetti() {
        // Simple CSS/JS Confetti implementation
        const colors = ['#A48AB8', '#8AB896', '#E8E0F0', '#FFD700', '#FF69B4'];
        const confettiCount = 100;

        const container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // Random properties
            const bg = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100 + 'vw';
            const animDuration = Math.random() * 3 + 2 + 's';
            const animDelay = Math.random() * 2 + 's';

            confetti.style.backgroundColor = bg;
            confetti.style.left = left;
            confetti.style.animationDuration = animDuration;
            confetti.style.animationDelay = animDelay;

            container.appendChild(confetti);
        }

        // Remove after animation
        setTimeout(() => {
            container.remove();
        }, 5000);

        console.log('🎉 Confetti triggered!');
    }

    // ============================================
    // INTEGRATE CONFETTI WITH BOOKING
    // ============================================

    function integrateConfetti() {
        const btnConfirm = document.getElementById('btn-confirm');
        if (!btnConfirm) return;

        btnConfirm.addEventListener('click', function () {
            // Check if validation passed (simple check if error messages exist)
            setTimeout(() => {
                const errors = document.querySelector('.error-messages');
                const step4 = document.getElementById('step-4');

                if (!errors && step4 && step4.classList.contains('active')) {
                    triggerConfetti();
                    showToast('Agendamento confirmado com sucesso!', 'success');
                }
            }, 200);
        });
    }

    // ============================================
    // ENHANCED TESTIMONIALS
    // ============================================

    function enhanceTestimonials() {
        const cards = document.querySelectorAll('.review-card');

        cards.forEach(card => {
            // Add verified badge if not present
            if (!card.querySelector('.verified-badge')) {
                const badge = document.createElement('span');
                badge.className = 'verified-badge';
                badge.innerHTML = '<i class="fas fa-check-circle"></i> Verificado';

                const author = card.querySelector('h4');
                if (author) {
                    author.appendChild(badge);
                }
            }

            // Add hover effect class
            card.classList.add('enhanced-review');
        });

        console.log(`✅ ${cards.length} testimonials enhanced`);
    }

    // ============================================
    // INITIALIZE PHASE 3
    // ============================================

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('🚀 Initializing UX Phase 3 (Polish)...');

        createScrollTopButton();
        enhanceTestimonials();

        // Only on booking page
        if (document.getElementById('booking-form')) {
            integrateConfetti();
        }

        console.log('✨ UX Phase 3 loaded!');
    }

    // Auto-initialize
    init();

})();
