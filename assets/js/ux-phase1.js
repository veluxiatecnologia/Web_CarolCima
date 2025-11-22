/**
 * UX Enhancements JavaScript - Phase 1
 * WhatsApp Float, Toast Notifications, Progress Tracking
 */

(function () {
    'use strict';

    // ============================================
    // WHATSAPP FLOATING BUTTON
    // ============================================

    function createWhatsAppButton() {
        const whatsappNumber = '5511999999999'; // TODO: Atualizar com número real

        const button = document.createElement('a');
        button.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de mais informações sobre os serviços.')}`;
        button.className = 'whatsapp-float';
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.setAttribute('aria-label', 'Falar no WhatsApp');

        button.innerHTML = `
            <i class="fab fa-whatsapp"></i>
            <span>Fale Conosco</span>
        `;

        document.body.appendChild(button);

        console.log('✅ WhatsApp button criado');
    }

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================

    window.showToast = function (message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✓',
            info: 'ℹ',
            error: '✕'
        };

        toast.innerHTML = `
            <div class="icon">${icons[type] || icons.info}</div>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.add('show');
            });
        });

        // Remove after 3s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ============================================
    // PROGRESS INDICATOR ENHANCEMENT
    // ============================================

    function enhanceProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;

        // Add progress fill bar
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressBar.insertBefore(progressFill, progressBar.firstChild);

        // Add progress text
        const progressText = document.createElement('div');
        progressText.className = 'progress-text';
        progressBar.appendChild(progressText);

        // Function to update progress
        window.updateProgress = function (step) {
            const totalSteps = 3;
            const percentage = Math.round((step / totalSteps) * 100);
            const stepIndicators = progressBar.querySelectorAll('.step-indicator');

            // Calculate width between indicators
            if (stepIndicators.length > 0) {
                const firstIndicator = stepIndicators[0];
                const lastIndicator = stepIndicators[stepIndicators.length - 2]; // Exclude success step
                const totalWidth = lastIndicator.offsetLeft - firstIndicator.offsetLeft;
                const fillWidth = (totalWidth / (totalSteps - 1)) * (step - 1);
                progressFill.style.width = `${fillWidth}px`;
            }

            // Update text
            if (step <= totalSteps) {
                progressText.innerHTML = `
                    Passo <span class="step-number">${step}</span> de ${totalSteps} • ${percentage}% completo
                `;
            } else {
                progressText.innerHTML = `✓ Agendamento completo!`;
            }
        };

        console.log('✅ Progress bar enhanced');
    }

    // ============================================
    // SERVICE CARDS ENHANCEMENT
    // ============================================

    function enhanceServiceCards() {
        const serviceOptions = document.querySelectorAll('.service-option');

        serviceOptions.forEach(option => {
            option.addEventListener('click', function () {
                // Toast feedback
                const serviceName = this.dataset.service;
                showToast(`${serviceName} selecionado!`, 'success');
            });
        });

        console.log(`✅ ${serviceOptions.length} service cards enhanced`);
    }

    // ============================================
    // BOOKING SUMMARY STICKY
    // ============================================

    function createBookingSummary(bookingData) {
        // Remove existing summary
        const existing = document.querySelector('.booking-summary-sticky');
        if (existing) existing.remove();

        if (!bookingData.service) return;

        const summary = document.createElement('div');
        summary.className = 'booking-summary-sticky';
        summary.innerHTML = `
            <div class="summary-card">
                <div class="icon">💆‍♀️</div>
                <div>
                    <strong>${bookingData.service}</strong>
                    <span>R$ ${bookingData.price} • 60 min</span>
                </div>
            </div>
        `;

        // Insert at top of step 2
        const step2 = document.getElementById('step-2');
        if (step2) {
            const firstChild = step2.querySelector('h2');
            if (firstChild) {
                firstChild.after(summary);
            }
        }

        console.log('✅ Booking summary created');
    }

    // Expose globally
    window.createBookingSummary = createBookingSummary;

    // ============================================
    // CALENDAR AVAILABILITY INDICATORS
    // ============================================

    function enhanceCalendar() {
        // This will be called by schedule.js when rendering calendar
        window.markDayAvailability = function (dayElement, hasSlots) {
            if (hasSlots) {
                dayElement.classList.add('has-slots');
                dayElement.title = 'Horários disponíveis';
            } else {
                dayElement.classList.add('no-slots');
                dayElement.title = 'Sem horários disponíveis';
            }
        };

        console.log('✅ Calendar availability markers ready');
    }

    // ============================================
    // ENHANCED BUTTON STATES
    // ============================================

    function enhanceButtons() {
        // Add loading state to  buttons
        const buttons = document.querySelectorAll('.btn-primary');

        buttons.forEach(btn => {
            const originalClick = btn.onclick;

            btn.addEventListener('click', function (e) {
                // Skip if disabled
                if (this.disabled) return;

                // Add loading class briefly
                this.classList.add('loading');

                setTimeout(() => {
                    this.classList.remove('loading');
                }, 500);
            });
        });

        console.log(`✅ ${buttons.length} buttons enhanced`);
    }

    // ============================================
    // INTEGRATION WITH EXISTING SCHEDULE.JS
    // ============================================

    function integrateWithScheduleFlow() {
        // Enhance existing step transitions
        const originalGoToStep = window.goToStep;

        if (typeof originalGoToStep === 'function') {
            window.goToStep = function (step) {
                // Call original function
                originalGoToStep.call(this, step);

                // Update progress
                if (typeof window.updateProgress === 'function') {
                    window.updateProgress(step);
                }

                // Show toast for step change
                const stepNames = {
                    1: 'Escolha de Serviço',
                    2: 'Data e Horário',
                    3: 'Seus Dados',
                    4: 'Confirmação'
                };

                if (step <= 3) {
                    showToast(`Avançando para: ${stepNames[step]}`, 'info');
                }
            };
        }

        console.log('✅ Integrated with schedule flow');
    }

    // ============================================
    // INITIALIZE
    // ============================================

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('🚀 Initializing UX Phase 1 enhancements...');

        // Create WhatsApp button
        createWhatsAppButton();

        // Enhance progress bar (only on booking page)
        if (document.querySelector('.progress-bar')) {
            enhanceProgressBar();
            enhanceCalendar();

            // Set initial progress
            setTimeout(() => {
                if (typeof window.updateProgress === 'function') {
                    window.updateProgress(1);
                }
            }, 500);
        }

        // Enhance service cards
        enhanceServiceCards();

        // Enhance buttons
        enhanceButtons();

        // Integrate with existing schedule flow
        // Small delay to ensure schedule.js is loaded
        setTimeout(integrateWithScheduleFlow, 100);

        console.log('✨ UX Phase 1 enhancements loaded successfully!');
    }

    // Auto-initialize
    init();

})();
