import React, { useState, useEffect } from 'react';
import styles from '../../styles/PregnancySpacing.module.css';
import { useParams } from 'react-router-dom';

const PregnancySpacingReadOnly = () => {
    const { patientId, log_id } = useParams();
  const [pregnancySpacing, setPregnancySpacing] = useState('');
  const [familyPlanningInterest, setFamilyPlanningInterest] = useState('');

  const handleSpacingChange = (event) => {
    setPregnancySpacing(event.target.value);
  };

  const handlePlanningChange = (event) => {
    setFamilyPlanningInterest(event.target.value);
  };

  const handleCancel = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/pregnancy_spacing/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                return; 
            }
            const data = await response.json();
            setPregnancySpacing(data[2].pregnancySpacing);
            setFamilyPlanningInterest(data[2].familyPlanningInterest)
            
        } catch (error) {
            console.error('failed to fetch');
        }
    };

    fetchLog();
}, [patientId, log_id]);

  return (
    <div className={styles.container}>
      <h2>Ask the following questions regarding Pregnancy Spacing:</h2>
      <form>
        <div className={styles.question}>
          <label htmlFor="spacing">
            1. Have you had any pregnancies less than 12 months apart?
          </label>
          <input
            type="text"
            id="spacing"
            value={pregnancySpacing}
            disabled
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
        </div>
      </form>
    </div>
  );
};

export default PregnancySpacingReadOnly;