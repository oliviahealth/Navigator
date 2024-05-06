import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function EmergencyContactReadOnly() {
  const { patientId, log_id } = useParams();
  const [formData, setFormData] = useState({
    emergencyContacts: [],
    pediatrician: { name: '', phone: '' },
    dentist: { name: '', phone: '' },
    preferredHospital: '',
    policePhone: '',
    fireDeptPhone: '',
    poisonControl: '',
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
    safeCaregivers: [],
    children: [],
    notes: ''
  });

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/emergency_contact/${patientId}/${log_id}`, {
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
        setFormData(data[2]);  // Assuming data[2] is where the form data is located
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchLog();
  }, [patientId, log_id]);

  const handleCancel = () => {
    window.history.back();
  };


  return (
    <form>
      <h2>EMERGENCY CONTACT INFORMATION</h2>
      {formData.emergencyContacts.map((contact, index) => (
        <div key={index}>
          <label>
            Emergency Contact Name:
            <input type="text" value={contact.name} readOnly />
          </label>
          <label>
            Phone Number:
            <input type="tel" value={contact.phone} readOnly />
          </label>
        </div>
      ))}

      <label>
        Pediatrician Name:
        <input type="text" value={formData.pediatrician.name} readOnly />
      </label>
      <label>
        Pediatrician Phone:
        <input type="tel" value={formData.pediatrician.phone} readOnly />
      </label>
      <label>
        Dentist Name:
        <input type="text" value={formData.dentist.name} readOnly />
      </label>
      <label>
        Dentist Phone:
        <input type="tel" value={formData.dentist.phone} readOnly />
      </label>
      <label>
        Preferred Hospital:
        <input type="text" value={formData.preferredHospital} readOnly />
      </label>
      <label>
        Police Phone Number:
        <input type="tel" value={formData.policePhone} readOnly />
      </label>
      <label>
        Fire Dept. Phone Number:
        <input type="tel" value={formData.fireDeptPhone} readOnly />
      </label>
      <label>
        Poison Control:
        <input type="tel" value={formData.poisonControl} readOnly />
      </label>

      <h2>HOUSEHOLD INFORMATION</h2>
      <label>
        Address:
        <input type="text" value={formData.householdInfo.address} readOnly />
      </label>
      <label>
        Parent Phone 1:
        <input type="tel" value={formData.householdInfo.parentPhone1} readOnly />
      </label>
      <label>
        Parent Phone 2:
        <input type="tel" value={formData.householdInfo.parentPhone2} readOnly />
      </label>
      <label>
        First Aid Kit Location:
        <input type="text" value={formData.householdInfo.firstAidKitLocation} readOnly />
      </label>
      <label>
        Breaker Panel Location:
        <input type="text" value={formData.householdInfo.breakerPanelLocation} readOnly />
      </label>
      <label>
        Fire Extinguisher Location:
        <input type="text" value={formData.householdInfo.fireExtinguisherLocation} readOnly />
      </label>
      <label>
        Gas Valve Location:
        <input type="text" value={formData.householdInfo.gasValveLocation} readOnly />
      </label>
      <label>
        Water Valve Location:
        <input type="text" value={formData.householdInfo.waterValveLocation} readOnly />
      </label>

      <h2>HEALTH INSURANCE INFORMATION</h2>
      <label>
        Insurance Company:
        <input type="text" value={formData.insuranceInfo.company} readOnly />
      </label>
      <label>
        Subscriber ID/Group:
        <input type="text" value={formData.insuranceInfo.subscriberIdGroup} readOnly />
      </label>

      <h2>MY SAFE CAREGIVERS ARE:</h2>
      {formData.safeCaregivers.map((caregiver, index) => (
        <div key={index}>
          <label>
            Name:
            <input type="text" value={caregiver.name} readOnly />
          </label>
          <label>
            Phone:
            <input type="tel" value={caregiver.phone} readOnly />
          </label>
        </div>
      ))}

      <h2>CHILDREN INFORMATION</h2>
      {formData.children.map((child, index) => (
        <div key={index}>
          <label>
            Name:
            <input type="text" value={child.name} readOnly />
          </label>
          <label>
            Date of Birth:
            <input type="date" value={child.dob} readOnly />
          </label>
          <label>
            Allergies:
            <input type="text" value={child.allergies} readOnly />
          </label>
        </div>
      ))}

      <label>
        Notes:
        <textarea value={formData.notes} readOnly />
      </label>
      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
    </form>
  );
}

export default EmergencyContactReadOnly;
