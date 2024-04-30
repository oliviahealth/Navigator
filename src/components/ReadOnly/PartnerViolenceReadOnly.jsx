import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const IntimatePartnerViolenceFormReadOnly = () => {
  const { patientId, log_id } = useParams();
  const [formData, setFormData] = useState({
    physicallyHurt: '',
    insultOrTalkDown: '',
    threatenWithHarm: '',
    screamOrCurse: ''
  });

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/partner_violence/${patientId}/${log_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          credentials: 'omit',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 204) { // Handling no content
          return;
        }
        const data = await response.json();
        setFormData(data[2])

      } catch (error) {
        console.error('failed to fetch');
      }
    };

    fetchLog();
  }, [patientId, log_id]);

  const handleAssessmentChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const navigate = useNavigate();

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
      <form>
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
                  disabled
                  checked={value === String(rating)}
                />
                {rating}
              </label>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default IntimatePartnerViolenceFormReadOnly;