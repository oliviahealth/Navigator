import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ClientDashboard.module.css'; // Re-use existing styles or create new ones
import texasLogo from '../assets/texas_a_and_m_logo.png';

const ParticipantsDemographicsRecordForm = () => {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <img src={texasLogo} alt="Texas A&M University Logo" className={styles.universityLogo} />
                    <span className={styles.universityName}>TEXAS A&M UNIVERSITY</span>
                    <span className={styles.recordName}>Electronic Health Records</span>
                </div>
                <nav className={styles.nav}>
                    <Link to="/dashboard" className={styles.dashboardLink}>Client Dashboard</Link>
                    {/* Add any other navigation links here */}
                </nav>
            </header>
            {/* Page-specific content goes here */}
            <div>
                
            </div>
        </div>
    );
};

export default ParticipantsDemographicsRecordForm;
