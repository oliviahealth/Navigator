import React from 'react';
import styles from '../styles/ClientDashboard.module.css';
import texasLogo from '../assets/texas_a_and_m_logo.png'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/');
    };
  return (
    <div className={styles.clientDashboard}>
        <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={texasLogo} alt="Texas A&M University Logo" className={styles.universityLogo} />
          <span className={styles.universityName}>TEXAS A&M UNIVERSITY</span>
          <span className={styles.recordName}>Electronic Health Records</span>
        </div>
        <nav className={styles.nav}>
          <Link to="/dashboard" className={styles.dashboardLink}>Client Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
    </div>
  );
};

export default ClientDashboard;
