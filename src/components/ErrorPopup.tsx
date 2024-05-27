'use client';

import React from "react";
import useAppStore from "@/lib/useAppStore";

const ErrorPopup: React.FC = () => {
    const error = useAppStore(state => state.errorMessage);
    const setError = useAppStore((state) => state.setErrorMessage);

    const resetError = () => setError(null);

    if(!error) return

    return (
        <div className="relative">
            <div className="z-10 absolute top-0 left-0 w-full h-full"></div>

            <div className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg w-full max-w-xl">
                <div className="alert alert-error">
                    <button onClick={resetError}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                    <p>{ error }</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPopup;