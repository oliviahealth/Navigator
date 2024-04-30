import React, { useState, useEffect } from 'react';
import styles from '../../styles/CageScreening.module.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const CageScreeningReadOnly = ({ onSubmit, onCancel }) => {
  const { patientId, log_id } = useParams();
  const [answers, setAnswers] = useState({
    c: 'no',
    a: 'no',
    g: 'no',
    e: 'no'
  });

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/cage_screening/${patientId}/${log_id}`, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form className={styles.cageScreening}>
      <div className={styles.question}>
        <label>C: Have you ever felt the need to cut down on your drinking or drug use?</label>
        <div>
          <input type="radio" name="c" value="yes" disabled checked={answers.c === 'yes'} /> Yes
          <input type="radio" name="c" value="no" disabled checked={answers.c === 'no'} /> No
        </div>
      </div>
      <div className={styles.question}>
        <label>A: Have people annoyed you by criticizing your drinking or drug use?</label>
        <div>
          <input type="radio" name="a" value="yes" disabled checked={answers.a === 'yes'} /> Yes
          <input type="radio" name="a" value="no" disabled checked={answers.a === 'no'} /> No
        </div>
      </div>
      <div className={styles.question}>
        <label>G: Have you ever felt guilty about drinking or drug use?</label>
        <div>
          <input type="radio" name="g" value="yes" disabled checked={answers.g === 'yes'} /> Yes
          <input type="radio" name="g" value="no" disabled checked={answers.g === 'no'} /> No
        </div>
      </div>
      <div className={styles.question}>
        <label>E: Have you ever felt you needed a drink or used drugs first thing in the morning to steady your nerves or to get rid of a hangover (Eye-Opener)?</label>
        <div>
          <input type="radio" name="e" value="yes" disabled checked={answers.e === 'yes'} /> Yes
          <input type="radio" name="e" value="no" disabled checked={answers.e === 'no'} /> No
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
      </div>
    </form>
  );
};

export default CageScreeningReadOnly;
