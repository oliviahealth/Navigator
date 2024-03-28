import React, { useState } from 'react';

function SupportSystems() {
  const [formData, setFormData] = useState({
    currentSupportSystem: '',
    yourStrengths: '',
    yourAreasForImprovementAndNeeds: '',
    yourGoals: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Here you can handle the form submission, for example, sending the formData to a server
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

      <button type="submit">Submit</button>
    </form>
  );
}

export default SupportSystems;