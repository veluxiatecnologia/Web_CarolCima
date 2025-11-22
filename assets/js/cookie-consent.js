/**
 * Cookie Consent Banner - Simple Version (LGPD Compliant)
 * Carol Cima Terapia Corporal
 * 
 * Features:
 * - Simple Accept/Reject banner
 * - LGPD compliant
 * - localStorage for preferences
 * - Non-invasive bottom banner
 * - No external dependencies
 */

(function () {
    'use strict';

    const COOKIE_PREFERENCE_KEY = 'carolcima_cookie_consent';
    const COOKIE_CONSENT_VERSION = '1.0';

    // Check if user already made a choice
    function hasUserConsented() {
        const preference = localStorage.getItem(COOKIE_PREFERENCE_KEY);
        return preference !== null;
    }

    // Get user consent status
    function getUserConsent() {
        const preference = localStorage.getItem(COOKIE_PREFERENCE_KEY);
        if (!preference) return null;

        try {
            return JSON.parse(preference);
        } catch (e) {
            return null;
        }
    }

    // Save user consent
    function saveConsent(accepted) {
        const consent = {
            accepted: accepted,
            timestamp: new Date().toISOString(),
            version: COOKIE_CONSENT_VERSION
        };
        localStorage.setItem(COOKIE_PREFERENCE_KEY, JSON.stringify(consent));
    }

    // Create banner HTML
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Aviso de cookies');
        banner.setAttribute('aria-live', 'polite');

        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <p>
                        <strong>🍪 Cookies e Privacidade</strong><br>
                        Usamos cookies essenciais para melhorar sua experiência em nosso site. 
                        Ao continuar navegando, você concorda com nossa 
                        <a href="politica.html" target="_blank" rel="noopener">Política de Privacidade</a>.
                    </p>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-accept" class="cookie-btn cookie-btn-accept" aria-label="Aceitar cookies">
                        Aceitar
                    </button>
                    <button id="cookie-reject" class="cookie-btn cookie-btn-reject" aria-label="Recusar cookies opcionais">
                        Recusar
                    </button>
                </div>
            </div>
        `;

        return banner;
    }

    // Inject CSS
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #4A4A4A 0%, #2d2d2d 100%);
                color: white;
                padding: 1.5rem;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                animation: slideUp 0.4s ease-out;
                font-family: var(--font-body, 'Montserrat', sans-serif);
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .cookie-banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
                flex-wrap: wrap;
            }

            .cookie-banner-text {
                flex: 1;
                min-width: 250px;
            }

            .cookie-banner-text p {
                margin: 0;
                line-height: 1.6;
                font-size: 0.95rem;
            }

            .cookie-banner-text strong {
                font-size: 1.1rem;
                display: block;
                margin-bottom: 0.5rem;
            }

            .cookie-banner-text a {
                color: #A48AB8;
                text-decoration: underline;
                transition: color 0.3s;
            }

            .cookie-banner-text a:hover {
                color: #E8E0F0;
            }

            .cookie-banner-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .cookie-btn {
                padding: 0.75rem 2rem;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                font-size: 0.95rem;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: inherit;
                white-space: nowrap;
            }

            .cookie-btn-accept {
                background: #8AB896;
                color: white;
            }

            .cookie-btn-accept:hover {
                background: #75a382;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(138, 184, 150, 0.4);
            }

            .cookie-btn-reject {
                background: transparent;
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
            }

            .cookie-btn-reject:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.5);
            }

            .cookie-btn:focus {
                outline: 2px solid #A48AB8;
                outline-offset: 2px;
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .cookie-banner {
                    padding: 1rem;
                }

                .cookie-banner-content {
                    flex-direction: column;
                    gap: 1rem;
                }

                .cookie-banner-text {
                    text-align: center;
                }

                .cookie-banner-actions {
                    width: 100%;
                    justify-content: center;
                }

                .cookie-btn {
                    flex: 1;
                    min-width: 120px;
                }
            }

            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                .cookie-banner {
                    animation: none;
                }
            }

            /* Hide class for removal */
            .cookie-banner.hidden {
                animation: slideDown 0.3s ease-in forwards;
            }

            @keyframes slideDown {
                to {
                    transform: translateY(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Show banner
    function showBanner() {
        const banner = createBanner();
        document.body.appendChild(banner);

        // Add event listeners
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');

        acceptBtn.addEventListener('click', handleAccept);
        rejectBtn.addEventListener('click', handleReject);

        // Focus management for accessibility
        acceptBtn.focus();
    }

    // Handle accept
    function handleAccept() {
        saveConsent(true);
        hideBanner();
        console.log('✅ Cookies aceitos');
    }

    // Handle reject
    function handleReject() {
        saveConsent(false);
        hideBanner();
        console.log('❌ Cookies opcionais recusados');
    }

    // Hide banner with animation
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('hidden');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Initialize
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Check if user already consented
        if (hasUserConsented()) {
            const consent = getUserConsent();
            console.log('📊 Cookie consent:', consent.accepted ? 'Aceito' : 'Recusado');
            return;
        }

        // Inject styles
        injectStyles();

        // Show banner after a short delay (better UX)
        setTimeout(showBanner, 500);
    }

    // Expose API for external use (optional)
    window.CookieConsent = {
        hasConsented: hasUserConsented,
        getConsent: getUserConsent,
        reset: function () {
            localStorage.removeItem(COOKIE_PREFERENCE_KEY);
            location.reload();
        }
    };

    // Auto-initialize
    init();

})();
