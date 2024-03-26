// AddPatientForm.jsx

import React, { useState } from 'react';
import styles from '../styles/PatientModal.module.css'; // Update the CSS file name accordingly

const AddPatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    fetch('http://localhost:5000/api/add_patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    window.history.back()
  };

  return (
    <div className={styles.formContainer}> {/* Adjusted from modalOverlay to formContainer */}
      <form onSubmit={handleSubmit} className={styles.patientForm}> {/* Adjusted from modalContent to patientForm */}
        <h2>Add New Patient</h2>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default AddPatientForm;
