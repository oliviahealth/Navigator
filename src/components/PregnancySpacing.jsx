import React, { useState } from 'react';
import styles from '../styles/PregnancySpacing.module.css';
<<<<<<< HEAD

const PregnancySpacing = () => {
=======
import { useParams } from 'react-router-dom';

const PregnancySpacing = () => {
    const { patientId } = useParams();
>>>>>>> d654d61a81d7169d3815c10a3336e76297ebc581
  const [pregnancySpacing, setPregnancySpacing] = useState('');
  const [familyPlanningInterest, setFamilyPlanningInterest] = useState('');

  const handleSpacingChange = (event) => {
    setPregnancySpacing(event.target.value);
  };

  const handlePlanningChange = (event) => {
    setFamilyPlanningInterest(event.target.value);
  };

<<<<<<< HEAD
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the data, for example, sending it to a server or logging it
    console.log({
      pregnancySpacing,
      familyPlanningInterest
    });
=======
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
        pregnancySpacing: pregnancySpacing,
        familyPlanningInterest: familyPlanningInterest
    }
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/pregnancy_spacing/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully submitted:', data);
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
>>>>>>> d654d61a81d7169d3815c10a3336e76297ebc581
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <h2>Ask the following questions regarding Pregnancy Spacing:</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.question}>
          <label htmlFor="spacing">
            1. Have you had any pregnancies less than 12 months apart?
          </label>
          <input
            type="text"
            id="spacing"
            value={pregnancySpacing}
            onChange={handleSpacingChange}
            className={styles.input}
          />
        </div>
        <div className={styles.question}>
          <label htmlFor="planning">
            2. Are you interested in discussing family planning?
          </label>
          <input
            type="text"
            id="planning"
            value={familyPlanningInterest}
            onChange={handlePlanningChange}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleCancel} className={styles.button}>
            Cancel
          </button>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default PregnancySpacing;
=======
export default PregnancySpacing;
>>>>>>> d654d61a81d7169d3815c10a3336e76297ebc581
