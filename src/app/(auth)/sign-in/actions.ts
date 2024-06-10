"use server";

import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

import { ISigninFormData } from "./definitions";

export const signin = async(signinFormData: ISigninFormData) => {
    const { email, password } = signinFormData;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user) {
        throw new Error('Invalid username or password: User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    cookies().set({
        name: "jwt",
        secure: process.env.NODE_ENV === 'production', // Ensure this is set to true in production
        value: token,
        httpOnly: true,
        path: "/",
      });

    return { user, token }
}