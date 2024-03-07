import React, { useState } from 'react';
import styles from '../styles/ParentalMedicalHistory.module.css';
import { useNavigate } from 'react-router-dom';

// ParentalMedicalHistory.jsx
const ParentalMedicalHistory = () => {
  const [participantComplete, setParticipantComplete] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [gestationalAge, setGestationalAge] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryMode, setDeliveryMode] = useState('');
  const [actualDeliveryMode, setActualDeliveryMode] = useState('');
  const [totalPregnancies, setTotalPregnancies] = useState('');
  const [childrenLivingWithYou, setChildrenLivingWithYou] = useState('');
  const [datesOfPriorPregnancies, setDatesOfPriorPregnancies] = useState('');
  const [outcomesOfPriorPregnancies, setOutcomesOfPriorPregnancies] = useState('');
  const [gravida, setGravida] = useState('');
  const [term, setTerm] = useState('');
  const [preterm, setPreterm] = useState('');
  const [abortions, setAbortions] = useState('');
  const [living, setLiving] = useState('');
  const [diagnosesConditions, setDiagnosesConditions] = useState('');
  
  
  const navigate = useNavigate();
  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard');
    
  };

  return (
    <div classname = "page">
      <h2>Parental Medical History</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Prenatal Care */}
        <div className={styles.formSection}>
        <h3 className={styles.formSectionTitle}>PRENATAL CARE (FOR CURRENT OR MOST RECENT PREGNANCY)</h3>
        <div className={styles.questionContainer}>
          <label className={styles.labelBlock}>Complete with Participant:</label>
          <input className={styles.inputBlock} type="text" name="participantComplete" />
        </div>
        <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Follow up as indicated with Provider, Social Worker, Case Manager, Recovery Coach, etc.:</label>
            <input className={styles.inputBlock} type="text" name="followUp" value={followUp} onChange={e => setFollowUp(e.target.value)} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Gestational Age at Entry of Care: Due Date:</label>
            <input className={styles.inputBlock} type="date" name="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Gestational Age at Entry of Care: Delivery Date:</label>
            <input className={styles.inputBlock} type="date" name="deliveryDate" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Planned Mode of Delivery:</label>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="deliveryMode" value="vaginal" checked={deliveryMode === 'vaginal'} onChange={e => setDeliveryMode(e.target.value)} />
                Vaginal
              </label>
              <label>
                <input type="radio" name="deliveryMode" value="cesarean" checked={deliveryMode === 'cesarean'} onChange={e => setDeliveryMode(e.target.value)} />
                Cesarean
              </label>
            </div>
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Actual Mode of Delivery:</label>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="actualDeliveryMode" value="vaginal" checked={actualDeliveryMode === 'vaginal'} onChange={e => setActualDeliveryMode(e.target.value)} />
                Vaginal
              </label>
              <label>
                <input type="radio" name="actualDeliveryMode" value="cesarean" checked={actualDeliveryMode === 'cesarean'} onChange={e => setActualDeliveryMode(e.target.value)} />
                Cesarean
              </label>
            </div>
          </div>
          {/* Repeat for other fields */}
        </div>

        {/* Obstetric History */}
        <div className={styles.formSection}>
  <h3 className={styles.formSectionTitle}>OBSTETRIC HISTORY</h3>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Total Number of Pregnancies:</label>
    <input
      className={styles.inputBlock}
      type="number"
      value={totalPregnancies}
      onChange={(e) => setTotalPregnancies(e.target.value)}
    />
  </div>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Number of Children Currently Living with You:</label>
    <input
      className={styles.inputBlock}
      type="number"
      value={childrenLivingWithYou}
      onChange={(e) => setChildrenLivingWithYou(e.target.value)}
    />
  </div>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Dates of Prior Pregnancies:</label>
    <input
      className={styles.inputBlock}
      type="text"
      value={datesOfPriorPregnancies}
      onChange={(e) => setDatesOfPriorPregnancies(e.target.value)}
    />
  </div>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Outcomes of Prior Pregnancies:</label>
    <input
      className={styles.inputBlock}
      type="text"
      value={outcomesOfPriorPregnancies}
      onChange={(e) => setOutcomesOfPriorPregnancies(e.target.value)}
    />
  </div>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Gravida (total number of Pregnancies):</label>
    <input
      className={styles.inputBlock}
      type="number"
      value={gravida}
      onChange={(e) => setGravida(e.target.value)}
    />
  </div>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Term (total number of Deliveries, ≥ 37 weeks):</label>
    <input
      className={styles.inputBlock}
      type="number"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
    />
  </div>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Preterm (total number of Deliveries between 20 & 36 weeks):</label>
    <input
      className={styles.inputBlock}
      type="number"
      value={preterm}
      onChange={(e) => setPreterm(e.target.value)}
    />
  </div>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Abortions (total number of Miscarriages and/or Elective Abortions):</label>
    <input
      className={styles.inputBlock}
      type="number"
      value={abortions}
      onChange={(e) => setAbortions(e.target.value)}
    />
  </div>
  <div className={styles.questionContainer}>
    <label className={styles.labelBlock}>Living (total number of Living Children):</label>
    <input
      className={styles.inputBlock}
      type="number"
      value={living}
      onChange={(e) => setLiving(e.target.value)}
    />
  </div>
</div>


        {/* Medical Problems Requiring Ongoing Care */}
        <div className={styles.formSection}>
        <h3 className={styles.formSectionTitle}>MEDICAL PROBLEMS REQUIRING ONGOING CARE</h3>
          <div className="diagnosesConditions">
            <label>Diagnoses/Conditions:</label>
            <textarea name="diagnosesConditions" className={styles.largeTextArea}></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <input type="submit" value="Submit" className={styles.buttonSubmit} />
      </form>
    </div>
  );
};

export default ParentalMedicalHistory;