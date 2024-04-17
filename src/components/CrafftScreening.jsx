import React, { useState } from 'react';
import styles from '../styles/CrafftScreening.module.css';
import { useParams } from 'react-router-dom' 

const CrafftScreening = () => {
  const { patientId } = useParams();
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

  const [allAnswers, setAllAnswers] = useState();
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [partBAnswers, setPartBAnswers] = useState({
    c: '', r: '', a: '', f1: '', f2: '', t: ''
  });
  const [partCAnswers, setPartCAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7a: '', q7b: '', q7c: '', q7d: ''
  });

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
                <input type="number" name="q1" value={answers.q1} onChange={handleChange} min="0" className={styles.inputField} />
              </label>
              {/* Question 2 */}
              <label className={styles.question}>
                2) Use any marijuana (cannabis, weed, oil, wax, or hash by smoking, vaping, dabbing, or in edibles) or “synthetic marijuana” (like “K2,” “Spice”)? Say “0” if none.
                <input type="number" name="q2" value={answers.q2} onChange={handleChange} min="0" className={styles.inputField} />
              </label>
              {/* Question 3 */}
              <label className={styles.question}>
                3) Use anything else to get high (like other illegal drugs, pills, prescription or over-the-counter medications, and things that you sniff, huff, vape, or inject)? Say “0” if none.
                <input type="number" name="q3" value={answers.q3} onChange={handleChange} min="0" className={styles.inputField} />
              </label>
              {/* Question 4 */}
              <label className={styles.question}>
                4) Use a vaping device* containing nicotine and/or flavors, or use any tobacco products†? Say “0” if none.
                <input type="number" name="q4" value={answers.q4} onChange={handleChange} min="0" className={styles.inputField} />
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
                  <input type="radio" name="c" value="yes" checked={partBAnswers.c === 'yes'} onChange={handlePartBChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="c" value="no" checked={partBAnswers.c === 'no'} onChange={handlePartBChange} />
                </label>
              </div>
              {/* Question R */}
              <div className={styles.question}>
                R: Do you ever use alcohol or drugs to RELAX, feel better about yourself, or fit in?
                <label>
                  Yes
                  <input type="radio" name="r" value="yes" checked={partBAnswers.r === 'yes'} onChange={handlePartBChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="r" value="no" checked={partBAnswers.r === 'no'} onChange={handlePartBChange} />
                </label>
              </div>
              {/* Question A */}
              <div className={styles.question}>
                A: Do you ever use alcohol or drugs while you are by yourself, or ALONE?
                <label>
                  Yes
                  <input type="radio" name="a" value="yes" checked={partBAnswers.a === 'yes'} onChange={handlePartBChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="a" value="no" checked={partBAnswers.a === 'no'} onChange={handlePartBChange} />
                </label>
              </div>
              {/* Question F1 */}
              <div className={styles.question}>
                F: Do you ever FORGET things you did while using alcohol or drugs?
                <label>
                  Yes
                  <input type="radio" name="f1" value="yes" checked={partBAnswers.f1 === 'yes'} onChange={handlePartBChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="f1" value="no" checked={partBAnswers.f1 === 'no'} onChange={handlePartBChange} />
                </label>
              </div>
              {/* Question F2 */}
              <div className={styles.question}>
                F: Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use?
                <label>
                  Yes
                  <input type="radio" name="f2" value="yes" checked={partBAnswers.f2 === 'yes'} onChange={handlePartBChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="f2" value="no" checked={partBAnswers.f2 === 'no'} onChange={handlePartBChange} />
                </label>
              </div>
              {/* Question T */}
              <div className={styles.question}>
                T: Have you ever gotten into TROUBLE while you were using alcohol or drugs?
                <label>
                  Yes
                  <input type="radio" name="t" value="yes" checked={partBAnswers.t === 'yes'} onChange={handlePartBChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="t" value="no" checked={partBAnswers.t === 'no'} onChange={handlePartBChange} />
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
                  <input type="radio" name="q1" value="yes" checked={partCAnswers.q1 === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q1" value="no" checked={partCAnswers.q1 === 'no'} onChange={handlePartCChange} />
                </label>
              </div>
              {/* Question 2 */}
              <div className={styles.question}>
                2. Do you vape or use tobacco NOW because it is really hard to quit?
                <label>
                  Yes
                  <input type="radio" name="q2" value="yes" checked={partCAnswers.q2 === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q2" value="no" checked={partCAnswers.q2 === 'no'} onChange={handlePartCChange} />
                </label>
              </div>
              {/* Question 3 */}
              <div className={styles.question}>
                3. Have you ever felt like you were ADDICTED to vaping or tobacco?
                <label>
                  Yes
                  <input type="radio" name="q3" value="yes" checked={partCAnswers.q3 === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q3" value="no" checked={partCAnswers.q3 === 'no'} onChange={handlePartCChange} />
                </label>
              </div>
              {/* Question 4 */}
              <div className={styles.question}>
                4. Do you ever have strong CRAVINGS to vape or use tobacco?
                <label>
                  Yes
                  <input type="radio" name="q4" value="yes" checked={partCAnswers.q4 === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q4" value="no" checked={partCAnswers.q4 === 'no'} onChange={handlePartCChange} />
                </label>
              </div>
              {/* Question 5 */}
              <div className={styles.question}>
                5. Have you ever felt like you really NEEDED to vape or use tobacco?
                <label>
                  Yes
                  <input type="radio" name="q5" value="yes" checked={partCAnswers.q5 === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q5" value="no" checked={partCAnswers.q5 === 'no'} onChange={handlePartCChange} />
                </label>
              </div>
              {/* Question 6 */}
              <div className={styles.question}>
                6. Is it hard to keep from vaping or using tobacco in PLACES where you are not supposed to, like school?
                <label>
                  Yes
                  <input type="radio" name="q6" value="yes" checked={partCAnswers.q6 === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q6" value="no" checked={partCAnswers.q6 === 'no'} onChange={handlePartCChange} />
                </label>
              </div>
              {/* Sub-questions for Question 7 */}
              <div className={styles.question}>
                7. When you HAVEN’T vaped or used tobacco in a while (or when you tried to stop using)…
                <div>a.) did you find it hard to CONCENTRATE because you couldn’t vape or use tobacco?</div>
                <label>
                  Yes
                  <input type="radio" name="q7a" value="yes" checked={partCAnswers.q7a === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q7a" value="no" checked={partCAnswers.q7a === 'no'} onChange={handlePartCChange} />
                </label>
                <div>b.) did you feel more IRRITABLE because you couldn’t vape or use tobacco?</div>
                <label>
                  Yes
                  <input type="radio" name="q7b" value="yes" checked={partCAnswers.q7b === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q7b" value="no" checked={partCAnswers.q7b === 'no'} onChange={handlePartCChange} />
                </label>
                <div>c.) did you feel a strong NEED or urge to vape or use tobacco?</div>
                <label>
                  Yes
                  <input type="radio" name="q7c" value="yes" checked={partCAnswers.q7c === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q7c" value="no" checked={partCAnswers.q7c === 'no'} onChange={handlePartCChange} />
                </label>
                <div>d.) did you feel NERVOUS, restless, or anxious because you couldn’t vape or use tobacco?</div>
                <label>
                  Yes
                  <input type="radio" name="q7d" value="yes" checked={partCAnswers.q7d === 'yes'} onChange={handlePartCChange} />
                </label>
                <label>
                  No
                  <input type="radio" name="q7d" value="no" checked={partCAnswers.q7d === 'no'} onChange={handlePartCChange} />
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

    const handleSubmit = async (event) => {
    event.preventDefault();

    const fullFormData = {
        partA: answers,
        partB: partBAnswers,
        partC: partCAnswers
      };
  
      try {
        const response = await fetch(`http://localhost:5000/api/insert_forms/crafft_screening/${patientId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fullFormData)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        console.log('Form submitted successfully:', result);
  
      } catch (error) {
        console.error('Failed to submit form:', error);
        alert('Failed to submit form. Please try again.');
      }

      window.history.back();
    
  };
  
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
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

            {currentPart === 'C' && (
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrafftScreening;
