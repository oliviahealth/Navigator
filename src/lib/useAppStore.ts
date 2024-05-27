'use client';

import { create } from 'zustand'

interface AppState {
    errorMessage: string | null,
    setErrorMessage: (errorMessage: string | null) => void

    successMessage: string | null,
    setSuccessMessage: (successMessage: string | null) => void
}

const useAppStore = create<AppState>()((set) => ({
    errorMessage: null,
    setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),

    successMessage: null,
    setSuccessMessage: (successMessage) => set(() => ({ successMessage })),
}));

export default useAppStore;