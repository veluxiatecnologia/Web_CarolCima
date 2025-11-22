// ========================================
// SCHEDULE.JS - Enhanced Version
// Carol Cima Terapia Corporal
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const bookingData = {
        service: null,
        price: null,
        date: null,
        time: null,
        name: null,
        email: null,
        phone: null
    };

    // DOM Elements
    const steps = {
        1: document.getElementById('step-1'),
        2: document.getElementById('step-2'),
        3: document.getElementById('step-3'),
        4: document.getElementById('step-4')
    };
    const indicators = document.querySelectorAll('.step-indicator');

    // Navigation Buttons
    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnBack2 = document.getElementById('btn-back-2');
    const btnBack3 = document.getElementById('btn-back-3');
    const btnConfirm = document.getElementById('btn-confirm');

    // ========================================
    // STEP 1: Service Selection
    // ========================================
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from others
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            // Add to current
            option.classList.add('selected');
            // Update data
            bookingData.service = option.dataset.service;
            bookingData.price = option.dataset.price;
            // Enable next button
            btnNext1.disabled = false;
        });
    });

    btnNext1.addEventListener('click', () => goToStep(2));

    // ========================================
    // STEP 2: Date & Time
    // ========================================
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthEl = document.getElementById('current-month');
    const timeSlotsContainer = document.getElementById('time-slots');

    // Calendar Generation
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function renderCalendar(month, year) {
        currentMonthEl.textContent = `${monthNames[month]} ${year}`;
        calendarGrid.innerHTML = '';

        // Headers
        const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        daysOfWeek.forEach(day => {
            const el = document.createElement('div');
            el.className = 'calendar-day-header';
            el.textContent = day;
            calendarGrid.appendChild(el);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = i;

            // Disable past days
            const dayDate = new Date(year, month, i);
            if (dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                dayEl.classList.add('disabled');
            } else {
                dayEl.addEventListener('click', () => selectDate(i, month, year, dayEl));
            }

            calendarGrid.appendChild(dayEl);
        }
    }

    function selectDate(day, month, year, el) {
        // Visual selection
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        el.classList.add('selected');

        bookingData.date = `${day}/${month + 1}/${year}`;

        // Generate Time Slots (with enhanced availability logic)
        renderTimeSlots(day, month, year);
    }

    /**
     * Enhanced time slot rendering with better mock availability
     * TODO: Replace with real API call in production
     */
    function renderTimeSlots(day, month, year) {
        timeSlotsContainer.innerHTML = '<p style="color: #999; text-align: center;">Carregando horários...</p>';

        // Simulate API delay
        setTimeout(() => {
            const slots = ['09:00', '10:30', '14:00', '15:30', '17:00'];
            timeSlotsContainer.innerHTML = '';

            // Better mock logic: weekends have fewer slots, Wednesdays are busier
            const selectedDate = new Date(year, month, day);
            const dayOfWeek = selectedDate.getDay();
            const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
            const isWednesday = (dayOfWeek === 3);

            slots.forEach(time => {
                const slotEl = document.createElement('div');
                slotEl.className = 'time-slot';
                slotEl.textContent = time;

                // Improved availability logic
                let isAvailable = true;

                if (isWeekend && (time === '09:00' || time === '17:00')) {
                    isAvailable = false; // Weekends don't have early/late slots
                } else if (isWednesday && Math.random() > 0.5) {
                    isAvailable = false; // Wednesdays are busier
                } else if (Math.random() > 0.75) {
                    isAvailable = false; // 25% chance of being booked
                }

                if (!isAvailable) {
                    slotEl.style.opacity = '0.5';
                    slotEl.style.cursor = 'not-allowed';
                    slotEl.style.background = '#f0f0f0';
                    slotEl.title = 'Horário indisponível';
                } else {
                    slotEl.addEventListener('click', () => {
                        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                        slotEl.classList.add('selected');
                        bookingData.time = time;
                        btnNext2.disabled = false;
                    });
                }

                timeSlotsContainer.appendChild(slotEl);
            });
        }, 500);
    }

    renderCalendar(currentMonth, currentYear);

    btnNext2.addEventListener('click', () => {
        updateSummary();
        goToStep(3);
    });
    btnBack2.addEventListener('click', () => goToStep(1));

    // ========================================
    // STEP 3: Details with Enhanced Validation
    // ========================================

    // Phone mask
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            }

            e.target.value = value;
        });
    }

    function updateSummary() {
        document.getElementById('summary-service').textContent = bookingData.service;
        document.getElementById('summary-date').textContent = bookingData.date;
        document.getElementById('summary-time').textContent = bookingData.time;
        document.getElementById('summary-price').textContent = bookingData.price;
    }

    /**
     * Enhanced form validation with regex and visual feedback
     */
    btnConfirm.addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        // Clear previous errors
        clearErrors();

        const errors = [];

        // Validate name (minimum 3 characters, at least 2 words)
        if (!name || name.length < 3) {
            errors.push({ field: 'name', message: 'Por favor, insira seu nome completo.' });
        } else if (name.split(' ').length < 2) {
            errors.push({ field: 'name', message: 'Por favor, insira nome e sobrenome.' });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push({ field: 'email', message: 'Por favor, insira um e-mail válido.' });
        }

        // Validate phone (Brazilian format)
        const phoneDigits = phone.replace(/\D/g, '');
        if (!phone || phoneDigits.length < 10 || phoneDigits.length > 11) {
            errors.push({ field: 'phone', message: 'Por favor, insira um telefone válido com DDD.' });
        }

        // Show errors or proceed
        if (errors.length > 0) {
            showErrorMessages(errors);
            return;
        }

        // All valid - proceed
        bookingData.name = name;
        bookingData.email = email;
        bookingData.phone = phone;

        document.getElementById('success-name').textContent = name.split(' ')[0]; // First name only
        document.getElementById('success-service').textContent = bookingData.service;

        // Optional: Send to WhatsApp
        sendWhatsAppConfirmation();

        goToStep(4);
    });

    function clearErrors() {
        // Remove error messages
        const existingError = document.querySelector('.error-messages');
        if (existingError) {
            existingError.remove();
        }

        // Remove error classes from inputs
        document.querySelectorAll('.form-group input').forEach(input => {
            input.classList.remove('error');
        });
    }

    function showErrorMessages(errors) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-messages';
        errorContainer.innerHTML = `
            <strong><i class="fas fa-exclamation-circle"></i> Por favor, corrija os seguintes erros:</strong>
            <ul>
                ${errors.map(err => `<li>${err.message}</li>`).join('')}
            </ul>
        `;

        // Add error class to fields
        errors.forEach(err => {
            const input = document.getElementById(err.field);
            if (input) {
                input.classList.add('error');
            }
        });

        // Insert before form
        const form = document.getElementById('booking-form');
        form.parentNode.insertBefore(errorContainer, form);

        // Scroll to error
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Send booking confirmation via WhatsApp
     */
    function sendWhatsAppConfirmation() {
        const message = encodeURIComponent(
            `Olá! Gostaria de agendar:\n\n` +
            `📋 *Serviço:* ${bookingData.service}\n` +
            `📅 *Data:* ${bookingData.date}\n` +
            `🕐 *Horário:* ${bookingData.time}\n` +
            `💰 *Valor:* R$ ${bookingData.price}\n\n` +
            `👤 *Nome:* ${bookingData.name}\n` +
            `📧 *Email:* ${bookingData.email}\n` +
            `📱 *Telefone:* ${bookingData.phone}`
        );

        const whatsappNumber = '5511999999999'; // Update with real number
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Open in new tab after a short delay
        setTimeout(() => {
            window.open(whatsappLink, '_blank', 'noopener,noreferrer');
        }, 1500);
    }

    btnBack3.addEventListener('click', () => goToStep(2));

    // ========================================
    // HELPER: Go To Step
    // ========================================
    function goToStep(step) {
        // Hide all
        Object.values(steps).forEach(el => el.classList.remove('active'));
        // Show target
        steps[step].classList.add('active');

        // Update indicators
        indicators.forEach(ind => {
            const s = parseInt(ind.dataset.step);
            if (s === step) {
                ind.classList.add('active');
                ind.classList.remove('completed');
            } else if (s < step) {
                ind.classList.remove('active');
                ind.classList.add('completed');
            } else {
                ind.classList.remove('active', 'completed');
            }
        });

        currentStep = step;

        // Scroll to top of step
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
