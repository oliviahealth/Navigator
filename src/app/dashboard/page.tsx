"use client"

import React, { useEffect, useState } from "react";


async function fetchUser(id: string) {

    const res = await fetch(`/api/users?id=${id}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch users')
    }

    return res.json()
}

const Dashboard: React.FC = () => {

    const [user, setUser] = useState<{ id: number; name: string; email: string, dateCreated: string } | null>(null)
    const userId = 'fe92b186-450c-4a63-943b-035c63660fcc'

    useEffect(() => {
        const getUser = async () => {
            try {
                const userData = await fetchUser(userId)
                setUser(userData)
            } catch (error) {
                console.error('Error fetching user:', error)
            }
        }

        getUser()
    }, [])


    return (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                <h1 className="font-semibold">Dashboard</h1>

                {user ?
                    <>
                        <div>Name: {user.name}</div>
                        <div>Email: {user.email}</div>
                        <div>Date Created: {user.dateCreated}</div>
                    </>
                    : <p>Loading user...</p>}
            </div>
        </div>
    )
}

export default Dashboard;