import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

function ReferralsServicesReadOnly() {
  const { patientId, log_id } = useParams();

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

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get_read_only_data/referrals_services/${patientId}/${log_id}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data[2].items)
  
        if (data && data[2].items) {
          // Assuming data.items should be an object with keys matching service categories
          const transformedData = Object.keys(initialServices).reduce((acc, category) => {
            // Map over each category to ensure it has the correct structure
            return {
              ...acc,
              [category]: data[2].items[category].map(service => ({
                ...service,
                discussed: service.discussed || false,
                needed: service.needed || false,
                referred: service.referred || false,
                participating: service.participating || false,
                completed: service.completed || false,
                na: service.na || false,
                notes: service.notes || ''
              }))
            };
          }, {});
          setServices({ ...services, items: transformedData });
        } else {
          console.log("No referrals services info found for the selected patient.");
        }
      } catch (error) {
        console.error('Error fetching referrals services info:', error);
      }
    };
  
    fetchLog();
  }, [patientId, log_id]);
  


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

  return (
    <form>
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
    </form>
  );
}

export default ReferralsServicesReadOnly;
