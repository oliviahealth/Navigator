import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * Creates a CommunicationLog instance
 * @param req userId (URL param), dateTime (DateTime), method (String), organizationPerson(String), purpose(String), notes(String), followUpNeeded(String)
 * @returns the new CommunicationLog instance or an error
 */
export async function POST(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');

    // Check if the api request has a user_id included as a parameter in the URL
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

        // Creates new CommunicationLog instance
        const newCommunicationLog = await prisma.communicationLog.create({
            data: newCommunicationLogData,
        })

        return NextResponse.json(newCommunicationLog, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error creating CommunicationLog', message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Error creating CommunicationLog', message: 'Unknown error' }, { status: 500 });
        }
    }
}

/**
 * Gets CommunicationLog instance(s) for a given user
 * @param req id & user_id (URL params)
 * @returns CommunicationLog for a given id if id specified, or all CommunicationLogs for the user, or an error
 */
export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
    const id = searchParams.get('id');

    // Check if the api request has a user id included as a parameter in the URL
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

        // If there is a specified id, return the CommunicationLog for the id
        if (id) {
            const communicationLog = await prisma.communicationLog.findFirst({
                where: { userId: user_id, id: id },
            });

            // Check if there is an existing CommunicationLog for the specified id
            if (!communicationLog) {
                return NextResponse.json({ message: 'Invalid communicationLog id' }, { status: 400 });
            }

            return NextResponse.json(communicationLog, { status: 200 });

            // If id not in URL param, then return all CommunicationLogs for the user_id
        } else {
            const communicationLogList = await prisma.communicationLog.findMany({
                where: { userId: user_id },
            });

            if (!communicationLogList) {
                return NextResponse.json({ message: 'No CommunicationLogs for this user' }, { status: 400 });
            }

            return NextResponse.json(communicationLogList, { status: 200 });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error creating CommunicationLog', message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Error creating CommunicationLog', message: 'Unknown error' }, { status: 500 });
        }
    }
}

/**
 * Updates a CommunicationLog instance
 * @param req id & userId (URL params), dateTime (DateTime), method (String), organizationPerson(String), purpose(String), notes(String), followUpNeeded(String)
 * @returns the updated CommunicationLog instance or an error
 */
export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
    const id = searchParams.get('id');

    // Check if the api request has a user_id included as a parameter in the URL
    if (!user_id) {
        return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }

    // Check if the api request has an id included as a parameter in the URL
    if (!id) {
        return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }

    try {
        const { dateTime, method, organizationPerson, purpose, notes, followUpNeeded } = await req.json();

        // Check if a CommunicationLog with this id exists in the db
        const existingCommunicationLog = await prisma.communicationLog.findUnique({
            where: {
                id: id,
                userId: user_id,
            },
        });

        if (!existingCommunicationLog) {
            return NextResponse.json({ error: 'Communication log not found' }, { status: 404 });
        }

        const updatedCommunicationLogData = {
            dateTime,
            method,
            organizationPerson,
            purpose,
            notes,
            followUpNeeded,
            dateModified: new Date(),
        }

        // Update the CommunicationLog
        const updatedCommunicationLog = await prisma.communicationLog.update({
            where: {
                id: id,
                userId: user_id,
            },
            data: updatedCommunicationLogData
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

/**
 * Deletes a CommunicationLog instance from the db
 * @param req id  & user_id (URL params)
 * @returns message indiciating user deletion or an error
 */
export async function DELETE(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id')
    const id = searchParams.get('id');

    // Check if the api request has a user_id included as a parameter in the URL
    if (!user_id) {
        return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }

    // Check if the api request has a id included as a parameter in the URL
    if (!id) {
        return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }

    try {
        // Check if a CommunicationLog instance with this id exists in the db
        const existingCommunicationLog = await prisma.communicationLog.findUnique({
            where: {
                id: id,
                userId: user_id,
            },
        });

        if (!existingCommunicationLog) {
            return NextResponse.json({ error: 'Communication log not found' }, { status: 404 });
        }

        // Delete the CommunicationLog
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