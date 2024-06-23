import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email || !user.name || !(account?.provider === 'google')) {
                throw new Error('Sign Up Error');
            }

            let existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!existingUser) {
                existingUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                    },
                });
            }

            const token = jwt.sign(
                { userId: existingUser.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            cookies().set({
                name: "jwt",
                secure: process.env.NODE_ENV === 'production',
                value: token,
                httpOnly: true,
                path: "/",
            });

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                // @ts-expect-error: Override ts checks
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, options);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, options);
}