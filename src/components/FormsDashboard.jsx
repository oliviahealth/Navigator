import React, { useState, useEffect } from 'react';
import navStyles from '../styles/ClientDashboard.module.css';
import styles from '../styles/FormsDashboardStyles.module.css'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const FormsDashboard = () => {
    const navigate = useNavigate();

    const [forms, setForms] = useState([]);

    const { formType, patientId } = useParams();

    const handleLogout = () => {
        navigate('/');
    };

    const handleBack = () => {
        navigate(-1);
    }

    var formNames = {
        "communications_log": "Communication Log",
        "appointment_log": "Appointments Log",
        "release-of-information": "Release of Information",
        "media-appearance-release": "Media Appearance Release",
        "participants-demographic-record": "Participants Demographic Record",
        "demographics-others": "Demographics for Others Involved",
        "child-demographics": "Child Demographics",
        "support-systems": "Support Systems",
        "current-living": "Current Living",
        "child-needs": "Child Needs",
        "referrals-services": "Referrals and Services",
        "emergency-contact": "Emergency Contact",
        "goal-planning": "Goal Planning",
        "parental-medical-history": "Parental Medical History",
        "encounter-form": "Encounter Form",
        "nut-history": "Nutrition History",
        "medications": "Medications",
        "pregnancy": "4 P's of Pregnancy",
        "addiction-belief-scale": "Addiction Belief Scale",
        "cage-screening": "CAGE Screening",
        "crafft-screening": "Crafft Screening",
        "drug-abuse-screening": "Drug Abuse Screening",
        "prenatal-care": "Prenatal Care",
        "asq": "ASQ-3",
        "brief-child": "Brief Child Wellness Update",
        "delivery-history": "Delivery History Information Update",
        "breastfeeding": "Breastfeeding",
        "infancy-quest": "Infancy Questionnaire",
        "target-child": "Target Child Enrollement & Summary Record",
        "drug-screening-results": "Drug Screening Results",
        "smoking-tobacco-use": "Smoking Tobacco Use",
        "substance-use-history": "Substance Use History",
        "tweak-test": "Tweak Test",
        "substance-use-relapse": "Substance Use Relapse",
        "ten-b": "10 B's",
        "pregnancy-spacing": "Pregnancy Spacing Assessment",
        "partner-violence": "Partner Violence",
        "domestic-violence": "Domestic Violence Screening",
        "ipv": "IPV Screening and Assessment Questions",
        "intimate-violence": "Intimate Partner Violence (IPV) Disclosure Screening Tool",
        "family-dynamics": "Family Dynamics Social Support Questionnaire (SSQ6)",
        "mentalhealthhistory": "Mental Health History / Brief Update Form",
        "cssrs": "Columbia Suicide Severity Risk Scale",
        "durel": "Duke University Religion Index (DUREL)",
        "epds": "Edinburg Postnatal Depression Scale (EPDS)",
        "gad7": "Generalized Anxiety Disorder (GAD-7)",
        "pss": "Perceived Stress Scale (PSS)",
        "phq9": "PHQ-9",
        "housingVisit": "Housing Security Home Visit Form",
        "housingSafety": "Household Housing Safety Profile"
    };

    var dbTableNames = {
        "communications_log": "communications_log",
        "appointment_log": "appointment_log",
        "release-of-information": "release_of_information",
        "media-appearance-release": "media_appearance_release",
        "participants-demographic-record": "participant_info",
        "demographics-others": "demographics_others",
        "child-demographics": "child_demographics",
        "support-systems": "support_systems",
        "current-living": "current_living",
        "child-needs": "child_needs",
        "referrals-services": "referrals_services",
        "emergency-contact": "emergency_contact",
        "goal-planning": "goal_planning",
        "parental-medical-history": "parental_medical_history",
        "encounter-form": "encounter_form",
        "nut-history": "nut_history",
        "medications": "medications",
        "pregnancy": "pregnancy",
        "addiction-belief-scale": "addiction_belief_scale",
        "cage-screening": "cage_screening",
        "crafft-screening": "crafft_screening",
        "drug-abuse-screening": "drug_abuse_screening",
        "prenatal-care": "prenatal_care",
        "asq": "asq_three",
        "brief-child": "brief_child",
        "delivery-history": "delivery_history",
        "breastfeeding": "breastfeeding",
        "infancy-quest": "infancy_quest",
        "target-child": "target_child",
        "drug-screening-results": "drug_screening_results",
        "smoking-tobacco-use": "smoking_tobacco_use",
        "substance-use-history": "substance_use_history",
        "tweak-test": "tweak_test",
        "substance-use-relapse": "substance_use_relapse",
        "ten-b": "ten_b",
        "pregnancy-spacing": "pregnancy_spacing",
        "partner-violence": "partner_violence",
        "domestic-violence": "domestic_violence",
        "ipv": "ipv",
        "intimate-violence": "intimate_violence",
        "family-dynamics": "family_dynamics",
        "mentalhealthhistory": "mentalhealthhistory",
        "cssrs": "cssrs",
        "durel": "durel",
        "epds": "epds",
        "gad7": "gad7",
        "pss": "pss",
        "phq9": "phq9",
        "housingVisit": "housing_vist",
        "housingSafety": "housing_safety"
    }

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/forms/${dbTableNames[formType]}/${patientId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    mode: 'cors',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Convert object to array
                const formsArray = Object.values(data);
                setForms(formsArray);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchForms();
    }, [formType, patientId]); 

    const navigateToAddForm = () => {
        navigate(`/${formType}/${patientId}`);
    };

    return (
        <div className={navStyles.clientDashboard}>
            <header className={navStyles.header}>
                <div className={navStyles.logoContainer}>
                    <span className={navStyles.recordName}>Olivia-NAVIGATOR</span>
                </div>
                <nav className={navStyles.nav}>
                    <Link to="/dashboard" className={navStyles.dashboardLink}>
                        Client Dashboard
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
            </header>

            <header className = {styles.header}>
                {formNames[formType]}
            </header>
            <div className = {styles.btnContainer}>
                <a className = {styles.backBtn} onClick={handleBack}>Back to Client Dashboard</a>
            </div>
            <div className = {styles.btnContainer}>
                <a className = {styles.btn} onClick={navigateToAddForm}>+ Add New Form</a>
            </div>
            <div className = {styles.formsContainer}>
                {forms.slice().reverse().map((form, index) => (
                        <div 
                            className={styles.formItem} 
                            key={index} 
                            onClick={() => {
                                // Encode the dateTime to make it URL-friendly
                                navigate(`/${formType}-read-only/${patientId}/${form.log_id}`);
                            }} 
                            role="button" 
                            tabIndex="0"
                        >
                        <div className = {styles.formInfo}>
                            <div>
                                Submission Date: {form.date_time}
                            </div>
                            <FontAwesomeIcon icon={faEye} className={styles.eyeIcon} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormsDashboard;
