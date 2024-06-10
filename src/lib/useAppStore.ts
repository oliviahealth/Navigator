'use client';

import { create } from 'zustand'
import { IUser } from './definitions';

interface AppState {
    user: IUser | null;
    setUser: (user: IUser | null) => void;

    errorMessage: string | null,
    setErrorMessage: (errorMessage: string | null) => void

    successMessage: string | null,
    setSuccessMessage: (successMessage: string | null) => void
}

const useAppStore = create<AppState>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),

    errorMessage: null,
    setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),

    successMessage: null,
    setSuccessMessage: (successMessage) => set(() => ({ successMessage })),
}));

export const setCookie = (name: string, value: string, options: { [key: string]: any } = {}) => {
    options = {
        path: '/',
        // Add other cookie options here if needed (e.g., max-age, secure, etc.)
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
};

export default useAppStore;