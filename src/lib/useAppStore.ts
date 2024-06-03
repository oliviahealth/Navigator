'use client';

import { create } from 'zustand'
import { IUser } from './definitions';

interface AppState {
    user: IUser | null;
    setUser: (user: IUser | null) => void;

    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void
    
    errorMessage: string | null,
    setErrorMessage: (errorMessage: string | null) => void

    successMessage: string | null,
    setSuccessMessage: (successMessage: string | null) => void
}

const useAppStore = create<AppState>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),

    accessToken: null,
    setAccessToken: (accessToken) => set(() => {
        if(accessToken) {
            sessionStorage.setItem('access_token', accessToken);
        }

        return { accessToken }
    }),

    errorMessage: null,
    setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),

    successMessage: null,
    setSuccessMessage: (successMessage) => set(() => ({ successMessage })),
}));

export default useAppStore;