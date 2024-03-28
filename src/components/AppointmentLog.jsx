import React, { useState, useEffect } from 'react';
import styles from '../styles/AppointmentLog.module.css';

const AppointmentLog = () => {
    // Adjust state to handle a single object instead of an array
    const [entry, setEntry] = useState({
        date: '', who: '', location: '', notes: ''
    });

    const handleCancel = () => {
        window.history.back();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntry(prevEntry => ({
            ...prevEntry,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchEntry = async () => {
            const response = await fetch('http://localhost:5000/api/get_appointment_log', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error(`Failed to fetch appointment log: ${response.statusText}`);
                return;
            }

            const data = await response.json();
            if (data) {
                setEntry({
                    date: data.dateTime || '',
                    who: data.who || '',
                    location: data.location || '',
                    notes: data.notes || ''
                });
            }
        };

        fetchEntry();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/appointment_log', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dateTime: entry.date,
                    who: entry.who,
                    location: entry.location,
                    notes: entry.notes,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Successfully submitted:', data);
            
            setEntry({ date: '', who: '', location: '', notes: '' });
            window.history.back();
        } catch (error) {
            console.error('Failed to submit:', error);
            // Handle submission error here
        }
    };

    return (
        <div className={styles.pageContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.pageContent}>
                    <h1>Appointment Log</h1>
                    <div className={styles.appointmentLogForm}>
                        <label>Date / Time</label>
                        <input 
                            type="text" 
                            name="date" 
                            value={entry.date} 
                            onChange={handleChange} 
                        />
                        
                        <label>WHO is the appointment with</label>
                        <input 
                            type="text" 
                            name="who" 
                            value={entry.who} 
                            onChange={handleChange} 
                        />

                        <label>Location of the appointment</label>
                        <input 
                            type="text" 
                            name="location" 
                            value={entry.location} 
                            onChange={handleChange} 
                        />

                        <label>Notes</label>
                        <textarea 
                            name="notes" 
                            value={entry.notes} 
                            onChange={handleChange} 
                        />
                    </div>
                    <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentLog;
