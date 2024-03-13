import React, { useState } from 'react';
import styles from '../styles/AppointmentLog.module.css';

const AppointmentLog = () => {
    const [entries, setEntries] = useState([
        { date: '', who: '', location: '', notes: '' }
    ]);

    const addNewRow = () => {
        setEntries(entries.concat({ date: '', who: '', location: '', notes: '' }));
    };

    const handleCancel = () => {
        window.history.back();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.pageContent}>
                    <h1>Appointment Log</h1>
                    <table className={styles.appointmentLogTable}>
                        <thead>
                            <tr>
                                <th>Date / Time</th>
                                <th>WHO is the appointment with (Participant ... plus anyone else who joined the interaction)</th>
                                <th>Location of the appointment (home, park, coffee shop etc)</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="text" value={entry.date} onChange={(e) => {
                                            const newEntries = [...entries];
                                            newEntries[index].date = e.target.value;
                                            setEntries(newEntries);
                                        }} />
                                    </td>
                                    <td>
                                        <input type="text" value={entry.who} onChange={(e) => {
                                            const newEntries = [...entries];
                                            newEntries[index].who = e.target.value;
                                            setEntries(newEntries);
                                        }} />
                                    </td>
                                    <td>
                                        <input type="text" value={entry.location} onChange={(e) => {
                                            const newEntries = [...entries];
                                            newEntries[index].location = e.target.value;
                                            setEntries(newEntries);
                                        }} />
                                    </td>
                                    <td>
                                        <textarea value={entry.notes} onChange={(e) => {
                                            const newEntries = [...entries];
                                            newEntries[index].notes = e.target.value;
                                            setEntries(newEntries);
                                        }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="button" onClick={addNewRow} className={styles.addNewRowButton}>Add a New Row</button>
                    <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentLog;
