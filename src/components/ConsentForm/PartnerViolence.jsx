import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const IntimatePartnerViolenceForm = () => {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    physicallyHurt: '',
    insultOrTalkDown: '',
    threatenWithHarm: '',
    screamOrCurse: ''
  });

  const handleAssessmentChange = (name, value) => {

    if (!['1', '2', '3', '4', '5'].includes(value)) {
      console.error('Invalid input: value must be between 1 and 5');
      return;
    }
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/partner_violence/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      navigate(-1);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard'); 
  };

  
  const questions = {
    physicallyHurt: "Physically hurt you:",
    insultOrTalkDown: "Insult or talk down to you:",
    threatenWithHarm: "Threaten you with harm:",
    screamOrCurse: "Scream or curse at you:"
  };

  return (
    <div>
      <h2>Intimate Partner Violence</h2>
      <form onSubmit={handleSubmit}>
      <h2>How often does your partner:</h2>
      <div className="labelQ">
      <h3>(1) Never (2) Rarely (3) Sometimes (4) Often (5) Always</h3>
      </div>
        {Object.entries(formData).map(([key, value]) => (
          
          <div className="question" key={key}>
            
            <p>{questions[key]}</p>
            {[1, 2, 3, 4, 5].map(rating => (
              <label key={rating}>
                <input
                  type="radio"
                  name={key}
                  value={rating}
                  onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                  checked={value === String(rating)}
                />
                {rating}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default IntimatePartnerViolenceForm;