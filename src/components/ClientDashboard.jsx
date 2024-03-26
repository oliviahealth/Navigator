import {React, useState, useEffect} from 'react';
import styles from '../styles/ClientDashboard.module.css';
import texasLogo from '../assets/texas_a_and_m_logo.png'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Dropdown from "./Dropdown";
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PatientDemographics from "./PatientDemographics";
// import AppointmentLogModal from './ConsentForm/AppointmentLogModal.jsx';

const ClientDashboard = () => {
const navigate = useNavigate();

const [patients, setPatients] = useState([]); // State to store patient data

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/patients', {
                  method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatients(data); // Assuming the API returns an array of patient objects
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []); 


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

         <a href="/add-patient">
            <button>Add Patient</button>
         </a>

         <div className={styles.sidebarContent}>
         {patients.map((patient, index) => (
                        <div key={index} className={styles.patientSidebarItem}>
                            <div className={styles.patientInfo}>
                                <div className={styles.patientName}>{patient.first_name} {patient.last_name}</div>
                                <div className={styles.patientStatusWithIcon}>
                                    <FontAwesomeIcon icon={faCheckCircle} className={styles.statusIcon} />
                                    No actions required
                                </div>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
                        </div>
                    ))}
         </div>



      </div>
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
                <Link to="/communications-log" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>Communications Log Form</span>
                </Link>
            <div className={styles["dropdown-item"]}>
                <Link to="/apppointment-log" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>Apppointment Log Form</span>
                </Link>
            </div>
            <div className={styles["dropdown-item"]}>
                <Link to="/form-cover-letter" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>WELCOME & ENROLLMENT & CONSENT FORMS COVER LETTER v.2.26.24</span>
                </Link>
            </div>
            <div className={styles["dropdown-item"]}>
                <Link to="/release-of-information" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT & RELEASE OF INFORMATION</span>
                </Link>
            </div>
            <div className={styles["dropdown-item"]}>
                <Link to="/media-appearance-release" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>Media Appearance Release</span>
                </Link>
            </div>

        {/* <AppointmentLogModal
            isOpen={isAppointmentLogModalOpen}
            toggleModal={() => setAppointmentLogModalOpen(false)}
            onSubmit={handleSubmitAppointmentLog}
            onCancel={handleCancelAppointmentLog}
            appointmentLogs={appointmentLogs}
            setAppointmentLogs={setAppointmentLogs}
        /> */}
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
                  <Link to="/demographics-others">Participant Record for Others Involved</Link>
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
               <Link to="/encounter-form" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Encounter Form / Home Visit Form - to Assess External Care Provider Encounters/Visits</span>
          </Link>
               </div>
               <div className={styles["dropdown-item"]}>
               <Link to="/nut-history" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Nutrition History and Assessment</span>
          </Link>
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
            <div className={styles["dropdown-item"]}>
                <Link to="/medications" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>Medications</span>
                </Link>
            </div>
            )}
         </div>
         <div className={styles.dropdown}>
            <div className={styles["dropdown-btn"]} onClick={(e) =>
               toggleDropdown('suh')}>Substance Use Assessments
               <FontAwesomeIcon icon={faCaretDown} />
            </div> 
            {isActive.suh && (
            <div className={styles["dropdown-item"]}>
                <Link to="/pregnancy" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>4 P's of Pregnancy</span>
                </Link>
                <div className={styles["dropdown-item"]}>
                <Link to="/addiction-belief-scale" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>Addiction Belief Scale</span>
                </Link>
                </div>
                <div className={styles["dropdown-item"]}>
                <Link to="/cage-screening" className={styles["dropdown-item"]}>
                    <span className={styles.highlighted}>CAGE-Aid Screening Tool</span>
                </Link>
            </div>
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
               <Link to="/prenatal-care" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Prenatal Care</span>
          </Link>
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
               <Link to="/asq" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>ASQ-3</span>
          </Link>
               </div>
               <div className={styles["dropdown-item"]}>
               <Link to="/brief-child" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Brief Child Wellness Update</span>
          </Link>
               </div>
               <div className={styles["dropdown-item"]}>
               <Link to="/delivery-history" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Delivery History Information Update</span>
          </Link>
               </div>
               <div className={styles["dropdown-item"]}>
               <Link to="/breastfeeding" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Breastfeeding</span>
          </Link>
               </div>
               <div className={styles["dropdown-item"]}>
               <Link to="/infancy-quest" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Infancy Questionnaire</span>
          </Link>
               </div>
               <div className={styles["dropdown-item"]}>
               <Link to="/target-child" className={styles["dropdown-item"]}>
            <span className={styles.highlighted}>Target Child Enrollment & Summary Record </span>
          </Link>
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