import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import navStyles from '../styles/ClientDashboard.module.css';
import Styles from '../styles/ParticipantDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCapsules } from '@fortawesome/free-solid-svg-icons';


const ParticipantDashboard = () => {
    const [demographicData, setDemographicData] = useState({
        programStartDate: '',
        caseId: '',
        homeVisitorAssigned: '',
        name: '',
        dob: '',
        address: '',
        zipCode: '',
        phone: '',
        gender: '',
        ethnicity: '',
        race: [],
        primaryLanguage: '',
        otherLanguage: '',
        pregnancyStatus: '',
        maritalStatus: '',
        childAbuse: false,
        substanceAbuse: false,
        tobaccoUse: false,
        lowStudentAchievement: false,
        developmentalDelay: false,
        armedForces: false,
        reEnrollment: false,
        transferFromAnotherSite: false
    });
    const [isDemographics, setIsDemographics] = useState(false);

    const [medications, setMedications] = useState([{ medication: '', dose: '', prescriber: '', notes: '' }]);
    const [isMedications, setIsMedications] = useState(false);

    const navigate = useNavigate();
    const { patientId } = useParams();

    useEffect(() => {
        const fetchDemographics = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/get_demographic_information/${patientId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.status === 204) { // Handling no content
                    return;
                }
                setIsDemographics(true);
                const data = await response.json();
                setDemographicData(data[2])

            } catch (error) {
                console.error('Error fetching support system info:', error);
            }
        };

        fetchDemographics();

        const fetchMedications = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/get_medication_information/${patientId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.status === 204) { // Handling no content
                    return;
                }
                setIsMedications(true);
                const data = await response.json();
                setMedications(data[2]);

            } catch (error) {
                console.error('Error fetching info:', error);
            }
        };

        fetchMedications();

    }, []);

    return (
        <div className={Styles.dashboardContainer}>
            {/* Nav Bar */}
            <header className={navStyles.header}>
                <div className={navStyles.logoContainer}>
                    <span className={navStyles.recordName}>Olivia-NAVIGATOR</span>
                </div>
                <span className={Styles.recordName}>Participant Health Monitoring Dashboard</span>
                <nav className={navStyles.nav}>
                    <button
                        style={{ fontSize: '15px', backgroundColor: 'green' }}
                        onClick={() => {
                            navigate(`/dashboard`);
                        }}
                    >
                        Client Dashboard
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className={Styles.mainContent}>
                <div className={Styles.dashboardBox}>
                    {isDemographics ? (
                        <div>
                            <p><strong>Participant Id: </strong> {patientId} </p>
                            <p><strong>Name:</strong> {demographicData.name}</p>
                            <p><strong>Address:</strong> {demographicData.address}</p>
                            <p><strong>Date of Birth:</strong> {demographicData.dob}</p>
                            <p><strong>Phone Number:</strong> {demographicData.phone}</p>
                        </div>
                    ) : (
                        <p>No Demographic Information for Participant is Present</p>
                    )}
                </div>
                <div className={Styles.dashboardBox}>
                    <h3>Medications</h3>
                    {isMedications && medications.length > 0 ? (
                        <div className={Styles.medicationsList}>
                            {medications.map((med, index) => (
                                <div className={Styles.medicationItem} key={index}>
                                    <FontAwesomeIcon icon={faCapsules} />
                                    <span>{med.medication}</span>
                                    <span>{med.dose}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No Medication Information for Participant is Present</p>
                    )}
                </div>
                <div className={Styles.dashboardBox}>Appointment Frequency</div>
                <div className={Styles.dashboardBox}>MODEL</div>
                <div className={Styles.dashboardBox}>Care Provider Contact List</div>
            </main>
        </div>
    );
};

export default ParticipantDashboard;