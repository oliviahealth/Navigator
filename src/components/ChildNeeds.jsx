import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ChildNeeds() {
  const { patientId } = useParams();
  const [items, setItems] = useState([
    { id: 1, name: 'Breast Pump', status: '', notes: '' },
    { id: 2, name: 'Breastfeeding Support', status: '', notes: '' },
    { id: 3, name: 'Car Seat', status: '', notes: '' },
    { id: 4, name: 'Childcare', status: '', notes: '' },
    { id: 5, name: 'Clothing', status: '', notes: '' },
    { id: 6, name: 'Crib or pack-n-play or bed', status: '', notes: '' },
    { id: 7, name: 'Diapers', status: '', notes: '' },
    { id: 8, name: 'Infant Formula', status: '', notes: '' },
    { id: 9, name: 'Infant Stroller', status: '', notes: '' },
    { id: 10, name: 'School Supplies', status: '', notes: '' },
    { id: 11, name: 'Specialized Medical Equipment', status: '', notes: '' },
  ]);
  const [nextId, setNextId] = useState(12);
  const [generalNotes, setGeneralNotes] = useState('');

  const handleChange = (id, field, value) => {
    // Sanitize 'field' to allow only alphanumeric characters and underscores
    const sanitized_field = field.replace(/[^a-zA-Z0-9_]/g, '');

    setItems(items.map(item =>
      item.id === id ? { ...item, [sanitized_field]: value } : item
    ));
};

  const addOtherItem = () => {
    setItems([...items, { id: nextId, name: 'Other', status: '', notes: '' }]);
    setNextId(nextId + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/child_needs/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
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

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Child(ren) Needs</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Yes</th>
            <th>No</th>
            <th>Pending</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <input type="radio" checked={item.status === 'Yes'} onChange={() => handleChange(item.id, 'status', 'Yes')} />
              </td>
              <td>
                <input type="radio" checked={item.status === 'No'} onChange={() => handleChange(item.id, 'status', 'No')} />
              </td>
              <td>
                <input type="radio" checked={item.status === 'Pending'} onChange={() => handleChange(item.id, 'status', 'Pending')} />
              </td>
              <td>
                <input type="text" value={item.notes} onChange={(e) => handleChange(item.id, 'notes', e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addOtherItem}>Add Other Item</button>
      <div>
        <label>
          Notes:
          <textarea value={generalNotes} onChange={(e) => setGeneralNotes(e.target.value)} />
        </label>
      </div>
      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ChildNeeds;
