import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DURELReadOnly() {
    const { patientId, log_id } = useParams();
    const initialState = {
        attendance: '',
        privateActivities: '',
        presenceDivine: '',
        beliefsApproach: '',
        religionInLife: ''
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
                setResponses(data[2])
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
    
            {/* Question 1 */}
            <div>
                <p>1. How often do you attend church, synagogue, or other religious meetings?</p>
                <label><input type="radio" name="attendance" value="Never" checked={responses.attendance === 'Never'} onChange={() => handleChange('attendance', 'Never')} /> Never</label>
                <label><input type="radio" name="attendance" value="Once a year or less" checked={responses.attendance === 'Once a year or less'} onChange={() => handleChange('attendance', 'Once a year or less')} /> Once a year or less</label>
                <label><input type="radio" name="attendance" value="A few times a year" checked={responses.attendance === 'A few times a year'} onChange={() => handleChange('attendance', 'A few times a year')} /> A few times a year</label>
                <label><input type="radio" name="attendance" value="A few times a month" checked={responses.attendance === 'A few times a month'} onChange={() => handleChange('attendance', 'A few times a month')} /> A few times a month</label>
                <label><input type="radio" name="attendance" value="Once a week" checked={responses.attendance === 'Once a week'} onChange={() => handleChange('attendance', 'Once a week')} /> Once a week</label>
                <label><input type="radio" name="attendance" value="More than once a week" checked={responses.attendance === 'More than once a week'} onChange={() => handleChange('attendance', 'More than once a week')} /> More than once a week</label>
            </div>
    
            {/* Question 2 */}
            <div>
                <p>2. How often do you spend time in private religious activities, such as prayer, meditation or Bible study?</p>
                <label><input type="radio" name="privateActivities" value="Rarely or never" checked={responses.privateActivities === 'Rarely or never'} onChange={() => handleChange('privateActivities', 'Rarely or never')} /> Rarely or never</label>
                <label><input type="radio" name="privateActivities" value="Once a month or less" checked={responses.privateActivities === 'Once a month or less'} onChange={() => handleChange('privateActivities', 'Once a month or less')} /> Once a month or less</label>
                <label><input type="radio" name="privateActivities" value="Once a week" checked={responses.privateActivities === 'Once a week'} onChange={() => handleChange('privateActivities', 'Once a week')} /> Once a week</label>
                <label><input type="radio" name="privateActivities" value="Few times a week" checked={responses.privateActivities === 'Few times a week'} onChange={() => handleChange('privateActivities', 'Few times a week')} /> Few times a week</label>
                <label><input type="radio" name="privateActivities" value="Once a day" checked={responses.privateActivities === 'Once a day'} onChange={() => handleChange('privateActivities', 'Once a day')} /> Once a day</label>
                <label><input type="radio" name="privateActivities" value="More than once a day" checked={responses.privateActivities === 'More than once a day'} onChange={() => handleChange('privateActivities', 'More than once a day')} /> More than once a day</label>
            </div>
    
            {/* Question 3 */}
            <div>
                <p>3. In my life, I experience the presence of the Divine.</p>
                <label><input type="radio" name="presenceDivine" value="Definitely not true" checked={responses.presenceDivine === 'Definitely not true'} onChange={() => handleChange('presenceDivine', 'Definitely not true')} /> Definitely not true</label>
                <label><input type="radio" name="presenceDivine" value="Somewhat not true" checked={responses.presenceDivine === 'Somewhat not true'} onChange={() => handleChange('presenceDivine', 'Somewhat not true')} /> Somewhat not true</label>
                <label><input type="radio" name="presenceDivine" value="Neutral" checked={responses.presenceDivine === 'Neutral'} onChange={() => handleChange('presenceDivine', 'Neutral')} /> Neutral</label>
                <label><input type="radio" name="presenceDivine" value="Somewhat true" checked={responses.presenceDivine === 'Somewhat true'} onChange={() => handleChange('presenceDivine', 'Somewhat true')} /> Somewhat true</label>
                <label><input type="radio" name="presenceDivine" value="Definitely true" checked={responses.presenceDivine === 'Definitely true'} onChange={() => handleChange('presenceDivine', 'Definitely true')} /> Definitely true</label>
            </div>
    
            {/* Question 4 */}
            <div>
                <p>4. My religious beliefs are what really lie behind my whole approach to life.</p>
                <label><input type="radio" name="beliefsApproach" value="Definitely not true" checked={responses.beliefsApproach === 'Definitely not true'} onChange={() => handleChange('beliefsApproach', 'Definitely not true')} /> Definitely not true</label>
                <label><input type="radio" name="beliefsApproach" value="Somewhat not true" checked={responses.beliefsApproach === 'Somewhat not true'} onChange={() => handleChange('beliefsApproach', 'Somewhat not true')} /> Somewhat not true</label>
                <label><input type="radio" name="beliefsApproach" value="Neutral" checked={responses.beliefsApproach === 'Neutral'} onChange={() => handleChange('beliefsApproach', 'Neutral')} /> Neutral</label>
                <label><input type="radio" name="beliefsApproach" value="Somewhat true" checked={responses.beliefsApproach === 'Somewhat true'} onChange={() => handleChange('beliefsApproach', 'Somewhat true')} /> Somewhat true</label>
                <label><input type="radio" name="beliefsApproach" value="Definitely true" checked={responses.beliefsApproach === 'Definitely true'} onChange={() => handleChange('beliefsApproach', 'Definitely true')} /> Definitely true</label>
            </div>
    
            {/* Question 5 */}
            <div>
                <p>5. I try hard to carry my religion over into other dealings in life.</p>
                <label><input type="radio" name="religionInLife" value="Definitely not true" checked={responses.religionInLife === 'Definitely not true'} onChange={() => handleChange('religionInLife', 'Definitely not true')} /> Definitely not true</label>
                <label><input type="radio" name="religionInLife" value="Somewhat not true" checked={responses.religionInLife === 'Somewhat not true'} onChange={() => handleChange('religionInLife', 'Somewhat not true')} /> Somewhat not true</label>
                <label><input type="radio" name="religionInLife" value="Neutral" checked={responses.religionInLife === 'Neutral'} onChange={() => handleChange('religionInLife', 'Neutral')} /> Neutral</label>
                <label><input type="radio" name="religionInLife" value="Somewhat true" checked={responses.religionInLife === 'Somewhat true'} onChange={() => handleChange('religionInLife', 'Somewhat true')} /> Somewhat true</label>
                <label><input type="radio" name="religionInLife" value="Definitely true" checked={responses.religionInLife === 'Definitely true'} onChange={() => handleChange('religionInLife', 'Definitely true')} /> Definitely true</label>
            </div>
        </form>
    );
    
}

export default DURELReadOnly;