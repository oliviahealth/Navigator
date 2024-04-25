import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';
import oliviaLogo from '../assets/olivia_health_logo.png';
import ollieHeadLogo from '../assets/ollie_head_logo.png';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';


const LandingPage = () => {
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onLoginSuccess = () => {
        setShowLoginModal(false);
        setIsAuthenticated(true);
        navigate("/dashboard");
    };

    const onSignUpSuccess = () => {
        setShowSignUpModal(false);
        setIsAuthenticated(true); 
        navigate("/dashboard");
    };

    return (
        <div className={styles.ehrLandingPage}>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <span className={styles.recordName}>Olivia-NAVIGATOR</span>
                </div>
                <nav className={styles.nav}>
                    {isAuthenticated && <Link to="/dashboard" className={styles.dashboardLink}>Client Dashboard</Link>} {/* Conditionally render this link */}
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
                showModal={showLoginModal}
                setShowModal={setShowLoginModal}
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
