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
    userId: '1d31841f-784c-41f4-a9a5-9d803023e6f7',
    
    errorMessage: null,
    setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),

    successMessage: null,
    setSuccessMessage: (successMessage) => set(() => ({ successMessage })),
}));

export default useAppStore;