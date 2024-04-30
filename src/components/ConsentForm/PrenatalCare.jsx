import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/PrenatalCare.css';

function PrenatalCare() {
  const { patientId } = useParams();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/prenatal_care/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      navigate(-1);
    } catch (error) {
      console.error('failed to submit');
    }
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

        <h2>Provide the contact information for your prenatal care in the Care Provider section.</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
        <label htmlFor="phoneNum">Phone Number</label>
        <input type="text" id="phoneNum" name="phoneNum" value={formValues.phoneNum} onChange={handleInputChange} />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value={formValues.email} onChange={handleInputChange} />
        
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
}

export default PrenatalCare;
