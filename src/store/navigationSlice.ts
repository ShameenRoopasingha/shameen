import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SECTIONS, SECTION_METADATA, SectionId } from '@/lib/constants';

const TOTAL_SECTIONS = SECTIONS.length; // 6 sections

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
  warpSpeed: 1.0,
  isTransitioning: false,
  activeProject: null,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setTargetSection: (state, action: PayloadAction<number>) => {
      const section = Math.max(0, Math.min(TOTAL_SECTIONS - 1, action.payload));
      if (section !== state.currentSection) {
        state.targetSection = section;
        state.isTransitioning = true;
      }
    },
    setCurrentSection: (state, action: PayloadAction<number>) => {
      state.currentSection = Math.max(0, Math.min(TOTAL_SECTIONS - 1, action.payload));
      state.targetSection = state.currentSection;
      state.isTransitioning = false;
    },
    setSectionByHash: (state, action: PayloadAction<string>) => {
      const hash = action.payload.toLowerCase();
      const foundIndex = SECTIONS.findIndex(
        (id) => SECTION_METADATA[id]?.hash.toLowerCase() === hash
      );
      if (foundIndex !== -1 && foundIndex !== state.currentSection) {
        state.targetSection = foundIndex;
        state.currentSection = foundIndex;
        state.isTransitioning = false;
      }
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
  setSectionByHash,
  setWarpSpeed,
  setActiveProject,
  completeTransition,
  navigateNext,
  navigatePrev,
} = navigationSlice.actions;

export default navigationSlice.reducer;
