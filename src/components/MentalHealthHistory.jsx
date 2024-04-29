import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function MentalHealthHistory() {
  const { patientId } = useParams();
  const [diagnoses, setDiagnoses] = useState([
    { diagnosis: '', date: '', provider: '', phone: '' }
  ]);
  const [medications, setMedications] = useState({
    takingMedications: '',
    explanation: ''
  });
  const [notes, setNotes] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      diagnoses: diagnoses,
      medications: medications,
      notes: notes
    }
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/mentalhealthhistory/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleDiagnosisChange = (index, field, value) => {
    const sanitized_field = field.replace(/[^a-zA-Z0-9_]/g, '');
    const updatedDiagnoses = [...diagnoses];

    if (index >= 0 && index < updatedDiagnoses.length && updatedDiagnoses[index] != null) {
        updatedDiagnoses[index][sanitized_field] = value;
        setDiagnoses(updatedDiagnoses);
    } else {
        console.error('Invalid index or field:', index, sanitized_field);
    }
};


  const addDiagnosis = () => {
    setDiagnoses([...diagnoses, { diagnosis: '', date: '', provider: '', phone: '' }]);
  };

  const handleMedicationsChange = (field, value) => {
    const sanitized_field = field.replace(/[^a-zA-Z0-9_]/g, '');

    setMedications({ ...medications, [sanitized_field]: value });
};


  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MentalHealthHistory;