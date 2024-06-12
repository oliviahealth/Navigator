'use server';

import { cookies } from "next/headers";

export const signoutUser = () => {
    cookies().set({
        name: "jwt",
        secure: process.env.NODE_ENV === 'production', // Ensure this is set to true in production
        value: '',
        httpOnly: true,
        path: "/",
    });
}