import React, { useState, useEffect } from 'react';
import styles from '../../styles/CageScreening.module.css';
import { useParams } from 'react-router-dom';

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
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/cage_screening/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                console.log("No support system info found for the selected patient.");
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
          <input type="radio" name="c" value="yes" onChange={handleInputChange} checked={answers.c === 'yes'} /> Yes
          <input type="radio" name="c" value="no" onChange={handleInputChange} checked={answers.c === 'no'} /> No
        </div>
      </div>
      <div className={styles.question}>
        <label>A: Have people annoyed you by criticizing your drinking or drug use?</label>
        <div>
          <input type="radio" name="a" value="yes" onChange={handleInputChange} checked={answers.a === 'yes'} /> Yes
          <input type="radio" name="a" value="no" onChange={handleInputChange} checked={answers.a === 'no'} /> No
        </div>
      </div>
      <div className={styles.question}>
        <label>G: Have you ever felt guilty about drinking or drug use?</label>
        <div>
          <input type="radio" name="g" value="yes" onChange={handleInputChange} checked={answers.g === 'yes'} /> Yes
          <input type="radio" name="g" value="no" onChange={handleInputChange} checked={answers.g === 'no'} /> No
        </div>
      </div>
      <div className={styles.question}>
        <label>E: Have you ever felt you needed a drink or used drugs first thing in the morning to steady your nerves or to get rid of a hangover (Eye-Opener)?</label>
        <div>
          <input type="radio" name="e" value="yes" onChange={handleInputChange} checked={answers.e === 'yes'} /> Yes
          <input type="radio" name="e" value="no" onChange={handleInputChange} checked={answers.e === 'no'} /> No
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
      </div>
    </form>
  );
};

export default CageScreeningReadOnly;
