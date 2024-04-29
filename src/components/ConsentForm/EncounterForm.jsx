import '../../styles/EncounterFormStyle.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({
    participantName: '',
    caseId: '',
    visits: [
      {
        date: '',
        staff: '',
        healthInsuranceYes: false,
        healthInsuranceNo: false,
        parentConcernsYes: false,
        parentConcernsNo: false,
        parentConcernsDidNotAsk: false,
        careVisitYes: false,
        careVisitNo: false,
        careVisitDate: '',
        careVisitReason: '',
        wellChildVisitYes: false,
        wellChildVisitNo: false,
        visitCompleted: '',
      },
    ],
  });
  const navigate = useNavigate();

  const handleInputChange = (event, index) => {
    const { name, value, type, checked } = event.target;
    
    const isValidDate = (dateStr) => {
      return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    };
  

    if (type === 'checkbox') {
     
      const newVisits = formData.visits.map((visit, visitIndex) =>
        index === visitIndex ? { ...visit, [name]: checked } : visit
      );
      setFormData({ ...formData, visits: newVisits });
    } else if (type === 'date') {
      
      if (value && !isValidDate(value)) {
        alert('Please enter a valid date in the format YYYY-MM-DD');
        return;
      }
      const newVisits = formData.visits.map((visit, visitIndex) =>
        index === visitIndex ? { ...visit, [name]: value } : visit
      );
      setFormData({ ...formData, visits: newVisits });
    } else if (type === 'text') {
  
      if (name === 'staff' || name === 'careVisitReason' || name === 'visitCompleted') {
        
        if (/<|>/.test(value)) {
          alert('Please do not use angle brackets <>');
          return;
        }
      } else if (name === 'careVisitDate') {
        
        const dates = value.split(',').map(date => date.trim());
        if (dates.some(date => date && !isValidDate(date))) {
          alert('Please enter valid date(s) separated by commas in the format YYYY-MM-DD');
          return;
        }
      }

      const newVisits = formData.visits.map((visit, visitIndex) =>
        index === visitIndex ? { ...visit, [name]: value } : visit
      );
      setFormData({ ...formData, visits: newVisits });
    }
  };
  

  const addCareVisit = () => {
    setFormData({
      ...formData,
      visits: [
        ...formData.visits,
        {
          date: '',
          staff: '',
          healthInsuranceYes: false,
          healthInsuranceNo: false,
          parentConcernsYes: false,
          parentConcernsNo: false,
          parentConcernsDidNotAsk: false,
          careVisitYes: false,
          careVisitNo: false,
          careVisitDate: '',
          careVisitReason: '',
          wellChildVisitYes: false,
          wellChildVisitNo: false,
          visitCompleted: '',
        },
      ],
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Process the formData here
    console.log(formData);
    navigate('/dashboard');
  };

  // ...

return (
    <div className="App">
      <form onSubmit={onSubmitHandler} className="encounter-form">
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
    <th className="care-reasons-column">4. Care Visit Dates and Reasons</th>
    <th className="well-child-visits-column">5. Well-child visits</th>
    <th className="completed-visits-column">Visit(s) Completed(See Well-Child Visits List Below)</th>
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
                      type="text" 
                      name="staff" 
                      value={visit.staff} 
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
                          name="healthInsuranceYes" 
                          checked={visit.healthInsuranceYes} 
                          onChange={(event) => handleInputChange(event, index)} 
                        /> Yes
                      </label>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          className="checkbox-input" 
                          name="healthInsuranceNo" 
                          checked={visit.healthInsuranceNo} 
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
                          name="parentConcernsYes" 
                          checked={visit.parentConcernsYes} 
                          onChange={(event) => handleInputChange(event, index)} 
                        /> Yes
                      </label>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          className="checkbox-input" 
                          name="parentConcernsNo" 
                          checked={visit.parentConcernsNo} 
                          onChange={(event) => handleInputChange(event, index)} 
                        /> No
                      </label>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          className="checkbox-input" 
                          name="parentConcernsDidNotAsk" 
                          checked={visit.parentConcernsDidNotAsk} 
                          onChange={(event) => handleInputChange(event, index)} 
                        /> Did not ask
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          className="checkbox-input" 
                          name="careVisitYes" 
                          checked={visit.careVisitYes} 
                          onChange={(event) => handleInputChange(event, index)} 
                        /> Yes
                      </label>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          className="checkbox-input" 
                          name="careVisitNo" 
                          checked={visit.careVisitNo} 
                          onChange={(event) => handleInputChange(event, index)} 
                        /> No
                      </label>
                    </div>
                  </td>
                  {visit.careVisitYes && (
                    <td>
                      <input 
                        type="text" 
                        name="careVisitDate" 
                        value={visit.careVisitDate} 
                        placeholder="Visit Date"
                        onChange={(event) => handleInputChange(event, index)} 
                        className="form-control"
                      />
                      <input 
                        type="text" 
                        name="careVisitReason" 
                        value={visit.careVisitReason} 
                        placeholder="Reason"
                        onChange={(event) => handleInputChange(event, index)} 
                        className="form-control"
                      />
                    </td>
                  )}
                  {!visit.careVisitYes && <td></td>}
                  <td>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          className="checkbox-input" 
                          name="wellChildVisitYes" 
                          checked={visit.wellChildVisitYes} 
                          onChange={(event) => handleInputChange(event, index)} 
                        /> Yes
                      </label>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          className="checkbox-input" 
                          name="wellChildVisitNo" 
                          checked={visit.wellChildVisitNo} 
                          onChange={(event) => handleInputChange(event, index)} 
                        /> No
                      </label>
                    </div>
                  </td>
                  {visit.wellChildVisitYes && (
                    <td>
                      <input 
                        type="text" 
                        name="visitCompleted" 
                        value={visit.visitCompleted} 
                        placeholder="Visit(s) Completed"
                        onChange={(event) => handleInputChange(event, index)} 
                        className="form-control"
                      />
                    </td>
                  )}
                  {!visit.wellChildVisitYes && <td></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="form-group">
          <button type="button" className="btn" onClick={addCareVisit}>Add Another Visit</button>
        </div>
        <div className="form-group">
          <button className="btn" type="submit">Submit</button>
        </div>
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

export default App;

