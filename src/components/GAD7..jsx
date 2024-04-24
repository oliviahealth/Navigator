import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GAD7() {
    const { patientId } = useParams();
    const initialState = {
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
        q6: 0, q7: 0, q8: 0
    };

    const [responses, setResponses] = useState(initialState);
    const [totalScore, setTotalScore] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`http://localhost:5000/api/insert_forms/gad7/${patientId}`, {
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
          console.error('Failed to submit:', error);
        }
      };

    useEffect(() => {
        // Calculate the total score whenever responses change
        const sum = Object.values(responses).reduce((acc, curr) => acc + curr, 0);
        setTotalScore(sum);
    }, [responses]); // Dependency array, recalculate when responses change

    const handleChange = (question, value) => {
        setResponses(prev => ({
            ...prev,
            [question]: parseInt(value)
        }));
    };

    const getRiskLevel = (score) => {
        if (score < 5) return 'No to Low risk (None, rescreen annually)';
        if (score < 10) return 'Mild (Provide general feedback, repeat GAD7 at follow up)';
        if (score < 15) return 'Moderate (Further Evaluation Recommended and referral to mental health program)';
        return 'Severe (Further Evaluation Recommended and referral to mental health program)';
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>GAD-7 Anxiety Scale</h2>
            <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
            
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                    <p>{i + 1}. {["Feeling nervous, anxious or on edge", 
                                   "Not being able to stop or control worrying", 
                                   "Worrying too much about different things", 
                                   "Trouble relaxing", 
                                   "Being so restless that it is hard to sit still", 
                                   "Becoming easily annoyed or irritable", 
                                   "Feeling afraid as if something awful might happen",
                                   "If you checked off any problems, how difficult have these made it for you to do your work, take care of things at home, or get along with other people?"][i]}</p>
                    <label><input type="radio" name={`q${i + 1}`} value="0" onChange={() => handleChange(`q${i + 1}`, '0')} /> Not at all (0)</label>
                    <label><input type="radio" name={`q${i + 1}`} value="1" onChange={() => handleChange(`q${i + 1}`, '1')} /> Several days (1)</label>
                    <label><input type="radio" name={`q${i + 1}`} value="2" onChange={() => handleChange(`q${i + 1}`, '2')} /> More than half the days (2)</label>
                    <label><input type="radio" name={`q${i + 1}`} value="3" onChange={() => handleChange(`q${i + 1}`, '3')} /> Nearly every day (3)</label>
                </div>
            ))}

            <h3>Total Score: {totalScore}</h3>
            <p>Risk Level: {getRiskLevel(totalScore)}</p>
            <button type="submit">Submit</button>
        </form>
    );
}

export default GAD7;