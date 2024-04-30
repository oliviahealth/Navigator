import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function PSSReadOnly() {
    const { patientId, log_id } = useParams();
    const initialState = {
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
        q6: 0, q7: 0, q8: 0, q9: 0, q10: 0
    };

    const [responses, setResponses] = useState(initialState);
    const [totalScore, setTotalScore] = useState(0);

    const handleCancel = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const accessToken = Cookies.get('accessToken');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/pss/${patientId}/${log_id}`, {
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

            } catch (error) {
            }
        };

        fetchLog();
    }, [patientId, log_id]);

    const getStressLevel = (score) => {
        if (score < 14) return 'Low stress';
        if (score < 27) return 'Moderate stress';
        return 'High perceived stress';
    };

    return (
        <form>
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
                            <input type="radio" name={`q${i + 1}`} value={j} checked={responses[`q${i + 1}`] === j}
                                disabled />
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
        </form>
    );
}

export default PSSReadOnly;