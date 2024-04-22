import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/AppointmentLog.module.css';

const AppointmentLogReadOnly = () => {
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

    const { patientId, log_id } = useParams();

    useEffect(() => {
        const fetchLog = async () => {
          try {
            const response = await fetch(
              `http://localhost:5000/api/get_appointment_log/${patientId}/${log_id}`,
              {
                method: 'GET',
                credentials: 'include',
              }
            );
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            if (response.status === 204) {
              // Handling no content
              setEntry({ date: '', who: '', location: '', notes: '' });
              return; // Early return if no content
            }
      
            const data = await response.json();
            setEntry({
              date: data.dateTime || '',
              who: data.who || '',
              location: data.location || '',
              notes: data.notes || '',
            });
          } catch (error) {
            console.error('Error fetching communication log:', error);
          }
        };
      
        fetchLog();
      }, [patientId, log_id]);

    return (
        <div className={styles.pageContainer}>
            <form>
                <div className={styles.pageContent}>
                    <h1>Appointment Log</h1>
                    <div className={styles.appointmentLogForm}>
                        <label>Date / Time</label>
                        <input 
                            type="text" 
                            name="date" 
                            value={entry.date} 
                            readOnly
                        />
                        
                        <label>WHO is the appointment with</label>
                        <input 
                            type="text" 
                            name="who" 
                            value={entry.who} 
                            readOnly
                        />

                        <label>Location of the appointment</label>
                        <input 
                            type="text" 
                            name="location" 
                            value={entry.location} 
                            readOnly
                        />

                        <label>Notes</label>
                        <textarea 
                            name="notes" 
                            value={entry.notes} 
                            readOnly
                        />
                    </div>
                    <button type="button" onClick={handleCancel} className={styles.cancelButton}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentLogReadOnly;
