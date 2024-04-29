import React, { useState } from 'react';

function CurrentLiving() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Submission logic here
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
