import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                <h1 className="font-semibold">Dashboard</h1>

                <div className="flex flex-row gap-x-8 pt-8">

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab One</p>

                        <a href={'/dashboard/tab-one/communication-log/new'}>
                            Communication Log
                        </a>

                        <a href={'/dashboard/tab-one/appointment-log/new'}>
                            Appointment Log
                        </a>

                        <a href={'/dashboard/tab-one/enrollment-form/new'}>
                            Enrollment log
                        </a>

                        <a href={'dashboard/tab-one/media-appearance-form/new'}>
                            Media Appearance Form
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
                    </div>
                </div>

                <div className="flex flex-row gap-x-8 pt-8">

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Six</p>

                        <a href={'dashboard/tab-six/social-support-form/new'}>
                            Social Support Form
                        </a>

                        <a href={'dashboard/tab-six/multidimensional-scale/new'}>
                            Multidimensional Scale
                        </a>

                        <a href={'dashboard/tab-six/intimate-partner-violence/new'}>
                            Intimate Partner Violence
                        </a>

                        <a href={'dashboard/tab-six/ipv-disclosure-tool/new'}>
                            Intimate Partner Violence Disclosure Screening tool
                        </a>

                        <a href={'dashboard/tab-six/social_support_form/new'}>
                            Social Support Form
                        </a>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Seven</p>

                        <a href={'dashboard/tab-seven/pregnancy-spacing-assesment/new'}>
                            Pregnancy Spacing Assesment
                        </a>

                        <a href={'dashboard/tab-seven/ten-bs-postpartum-assesment/new'}>
                            10 B's Postpartum Assesment
                        </a>
                    </div>

                    <div className="flex flex-col gap-y-4">
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

                        <a href={'dashboard/tab-eight/perceived-stress-scale/new'}>
                            Perceived Stress Scale
                        </a>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Nine</p>

                        <a href={'dashboard/tab-nine/housing-security-home-visit-form/new'}>
                            Housing Security Home Visit Form
                        </a>

                        <a href={'dashboard/tab-nine/housing-safety-profile/new'}>
                            Household Housing Safety Profile
                        </a>

                        <a href={'dashboard/tab-nine/food-security/new'}>
                            Food Security
                        </a>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-lg">Tab Ten</p>

                        <a href={'dashboard/tab-ten/prenatal-care/new'}>
                            Prenatal Care
                        </a>
                        <p className="font-bold text-lg">Tab Eleven</p>

                        <a href={'dashboard/tab-eleven/target-child-record/new'}>
                            Target Child Enrollment & Summary Record
                        </a>
                        <a href={'dashboard/tab-eleven/infancy-questionnaire/new'}>
                            Infancy Questionnaire
                        </a>
                        <a href={'dashboard/tab-eleven/delivery-history-information-form/new'}>
                            Delivery History Information Form
                        </a>

                        <a href={'dashboard/tab-eleven/brief-child-wellness-update/new'}>
                            Brief Child Wellness Update
                        </a>

                        <a href={'dashboard/tab-eleven/delivery-history-information-form/new'}>
                            Delivery History Information Form
                        </a>

                        <a href={'dashboard/tab-eleven/perceived-maternal-parenting-self-efficacy-tool/new'}>
                            Perceived Maternal Parenting Self Efficacy Tool
                        </a>

                        <a href={'dashboard/tab-eleven/asq-3/new'}>
                            ASQ-3
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;