import React, { useState } from 'react';
import styles from '../styles/SignUpModal.module.css';
import Cookies from 'js-cookie';

const SignUpModal = ({ show, onClose, onSignUpSuccess }) => {
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
    setErrors({}); // Reset errors

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
      fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          Cookies.set('accessToken', data.access_token, { expires: 30 });
          onSignUpSuccess();
          onClose();
        })
        .catch((error) => {
          newErrors.account = "Account with username already created";
          setErrors(newErrors);
        });
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
          <button type="submit">Sign Up</button>
          {Object.keys(errors).map((key) => (
            <div key={key} className={styles.error}>
              {errors[key]}
            </div>
          ))}
        </form>
        <br></br>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default SignUpModal;
