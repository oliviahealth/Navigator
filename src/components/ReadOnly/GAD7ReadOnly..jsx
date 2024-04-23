import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GAD7ReadOnly() {
    const { patientId, log_id } = useParams();
    const initialState = {
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
        q6: 0, q7: 0, q8: 0
    };

    const [responses, setResponses] = useState(initialState);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/get_read_only_data/gad7/${patientId}/${log_id}`, {
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
                setResponses(data[2].responses);
                console.log(data[2].responses)
                setTotalScore(data[2].totalScore);
                
            } catch (error) {
                console.error('Error fetching sipport system info:', error);
            }
        };
    
        fetchLog();
    }, [patientId, log_id]);

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
        <form>
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
                    {Array.from({ length: 4 }).map((_, value) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name={`q${i + 1}`}
                                value={value}
                                checked={responses[`q${i + 1}`] === value}
                                onChange={() => handleChange(`q${i + 1}`, `${value}`)}
                            /> {['Not at all', 'Several days', 'More than half the days', 'Nearly every day'][value]} ({value})
                        </label>
                    ))}
                </div>
            ))}

            <h3>Total Score: {totalScore}</h3>
            <p>Risk Level: {getRiskLevel(totalScore)}</p>
        </form>
    );
}

export default GAD7ReadOnly;