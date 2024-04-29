import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CareProviders() {
    const { patientId } = useParams();
    const [providers, setProviders] = useState([
        { type: 'Primary Care Physician', provider: '', organization: '', address: '', phone: '' }
    ]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`http://localhost:5000/api/insert_forms/care_providers/${patientId}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(providers),
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
    

    const providerTypes = [
        "Primary Care Physician",
        "Substance Use Disorder Treatment Provider",
        "Prenatal Care Provider (OB/GYN)",
        "Medication Assisted Treatment (MAT)",
        "Pediatrician",
        "Additional Recovery Support",
        "Child Welfare (“CPS”) Caseworker",
        "Mental Health Provider",
        "Other"
    ];

    const handleChange = (index, field, value) => {
        const updatedProviders = providers.map((provider, i) => {
            if (i === index) {
                return { ...provider, [field]: value };
            }
            return provider;
        });
        setProviders(updatedProviders);
    };

    const addProvider = () => {
        setProviders([...providers, { type: 'Other', provider: '', organization: '', address: '', phone: '' }]);
    };

    const removeProvider = index => {
        setProviders(providers.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        window.history.back();
      };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Care Providers Contact List</h2>
            <form onSubmit={handleSubmit}>
                {providers.map((provider, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <label>Type:
                            <select
                                value={provider.type}
                                onChange={(e) => handleChange(index, 'type', e.target.value)}
                            >
                                {providerTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </label>
                        <label>Provider:
                            <input
                                type="text"
                                value={provider.provider}
                                onChange={(e) => handleChange(index, 'provider', e.target.value)}
                            />
                        </label>
                        <label>Organization:
                            <input
                                type="text"
                                value={provider.organization}
                                onChange={(e) => handleChange(index, 'organization', e.target.value)}
                            />
                        </label>
                        <label>Address:
                            <input
                                type="text"
                                value={provider.address}
                                onChange={(e) => handleChange(index, 'address', e.target.value)}
                            />
                        </label>
                        <label>Phone Number:
                            <input
                                type="text"
                                value={provider.phone}
                                onChange={(e) => handleChange(index, 'phone', e.target.value)}
                            />
                        </label>
                        {index > 0 && (
                            <button type="button" onClick={() => removeProvider(index)}>Remove Provider</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addProvider}>Add Another Provider</button>
                <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CareProviders;