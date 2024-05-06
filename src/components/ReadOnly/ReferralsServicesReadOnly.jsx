import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function ReferralsServicesReadOnly() {
  const { patientId, log_id } = useParams();

  const handleCancel = () => {
    window.history.back();
  };

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
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/referrals_services/${patientId}/${log_id}`, {
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
        const data = await response.json();

        if (data && data[2].items) {
          const transformedData = Object.keys(initialServices).reduce((acc, category) => {
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
          setServices({ ...services, items: transformedData, notes: data[2].notes});
        } else {
        }
      } catch (error) {
        console.error('failed to fetch');
      }
    };

    fetchLog();
  }, [patientId, log_id]);



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
                <label><input type="checkbox" checked={service.discussed} disabled onChange={() => {}} /> Discussed</label>
                <label><input type="checkbox" checked={service.needed} disabled /> Needed</label>
                <label><input type="checkbox" checked={service.referred} disabled /> Referred</label>
                <label><input type="checkbox" checked={service.participating} disabled /> Participating</label>
                <label><input type="checkbox" checked={service.completed} disabled /> Completed</label>
                <label><input type="checkbox" checked={service.na} disabled /> N/A</label>
                <input type="text" placeholder="Notes" value={service.notes} disabled style={{ marginTop: '5px' }} />
              </div>
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <label>
          Notes:
          <textarea value={services.notes} disabled style={{ width: '100%', height: '100px' }} />
        </label>
      </div>

      <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
    </form>
  );
}

export default ReferralsServicesReadOnly;
