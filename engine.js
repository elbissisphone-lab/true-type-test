/**
 * True Type Test Adaptive Typology Engine
 * Handles probability matrix, exclusion pruning, and information gain selection.
 */

import { 
    SYSTEMS, MBTI_TYPES, ENNEAGRAM_TYPES, SOCIONICS_TYPES, 
    EXCLUSION_MATRIX, CONFIDENCE_THRESHOLD, DAMPING_FACTOR, MBTI_STACKS
} from './constants.js';

export class UserSession {
    constructor() {
        this.answeredIds = new Set();
        this.probabilities = {
            [SYSTEMS.MBTI]: this._initDist(MBTI_TYPES),
            [SYSTEMS.ENNEAGRAM]: this._initDist(ENNEAGRAM_TYPES),
            [SYSTEMS.SOCIONICS]: this._initDist(SOCIONICS_TYPES)
        };
        this.functions = { Te: 0.5, Ti: 0.5, Fe: 0.5, Fi: 0.5, Ne: 0.5, Ni: 0.5, Se: 0.5, Si: 0.5 };
        this.certainty = 0;
    }

    _initDist(types) {
        if (!Array.isArray(types) || types.length === 0) return {};
        const initialProb = 1 / types.length;
        const dist = {};
        types.forEach(t => dist[t] = initialProb);
        return dist;
    }

    /**
     * Recalculate Probability Matrix
     * answer: -2 (Totally Disagree) to +2 (Totally Agree)
     */
    update(question, answer) {
        if (!question) return;
        this.answeredIds.add(question.id);
        const weightFactor = (typeof answer === 'number') ? answer / 2 : 0; // Normalize to -1.0 to 1.0

        // 1. Update Cognitive Functions (MBTI Core)
        if (question.weights && question.weights.mbti) {
            for (const [func, weight] of Object.entries(question.weights.mbti)) {
                if (this.functions[func] !== undefined) {
                    this.functions[func] += weight * weightFactor * DAMPING_FACTOR;
                    this.functions[func] = Math.max(0, Math.min(1, this.functions[func]));
                }
            }
        }

        // 2. Map Functions to MBTI Types
        this._mapFunctionsToMBTI();

        // 3. Update Enneagram and Socionics Distributions
        if (question.weights) {
            this._updateDirectWeights(SYSTEMS.ENNEAGRAM, question.weights.enneagram, weightFactor);
            this._updateDirectWeights(SYSTEMS.SOCIONICS, question.weights.socionics, weightFactor);
        }

        // 4. Apply Systemic Constraints (Hard Pruning)
        this._applyExclusions();

        // 5. Re-normalize all distributions
        this._normalizeAll();

        // 6. Calculate aggregate certainty
        this._calculateCertainty();
    }

    _updateDirectWeights(system, weights, factor) {
        if (!weights || !this.probabilities[system]) return;
        for (const [type, weight] of Object.entries(weights)) {
            if (this.probabilities[system][type] !== undefined) {
                const newVal = this.probabilities[system][type] * (1 + weight * factor * DAMPING_FACTOR);
                this.probabilities[system][type] = Math.max(0.0001, newVal); // Prevent zeroing out
            }
        }
    }

    _mapFunctionsToMBTI() {
        for (const [type, stack] of Object.entries(MBTI_STACKS)) {
            // Formula: Weighted average of function scores in stack
            let score = (this.functions[stack[0]] * 1.0) +
                        (this.functions[stack[1]] * 0.8) +
                        (this.functions[stack[2]] * 0.6) +
                        (this.functions[stack[3]] * 0.4);
            
            if (isNaN(score)) score = 0;
            this.probabilities[SYSTEMS.MBTI][type] = score;
        }
    }

    _applyExclusions() {
        // Find high-confidence types (>40% relative within system)
        const highConfidence = [];
        [SYSTEMS.MBTI, SYSTEMS.ENNEAGRAM, SYSTEMS.SOCIONICS].forEach(system => {
            const sorted = Object.entries(this.probabilities[system]).sort((a, b) => b[1] - a[1]);
            if (sorted.length > 0 && sorted[0][1] > 0.4) {
                highConfidence.push(sorted[0][0]);
            }
        });

        highConfidence.forEach(type => {
            const forbidden = EXCLUSION_MATRIX[type];
            if (forbidden) {
                Object.entries(forbidden).forEach(([targetSystem, forbiddenTypes]) => {
                    if (this.probabilities[targetSystem]) {
                        forbiddenTypes.forEach(t => {
                            if (this.probabilities[targetSystem][t] !== undefined) {
                                this.probabilities[targetSystem][t] *= 0.1; // Soft prune (90% reduction)
                            }
                        });
                    }
                });
            }
        });
    }

