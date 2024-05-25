import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

/**
 * Creates a user account
 * @param req id (URL param), name (String), email (String)
 * @returns the new user account or an error
 */
export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json()

        const newUser = {
            name,
            email
        }

        // Creates new user
        const user = await prisma.user.create({
            data: newUser,
        })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
    }
}

/**
 * Gets a user's information from the db
 * @param req id (URL param)
 * @returns requested user instance or an error
 */

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // Check if the api request has an id included as a parameter in the URL
    if (!id) {
        return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }

    try {
        // Check if a user with this id exists in the db
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

/**
 * Updates a user's information
 * @param req id (URL param), name (String), email (String)
 * @returns updated user or an error
 */
export async function PUT(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // Check if the api request has an id included as a parameter in the URL
    if (!id) {
        return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }

    try {
        const { name, email } = await req.json();

        // Check if a user with this id exists in the db
        const existingUser = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const updatedUserData = {
            name,
            email,
            dateModified: new Date()
        }

        // Update the user
        const updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: updatedUserData
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error updating user', message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Error updating user', message: 'Unknown error' }, { status: 500 });
        }
    }
}

/**
 * Deletes a user from the db
 * @param req id (URL param)
 * @returns message indiciating user deletion or an error
 */
export async function DELETE(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // Check if the api request has an id included as a parameter in the URL
    if (!id) {
        return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }

    try {
        // Check if a user with this id exists in the db
        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Delete the user
        await prisma.user.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error deleting user', message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Error deleting user', message: 'Unknown error' }, { status: 500 });
        }
    }
}