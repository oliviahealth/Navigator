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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dateFields = ['gestationalAge', 'dueDate', 'deliveryDate'];
    const numberFields = ['totalPregnancies', 'childrenLivingWithYou', 'gravida', 'term', 'preterm', 'abortions', 'living'];
    const textFields = ['diagnosesConditions', 'outcomesOfPriorPregnancies', 'datesOfPriorPregnancies'];
    const radioFields = ['deliveryMode', 'actualDeliveryMode'];
  
    if (dateFields.includes(name) && value && !dateRegex.test(value)) {
      alert('Please enter a valid date in the format YYYY-MM-DD');
      return;
    }
  
    if (numberFields.includes(name) && value && (isNaN(value) || parseInt(value, 10) < 0)) {
      alert('Please enter a valid number');
      return;
    }
  
    if (name === 'datesOfPriorPregnancies') {
      const dates = value.split(',');
      if (dates.some(date => date && !dateRegex.test(date.trim()))) {
        alert('Please enter valid dates separated by commas in the format YYYY-MM-DD');
        return;
      }
    }
  
    if (textFields.includes(name) && /<|>/.test(value)) {
      alert('Please do not use angle brackets <>');
      return;
    }
  
    if (radioFields.includes(name) && !['vaginal', 'cesarean'].includes(value)) {
      alert('Invalid selection');
      return;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  
  

  const handleSubmit = async (event) => {
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
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Diagnoses/Conditions:</label>
            <textarea name="diagnosesConditions" className={styles.largeTextArea} value={formData.diagnosesConditions} onChange={handleChange}></textarea>
           
      <label className={styles.labelBlock}>Number of Children Currently Living with You:</label>
      <input className={styles.inputBlock} type="number" name="childrenLivingWithYou" value={formData.childrenLivingWithYou} onChange={handleChange} />

      <label className={styles.labelBlock}>Dates of Prior Pregnancies(Please seperate by comma):</label>
      <input className={styles.inputBlock} type="text" name="datesOfPriorPregnancies" value={formData.datesOfPriorPregnancies} onChange={handleChange} />

      <label className={styles.labelBlock}>Outcomes of Prior Pregnancies:</label>
      <input className={styles.inputBlock} type="text" name="outcomesOfPriorPregnancies" value={formData.outcomesOfPriorPregnancies} onChange={handleChange} />

      <label className={styles.labelBlock}>Gravida (Total Number of Pregnancies):</label>
      <input className={styles.inputBlock} type="number" name="gravida" value={formData.gravida} onChange={handleChange} />

      <label className={styles.labelBlock}>Term (Total Number of Deliveries @ 37 weeks or higher):</label>
      <input className={styles.inputBlock} type="number" name="term" value={formData.term} onChange={handleChange} />

      <label className={styles.labelBlock}>Preterm (Total Number of Deliveries between 20 & 36 weeks):</label>
      <input className={styles.inputBlock} type="number" name="preterm" value={formData.preterm} onChange={handleChange} />

      <label className={styles.labelBlock}>Abortions (Total Number of Miscarriages and/or Elective Abortions):</label>
      <input className={styles.inputBlock} type="number" name="abortions" value={formData.abortions} onChange={handleChange} />

      <label className={styles.labelBlock}>Living (Total Number of Living Children):</label>
      <input className={styles.inputBlock} type="number" name="living" value={formData.living} onChange={handleChange} />
          </div>
        </div>

        {/* Submit Button */}
        <input type="submit" value="Submit" className={styles.buttonSubmit} />
      </form>
    </div>
  );
};

export default ParentalMedicalHistory;