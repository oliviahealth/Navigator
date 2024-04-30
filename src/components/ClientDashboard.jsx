import { React, useState, useEffect } from 'react';
import styles from '../styles/ClientDashboard.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const ClientDashboard = () => {


   const navigate = useNavigate();

   const initialData = {
      name: "First Name Last name",
      dob: "01/01/2000",
      gender: "Male",
      phoneNumber: "+1(000)-0000-0000",
      email: "myemail@gmail.com",
      address: "0000 Street Name Drive",
      zipCode: "00000",
      cityState: "City, State",
      country: "United States"
   }

   const [formData, setFormData] = useState({
      name: "First Name Last name",
      dob: "01/01/2000",
      gender: "Male",
      phoneNumber: "+1(000)-0000-0000",
      email: "myemail@gmail.com",
      address: "0000 Street Name Drive",
      zipCode: "00000",
      cityState: "City, State",
      country: "United States"
   });

   const [selectedPatientIndex, setSelectedPatientIndex] = useState(null);
   const [selectedPatientObj, setSelectedPatientObj] = useState(null);

   const fetch_general_info = async () => {
      const storedIndex = localStorage.getItem('selectedPatientIndex');
      const storedPatient = localStorage.getItem('selectedPatientObj');

      if (storedPatient == null) {
         return;
      }

      if (storedIndex && storedPatient) {
         setSelectedPatientIndex(parseInt(storedIndex, 10)); // Convert string back to number
         setSelectedPatientObj(JSON.parse(storedPatient)); // Parse the JSON string back to an object
      }
      const accessToken = Cookies.get('accessToken');

      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_general_information/${selectedPatientObj.patient_id}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'omit',
         });
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         if (response.status === 204) { // Handling no content
            return;
         }
         const data = await response.json();
         if (data == null) {
            setFormData(initialData);
         } else {
            setFormData(data[2]);
         }

      } catch (error) {
      }
   };


   const [patients, setPatients] = useState([]); // State to store patient data

   const [searchInput, setSearchInput] = useState("");

   const handleSearchChange = (event) => {
      setSearchInput(event.target.value);
   };

   const handleChange = (field, value) => {
      setFormData({
         ...formData,
         [field]: value
      });
   };

   const handleSave = async (event) => {
      event.preventDefault();
      const accessToken = Cookies.get('accessToken');
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/general_information/${selectedPatientObj.patient_id}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'omit',
            body: JSON.stringify(formData),
         });
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const data = await response.json();
      } catch (error) {
         console.error('Failed to submit');
      }
      setIsEditable(false);
   };

   const [isEditable, setIsEditable] = useState(false);

   const handlePatientClick = (index, patient) => {
      setIsActive(false)
      setSelectedPatientIndex(index);
      setSelectedPatientObj(patient);

      localStorage.setItem('selectedPatientIndex', index);
      localStorage.setItem('selectedPatientObj', JSON.stringify(patient));

      const fetchLog = async () => {
         const accessToken = Cookies.get('accessToken');
         try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_general_information/${selectedPatientObj.patient_id}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
               },
               credentials: 'omit',
            });
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
               return;
            }
            const data = await response.json();
            if (data == null) {
               setFormData(initialData);
            } else {
               setFormData(data[2]);
            }


         } catch (error) {
         }
      };

      fetchLog();
   };

   useEffect(() => {
      const storedIndex = localStorage.getItem('selectedPatientIndex');
      const storedPatient = localStorage.getItem('selectedPatientObj');

      if (storedIndex && storedPatient) {
         setSelectedPatientIndex(parseInt(storedIndex, 10)); // Convert string back to number
         setSelectedPatientObj(JSON.parse(storedPatient)); // Parse the JSON string back to an object
      }

      const accessToken = Cookies.get('accessToken');
      const fetchPatients = async () => {
         try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients`, {
               method: 'GET',
               credentials: 'omit',
               headers: {
                  'Authorization': `Bearer ${accessToken}`
               }
            });
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPatients(data); // Assuming the API returns an array of patient objects
         } catch (error) {
            console.error('Error fetching participants');
         }
      };

      fetchPatients();
   }, []);



   const handleLogout = () => {
      Cookies.remove('accessToken');
      localStorage.removeItem('selectedPatientIndex');
      localStorage.removeItem('selectedPatientObj');
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
               <span className={styles.recordName}>Olivia-NAVIGATOR</span>
            </div>
            <nav className={styles.nav}>
               <button
                  className={styles.yourButtonClass}
                  style={{ fontSize: '12px', backgroundColor: 'green' }}
                  onClick={() => {
                     if (selectedPatientObj) {
                        navigate(`/participant-dashboard/${selectedPatientObj.patient_id}`);
                     } else {
                        alert('No participant selected. Please select a participant to proceed.');
                     }
                  }}
               >
                  Participant Dashboard
               </button>

               <button onClick={handleLogout}>Logout</button>
            </nav>
         </header>
         <div className={styles.clientDashboardContainer}>
            <div className={styles.patientSidebar}>
               <h3>Patients ({patients.length})</h3>
               <div className={styles.searchContainer}>

                  <input
                     type="text"
                     className={styles.searchInput}
                     placeholder="Search for patients"
                     value={searchInput}
                     onChange={handleSearchChange}
                  />
               </div>


               <a href="/add-patient">
                  <button>Add Patient</button>
               </a>

               <div className={styles.sidebarContent}>
                  {patients
                     .filter((patient) =>
                        `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchInput.toLowerCase())
                     )
                     .map((patient, index) => (
                        <div key={index}
                           className={`${styles.patientSidebarItem} ${index === selectedPatientIndex ? styles.selectedPatient : ''}`}
                           onClick={() => handlePatientClick(index, patient)}>
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
            {selectedPatientIndex !== null && (
               <div className={styles.clientDropdowns}>
                  <div className={styles.titleContainer}>
                     <span className={styles.title}>
                        {selectedPatientObj.first_name} {selectedPatientObj.last_name}
                     </span>
                  </div>
                  <div className={styles.dropdown}>
                     <div className={styles["dropdown-btn"]} onClick={(e) => {
                        toggleDropdown('generalInformation');
                        fetch_general_info();
                     }}>General Information
                        <FontAwesomeIcon icon={faCaretDown} />
                     </div>
                     {isActive.generalInformation && (
                        <div className={styles["dropdown-content"]}>
                           <div className={styles["generalInfo"]}>
                              <div className={styles["generalInfoBody"]}>
                                 <div className={styles["infoBlock"]}>
                                    <p>
                                       <strong>Name:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="text"
                                             value={formData.name}
                                             onChange={(e) => handleChange("name", e.target.value)}
                                          />
                                       ) : (
                                          formData.name
                                       )}
                                    </p>
                                    <p>
                                       <strong>Date of Birth:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="date"
                                             value={formData.dob}
                                             onChange={(e) => handleChange("dob", e.target.value)}
                                          />
                                       ) : (
                                          formData.dob
                                       )}
                                    </p>
                                    <p>
                                       <strong>Gender:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="text"
                                             value={formData.gender}
                                             onChange={(e) => handleChange("gender", e.target.value)}
                                          />
                                       ) : (
                                          formData.gender
                                       )}
                                    </p>
                                 </div>
                                 <div className={styles["infoBlock"]}>
                                    <p>
                                       <strong>Phone number:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="text"
                                             value={formData.phoneNumber}
                                             onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                          />
                                       ) : (
                                          formData.phoneNumber
                                       )}
                                    </p>
                                    <p>
                                       <strong>Email:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="text"
                                             value={formData.email}
                                             onChange={(e) => handleChange("email", e.target.value)}
                                          />
                                       ) : (
                                          formData.email
                                       )}
                                    </p>
                                 </div>
                                 <div className={styles["infoBlock"]}>
                                    <p>
                                       <strong>Address:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="text"
                                             value={formData.address}
                                             onChange={(e) => handleChange("address", e.target.value)}
                                          />
                                       ) : (
                                          formData.address
                                       )}
                                    </p>
                                    <p>
                                       <strong>Zip code:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="text"
                                             value={formData.zipCode}
                                             onChange={(e) => handleChange("zipCode", e.target.value)}
                                          />
                                       ) : (
                                          formData.zipCode
                                       )}
                                    </p>
                                    <p>
                                       <strong>City, State:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="text"
                                             value={formData.cityState}
                                             onChange={(e) => handleChange("cityState", e.target.value)}
                                          />
                                       ) : (
                                          formData.cityState
                                       )}
                                    </p>
                                    <p>
                                       <strong>Country:</strong>{" "}
                                       {isEditable ? (
                                          <input
                                             type="text"
                                             value={formData.country}
                                             onChange={(e) => handleChange("country", e.target.value)}
                                          />
                                       ) : (
                                          formData.country
                                       )}
                                    </p>
                                 </div>
                              </div>
                              <button
                                 className={styles["editButton"]}
                                 onClick={() => setIsEditable(!isEditable)}
                              >
                                 {isEditable ? "Close" : "Edit"}
                              </button>
                              {isEditable && (
                                 <button className={styles["saveButton"]} onClick={handleSave}>
                                    Save
                                 </button>
                              )}
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
                           <Link to={`/forms-dashboard/communications_log/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Communications Log Form</span>
                           </Link>
                           <Link to={`/forms-dashboard/appointment_log/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Apppointment Log Form</span>
                           </Link>
                           <Link to="/form-cover-letter" className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>WELCOME & ENROLLMENT & CONSENT FORMS COVER LETTER v.2.26.24</span>
                           </Link>
                           <Link to={`/forms-dashboard/release-of-information/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT & RELEASE OF INFORMATION</span>
                           </Link>
                           <Link to={`/forms-dashboard/media-appearance-release/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Media Appearance Release</span>
                           </Link>
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
                           <Link to={`/forms-dashboard/participants-demographic-record/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Participants Demographics Record</Link>
                           <Link to={`/forms-dashboard/demographics-others/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Participant Record for Others Involved</Link>
                           <Link to={`/forms-dashboard/child-demographics/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Child Demographics Record</Link>
                           <Link to={`/forms-dashboard/support-systems/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Support Systems, Strengths, Areas For Improvement & Goals </Link>
                           <Link to={`/forms-dashboard/current-living/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Current Living Arrangement </Link>
                           <Link to={`/forms-dashboard/child-needs/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Child(ren) Needs </Link>
                           <Link to={`/forms-dashboard/referrals-services/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Referrals and Services </Link>
                           <Link to={`/forms-dashboard/emergency-contact/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Emergency Contact Information </Link>
                           <Link to={`/forms-dashboard/goal-planning/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Goal Planning Tool </Link>
                           <Link to={`/forms-dashboard/care-providers/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Care Providers Contact List </Link>
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
                           <Link to={`/forms-dashboard/parental-medical-history/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Parental Medical History Form</span>
                           </Link>
                           <Link to={`/forms-dashboard/encounter-form/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Encounter Form / Home Visit Form - to Assess External Care Provider Encounters/Visits</span>
                           </Link>
                           <Link to={`/forms-dashboard/nut-history/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Nutrition History and Assessment</span>
                           </Link>
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
                           <Link to={`/forms-dashboard/medications/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
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
                        <div className={styles["dropdown-content"]}>
                           <Link to={`/forms-dashboard/pregnancy/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>4 P's of Pregnancy</span>
                           </Link>
                           <Link to={`/forms-dashboard/addiction-belief-scale/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Addiction Belief Scale</span>
                           </Link>
                           <Link to={`/forms-dashboard/cage-screening/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>CAGE-Aid Screening Tool</span>
                           </Link>
                           <Link to={`/forms-dashboard/crafft-screening/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Crafft Screening</span>
                           </Link>
                           <Link to={`/forms-dashboard/drug-abuse-screening/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Drug Abuse Screening</span>
                           </Link>
                           <Link to={`/forms-dashboard/drug-screening-results/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Drug Screening Results</span>
                           </Link>
                           <Link to={`/forms-dashboard/smoking-tobacco-use/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Smoking / Tobacco Use before, during Pregnancy and at 1, 3, 6, 9, & 12 Months Postpartum</span>
                           </Link>
                           <Link to={`/forms-dashboard/substance-use-history/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Substance Use History</span>
                           </Link>
                           <Link to={`/forms-dashboard/tweak-test/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>TWEAK Test (for alcohol drinking)</span>
                           </Link>
                           <Link to={`/forms-dashboard/substance-use-relapse/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>SUBSTANCE USE RELAPSE PREVENTION PLAN</span>
                           </Link>
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
                           <Link to={`/forms-dashboard/partner-violence/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Intimate Partner Violence</span>
                           </Link>
                           <Link to={`/forms-dashboard/domestic-violence/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Domestic Violence Screen for Pediatric Settings</span>
                           </Link>
                           <Link to={`/forms-dashboard/ipv/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>IPV Screening and Assessment Questions</span>
                           </Link>
                           <Link to={`/forms-dashboard/intimate-violence/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Intimate Partner Violence (IPV) Disclosure Screening Tool</span>
                           </Link>
                           <Link to={`/forms-dashboard/family-dynamics/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Family Dynamics Social Support Questionnaire (SSQ6)</span>
                           </Link>
                        </div>
                     )}
                  </div>
                  <div className={styles.dropdown}>
                     <div className={styles["dropdown-btn"]} onClick={(e) =>
                        toggleDropdown('physical')}>Physical Assessments
                        <FontAwesomeIcon icon={faCaretDown} />
                     </div>
                     {isActive.physical && (
                        <div className={styles["dropdown-content"]}>
                           <Link to={`/forms-dashboard/ten-b/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>10 B’s: 1 month, 3/6/9/12 month postpartum appointment assessment</span>
                           </Link>
                           <Link to={`/forms-dashboard/pregnancy-spacing/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Pregnancy spacing Assessment</span>
                           </Link>
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
                           <Link to={`/forms-dashboard/mentalhealthhistory/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Mental Health History / Brief Update Form</Link>
                           <Link to={`/forms-dashboard/cssrs/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Columbia Suicide Severity Risk Scale</Link>
                           <Link to={`/forms-dashboard/durel/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Duke University Religion Index (DUREL)</Link>
                           <Link to={`/forms-dashboard/epds/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Edinburg Postnatal Depression Scale (EPDS)</Link>
                           <Link to={`/forms-dashboard/gad7/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Generalized Anxiety Disorder (GAD-7)</Link>
                           <Link to={`/forms-dashboard/pss/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>Perceived Stress Scale (PSS)</Link>
                           <Link to={`/forms-dashboard/phq9/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>PHQ-9</Link>
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
                           <Link to={`/forms-dashboard/housingVisit/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Housing Security Home Visit Form </span>
                           </Link>
                           <Link to={`/forms-dashboard/housingSafety/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Household Housing Safety Profile </span>
                           </Link>
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
                           <Link to={`/forms-dashboard/prenatal-care/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Prenatal Care</span>
                           </Link>
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
                           <Link to={`/forms-dashboard/asq/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>ASQ-3</span>
                           </Link>
                           <Link to={`/forms-dashboard/brief-child/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Brief Child Wellness Update</span>
                           </Link>
                           <Link to={`/forms-dashboard/delivery-history/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Delivery History Information Update</span>
                           </Link>
                           <Link to={`/forms-dashboard/breastfeeding/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Breastfeeding</span>
                           </Link>
                           <Link to={`/forms-dashboard/infancy-quest/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Infancy Questionnaire</span>
                           </Link>
                           <Link to={`/forms-dashboard/target-child/${selectedPatientObj.patient_id}`} className={styles["dropdown-item"]}>
                              <span className={styles.highlighted}>Target Child Enrollment & Summary Record </span>
                           </Link>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};
export default ClientDashboard;