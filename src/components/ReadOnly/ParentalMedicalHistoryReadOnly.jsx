import React, { useState, useEffect } from 'react';
import styles from '../../styles/ParentalMedicalHistory.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const ParentalMedicalHistoryReadOnly = () => {
  const { patientId, log_id } = useParams();

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


  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/parental_medical_history/${patientId}/${log_id}`, {
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
            setFormData(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  return (
    <div className="page">
      <h2>Parental Medical History</h2>
      <form className={styles.formContainer}>
        
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
      </form>
    </div>
  );
  

};

export default ParentalMedicalHistoryReadOnly;