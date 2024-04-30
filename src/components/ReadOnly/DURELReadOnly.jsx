import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function DURELReadOnly() {
    const { patientId, log_id } = useParams();
    const handleCancel = () => {
        window.history.back();
    };
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
                const accessToken = Cookies.get('accessToken');
                setLoading(true);
                setError(null);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/durel/${patientId}/${log_id}`, {
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

            <div>
                <p>1. How often do you attend church, synagogue, or other religious meetings?</p>
                <label><input type="radio" name="attendance" value="Never" checked={responses.attendance === 'Never'} disabled /> Never</label>
                <label><input type="radio" name="attendance" value="Once a year or less" checked={responses.attendance === 'Once a year or less'} disabled /> Once a year or less</label>
                <label><input type="radio" name="attendance" value="A few times a year" checked={responses.attendance === 'A few times a year'} disabled /> A few times a year</label>
                <label><input type="radio" name="attendance" value="A few times a month" checked={responses.attendance === 'A few times a month'} disabled /> A few times a month</label>
                <label><input type="radio" name="attendance" value="Once a week" checked={responses.attendance === 'Once a week'} disabled /> Once a week</label>
                <label><input type="radio" name="attendance" value="More than once a week" checked={responses.attendance === 'More than once a week'} disabled /> More than once a week</label>
            </div>

            <div>
                <p>2. How often do you spend time in private religious activities, such as prayer, meditation or Bible study?</p>
                <label><input type="radio" name="privateActivities" value="Rarely or never" checked={responses.privateActivities === 'Rarely or never'} disabled /> Rarely or never</label>
                <label><input type="radio" name="privateActivities" value="Once a month or less" checked={responses.privateActivities === 'Once a month or less'} disabled /> Once a month or less</label>
                <label><input type="radio" name="privateActivities" value="Once a week" checked={responses.privateActivities === 'Once a week'} disabled /> Once a week</label>
                <label><input type="radio" name="privateActivities" value="Few times a week" checked={responses.privateActivities === 'Few times a week'} disabled /> Few times a week</label>
                <label><input type="radio" name="privateActivities" value="Once a day" checked={responses.privateActivities === 'Once a day'} disabled /> Once a day</label>
                <label><input type="radio" name="privateActivities" value="More than once a day" checked={responses.privateActivities === 'More than once a day'} disabled /> More than once a day</label>
            </div>

            <div>
                <p>3. In my life, I experience the presence of the Divine.</p>
                <label><input type="radio" name="presenceDivine" value="Definitely not true" checked={responses.presenceDivine === 'Definitely not true'} disabled /> Definitely not true</label>
                <label><input type="radio" name="presenceDivine" value="Somewhat not true" checked={responses.presenceDivine === 'Somewhat not true'} disabled /> Somewhat not true</label>
                <label><input type="radio" name="presenceDivine" value="Neutral" checked={responses.presenceDivine === 'Neutral'} disabled /> Neutral</label>
                <label><input type="radio" name="presenceDivine" value="Somewhat true" checked={responses.presenceDivine === 'Somewhat true'} disabled /> Somewhat true</label>
                <label><input type="radio" name="presenceDivine" value="Definitely true" checked={responses.presenceDivine === 'Definitely true'} disabled /> Definitely true</label>
            </div>

            <div>
                <p>4. My religious beliefs are what really lie behind my whole approach to life.</p>
                <label><input type="radio" name="beliefsApproach" value="Definitely not true" checked={responses.beliefsApproach === 'Definitely not true'} disabled /> Definitely not true</label>
                <label><input type="radio" name="beliefsApproach" value="Somewhat not true" checked={responses.beliefsApproach === 'Somewhat not true'} disabled /> Somewhat not true</label>
                <label><input type="radio" name="beliefsApproach" value="Neutral" checked={responses.beliefsApproach === 'Neutral'} disabled /> Neutral</label>
                <label><input type="radio" name="beliefsApproach" value="Somewhat true" checked={responses.beliefsApproach === 'Somewhat true'} disabled /> Somewhat true</label>
                <label><input type="radio" name="beliefsApproach" value="Definitely true" checked={responses.beliefsApproach === 'Definitely true'} disabled /> Definitely true</label>
            </div>

            <div>
                <p>5. I try hard to carry my religion over into other dealings in life.</p>
                <label><input type="radio" name="religionInLife" value="Definitely not true" checked={responses.religionInLife === 'Definitely not true'} disabled /> Definitely not true</label>
                <label><input type="radio" name="religionInLife" value="Somewhat not true" checked={responses.religionInLife === 'Somewhat not true'} disabled /> Somewhat not true</label>
                <label><input type="radio" name="religionInLife" value="Neutral" checked={responses.religionInLife === 'Neutral'} disabled /> Neutral</label>
                <label><input type="radio" name="religionInLife" value="Somewhat true" checked={responses.religionInLife === 'Somewhat true'} disabled /> Somewhat true</label>
                <label><input type="radio" name="religionInLife" value="Definitely true" checked={responses.religionInLife === 'Definitely true'} disabled /> Definitely true</label>
            </div>
            <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
        </form>
    );

}

export default DURELReadOnly;