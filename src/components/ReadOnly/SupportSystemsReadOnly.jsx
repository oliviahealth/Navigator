import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SupportSystemsReadOnly() {
  const { patientId, log_id } = useParams();
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

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/support_systems/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                console.log("No support system info found for the selected patient.");
                return; 
            }
            const data = await response.json();
            setFormData(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  return (
    <form>
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
    </form>
  );
}

export default SupportSystemsReadOnly;