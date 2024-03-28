import React, { useState } from 'react';

function ReferralsServices() {
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
    const updatedItems = { ...services.items };
    if (field in updatedItems[category][index]) {
      updatedItems[category][index][field] = typeof value === 'boolean' ? value : value.target.value;
    } else {
      updatedItems[category][index].notes = value.target.value;
    }
    setServices({ ...services, items: updatedItems });
  };

  const addOtherService = (category) => {
    const newService = { name: 'Other', discussed: false, needed: false, referred: false, participating: false, completed: false, na: false, notes: '' };
    const updatedItems = { ...services.items };
    updatedItems[category].push(newService);
    setServices({ ...services, items: updatedItems });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(services);
    // Here you'd typically send this data to a server
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
      <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
    </form>
  );
}

export default ReferralsServices;
