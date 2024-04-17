import React, { useState } from 'react';
import styles from '../styles/ParentalMedicalHistory.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const ParentalMedicalHistory = () => {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    participantComplete: '',
    followUp: '',
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
      console.log('Successfully submitted:', data);
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
            <label className={styles.labelBlock}>Complete with Participant:</label>
            <input className={styles.inputBlock} type="text" name="participantComplete" value={formData.participantComplete} onChange={handleChange} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Follow up as indicated with Provider, Social Worker, Case Manager, Recovery Coach, etc.:</label>
            <input className={styles.inputBlock} type="text" name="followUp" value={formData.followUp} onChange={handleChange} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Gestational Age at Entry of Care: Due Date:</label>
            <input className={styles.inputBlock} type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Gestational Age at Entry of Care: Delivery Date:</label>
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
          </div>
        </div>
  
        <button type="submit" className={styles.buttonSubmit}>Submit</button>
      </form>
    </div>
  );
  

};

export default ParentalMedicalHistory;