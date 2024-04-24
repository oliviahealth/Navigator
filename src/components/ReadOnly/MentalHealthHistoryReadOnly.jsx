import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/mentalhealthhistory/${patientId}/${log_id}`, {
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
            <input type="text" value={entry.diagnosis} onChange={(e) => handleDiagnosisChange(index, 'diagnosis', e.target.value)} />
          </label>
          <label>Date of Diagnosis:
            <input type="date" value={entry.date} onChange={(e) => handleDiagnosisChange(index, 'date', e.target.value)} />
          </label>
          <label>Provider:
            <input type="text" value={entry.provider} onChange={(e) => handleDiagnosisChange(index, 'provider', e.target.value)} />
          </label>
          <label>Provider Phone:
            <input type="text" value={entry.phone} onChange={(e) => handleDiagnosisChange(index, 'phone', e.target.value)} />
          </label>
        </div>
      ))}
      <button type="button" onClick={addDiagnosis}>Add Another Diagnosis</button>

      <div>
        <label>Are you currently taking any medications for these diagnoses?
          <label>
            <input type="radio" name="takingMedications" value="Yes" checked={medications.takingMedications === 'Yes'} onChange={(e) => handleMedicationsChange('takingMedications', e.target.value)} />
            Yes
          </label>
          <label>
            <input type="radio" name="takingMedications" value="No" checked={medications.takingMedications === 'No'} onChange={(e) => handleMedicationsChange('takingMedications', e.target.value)} />
            No
          </label>
        </label>
        {medications.takingMedications === 'Yes' && (
          <label>Please, explain:
            <textarea value={medications.explanation} onChange={(e) => handleMedicationsChange('explanation', e.target.value)} />
          </label>
        )}
      </div>

      <label>Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
    </form>
  );
}

export default MentalHealthHistoryReadOnly;