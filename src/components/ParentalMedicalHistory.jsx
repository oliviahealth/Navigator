import React, { useState } from 'react';
import styles from '../styles/ParentalMedicalHistory.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const ParentalMedicalHistory = () => {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    gestationalAge: '',
    dueDate: '',
    deliveryDate: '',
    deliveryMode: '',
    actualDeliveryMode: '',
    totalPregnancies: '',
    childrenLivingWithYou: '',
    datesOfPriorPregnancies: '',
    outcomesOfPriorPregnancies: '',
    gravida: '',
    term: '',
    preterm: '',
    abortions: '',
    living: '',
    diagnosesConditions: '',
  });

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
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/parental_medical_history/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <div className="page">
      <h2>Parental Medical History</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        
        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>PRENATAL CARE (FOR CURRENT OR MOST RECENT PREGNANCY)</h3>
          <div className={styles.questionContainer}>
          </div>
          <div className={styles.questionContainer}>
          </div>
          <div className={styles.questionContainer}>
          <label className={styles.labelBlock}>Gestational Age at Entry of Care:</label>
            <input className={styles.inputBlock} type="date" name="gestationalAge" value={formData.gestationalAge} onChange={handleChange} />
            <label className={styles.labelBlock}> Due Date:</label>
            <input className={styles.inputBlock} type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Delivery Date:</label>
            <input className={styles.inputBlock} type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Planned Mode of Delivery:</label>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="deliveryMode" value="vaginal" checked={formData.deliveryMode === 'vaginal'} onChange={handleChange} />
                Vaginal
              </label>
              <label>
                <input type="radio" name="deliveryMode" value="cesarean" checked={formData.deliveryMode === 'cesarean'} onChange={handleChange} />
                Cesarean
              </label>
            </div>
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Actual Mode of Delivery:</label>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="actualDeliveryMode" value="vaginal" checked={formData.actualDeliveryMode === 'vaginal'} onChange={handleChange} />
                Vaginal
              </label>
              <label>
                <input type="radio" name="actualDeliveryMode" value="cesarean" checked={formData.actualDeliveryMode === 'cesarean'} onChange={handleChange} />
                Cesarean
              </label>
            </div>
          </div>
        </div>
  
        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>OBSTETRIC HISTORY</h3>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Total Number of Pregnancies:</label>
            <input className={styles.inputBlock} type="number" name="totalPregnancies" value={formData.totalPregnancies} onChange={handleChange} />
          </div>
        </div>
  
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
  
        <button type="submit" className={styles.buttonSubmit}>Submit</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
  

};

export default ParentalMedicalHistory;