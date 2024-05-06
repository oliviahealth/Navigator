import '../../styles/EncounterFormStyle.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function DeliveryHistoryReadOnly() {
  const { patientId, log_id } = useParams()
  const [formData, setFormData] = useState({
    participantName: '',
    caseId: '',
    visits: [
      {
        date: '',
        realDate: '',
        deliverySuccess: '',
        childEnrolled: '',
      },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/delivery_history/${patientId}/${log_id}`, {
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
        setFormData(data[2])

      } catch (error) {
        console.error('failed to fetch');
      }
    };

    fetchLog();
  }, [patientId, log_id]);


  const handleInputChange = (event, index) => {
  const { name, value, type, checked } = event.target;

  const newVisits = formData.visits.map((visit, visitIndex) => {
    if (index === visitIndex) {
      const updatedVisit = { ...visit };
      if (type === 'radio') {
        updatedVisit[name.split('-')[0]] = value;
        if (name.includes("deliverySuccess") && value === "false") {
          updatedVisit['childEnrolled'] = '';
        }
      } else {
        updatedVisit[name] = type === 'checkbox' ? checked : value;
      }
      return updatedVisit;
    }
    return visit;
  });

  setFormData({ ...formData, visits: newVisits });
};

  
  

  const addCareVisit = () => {
    setFormData({
      ...formData,
      visits: [
        ...formData.visits,
        {
          date: '',
          realDate: '',
          deliverySuccess: '',
          childEnrolled: '',
        },
      ],
    });
  };

  // ...

return (
    <div className="App">
      <form className="encounter-form">
        <h2>Delivery History Information Form</h2>
        <p>To Assess External Care Provider Encounters/Visits</p>
        
        <div className="table-responsive">
          <table>
          <thead>
  <tr>
    <th className="date-column">Estimated Date of Delivery</th>
    <th className="staff-column">Actual Date of Delivery</th>
    <th className="health-insurance-column">Did the delivery result in a live birth?</th>
    <th className="parent-concerns-column">If yes, is the newborn enrolled as a PAGEONE-EHR target child in the program</th>

  </tr>
</thead>
            <tbody>
      {formData.visits.map((visit, index) => (
  <tr key={`visit-${index}`}>
    <td>
      <input 
        type="date" 
        name={`date`}
        value={visit.date} 
        disabled 
        className="form-control"
      />
    </td>
    <td>
      <input 
        type="date" 
        name={`realDate`}
        value={visit.realDate} 
        disabled 
        className="form-control"
      />
    </td>
    <td>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input 
            type="radio" 
            className="radio-input" 
            name={`deliverySuccess-${index}`}
            value="true"
            checked={visit.deliverySuccess === "true"}
            disabled 
          /> Yes
        </label>
        <label className="checkbox-label">
          <input 
            type="radio" 
            className="radio-input" 
            name={`deliverySuccess-${index}`}
            value="false"
            checked={visit.deliverySuccess === "false"}
            disabled
          /> No
        </label>
      </div>
    </td>
    <td>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input 
            type="radio" 
            className="radio-input" 
            name={`childEnrolled-${index}`}
            value="true"
            checked={visit.childEnrolled === "true"}
            disabled
          /> Yes
        </label>
        <label className="radio-label">
          <input 
            type="radio" 
            className="radio-input" 
            name={`childEnrolled-${index}`}
            value="false"
            checked={visit.childEnrolled === "false"}
            disabled
          /> No
        </label>
      </div>
    </td>
  </tr>
))}
            </tbody>
          </table>
        </div>
  
        <div className="form-group">
          <button type="button" className="btn" onClick={addCareVisit}>Add Another Delivery</button>
        </div>
        <div className="form-group">
        </div>
        <button
  type="button"
  onClick={() => navigate(-1)}>
  Cancel
</button>
      </form>

      </div>
  );
  
  
}

export default DeliveryHistoryReadOnly;

