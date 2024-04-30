import '../../styles/EncounterFormStyle.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DeliveryHistoryReadOnly() {
  const { patientId, log_id } = useParams()
  const [formData, setFormData] = useState({
    participantName: '',
    caseId: '',
    visits: [
      {
        date: '',
        realDate: '',
        deliverySucessTrue: false,
        deliverySucessFalse: false,
        ifyes: false,
        ifno: false,
      },
    ],
  });
  const navigate = useNavigate();

  const handleInputChange = (event, index) => {
    const { name, value, type, checked } = event.target;
    const newVisits = formData.visits.map((visit, visitIndex) =>
      index === visitIndex ? { ...visit, [name]: type === 'checkbox' ? checked : value } : visit
    );

    setFormData({ ...formData, visits: newVisits });
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/delivery_history/${patientId}/${log_id}`, {
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
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  const addCareVisit = () => {
    setFormData({
      ...formData,
      visits: [
        ...formData.visits,
        {
          date: '',
          realDate: '',
          deliverySucessTrue: false,
          deliverySucessFalse: false,
          ifyes: false,
          ifno: false,
        },
      ],
    });
  };


  // ...

  return (
    <div className="App">
      <form className="encounter-form">
        <h2>Encounter Form / Home Visit Form</h2>
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
                <tr key={index}>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={visit.date}
                      disabled
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="realDate"
                      value={visit.realDate}
                      disabled
                      className="form-control"
                    />
                  </td>
                  <td>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          name="deliverySuccessTrue"
                          checked={visit.deliverySuccessTrue}
                          disabled
                        /> Yes
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          name="deliverySuccessFalse"
                          checked={visit.deliverySuccessFalse}
                          disabled
                        /> No
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          name="ifyes"
                          checked={visit.ifyes}
                          disabled
                        /> Yes
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          name="ifno"
                          checked={visit.ifno}
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

      </form>

    </div>
  );


}

export default DeliveryHistoryReadOnly;

