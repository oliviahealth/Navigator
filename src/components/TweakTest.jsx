import React, { useState } from 'react';
import styles from '../styles/TweakTest.module.css';

const TweakTest = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const score = calculateScore();
    if (score >= 2) {
      alert('Your score is ' + score + '. You meet the criteria for likely harmful drinking and are recommended to submit to a further and more stringent medical evaluation.');
    } else {
      alert('Your score is ' + score + '. You do not meet the criteria for likely harmful drinking.');
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className={styles.tweakTest}>
      <form onSubmit={handleSubmit}>
        <div className={styles.question}>
          <label>
            T. Tolerance: How many drinks can you "hold?" (6 or more indicates tolerance)
            <input
              type="number"
              name="tolerance"
              value={answers.tolerance}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            />
        </label>
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
      </form>
    </div>
  );
};

export default TweakTest;