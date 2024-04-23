import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EPDSReadOnly() {
    const { patientId, log_id } = useParams();
    const initialState = {
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: ''
    };

    const [responses, setResponses] = useState(initialState);

    const ehrState = {
        participantName: '',
        caseId: '',
        dateCompleted: '',
        staffName: '',
        timeframe: '',
        answer10: '',
        totalScore: '',
        notes: ''
    };
    const [ehrInfo, setEhrInfo] = useState(ehrState);

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/get_read_only_data/epds/${patientId}/${log_id}`, {
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
                setResponses(
                    data[2].responses
                );
                setEhrInfo(
                    data[2].ehrInfo
                );
                
            } catch (error) {
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

    const handleEhrChange = (field, value) => {
        setEhrInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <form>
            <h2>Edinburgh Postnatal Depression Scale (EPDS)</h2>
            <p>Please underline the answer which comes closest to how you have felt in the past 7 days, not just how you feel today.</p>
            
            <div>
                <p>1. I have been able to laugh and see the funny side of things</p>
                <label><input type="radio" name="q1" value="0" checked={responses.q1 === '0'} onChange={() => handleChange('q1', '0')} /> As much as I always could (0)</label>
                <label><input type="radio" name="q1" value="1" checked={responses.q1 === '1'} onChange={() => handleChange('q1', '1')} /> Not quite so much now (1)</label>
                <label><input type="radio" name="q1" value="2" checked={responses.q1 === '2'} onChange={() => handleChange('q1', '2')} /> Definitely not so much now (2)</label>
                <label><input type="radio" name="q1" value="3" checked={responses.q1 === '3'} onChange={() => handleChange('q1', '3')} /> Not at all (3)</label>
            </div>

            <div>
                <p>2. I have looked forward with enjoyment to things</p>
                <label><input type="radio" name="q2" value="0" checked={responses.q2 === '0'} onChange={() => handleChange('q2', '0')} /> As much as I ever did (0)</label>
                <label><input type="radio" name="q2" value="1" checked={responses.q1 === '1'} onChange={() => handleChange('q2', '1')} /> Rather less than I used to (1)</label>
                <label><input type="radio" name="q2" value="2" checked={responses.q1 === '2'} onChange={() => handleChange('q2', '2')} /> Definitely less than I used to (2)</label>
                <label><input type="radio" name="q2" value="3" checked={responses.q1 === '3'} onChange={() => handleChange('q2', '3')} /> Hardly at all (3)</label>
            </div>

            <div>
                <p>3. I have blamed myself unnecessarily when things went wrong</p>
                <label><input type="radio" name="q3" value="3" checked={responses.q3 === '3'} onChange={() => handleChange('q3', '3')} /> Yes, most of the time (3)</label>
                <label><input type="radio" name="q3" value="2" checked={responses.q3 === '2'} onChange={() => handleChange('q3', '2')} /> Yes, some of the time (2)</label>
                <label><input type="radio" name="q3" value="1" checked={responses.q3 === '1'} onChange={() => handleChange('q3', '1')} /> Not very often (1)</label>
                <label><input type="radio" name="q3" value="0" checked={responses.q3 === '0'} onChange={() => handleChange('q3', '0')} /> No, never (0)</label>
            </div>

            <div>
                <p>4. I have been anxious or worried for no good reason</p>
                <label><input type="radio" name="q4" value="0" checked={responses.q4 === '0'} onChange={() => handleChange('q4', '0')} /> No, not at all (0)</label>
                <label><input type="radio" name="q4" value="1" checked={responses.q4 === '1'}  onChange={() => handleChange('q4', '1')} /> Hardly ever (1)</label>
                <label><input type="radio" name="q4" value="2" checked={responses.q4 === '2'} onChange={() => handleChange('q4', '2')} /> Yes, sometimes (2)</label>
                <label><input type="radio" name="q4" value="3" checked={responses.q4 === '3'} onChange={() => handleChange('q4', '3')} /> Yes, very often (3)</label>
            </div>

            <div>
                <p>5. I have felt scared or panicky for no very good reason</p>
                <label><input type="radio" name="q5" value="3" checked={responses.q5 === '3'} onChange={() => handleChange('q5', '3')} /> Yes, quite a lot (3)</label>
                <label><input type="radio" name="q5" value="2" checked={responses.q5 === '2'} onChange={() => handleChange('q5', '2')} /> Yes, sometimes (2)</label>
                <label><input type="radio" name="q5" value="1" checked={responses.q5 === '1'} onChange={() => handleChange('q5', '1')} /> No, not much (1)</label>
                <label><input type="radio" name="q5" value="0" checked={responses.q5 === '0'} onChange={() => handleChange('q5', '0')} /> No, not at all (0)</label>
            </div>

            <div>
                <p>6. Things have been getting on top of me</p>
                <label><input type="radio" name="q6" value="3" checked={responses.q6 === '3'} onChange={() => handleChange('q6', '3')} /> Yes, most of the time I haven’t been able to cope at all (3)</label>
                <label><input type="radio" name="q6" value="2" checked={responses.q6 === '2'} onChange={() => handleChange('q6', '2')} /> Yes, sometimes I haven’t been coping as well as usual (2)</label>
                <label><input type="radio" name="q6" value="1" checked={responses.q6 === '1'} onChange={() => handleChange('q6', '1')} /> No, most of the time I have coped quite well (1)</label>
                <label><input type="radio" name="q6" value="0" checked={responses.q6 === '0'} onChange={() => handleChange('q6', '0')} /> No, have been coping as well as ever (0)</label>
            </div>

            <div>
                <p>7. I have been so unhappy that I have had difficulty sleeping</p>
                <label><input type="radio" name="q7" value="3" checked={responses.q7 === '3'} onChange={() => handleChange('q7', '3')} /> Yes, most of the time (3)</label>
                <label><input type="radio" name="q7" value="2" checked={responses.q7 === '2'} onChange={() => handleChange('q7', '2')} /> Yes, sometimes (2)</label>
                <label><input type="radio" name="q7" value="1" checked={responses.q7 === '1'} onChange={() => handleChange('q7', '1')} /> Not very often (1)</label>
                <label><input type="radio" name="q7" value="0" checked={responses.q7 === '0'} onChange={() => handleChange('q7', '0')} /> No, not at all (0)</label>
            </div>

            <div>
                <p>8. I have felt sad or miserable</p>
                <label><input type="radio" name="q8" value="3" checked={responses.q8 === '3'} onChange={() => handleChange('q8', '3')} /> Yes, most of the time (3)</label>
                <label><input type="radio" name="q8" value="2" checked={responses.q8 === '2'} onChange={() => handleChange('q8', '2')} /> Yes, quite often (2)</label>
                <label><input type="radio" name="q8" value="1" checked={responses.q8 === '1'} onChange={() => handleChange('q8', '1')} /> Not very often (1)</label>
                <label><input type="radio" name="q8" value="0" checked={responses.q8 === '0'} onChange={() => handleChange('q8', '0')} /> No, not at all (0)</label>
            </div>

            <div>
                <p>9. I have been so unhappy that I have been crying</p>
                <label><input type="radio" name="q9" value="3" checked={responses.q9 === '3'} onChange={() => handleChanges('q9', '3')} /> Yes, most of the time (3)</label>
                <label><input type="radio" name="q9" value="2" checked={responses.q9 === '2'} onChange={() => handleChange('q9', '2')} /> Yes, quite often (2)</label>
                <label><input type="radio" name="q9" value="1" checked={responses.q9 === '1'} onChange={() => handleChange('q9', '1')} /> Only occasionally (1)</label>
                <label><input type="radio" name="q9" value="0" checked={responses.q9 === '0'} onChange={() => handleChange('q9', '0')} /> No, never (0)</label>
            </div>

            <div>
                <p>10. The thought of harming myself has occurred to me</p>
                <label><input type="radio" name="q10" value="3" checked={responses.q10 === '3'} onChange={() => handleChange('q10', '3')} /> Yes, quite often (3)</label>
                <label><input type="radio" name="q10" value="2" checked={responses.q10 === '2'} onChange={() => handleChange('q10', '2')} /> Sometimes (2)</label>
                <label><input type="radio" name="q10" value="1" checked={responses.q10 === '1'} onChange={() => handleChange('q10', '1')} /> Hardly ever (1)</label>
                <label><input type="radio" name="q10" value="0" checked={responses.q10 === '0'} onChange={() => handleChange('q10', '0')} /> Never (0)</label>
            </div>

            <div>
                <h3>Guidance: PAGEONE-EHR: Edinburgh (EPDS) Results TouchPoint</h3>
                <label>Participant Name:
                    <input type="text" value={ehrInfo.participantName} onChange={(e) => handleEhrChange('participantName', e.target.value)} />
                </label>
                <label>Case ID:
                    <input type="text" value={ehrInfo.caseId} onChange={(e) => handleEhrChange('caseId', e.target.value)} />
                </label>
                <label>Date Completed*:
                    <input type="date" value={ehrInfo.dateCompleted} onChange={(e) => handleEhrChange('dateCompleted', e.target.value)} />
                </label>
                <label>Staff Name:
                    <input type="text" value={ehrInfo.staffName} onChange={(e) => handleEhrChange('staffName', e.target.value)} />
                </label>
                <label>Timeframe*:
                    <select value={ehrInfo.timeframe} onChange={(e) => handleEhrChange('timeframe', e.target.value)}>
                        <option value="">Select</option>
                        <option value="prenatal">Prenatal</option>
                        <option value="postnatal">Postnatal</option>
                    </select>
                </label>
                <label>Answer to #10:
                    <select value={ehrInfo.answer10} onChange={(e) => handleEhrChange('answer10', e.target.value)}>
                        <option value="">Select</option>
                        <option value="often">Yes, quite often</option>
                        <option value="sometimes">Sometimes</option>
                        <option value="hardly">Hardly ever</option>
                        <option value="never">Never</option>
                    </select>
                </label>
                <label>Total Score:
                    <input type="number" value={ehrInfo.totalScore} onChange={(e) => handleEhrChange('totalScore', e.target.value)} />
                </label>
                <label>Notes:
                    <textarea value={ehrInfo.notes} onChange={(e) => handleEhrChange('notes', e.target.value)}></textarea>
                </label>
            </div>
        </form>
    );
}

export default EPDSReadOnly;