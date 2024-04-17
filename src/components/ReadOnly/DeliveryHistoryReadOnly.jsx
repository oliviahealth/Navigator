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
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/delivery_history/${patientId}/${log_id}`, {
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
                      onChange={(event) => handleInputChange(event, index)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="realDate"
                      value={visit.realDate}
                      onChange={(event) => handleInputChange(event, index)}
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
                          onChange={(event) => handleInputChange(event, index)}
                        /> Yes
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          name="deliverySuccessFalse"
                          checked={visit.deliverySuccessFalse}
                          onChange={(event) => handleInputChange(event, index)}
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
                          onChange={(event) => handleInputChange(event, index)}
                        /> Yes
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          name="ifno"
                          checked={visit.ifno}
                          onChange={(event) => handleInputChange(event, index)}
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
      </form>

    </div>
  );


}

export default DeliveryHistoryReadOnly;

