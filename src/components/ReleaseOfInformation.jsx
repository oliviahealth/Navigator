import React, { useState } from 'react';
import styles from '../styles/ReleaseOfInformation.module.css';

const ReleaseOfInformation = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', relationship: '', telephone: '', email: '' }]);

    const addEmergencyContact = () => {
      setEmergencyContacts([
        ...emergencyContacts,
        { name: '', relationship: '', telephone: '', email: '' },
      ]);
    };

    const removeEmergencyContact = (index) => {
        const filteredContacts = emergencyContacts.filter((_, i) => i !== index);
        setEmergencyContacts(filteredContacts);
    };
  
    const handleEmergencyContactChange = (index, field, value) => {
      const updatedContacts = emergencyContacts.map((contact, i) => {
        if (index === i) {
          return { ...contact, [field]: value };
        }
        return contact;
      });
      setEmergencyContacts(updatedContacts);
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleCancel = () => {
        window.history.back();
    };

    if (currentPage === 1) {
        return (
            <div className={styles.releaseForm}>
            <form onSubmit={handleSubmit}>
            <h2>ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT & RELEASE OF INFORMATION</h2>
            <p>
                GC-MOMS is a free community health care program.  The Program provides pregnancy and parenting support to first-time mothers from nurses who visit their homes beginning in early pregnancy through the child’s second birthday.  
                <br></br><br></br>
                Please complete this form to enroll in the Program. 
                <br></br><br></br>
                <u>Program Eligibility</u> 
                <br></br><br></br>
                To participate in the Program, I understand that I must be a resident of the counties served by the program. The following rural counties in Texas are to be served. Lavaca, DeWitt, Jackson, Calhoun, with Victoria as our ‘hub’ county.      
                <br></br><br></br>
                I must be interested in having a child, pregnant or have a new baby in my household less than 1 year old. I can have more than one child in my family and be eligible for the program. There is no income requirement. 
                <br></br><br></br>
                By signing below, I confirm that I meet the Program eligibility requirements, and I agree to provide the Program with any documents necessary to prove my eligibility if that is necessary. 
                <br></br><br></br>
                <u>Your Contact Information</u>
                <br></br><br></br>
                <div className={styles.contactInfo}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" className={styles.fullWidth} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" className={styles.fullWidth} />

                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" className={styles.fullWidth} />

                <label htmlFor="cityStateZip">City/State/Zip</label>
                <input type="text" id="cityStateZip" name="cityStateZip" className={styles.fullWidth} />

                <label htmlFor="homePhone">Home Phone</label>
                <input type="tel" id="homePhone" name="homePhone" className={styles.halfWidth} />

                <label htmlFor="cellPhone">Cell Phone</label>
                <input type="tel" id="cellPhone" name="cellPhone" className={styles.halfWidth} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className={styles.fullWidth} />

                <label htmlFor="dob">Date of birth</label>
                <input type="date" id="dob" name="dob" className={styles.fullWidth} />
                </div>
                <u>Emergency Contact Information </u>
                <br></br><br></br>
                Please list the names and contact information of relatives or friends we may contact in case of emergency. 
                <br></br><br></br>
                <div className={styles.emergencyContact}>
                <p>Please list the names and contact information of relatives or friends we may contact in case of emergency.</p>

                {emergencyContacts.map((contact, index) => (
                <div key={index} className={styles.emergencyContactRow}>
                    <span className={styles.contactNumber}>{index + 1}.</span>
                    <input
                    type="text"
                    placeholder="Name"
                    value={contact.name}
                    onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                    className={styles.thirdWidth}
                    />
                    <input
                    type="text"
                    placeholder="Relationship"
                    value={contact.relationship}
                    onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)}
                    className={styles.thirdWidth}
                    />
                    <input
                    type="tel"
                    placeholder="Telephone"
                    value={contact.telephone}
                    onChange={(e) => handleEmergencyContactChange(index, 'telephone', e.target.value)}
                    className={styles.thirdWidth}
                    />
                    <input
                    type="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => handleEmergencyContactChange(index, 'email', e.target.value)}
                    className={styles.thirdWidth}
                    />
                    <button type="button" onClick={() => removeEmergencyContact(index)} className={styles.removeButton}>Remove</button>
                </div>
                ))}

                <button type="button" onClick={addEmergencyContact} className={styles.addButton}>Add Contact</button>
            </div>
            </p>
                <div className={styles.buttonSection}>
                <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                <button type="button" onClick={goToNextPage} className={styles.nextButton}>Next Page</button>
                </div>
            </form>
            </div>
        );
    }
    else if (currentPage === 2) 
    {
        return (
            <div className={styles.releaseForm}>
            <form onSubmit={handleSubmit}>
            <p>
            <h2>ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT & RELEASE OF INFORMATION</h2>
                <u>Permission to Share Health Information (Release of Information – ROI)</u>
                I allow the Program and Texas A&M University College of Nursing (TAMU-CON) to share health information about me, my child and my family collected during my participation in the GC-MOMS Program as described below. This health information may include names, contact information, birth dates, medical history, treatment records, information from surveys and during visits with my Navigator Home Visitor, and other information collected about me, my child and my family in the Program. 
                <br></br>
                TAMU-CON may share health information about me, my child and my family to others for the following reasons: 
                <ul>
                    <li>TAMU-CON will share health information to the GC-MOMS Program Service Office and the grant funding agency (Health Resources and Services Administration, HRSA) and others that fund or support the Program. They will monitor how the Program helps families and provide TAMU-SON with feedback and support about the Program.</li>  
                    <br></br> 
                    <li>TAMU-CON may share health information with service providers in the community, such as health care and childcare providers, to help me get other services or resources I need.</li> 
                    <br></br> 
                    <li>Navigator Home Visitors in the Program will ask me questions and work with me to fill out forms on behalf of the state of Texas. This information will help them know how this Program is helping families.</li>  
                    <br></br> 
                    <li>GC-MOMS welcomes nursing and other Texas A&M students engaged in an educational purpose, all of whom are under the direct supervision of a privileged staff member. By consenting to [care/treatment], you acknowledge that students may be involved in the care you receive. If you do not want students present during your care, please let an staff member know.</li> 
                    <br></br> 
                    <li>We will keep the information we collect about you for potential use in research projects.  We will remove identifying information before it is shared for research.</li> 
                </ul>
                This permission will remain in effect until I cancel it. I can cancel this permission at any time by notifying the Program in writing at 8441 Riverside Parkway, Clinical Building 1, Rm 3539, Bryan, TX 77807. I understand that use or sharing of my information before I cancel this permission will not be affected.
                <br></br> 
                I understand that this Program is voluntary, and I may refuse to sign this permission form. However, I will not be able to participate in the Program if I do not sign this permission form. I understand that my present or future health care outside of the Program, the payment of my health care or any other benefits to which I have a right will not be affected if I do not sign this permission form. 
                <br></br>
                I understand that refusal to sign this permission form will not prevent sharing my health information as required or permitted by law. I also understand once health information about me, my child and my family has been shared outside TAMU-CON it may no longer be protected by federal or state privacy laws. 
            </p>
            <div className={styles.buttonSection}>
                <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                <button type="button" onClick={goToPreviousPage} className={styles.previousButton}>Previous Page</button>
                <button type="button" onClick={goToNextPage} className={styles.nextButton}>Next Page</button>
            </div>
            </form>
          </div>
        );
    }
    else if (currentPage === 3) 
    {
        return (
            <div className={styles.releaseForm}>
            <form onSubmit={handleSubmit}>
                <p>
                <h2>ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT & RELEASE OF INFORMATION</h2>
                <u>Signature Authorization</u>
                <br></br>
                By signing below:
                <ul> 
                    <li>I confirm that the information provided by me in this enrollment form is correct and that I will provide TAMU-CON with any updates to my information in writing during my participation in the Program.</li> 
                    <li>I agree to participate in the GC-MOMS Program at Texas A&M University College of Nursing.</li> 
                    <li>I have read and understand this enrollment form. I agree to the uses and sharing of health information described above.</li>  
                </ul> 
                </p>
                <div className={styles.signatureSection}>
                    <div className={styles.signatureBlock}>
                        <input type="text" placeholder="Client's Signature" className={styles.signature} />
                        <input type="text" placeholder="Client's Printed Name" className={styles.printName} />
                        <input type="date" className={styles.date} />
                    </div>
                    <div className={styles.signatureBlock}>
                        <input type="text" placeholder="Parent/Legal Guardian Signature" className={styles.signature} />
                        <input type="text" placeholder="Parent/Legal Guardian Printed Name" className={styles.printName} />
                        <input type="date" className={styles.date} />
                    </div>
                    <div className={styles.signatureBlock}>
                        <input type="text" placeholder="GC-MOMS at Texas A&M University College of Nursing Representative Signature" className={styles.signature} />
                        <input type="text" placeholder="Representative Printed Name" className={styles.printName} />
                        <input type="date" className={styles.date} />
                    </div>
                </div>
                <div className={styles.buttonSection}>
                    <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    <button type="button" onClick={goToPreviousPage} className={styles.previousButton}>Previous Page</button>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </div>
            </form>
            </div>
        );
    }
};

export default ReleaseOfInformation;
