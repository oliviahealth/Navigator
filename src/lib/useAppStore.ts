'use client';

import { create } from 'zustand'

interface AppState {
    userId: string
    
    errorMessage: string | null,
    setErrorMessage: (errorMessage: string | null) => void

    successMessage: string | null,
    setSuccessMessage: (successMessage: string | null) => void
}

const useAppStore = create<AppState>()((set) => ({
    userId: 'f9dac19a-5908-415a-8d80-14f0356fe737',
    
    errorMessage: null,
    setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),

    successMessage: null,
    setSuccessMessage: (successMessage) => set(() => ({ successMessage })),
}));

export default useAppStore;