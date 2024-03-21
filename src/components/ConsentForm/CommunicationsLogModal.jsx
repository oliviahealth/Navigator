import React from 'react';
import styles from "../../styles/ConsentFormStyles/CommunicationsLogModal.module.css";

const CommunicationsLogModal = ({ isOpen, close }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
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
                        <tr>
                            <td>//</td>
                            <td>
                                <input type="radio" name="method" id="phone" /><label htmlFor="phone">Phone</label>
                                <input type="radio" name="method" id="email" /><label htmlFor="email">Email/Letter</label>
                                <input type="radio" name="method" id="inPerson" /><label htmlFor="inPerson">In Person</label>
                                <input type="radio" name="method" id="videoCall" /><label htmlFor="videoCall">Video call</label>
                                <input type="radio" name="method" id="other" /><label htmlFor="other">Other</label>
                            </td>
                            <td>**CAPSTONE TEAM! ...</td>
                            <td></td>
                            <td></td>
                            <td>
                                <input type="checkbox" name="followUpYes" id="yes" value="Yes" /><label htmlFor="yes">Yes</label>
                                <input type="checkbox" name="followUpNo" id="no" value="No" /><label htmlFor="no">No</label>
                            </td>
                        </tr>
                        {/* Add more <tr> elements here for additional entries */}
                    </tbody>
                </table>
                <button onClick={close} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default CommunicationsLogModal;
