import { create } from "zustand";

type PatientMenuState = {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  setMenu: (v: boolean) => void;
};

export const usePatientMenuStore = create<PatientMenuState>((set) => ({
  isMenuOpen: false,
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  setMenu: (v) => set({ isMenuOpen: v }),
}));

export const useMedicMenuStore = create<PatientMenuState>((set) => ({
  isMenuOpen: false,
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  setMenu: (v) => set({ isMenuOpen: v }),
}));
