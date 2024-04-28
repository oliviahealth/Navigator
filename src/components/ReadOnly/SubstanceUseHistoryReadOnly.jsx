import React, { useState, useEffect } from 'react';
import styles from '../../styles/SubstanceUseHistory.module.css';
import { useParams } from 'react-router-dom';

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


const SubstanceUseHistoryReadOnly = () => {
  const { patientId, log_id } = useParams();
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

  const handleSetMat = (field, value) => {
    setMat(prevMat => ({
      ...prevMat,
      [field]: value,
    }));
  };

  const handleSetAddictionServices = (field, value) => {
    setAddictionServices(prevServices => ({
      ...prevServices,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/substance_use_history/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                return; 
            }
            const data = await response.json();
            setSubstances(data[2].substances)
            setMat(data[2].mat)
            setAddictionServices(data[2].addictionServices)
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  const handleSubstanceChange = (index, field, value) => {
    const updatedSubstances = [...substances];
    updatedSubstances[index][field] = value;
    setSubstances(updatedSubstances);
  };

  // Handlers for MAT and Addiction Medicine Services would be similar
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className={styles.substanceUseHistory}>
      <form>
        <h1>Substance Use History</h1>
        <p>
          Update at each Encounter/Visit
          <br /><br />
          Complete with Participant
          <br /><br />
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
                      disabled
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
                      disabled
                    />
                  </label>
                  <label>
                    No
                    <input
                      type="checkbox"
                      checked={substance.everUsed === false}
                      disabled
                    />
                  </label>
                </td>
                <td>
                  <label>
                    Yes
                    <input
                      type="checkbox"
                      checked={substance.usedDuringPregnancy === true}
                      disabled
                    />
                  </label>
                  <label>
                    No
                    <input
                      type="checkbox"
                      checked={substance.usedDuringPregnancy === false}
                      disabled
                    />
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    value={substance.dateLastUsed}
                    disabled
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
                  disabled
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
                  <input
                    type="checkbox"
                    checked={mat.engaged === 'Never'}
                    disabled
                  /> Never
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={mat.engaged === 'Currently'}
                    disabled
                  /> Currently
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={mat.engaged === 'Prior'}
                    disabled
                  /> Prior MAT use
                </label>
                Date of Last use:
                <input
                  type="date"
                  value={mat.medicationDetails}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" className={styles.tableRowHeader}>
                Medication Assisted Treatment (MAT) Engaged:
                <label>
                  <input
                    type="checkbox"
                    checked={mat.engaged === 'Never'}
                    disabled
                  /> Never
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={mat.engaged === 'Currently'}
                    disabled
                  /> Currently
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={mat.engaged === 'Prior'}
                    disabled
                  /> Prior MAT use
                </label>
                Date of Last use:
                <input
                  type="date"
                  value={mat.medicationDetails}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" className={styles.tableRowHeader}>
                Name and Contact Information for Addiction Medicine Clinic:
                <textarea
                  name="clinicInfo"
                  value={addictionServices.clinicInfo}
                  className={styles.largeInput}
                  disabled
                  placeholder="Clinic Name and Contact Information"
                />
              </td>
            </tr>
          </tbody>
        </table>



        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
      </form>
    </div>
  );
};

export default SubstanceUseHistoryReadOnly;