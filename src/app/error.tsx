'use client'

import { useEffect } from 'react'
import useAppStore, { setCookie } from '@/lib/useAppStore'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const setErrorMessage = useAppStore(state => state.setErrorMessage);
    const setUser = useAppStore(state => state.setUser);
    
    useEffect(() => {
        console.error(error)

        setCookie('jwt', '')
        setUser(null)
        setErrorMessage("Something went wrong! Please try again later");
    }, [error])

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}