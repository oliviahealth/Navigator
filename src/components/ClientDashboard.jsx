import {React, useState} from 'react';
import styles from '../styles/ClientDashboard.module.css';
import texasLogo from '../assets/texas_a_and_m_logo.png'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Dropdown from "./Dropdown";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ClientDashboard = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/');
    };

  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = (id) => {
    setIsActive(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
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
      <div className={styles.titleContainer}>
      <span className={styles.title}>First Name Last Name</span>
      <button className={styles.ellipsisBtn} onClick={() => console.log('Button clicked')}>...</button>
    </div>
      <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('generalInformation')}>General Information
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.generalInformation && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('consentForm')}>Consent Form
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.consentForm && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('demographics')}>Demographics
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.demographics && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('medical')}>Medical History
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.medical && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('currMed')}>Current Medication
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.currMed && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('suh')}>Substance Use History
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.suh && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('PrenatalCare')}>Prenatal Care
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.PrenatalCare && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('InterRel')}>Interpersonal Relations
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.InterRel && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('physical')}>Physical Assessment
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.phyical && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('mental')}>Mental Health Assessments
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.mental && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('hsa')}>Home Safety Assessments
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.hsa && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    <div className={styles.dropdown}>
    <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('child')}>Child Records
    <FontAwesomeIcon icon={faCaretDown} />
    </div>
    {isActive.child && (<div className={styles["dropdown-content"]}>
        <div className={styles["dropdown-item"]}>
            React
        </div>
        <div className={styles["dropdown-item"]}>
            Vue
            </div>
        </div>
        )}
    
    </div>
    </div>
  );
};

export default ClientDashboard;
