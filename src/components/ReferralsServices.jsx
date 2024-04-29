import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ReferralsServices() {
  const { patientId } = useParams();
  const initialServices = {
    "Support Services": [
      "Parenting Classes",
      "Transportation Services",
      "SSI or Disability",
      "Temporary Assistance for Needy Families (TANF)",
      "Personal Safety",
      "Home Visitation Program",
      "Housing Assistance",
      "Healthy Start Program"
    ],
    "Food & Nutrition": [
      "Breastfeeding Support",
      "Local Food Pantries",
      "SNAP",
      "Women, Infants, & Children (WIC)"
    ],
    "Healthcare": [
      "Health Insurance Enrollment",
      "Prenatal Healthcare",
      "Family Planning",
      "Primary Care",
      "Mental Health or Counseling",
      "Smoking Cessation"
    ],
    "Substance Use Services": [
      "Residential",
      "OutParticipant",
      "Caring for Two Program",
      "The Cradles Project",
      "Recovery Support Services",
      "Naloxone (Narcan)",
      "Medication-Assisted Treatment (MAT)"
    ],
    "Child Related": [
      "Early Childhood Intervention (ECI)",
      "Early Head Start",
      "NCI (Childcare Subsidy)",
      "Pediatrician or Primary Care",
      "Safe Sleep Education"
    ],
    "Legal Assistance": [
      "Child Protective Service",
      "Legal Aid",
      "Specialty Court"
    ]
  };

  const [services, setServices] = useState({
    items: Object.keys(initialServices).reduce((acc, category) => ({
      ...acc,
      [category]: initialServices[category].map(name => ({
        name,
        discussed: false,
        needed: false,
        referred: false,
        participating: false,
        completed: false,
        na: false,
        notes: ''
      }))
    }), {}),
    notes: ''
  });

  const handleServiceChange = (category, index, field, value) => {
    const sanitized_category = category.replace(/[^a-zA-Z0-9_]/g, '');
    const sanitized_field = field.replace(/[^a-zA-Z0-9_]/g, '');

    const updatedItems = { ...services.items };

    // Ensure category and index are valid to avoid errors
    if (sanitized_category in updatedItems && index in updatedItems[sanitized_category]) {
        if (sanitized_field in updatedItems[sanitized_category][index]) {
            updatedItems[sanitized_category][index][sanitized_field] = 
                typeof value === 'boolean' ? value : value.target.value;
        } else {
            // Fallback to updating notes if field is not recognized
            updatedItems[sanitized_category][index].notes = value.target.value;
        }
    } else {
        console.error('Invalid category or index:', sanitized_category, index);
        return; // Stop execution if category or index is invalid
    }

    setServices({ ...services, items: updatedItems });
};


  const addOtherService = (category) => {
    const newService = { name: 'Other', discussed: false, needed: false, referred: false, participating: false, completed: false, na: false, notes: '' };
    const updatedItems = { ...services.items };
    updatedItems[category].push(newService);
    setServices({ ...services, items: updatedItems });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/referrals_services/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(services),
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

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Referrals & Services</h2>
      {Object.keys(services.items).map(category => (
        <div key={category}>
          <h3>{category}</h3>
          {services.items[category].map((service, index) => (
            <div key={`${category}-${index}`} style={{ marginBottom: '10px' }}>
              <div><b>{service.name}</b></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label><input type="checkbox" checked={service.discussed} onChange={e => handleServiceChange(category, index, 'discussed', e.target.checked)} /> Discussed</label>
                <label><input type="checkbox" checked={service.needed} onChange={e => handleServiceChange(category, index, 'needed', e.target.checked)} /> Needed</label>
                <label><input type="checkbox" checked={service.referred} onChange={e => handleServiceChange(category, index, 'referred', e.target.checked)} /> Referred</label>
                <label><input type="checkbox" checked={service.participating} onChange={e => handleServiceChange(category, index, 'participating', e.target.checked)} /> Participating</label>
                <label><input type="checkbox" checked={service.completed} onChange={e => handleServiceChange(category, index, 'completed', e.target.checked)} /> Completed</label>
                <label><input type="checkbox" checked={service.na} onChange={e => handleServiceChange(category, index, 'na', e.target.checked)} /> N/A</label>
                <input type="text" placeholder="Notes" value={service.notes} onChange={(e) => handleServiceChange(category, index, 'notes', e)} style={{ marginTop: '5px' }} />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addOtherService(category)} style={{ marginTop: '10px' }}>Add Other</button>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <label>
          Notes:
          <textarea value={services.notes} onChange={e => setServices({ ...services, notes: e.target.value })} style={{ width: '100%', height: '100px' }} />
        </label>
      </div>
      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
      <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
    </form>
  );
}

export default ReferralsServices;
