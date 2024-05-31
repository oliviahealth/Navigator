import React from "react";
import Link from "next/link";

const Dashboard: React.FC = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                <h1 className="font-semibold">Dashboard</h1>

                <div className="flex flex-col gap-y-4 pt-8">
                    <Link href={'/dashboard/tab-one/communication-log/new'}>
                        Communication log
                    </Link>

                    <Link href={'/dashboard/tab-one/appointment-log'}>
                        Appointment log
                    </Link>

                    <Link href={'/dashboard/tab-two/participant-demographics-record/new'}>
                        Participant Demographics Record
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;