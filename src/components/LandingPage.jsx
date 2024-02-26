import React, { useState } from 'react';
import styles from '../styles/LandingPage.module.css'; 
import texasLogo from '../assets/texas_a_and_m_logo.png'; 
import oliviaLogo from '../assets/olivia_health_logo.png'; 
import ollieHeadLogo from '../assets/ollie_head_logo.png'; 
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
  
    const onLoginSuccess = () => {
      setShowModal(false);
    };
    
  return (
    <div className={styles.ehrLandingPage}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={texasLogo} alt="Texas A&M University Logo" className={styles.universityLogo} />
          <span className={styles.universityName}>TEXAS A&M UNIVERSITY</span>
          <span className={styles.recordName}>Electronic Health Records</span>
        </div>
        <nav className={styles.nav}>
            <Link to="/dashboard" className={styles.dashboardLink}>Client Dashboard</Link>
            <button onClick={() => setShowModal(true)} className="loginButton">Login</button>
            <a href="/signup" className={styles.signupLink}>Sign Up</a>
        </nav>
      </header>
      <main className={styles.mainContent}>
        <img src={oliviaLogo} alt="Olivia Health Logo" className={styles.imagePlaceholder} />
        <div className={styles.ollieContainer}>
          <span className={styles.oliviaText}>Olivia</span>
          <span className={styles.healthText}>Health</span>
        </div>
        <img src={ollieHeadLogo} alt="Ollie Head Logo" className={styles.ollieHead} />
      </main>
        <LoginModal
            showModal={showModal}
            setShowModal={setShowModal}
            onLoginSuccess={onLoginSuccess}
        />
    </div>
  );
};

export default LandingPage;
