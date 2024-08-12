import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { UserProvider } from "@/components/UserContext";
import { prisma } from "@/lib/prisma";
import LeftSidebar from "@/components/dashboard/LeftSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const verifyJwt = () => {
    const jwt = cookies().get("jwt")?.value;

    if (!jwt) {
      throw new Error("Unauthorized");
    }

    const decodedToken = verify(jwt, process.env.JWT_SECRET!) as {
      userId: string;
    };

    return decodedToken["userId"];
  };

  const decodedToken = verifyJwt();
  const user = await prisma.user.findUnique({
    where: { id: decodedToken },
  });

  return (
    <UserProvider user={user}>
      <div>
        <div className="flex flex-row w-full h-[calc(100vh-7.5rem)]">
          <div className="bg-neutral-100 w-1/5">
            <LeftSidebar></LeftSidebar>
          </div>
          <div className="flex flex-col w-full h-full px-20">
            <div className="flex flex-row mx-5 my-5 justify-between items-center md:items-baseline">
              <div className="flex text-3xl md:text-4xl font-semibold">
                Hello [name]!
              </div>
              <div className="flex">
                <img
                  className="w-8 hidden md:block"
                  src="/images/meatballs.svg"
                ></img>
                <img
                  className="h-8 md:hidden block"
                  src="/images/kebab.svg"
                ></img>
              </div>
            </div>
            <div className="flex flex-col overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
