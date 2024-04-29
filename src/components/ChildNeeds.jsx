import React, { useState } from 'react';

function ChildNeeds() {
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
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addOtherItem = () => {
    setItems([...items, { id: nextId, name: 'Other', status: '', notes: '' }]);
    setNextId(nextId + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ items, generalNotes });
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default ChildNeeds;
