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
    userId: '4ea00536-ac53-4dbd-a9dc-2445da766149',
    
    errorMessage: null,
    setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),

    successMessage: null,
    setSuccessMessage: (successMessage) => set(() => ({ successMessage })),
}));

export default useAppStore;