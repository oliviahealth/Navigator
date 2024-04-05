import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/CommunicationsLog.module.css';

const CommunicationsLogReadOnly = () => {
    const [entry, setEntry] = useState({
        date: '', method: '', organization: '', purpose: '', notes: '', followUp: ''
    });

    const handleCancel = () => {
        window.history.back();
    };

    const { patientId, log_id } = useParams();

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/get_communication_log/${patientId}/${log_id}`, {
                  method: 'GET',
                  credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.status === 204) { // Handling no content
                    console.log("No communication log found for the selected patient.");
                    return; // Early return if no content
                }
                const data = await response.json();
                
                setEntry({
                    date: data.date_time,
                    method: data.method,
                    organization: data.organization_or_person,
                    purpose: data.purpose,
                    notes: data.notes,
                    followUp: data.follow_up_needed ? "Yes" : "No",
                });
            } catch (error) {
                console.error('Error fetching communication log:', error);
            }
        };
    
        fetchLog();
    }, []);
    

    return (
        <div className={styles.pageContainer}>
            <form>
                <div className={styles.pageContent}> 
                    <h1>Communications Log</h1>
                    <table className={styles.communicationsLogTable}>
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Method</th>
                                <th>Organization or Person</th>
                                <th>Purpose</th>
                                <th>Notes</th>
                                <th>Follow Up Needed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Single row for entry */}
                            <tr>
                                <td><input type="text" name="date" value={entry.date} readOnly /></td>
                                <td>
                                    {/* Radio buttons for method selection */}
                                    <div>
                                        <input type="radio" name="method" value="Phone" checked={entry.method === "Phone"} /> Phone
                                        <input type="radio" name="method" value="Email" checked={entry.method === "Email"} /> Email/Letter
                                        <input type="radio" name="method" value="InPerson" checked={entry.method === "InPerson"} /> In Person
                                        <input type="radio" name="method" value="VideoCall" checked={entry.method === "VideoCall"} /> Video Call
                                        <input type="radio" name="method" value="Other" checked={entry.method === "Other"} /> Other
                                    </div>
                                </td>
                                <td><input type="text" name="organization" value={entry.organization} readOnly/></td>
                                <td><input type="text" name="purpose" value={entry.purpose} readOnly/></td>
                                <td><input type="text" name="notes" value={entry.notes} readOnly /></td>
                                <td>
                                    {/* Checkbox for followUp */}
                                    <div>
                                        <input type="checkbox" name="followUp" value="Yes" checked={entry.followUp === "Yes"} /> Yes
                                        <input type="checkbox" name="followUp" value="No" checked={entry.followUp === "No"} /> No
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" onClick={handleCancel} className={`${styles.communicationsLogButton} ${styles.cancel}`}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default CommunicationsLogReadOnly;
