import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EmergencyContactReadOnly() {
  const [formData, setFormData] = useState(null); // Initialized as null to indicate loading state
  const { patientId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/emergency_contacts/${patientId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [patientId]);

  if (!formData) {
    return <div>Loading...</div>; // or any other loading state representation
  }

  const formatSectionTitle = (title) => {
    return title.replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
      .replace('Info', ' Information')
      .replace('Dob', 'Date of Birth');
  };

  return (
    <div>
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
                      readOnly
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
                readOnly
              />
            ))
          ) : (
            <textarea
              key={key}
              placeholder="Notes"
              value={value}
              readOnly
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default EmergencyContactReadOnly;
