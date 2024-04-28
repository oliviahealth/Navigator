import React, { useState, useEffect } from 'react';
import styles from '../../styles/CrafftScreening.module.css';
import { useParams } from 'react-router-dom' 

const CrafftScreeningReadOnly = () => {
  const { patientId, log_id } = useParams();
  const [currentPart, setCurrentPart] = useState('A');

  const handleCancel = () => {
    window.history.back(); 
  };

  const handleNext = () => {
    setCurrentPart((prevPart) => {
      if (prevPart === 'A') return 'B';
      if (prevPart === 'B') return 'C';
      return prevPart;
    });
  };

  const handlePrevious = () => {
    setCurrentPart((prevPart) => {
      if (prevPart === 'C') return 'B';
      if (prevPart === 'B') return 'A';
      return prevPart;
    });
  };

  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [partBAnswers, setPartBAnswers] = useState({
    c: '', r: '', a: '', f1: '', f2: '', t: ''
  });
  const [partCAnswers, setPartCAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7a: '', q7b: '', q7c: '', q7d: ''
  });

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/crafft_screening/${patientId}/${log_id}`, {
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
            setAnswers(data[2].partA)
            setPartBAnswers(data[2].partB)
            setPartCAnswers(data[2].partC)
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  const renderFormPart = () => {
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
    };
  
    const handlePartBChange = (event) => {
      const { name, value } = event.target;
      setPartBAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
    };
  
    const handlePartCChange = (event) => {
      const { name, value } = event.target;
      setPartCAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
    };
  
    const checkAnswers = () => {
      if (answers.q1 > '0' || answers.q2 > '0' || answers.q3 > '0') {
        setCurrentPart('B');
      } else if (answers.q4 > '0') {
        setCurrentPart('C'); 
      }
    };
    
  
    const checkPartBAnswers = () => {
      const yesCount = Object.values(partBAnswers).filter(answer => answer === 'yes').length;
      if (yesCount >= 2) {
        alert('Two or more YES answers suggest a serious problem that needs further assessment.');
      }
    };
  
    const checkPartCAnswers = () => {
      const yesCount = Object.values(partCAnswers).filter(answer => answer === 'yes').length;
      if (yesCount >= 1) {
        alert('One or more YES answers suggest a serious problem with nicotine that needs further assessment.');
      }
    };
  
    if (currentPart === 'A') {
        return (
            <div className={styles.formSection}>
              <div className={styles.formHeader}>Part A</div>
              {/* Question 1 */}
              <label className={styles.question}>
                1) During the PAST 12 MONTHS, on how many days did you:
                <div>Drink more than a few sips of beer, wine, or any drink containing alcohol? Say “0” if none.</div>
                <input type="number" name="q1" value={answers.q1} disabled min="0" className={styles.inputField} />
              </label>
              {/* Question 2 */}
              <label className={styles.question}>
                2) Use any marijuana (cannabis, weed, oil, wax, or hash by smoking, vaping, dabbing, or in edibles) or “synthetic marijuana” (like “K2,” “Spice”)? Say “0” if none.
                <input type="number" name="q2" value={answers.q2} disabled min="0" className={styles.inputField} />
              </label>
              {/* Question 3 */}
              <label className={styles.question}>
                3) Use anything else to get high (like other illegal drugs, pills, prescription or over-the-counter medications, and things that you sniff, huff, vape, or inject)? Say “0” if none.
                <input type="number" name="q3" value={answers.q3} disabled min="0" className={styles.inputField} />
              </label>
              {/* Question 4 */}
              <label className={styles.question}>
                4) Use a vaping device* containing nicotine and/or flavors, or use any tobacco products†? Say “0” if none.
                <input type="number" name="q4" value={answers.q4} disabled min="0" className={styles.inputField} />
              </label>
              <button type="button" onClick={checkAnswers} className={styles.checkButton}>
                Check
              </button>
              <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            </div>
          );          
      } else if (currentPart === 'B') {
        return (
            <div className={styles.formSection}>
              <div className={styles.formHeader}>Part B</div>
              {/* Question C */}
              <div className={styles.question}>
                C: Have you ever ridden in a CAR driven by someone (including yourself) who was “high” or had been using alcohol or drugs?
                <label>
                  Yes
                  <input type="radio" name="c" value="yes" checked={partBAnswers.c === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="c" value="no" checked={partBAnswers.c === 'no'} disabled />
                </label>
              </div>
              {/* Question R */}
              <div className={styles.question}>
                R: Do you ever use alcohol or drugs to RELAX, feel better about yourself, or fit in?
                <label>
                  Yes
                  <input type="radio" name="r" value="yes" checked={partBAnswers.r === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="r" value="no" checked={partBAnswers.r === 'no'} disabled />
                </label>
              </div>
              {/* Question A */}
              <div className={styles.question}>
                A: Do you ever use alcohol or drugs while you are by yourself, or ALONE?
                <label>
                  Yes
                  <input type="radio" name="a" value="yes" checked={partBAnswers.a === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="a" value="no" checked={partBAnswers.a === 'no'} disabled />
                </label>
              </div>
              {/* Question F1 */}
              <div className={styles.question}>
                F: Do you ever FORGET things you did while using alcohol or drugs?
                <label>
                  Yes
                  <input type="radio" name="f1" value="yes" checked={partBAnswers.f1 === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="f1" value="no" checked={partBAnswers.f1 === 'no'} disabled />
                </label>
              </div>
              {/* Question F2 */}
              <div className={styles.question}>
                F: Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use?
                <label>
                  Yes
                  <input type="radio" name="f2" value="yes" checked={partBAnswers.f2 === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="f2" value="no" checked={partBAnswers.f2 === 'no'} disabled />
                </label>
              </div>
              {/* Question T */}
              <div className={styles.question}>
                T: Have you ever gotten into TROUBLE while you were using alcohol or drugs?
                <label>
                  Yes
                  <input type="radio" name="t" value="yes" checked={partBAnswers.t === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="t" value="no" checked={partBAnswers.t === 'no'} disabled />
                </label>
              </div>
              <button type="button" onClick={checkPartBAnswers} className={styles.checkButton}>
                Check
              </button>
              <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            </div>
          );          
      } else if (currentPart === 'C') {
        return (
            <div className={styles.formSection}>
              <div className={styles.formHeader}>Part C</div>
              {/* Question 1 */}
              <div className={styles.question}>
                1. Have you ever tried to QUIT using, but couldn’t?
                <label>
                  Yes
                  <input type="radio" name="q1" value="yes" checked={partCAnswers.q1 === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q1" value="no" checked={partCAnswers.q1 === 'no'} disabled />
                </label>
              </div>
              {/* Question 2 */}
              <div className={styles.question}>
                2. Do you vape or use tobacco NOW because it is really hard to quit?
                <label>
                  Yes
                  <input type="radio" name="q2" value="yes" checked={partCAnswers.q2 === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q2" value="no" checked={partCAnswers.q2 === 'no'} disabled />
                </label>
              </div>
              {/* Question 3 */}
              <div className={styles.question}>
                3. Have you ever felt like you were ADDICTED to vaping or tobacco?
                <label>
                  Yes
                  <input type="radio" name="q3" value="yes" checked={partCAnswers.q3 === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q3" value="no" checked={partCAnswers.q3 === 'no'} disabled />
                </label>
              </div>
              {/* Question 4 */}
              <div className={styles.question}>
                4. Do you ever have strong CRAVINGS to vape or use tobacco?
                <label>
                  Yes
                  <input type="radio" name="q4" value="yes" checked={partCAnswers.q4 === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q4" value="no" checked={partCAnswers.q4 === 'no'} disabled />
                </label>
              </div>
              {/* Question 5 */}
              <div className={styles.question}>
                5. Have you ever felt like you really NEEDED to vape or use tobacco?
                <label>
                  Yes
                  <input type="radio" name="q5" value="yes" checked={partCAnswers.q5 === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q5" value="no" checked={partCAnswers.q5 === 'no'} disabled />
                </label>
              </div>
              {/* Question 6 */}
              <div className={styles.question}>
                6. Is it hard to keep from vaping or using tobacco in PLACES where you are not supposed to, like school?
                <label>
                  Yes
                  <input type="radio" name="q6" value="yes" checked={partCAnswers.q6 === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q6" value="no" checked={partCAnswers.q6 === 'no'} disabled />
                </label>
              </div>
              {/* Sub-questions for Question 7 */}
              <div className={styles.question}>
                7. When you HAVEN’T vaped or used tobacco in a while (or when you tried to stop using)…
                <div>a.) did you find it hard to CONCENTRATE because you couldn’t vape or use tobacco?</div>
                <label>
                  Yes
                  <input type="radio" name="q7a" value="yes" checked={partCAnswers.q7a === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q7a" value="no" checked={partCAnswers.q7a === 'no'} disabled />
                </label>
                <div>b.) did you feel more IRRITABLE because you couldn’t vape or use tobacco?</div>
                <label>
                  Yes
                  <input type="radio" name="q7b" value="yes" checked={partCAnswers.q7b === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q7b" value="no" checked={partCAnswers.q7b === 'no'} disabled />
                </label>
                <div>c.) did you feel a strong NEED or urge to vape or use tobacco?</div>
                <label>
                  Yes
                  <input type="radio" name="q7c" value="yes" checked={partCAnswers.q7c === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q7c" value="no" checked={partCAnswers.q7c === 'no'} disabled />
                </label>
                <div>d.) did you feel NERVOUS, restless, or anxious because you couldn’t vape or use tobacco?</div>
                <label>
                  Yes
                  <input type="radio" name="q7d" value="yes" checked={partCAnswers.q7d === 'yes'} disabled />
                </label>
                <label>
                  No
                  <input type="radio" name="q7d" value="no" checked={partCAnswers.q7d === 'no'} disabled />
                </label>
              </div>
              <button type="button" onClick={checkPartCAnswers} className={styles.checkButton}>
                Check
              </button>
              <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            </div>
          );          
      }      
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <form className={styles.formContainer}>
          {renderFormPart()}

          <div className={styles.buttonContainer}>
            {currentPart !== 'A' && (
              <button type="button" onClick={handlePrevious} className={styles.navigationButton}>
                Previous
              </button>
            )}

            {currentPart !== 'C' && (
              <button type="button" onClick={handleNext} className={styles.navigationButton}>
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrafftScreeningReadOnly;