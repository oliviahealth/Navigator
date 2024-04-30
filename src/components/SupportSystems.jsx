import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function SupportSystems() {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    currentSupportSystem: '',
    yourStrengths: '',
    yourAreasForImprovementAndNeeds: '',
    yourGoals: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const sanitized_name = name.replace(/[^a-zA-Z0-9_]/g, '');

    setFormData(prevFormData => ({
      ...prevFormData,
      [sanitized_name]: value
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
const accessToken = Cookies.get('accessToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/support_systems/${patientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'omit',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('failed to submit');
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Support Systems, Strengths, Areas for Improvement & Goals</h2>

      <label>
        CURRENT SUPPORT SYSTEM (partner, family, friends, faith community, recovery, community, etc.)
        <textarea
          name="currentSupportSystem"
          value={formData.currentSupportSystem}
          onChange={handleChange}
          rows="5"
        />
      </label>

      <label>
        YOUR STRENGTHS
        <textarea
          name="yourStrengths"
          value={formData.yourStrengths}
          onChange={handleChange}
          rows="5"
        />
      </label>

      <label>
        YOUR AREAS FOR IMPROVEMENT AND NEEDS
        <textarea
          name="yourAreasForImprovementAndNeeds"
          value={formData.yourAreasForImprovementAndNeeds}
          onChange={handleChange}
          rows="5"
        />
      </label>

      <label>
        YOUR GOALS (see the Goal Planning Tool in the Resources Tab)
        <textarea
          name="yourGoals"
          value={formData.yourGoals}
          onChange={handleChange}
          rows="5"
        />
      </label>

      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SupportSystems;