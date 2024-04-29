import React, { useState } from 'react';
import styles from '../styles/MediaAppearanceRelease.module.css';
import { useParams } from 'react-router-dom';

const MediaAppearanceRelease = () => {
  const { patientId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    participant: '',
    address: '',
    participantSignature: '',
    participantPrintedName: '',
    participantDate: '',
    guardianSignature: '',
    guardianPrintedName: '',
    guardianDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/media_appearance_release/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.mediaReleaseForm}>
      <form onSubmit={handleSubmit}>
        {currentPage === 1 && (
          <>
            <h2>MEDIA APPEARANCE RELEASE</h2>
            <p>
            <u>MEDIA APPEARANCE RELEASE</u>
            <br /><br />
            Page 1 of 2
            <br /><br />
            <div className={styles.inputField}>
              <label htmlFor="participant">Participant:</label>
              <input type="text" id="participant" name="participant" className={styles.textInput} value={formData.participant} onChange={handleInputChange} />
  
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" className={styles.textInput} value={formData.address} onChange={handleInputChange} />
            </div>
            1. The Participant consents to the use by Texas A&M University and assigns and grants to System Member the  irrevocable and unconditional power, right, privilege and permission to make, record, produce, edit, modify, reproduce, exhibit,  distribute, publish, publicly or privately display, publicly or privately perform, create derivative works, and transmit by the  means of still photography, live or recorded broadcast, cablecast, webcast, or Internet streaming, broadband, wireless, mobile,  film, videotape, or any other similar mechanical or electronic method (whether now known or invented later) the Participant’s  performance, contribution, appearance, name, voice, picture, likeness, poses, actions and any combination of any of these (the  “Appearance”) in connection with the Program of Excellence for Mothers, Children & Families production conducted by  System Member (the “Project”) which is generally for the purposes of education, instruction, research, publicity, advertising,  and promotion in connection with the Project. Participant also waives any moral or similar rights Participant may have in the Project relating to the Appearance. 
            <br></br><br></br> 
            2. Participant understands that System Member shall have the absolute power and right to copyright the recorded  production (and System Member shall be the owner of such copyright), in whole or in part, of the Project involving Participant  and the Appearance and that such recorded production may be subsequently used, in whole or in part (including but not limited  to any still recordings, images, or screen shots) for any purpose, including but not limited to the purposes described above at any  time and from time to time hereafter throughout the world. 
            <br></br><br></br> 
            3. Participant also understands that there is no compensation or other consideration for appearance or participation in the Project, or for the grant of rights described in this document and that the opportunity to potentially appear in the recorded production related to the Project is sufficient consideration received for this Appearance Release.  
            <br></br><br></br>
            4. Participant releases and discharges System Member, The Texas A&M University System and/or any affiliated  organization, and their respective, regents, officers, employees, agents, and representatives from any and all claims, demands,  causes of action, or liabilities arising out of or in connection with the Appearance or the making, producing, reproducing,  processing, exhibiting, distributing, publishing, transmitting by any means described above or otherwise using the recorded  production relating to the Project or the Appearance (e.g., violation of privacy rights; rights of publicity; false light; libel,  slander, or disparagement; or copyright or trademark infringement).  
            <br></br><br></br>
            5. Participant represents and warrants that Participant has not granted any similar rights to any third party that would conflict with the rights granted to System Member in this Appearance Release. Participant certifies and warrants that Participant is of legal age, has full power, right and authority to enter into this consent and release, has read same in its entirety, understands all of its terms and provisions, and voluntarily and knowingly executes this Appearance Release.  
            </p>
          </>
        )}
        {currentPage === 2 && (
          <>
            <h2>MEDIA APPEARANCE RELEASE</h2>
            <p>Page 2 of 2
                <br /><br />
                PARTICIPANT SIGNATURE:  
                <br /><br />
                <div className={styles.signatureSection}>
                  <div className={styles.participantSignature}>
                      <label htmlFor="participantSignature">Signature:</label>
                      <input type="text" id="participantSignature" name="participantSignature" value={formData.participantSignature} onChange={handleInputChange} />
                  </div>
                  <div className={styles.participantPrintedName}>
                      <label htmlFor="participantPrintedName">Printed Name:</label>
                      <input type="text" id="participantPrintedName" name="participantPrintedName" value={formData.participantPrintedName} onChange={handleInputChange} />
                  </div>
                  <div className={styles.participantDate}>
                      <label htmlFor="participantDate">Date:</label>
                      <input type="date" id="participantDate" name="participantDate" value={formData.participantDate} onChange={handleInputChange} />
                  </div>
                  <hr />
                  IF PARTICIPANT IS UNDER THE AGE OF 18 YEARS, A PARENT OR LEGAL GUARDIAN MUST SIGN BELOW:
                  <br /><br />
                  I agree to all the terms and conditions of this Appearance Release on behalf of myself and my child/ward.
                  <br /><br />
                  <div className={styles.guardianSignature}>
                      <label htmlFor="guardianSignature">Signature (Parent or Legal Guardian):</label>
                      <input type="text" id="guardianSignature" name="guardianSignature" value={formData.guardianSignature} onChange={handleInputChange} />
                  </div>
                  <div className={styles.guardianPrintedName}>
                      <label htmlFor="guardianPrintedName">Printed Name:</label>
                      <input type="text" id="guardianPrintedName" name="guardianPrintedName" value={formData.guardianPrintedName} onChange={handleInputChange} />
                  </div>
                  <div className={styles.guardianDate}>
                      <label htmlFor="guardianDate">Date:</label>
                      <input type="date" id="guardianDate" name="guardianDate" value={formData.guardianDate} onChange={handleInputChange} />
                  </div>
                </div>
            </p>
          </>
        )}
        <div className={styles.buttonSection}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
          {currentPage > 1 && (
            <button type="button" onClick={goToPreviousPage} className={styles.previousButton}>Previous Page</button>
          )}
          {currentPage < 2 && (
            <button type="button" onClick={goToNextPage} className={styles.nextButton}>Next Page</button>
          )}
          {currentPage === 2 && (
            <button type="submit" className={styles.submitButton}>Submit</button>
          )}
        </div>
      </form>
    </div>
  );
  
};

export default MediaAppearanceRelease;
