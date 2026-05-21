/* 
   Shared UI Components for Self Decoder 
   This script handles the high-tech processing overlay.
*/

window.UI = {
    injectProcessingOverlay: function() {
        if (document.getElementById('processing-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'processing-overlay';
        overlay.className = 'processing-overlay';
        overlay.innerHTML = `
            <div class="processing-loader">
                <div class="processing-bar" id="processing-bar"></div>
            </div>
            <div class="processing-text" id="processing-text">Initializing Analysis...</div>
        `;
        document.body.appendChild(overlay);
        
        // Ensure CSS is loaded
        this.injectStyles();
    },

    injectStyles: function() {
        if (document.getElementById('ui-shared-styles')) return;
        const style = document.createElement('style');
        style.id = 'ui-shared-styles';
        style.textContent = `
            .progress-container-global {
                position: sticky;
                top: 0;
                z-index: 1000;
                background: var(--dark);
                padding: 15px 0;
                margin-bottom: 30px;
                border-bottom: 1px solid rgba(0, 255, 157, 0.1);
            }
            .progress-bar-global {
                width: 100%;
                height: 6px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 3px;
                overflow: hidden;
            }
            .progress-fill-global {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, var(--primary), #00cc88);
                box-shadow: 0 0 10px var(--primary);
                transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .progress-text-global {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                font-family: 'Orbitron', sans-serif;
                font-size: 0.7rem;
                margin-bottom: -25px;
                padding-bottom: 0px;
                color: var(--primary);
                letter-spacing: 1px;
                line-height: 0.5;
            }
            .reset-btn-tiny {
                background: transparent;
                border: 1px solid rgba(255, 68, 68, 0.4);
                color: #ff4444;
                font-size: 0.55rem;
                padding: 1px 6px;
                border-radius: 4px;
                cursor: pointer;
                margin-left: 10px;
                transition: background 0.2s, color 0.2s, border-color 0.2s;
                font-family: 'Orbitron', sans-serif;
                text-transform: uppercase;
                vertical-align: middle;
                box-shadow: none !important;
                text-shadow: none !important;
            }
            .reset-btn-tiny:hover {
                background: rgba(255, 68, 68, 0.2);
                color: #ff6666;
                border-color: #ff6666;
                box-shadow: none !important;
                text-shadow: none !important;
            }

            /* Custom Modal Styles */
            .custom-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(5px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .custom-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .custom-modal {
                background: var(--darker);
                border: 1px solid var(--primary);
                padding: 30px;
                border-radius: 12px;
                max-width: 400px;
                width: 90%;
                text-align: center;
                box-shadow: 0 0 30px rgba(0, 255, 157, 0.2);
                transform: translateY(20px);
                transition: all 0.3s ease;
            }
            .custom-modal-overlay.active .custom-modal {
                transform: translateY(0);
            }
            .custom-modal h2 {
                font-family: 'Orbitron', sans-serif;
                color: var(--primary);
                font-size: 1.2rem;
                margin-top: 0;
                margin-bottom: 15px;
                border-bottom: none;
                padding-bottom: 0;
            }
            .custom-modal p {
                font-size: 0.9rem;
                color: var(--light);
                margin-bottom: 25px;
            }
            .modal-actions {
                display: flex;
                justify-content: center;
                gap: 15px;
            }
            .modal-btn {
                padding: 8px 25px;
                font-family: 'Orbitron', sans-serif;
                font-size: 0.8rem;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .btn-confirm {
                background: #ff4444;
                color: white;
                border: none;
                box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
            }
            .btn-confirm:hover {
                background: #ff6666;
                box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
                transform: translateY(-2px);
            }
            .btn-cancel {
                background: transparent;
                border: 1px solid var(--light);
                color: var(--light);
            }
            .btn-cancel:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
            }
            .btn-primary-modal {
                background: var(--primary);
                color: var(--dark);
                border: none;
                box-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
            }
            .btn-primary-modal:hover {
                background: #00cc88;
                box-shadow: 0 0 20px rgba(0, 255, 157, 0.5);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    },

    injectCustomModal: function() {
        if (document.getElementById('custom-modal-overlay')) return;
        
        const modalHTML = `
            <div id="custom-modal-overlay" class="custom-modal-overlay">
                <div class="custom-modal">
                    <h2 id="modal-title">CONFIRM ACTION</h2>
                    <p id="modal-message"></p>
                    <div class="modal-actions" id="modal-actions">
                        <button id="modal-cancel" class="modal-btn btn-cancel">CANCEL</button>
                        <button id="modal-confirm" class="modal-btn btn-confirm">CONFIRM</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    showModal: function(options) {
        this.injectCustomModal();
        const overlay = document.getElementById('custom-modal-overlay');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');
        const confirmBtn = document.getElementById('modal-confirm');
        const cancelBtn = document.getElementById('modal-cancel');

        title.textContent = options.title || 'CONFIRMATION';
        message.textContent = options.message || '';
        confirmBtn.textContent = options.confirmText || 'CONFIRM';
        cancelBtn.textContent = options.cancelText || 'CANCEL';
        
        // Reset button classes
        confirmBtn.className = 'modal-btn ' + (options.confirmClass || 'btn-confirm');
        
        overlay.classList.add('active');
        
        confirmBtn.onclick = () => {
            overlay.classList.remove('active');
            if (options.onConfirm) options.onConfirm();
        };
        
        cancelBtn.onclick = () => {
            overlay.classList.remove('active');
            if (options.onCancel) options.onCancel();
        };
    },

    initProgressBar: function(totalQuestions, testId) {
        this.injectStyles();
        this.injectCustomModal();
        if (document.querySelector('.progress-container-global')) return;
        const container = document.querySelector('.container');
        if (!container) return;

        const progressHTML = `
            <div class="progress-container-global">
                <div class="progress-text-global">
                    <span>ANALYSIS PROGRESS</span>
                    <div style="display: flex; align-items: center;">
                        <span id="progress-percent">0%</span>
                        <button onclick="UI.resetTest('${testId}')" class="reset-btn-tiny">RESET</button>
                    </div>
                </div>
                <div class="progress-bar-global">
                    <div id="progress-fill" class="progress-fill-global"></div>
                </div>
            </div>
        `;
        
        // Insert after H1
        const h1 = container.querySelector('h1');
        if (h1) {
            h1.insertAdjacentHTML('afterend', progressHTML);
        } else {
            container.insertAdjacentHTML('afterbegin', progressHTML);
        }
        
        this.totalQuestions = totalQuestions;
        this.answeredQuestions = new Set();
    },

    resetTest: function(testId) {
        this.showModal({
            title: 'RESET TEST',
            message: 'Are you sure you want to reset the test? All current progress will be lost.',
            confirmText: 'RESET',
            confirmClass: 'btn-confirm',
            onConfirm: () => {
                this.clearDraft(testId);
                this.clearOrder(testId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => location.reload(), 500);
            }
        });
    },

    updateProgress: function(questionId) {
        if (!this.totalQuestions) return;
        
        this.answeredQuestions.add(questionId);
        const percent = Math.round((this.answeredQuestions.size / this.totalQuestions) * 100);
        
        const fill = document.getElementById('progress-fill');
        const text = document.getElementById('progress-percent');
        
        if (fill) fill.style.width = percent + '%';
        if (text) text.textContent = percent + '%';
    },

    saveDraft: function(testId, data) {
        localStorage.setItem(`draft_${testId}`, JSON.stringify(data));
    },

    loadDraft: function(testId) {
        const draft = localStorage.getItem(`draft_${testId}`);
        return draft ? JSON.parse(draft) : null;
    },

    clearDraft: function(testId) {
        localStorage.removeItem(`draft_${testId}`);
    },

    saveOrder: function(testId, order) {
        localStorage.setItem(`order_${testId}`, JSON.stringify(order));
    },

    loadOrder: function(testId) {
        const order = localStorage.getItem(`order_${testId}`);
        return order ? JSON.parse(order) : null;
    },

    clearOrder: function(testId) {
        localStorage.removeItem(`order_${testId}`);
    },

    showProcessing: function(callback) {
        this.injectProcessingOverlay();
        const overlay = document.getElementById('processing-overlay');
        const bar = document.getElementById('processing-bar');
        const text = document.getElementById('processing-text');
        
        overlay.classList.add('active');
        
        const phases = [
            "Fetching cognitive nodes...",
            "Cross-referencing temperament matrices...",
            "Calibrating OCEAN coordinates...",
            "Finalizing Subject Profile..."
        ];
        
        let phase = 0;
        const phaseInterval = setInterval(() => {
            if (phase < phases.length) {
                text.textContent = phases[phase];
                phase++;
            }
        }, 350);

        setTimeout(() => {
            bar.style.width = '100%';
        }, 10);

        setTimeout(() => {
            clearInterval(phaseInterval);
            overlay.classList.remove('active');
            if (callback) callback();
        }, 1500);
    },

    createRadarChart: function(containerId, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const size = options.size || 400;
        const padding = options.padding || 60;
        const center = size / 2;
        const radius = (size / 2) - padding;
        const labels = Object.keys(data);
        const values = Object.values(data);
        const numAxes = labels.length;
        const angleStep = (Math.PI * 2) / numAxes;
        const getAxisColor = options.getAxisColor || (() => 'var(--primary)');

        let svg = `<svg viewBox="0 0 ${size} ${size}" class="radar-chart">`;
        
        // Define gradients
        svg += `
            <defs>
                <radialGradient id="radar-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style="stop-color:var(--primary);stop-opacity:0.1" />
                    <stop offset="100%" style="stop-color:var(--primary);stop-opacity:0.3" />
                </radialGradient>
            </defs>
        `;

        // Background circles/hexagons
        for (let i = 1; i <= 4; i++) {
            const r = (radius / 4) * i;
            let points = "";
            for (let j = 0; j < numAxes; j++) {
                const angle = j * angleStep - Math.PI / 2;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                points += `${x},${y} `;
            }
            svg += `<polygon points="${points}" class="radar-grid" />`;
        }

        // Axes
        labels.forEach((label, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            svg += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" class="radar-axis" />`;
            
            // Labels
            const labelDist = radius + 20;
            const lx = center + labelDist * Math.cos(angle);
            const ly = center + labelDist * Math.sin(angle);
            const anchor = lx > center ? "start" : (lx < center ? "end" : "middle");
            const color = getAxisColor(values[i], label);
            svg += `<text x="${lx}" y="${ly}" class="radar-label" text-anchor="${anchor}" style="fill: ${color}">${label}</text>`;
        });

        // Data Polygon
        let dataPoints = "";
        values.forEach((val, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = (val / 100) * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            dataPoints += `${x},${y} `;
        });
        svg += `<polygon points="${dataPoints}" class="radar-data" />`;

        // Data Points (glowy circles)
        values.forEach((val, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = (val / 100) * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            const color = getAxisColor(val, labels[i]);
            svg += `<circle cx="${x}" cy="${y}" r="4" class="radar-dot" style="fill: ${color}; filter: drop-shadow(0 0 3px ${color})" />`;
        });

        svg += `</svg>`;
        container.innerHTML = svg;
    },

    scrollToNext: function(currentElement) {
        if (!currentElement) return;
        
        // Find the next statement container
        const next = currentElement.closest('.statement').nextElementSibling;
        
        if (next && next.classList.contains('statement')) {
            setTimeout(() => {
                const headerOffset = 100; // Adjust for sticky progress bar
                const elementPosition = next.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 300); // Slight delay for visual confirmation of selection
        } else {
            // If no next question, scroll to the action button
            const button = document.querySelector('button[onclick*="calculateResults"]');
            if (button) {
                setTimeout(() => {
                    button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        }
    }
};

/**
 * DATABASE & TRACKING LOGIC (Supabase)
 */
const DB = {
    // Project Configuration
    URL: 'https://cludrudqxqqhumeixfws.supabase.co',
    KEY: 'sb_publishable_Tj_SgNjx7yRISQI1JO2gNw_OZs6Wdh4',

    // Track when the user started the current test
    startTime: Date.now(),

    /**
     * Get or create a permanent Visitor ID
     */
    getVisitorId: function() {
        let id = localStorage.getItem('sd_visitor_id');
        if (!id) {
            // Generate a random unique ID
            id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            localStorage.setItem('sd_visitor_id', id);
        }
        return id;
    },

    /**
     * Track a test result in the database
     * @param {string} testType - The type of test (e.g., 'MBTI', 'Enneagram')
     * @param {string|object} result - The primary result or personality type
     * @param {object} rawScores - The full score breakdown
     * @param {number} answeredCount - Number of questions answered
     * @param {number} totalQuestions - Total number of questions in test
     */
    trackResult: async function(testType, result, rawScores = {}, answeredCount = 0, totalQuestions = 0) {
        try {
            // 1. Calculate Time Taken
            const timeTaken = Math.round((Date.now() - this.startTime) / 1000);

            // 2. Get IP and Location Data
            let geoData = { ip: 'Unknown', city: 'Unknown', country_name: 'Unknown', latitude: null, longitude: null };
            try {
                const geoResponse = await fetch('https://ipapi.co/json/');
                if (geoResponse.ok) {
                    geoData = await geoResponse.json();
                }
            } catch (e) {
                console.warn('Geo-tracking blocked or failed:', e);
            }

            // 3. Prepare Payload
            const payload = {
                visitor_id: this.getVisitorId(),
                test_type: testType,
                result: typeof result === 'string' ? result : JSON.stringify(result),
                ip_address: geoData.ip,
                location: `${geoData.city}, ${geoData.country_name}`,
                latitude: geoData.latitude,
                longitude: geoData.longitude,
                device_info: navigator.userAgent,
                time_taken_seconds: timeTaken,
                raw_scores: rawScores,
                completion: `${answeredCount}/${totalQuestions}`
            };

            // 4. Send to Supabase via REST API
            const response = await fetch(`${this.URL}/rest/v1/test_results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.KEY,
                    'Authorization': `Bearer ${this.KEY}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`DB Error ${response.status}: ${errorText}`);
            }

            console.log(`Successfully tracked ${testType} result.`);
            return true; // Success
        } catch (error) {
            console.error('Failed to track result:', error);
            if (error.message.includes('400')) {
                alert('Database Error: Please ensure you ran the ALTER TABLE command in Supabase to add the visitor_id and time_taken_seconds columns.');
            } else {
                alert('Connection Error: Could not save to database. Check your internet or Supabase status.');
            }
            return false;
        }
    }
};

