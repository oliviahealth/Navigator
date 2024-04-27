import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/DomesticViolenceStyle.css';

const DomesticViolenceScreenFormReadOnly = () => {
  const { patientId, log_id } = useParams();
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
    setAnswers({
      ...answers,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/domestic_violence/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                return; 
            }
            const data = await response.json();
            setAnswers(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  const handleCancel = () => {
    navigate('/dashboard'); 
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
      <form>
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
                  disabled
                />
              </label>
              <label>
                No
                <input
                  type="radio"
                  name={key}
                  value="no"
                  checked={answers[key] === 'no'}
                  disabled
                />
              </label>
            </div>
          );
        })}
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

export default DomesticViolenceScreenFormReadOnly;