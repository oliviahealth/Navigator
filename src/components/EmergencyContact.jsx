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

  const handleChange = (event, section, index) => {
    const { name, value } = event.target;
    if (section) {
      const newData = { ...formData };
      if (typeof index === 'number') {
        newData[section][index][name] = value;
      } else {
        newData[section][name] = value;
      }
      setFormData(newData);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const addContact = () => {
    const newContact = { id: formData.emergencyContacts.length + 1, name: '', phone: '' };
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, newContact]
    });
  };

  const addChild = () => {
    const newChild = { id: formData.children.length + 1, name: '', dob: '', allergies: '' };
    setFormData({
      ...formData,
      children: [...formData.children, newChild]
    });
  };

  const addCaregiver = () => {
    const newCaregiver = { id: formData.safeCaregivers.length + 1, name: '', phone: '' };
    setFormData({
      ...formData,
      safeCaregivers: [...formData.safeCaregivers, newCaregiver]
    });
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
      <h2>EMERGENCY CONTACT INFORMATION</h2>
      {formData.emergencyContacts.map((contact, index) => (
        <div key={index}>
          <label>
            Emergency Contact Name:
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={(e) => handleChange(e, 'emergencyContacts', index)}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={contact.phone}
              onChange={(e) => handleChange(e, 'emergencyContacts', index)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addContact}>Add Another Contact</button>

      <label>
        Pediatrician Name:
        <input
          type="text"
          name="name"
          value={formData.pediatrician.name}
          onChange={(e) => handleChange(e, 'pediatrician')}
        />
      </label>
      <label>
        Pediatrician Phone:
        <input
          type="tel"
          name="phone"
          value={formData.pediatrician.phone}
          onChange={(e) => handleChange(e, 'pediatrician')}
        />
      </label>
      <label>
        Dentist Name:
        <input
          type="text"
          name="name"
          value={formData.dentist.name}
          onChange={(e) => handleChange(e, 'dentist')}
        />
      </label>
      <label>
        Dentist Phone:
        <input
          type="tel"
          name="phone"
          value={formData.dentist.phone}
          onChange={(e) => handleChange(e, 'dentist')}
        />
      </label>
      <label>
        Preferred Hospital:
        <input
          type="text"
          name="preferredHospital"
          value={formData.preferredHospital}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Police Phone Number:
        <input
          type="tel"
          name="policePhone"
          value={formData.policePhone}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Fire Dept. Phone Number:
        <input
          type="tel"
          name="fireDeptPhone"
          value={formData.fireDeptPhone}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Poison Control:
        <input
          type="tel"
          name="poisonControl"
          value={formData.poisonControl}
          onChange={(e) => handleChange(e)}
        />
      </label>

      <h2>HOUSEHOLD INFORMATION</h2>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.householdInfo.address}
          onChange={(e) => handleChange(e, 'householdInfo')}
        />
      </label>
      <label>
        Parent Phone 1:
        <input
          type="tel"
          name="parentPhone1"
          value={formData.householdInfo.parentPhone1}
          onChange={(e) => handleChange(e, 'householdInfo')}
        />
      </label>
      <label>
        Parent Phone 2:
        <input
          type="tel"
          name="parentPhone2"
          value={formData.householdInfo.parentPhone2}
          onChange={(e) => handleChange(e, 'householdInfo')}
        />
      </label>
      <label>
        First Aid Kit Location:
        <input
          type="text"
          name="firstAidKitLocation"
          value={formData.householdInfo.firstAidKitLocation}
          onChange={(e) => handleChange(e, 'householdInfo')}
        />
      </label>
      <label>
        Breaker Panel Location:
        <input
          type="text"
          name="breakerPanelLocation"
          value={formData.householdInfo.breakerPanelLocation}
          onChange={(e) => handleChange(e, 'householdInfo')}
        />
      </label>
      <label>
        Fire Extinguisher Location:
        <input
          type="text"
          name="fireExtinguisherLocation"
          value={formData.householdInfo.fireExtinguisherLocation}
          onChange={(e) => handleChange(e, 'householdInfo')}
        />
      </label>
      <label>
        Gas Valve Location:
        <input
          type="text"
          name="gasValveLocation"
          value={formData.householdInfo.gasValveLocation}
          onChange={(e) => handleChange(e, 'householdInfo')}
        />
      </label>
      <label>
        Water Valve Location:
        <input
          type="text"
          name="waterValveLocation"
          value={formData.householdInfo.waterValveLocation}
          onChange={(e) => handleChange(e, 'householdInfo')}
        />
      </label>

      <h2>HEALTH INSURANCE INFORMATION</h2>
      <label>
        Insurance Company:
        <input
          type="text"
          name="company"
          value={formData.insuranceInfo.company}
          onChange={(e) => handleChange(e, 'insuranceInfo')}
        />
      </label>
      <label>
        Subscriber ID/Group:
        <input
          type="text"
          name="subscriberIdGroup"
          value={formData.insuranceInfo.subscriberIdGroup}
          onChange={(e) => handleChange(e, 'insuranceInfo')}
        />
      </label>

      <h2>MY SAFE CAREGIVERS ARE:</h2>
      {formData.safeCaregivers.map((caregiver, index) => (
        <div key={index}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={caregiver.name}
              onChange={(e) => handleChange(e, 'safeCaregivers', index)}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={caregiver.phone}
              onChange={(e) => handleChange(e, 'safeCaregivers', index)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addCaregiver}>Add Another Caregiver</button>

      <h2>CHILDREN INFORMATION</h2>
      {formData.children.map((child, index) => (
        <div key={index}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={child.name}
              onChange={(e) => handleChange(e, 'children', index)}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={child.dob}
              onChange={(e) => handleChange(e, 'children', index)}
            />
          </label>
          <label>
            Allergies:
            <input
              type="text"
              name="allergies"
              value={child.allergies}
              onChange={(e) => handleChange(e, 'children', index)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addChild}>Add Another Child</button>

      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={(e) => handleChange(e)}
        />
      </label>

      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
      <button type="submit">Submit Form</button>
    </form>
  );
}

export default EmergencyContact;
