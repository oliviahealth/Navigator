import React, { useState } from 'react';
import styles from '../styles/Pregnancy.module.css';
import { useParams } from 'react-router-dom';

const Pregnancy = () => {
  const { patientId } = useParams();
  const questions = [
    "Have you ever used drugs or alcohol during this Pregnancy?",
    "Have you had a problem with drugs or alcohol in the Past?",
    "Does your Partner have a problem with drugs or alcohol?",
    "Do you consider one of your Parents to be an addict or alcoholic?"
  ];

  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [showPopup, setShowPopup] = useState(false);
  const [assessment, setAssessment] = useState('');

  const handleRadioChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/pregnancy/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
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

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.pregnancyForm}>
      <h2>4 P’s of Pregnancy:</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className={styles.question}>
            <p>{question}</p>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="yes"
                onChange={() => handleRadioChange(index, 'yes')}
                checked={answers[index] === 'yes'}
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="no"
                onChange={() => handleRadioChange(index, 'no')}
                checked={answers[index] === 'no'}
              /> No
            </label>
          </div>
        ))}
        <div className={styles.buttonSection}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
          <button type="submit" className={styles.submitButton}>Submit</button>
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

export default Pregnancy;
