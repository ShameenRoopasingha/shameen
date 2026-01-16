import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Total number of sections
const TOTAL_SECTIONS = 7;

export interface NavigationState {
    currentSection: number;
    targetSection: number;
    warpSpeed: number;
    isTransitioning: boolean;
    activeProject: string | null;
}

const initialState: NavigationState = {
    currentSection: 0,
    targetSection: 0,
    warpSpeed: 0.5,
    isTransitioning: false,
    activeProject: null,
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setTargetSection: (state, action: PayloadAction<number>) => {
            const section = Math.max(0, Math.min(TOTAL_SECTIONS - 1, action.payload));
            if (section !== state.currentSection && !state.isTransitioning) {
                state.targetSection = section;
                state.isTransitioning = true;
            }
        },
        setCurrentSection: (state, action: PayloadAction<number>) => {
            state.currentSection = action.payload;
        },
        setWarpSpeed: (state, action: PayloadAction<number>) => {
            state.warpSpeed = action.payload;
        },
        setActiveProject: (state, action: PayloadAction<string | null>) => {
            state.activeProject = action.payload;
        },
        completeTransition: (state) => {
            state.currentSection = state.targetSection;
            state.isTransitioning = false;
        },
        navigateNext: (state) => {
            if (state.currentSection < TOTAL_SECTIONS - 1 && !state.isTransitioning) {
                state.targetSection = state.currentSection + 1;
                state.isTransitioning = true;
            }
        },
        navigatePrev: (state) => {
            if (state.currentSection > 0 && !state.isTransitioning) {
                state.targetSection = state.currentSection - 1;
                state.isTransitioning = true;
            }
        },
    },
});

export const {
    setTargetSection,
    setCurrentSection,
    setWarpSpeed,
    setActiveProject,
    completeTransition,
    navigateNext,
    navigatePrev,
} = navigationSlice.actions;

export default navigationSlice.reducer;
