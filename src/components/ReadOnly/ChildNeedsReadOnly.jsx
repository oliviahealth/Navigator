import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ChildNeedsReadOnly() {
  const { patientId, log_id } = useParams();

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

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/child_needs/${patientId}/${log_id}`, {
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
            setItems(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);


  const handleChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <form>
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
    </form>
  );
}

export default ChildNeedsReadOnly;
