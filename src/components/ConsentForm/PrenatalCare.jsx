import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ConsentFormStyles/PrenatalCare.css';

function PrenatalCare() {
  const [formValues, setFormValues] = useState({
    
    pregDate: '',
    startDate: '',
    name: '',
    phoneNum: '',
    email:'',
    
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle the change for checkboxes differently
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the formData here
    console.log(formValues);
    // After processing your form you can navigate to the Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="prenatal-care-form">
      <h1>Prenatal Care</h1>
      
      <form onSubmit={handleSubmit}>
       
        <label htmlFor="pregDate">If currently pregnant, do you attend regular visits with your OB/GYN or Nurse Practicioner? </label>
        <input type="date" id="pregDate" name="pregDate" />

        <label htmlFor="pregDate">When did you start your prenatal care?  </label>
        <input type="text" id="pregDate" name="pregDate" />

        <h1>Provide the contact information for your prenatal care in the Care Provider section.  </h1>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="phoneNum">Phone Number</label>
        <input type="text" id="phoneNum" name="phoneNum" />
        <label htmlFor="emial">Email</label>
        <input type="text" id="emial" name="email" />

        
        <button type="submit">Submit</button>
            </form>
            </div>
        );
        }

export default PrenatalCare;