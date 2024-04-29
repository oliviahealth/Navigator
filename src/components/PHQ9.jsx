import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PHQ9() {
    const { patientId } = useParams();
    const initialState = {
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
        q6: 0, q7: 0, q8: 0, q9: 0, q10: 0
    };

    const [responses, setResponses] = useState(initialState);
    const [totalScore, setTotalScore] = useState(0);
    const [suicideRisk, setSuicideRisk] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
          responses: responses,
          totalScore: totalScore,
          suicideRisk: suicideRisk
        }
        try {
          const response = await fetch(`http://localhost:5000/api/insert_forms/phq9/${patientId}`, {
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
        const score = Object.values(responses).reduce((acc, curr) => acc + curr, 0);
        setTotalScore(score);
        setSuicideRisk(responses.q9 > 0); // Check for responses other than "not at all" for Q9
    }, [responses]);

    const handleChange = (question, value) => {
        const sanitized_question = question.replace(/[^a-zA-Z0-9_]/g, '');
        const parsedValue = parseInt(value, 10);
    
        setResponses(prev => ({
            ...prev,
            [sanitized_question]: isNaN(parsedValue) ? 0 : parsedValue
        }));
    };
    

    const getDepressionLevel = (score) => {
        if (score <= 4) return 'Minimal depression';
        if (score <= 9) return 'Mild depression';
        if (score <= 14) return 'Moderate depression';
        if (score <= 19) return 'Moderately severe depression';
        return 'Severe depression';
    };

    const handleCancel = () => {
        window.history.back();
      };

    return (
        <form onSubmit={handleSubmit}>
            <h2>PHQ-9 Depression Assessment</h2>
            <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
            
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                    <p>{i + 1}. {[
                                   "Little interest or pleasure in doing things",
                                   "Feeling down, depressed, or hopeless",
                                   "Trouble falling or staying asleep, or sleeping too much",
                                   "Feeling tired or having little energy",
                                   "Poor appetite or overeating",
                                   "Feeling bad about yourself – or that you are a failure or have let yourself or your family down",
                                   "Trouble concentrating on things, such as reading the newspaper or watching television",
                                   "Moving or speaking so slowly that other people could have noticed. Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual",
                                   "Thoughts that you would be better off dead, or of hurting yourself in some way",
                                   "If you checked off any problems, how difficult have these made it for you to do your work, take care of things at home, or get along with other people?"
                                   ][i]}</p>
                    {Array.from({ length: 4 }).map((_, j) => (
                        <label key={j}>
                            <input type="radio" name={`q${i + 1}`} value={j} 
                                   onChange={() => handleChange(`q${i + 1}`, `${j}`)} /> 
                            {['Not at all', 'Several days', 'More than half the days', 'Nearly every day'][j]} ({j})
                        </label>
                    ))}
                </div>
            ))}

            <div>
                <h3>Total Score: {totalScore}</h3>
                <p>Depression Level: {getDepressionLevel(totalScore)}</p>
                {suicideRisk && <p><strong>Attention:</strong> Suicide risk assessment needed due to response to question 9.</p>}
            </div>
            <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default PHQ9;