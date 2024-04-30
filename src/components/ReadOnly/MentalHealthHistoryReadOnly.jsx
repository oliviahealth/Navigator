import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function MentalHealthHistoryReadOnly() {
  const { patientId, log_id } = useParams();
  const [diagnoses, setDiagnoses] = useState([
    { diagnosis: '', date: '', provider: '', phone: '' }
  ]);
  const [medications, setMedications] = useState({
    takingMedications: '',
    explanation: ''
  });
  const [notes, setNotes] = useState('');

  const handleCancel = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/mentalhealthhistory/${patientId}/${log_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          credentials: 'omit',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 204) { // Handling no content
          return;
        }
        const data = await response.json();
        setDiagnoses(data[2].diagnoses);
        setMedications(data[2].medications);
        setNotees(data[2].notes);

      } catch (error) {
      }
    };

    fetchLog();
  }, [patientId, log_id]);

  const handleDiagnosisChange = (index, field, value) => {
    const updatedDiagnoses = [...diagnoses];
    updatedDiagnoses[index][field] = value;
    setDiagnoses(updatedDiagnoses);
  };

  const addDiagnosis = () => {
    setDiagnoses([...diagnoses, { diagnosis: '', date: '', provider: '', phone: '' }]);
  };

  const handleMedicationsChange = (field, value) => {
    setMedications({ ...medications, [field]: value });
  };
  return (
    <form>
      <h2>Mental Health History (Brief Update)</h2>
      {diagnoses.map((entry, index) => (
        <div key={index}>
          <label>Diagnosis:
            <input type="text" value={entry.diagnosis} disabled />
          </label>
          <label>Date of Diagnosis:
            <input type="date" value={entry.date} disabled />
          </label>
          <label>Provider:
            <input type="text" value={entry.provider} disabled />
          </label>
          <label>Provider Phone:
            <input type="text" value={entry.phone} disabled />
          </label>
        </div>
      ))}

      <div>
        <label>Are you currently taking any medications for these diagnoses?
          <label>
            <input type="radio" name="takingMedications" value="Yes" checked={medications.takingMedications === 'Yes'} disabled />
            Yes
          </label>
          <label>
            <input type="radio" name="takingMedications" value="No" checked={medications.takingMedications === 'No'} disabled />
            No
          </label>
        </label>
        {medications.takingMedications === 'Yes' && (
          <label>Please, explain:
            <textarea value={medications.explanation} disabled />
          </label>
        )}
      </div>

      <label>Notes:
        <textarea value={notes} disabled />
      </label>

      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
    </form>
  );
}

export default MentalHealthHistoryReadOnly;