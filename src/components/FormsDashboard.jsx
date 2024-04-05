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

    var formNames = {
        "communications_log": "Communication Log",
        "appointment_log": "Appointments Log",
    };

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/forms/${formType}/${patientId}`, {
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
                    <span className={navStyles.recordName}>Electronic Health Records</span>
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
