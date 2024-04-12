import React, { useState, useEffect } from 'react';
import styles from '../../styles/DrugAbuseScreening.module.css';
import { useParams } from 'react-router-dom';

const DrugAbuseScreeningReadOnly = () => {
    const { patientId, log_id } = useParams();
  const [answers, setAnswers] = useState(new Array(10).fill('0'));
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/drug_abuse_screening/${patientId}/${log_id}`, {
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
            setAnswers(data.data)
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  

  const [showModal, setShowModal] = useState(false);

  const handleOptionChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleCancel = () => {
    window.history.back();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getSuggestedAction = (score) => {
    if (score === 0) return 'None at this time';
    if (score <= 2) return 'Monitor, re-assess at a later date';
    if (score <= 5) return 'Further investigation';
    if (score <= 8) return 'Intensive assessment';
    return 'Intensive assessment';
  };

  return (
    <div className={styles.container}>
      <form>
        <p>Drug Abuse Screening Test (DAST-10)</p>
        <p>
        I’m going to read you a list of questions concerning information about your potential involvement with drugs, excluding alcohol and tobacco, during the past 12 months.  
        <br></br>
        <br></br>
        When the words “drug abuse” are used, they mean the use of prescribed or over‐the‐counter medications/drugs in excess of the directions and any non‐medical use of drugs. The various classes of drugs may include: cannabis (e.g., marijuana, hash), solvents, tranquilizers (e.g., Valium), barbiturates, cocaine, stimulants (e.g., speed), hallucinogens (e.g., LSD) or narcotics (e.g., heroin). Remember that the questions do not include alcohol or tobacco.  
        <br></br>
        <br></br>
        If you have difficulty with a statement, then choose the response that is mostly right. You may choose to answer or not answer any of the questions in this section.  
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Question</th>
              <th>No</th>
              <th>Yes</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index} className={styles.questionRow}>
                <td>{question}</td>
                <td>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="0"
                    checked={answers[index] === '0'}
                    onChange={() => handleOptionChange(index, '0')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="1"
                    checked={answers[index] === '1'}
                    onChange={() => handleOptionChange(index, '1')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const questions = [
    'Have you used drugs other than those required for medical reasons?',
    'Do you abuse more than one drug at a time?',
    'Are you always able to stop using drugs when you want to? (If never use drugs, answer “Yes.”)',
    'Have you had “blackouts” or “flashbacks” as a result of drug use?',
    'Do you ever feel bad or guilty about your drug use? (If never use drugs, choose “No.”)',
    'Does your spouse or (or parents) ever complain about your involvement with drugs?',
    'Have you neglected your family because of your use of drugs?',
    'Have you engaged in illegal activities in order to obtain drugs?',
    'Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?',
    'Have you had medical problems as a result of your drug use (e.g., memory loss, hepatitis, convulsions, bleeding, etc.)?'
  ];
  

export default DrugAbuseScreeningReadOnly;