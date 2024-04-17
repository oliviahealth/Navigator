// Medications.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Medications.module.css';
import { useParams } from 'react-router-dom';

const MedicationsReadOnly = () => {
  const { patientId, log_id } = useParams();
  const [medications, setMedications] = useState([{ medication: '', dose: '', prescriber: '', notes: '' }]);

  const handleAddRow = () => {
    setMedications([...medications, { medication: '', dose: '', prescriber: '', notes: '' }]);
  };

  const handleRemoveRow = (index) => {
    setMedications(medications.filter((_, idx) => idx !== index));
  };

 
  const handleCancel = () => {
    window.history.back();
  };

  const handleChange = (index, name, value) => {
    const updatedMedications = medications.map((item, idx) => {
      if (idx === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setMedications(updatedMedications);
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/medications/${patientId}/${log_id}`, {
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
            setMedications(data[2])
            
        } catch (error) {
            console.error('Error fetching  info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  return (
    <form className={styles.medicationForm}>
      <div className={styles.tableWrapper}>
        <h2>CURRENT MEDICATION LIST</h2>
        <p>Include prescription and Over the Counter & Supplements Complete with Participant Follow up as indicated with Provider, Social Worker, Case Manager, Recovery Coach, etc.</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Medication</th>
              <th>Dose</th>
              <th>Prescriber</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><input type="text" value={med.medication} onChange={(e) => handleChange(index, 'medication', e.target.value)} /></td>
                <td><input type="text" value={med.dose} onChange={(e) => handleChange(index, 'dose', e.target.value)} /></td>
                <td><input type="text" value={med.prescriber} onChange={(e) => handleChange(index, 'prescriber', e.target.value)} /></td>
                <td><input type="text" value={med.notes} onChange={(e) => handleChange(index, 'notes', e.target.value)} /></td>
                <td><button type="button" onClick={() => handleRemoveRow(index)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleAddRow} className={styles.addButton}>Add Row</button>
      </div>
      <textarea placeholder="Notes:" className={styles.notesArea}></textarea>
      <div className={styles.buttonSection}>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Back</button>
      </div>
    </form>
  );
};

export default MedicationsReadOnly;
