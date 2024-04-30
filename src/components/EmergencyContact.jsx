import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function EmergencyContact() {
  const { patientId } = useParams();
  const initialData = {
    emergencyContacts: [{ id: 1, name: '', phone: '' }],
    pediatrician: { name: '', phone: '' },
    dentist: { name: '', phone: '' },
    preferredHospital: '',
    policePhone: '',
    fireDeptPhone: '',
    poisonControl: '1-800-222-1222',
    householdInfo: {
      address: '',
      parentPhone1: '',
      parentPhone2: '',
      firstAidKitLocation: '',
      breakerPanelLocation: '',
      fireExtinguisherLocation: '',
      gasValveLocation: '',
      waterValveLocation: '',
    },
    insuranceInfo: { company: '', subscriberIdGroup: '' },
    safeCaregivers: [{ id: 1, name: '', phone: '' }],
    children: [{ id: 1, name: '', dob: '', allergies: '' }],
    notes: ''
  };

  const [formData, setFormData] = useState(initialData);
  // const { patientId } = useParams(); 

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const tzOffset = -now.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(tzOffset / 60));
    const offsetMinutes = Math.abs(tzOffset % 60);

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${tzOffset >= 0 ? '+' : '-'}${offsetHours.toString().padStart(2, '0')}${offsetMinutes.toString().padStart(2, '0')}`;
  };

  const [entry, setEntry] = useState({
    date: getCurrentDateTime(), // Automatically sets the current date and time
    method: '', // e.g., "Phone", "Email", "In-Person"
    organization: '', // Name of the organization or person contacted
    purpose: '', // Reason for the contact
    notes: '', // Any additional notes about the interaction
    followUp: false // Whether a follow-up is required, initially set to false
  });

  const addNewEntry = (key) => {
    const newEntry = key === 'children' || key === 'emergencyContacts' || key === 'safeCaregivers' ?
      { id: formData[key].length + 1, name: '', phone: '', dob: '', allergies: '' } : '';
    setFormData({ ...formData, [key]: [...formData[key], newEntry] });
  };

  const handleInputChange = (section, index, field, value) => {
    // Sanitize 'section' and 'field' to allow only alphanumeric characters and underscores
    const sanitized_section = section.replace(/[^a-zA-Z0-9_]/g, '');
    const sanitized_field = field.replace(/[^a-zA-Z0-9_]/g, '');

    // Ensure the 'section' is part of formData before accessing it
    if (formData.hasOwnProperty(sanitized_section)) {
      const updatedSection = [...formData[sanitized_section]];
      if (typeof updatedSection[index] === 'object' && updatedSection[index] !== null) {
        // Update the object at the given index
        updatedSection[index] = { ...updatedSection[index], [sanitized_field]: value };
      } else {
        // Replace the item at the given index with the new value
        updatedSection[index] = value;
      }
      // Update the formData state with the new section
      setFormData({ ...formData, [sanitized_section]: updatedSection });
    } else {
      console.error('Invalid section');
    }
  };


  const formatSectionTitle = (title) => {
    return title.replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
      .replace('Info', ' Information') // Expand common abbreviations
      .replace('Dob', 'Date of Birth'); // Proper case for specific fields
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
const accessToken = Cookies.get('accessToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/emergency_contact/${patientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'omit',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('Failed to submit');
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Emergency Contact Information</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <h3>{formatSectionTitle(key)}</h3>
          {Array.isArray(value) ? (
            value.map((entry, index) => (
              <div key={`${key}-${entry.id}`}>
                {Object.entries(entry).map(([field, fieldVal]) => (
                  field !== 'id' && (
                    <input
                      key={`${key}-${entry.id}-${field}`}
                      type="text"
                      name={field}
                      placeholder={formatSectionTitle(field)}
                      value={fieldVal}
                      onChange={(e) => handleInputChange(key, index, field, e.target.value)}
                    />
                  )
                ))}
                {(index === value.length - 1) && (
                  <button type="button" onClick={() => addNewEntry(key)}>Add Another {formatSectionTitle(key)}</button>
                )}
              </div>
            ))
          ) : typeof value === 'object' ? (
            Object.entries(value).map(([field, fieldVal]) => (
              <input
                key={`${key}-${field}`}
                type="text"
                name={field}
                placeholder={formatSectionTitle(field)}
                value={fieldVal}
                onChange={(e) => setFormData({ ...formData, [key]: { ...formData[key], [field]: e.target.value } })}
              />
            ))
          ) : (
            <textarea
              key={key}
              placeholder="Notes"
              value={value}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          )}
        </div>
      ))}
      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmergencyContact;
