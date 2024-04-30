import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/CommunicationsLog.module.css';

const CommunicationsLog = () => {


    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; 
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const tzOffset = -now.getTimezoneOffset();
        const offsetHours = Math.abs(Math.floor(tzOffset / 60));
        const offsetMinutes = Math.abs(tzOffset % 60);
    
        const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${tzOffset >= 0 ? '+' : '-'}${offsetHours.toString().padStart(2, '0')}${offsetMinutes.toString().padStart(2, '0')}`;
    
        return formattedDateTime;
    }

    const [entry, setEntry] = useState({
        date: getCurrentDateTime(), method: '', organization: '', purpose: '', notes: '', followUp: ''
    });
    

    const { patientId } = useParams();

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setEntry(prevEntry => ({
            ...prevEntry,
            [name]: type === 'checkbox' ? checked ? "Yes" : "No" : value,
        }));
    };

    const handleCancel = () => {
        window.history.back();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/communications_log/${patientId}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dateTime: entry.date,
                    method: entry.method,
                    organizationOrPerson: entry.organization,
                    purpose: entry.purpose,
                    notes: entry.notes,
                    followUpNeeded: entry.followUp === "Yes",
                }),
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

    return (
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit}>
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
                                <td><input type="text" name="date" value={entry.date} onChange={handleChange} /></td>
                                <td>
                                    {/* Radio buttons for method selection */}
                                    <div onChange={handleChange}>
                                        <input type="radio" name="method" value="Phone" checked={entry.method === "Phone"} /> Phone
                                        <input type="radio" name="method" value="Email" checked={entry.method === "Email"} /> Email/Letter
                                        <input type="radio" name="method" value="InPerson" checked={entry.method === "InPerson"} /> In Person
                                        <input type="radio" name="method" value="VideoCall" checked={entry.method === "VideoCall"} /> Video Call
                                        <input type="radio" name="method" value="Other" checked={entry.method === "Other"} /> Other
                                    </div>
                                </td>
                                <td><input type="text" name="organization" value={entry.organization} onChange={handleChange} /></td>
                                <td><input type="text" name="purpose" value={entry.purpose} onChange={handleChange} /></td>
                                <td><input type="text" name="notes" value={entry.notes} onChange={handleChange} /></td>
                                <td>
                                <div>
                                <input
                                    type="radio"
                                    name="followUp"
                                    value="Yes"
                                    checked={entry.followUp === "Yes"}
                                    onChange={handleChange} /> Yes
                                <input
                                    type="radio"
                                    name="followUp"
                                    value="No"
                                    checked={entry.followUp === "No"}
                                    onChange={handleChange} /> No
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" onClick={handleCancel} className={`${styles.communicationsLogButton} ${styles.cancel}`}>Cancel</button>
                    <button type="submit" className={`${styles.communicationsLogButton} ${styles.submit}`}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CommunicationsLog;
