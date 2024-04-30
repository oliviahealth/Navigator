import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function DUREL() {
    const { patientId } = useParams();
    const initialState = {
        attendance: '',
        privateActivities: '',
        presenceDivine: '',
        beliefsApproach: '',
        religionInLife: ''
    };

    const [responses, setResponses] = useState(initialState);

    const handleChange = (field, value) => {
        // Sanitize 'field' to allow only alphanumeric characters and underscores
        const sanitized_field = field.replace(/[^a-zA-Z0-9_]/g, '');
    
        setResponses(prev => ({
            ...prev,
            [sanitized_field]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/durel/${patientId}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(responses),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          window.history.back();
        } catch (error) {
          console.error('Failed to submit');
        }
      };

      const handleCancel = () => {
        window.history.back();
      };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Duke University Religion Index (DUREL)</h2>

            <div>
                <p>1. How often do you attend church, synagogue, or other religious meetings?</p>
                <label><input type="radio" name="attendance" value="a" onChange={() => handleChange('attendance', 'Never')} /> Never</label>
                <label><input type="radio" name="attendance" value="b" onChange={() => handleChange('attendance', 'Once a year or less')} /> Once a year or less</label>
                <label><input type="radio" name="attendance" value="c" onChange={() => handleChange('attendance', 'A few times a year')} /> A few times a year</label>
                <label><input type="radio" name="attendance" value="d" onChange={() => handleChange('attendance', 'A few times a month')} /> A few times a month</label>
                <label><input type="radio" name="attendance" value="e" onChange={() => handleChange('attendance', 'Once a week')} /> Once a week</label>
                <label><input type="radio" name="attendance" value="f" onChange={() => handleChange('attendance', 'More than once a week')} /> More than once a week</label>
            </div>

            <div>
                <p>2. How often do you spend time in private religious activities, such as prayer, meditation or Bible study?</p>
                <label><input type="radio" name="privateActivities" value="a" onChange={() => handleChange('privateActivities', 'Rarely or never')} /> Rarely or never</label>
                <label><input type="radio" name="privateActivities" value="b" onChange={() => handleChange('privateActivities', 'Once a month or less')} /> Once a month or less</label>
                <label><input type="radio" name="privateActivities" value="c" onChange={() => handleChange('privateActivities', 'Once a week')} /> Once a week</label>
                <label><input type="radio" name="privateActivities" value="d" onChange={() => handleChange('privateActivities', 'Few times a week')} /> Few times a week</label>
                <label><input type="radio" name="privateActivities" value="e" onChange={() => handleChange('privateActivities', 'Once a day')} /> Once a day</label>
                <label><input type="radio" name="privateActivities" value="f" onChange={() => handleChange('privateActivities', 'More than once a day')} /> More than once a day</label>
            </div>

            <div>
                <p>3. In my life, I experience the presence of the Divine.</p>
                <label><input type="radio" name="presenceDivine" value="a" onChange={() => handleChange('presenceDivine', 'Definitely not true')} /> Definitely not true</label>
                <label><input type="radio" name="presenceDivine" value="b" onChange={() => handleChange('presenceDivine', 'Somewhat not true')} /> Somewhat not true</label>
                <label><input type="radio" name="presenceDivine" value="c" onChange={() => handleChange('presenceDivine', 'Neutral')} /> Neutral</label>
                <label><input type="radio" name="presenceDivine" value="d" onChange={() => handleChange('presenceDivine', 'Somewhat true')} /> Somewhat true</label>
                <label><input type="radio" name="presenceDivine" value="e" onChange={() => handleChange('presenceDivine', 'Definitely true')} /> Definitely true</label>
            </div>

            <div>
                <p>4. My religious beliefs are what really lie behind my whole approach to life.</p>
                <label><input type="radio" name="beliefsApproach" value="a" onChange={() => handleChange('beliefsApproach', 'Definitely not true')} /> Definitely not true</label>
                <label><input type="radio" name="beliefsApproach" value="b" onChange={() => handleChange('beliefsApproach', 'Somewhat not true')} /> Somewhat not true</label>
                <label><input type="radio" name="beliefsApproach" value="c" onChange={() => handleChange('beliefsApproach', 'Neutral')} /> Neutral</label>
                <label><input type="radio" name="beliefsApproach" value="d" onChange={() => handleChange('beliefsApproach', 'Somewhat true')} /> Somewhat true</label>
                <label><input type="radio" name="beliefsApproach" value="e" onChange={() => handleChange('beliefsApproach', 'Definitely true')} /> Definitely true</label>
            </div>

            <div>
                <p>5. I try hard to carry my religion over into other dealings in life.</p>
                <label><input type="radio" name="religionInLife" value="a" onChange={() => handleChange('religionInLife', 'Definitely not true')} /> Definitely not true</label>
                <label><input type="radio" name="religionInLife" value="b" onChange={() => handleChange('religionInLife', 'Somewhat not true')} /> Somewhat not true</label>
                <label><input type="radio" name="religionInLife" value="c" onChange={() => handleChange('religionInLife', 'Neutral')} /> Neutral</label>
                <label><input type="radio" name="religionInLife" value="d" onChange={() => handleChange('religionInLife', 'Somewhat true')} /> Somewhat true</label>
                <label><input type="radio" name="religionInLife" value="e" onChange={() => handleChange('religionInLife', 'Definitely true')} /> Definitely true</label>
            </div>

            <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default DUREL;