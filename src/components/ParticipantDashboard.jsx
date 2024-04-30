import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import navStyles from '../styles/ClientDashboard.module.css';
import Styles from '../styles/ParticipantDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCapsules } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import modelOutput from '../assets/model_output.png';

const ImageModal = ({ isOpen, handleClose, src }) => {
    if (!isOpen) return null;
  
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 2
      }} onClick={handleClose}>
        <img src={src} alt="Enlarged model output" style={{ maxHeight: '90%', maxWidth: '90%', zIndex: 3 }} onClick={e => e.stopPropagation()} />
      </div>
    );
  };
  

const ParticipantDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

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

    const [categoryData, setCategoryData] = useState([]);

    const [appointmentData, setAppointmentData] = useState([]);

    const navigate = useNavigate();
    const { patientId } = useParams();

    const processAppointmentData = (data) => {
        const counts = {};
        data.forEach(item => {
            const month = new Date(item.date_time).toLocaleString('default', { month: 'long', year: 'numeric' });
            counts[month] = (counts[month] || 0) + 1;
        });
        setAppointmentData(Object.keys(counts).map(key => ({ month: key, count: counts[key] })));
    };

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

        const fetchCount = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/get_count_tabs/${patientId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.status === 204) { // Handling no content
                    return;
                }
                const data = await response.json();
                setCategoryData(data);

            } catch (error) {
                console.error('Error fetching info:', error);
            }
        };

        fetchCount();

        const getDates = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/forms/appointment_log/${patientId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.status === 204) { // Handling no content
                    return;
                }
                const data = await response.json();
                processAppointmentData(data);

            } catch (error) {
                console.error('Error fetching info:', error);
            }
        };

        getDates();

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
                <div className={Styles.dashboardBox}>
                    <h3>Forms Completed</h3>
                    {categoryData.map((item, index) => (
                        <div key={index}>
                            <h4>{item[0]}</h4>
                            <div className={Styles.progressBarContainer}>
                                <div
                                    className={Styles.progressBar}
                                    style={{ width: `${(item[1] / item[2]) * 100}%` }}
                                >
                                    {Math.round((item[1] / item[2]) * 100)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className={Styles.dashboardBox}>
                    <img src={modelOutput} alt="Model Output" style={{ maxWidth: '100%' }} onClick={toggleModal} />
                </div>

                <ImageModal isOpen={isModalOpen} handleClose={toggleModal} src={modelOutput} />

                <div className={Styles.dashboardBox}>
                    <h3>Appointment Frequency</h3>
                    <BarChart width={500} height={150} data={appointmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" name="Appointments" />
                    </BarChart>
                </div>
            </main>
        </div>
    );
};

export default ParticipantDashboard;