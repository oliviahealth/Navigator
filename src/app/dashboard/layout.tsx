import { cookies } from "next/headers";
import { verify } from 'jsonwebtoken';
import { UserProvider } from "@/components/UserContext";
import { prisma } from "@/lib/prisma";


export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const verifyJwt = () => {
        const jwt = cookies().get('jwt')?.value;

        if (!jwt) {
            throw new Error("Unauthorized");
        }

        const decodedToken = verify(jwt, process.env.JWT_SECRET!) as { userId: string };

        return decodedToken['userId'];
    }

    const decodedToken = verifyJwt();
    const user = await prisma.user.findUnique({
        where: { id: decodedToken }
    });

    return (
        <UserProvider user={user}>
            <div>
                {children}
            </div>
        </UserProvider>
    )
}