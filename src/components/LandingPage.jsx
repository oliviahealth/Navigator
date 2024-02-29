import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';
import texasLogo from '../assets/texas_a_and_m_logo.png';
import oliviaLogo from '../assets/olivia_health_logo.png';
import ollieHeadLogo from '../assets/ollie_head_logo.png';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const LandingPage = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
  
    const onLoginSuccess = () => {
        setShowLoginModal(false);
    };
  
    const onSignUpSuccess = () => {
        setShowSignUpModal(false);
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
                    <button onClick={() => setShowLoginModal(true)} className="loginButton">Login</button>
                    <button onClick={() => setShowSignUpModal(true)} className={styles.signupButton}>Sign Up</button>
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
                showModal={showLoginModal} // Use showModal instead of show
                setShowModal={setShowLoginModal} // Use setShowModal to match the expected prop in LoginModal
                onLoginSuccess={onLoginSuccess}
            />
            <SignUpModal
                show={showSignUpModal}
                onClose={() => setShowSignUpModal(false)}
                onSignUpSuccess={onSignUpSuccess} 
            />
        </div>
    );
};

export default LandingPage;
