/**
 * True Type Test Typology Constants & Exclusion Matrix
 */

export const SYSTEMS = {
    MBTI: 'mbti',
    ENNEAGRAM: 'enneagram',
    SOCIONICS: 'socionics'
};

export const MBTI_TYPES = [
    'INTJ', 'ENTJ', 'INFJ', 'ENFJ',
    'INTP', 'ENTP', 'INFP', 'ENFP',
    'ISTJ', 'ESTJ', 'ISFJ', 'ESFJ',
    'ISTP', 'ESTP', 'ISFP', 'ESFP'
];

export const ENNEAGRAM_TYPES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const SOCIONICS_TYPES = [
    'LII', 'ILE', 'ESE', 'SEI', // Alpha
    'LSI', 'SLE', 'EIE', 'IEI', // Beta
    'ESI', 'SEE', 'LIE', 'ILI', // Gamma
    'LSE', 'SLI', 'EII', 'IEE'  // Delta
];

export const MBTI_STACKS = {
    INTJ: ['Ni', 'Te', 'Fi', 'Se'], ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
    INFJ: ['Ni', 'Fe', 'Ti', 'Se'], ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
    INTP: ['Ti', 'Ne', 'Si', 'Fe'], ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
    INFP: ['Fi', 'Ne', 'Si', 'Te'], ENFP: ['Ne', 'Fi', 'Te', 'Si'],
    ISTJ: ['Si', 'Te', 'Fi', 'Ne'], ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
    ISFJ: ['Si', 'Fe', 'Ti', 'Ne'], ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
    ISTP: ['Ti', 'Se', 'Ni', 'Fe'], ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
    ISFP: ['Fi', 'Se', 'Ni', 'Te'], ESFP: ['Se', 'Fi', 'Te', 'Ni']
};

/**
 * EXCLUSION MATRIX (Hard Constraints)
 * Defines impossible or highly improbable cross-system combinations.
 * Format: { [SourceType]: { [System]: [ForbiddenTypes] } }
 */
export const EXCLUSION_MATRIX = {
    // MBTI -> Enneagram Exclusions
    'ENTJ': {
        [SYSTEMS.ENNEAGRAM]: ['9', '2', '4'],
        [SYSTEMS.SOCIONICS]: ['SEI', 'IEI', 'SLI', 'EII']
    },
    'INTJ': {
        [SYSTEMS.ENNEAGRAM]: ['2', '7'],
        [SYSTEMS.SOCIONICS]: ['ESE', 'SEE', 'IEE']
    },
    'ESTJ': {
        [SYSTEMS.ENNEAGRAM]: ['4'],
        [SYSTEMS.SOCIONICS]: ['IEI', 'ILI']
    },
    'INFP': {
        [SYSTEMS.ENNEAGRAM]: ['8', '3', '1'],
        [SYSTEMS.SOCIONICS]: ['SLE', 'LIE', 'LSE']
    },
    'ESFP': {
        [SYSTEMS.ENNEAGRAM]: ['5', '1'],
        [SYSTEMS.SOCIONICS]: ['LII', 'ILI', 'SLI']
    },
    // Enneagram -> MBTI Exclusions
    '8': {
        [SYSTEMS.MBTI]: ['INFP', 'ISFJ', 'INFJ'],
        [SYSTEMS.SOCIONICS]: ['EII', 'IEI', 'SEI']
    },
    '5': {
        [SYSTEMS.MBTI]: ['ESFP', 'ESFJ', 'ENFJ'],
        [SYSTEMS.SOCIONICS]: ['ESE', 'SEE']
    },
    '9': {
        [SYSTEMS.MBTI]: ['ENTJ', 'ESTJ'],
        [SYSTEMS.SOCIONICS]: ['SLE', 'LIE']
    }
};

export const CONFIDENCE_THRESHOLD = 0.85; // 85% certainty for early exit
export const DAMPING_FACTOR = 0.1; // Prevents extreme probability swings from single outlier answers
