import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function GoalPlanning() {
  const { patientId } = useParams();

  const [goalInfo, setGoalInfo] = useState({
    goal: '',
    steps: ['', '', ''], // Assuming 3 steps for simplicity; adjust as needed
    skillsOrKnowledgeNeeded: '',
    peopleOrOrganizations: '',
    successLooksLike: '',
    accomplishBy: '',
    progress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('step')) {
      const index = parseInt(name.replace('step', ''), 10) - 1;
      const updatedSteps = [...goalInfo.steps];
      updatedSteps[index] = value;
      setGoalInfo({ ...goalInfo, steps: updatedSteps });
    } else {
      setGoalInfo({ ...goalInfo, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/goal_planning/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalInfo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully submitted:', data);
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Goal Planning Tool</h2>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Goal:
        </label>
        <textarea name="goal" value={goalInfo.goal} onChange={handleChange} style={{ width: '100%', height: '60px' }} />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Steps I need to take to reach my goal:
        </label>
        {goalInfo.steps.map((step, index) => (
          <textarea
            key={index}
            name={`step${index + 1}`}
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={handleChange}
            style={{ width: '100%', height: '60px', marginBottom: '10px' }}
          />
        ))}
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Skills or Knowledge Needed:
        </label>
        <textarea name="skillsOrKnowledgeNeeded" value={goalInfo.skillsOrKnowledgeNeeded} onChange={handleChange} style={{ width: '100%', height: '60px' }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          People or Organizations I need to connect with:
        </label>
        <textarea name="peopleOrOrganizations" value={goalInfo.peopleOrOrganizations} onChange={handleChange} style={{ width: '100%', height: '60px' }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          This is what success looks like:
        </label>
        <textarea name="successLooksLike" value={goalInfo.successLooksLike} onChange={handleChange} style={{ width: '100%', height: '60px' }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          I want to accomplish this goal by:
        </label>
        <input type="date" name="accomplishBy" value={goalInfo.accomplishBy} onChange={handleChange} style={{ width: '100%' }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Progress:
        </label>
        <textarea name="progress" value={goalInfo.progress} onChange={handleChange} style={{ width: '100%', height: '60px' }} />
      </div>

      <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', cursor: 'pointer' }}>Submit</button>
    </form>
  );
}

export default GoalPlanning;
