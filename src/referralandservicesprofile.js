import React, { Component } from 'react';

const ServiceQuestion = ({ question, response, organizationName, organizationContact }) => {
    return (
        <div className="question-container">
            <p>{question} <span className="answer">{response}</span></p>
            <div className="organization-info">
                <p>Organization Name: <span className="answer">{organizationName}</span></p>
            </div>
            <div className="organization-info">
                <p>Organization Contact: <span className="answer">{organizationContact}</span></p>
            </div>
        </div>
    );
};


class ServicesProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organizations: [
                // Add organization names and contacts here corresponding to each question
                // For instance:
            ],
            isLoading: true,
        };
    }
    componentDidMount() {
        this.fetchReferralService();
    }

    fetchReferralService = async () => {
        const userId = localStorage.getItem('userId');
    
        try {
            const response = await fetch('/api/referral-service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId }),
            });
    
            if (response.ok) {
                const data = await response.json();
                this.setState({
                    organizations: this.mapReferralService(data),
                    isLoading: false,
                });
            } else {
                // Handle HTTP errors
                console.error('HTTP error:', response.status);
                this.setState({ isLoading: true });
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('There was a problem with the fetch operation:', error);
            this.setState({ isLoading: true });
        }
    }
    
    mapReferralService(data) {
        return [
            {response: data.parenting_classes_response, name: data.parenting_classes_org_name, contact: data.parenting_classes_org_contact },
            {response: data.transportation_services_response, name: data.transportation_services_org_name, contact: data.transportation_services_org_contact },
            {response: data.ssi_disability_response, name: data.ssi_disability_org_name, contact: data.ssi_disability_org_contact },
            {response: data.tanf_response, name: data.tanf_org_name, contact: data.tanf_org_contact },
            {response: data.personal_safety_response, name: data.personal_safety_org_name, contact: data.personal_safety_org_contact },
            {response: data.home_visitation_program_response, name: data.home_visitation_program_org_name, contact: data.home_visitation_program_org_contact },
            {response: data.housing_assistance_response, name: data.housing_assistance_org_name, contact: data.housing_assistance_org_contact },
            {response: data.healthy_start_program_response, name: data.healthy_start_program_org_name, contact: data.healthy_start_program_org_contact },
            {response: data.chip_response, name: data.chip_org_name, contact: data.chip_org_contact },
            {response: data.breastfeeding_support_response, name: data.breastfeeding_support_org_name, contact: data.breastfeeding_support_org_contact },
            {response: data.local_food_pantries_response, name: data.local_food_pantries_org_name, contact: data.local_food_pantries_org_contact },
            {response: data.snap_response, name: data.snap_org_name, contact: data.snap_org_contact },
            {response: data.wic_response, name: data.wic_org_name, contact: data.wic_org_contact },
            {response: data.health_insurance_enrollment_response, name: data.health_insurance_enrollment_org_name, contact: data.health_insurance_enrollment_org_contact },
            {response: data.prenatal_healthcare_response, name: data.prenatal_healthcare_org_name, contact: data.prenatal_healthcare_org_contact },
            {response: data.family_planning_response, name: data.family_planning_org_name, contact: data.family_planning_org_contact },
            {response: data.primary_care_response, name: data.primary_care_org_name, contact: data.primary_care_org_contact },
            {response: data.mental_health_counseling_response, name: data.mental_health_counseling_org_name, contact: data.mental_health_counseling_org_contact },
            {response: data.smoking_cessation_response, name: data.smoking_cessation_org_name, contact: data.smoking_cessation_org_contact },
            {response: data.residential_treatment_response, name: data.residential_treatment_org_name, contact: data.residential_treatment_org_contact },
            {response: data.outpatient_treatment_response, name: data.outpatient_treatment_org_name, contact: data.outpatient_treatment_org_contact },
            {response: data.caring_for_two_program_response, name: data.caring_for_two_program_org_name, contact: data.caring_for_two_program_org_contact },
            {response: data.cradles_program_response, name: data.cradles_program_org_name, contact: data.the_cradles_program_org_contact },
            {response: data.recovery_support_services_response, name: data.recovery_support_services_org_name, contact: data.recovery_support_services_org_contact },
            {response: data.mat_response, name: data.mat_org_name, contact: data.mat_treatment_org_contact },
            {response: data.eci_response, name: data.eci_org_name, contact: data.eci_org_contact },
            {response: data.early_head_start_response, name: data.early_head_start_org_name, contact: data.early_head_start_org_contact },
            {response: data.nci_childcare_subsidy_response, name: data.nci_childcare_subsidy_org_name, contact: data.nci_childcare_subsidy_org_contact },
            {response: data.pediatrician_primary_care_response, name: data.pediatrician_primary_care_org_name, contact: data.pediatrician_primary_care_org_contact },
            {response: data.safe_sleep_education_response, name: data.safe_sleep_education_org_name, contact: data.safe_sleep_education_org_contact },
            {response: data.cps_response, name: data.cps_org_name, contact: data.cps_org_contact },
            {response: data.legal_aid_response, name: data.legal_aid_org_name, contact: data.legal_aid_org_contact },
            {response: data.specialty_court_response, name: data.specialty_court_org_name, contact: data.specialty_court_org_contact },
        ];
    }

    render() {
        const serviceQuestions = [
            "Parenting Classes:",
            "Transportation Services:",
            "SSI/Disability:",
            "Temporary Assistance for Needy Families (TANF):",
            "Personal Safety:",
            "Home Visitation Program:",
            "Housing Assistance:",
            "Healthy Start Program:",
            "CHIP:",
        
            // FOOD/NUTRITION
            "Breastfeeding Support:",
            "Local Food Pantries:",
            "SNAP:",
            "Women, Infants, & Children (WIC):",
        
            // HEALTHCARE
            "Health Insurance Enrollment:",
            "Prenatal Healthcare:",
            "Family Planning:",
            "Primary Care:",
            "Mental Health/Counseling:",
            "Smoking Cessation:",
        
            // SUBSTANCE USE TREATMENT
            "Residential:",
            "Outpatient:",
            "Caring for Two Program:",
            "The Cradles Program:",
            "Recovery Support Services:",
            "Medication-Assisted Treatment (MAT):",
        
            // CHILD RELATED
            "Early Childhood Intervention (ECI):",
            "Early Head Start:",
            "NCI/Childcare Subsidy:",
            "Pediatrician/Primary Care:",
            "Safe Sleep Education:",
        
            // LEGAL ASSISTANCE
            "Child Protective Service:",
            "Legal Aid:",
            "Specialty Court:",
        ];

        const { organizations, isLoading } = this.state;
        if (isLoading) {
            return <div className="service-profile-container">
                <h2>Service Needs Profile</h2>
                <p>Loading referral service data...</p>
                </div>;
        }

        return (
            <div className="service-profile-container">
                <h2>Service Needs Profile</h2>

                    {serviceQuestions.map((question, index) => (
                        <ServiceQuestion
                            key={index}
                            question={question}
                            response={organizations[index]?.response}
                            organizationName={organizations[index]?.name}
                            organizationContact={organizations[index]?.contact}
                        />
                    ))}
                </div>
        );
    }
}

export default ServicesProfile;
