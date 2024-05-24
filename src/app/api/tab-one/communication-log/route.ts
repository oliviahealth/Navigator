import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
        return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }

    try {
        const { dateTime, method, organizationPerson, purpose, notes, followUpNeeded } = await req.json()

        const newCommunicationLogData = {
            userId: user_id,
            dateTime,
            method,
            organizationPerson,
            purpose,
            notes,
            followUpNeeded,
        }
        const newCommunicationLog = await prisma.communicationLog.create({
            data: newCommunicationLogData,
        })

        return NextResponse.json(newCommunicationLog, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error creating user', message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Error creating user', message: 'Unknown error' }, { status: 500 });
        }
    }
}

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
    const id = searchParams.get('id');

    if (!user_id) {
        return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: user_id },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        if (id) {
            const communicationLog = await prisma.communicationLog.findFirst({
                where: { userId: user_id, id: id },
            });

            if (!communicationLog) {
                return NextResponse.json({ message: 'Invalid communicationLog id' }, { status: 400 });
            }

            return NextResponse.json(communicationLog, { status: 200 });

        } else {
            const communicationLogList = await prisma.communicationLog.findMany({
                where: { userId: user_id },
            });

            return NextResponse.json(communicationLogList, { status: 200 });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error creating user', message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Error creating user', message: 'Unknown error' }, { status: 500 });
        }
    }
}

export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
    const id = searchParams.get('id');

    if (!user_id) {
        return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }

    if (!id) {
        return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }

    try {
        const { dateTime, method, organizationPerson, purpose, notes, followUpNeeded } = await req.json();

        const existingCommunicationLog = await prisma.communicationLog.findUnique({
            where: {
                id: id,
                userId: user_id,
            },
        });

        if (!existingCommunicationLog) {
            return NextResponse.json({ error: 'Communication log not found' }, { status: 404 });
        }

        const updatedCommunicationLog = await prisma.communicationLog.update({
            where: {
                id: id,
                userId: user_id,
            },
            data: {
                dateTime,
                method,
                organizationPerson,
                purpose,
                notes,
                followUpNeeded,
                dateModified: new Date(),
            },
        });

        return NextResponse.json(updatedCommunicationLog, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error updating submission', message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Error updating submission', message: 'Unknown error' }, { status: 500 });
        }
    }
}

export async function DELETE(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id')
    const id = searchParams.get('id');

    if (!user_id) {
        return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }

    if (!id) {
        return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }

    try {
        const existingCommunicationLog = await prisma.communicationLog.findUnique({
            where: {
                id: id,
                userId: user_id,
            },
        });

        if (!existingCommunicationLog) {
            return NextResponse.json({ error: 'Communication log not found' }, { status: 404 });
        }

        await prisma.communicationLog.delete({
            where: {
                id: id,
                userId: user_id,
            },
        });

        return NextResponse.json({ message: 'Communication log deleted successfully' }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error deleting communication log', message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Error deleting communication log', message: 'Unknown error' }, { status: 500 });
        }
    }
}