import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/PrenatalCare.css';

function PrenatalCareReadOnly() {
  const { patientId, log_id } = useParams();
  const [formValues, setFormValues] = useState({
    pregDate: '',
    startDate: '',
    name: '',
    phoneNum: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/prenatal_care/${patientId}/${log_id}`, {
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
            setFormValues(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  return (
    <div className="prenatal-care-form">
      <h1>Prenatal Care</h1>
      <form>
        <label htmlFor="pregDate">If currently pregnant, do you attend regular visits with your OB/GYN or Nurse Practitioner?</label>
        <input type="date" id="pregDate" name="pregDate" value={formValues.pregDate} onChange={handleInputChange} />

        <label htmlFor="startDate">When did you start your prenatal care?</label>
        <input type="date" id="startDate" name="startDate" value={formValues.startDate} onChange={handleInputChange} />

        <h2>Provide the contact information for your prenatal care in the Care Provider section.</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
        <label htmlFor="phoneNum">Phone Number</label>
        <input type="text" id="phoneNum" name="phoneNum" value={formValues.phoneNum} onChange={handleInputChange} />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value={formValues.email} onChange={handleInputChange} />
      </form>
    </div>
  );
}

export default PrenatalCareReadOnly;