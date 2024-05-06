import React, { useState } from 'react';
import styles from '../styles/ParentalMedicalHistory.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

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

    // if (name === 'datesOfPriorPregnancies') {
    //   const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
    //   const dates = value.split(',').map(date => date.trim());
    
    //   if (dates.some(date => date && !dateRegex.test(date))) {
    //     alert('Please enter valid dates separated by commas in the format YYYY-MM-DD');
    //     return;
    //   }
    // }

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

  function validateDates(inputName, inputValue) {
    if (inputName === 'datesOfPriorPregnancies') {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      const dates = inputValue.split(',').map(date => date.trim());
  
      if (dates.some(date => date && !dateRegex.test(date))) {
        alert('Please enter valid dates separated by commas in the format YYYY-MM-DD');
        return false;
      }
      return true;
    }
    return true;
  };
  



  const handleSubmit = async (event) => {
    event.preventDefault();
const accessToken = Cookies.get('accessToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/parental_medical_history/${patientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'omit',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('failed to submit');
    }
  };

  return (
    <div className="page">
     
      <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Parental Medical History</h2>

        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>PRENATAL CARE (FOR CURRENT OR MOST RECENT PREGNANCY)</h3>
          <div className={styles.questionContainer}>
          </div>
          <div className={styles.questionContainer}>
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}>Gestational Age at Entry of Care (when did you first recieve medical care once pregnant):</label>
            <input className={styles.inputBlock} type="date" name="gestationalAge" value={formData.gestationalAge} onChange={handleChange} />
            <label className={styles.labelBlock}>Expected Due Date of Child:</label>
            <input className={styles.inputBlock} type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.labelBlock}> Actual Delivery Date of Child:</label>
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

            <label className={styles.labelBlock}>Dates of Prior Pregnancies (Please separate by comma in this format YYYY-MM-DD):</label>
            <input
              className={styles.inputBlock}
              type="text"
              name="datesOfPriorPregnancies"
              value={formData.datesOfPriorPregnancies}
              onChange={handleChange}
              onBlur={(e) => validateDates(e.target.name, e.target.value)}  // Validates when user leaves the field
            />

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
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );


};

export default ParentalMedicalHistory;