    _normalizeAll() {
        [SYSTEMS.MBTI, SYSTEMS.ENNEAGRAM, SYSTEMS.SOCIONICS].forEach(system => {
            const values = Object.values(this.probabilities[system]);
            const total = values.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);
            
            if (total > 0) {
                Object.keys(this.probabilities[system]).forEach(type => {
                    this.probabilities[system][type] = (this.probabilities[system][type] || 0) / total;
                });
            } else {
                // Reset to uniform distribution if total is zero
                const types = Object.keys(this.probabilities[system]);
                const uniform = 1 / types.length;
                types.forEach(t => this.probabilities[system][t] = uniform);
            }
        });
    }

    _calculateCertainty() {
        const getCertainty = (system) => {
            const values = Object.values(this.probabilities[system]);
            if (values.length === 0) return 0;
            const max = Math.max(...values);
            return isNaN(max) ? 0 : max;
        };

        const certs = [
            getCertainty(SYSTEMS.MBTI),
            getCertainty(SYSTEMS.ENNEAGRAM),
            getCertainty(SYSTEMS.SOCIONICS)
        ];
        this.certainty = certs.reduce((a, b) => a + b, 0) / 3;
    }

    /**
     * SHANNON ENTROPY
     * H(X) = -sum(p(x) * log2(p(x)))
     */
    _getEntropy(system) {
        return Object.values(this.probabilities[system]).reduce((acc, p) => {
            return p > 0 ? acc - (p * Math.log2(p)) : acc;
        }, 0);
    }

    isThresholdReached() {
        if (this.certainty >= CONFIDENCE_THRESHOLD) return true;
        
        // Relative Margin Exit: If top type is 3x more likely than second type
        for (const system of [SYSTEMS.MBTI, SYSTEMS.ENNEAGRAM, SYSTEMS.SOCIONICS]) {
            const sorted = Object.values(this.probabilities[system]).sort((a, b) => b - a);
            if (sorted.length >= 2 && sorted[0] > sorted[1] * 4 && sorted[0] > 0.5) {
                return true;
            }
        }
        return false;
    }

    getResults() {
        const getTop = (system) => Object.entries(this.probabilities[system]).sort((a, b) => b[1] - a[1])[0];
        return {
            [SYSTEMS.MBTI]: getTop(SYSTEMS.MBTI),
            [SYSTEMS.ENNEAGRAM]: getTop(SYSTEMS.ENNEAGRAM),
            [SYSTEMS.SOCIONICS]: getTop(SYSTEMS.SOCIONICS),
            certainty: this.certainty
        };
    }
}

/**
 * ENTROPY-BASED INFORMATION GAIN
 * Selects the question that minimizes the "Expected Entropy" of the system.
 */
export function getNextQuestion(session, pool) {
    const available = pool.filter(q => !session.answeredIds.has(q.id));
    if (available.length === 0) return null;

    let bestQ = null;
    let maxGain = -Infinity;

    // To keep it fast, we only sample a subset of questions if the pool is huge
    const sample = available.length > 20 ? available.sort(() => 0.5 - Math.random()).slice(0, 20) : available;

    sample.forEach(q => {
        let expectedEntropy = 0;
        const possibleAnswers = [-2, -1, 0, 1, 2];
        
        // Calculate Expected Information Gain (EIG)
        // EIG = CurrentEntropy - Sum( p(answer) * Entropy(System | answer) )
        // We simplify by assuming each answer is equally likely (or uses a heuristic)
        possibleAnswers.forEach(ans => {
            // Clone session state (shallowish) to simulate update
            const simulatedProbs = JSON.parse(JSON.stringify(session.probabilities));
            const simulatedFunctions = { ...session.functions };
            
            // Apply simulated update
            simulateUpdate(simulatedProbs, simulatedFunctions, q, ans);
            
            // Calculate entropy of this simulated state
            const entropy = [SYSTEMS.MBTI, SYSTEMS.ENNEAGRAM, SYSTEMS.SOCIONICS].reduce((acc, sys) => {
                return acc + Object.values(simulatedProbs[sys]).reduce((a, p) => p > 0 ? a - (p * Math.log2(p)) : a, 0);
            }, 0);
            
            expectedEntropy += (1 / possibleAnswers.length) * entropy;
        });

        const gain = -expectedEntropy; // We want to minimize entropy, so maximize negative entropy
        if (gain > maxGain) {
            maxGain = gain;
            bestQ = q;
        }
    });

    return bestQ || available[0];
}

/**
 * Helper to simulate a state update for Entropy calculation
 */
function simulateUpdate(probs, funcs, q, answer) {
    const factor = answer / 2;
    const DAMPING = 0.1;

    // 1. Functions
    if (q.weights.mbti) {
        Object.entries(q.weights.mbti).forEach(([f, w]) => {
            funcs[f] = Math.max(0, Math.min(1, funcs[f] + w * factor * DAMPING));
        });
    }

    // 2. Map Functions to MBTI Types in simulation
    for (const [type, stack] of Object.entries(MBTI_STACKS)) {
        let score = (funcs[stack[0]] * 1.0) +
                    (funcs[stack[1]] * 0.8) +
                    (funcs[stack[2]] * 0.6) +
                    (funcs[stack[3]] * 0.4);
        probs[SYSTEMS.MBTI][type] = score;
    }

    // 3. Direct Weights (Ennea/Socio)
    [SYSTEMS.ENNEAGRAM, SYSTEMS.SOCIONICS].forEach(sys => {
        if (q.weights[sys]) {
            Object.entries(q.weights[sys]).forEach(([type, w]) => {
                if (probs[sys][type]) probs[sys][type] *= (1 + w * factor * DAMPING);
            });
        }
    });

    // 4. Normalize (Required for Entropy)
    [SYSTEMS.MBTI, SYSTEMS.ENNEAGRAM, SYSTEMS.SOCIONICS].forEach(sys => {
        const t = Object.values(probs[sys]).reduce((a, b) => a + b, 0);
        if (t > 0) Object.keys(probs[sys]).forEach(k => probs[sys][k] /= t);
    });
}
