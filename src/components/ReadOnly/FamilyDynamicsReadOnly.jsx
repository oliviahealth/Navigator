import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/SocialSupportForm.css';
import Cookies from 'js-cookie';

const questionTitles = [
  "Who can you really count on to be dependable when you need help?",
  "Who can you really count on to help you feel more relaxed when you are under pressure or tense?",
  "Who accepts you totally, including both your worst and your best points?",
  "Who can you really count on to care about you, regardless of what is happening to you?",
  "Who can you really count on to help you feel better when you are feeling generally down in the dumps?",
  "Who can you count on to console you when you are very upset?"
];

const SocialSupportFormReadOnly = () => {
  const { patientId, log_id } = useParams();
  const navigate = useNavigate();
  const initialFormData = {
    fullName: '',
    dateSubmitted: '',
    supportData: questionTitles.map(() => ({ names: '', noOne: false, satisfaction: '1' })),
    totalScore: '0'
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/family_dynamics/${patientId}/${log_id}`, {
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
    calculateTotalScore();
  }, [patientId, log_id]);


  const handleInputChange = (event, index, fieldName) => {
    const { value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      supportData: prevFormData.supportData.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            [fieldName]: type === 'checkbox' ? checked : value,
          };
        }
        return item;
      }),
    }));
  };

  const calculateTotalScore = () => {
    const total = formData.supportData.reduce((acc, curr) => {
      return curr.noOne ? acc : acc + Number(curr.satisfaction);
    }, 0);
    setFormData(prevFormData => ({
      ...prevFormData,
      totalScore: total.toString()
    }));
  };

  return (
    <div className="social-support-form">
      <h2>Social Support Questionnaire (SSQ6)</h2>
      <form>
        <label>
          Your full name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            disabled
          />
        </label>
        <label>
          Date submitted:
          <input
            type="date"
            name="dateSubmitted"
            value={formData.dateSubmitted}
            disabled
          />
        </label>
        {formData.supportData.map((item, index) => (
          <div key={index} className="support-question">
            <p style={{ fontWeight: 'bold' }}>{index + 1}. {questionTitles[index]}</p>
            <input
              type="text"
              name="names"
              value={item.names}
              placeholder="Enter names separated by comma"
              disabled
            />
            <p>How satisfied are you with the social support given to you by these people overall?</p>
            <select
              value={item.satisfaction}
              disabled
            >
              <option value="1">(1) Very dissatisfied</option>
              <option value="2">(2) Fairly dissatisfied</option>
              <option value="3">(3) A little dissatisfied</option>
              <option value="4">(4) A little satisfied</option>
              <option value="5">(5) Fairly satisfied</option>
              <option value="6">(6) Very satisfied</option>
            </select>
            <label>
              I view no one as dependable
              <input
                type="checkbox"
                name="noOne"
                checked={item.noOne}
                disabled
              />
            </label>
          </div>
        ))}
        <div className="total-score">
          <label>Total Score:</label>
          <input
            type="text"
            name="totalScore"
            value={formData.totalScore}
            readOnly
          />
        </div>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};

export default SocialSupportFormReadOnly;