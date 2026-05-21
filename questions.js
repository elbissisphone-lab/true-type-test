/**
 * Unified Question Matrix
 * Each question has weights for MBTI (Functions), Enneagram, and Socionics.
 * Weight range: -1.0 to 1.0 per type.
 */

export const QUESTION_POOL = [
    {
        id: "core_01",
        text: "I prioritize objective efficiency and logical systems over personal sentiments when making decisions.",
        weights: {
            mbti: { Te: 0.8, Fi: -0.6, Ti: 0.2 },
            enneagram: { '1': 0.4, '3': 0.5, '8': 0.3, '9': -0.4, '4': -0.5 },
            socionics: { LIE: 0.7, LSE: 0.7, SLE: 0.5, EII: -0.6, IEI: -0.7 }
        }
    },
    {
        id: "core_02",
        text: "I often perceive underlying patterns and future implications that others seem to miss.",
        weights: {
            mbti: { Ni: 0.9, Se: -0.7, Ne: 0.3 },
            enneagram: { '5': 0.6, '4': 0.4, '1': 0.2, '7': -0.3 },
            socionics: { ILI: 0.8, IEI: 0.8, LII: 0.4, SEE: -0.6, ESE: -0.7 }
        }
    },
    {
        id: "core_03",
        text: "I feel a strong internal drive to be unique and authentic, often feeling misunderstood by the masses.",
        weights: {
            mbti: { Fi: 0.8, Te: -0.5, Fe: -0.3 },
            enneagram: { '4': 0.9, '5': 0.3, '2': 0.2, '3': -0.4, '8': -0.3 },
            socionics: { EII: 0.6, IEI: 0.7, ESI: 0.5, LSE: -0.5, SLE: -0.6 }
        }
    },
    {
        id: "core_04",
        text: "I am naturally attuned to the emotional atmosphere of a room and feel responsible for maintaining harmony.",
        weights: {
            mbti: { Fe: 0.9, Ti: -0.6, Fi: 0.2 },
            enneagram: { '2': 0.8, '9': 0.6, '6': 0.3, '5': -0.5, '8': -0.4 },
            socionics: { ESE: 0.8, EIE: 0.7, SEI: 0.6, ILI: -0.7, LII: -0.6 }
        }
    },
    {
        id: "core_05",
        text: "I thrive on immediate sensory engagement, seeking thrill, impact, and direct action in the physical world.",
        weights: {
            mbti: { Se: 0.9, Ni: -0.8, Si: 0.2 },
            enneagram: { '8': 0.7, '7': 0.7, '3': 0.4, '5': -0.6, '4': -0.4 },
            socionics: { SLE: 0.9, SEE: 0.8, LSI: 0.5, IEI: -0.8, ILI: -0.7 }
        }
    },
    {
        id: "core_06",
        text: "I constantly brainstorm new possibilities and ideas, often jumping from one project to another.",
        weights: {
            mbti: { Ne: 0.9, Si: -0.7, Ni: 0.2 },
            enneagram: { '7': 0.8, '4': 0.3, '9': 0.2, '1': -0.5, '6': -0.3 },
            socionics: { IEE: 0.8, ILE: 0.8, EIE: 0.4, SLI: -0.7, LSI: -0.6 }
        }
    },
    {
        id: "core_07",
        text: "I value precision and internal logical consistency above all else, often refining my theories indefinitely.",
        weights: {
            mbti: { Ti: 0.9, Fe: -0.7, Te: 0.3 },
            enneagram: { '5': 0.7, '1': 0.5, '6': 0.4, '2': -0.6, '7': -0.2 },
            socionics: { LII: 0.9, LSI: 0.8, ILI: 0.5, ESE: -0.8, SEE: -0.7 }
        }
    },
    {
        id: "core_08",
        text: "I rely heavily on proven methods, past experiences, and meticulous attention to detail.",
        weights: {
            mbti: { Si: 0.9, Ne: -0.8, Se: 0.3 },
            enneagram: { '1': 0.6, '6': 0.7, '9': 0.4, '7': -0.7, '4': -0.3 },
            socionics: { LSE: 0.8, SLI: 0.8, LSI: 0.7, IEE: -0.8, ILE: -0.7 }
        }
    },
    {
        id: "core_09",
        text: "I feel a deep need to be competent, knowledgeable, and independent, often withdrawing to observe.",
        weights: {
            mbti: { Ti: 0.6, Ni: 0.5, Se: -0.5 },
            enneagram: { '5': 0.9, '1': 0.3, '6': 0.4, '2': -0.7, '3': -0.3 },
            socionics: { LII: 0.7, ILI: 0.8, SLI: 0.6, ESE: -0.7, SEE: -0.8 }
        }
    },
    {
        id: "core_10",
        text: "I am driven by a vision of how things should be and work tirelessly to manifest my ideals.",
        weights: {
            mbti: { Ni: 0.6, Fe: 0.5, Se: -0.4 },
            enneagram: { '1': 0.8, '4': 0.5, '3': 0.4, '7': -0.5, '9': -0.3 },
            socionics: { EIE: 0.7, LIE: 0.6, LII: 0.5, SLE: -0.4, SEI: -0.5 }
        }
    },
    // --- HIERARCHICAL AXIS QUESTIONS (High Impact) ---
    {
        id: "axis_01",
        text: "I primarily orient my energy inward toward my own thoughts and reflections rather than outward toward the social environment.",
        weights: {
            mbti: { Ni: 0.5, Ti: 0.5, Fi: 0.5, Si: 0.5, Ne: -0.5, Te: -0.5, Fe: -0.5, Se: -0.5 },
            enneagram: { '4': 0.4, '5': 0.6, '9': 0.4, '7': -0.6, '8': -0.5, '3': -0.4 },
            socionics: { LII: 0.6, ILI: 0.6, EII: 0.6, SLI: 0.6, ESE: -0.6, SLE: -0.6, LIE: -0.6, IEE: -0.6 }
        }
    },
    {
        id: "axis_02",
        text: "My first reaction to stress is usually a surge of anger or a need to take control, rather than anxiety or emotional withdrawal.",
        weights: {
            enneagram: { '8': 1.0, '1': 0.8, '9': 0.6, '5': -0.8, '6': -0.7, '4': -0.6, '2': -0.5 },
            mbti: { Te: 0.4, Se: 0.4 }
        }
    },
    {
        id: "axis_03",
        text: "I make sense of the world through abstract patterns and future possibilities rather than concrete facts and past experiences.",
        weights: {
            mbti: { Ni: 0.8, Ne: 0.8, Si: -1.0, Se: -0.6 },
            socionics: { ILI: 0.8, IEI: 0.8, LII: 0.7, ILE: 0.7, LSI: -0.8, SLI: -0.8, ESE: -0.7, LSE: -0.7 }
        }
    }
];
