"use server";

import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

import { ISignupFormData } from "./definitions";

export const createUser = async (signupFormData: ISignupFormData) => {
    const { name, email, password } = signupFormData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    cookies().set({
        name: "jwt",
        secure: process.env.NODE_ENV === 'production', // Ensure this is set to true in production
        value: token,
        httpOnly: true,
        path: "/",
    });

    return { user, token }
};
