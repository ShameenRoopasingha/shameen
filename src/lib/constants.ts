// Section identifiers
export const SECTIONS = ['hero', 'experience', 'projects', 'skills', 'references', 'feedbacks', 'contact'] as const;
export type SectionId = typeof SECTIONS[number];


// Warp speed constants
export const WARP_SPEED_IDLE = 0.5;
export const WARP_SPEED_PEAK = 12;
export const TRANSITION_DURATION = 1.4;

// TVA Color palette
export const TVA_COLORS = {
    void: '#050404',
    amber: '#FF9900',
    red: '#FF3333',
    amberDim: 'rgba(255, 153, 0, 0.15)',
    amberGlow: 'rgba(255, 153, 0, 0.4)',
} as const;

// Animation constants
export const ANIMATION = {
    typewriterSpeed: 0.04,
    sectionTransition: 1.4,
    jitterDuration: 0.1,
} as const;
