import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GoalPlanningReadOnly() {
  const { patientId, log_id } = useParams();

  const [goalInfo, setGoalInfo] = useState({
    goal: '',
    steps: ['', '', ''], // Assuming 3 steps for simplicity; adjust as needed
    skillsOrKnowledgeNeeded: '',
    peopleOrOrganizations: '',
    successLooksLike: '',
    accomplishBy: '',
    progress: ''
  });

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/goal_planning/${patientId}/${log_id}`, {
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
            setGoalInfo(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);


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

  return (
    <form style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Goal Planning Tool</h2>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Goal:
        </label>
        <textarea name="goal" value={goalInfo.goal} disabled style={{ width: '100%', height: '60px' }} />
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
            disabled
            style={{ width: '100%', height: '60px', marginBottom: '10px' }}
          />
        ))}
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Skills or Knowledge Needed:
        </label>
        <textarea name="skillsOrKnowledgeNeeded" value={goalInfo.skillsOrKnowledgeNeeded} disabled style={{ width: '100%', height: '60px' }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          People or Organizations I need to connect with:
        </label>
        <textarea name="peopleOrOrganizations" value={goalInfo.peopleOrOrganizations} disabled style={{ width: '100%', height: '60px' }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          This is what success looks like:
        </label>
        <textarea name="successLooksLike" value={goalInfo.successLooksLike} disabled style={{ width: '100%', height: '60px' }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          I want to accomplish this goal by:
        </label>
        <input type="date" name="accomplishBy" value={goalInfo.accomplishBy} disabled style={{ width: '100%' }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Progress:
        </label>
        <textarea name="progress" value={goalInfo.progress} disabled style={{ width: '100%', height: '60px' }} />
      </div>
    </form>
  );
}

export default GoalPlanningReadOnly;
