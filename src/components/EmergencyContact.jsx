import React, { useState } from 'react';

function EmergencyContact() {
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

  const addNewEntry = (key) => {
    const newEntry = key === 'children' || key === 'emergencyContacts' || key === 'safeCaregivers' ?
      { id: formData[key].length + 1, name: '', phone: '', dob: '', allergies: '' } : '';
    setFormData({ ...formData, [key]: [...formData[key], newEntry] });
  };

  const handleInputChange = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    if (typeof updatedSection[index] === 'object') {
      updatedSection[index] = { ...updatedSection[index], [field]: value };
    } else {
      updatedSection[index] = value;
    }
    setFormData({ ...formData, [section]: updatedSection });
  };

  const formatSectionTitle = (title) => {
    return title.replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .trim()
                .replace('Info', ' Information') // Expand common abbreviations
                .replace('Dob', 'Date of Birth'); // Proper case for specific fields
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Here, you would handle the form submission, such as sending the data to a backend server.
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmergencyContact;
