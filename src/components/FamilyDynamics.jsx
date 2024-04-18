// SocialSupportForm.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/SocialSupportForm.css';

const questionTitles = [
  "Who can you really count on to be dependable when you need help?",
  "Who can you really count on to help you feel more relaxed when you are under pressure or tense?",
  "Who accepts you totally, including both your worst and your best points?",
  "Who can you really count on to care about you, regardless of what is happening to you?",
  "Who can you really count on to help you feel better when you are feeling generally down in the dumps?",
  "Who can you count on to console you when you are very upset?"
];

const SocialSupportForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const initialFormData = {
    fullName: '',
    dateSubmitted: '',
    supportData: questionTitles.map(() => ({ names: [], noOne: false, satisfaction: '1' })),
    totalScore: '0'
  };

  const [formData, setFormData] = useState(initialFormData);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/family_dynamics/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully submitted:', data);
      navigate(-1);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  

  return (
    <div className="social-support-form">
      <h2>Social Support Questionnaire (SSQ6)</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Your full name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </label>

        <label>
          Date submitted:
          <input
            type="date"
            name="dateSubmitted"
            value={formData.dateSubmitted}
            onChange={(e) => setFormData({ ...formData, dateSubmitted: e.target.value })}
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
              onChange={(e) => handleInputChange(e, index)}
              disabled={item.noOne}
            />
            <label>
              No one
              <input
                type="checkbox"
                name="noOne"
                checked={item.noOne}
                onChange={(e) => handleCheckboxChange(e, index)}
              />
            </label>
            <select
  value={item.satisfaction}
  onChange={(e) => handleInputChange(index, 'satisfaction', e.target.value)}
  disabled={item.noOne}
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

        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
};

export default SocialSupportForm;