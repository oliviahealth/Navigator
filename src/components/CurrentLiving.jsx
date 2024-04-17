import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CurrentLiving() {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    livingWith: [
      { name: '', dateOfBirth: '', relation: '' }
    ],
    notLivingWith: [
      { name: '', dateOfBirth: '', caregiverContact: '' }
    ],
    notes: ''
  });

  const handleChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addRow = (section) => {
    const newRow = section === 'livingWith' ? { name: '', dateOfBirth: '', relation: '' } : { name: '', dateOfBirth: '', caregiverContact: '' };
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newRow]
    }));
  };

  const handleNotesChange = (value) => {
    setFormData(prev => ({
      ...prev,
      notes: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/current_living/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully submitted:', data);
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Current Living Arrangement</h2>
      
      <h3>List of People Living with You</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Relation</th>
          </tr>
        </thead>
        <tbody>
          {formData.livingWith.map((person, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handleChange('livingWith', index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={person.dateOfBirth}
                  onChange={(e) => handleChange('livingWith', index, 'dateOfBirth', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={person.relation}
                  onChange={(e) => handleChange('livingWith', index, 'relation', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => addRow('livingWith')}>Add Row</button>
  
      <h3>List of Children NOT Living with You</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Caregiver and Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {formData.notLivingWith.map((child, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) => handleChange('notLivingWith', index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={child.dateOfBirth}
                  onChange={(e) => handleChange('notLivingWith', index, 'dateOfBirth', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={child.caregiverContact}
                  onChange={(e) => handleChange('notLivingWith', index, 'caregiverContact', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => addRow('notLivingWith')}>Add Row</button>
  
      <label>
        Notes:
        <textarea
          value={formData.notes}
          onChange={(e) => handleNotesChange(e.target.value)}
        />
      </label>
  
      <button type="submit">Submit</button>
    </form>
  );
  
}

export default CurrentLiving;
