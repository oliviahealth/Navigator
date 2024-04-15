import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CurrentLivingReadOnly() {
  const { patientId, log_id } = useParams();

  const [formData, setFormData] = useState({
    livingWith: [
      { name: '', dateOfBirth: '', relation: '' }
    ],
    notLivingWith: [
      { name: '', dateOfBirth: '', caregiverContact: '' }
    ],
    notes: ''
  });

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/current_living/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                console.log("No support system info found for the selected patient.");
                return; 
            }
            const data = await response.json();
            setFormData(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);


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

  return (
    <form>
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
    </form>
  );
  
}

export default CurrentLivingReadOnly;