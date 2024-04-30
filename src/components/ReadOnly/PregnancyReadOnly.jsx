import React, { useState, useEffect } from 'react';
import styles from '../../styles/Pregnancy.module.css';
import { useParams } from 'react-router-dom';

const PregnancyReadOnly = () => {
  const { patientId, log_id } = useParams();

  const questions = [
    "Have you ever used drugs or alcohol during this Pregnancy?",
    "Have you had a problem with drugs or alcohol in the Past?",
    "Does your Partner have a problem with drugs or alcohol?",
    "Do you consider one of your Parents to be an addict or alcoholic?"
  ];

  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [showPopup, setShowPopup] = useState(false);
  const [assessment, setAssessment] = useState('');

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/pregnancy/${patientId}/${log_id}`, {
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
            setAnswers(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  const handleRadioChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleCancel = () => {
    window.history.back();
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.pregnancyForm}>
      <h2>4 P’s of Pregnancy:</h2>
      <form>
        {questions.map((question, index) => (
          <div key={index} className={styles.question}>
            <p>{question}</p>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="yes"
                checked={answers[index] === 'yes'}
                disabled
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="no"
                checked={answers[index] === 'no'}
                disabled
              /> No
            </label>
          </div>
        ))}
        <div className={styles.buttonSection}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
      {showPopup && (
        <div className={styles.popup}>
          <button onClick={closePopup} className={styles.closeButton}>x</button>
          <p>{assessment}</p>
        </div>
      )}
    </div>
  );
};

export default PregnancyReadOnly;
