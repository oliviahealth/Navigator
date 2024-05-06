import '../../styles/EncounterFormStyle.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function AppReadOnly() {
  const { patientId, log_id } = useParams();
  const [formData, setFormData] = useState({
    participantName: '',
    caseId: '',
    visits: [
      {
        date: '',
        staff: '',
        healthInsurance: '',
        parentConcerns: '',
        careVisit: '',
        careVisitDate: '',
        careVisitReason: '',
        wellChildVisit: '',
     
        visitCompleted: '',
      },
    ],
  });

  useEffect(() => {
    const fetchLog = async () => {
      const accessToken = Cookies.get('accessToken');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/encounter_form/${patientId}/${log_id}`, {
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
  const navigate = useNavigate();
  const handleInputChange = (event, index) => {
    const { name, value, type, checked } = event.target;
  
    // Handle the input change for checkboxes, radios, and text (including non-finalized date inputs)
    if (type === 'checkbox' || type === 'radio') {
      setFormData(prevFormData => {
        const newVisits = [...prevFormData.visits];
        newVisits[index] = { ...newVisits[index], [name.split('-')[0]]: type === 'radio' ? value : checked };
        return { ...prevFormData, visits: newVisits };
      });
    } else {
      // Directly update the state for text and provisional date inputs
      setFormData(prevFormData => {
        const newVisits = [...prevFormData.visits];
        newVisits[index] = { ...newVisits[index], [name.split('-')[0]]: value };
        return { ...prevFormData, visits: newVisits };
      });
    }
  };
  
  const handleInputBlur = (event, index) => {
    const { name, value } = event.target;
    // Perform date validation on blur
    const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  
    if (name.includes('Date') && value && !isValidDate(value)) {
      alert('Please enter a valid date in the format YYYY-MM-DD');
      // Optionally, clear the invalid input
      setFormData(prevFormData => {
        const newVisits = [...prevFormData.visits];
        newVisits[index] = { ...newVisits[index], [name.split('-')[0]]: '' };
        return { ...prevFormData, visits: newVisits };
      });
      return; // Stop further processing if the date is not valid
    }
  };

  
  

  

const addCareVisit = () => {
  setFormData(prevFormData => ({
    ...prevFormData,
    visits: [
      ...prevFormData.visits,
      {
        date: '',
        staff: '',
        healthInsurance: '',
        parentConcerns: '',
        careVisit: '',
        careVisitDate: '',
        careVisitReason: '',
        wellChildVisit: '',
        visitCompleted: '',
      }
    ],
  }));
};


const removeCareVisit = (index) => {
  setFormData(prevFormData => {
    return {
      ...prevFormData,
      visits: prevFormData.visits.filter((_, idx) => idx !== index)
    };
  });
};


  return (
    <div className="App">
      <form className="encounter-form">
        <h2>Encounter Form / Home Visit Form</h2>
        <p>To Assess External Care Provider Encounters/Visits</p>
        
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="date-column">Date of Visit*</th>
                <th className="staff-column">Staff</th>
                <th className="health-insurance-column">1. Health Insurance</th>
                <th className="parent-concerns-column">2. Parent concerns about child</th>
                <th className="care-visits-column">3. Care Visits</th>
                <th className="care-reasons-column">4. Care Visit Dates and Reasons( Please enter valid date(s) separated by commas in the format YYYY-MM-DD)</th>
                <th className="well-child-visits-column">5. Well-child visits</th>
                <th className="completed-visits-column">Visit(s) Completed(See Well-Child Visits List Below)</th>
                <th className="remove">Remove Visit</th>
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
                      type="text" 
                      name="staff" 
                      value={visit.staff} 
                      disabled 
                      className="form-control"
                    />
                  </td>
                  <td>
                  <div className="radio-group">
          <label className="radio-label">
            <input 
              type="radio" 
              className="radio-input" 
              name={`healthInsurance-${index}`} 
              value="Yes"
              checked={visit.healthInsurance === 'Yes'} 
              disabled 
            /> Yes
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              className="radio-input" 
              name={`healthInsurance-${index}`}
              value="No"
              checked={visit.healthInsurance === 'No'} 
              disabled 
            /> No
          </label>
        </div>
                  </td>
                  <td>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          className="radio-input" 
                          name= {`parentConcerns-${index}`}
                          value="Yes"
                          checked={visit.parentConcerns === 'Yes'} 
                          disabled 
                        /> Yes
                      </label>
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          className="radio-input" 
                          name= {`parentConcerns-${index}`}
                          value="No"
                          checked={visit.parentConcerns === 'No'} 
                          disabled 
                        /> No
                      </label>
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          className="radio-input" 
                          name= {`parentConcerns-${index}`}
                          value="DidNotAsk"
                          checked={visit.parentConcerns === 'DidNotAsk'} 
                          disabled 
                        /> Did not ask
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          className="radio-input" 
                          name= {`careVisit-${index}`}
                          value="Yes"
                          checked={visit.careVisit === 'Yes'} 
                          disabled 
                        /> Yes
                      </label>
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          className="radio-input" 
                          name= {`careVisit-${index}`}
                          value="No"
                          checked={visit.careVisit === 'No'} 
                          disabled 
                        /> No
                      </label>
                    </div>
                  </td>
                  <td>
                    {visit.careVisit === 'Yes' ? (
                      <>
                       <input
                          type="date"
                          name={`careVisitDate-${index}`}
                          value={visit.careVisitDate}
                          disabled
                          onBlur={(event) => handleInputBlur(event, index)}
                          className="form-control"
                        />
                        <input 
                          type="text" 
                          name= {`careVisitReason-${index}`} 
                          value={visit.careVisitReason} 
                          placeholder="Reason"
                          disabled 
                          className="form-control"
                        />
                      </>
                    ) : <td></td>}
                  </td>
                  <td>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          className="radio-input" 
                          name= {`wellChildVisit-${index}`}
                          value="Yes"
                          checked={visit.wellChildVisit === 'Yes'} 
                          disabled 
                        /> Yes
                      </label>
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          className="radio-input" 
                          name= {`wellChildVisit-${index}`}
                          value="No"
                          checked={visit.wellChildVisit === 'No'} 
                          disabled 
                        /> No
                      </label>
                    </div>
                  </td>
                  <td>
                    {visit.wellChildVisit === 'Yes' ? (
                      <input 
                        type="text" 
                        name= {`visitCompleted-${index}`} 
                        value={visit.visitCompleted} 
                        placeholder="Visit(s) Completed"
                        disabled 
                        className="form-control"
                      />
                    ) : <td></td>}
                    
                  </td>
                  <td>
        <button type="button" onClick={() => removeCareVisit(index)}>
          Remove Visit
        </button>
      </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <button type="button" className="btn" onClick={addCareVisit}>Add Another Visit</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
     
      <div className="list-container">
  <p className="list-title">Well-Child Visits</p>
  <ul className="well-child-list">
    <li>Newborn: 3-7 days old, 2-4 weeks old</li>
    <li>Infant: 2-3 months old, 4-5 months old, 6-7 months old</li>
    <li>Toddler: 9-10 months old, 12-13 months old, 15-16 months old</li>
    <li>Preschool: 18-19 months old, 2 - 2.5 years old, 3 - 3.5 years old</li>
    <li>School Age: 4 - 4.5 years old</li>

  </ul>
</div>

<div className="guidance-section">
  <h3>Guidance for Encounter Form / Home Visit External Care Provider Form</h3>
  <p>This form is to be completed at every completed home visit. The visit must be face-to-face to count as a PageOne-EHR home visit, telephonic or other electronic encounters are not PageOne-EHR home visits. The guidelines follow the home visit form layout. Home visitors may instead choose to use the matrix layout to record all the visits completed in a month.</p>

  <h4>Section/item</h4>
  <p><strong>Date of Visit*</strong></p>
  <p>The date of the completed visit. In "PageOne-EHR", this is "Date Taken" and is a required field.</p>
  
  <h4>At Every Visit</h4>
  <p><strong>Do you have health insurance coverage?</strong></p>
  <p>In order to determine the Participant's health insurance coverage (or lack of) throughout the year, this must be asked/confirmed at each visit.</p>
  
  <h4>At Every Postnatal Visit (i.e. every visit once a PageOne-EHR target child is enrolled)</h4>
  <p><strong>Do you have concerns about your child’s development, behavior, or learning?</strong></p>
  <p>It is recommended that home visitors ask parents about developmental, behavioral, or learning concerns at every visit, even for newborns. HRSA requires that we report the number of postnatal visits where this question was asked.</p>
  <p>If the home visitor did not ask the question during a visit, mark “Did not ask”.</p>

  <h4>Care / Emergency Room Visit (Y/N)</h4>
  <p>Ask this question at every visit to be sure that no visits are missed. If the answer is “Yes”, then record the Care / ER Visit Date(s) and Reason(s). If the answer is “No”, skip to well-child visits. If there is more than one PageOne-EHR target child and one child went to the ER and one did not, record “Yes”. This question only applies to non-fatal ER visits. For the first home visit, it is acceptable to record No since any ER visit referenced would be prior to program enrollment.</p>
  
  <p><strong>à ER Visit Date</strong></p>
  <p>If the Participant answered “Yes” to taking a child to the ER, record the date and reason for the ER Visit. Be careful not to record a visit more than once. You may need to check the last Home Visit Form to confirm that the visit was not documented at the last visit. If there is more than one PageOne-EHR target child and both went to the ER, record all the visit dates and reasons for the children separately. For example, if both children were in a car accident and were seen for their injuries at the ER on the same date, record two visits—one for each child. If the Participant is unsure of the exact date of the visit, record an estimated date.</p>
  
  <p>HRSA requires that we report the number of non-fatal ER visits due to injuries. Injuries refer to the following causes or mechanisms of injury: motor vehicle, suffocation, drowning, poisoning, fire/burns, falls, sports and recreation, and intentional injuries, such as child maltreatment.</p>
  <p>Note: If an ER Visit occurred, ER Visit Date and ER Visit Reason must be complete. If any one element is missing, ER Visit data are reported as missing.</p>

  <h4>Well-child visits (Y/N)</h4>
  <p>It is very important that each well-child visit is recorded at the home visit immediately following the well-child visit. For this reason, this question is included at every visit. If the question is not answered at every visit, there could be missing data for the performance measure for this child. If the answer is Yes, then the completed visits are recorded in the following question and then in the Child Record TouchPoint in PAGEONE-EHR. For the first home visit, assuming that this information will have already been captured in the Target Child Record on the same day, it is acceptable to record No as the question will be redundant.</p>
  <p><strong>à Well-child visits completed</strong></p>
  <p>If the Participant indicates that a well-child visit was completed, check the box of the age/visit. The age ranges are inclusive, meaning that 6-7 months old includes a two-month period of time, from when the child turned 6 months old until the last day the child was 7 months old. Visit dates and ages do not need to line up exactly; home visitors can use their judgment to determine if a visit a few days earlier or later than the designated age range should be recorded in one age range or another if the age ranges meet.</p>
</div>


    </div>
  );
  
  
}

export default AppReadOnly;

