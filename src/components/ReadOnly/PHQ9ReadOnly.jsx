import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function PHQ9ReadOnly() {
    const { patientId, log_id } = useParams();
    const initialState = {
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
        q6: 0, q7: 0, q8: 0, q9: 0, q10: 0
    };

    const [responses, setResponses] = useState(initialState);
    const [totalScore, setTotalScore] = useState(0);
    const [suicideRisk, setSuicideRisk] = useState(false);

    const handleCancel = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const accessToken = Cookies.get('accessToken');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/phq9/${patientId}/${log_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    credentials: 'omit',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.status === 204) { // Handling no content
                    return;
                }
                const data = await response.json();
                setResponses(data[2].responses);
                setTotalScore(data[2].totalScore);
                setSuicideRisk(data[2].suicideRisk);

            } catch (error) {
                console.error('failed to fetch');
            }
        };

        fetchLog();
    }, [patientId, log_id]);

    const handleChange = (question, value) => {
        setResponses(prev => ({ ...prev, [question]: parseInt(value) }));
    };

    const getDepressionLevel = (score) => {
        if (score <= 4) return 'Minimal depression';
        if (score <= 9) return 'Mild depression';
        if (score <= 14) return 'Moderate depression';
        if (score <= 19) return 'Moderately severe depression';
        return 'Severe depression';
    };

    return (
        <form>
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
                            <input type="radio" name={`q${i + 1}`} value={j} checked={responses[`q${i + 1}`] === j}
                                disabled />
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
        </form>
    );
}

export default PHQ9ReadOnly;