import React, { useState, useEffect } from 'react';
import styles from '../../styles/TweakTest.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const TweakTestReadOnly = () => {
  const { patientId, log_id } = useParams();
  const [answers, setAnswers] = useState({
    tolerance: '',
    worried: '',
    eyeOpeners: '',
    amnesia: '',
    kutDown: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnswers({
      ...answers,
      [name]: value
    });
  };  

  const calculateScore = () => {
    let score = 0;
    // Question 1: Tolerance
    if (answers.tolerance >= 6) {
      score += 2;
    }
    // Question 2: Worried
    if (answers.worried === 'yes') {
      score += 2;
    }
    // Question 3: Eye openers
    if (answers.eyeOpeners === 'yes') {
      score += 1;
    }
    // Question 4: Amnesia
    if (answers.amnesia === 'yes') {
      score += 1;
    }
    // Question 5: Kut down
    if (answers.kutDown === 'yes') {
      score += 1;
    }
    if (score >= 2) {
      alert("You scored " + score + ". You meet the criteria for likely harmful drinking and are recommended to submit to a further and more stringent medical evaluation.");
    }
  };
  

  const handleCancel = () => {
    window.history.back();
  };

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const fetchLog = async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/tweak_test/${patientId}/${log_id}`, {
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
            setAnswers(data[2])
            
        } catch (error) {
            console.error('failed to fetch');
        }
    };

    fetchLog();
}, [patientId, log_id]);

  return (
    <div className={styles.tweakTest}>
      <form>
        <h1>TWEAK Test (for alcohol drinking)</h1>
        <div className={styles.question}>
          <label>
            T. Tolerance: How many drinks can you "hold?" (6 or more indicates tolerance)
            <input
              type="number"
              name="tolerance"
              value={answers.tolerance}
              disabled
              min="0"
            />
          </label>
        </div>

        <div className={styles.question}>
          <label>
            W. Worried: Have close friends or relatives worried or complained about your drinking in the past year?
            <label>
              <input
                type="radio"
                name="worried"
                value="yes"
                checked={answers.worried === 'yes'}
                disabled
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="worried"
                value="no"
                checked={answers.worried === 'no'}
                disabled
              /> No
            </label>
            <label>
              <input
                type="radio"
                name="worried"
                value="n/a"
                checked={answers.worried === 'n/a'}
                disabled
              /> N/A
            </label>
          </label>
        </div>

        <div className={styles.question}>
          <label>
            E. Eye openers: Do you sometimes take a drink in the morning when you first get up?
            <label>
              <input
                type="radio"
                name="eyeOpeners"
                value="yes"
                checked={answers.eyeOpeners === 'yes'}
                disabled
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="eyeOpeners"
                value="no"
                checked={answers.eyeOpeners === 'no'}
                disabled
              /> No
            </label>
            <label>
              <input
                type="radio"
                name="eyeOpeners"
                value="n/a"
                checked={answers.eyeOpeners === 'n/a'}
                disabled
              /> N/A
            </label>
          </label>
        </div>

        <div className={styles.question}>
          <label>
            A: Amnesia: Has a friend or family member ever told you about things you said or did while you were drinking that you could not remember?
            <label>
              <input
                type="radio"
                name="amnesia"
                value="yes"
                checked={answers.amnesia === 'yes'}
                disabled
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="amnesia"
                value="no"
                checked={answers.amnesia === 'no'}
                disabled
              /> No
            </label>
            <label>
              <input
                type="radio"
                name="amnesia"
                value="n/a"
                checked={answers.amnesia === 'n/a'}
                disabled
              /> N/A
            </label>
          </label>
        </div>

        <div className={styles.question}>
          <label>
            K. Kut down: Do you sometimes feel the need to cut down on your drinking?
            <label>
              <input
                type="radio"
                name="kutDown"
                value="yes"
                checked={answers.kutDown === 'yes'}
                disabled
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="kutDown"
                value="no"
                checked={answers.kutDown === 'no'}
                disabled
              /> No
            </label>
            <label>
              <input
                type="radio"
                name="kutDown"
                value="n/a"
                checked={answers.kutDown === 'n/a'}
                disabled
              /> N/A
            </label>
          </label>
        </div>

        <button type="button" onClick={calculateScore} styles={{"backgroundColor": "blue"}} className={styles.cancelButton}>Check Score</button>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
      </form>
    </div>
  );
};

export default TweakTestReadOnly;