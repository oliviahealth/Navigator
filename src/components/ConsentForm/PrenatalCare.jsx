import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ConsentFormStyles/PrenatalCare.css';

function PrenatalCare() {
  const [formValues, setFormValues] = useState({
    
    pregDate: '',
    startDate: '',
    name: '',
    phoneNum: '',
    email: '',
    attendRegularVisits: null,
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'text' && /<|>|;|'|"/.test(value)) {
      return;
    }


    if (type === 'date' && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return;
    }

    const inputValue = type === 'radio' ? value : type === 'checkbox' ? checked : value;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: inputValue,
    }));
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
        <label htmlFor="attendRegularVisits">Are you currently attending regular visits with your OB/GYN or Nurse Practitioner?</label>
        <div>
          <input
            type="radio"
            id="yesVisits"
            name="attendRegularVisits"
            value="Yes"
            checked={formValues.attendRegularVisits === 'Yes'}
            onChange={handleInputChange}
          /> Yes
          <input
            type="radio"
            id="noVisits"
            name="attendRegularVisits"
            value="No"
            checked={formValues.attendRegularVisits === 'No'}
            onChange={handleInputChange}
          /> No
        </div>

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
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
}

export default PrenatalCare;