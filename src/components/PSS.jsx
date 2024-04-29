import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PSS() {
    const { patientId } = useParams();
    const initialState = {
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
        q6: 0, q7: 0, q8: 0, q9: 0, q10: 0
    };

    const [responses, setResponses] = useState(initialState);
    const [totalScore, setTotalScore] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
          responses: responses,
          totalScore: totalScore,
        }
        try {
          const response = await fetch(`http://localhost:5000/api/insert_forms/pss/${patientId}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
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
        // Calculate the total score by summing the responses, considering reverse scoring for specific items
        const score = Object.keys(responses).reduce((acc, key) => {
            let value = responses[key];
            // Apply reverse scoring to the specified items
            if (['q4', 'q5', 'q7', 'q8'].includes(key)) {
                value = 4 - value;
            }
            return acc + value;
        }, 0);
        setTotalScore(score);
    }, [responses]);  // Dependency array to track changes in responses

    const handleChange = (question, value) => {
        const sanitized_question = question.replace(/[^a-zA-Z0-9_]/g, '');
        const parsedValue = parseInt(value, 10);
    
        setResponses(prev => ({
            ...prev,
            [sanitized_question]: isNaN(parsedValue) ? 0 : parsedValue
        }));
    };
    

    const getStressLevel = (score) => {
        if (score < 14) return 'Low stress';
        if (score < 27) return 'Moderate stress';
        return 'High perceived stress';
    };

    const handleCancel = () => {
        window.history.back();
      };

    return (
        <form onSubmit={handleSubmit}> 
            <h2>Perceived Stress Scale (PSS)</h2>
            <p>The questions ask about your feelings and thoughts during the last month. In each case, indicate how often you felt or thought a certain way.</p>
            
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                    <p>{i + 1}. {[
                                   "How often have you been upset because of something that happened unexpectedly?",
                                   "How often have you felt that you were unable to control the important things in your life?",
                                   "How often have you felt nervous and 'stressed'?",
                                   "How often have you felt confident about your ability to handle your personal problems?",
                                   "How often have you felt that things were going your way?",
                                   "How often have you found that you could not cope with all the things that you had to do?",
                                   "How often have you been able to control irritations in your life?",
                                   "How often have you felt that you were on top of things?",
                                   "How often have you been angered because of things that were outside your control?",
                                   "How often have you felt difficulties were piling up so high that you could not overcome them?"][i]}</p>
                    {Array.from({ length: 5 }).map((_, j) => (
                        <label key={j}>
                            <input type="radio" name={`q${i + 1}`} value={j} 
                                   onChange={() => handleChange(`q${i + 1}`, `${j}`)} /> 
                            {['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'][j]} ({j})
                        </label>
                    ))}
                </div>
            ))}

            <div>
                <h3>Total Score: {totalScore}</h3>
                <p>Stress Level: {getStressLevel(totalScore)}</p>
            </div>
            <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default PSS;