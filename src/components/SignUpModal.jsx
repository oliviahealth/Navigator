import React, { useState } from 'react';
import styles from '../styles/SignUpModal.module.css';

const SignUpModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset errors
    setErrors({});
    // Validate data
    let newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    // More validations can be added here
    if (Object.keys(newErrors).length === 0) {
      // Submit data
      console.log(formData);
      onClose(); // Close modal on successful submission
    } else {
      setErrors(newErrors);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        {/* <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button> */}
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
          {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
          {errors.phone && <div className={styles.error}>{errors.phone}</div>}
          <button type="submit">Sign Up</button>
        </form>
        <br></br>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default SignUpModal;
