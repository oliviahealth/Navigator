import React, { useState } from 'react';

function CurrentLiving() {
  const [livingWith, setLivingWith] = useState([
    { name: '', dateOfBirth: '', relation: '' }
  ]);

  const [notLivingWith, setNotLivingWith] = useState([
    { name: '', dateOfBirth: '', caregiverContact: '' }
  ]);

  const [notes, setNotes] = useState('');

  const handleLivingChange = (index, field, value) => {
    const updated = [...livingWith];
    updated[index][field] = value;
    setLivingWith(updated);
  };

  const handleNotLivingChange = (index, field, value) => {
    const updated = [...notLivingWith];
    updated[index][field] = value;
    setNotLivingWith(updated);
  };

  const addLivingWithRow = () => {
    setLivingWith([...livingWith, { name: '', dateOfBirth: '', relation: '' }]);
  };

  const addNotLivingWithRow = () => {
    setNotLivingWith([...notLivingWith, { name: '', dateOfBirth: '', caregiverContact: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ livingWith, notLivingWith, notes });
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
          {livingWith.map((person, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handleLivingChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={person.dateOfBirth}
                  onChange={(e) => handleLivingChange(index, 'dateOfBirth', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={person.relation}
                  onChange={(e) => handleLivingChange(index, 'relation', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addLivingWithRow}>Add Row</button>

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
          {notLivingWith.map((child, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) => handleNotLivingChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={child.dateOfBirth}
                  onChange={(e) => handleNotLivingChange(index, 'dateOfBirth', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={child.caregiverContact}
                  onChange={(e) => handleNotLivingChange(index, 'caregiverContact', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addNotLivingWithRow}>Add Row</button>

      <label>
        Notes:
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default CurrentLiving;
