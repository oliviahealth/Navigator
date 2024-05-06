import React, { useState, useEffect } from 'react';
import styles from '../../styles/SubstanceUseRelapse.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const SubstanceUseRelapseReadOnly = () => {
  const { patientId, log_id } = useParams();
  const [formValues, setFormValues] = useState({
    triggers_one: '',
    triggers_two: '',
    triggers_three: '',
    skills_one: '',
    skills_two: '',
    skills_three: '',
    support_one: '',
    support_two: '',
    support_three: '',
    safeCaregivers: [
      { name: '', contactNumber: '', relationship: '' },
      { name: '', contactNumber: '', relationship: '' }
    ],
    naloxone: '',
    supportNaloxone: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSafeCaregiverChange = (event, index, field) => {
    const value = event.target.value;
    const updatedSafeCaregivers = [...formValues.safeCaregivers];
    updatedSafeCaregivers[index][field] = value;
    setFormValues({ ...formValues, safeCaregivers: updatedSafeCaregivers });
  };  

  const handleCancel = () => {
    window.history.back();
  };

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const fetchLog = async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/substance_use_relapse/${patientId}/${log_id}`, {
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
            setFormValues(data[2])
            
        } catch (error) {
            console.error('failed to fetch');
        }
    };

    fetchLog();
}, [patientId, log_id]);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h1>SUBSTANCE USE RELAPSE PREVENTION PLAN</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>
                RELAPSE PREVENTION PLAN <br></br>
                Complete with Participant: <br></br>
                Follow up with, as indicated, Provider, Recovery Coach, Social Worker, Case Manager, etc.
              </td>
            </tr>
            <tr>
              <td>List 3 things that you know trigger your desire to use</td>
            </tr>
            <tr>
              <td>1. <textarea name="triggers_one" rows="3" value={formValues.triggers_one} disabled></textarea></td>
            </tr>
            <tr>
              <td>2. <textarea name="triggers_two" rows="3" value={formValues.triggers_two} disabled></textarea></td>
            </tr>
            <tr>
              <td>3. <textarea name="triggers_three" rows="3" value={formValues.triggers_three} disabled></textarea></td>
            </tr>
            <tr>
              <td>List 3 skills or things you enjoy doing that can help get your mind off using</td>
            </tr>
            <tr>
              <td>1. <textarea name="skills_one" rows="3" value={formValues.skills_one} disabled></textarea></td>
            </tr>
            <tr>
              <td>2. <textarea name="skills_two" rows="3" value={formValues.skills_two} disabled></textarea></td>
            </tr>
            <tr>
              <td>3. <textarea name="skills_three" rows="3" value={formValues.skills_three} disabled></textarea></td>
            </tr>
            <tr>
              <td>List 3 people you can talk to if you are thinking about using</td>
            </tr>
            <tr>
              <td>1. <textarea name="support_one" rows="3" value={formValues.support_one} disabled></textarea></td>
            </tr>
            <tr>
              <td>2. <textarea name="support_two" rows="3" value={formValues.support_two} disabled></textarea></td>
            </tr>
            <tr>
              <td>3. <textarea name="support_three" rows="3" value={formValues.support_three} disabled></textarea></td>
            </tr>
          </tbody>
        </table>

        <br></br><br></br>

        <table className={styles.table}>
          <tbody>
            <tr>
              <td colSpan="3">SAFE CAREGIVERS</td>
            </tr>
            <tr>
              <td colSpan="3">A safe caregiver is a person you choose to leave your baby with in case of a relapse. Ensure the safe caregiver you choose has patience with your baby and a safe place for your baby to sleep. Also, they should not have a history of violence or drug/alcohol abuse. It should also be someone you have spoken to and supports you.</td>
            </tr>
            <tr>
              <td colSpan="3">In the case I relapse, my safe caregivers will be:</td>
            </tr>
            {formValues.safeCaregivers.map((caregiver, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>Name:</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={caregiver.name}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Contact Number:</td>
                  <td>
                    <input
                      type="text"
                      name="contactNumber"
                      placeholder="Enter Contact Number"
                      value={caregiver.contactNumber}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Relationship:</td>
                  <td>
                    <input
                      type="text"
                      name="relationship"
                      placeholder="Enter Relationship"
                      value={caregiver.relationship}
                      disabled
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
            <tr>
              <td colSpan="3">NALOXONE (OPIOID REVERSAL MEDICATION)</td>
            </tr>
            <tr>
              <td colSpan="3">Please check the box that applies for each statement</td>
            </tr>
            <tr>
              <td colSpan="3">I have Naloxone (opioid overdose reversal drug), and I know how to use it.</td>
            </tr>
            <tr>
              <td><input type="radio" name="naloxone" value="yes" /> Yes</td>
              <td><input type="radio" name="naloxone" value="no" /> No</td>
            </tr>
            <tr>
              <td colSpan="3">I have a support person who has Naloxone (opioid overdose drug) and knows how to use it.</td>
            </tr>
            <tr>
              <td><input type="radio" name="supportNaloxone" value="yes" /> Yes</td>
              <td><input type="radio" name="supportNaloxone" value="no" /> No</td>
            </tr>
          </tbody>
        </table>


        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubstanceUseRelapseReadOnly;