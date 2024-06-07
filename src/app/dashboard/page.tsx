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

                    <Link href={'/dashboard/tab-two/participant-record-for-others-involved/new'}>
                        Participant Record For Others Involved
                    </Link>

                    <Link href={'/dashboard/tab-two/child-demographics-record/new'}>
                        Child Demographics Record
                    </Link>

                    <Link href={'/dashboard/tab-two/support-systems/new'}>
                        Support Systems
                    </Link>

                    <Link href={'dashboard/tab-two/current-living-arrangement/new'}>
                        Current Living Arrangement
                    </Link>

                    <Link href={'dashboard/tab-two/children-needs/new'}>
                        Children Needs
                    </Link>

                    <Link href={'dashboard/tab-three/parental-medical-history/new'}>
                        Parental Medical History
                    </Link>
                    
                    <Link href={'dashboard/tab-two/referrals-and-services/new'}>
                        Referrals & Services
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;