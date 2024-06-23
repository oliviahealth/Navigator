import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                <h1 className="font-semibold">Dashboard</h1>

                <div className="flex flex-row gap-x-8 pt-8">

                    <div className="flex flex-col gap-y-4">

                        <p className="font-bold text-lg">Tab One</p>
                        <a href={'/dashboard/tab-one/enrollment-form/new'}>
                            Enrollment log
                        </a>

                        <a href={'dashboard/tab-one/media-appearance-form/new'}>
                            Media Appearance Form
                        </a>

                        <a href={'/dashboard/tab-one/communication-log/new'}>
                            Communication Log
                        </a>

                        <a href={'/dashboard/tab-one/appointment-log/new'}>
                            Appointment Log
                        </a>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Two</p>

                        <a href={'/dashboard/tab-two/participant-demographics-record/new'}>
                            Participant Demographics Record
                        </a>

                        <a href={'/dashboard/tab-two/participant-record-for-others-involved/new'}>
                            Participant Record For Others Involved
                        </a>

                        <a href={'/dashboard/tab-two/child-demographics-record/new'}>
                            Child Demographics Record
                        </a>

                        <a href={'/dashboard/tab-two/support-systems/new'}>
                            Support Systems
                        </a>

                        <a href={'dashboard/tab-two/current-living-arrangement/new'}>
                            Current Living Arrangement
                        </a>

                        <a href={'dashboard/tab-two/children-needs/new'}>
                            Children Needs
                        </a>

                        <a href={'dashboard/tab-two/referrals-and-services/new'}>
                            Referrals & Services
                        </a>

                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Three</p>

                        <a href={'dashboard/tab-three/parental-medical-history/new'}>
                            Parental Medical History
                        </a>

                        <a href={'dashboard/tab-three/encounter-form/new'}>
                            Encounter Form
                        </a>

                        <a href={'dashboard/tab-three/nutrition-history-and-assessment/new'}>
                            Nutrition History Assessment
                        </a>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Four</p>

                        <a href={'dashboard/tab-four/current-medication-list/new'}>
                            Current Medication List
                        </a>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Five</p>

                        <a href={'dashboard/tab-five/smoking-tobacco-pregnancy/new'}>
                            Smoking and Tobacco Use During Pregnancy
                        </a>

                        <a href={'dashboard/tab-five/substance-use-history/new'}>
                            Substance Use History
                        </a>
                        
                        <p className="font-bold text-lg">Tab Eight</p>

                        <a href={'dashboard/tab-eight/mental-health-history/new'}>
                            Mental Health History
                        </a>

                        <a href={'dashboard/tab-eight/generalized-anxiety-disorder/new'}>
                            GAD-7
                        </a>
                        
                        <a href={'dashboard/tab-eight/duke-university-religion-index/new'}>
                            Duke University Religion Index
                        </a>

                        <a href={'dashboard/tab-eight/edinburg-postnatal-depression-scale/new'}>
                            Edinburg Postnatal Depression Scale
                        </a>
                    </div>


                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Nine</p>

                        <a href={'dashboard/tab-nine/housing-security-home-visit-form/new'}>
                            Housing Security Home Visit Form
                        </a>

                        <a href={'#'}>
                            Household Housing Safety Profile
                        </a>

                        <a href={'#'}>
                            Food Security
                        </a>
                       
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;