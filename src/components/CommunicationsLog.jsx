import React, { useState } from 'react';
import styles from '../styles/CommunicationsLog.module.css';

const CommunicationsLog = () => {
    const [entries, setEntries] = useState([{
        date: '', method: '', organization: '', purpose: '', notes: '', followUp: ''
    }]);

    const addNewRow = () => {
        setEntries([...entries, { date: '', method: '', organization: '', purpose: '', notes: '', followUp: '' }]);
    };


    const handleCancel = () => {
        window.history.back();
    };

    const handleSubmit = (event) => {
        window.history.back();
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
                            {entries.map((entry, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="text" value={entry.date} onChange={(e) => {
                                            let newEntries = [...entries];
                                            newEntries[index].date = e.target.value;
                                            setEntries(newEntries);
                                        }} />
                                    </td>
                                    <td>
                                        <input type="radio" name={`method${index}`} value="Phone" checked={entry.method === "Phone"} onChange={() => {
                                            let newEntries = [...entries];
                                            newEntries[index].method = "Phone";
                                            setEntries(newEntries);
                                        }} /> Phone
                                        <input type="radio" name={`method${index}`} value="Email" checked={entry.method === "Email"} onChange={() => {
                                            let newEntries = [...entries];
                                            newEntries[index].method = "Email";
                                            setEntries(newEntries);
                                        }} /> Email/Letter
                                        <input type="radio" name={`method${index}`} value="InPerson" checked={entry.method === "InPerson"} onChange={() => {
                                            let newEntries = [...entries];
                                            newEntries[index].method = "InPerson";
                                            setEntries(newEntries);
                                        }} /> In Person
                                        <input type="radio" name={`method${index}`} value="VideoCall" checked={entry.method === "VideoCall"} onChange={() => {
                                            let newEntries = [...entries];
                                            newEntries[index].method = "VideoCall";
                                            setEntries(newEntries);
                                        }} /> Video Call
                                        <input type="radio" name={`method${index}`} value="Other" checked={entry.method === "Other"} onChange={() => {
                                            let newEntries = [...entries];
                                            newEntries[index].method = "Other";
                                            setEntries(newEntries);
                                        }} /> Other
                                    </td>
                                    <td>
                                        <input type="text" value={entry.organization} onChange={(e) => {
                                            let newEntries = [...entries];
                                            newEntries[index].organization = e.target.value;
                                            setEntries(newEntries);
                                        }} />
                                    </td>
                                    <td>
                                        <input type="text" value={entry.purpose} onChange={(e) => {
                                            let newEntries = [...entries];
                                            newEntries[index].purpose = e.target.value;
                                            setEntries(newEntries);
                                        }} />
                                    </td>
                                    <td>
                                        <input type="text" value={entry.notes} onChange={(e) => {
                                            let newEntries = [...entries];
                                            newEntries[index].notes = e.target.value;
                                            setEntries(newEntries);
                                        }} />
                                    </td>
                                    <td>
                                        <input type="checkbox" name={`followUp${index}`} value="Yes" checked={entry.followUp === "Yes"} onChange={() => {
                                            let newEntries = [...entries];
                                            newEntries[index].followUp = "Yes";
                                            setEntries(newEntries);
                                        }} /> Yes
                                        <input type="checkbox" name={`followUp${index}`} value="No" checked={entry.followUp === "No"} onChange={() => {
                                            let newEntries = [...entries];
                                            newEntries[index].followUp = "No";
                                            setEntries(newEntries);
                                        }} /> No
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="button" onClick={addNewRow} className={`${styles.communicationsLogButton} ${styles.addNewRow}`}>Add a New Row</button>
                    <button type="button" onClick={handleCancel} className={`${styles.communicationsLogButton} ${styles.cancel}`}>Cancel</button>
                    <button type="submit" className={`${styles.communicationsLogButton} ${styles.submit}`}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CommunicationsLog;
