import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styles from '/Users/arindamgahlot/Desktop/CSCE_482/Electronic_Health_Record_Final/ehr_landing_page/src/styles/ConsentFormStyles/AppointmentLogModal.module.css';

Modal.setAppElement('#root');

const AppointmentLogModal = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newAppointment = {
      date: formData.get('date'),
      who: formData.get('who'),
      location: formData.get('location'),
      notes: formData.get('notes'),
    };
    setAppointments([...appointments, newAppointment]);
    toggleModal();
    navigate('/dashboard');
  };

  const handleCancel = () => {
    toggleModal();
    navigate('/dashboard');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="Appointment Log Modal"
      className={styles.modal}
    >
      <h2 className={styles.header}>Appointment Log</h2>
      <form onSubmit={handleSubmit}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>WHO is the appointment with</th>
              <th>Location of the appointment</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.date}</td>
                <td>{appointment.who}</td>
                <td>{appointment.location}</td>
                <td>{appointment.notes}</td>
              </tr>
            ))}
            <tr>
              <td>
                <input type="datetime-local" name="date" required />
              </td>
              <td>
                <input type="text" name="who" required />
              </td>
              <td>
                <input type="text" name="location" required />
              </td>
              <td>
                <input type="text" name="notes" />
              </td>
            </tr>
          </tbody>
          </table>
        <div className={styles.buttons}>
        <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Submit</button>
        <button type="button" onClick={handleCancel} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
      </div>
    </form>
  </Modal>
  );
};

export default AppointmentLogModal;
