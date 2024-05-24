import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        return NextResponse.json(user, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json()
        const user = await prisma.user.create({
            data: { name, email },
        })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
    }
}