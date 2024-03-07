import {React, useState} from 'react';
import styles from '../styles/ClientDashboard.module.css';
import texasLogo from '../assets/texas_a_and_m_logo.png'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Dropdown from "./Dropdown";
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PatientDemographics from "./PatientDemographics";
import CommunicationsLogModal from './ConsentForm/CommunicationsLogModal.jsx';
const ClientDashboard = () => {
const navigate = useNavigate();
const [consentFormOptions, setConsentFormOptions] = useState([
    "COMMUNICATIONS LOG",
    "APPOINTMENT LOG (Home Visits)",
    "TALKING POINTS FOR NAVIGATOR HOME VISITORS FOR CONSENT FORMS",
    "WELCOME & ENROLLMENT & CONSENT FORMS COVER LETTER v.2.26.24",
    "ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT & RELEASE OF INFORMATION",
    "Media Appearance Release"
]);
const [substanceUseAssessmentsOptions, setSubstanceUseAssessmentsOptions] = useState([
    "4 P's of Pregnancy",
    "Addiction Belief Scale",
    "CAGE-Aid Screening Tool",
    "CRAFFT Screening Tool",
    "Drug Abuse Screening Test (DAST-10)",
    "Drug Screening Results",
    "Smoking / Tobacco Use before, during Pregnancy and at 1, 3, 6, 9, & 12 Months Postpartum",
    "Substance Use History",
    "TWEAK Test (for alcohol drinking)",
    "SUBSTANCE USE RELAPSE PREVENTION PLAN",
]);  
const [interpersonalRelationsAssessmentsOptions, setInterpersonalRelationsAssessmentsOptions] = useState([
    "Intimate Partner Violence",
    "Domestic Violence Screen for Pediatric Settings",
    "IPV Screening and Assessment Questions",
    "Intimate Partner Violence (IPV) Disclosure Screening Tool",
    "Family Dynamics Social Support Questionnaire (SSQ6)",
]);
const [physicalAssessmentsOptions, setPhysicalAssessmentsOptions] = useState([
    "10 B's: 1 month, 3/6/9/12 month postpartum appointment assessment",
    "Pregnancy spacing Assessment",
]);
const [mentalHealthAssessmentsOptions, setMentalHealthAssessmentsOptions] = useState([
    "Mental Health History / Brief Update form",
    "Columbia Suicide Severity Risk Scale, C-SSRS",
    "Duke University Religion Index (DUREL)",
    "Edinburg Postnatal Depression Scale (EPDS)",
    "Generalized Anxiety Disorder (GAD-7)",
    "Perceived Stress Scale (PSS)",
    "PHQ-9",
]);
const [homeSafetyAssessmentsOptions, setHomeSafetyAssessmentsOptions] = useState([
    "Housing Security Home Visit Form",
    "Food Security",
]);  

const [isCommLogModalOpen, setCommLogModalOpen] = useState(false);

const handleCommLogClick = () => {
    setCommLogModalOpen(true);
};
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
         <Link to="/dashboard" className={styles.dashboardLink}>
         Client Dashboard</Link>
         <button onClick={handleLogout}>Logout</button>
      </nav>
   </header>
   <div className={styles.clientDashboardContainer}>
      <div className={styles.patientSidebar}>
         <h3>Patients (10)</h3>
         <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input type="text" className={styles.searchInput} placeholder="Search for patients" />
         </div>
         <div className={styles.sidebarContent}>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
            <div className={styles.patientSidebarItem}>
               <div className={styles.patientInfo}>
                  <div className={styles.patientName}>First Name Last Name</div>
                  <div className={styles.patientStatusWithIcon}>
                     <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                     No actions required
                  </div>
               </div>
               <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
            </div>
         </div>
      </div>
      <CommunicationsLogModal
          isOpen={isCommLogModalOpen}
          close={() => setCommLogModalOpen(false)}
      />
      <div className = {styles.clientDropdowns}>
         <div className={styles.titleContainer}>
            <span className={styles.title}>First Name Last Name</span>
            <button className={styles.ellipsisBtn} onClick={() => console.log('Button clicked')}>...</button>
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('generalInformation')}>General Information
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.generalInformation && (
            <div className={styles["dropdown-content"]}>
               <div className={styles["generalInfo"]}>
                  <div className={styles["generalInfoBody"]}>
                  <div className={styles["infoBlock"]}>
                     <p><strong>Name:</strong> First Name Last name</p>
                     <p><strong>Date of Birth:</strong> 01/01/2000</p>
                     <p><strong>Gender:</strong> Male</p>
                  </div>
                  <div className={styles["infoBlock"]}>
                     <p><strong>Phone number:</strong> +1(000)-0000-0000</p>
                     <p><strong>Email:</strong> myemail@gmail.com</p>
                  </div>
                  <div className={styles["infoBlock"]}>
                     <p><strong>Address:</strong> 0000 Street Name Drive</p>
                     <p><strong>Zip code:</strong> 00000</p>
                     <p><strong>City, State:</strong> City, State</p>
                     <p><strong>Country:</strong> United States</p>
                  </div>
                  </div>
                  <button className={styles["editButton"]}>Edit</button>
               </div>
            </div>
            )}

         </div>
         <div className={styles.dropdown}>
        <div className={styles["dropdown-btn"]} onClick={(e) => toggleDropdown('consentForm')}>
            Communication Log, Appointment Log, & Consent Forms
            <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {isActive.consentForm && (
            <div className={styles["dropdown-content"]}>
            {consentFormOptions.map((option, index) => (
            <div key={index} className={styles["dropdown-item"]} onClick={() => {
                if (option === "COMMUNICATIONS LOG") {
                    handleCommLogClick();
                }
            }}>
                {option}
            </div>
        ))}
        </div>
        )}
        </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('demographics')}>Demographics
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.demographics && (
            <div className={styles["dropdown-content"]}>
               <div className={styles["dropdown-item"]}>
               <Link to="/participants-demographic-record">Participants Demographics Record</Link>
               </div>
               <div className={styles["dropdown-item"]}>
                  Child Demographics Record
               </div>
            </div>
            )}
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('medical')}>Medical & Nutrition History
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.medical && (
            <div className={styles["dropdown-content"]}>
               <Link to="/parental-medical-history" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Parental Medical History Form</span>
          </Link>
               <div className={styles["dropdown-item"]}>
                  Vue
               </div>
            </div>
            )}
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('currMed')}>Medications
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.currMed && (
            <div className={styles["dropdown-content"]}>
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
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('suh')}>Substance Use Assessments
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.suh && (
            <div className={styles["dropdown-content"]}>
            {substanceUseAssessmentsOptions.map((option, index) => (
                <div key={index} className="dropdownItem">{option}</div>
            ))}
            </div>
            )}
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('InterRel')}>Interpersonal Relations Assessments
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.InterRel && (
            <div className={styles["dropdown-content"]}>
            {interpersonalRelationsAssessmentsOptions.map((option, index) => (
                <div key={index} className="dropdownItem">{option}</div>
            ))}
            </div>
            )}
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('physical')}>Physical Assessments
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.phyical && (
            <div className={styles["dropdown-content"]}>
            {physicalAssessmentsOptions.map((option, index) => (
                <div key={index} className="dropdownItem">{option}</div>
            ))}
            </div>
            )}
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('mental')}>Mental Health Assessments
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.mental && (
            <div className={styles["dropdown-content"]}>
            {mentalHealthAssessmentsOptions.map((option, index) => (
                <div key={index} className="dropdownItem">{option}</div>
            ))}
            </div>
            )}
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('hsa')}>Home Safety Assessments
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.hsa && (
            <div className={styles["dropdown-content"]}>
            {homeSafetyAssessmentsOptions.map((option, index) => (
                <div key={index} className="dropdownItem">{option}</div>
            ))}
            </div>
            )}
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('PrenatalCare')}>Prenatal Care
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.PrenatalCare && (
            <div className={styles["dropdown-content"]}>
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
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('child')}>Child Records
               <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive.child && (
            <div className={styles["dropdown-content"]}>
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
   </div>
</div>
);
};
export default ClientDashboard;