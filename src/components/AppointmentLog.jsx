import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/AppointmentLog.module.css';

const AppointmentLog = () => {
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
        date: getCurrentDateTime(), who: '', location: '', notes: ''
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

    const { patientId } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5000/api/appointment_log/${patientId}`, {
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