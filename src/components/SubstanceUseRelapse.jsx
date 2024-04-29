import React, { useState } from 'react';
import styles from '../styles/SubstanceUseRelapse.module.css';
import { useParams } from 'react-router-dom';

const SubstanceUseRelapse = () => {
  const { patientId } = useParams();
  const [formValues, setFormValues] = useState({
    triggers: '',
    skills: '',
    support: '',
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

  const handleSafeCaregiverChange = (index, field, value) => {
    const updatedSafeCaregivers = [...formValues.safeCaregivers];
    updatedSafeCaregivers[index] = { ...updatedSafeCaregivers[index], [field]: value };
    setFormValues({ ...formValues, safeCaregivers: updatedSafeCaregivers });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/substance_use_relapse/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
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

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
              <td><textarea name="triggers" rows="3" value={formValues.triggers} onChange={handleChange}></textarea></td>
            </tr>
            <tr>
              <td><textarea rows="3"></textarea></td>
            </tr>
            <tr>
              <td><textarea rows="3"></textarea></td>
            </tr>
            <tr>
              <td>List 3 skills or things you enjoy doing that can help get your mind off using</td>
            </tr>
            <tr>
              <td><textarea name="skills" rows="3" value={formValues.skills} onChange={handleChange}></textarea></td>
            </tr>
            <tr>
              <td><textarea rows="3"></textarea></td>
            </tr>
            <tr>
              <td><textarea rows="3"></textarea></td>
            </tr>
            <tr>
              <td>List 3 people you can talk to if you are thinking about using</td>
            </tr>
            <tr>
              <td><textarea name="support" rows="3" value={formValues.support} onChange={handleChange}></textarea></td>
            </tr>
            <tr>
              <td><textarea rows="3"></textarea></td>
            </tr>
            <tr>
              <td><textarea rows="3"></textarea></td>
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
                    onChange={(e) => handleSafeCaregiverChange(e, index)} 
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
                    onChange={(e) => handleSafeCaregiverChange(e, index)} 
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
                    onChange={(e) => handleSafeCaregiverChange(e, index)} 
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
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubstanceUseRelapse;