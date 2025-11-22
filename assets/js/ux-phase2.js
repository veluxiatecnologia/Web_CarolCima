/**
 * UX Enhancements - Phase 2
 * Autofill, Recommended Slots, Dark Mode, Quick Preview
 */

(function () {
    'use strict';

    // ============================================
    // AUTOFILL SYSTEM
    // ============================================

    const STORAGE_KEY = 'carolcima_user_data';
    const EXPIRY_DAYS = 30;

    function saveUserData(name, email, phone) {
        const userData = {
            name,
            email,
            phone,
            timestamp: Date.now()
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
            console.log('✅ User data saved for autofill');
        } catch (e) {
            console.warn('Could not save user data:', e);
        }
    }

    function loadUserData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return null;

            const data = JSON.parse(saved);
            const expiryTime = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

            // Check if expired
            if (Date.now() - data.timestamp > expiryTime) {
                localStorage.removeItem(STORAGE_KEY);
                return null;
            }

            return data;
        } catch (e) {
            console.warn('Could not load user data:', e);
            return null;
        }
    }

    function showAutofillPrompt(data) {
        const firstName = data.name.split(' ')[0];

        const prompt = document.createElement('div');
        prompt.className = 'autofill-prompt';
        prompt.innerHTML = `
            <div class="autofill-content">
                <i class="fas fa-user-check"></i>
                <div class="autofill-text">
                    <strong>Olá, ${firstName}!</strong>
                    <p>Quer usar os mesmos dados do último agendamento?</p>
                </div>
                <div class="autofill-actions">
                    <button class="btn-autofill-yes">Sim, usar</button>
                    <button class="btn-autofill-no">Não, limpar</button>
                </div>
            </div>
        `;

        const step3 = document.getElementById('step-3');
        if (!step3) return;

        const form = document.getElementById('booking-form');
        if (form) {
            form.parentNode.insertBefore(prompt, form);
        }

        // Event listeners
        prompt.querySelector('.btn-autofill-yes').addEventListener('click', () => {
            fillForm(data);
            prompt.remove();
            showToast('Dados preenchidos automaticamente!', 'success');
        });

        prompt.querySelector('.btn-autofill-no').addEventListener('click', () => {
            clearForm();
            prompt.remove();
            localStorage.removeItem(STORAGE_KEY);
            showToast('Formulário limpo', 'info');
        });
    }

    function fillForm(data) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        if (nameInput) nameInput.value = data.name;
        if (emailInput) emailInput.value = data.email;
        if (phoneInput) phoneInput.value = data.phone;
    }

    function clearForm() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (phoneInput) phoneInput.value = '';
    }

    // Expose globally
    window.saveUserData = saveUserData;

    // ============================================
    // RECOMMENDED TIME SLOTS
    // ============================================

    function markRecommendedSlots() {
        const recommendations = {
            '09:00': { type: 'quiet', label: 'Tranquilo' },
            '14:00': { type: 'popular', label: 'Mais procurado' },
            '17:00': { type: 'last', label: 'Última chance' }
        };

        window.getSlotRecommendation = function (time) {
            return recommendations[time] || null;
        };

        console.log('✅ Slot recommendations ready');
    }

    // ============================================
    // QUICK TIME PREVIEW
    // ============================================

    function createQuickSlotsPreview() {
        const timeSlotsContainer = document.getElementById('time-slots');
        if (!timeSlotsContainer) return;

        // Create quick preview sidebar
        const quickPreview = document.createElement('div');
        quickPreview.className = 'quick-slots-preview';
        quickPreview.innerHTML = `
            <h4>Próximos horários disponíveis:</h4>
            <div class="quick-slots-list" id="quick-slots-list">
                <p style="color: #999;">Carregando...</p>
            </div>
        `;

        const calendarWrapper = document.querySelector('.calendar-wrapper');
        if (calendarWrapper && calendarWrapper.parentNode) {
            calendarWrapper.parentNode.insertBefore(quickPreview, calendarWrapper.nextSibling);
        }

        // Generate quick slots
        generateQuickSlots();

        console.log('✅ Quick slots preview created');
    }

    function generateQuickSlots() {
        const quickSlotsList = document.getElementById('quick-slots-list');
        if (!quickSlotsList) return;

        // Mock upcoming slots (in production, fetch from API)
        const upcomingSlots = [
            { date: 'Hoje', time: '15:30', dateObj: new Date() },
            { date: 'Amanhã', time: '10:00', dateObj: new Date(Date.now() + 86400000) },
            { date: 'Dom 24/11', time: '14:00', dateObj: new Date(Date.now() + 2 * 86400000) }
        ];

        quickSlotsList.innerHTML = upcomingSlots.map(slot => `
            <div class="quick-slot" data-date="${slot.dateObj.toISOString()}">
                <i class="far fa-clock"></i>
                <div>
                    <strong>${slot.date}</strong>
                    <span>${slot.time}</span>
                </div>
            </div>
        `).join('');

        // Add click handlers
        quickSlotsList.querySelectorAll('.quick-slot').forEach(slot => {
            slot.addEventListener('click', function () {
                const dateStr = this.dataset.date;
                // TODO: Trigger calendar date selection
                showToast('Horário selecionado! Confirme no calendário.', 'info');
            });
        });
    }

    // ============================================
    // DARK MODE
    // ============================================

    function initDarkMode() {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedPreference = localStorage.getItem('carolcima_dark_mode');

        // Apply saved preference or system preference
        if (savedPreference === 'true' || (savedPreference === null && prefersDark)) {
            document.body.classList.add('dark-mode');
        }

        // Create toggle button
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.setAttribute('aria-label', 'Alternar modo escuro');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';

        toggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('carolcima_dark_mode', isDark);

            // Update icon
            toggle.innerHTML = isDark
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';

            showToast(isDark ? 'Modo escuro ativado' : 'Modo claro ativado', 'info');
        });

        document.body.appendChild(toggle);

        // Update icon based on current state
        if (document.body.classList.contains('dark-mode')) {
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        console.log('✅ Dark mode initialized');
    }

    // ============================================
    // TIME OF DAY GREETING
    // ============================================

    function addTimeBasedGreeting() {
        const hero = document.querySelector('.hero-content h1');
        if (!hero) return;

        const hour = new Date().getHours();
        let greeting = '';

        if (hour >= 5 && hour < 12) {
            greeting = 'Bom dia!';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Boa tarde!';
        } else {
            greeting = 'Boa noite!';
        }

        const greetingSpan = document.createElement('span');
        greetingSpan.className = 'time-greeting';
        greetingSpan.textContent = greeting;

        hero.insertBefore(greetingSpan, hero.firstChild);
        hero.insertBefore(document.createElement('br'), hero.children[1]);

        console.log(`✅ Greeting added: ${greeting}`);
    }

    // ============================================
    // ENHANCED CONFIRMATION
    // ============================================

    function enhanceConfirmation() {
        const btnConfirm = document.getElementById('btn-confirm');
        if (!btnConfirm) return;

        // Store original handler
        const originalHandler = btnConfirm.onclick;

        btnConfirm.addEventListener('click', function (e) {
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();

            // If validation passes, save data
            if (name && email && phone) {
                // Small delay to ensure validation passed
                setTimeout(() => {
                    if (!document.querySelector('.error-messages')) {
                        saveUserData(name, email, phone);
                    }
                }, 100);
            }
        });

        console.log('✅ Confirmation enhanced');
    }

    // ============================================
    // INTEGRATE WITH STEP NAVIGATION
    // ============================================

    function integrateWithSteps() {
        // Override goToStep to show autofill prompt
        const originalGoToStep = window.goToStep;

        if (typeof originalGoToStep === 'function') {
            window.goToStep = function (step) {
                // Call original
                originalGoToStep.call(this, step);

                // Show autofill prompt when reaching step 3
                if (step === 3) {
                    const savedData = loadUserData();
                    if (savedData) {
                        setTimeout(() => showAutofillPrompt(savedData), 500);
                    }
                }
            };
        }

        console.log('✅ Integrated with step navigation');
    }

    // ============================================
    // INITIALIZE PHASE 2
    // ============================================

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('🚀 Initializing UX Phase 2 enhancements...');

        // Initialize dark mode
        initDarkMode();

        // Add time-based greeting (homepage only)
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            addTimeBasedGreeting();
        }

        // Booking page specific enhancements
        if (document.getElementById('step-1')) {
            markRecommendedSlots();
            createQuickSlotsPreview();
            enhanceConfirmation();

            // Small delay to ensure schedule.js is loaded
            setTimeout(integrateWithSteps, 200);
        }

        console.log('✨ UX Phase 2 enhancements loaded successfully!');
    }

    // Auto-initialize
    init();

})();
