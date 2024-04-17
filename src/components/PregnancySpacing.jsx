import React, { useState } from 'react';
import styles from '../styles/PregnancySpacing.module.css';

const PregnancySpacing = () => {
  const [pregnancySpacing, setPregnancySpacing] = useState('');
  const [familyPlanningInterest, setFamilyPlanningInterest] = useState('');

  const handleSpacingChange = (event) => {
    setPregnancySpacing(event.target.value);
  };

  const handlePlanningChange = (event) => {
    setFamilyPlanningInterest(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the data, for example, sending it to a server or logging it
    console.log({
      pregnancySpacing,
      familyPlanningInterest
    });
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

export default PregnancySpacing;
