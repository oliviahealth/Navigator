import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DURELReadOnly() {
    const { patientId, log_id } = useParams();
    const initialState = {
        attendance: null,
        privateActivities: null,
        presenceDivine: null,
        beliefsApproach: null,
        religionInLife: null
    };

    const [responses, setResponses] = useState(initialState);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLog = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`http://localhost:5000/api/get_read_only_data/durel/${patientId}/${log_id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setResponses({
                    ...initialState,
                    ...data[2]
                  });
                console.log(data[2])
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLog();
    }, [patientId, log_id]);

    

    const handleChange = (field, value) => {
        setResponses(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <form>
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
        </form>
    );
}

export default DURELReadOnly;