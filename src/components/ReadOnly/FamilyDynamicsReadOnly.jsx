// SocialSupportForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/SocialSupportForm.css';

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
    supportData: questionTitles.map(() => ({ names: [], noOne: false, satisfaction: '1' })),
    totalScore: '0'
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/family_dynamics/${patientId}/${log_id}`, {
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
        setFormData(data[2])

      } catch (error) {
        console.error('failed to fetch');
      }
    };

    fetchLog();
  }, [patientId, log_id]);

  const handleInputChange = (index, name, value) => {
    setFormData(prevFormData => {
      const updatedSupportData = prevFormData.supportData.map((data, i) => {
        if (i === index) {
          return {
            ...data,
            [name]: name === 'names' ? value.split(',').map(s => s.trim()) : value,
            noOne: name === 'noOne' ? !data.noOne : data.noOne,
          };
        }
        return data;
      });

      const newTotalScore = updatedSupportData.reduce((total, item) => {
        return item.noOne ? total : total + Number(item.satisfaction);
      }, 0);

      return {
        ...prevFormData,
        supportData: updatedSupportData,
        totalScore: newTotalScore.toString(),
      };
    });
  };

  const handleCheckboxChange = (e, index) => {
    const updatedSupportData = [...formData.supportData];
    updatedSupportData[index].noOne = !updatedSupportData[index].noOne;
    if (updatedSupportData[index].noOne) {
      updatedSupportData[index].names = [];
      updatedSupportData[index].satisfaction = '1';
    }
    setFormData({ ...formData, supportData: updatedSupportData });
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
            <p>{index + 1}. {questionTitles[index]}</p>
            <input
              type="text"
              name="names"
              value={item.names.join(', ')}
              placeholder="Enter names separated by comma"
              disabled
            />
            <label>
              No one
              <input
                type="checkbox"
                name="noOne"
                checked={item.noOne}
                disabled
              />
            </label>
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
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
};

export default SocialSupportFormReadOnly;