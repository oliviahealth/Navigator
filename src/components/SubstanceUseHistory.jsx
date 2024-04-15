import React, { useState } from 'react';
import styles from '../styles/SubstanceUseHistory.module.css';

const initialSubstances = [
  { name: 'Alcohol', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: 'Amphetamines (ex. Adderall, “meth”)', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: 'Benzodiazepines (ex. Xanax)', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: 'Cannabis (“marijuana”)', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: 'Cocaine', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: 'Heroin', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: 'Kush (synthetic marijuana)', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: 'Prescription Drugs (ex. pain medications)', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: 'Tobacco', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' },
  { name: '', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '', isOther: true },
  { name: '', everUsed: false, usedDuringPregnancy: false, dateLastUsed: '', isOther: true },
];


const SubstanceUseHistory = () => {
  const [substances, setSubstances] = useState(initialSubstances);
  const [mat, setMat] = useState({
    engaged: '',
    medicationDetails: '',
    matClinicInfo: '',
  });
  const [addictionServices, setAddictionServices] = useState({
    status: '',
    lastAppointment: '',
    clinicInfo: '',
  });

  const handleSubstanceChange = (index, field, value) => {
    const updatedSubstances = [...substances];
    updatedSubstances[index][field] = value;
    setSubstances(updatedSubstances);
  };

  // Handlers for MAT and Addiction Medicine Services would be similar

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement submission logic here
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className={styles.substanceUseHistory}>
      <form onSubmit={handleSubmit}>
      <h1>Substance Use History</h1>
      <p>
      Update at each Encounter/Visit  
      <br  /><br  />
      Complete with Participant 
      <br  /><br  />
      Follow up as indicated with Provider, Social Worker, Case Manager, Recovery Coach, etc. 
      </p>
        <table className={styles.substanceTable}>
          <thead>
          <tr>
            <th colSpan="4" className={styles.tableHeader}>
            SUBSTANCE USE HISTORY Complete with Client / Family.<br />
            Follow up as needed with: Complete with Client / Family. Treatment Case Manager, Recovery Coach
            </th>
          </tr>
            <tr>
              <th>Substance</th>
              <th>Ever Used</th>
              <th>Used During Pregnancy</th>
              <th>Date Last Used</th>
            </tr>
          </thead>
          <tbody>
          {substances.map((substance, index) => (
            <tr key={index}>
                <td>
                {substance.isOther ? (
                    <input
                    type="text"
                    placeholder="Other substance"
                    value={substance.name}
                    onChange={(e) => handleSubstanceChange(index, 'name', e.target.value)}
                    />
                ) : (
                    substance.name
                )}
                </td>
                <td>
                <label>
                    Yes
                    <input
                    type="checkbox"
                    checked={substance.everUsed === true}
                    onChange={(e) => handleSubstanceChange(index, 'everUsed', true)}
                    />
                </label>
                <label>
                    No
                    <input
                    type="checkbox"
                    checked={substance.everUsed === false}
                    onChange={(e) => handleSubstanceChange(index, 'everUsed', false)}
                    />
                </label>
                </td>
                <td>
                <label>
                    Yes
                    <input
                    type="checkbox"
                    checked={substance.usedDuringPregnancy === true}
                    onChange={(e) => handleSubstanceChange(index, 'usedDuringPregnancy', true)}
                    />
                </label>
                <label>
                    No
                    <input
                    type="checkbox"
                    checked={substance.usedDuringPregnancy === false}
                    onChange={(e) => handleSubstanceChange(index, 'usedDuringPregnancy', false)}
                    />
                </label>
                </td>
                <td>
                <input
                    type="date"
                    value={substance.dateLastUsed}
                    onChange={(e) => handleSubstanceChange(index, 'dateLastUsed', e.target.value)}
                />
                </td>
            </tr>
            ))}
          </tbody>
          <tfoot>
        <tr>
            <td colSpan="4">
            <input
                type="text"
                placeholder="Notes"
                className={styles.notesInput}
            />
            </td>
        </tr>
        </tfoot>
        </table>
        
        <table className={styles.medicalServicesTable}>
        <thead>
            <tr>
            <th colSpan="2" className={styles.tableHeader}>
                MEDICAL SERVICES FOR SUBSTANCE USE Complete with Client / Family.
                <br />
                Follow up as needed with Physician, Nurse Practitioner, Medication Assisted Treatment (MAT) Provider
            </th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td colSpan="2" className={styles.tableRowHeader}>
                Medication Assisted Treatment (MAT) Engaged: 
                <label>
                <input type="checkbox" name="matEngaged" value="Never" /> Never
                </label>
                <label>
                <input type="checkbox" name="matEngaged" value="Currently" /> Currently
                </label>
                <label>
                <input type="checkbox" name="matEngaged" value="Prior" /> Prior MAT use
                </label>
                Date of Last use:
                <input type="date" name="matLastUseDate" />
            </td>
            </tr>
            <tr>
            <td className={styles.tableRowHeader}>
                Medication(s), Dose(s), and Date(s):
                <textarea name="matMedications" className={styles.largeInput} />
            </td>
            <td className={styles.tableRowHeader}>
                Name and Contact Information for MAT Clinic:
                <textarea name="matClinicInfo" className={styles.largeInput} />
            </td>
            </tr>
            <tr>
            <td colSpan="2" className={styles.tableRowHeader}>
                Addiction Medicine Services:
                <label>
                <input type="checkbox" name="addictionServices" value="Never" /> Never
                </label>
                <label>
                <input type="checkbox" name="addictionServices" value="Currently" /> Currently
                </label>
                <label>
                <input type="checkbox" name="addictionServices" value="Prior" /> Prior, Date of Last Appointment:
                </label>
                <input type="date" name="addictionLastAppointmentDate" />
            </td>
            </tr>
            <tr>
            <td colSpan="2" className={styles.tableRowHeader}>
                Name and Contact Information for Addiction Medicine Clinic:
                <textarea name="addictionClinicInfo" className={styles.largeInput} />
            </td>
            </tr>
        </tbody>
        </table>


        
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default SubstanceUseHistory;
