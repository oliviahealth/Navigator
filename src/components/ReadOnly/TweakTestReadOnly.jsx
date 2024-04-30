import React, { useState, useEffect } from 'react';
import styles from '../../styles/TweakTest.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const TweakTestReadOnly = () => {
  const { patientId, log_id } = useParams();
  const [answers, setAnswers] = useState({
    tolerance: '',
    worried: false,
    eyeOpeners: false,
    amnesia: false,
    kutDown: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAnswers({
      ...answers,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const calculateScore = () => {
    let score = 0;
    score += answers.tolerance >= 6 ? 2 : 0;
    score += answers.worried ? 2 : 0;
    score += answers.eyeOpeners ? 1 : 0;
    score += answers.amnesia ? 1 : 0;
    score += answers.kutDown ? 1 : 0;
    return score;
  };

  const handleCancel = () => {
    window.history.back();
  };

  useEffect(() => {
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
            <input
              type="checkbox"
              name="worried"
              checked={answers.worried}
              disabled
            />
          </label>
        </div>

        <div className={styles.question}>
          <label>
            E. Eye openers: Do you sometimes take a drink in the morning when you first get up?
            <input
              type="checkbox"
              name="eyeOpeners"
              checked={answers.eyeOpeners}
              disabled
            />
          </label>
        </div>

        <div className={styles.question}>
          <label>
            A: Amnesia: Has a friend or family member ever told you about things you said or did while you were drinking that you could not remember?
            <input
              type="checkbox"
              name="amnesia"
              checked={answers.amnesia}
              disabled
            />
          </label>
        </div>

        <div className={styles.question}>
          <label>
            K. Kut down: Do you sometimes feel the need to cut down on your drinking?
            <input
              type="checkbox"
              name="kutDown"
              checked={answers.kutDown}
              disabled
            />
          </label>
        </div>

        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
      </form>
    </div>
  );
};

export default TweakTestReadOnly;