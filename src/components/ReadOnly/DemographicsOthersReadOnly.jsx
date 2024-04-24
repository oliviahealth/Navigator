import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DemographicsOthersReadOnly = () => {
  const { patientId, log_id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    currentLivingArrangement: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    county: '',
    primaryPhoneNumber: '',
    emergencyContact: '',
    emergencyPhoneNumber: '',
    emergencyRelationship: '',
    maritalStatus: '',
    insurancePlan: '',
    insuranceEffectiveDate: '',
    subscriberId: '',
    groupId: '',
    prenatalCare: {
      gestationalAgeAtEntry: '',
      dueDate: '',
      deliveryDate: '',
      plannedModeOfDelivery: '',
      actualModeOfDelivery: '',
      attendedPostpartumVisit: false,
      location: '',
      dateCompleted: '',
    },
    obstetricHistory: {
      complications: '',
      totalPregnancies: '',
      liveBirths: '',
      childrenLivingWithYou: '',
    },
    medicalProblems: '',
  });

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/demographics_others/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
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
            console.error('Error fetching participant info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);


  const handleChange = ({ target: { name, value, type, checked } }) => {
    if (name.includes('.')) {
      const [section, key] = name.split('.');
      setFormData(prevFormData => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [key]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  return (
    <form>
      <h2>Participant Record for Others Involved</h2>
      <p>For other people who may participate in the Program, Complete at initial intake and update as indicated.</p>
  
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
      </label>
  
      <fieldset>
        <legend>Current Living Arrangement:</legend>
        <label><input type="radio" name="currentLivingArrangement" value="Rent/Own a Home" onChange={handleChange} /> Rent/Own a Home</label>
        <label><input type="radio" name="currentLivingArrangement" value="Homeless" onChange={handleChange} /> Homeless</label>
        <label><input type="radio" name="currentLivingArrangement" value="Living with Relatives or Friends" onChange={handleChange} /> Living with Relatives or Friends</label>
        <label><input type="radio" name="currentLivingArrangement" value="Residential Treatment Center" onChange={handleChange} /> Residential Treatment Center</label>
        <label><input type="radio" name="currentLivingArrangement" value="Correctional Facility" onChange={handleChange} /> Correctional Facility</label>
        <label><input type="radio" name="currentLivingArrangement" value="Emergency Shelter" onChange={handleChange} /> Emergency Shelter</label>
        <label><input type="radio" name="currentLivingArrangement" value="Other" onChange={handleChange} /> Other</label>
      </fieldset>
  
      <label>
        Street Address:
        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </label>
      <label>
        State:
        <input type="text" name="state" value={formData.state} onChange={handleChange} />
      </label>
      <label>
        Zip Code:
        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
      </label>
      <label>
        County:
        <input type="text" name="county" value={formData.county} onChange={handleChange} />
      </label>
  
      <label>
        Primary Phone Numbers:
        <input type="tel" name="primaryPhoneNumber" value={formData.primaryPhoneNumber} onChange={handleChange} />
      </label>
  
      <label>
        Emergency Contact:
        <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
      </label>
      <label>
        Phone Number:
        <input type="tel" name="emergencyPhoneNumber" value={formData.emergencyPhoneNumber} onChange={handleChange} />
      </label>
      <label>
        Relationship:
        <input type="text" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} />
      </label>
  
      <fieldset>
        <legend>Marital Status:</legend>
        <label><input type="radio" name="maritalStatus" value="Single" onChange={handleChange} /> Single</label>
        <label><input type="radio" name="maritalStatus" value="Married" onChange={handleChange} /> Married</label>
        <label><input type="radio" name="maritalStatus" value="Divorced" onChange={handleChange} /> Divorced</label>
        <label><input type="radio" name="maritalStatus" value="Widowed" onChange={handleChange} /> Widowed</label>
        <label><input type="radio" name="maritalStatus" value="Separated" onChange={handleChange} /> Separated</label>
      </fieldset>
  
      <label>
        Insurance Plan:
        <input type="text" name="insurancePlan" value={formData.insurancePlan} onChange={handleChange} />
      </label>
      <label>
        Effective Date:
        <input type="date" name="insuranceEffectiveDate" value={formData.insuranceEffectiveDate} onChange={handleChange} />
      </label>
      <label>
        Subscriber ID:
        <input type="text" name="subscriberId" value={formData.subscriberId} onChange={handleChange} />
      </label>
      <label>
        Group ID:
        <input type="text" name="groupId" value={formData.groupId} onChange={handleChange} />
      </label>
  
      <fieldset>
        <legend>Prenatal Care (for current or most recent pregnancy)</legend>
        <label>
        Gestational Age at Entry of Care:
        <input type="text" name="prenatalCare.gestationalAgeAtEntry" value={formData.prenatalCare.gestationalAgeAtEntry} onChange={handleChange} />
      </label>
      <label>
        Due Date:
        <input type="date" name="prenatalCare.dueDate" value={formData.prenatalCare.dueDate} onChange={handleChange} />
      </label>
      <label>
        Delivery Date:
        <input type="date" name="prenatalCare.deliveryDate" value={formData.prenatalCare.deliveryDate} onChange={handleChange} />
      </label>
      <label>
        Planned Mode of Delivery:
        <select name="prenatalCare.plannedModeOfDelivery" value={formData.prenatalCare.plannedModeOfDelivery} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Vaginal">Vaginal</option>
          <option value="Cesarean">Cesarean</option>
        </select>
      </label>
      <label>
        Actual Mode of Delivery:
        <select name="prenatalCare.actualModeOfDelivery" value={formData.prenatalCare.actualModeOfDelivery} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Vaginal">Vaginal</option>
          <option value="Cesarean">Cesarean</option>
        </select>
      </label>
      <label>
        Attended Postpartum Visit:
        <input type="checkbox" name="prenatalCare.attendedPostpartumVisit" checked={formData.prenatalCare.attendedPostpartumVisit} onChange={handleChange} /> Yes
      </label>
      <label>
        If so, Location:
        <input type="text" name="prenatalCare.postpartumVisitLocation" value={formData.prenatalCare.postpartumVisitLocation} onChange={handleChange} />
      </label>
      <label>
        Date Completed:
        <input type="date" name="prenatalCare.dateCompleted" value={formData.prenatalCare.dateCompleted} onChange={handleChange} />
      </label>
      </fieldset>

      <fieldset>
        <legend>Obstetric History</legend>
        <label>
          Describe Any Complications During Prior Pregnancies:
          <textarea name="obstetricHistory.complications" value={formData.obstetricHistory.complications} onChange={handleChange} />
        </label>
        <label>
          Total Number of Pregnancies:
          <input type="number" name="obstetricHistory.totalPregnancies" value={formData.obstetricHistory.totalPregnancies} onChange={handleChange} />
        </label>
        <label>
          Number of Live Births:
          <input type="number" name="obstetricHistory.liveBirths" value={formData.obstetricHistory.liveBirths} onChange={handleChange} />
        </label>
        <label>
          Number of Children Currently Living with You:
          <input type="number" name="obstetricHistory.childrenLivingWithYou" value={formData.obstetricHistory.childrenLivingWithYou} onChange={handleChange} />
        </label>
      </fieldset>

      <fieldset>
        <legend>Medical Problems Requiring Ongoing Care</legend>
        <label>
          Diagnoses/Conditions:
          <textarea name="medicalProblems" value={formData.medicalProblems} onChange={handleChange} />
        </label>
      </fieldset>
    </form>
  );
};

export default DemographicsOthersReadOnly;

  