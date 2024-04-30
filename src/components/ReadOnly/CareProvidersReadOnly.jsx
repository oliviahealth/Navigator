import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function CareProvidersReadOnly() {
    const { patientId, log_id } = useParams();
    const [providers, setProviders] = useState([
        { type: 'Primary Care Physician', provider: '', organization: '', address: '', phone: '' }
    ]);

    useEffect(() => {
        const fetchLog = async () => {
            const accessToken = Cookies.get('accessToken');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/care_providers/${patientId}/${log_id}`, {
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
                setProviders(data[2])

            } catch (error) {
                console.error('failed to fetch');
            }
        };

        fetchLog();
    }, [patientId, log_id]);


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

    const removeProvider = index => {
        setProviders(providers.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Care Providers Contact List</h2>
            <form>
                {providers.map((provider, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <label>Type:
                            <select
                                value={provider.type}
                                disabled
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
                                disabled
                            />
                        </label>
                        <label>Organization:
                            <input
                                type="text"
                                value={provider.organization}
                                disabled
                            />
                        </label>
                        <label>Address:
                            <input
                                type="text"
                                value={provider.address}
                                disabled
                            />
                        </label>
                        <label>Phone Number:
                            <input
                                type="text"
                                value={provider.phone}
                                disabled
                            />
                        </label>
                        {index > 0 && (
                            <button type="button" onClick={() => removeProvider(index)}>Remove Provider</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
            </form>
        </div>
    );
}

export default CareProvidersReadOnly;