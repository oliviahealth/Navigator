import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function EmergencyContactReadOnly() {
  const { patientId, log_id } = useParams();

  const handleCancel = () => {
    window.history.back();
  };

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

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}E_API_URL}/api/get_read_only_data/emergency_contact/${patientId}/${log_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          credentials: 'omit',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 204) { // Handling no content
          return;
        }
        const data = await response.json();
        setFormData(data[2])

      } catch (error) {
        console.error('failed to fetch');
      }
    }; fetchLog();
  }, [patientId, log_id]);



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

  return (
    <form>
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
                      disabled
                    />
                  )
                ))}
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
                disabled
              />
            ))
          ) : (
            <textarea
              key={key}
              placeholder="Notes"
              value={value}
              disabled
            />
          )}
        </div>
      ))}

      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
    </form>
  );
}

export default EmergencyContactReadOnly;
