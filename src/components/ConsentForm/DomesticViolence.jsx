import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/DomesticViolenceStyle.css';

const DomesticViolenceScreenForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    afraidOfPartner: '',
    partnerHurtChildren: '',
    afraidOfCurrentPartner: '',
    petsInHouse: '',
    threatenedOrHurtPets: '',
    gunsInHouse: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (!['yes', 'no'].includes(value)) {
      console.error('Invalid input: value must be either "yes" or "no"');
      return;
    }
    setAnswers({
      ...answers,
      [name]: value
    });
  };

  const handleCancel = () => {
    navigate('/dashboard'); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
const accessToken = Cookies.get('accessToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/domestic_violence/${patientId}`, {
        method: 'POST',
        headers: {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${accessToken}`
},
credentials: 'omit',
        body: JSON.stringify(answers),
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

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/dashboard');
  };

  const questions = {
    afraidOfPartner: "1. Are you in a relationship now or have you ever been in a relationship in which you have been harmed or felt afraid of your partner?",
    partnerHurtChildren: "2. Has your partner ever hurt any of your children?",
    afraidOfCurrentPartner: "3. Are you afraid of your current partner?",
    petsInHouse: "4. Do you have any pets in the house?",
    threatenedOrHurtPets: "5. Has your partner or child ever threatened or hurt any of the pets?",
    gunsInHouse: "6. Are there any guns in your house?"
  };

  return (
    <div>
      <h2>Domestic Violence Screen for Pediatric Settings</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(questions).map(([key, question]) => {
          if (key === 'threatenedOrHurtPets' && answers.petsInHouse !== 'yes') {
            return null; 
          }
          return (
            <div className="question" key={key}>
              <p>{question}</p>
              <label>
                Yes
                <input
                  type="radio"
                  name={key}
                  value="yes"
                  checked={answers[key] === 'yes'}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                No
                <input
                  type="radio"
                  name={key}
                  value="no"
                  checked={answers[key] === 'no'}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          );
        })}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
      {showPopup && (
  <div className="overlay">
    <div className="popup">
      <p>WARNING: Your situation is concerning. You will be referred to an in-house social worker and may be directed to a domestic violence program, local women’s center, legal services, and/or family counseling (Siegel et al. 1999).</p>
      <p>Please visit this link for more information:</p>
      <a href="https://www.leegov.com/dhs/Documents/HMIS/Triage-Psychosocial-Assessment.pdf" target="_blank" rel="noopener noreferrer">Triage Psychosocial Assessment</a>
      <button onClick={handlePopupClose}>Confirm</button>
    </div>
  </div>
)}
    </div>
  );
};

export default DomesticViolenceScreenForm;