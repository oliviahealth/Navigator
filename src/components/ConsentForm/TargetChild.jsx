import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/TargetChild.css';

function TargetChild() {
  const { patientId } = useParams()
    const [formData, setFormData] = useState({
        participantName: '',
        caseID: '',
        staffName: '',
        dateCompleted: '',
        childName: '',
        socialSecurityNumber: '',
        timeframe: '',
        wellChildVisitNewborn: false,
        wellChildVisit3_7Days: false,
        wellChildVisit2_4Weeks: false,
        wellChildVisit2_3Months: false,
        wellChildVisit4_5Months: false,
        wellChildVisit6_7Months: false,
        wellChildVisit9_10Months: false,
        wellChildVisit12_13Months: false,
        wellChildVisit15_16Months: false,
        wellChildVisit18_19Months: false,
        wellChildVisit2_2_5Years: false,
        wellChildVisit3_3_5Years: false,
        wellChildVisit4_4_5Years: false,
      });



  const navigate = useNavigate();


  const [isBiologicalMother, setIsBiologicalMother] = useState(false);

  const handleMotherChange = (e) => {
    setIsBiologicalMother(e.target.value === 'Yes');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'text' && /<|>|;|'|"/.test(value)) {
      return;
    }

    if (type === 'date' && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return;
    }

    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/target_child/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      navigate(-1);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };
  return (
    <div className="target-child-questionnaire">
      <h1>Target Child Questionnaire</h1>
      <form onSubmit={handleSubmit} className="target-child-questionnaire-form">
  <h2>Target Child Questionnaire</h2>
  
  <label>
    Participant Name:
    <input
      type="text"
      name="participantName"
      value={formData.participantName}
      onChange={handleChange}
    />
  </label>

  <label>
    Case ID:
    <input
      type="text"
      name="caseID"
      value={formData.caseID}
      onChange={handleChange}
    />
  </label>

  <label>
    Staff Name:
    <input
      type="text"
      name="staffName"
      value={formData.staffName}
      onChange={handleChange}
    />
  </label>

  <label>
    Date Completed:
    <input
      type="date"
      name="dateCompleted"
      value={formData.dateCompleted}
      onChange={handleChange}
    />
  </label>

  <label>
    Child Name:
    <input
      type="text"
      name="childName"
      value={formData.childName}
      onChange={handleChange}
    />
  </label>
  <label>
    Child Enrollment Date:
    <input
      type="date"
      name="childDate"
      value={formData.childDate}
      onChange={handleChange}
    />
  </label>
  <label>
    Child SSN:
    <input
      type="text"
      name="ssn"
      value={formData.ssn}
      onChange={handleChange}
    />
  </label>
  <label>
   Child DOB:
    <input
      type="date"
      name="birthDate"
      value={formData.birthDate}
      onChange={handleChange}
    />
  </label>
  <label>
    Gestation Age at Birth( # weeks):
    <input
      type="text"
      name="gestation"
      value={formData.gestation}
      onChange={handleChange}
    />
  </label>

      <div className="general-questions">
        <label>
         Child Gender:
          <input
            type="radio"
            name="q1"
            value="Male"
            checked={formData.sleep === 'Male'}
            onChange={handleChange}
          /> Male
          <input
            type="radio"
            name="q1"
            value="Female"
            checked={formData.sleep === 'Female'}
            onChange={handleChange}
          /> Female
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        Child Ethnicity
          <input
            type="radio"
            name="q1"
            value="Hispanic"
            checked={formData.sleep === 'Hispanic'}
            onChange={handleChange}
          /> Hispanic or Latino/a
          <input
            type="radio"
            name="q1"
            value="nonHispanic"
            checked={formData.sleep === 'nonHispanic'}
            onChange={handleChange}
          /> Not Hispanic or Latino/a
        </label>
        
      </div>
      <div className="general-questions">
        <label>
         Child race? (select all that apply)
          <input
            type="checkbox"
            name="q1"
            value="African"
            checked={formData.sleep === 'African'}
            onChange={handleChange}
          /> American Indian/Alaska Native
          <input
            type="checkbox"
            name="q1"
            value="Asian"
            checked={formData.sleep === 'Asian'}
            onChange={handleChange}
          /> Asian
          <input
            type="checkbox"
            name="q1"
            value="Black"
            checked={formData.sleep === 'Black'}
            onChange={handleChange}
          /> Black or African American
        <input
            type="checkbox"
            name="q1"
            value="NativePacificIslander"
            checked={formData.sleep === 'NativePacificIslander'}
            onChange={handleChange}
          /> Native Hawaiian or Pacific Islander 
          <input
            type="checkbox"
            name="q1"
            value="White"
            checked={formData.sleep === 'White'}
            onChange={handleChange}
          /> White
          <input
            type="checkbox"
            name="q1"
            value="MoreThanOne"
            checked={formData.sleep === 'MoreThanOne'}
            onChange={handleChange}
          /> More than one race - not specified
         </label>
         
      </div>

      <div className="biological-mother-question">
        <label>
          Is the Participant the biological mother of the child?
          <input
            type="radio"
            name="isBiologicalMother"
            value="Yes"
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="isBiologicalMother"
            value="No"
            onChange={handleChange}
          /> No
        </label>
      </div>
      <div className="general-questions">
 

      <div className="question-item">
  <p>Well-child visits completed to date (check all that apply):</p>
  <div className="checkbox-group">
    {/* Newborn checkbox is assumed to be above */}
    
    <label>
      3-7 days old
      <input
        type="checkbox"
        name="wellChildVisit3_7Days"
        checked={formData.wellChildVisit3_7Days || false}
        onChange={handleChange}
      />
    </label>

    <label>
      2-4 weeks old
      <input
        type="checkbox"
        name="wellChildVisit2_4Weeks"
        checked={formData.wellChildVisit2_4Weeks || false}
        onChange={handleChange}
      />
    </label>

    <label>
      2-3 months old
      <input
        type="checkbox"
        name="wellChildVisit2_3Months"
        checked={formData.wellChildVisit2_3Months || false}
        onChange={handleChange}
      />
    </label>

    <label>
      4-5 months old
      <input
        type="checkbox"
        name="wellChildVisit4_5Months"
        checked={formData.wellChildVisit4_5Months || false}
        onChange={handleChange}
      />
    </label>

    <label>
      6-7 months old
      <input
        type="checkbox"
        name="wellChildVisit6_7Months"
        checked={formData.wellChildVisit6_7Months || false}
        onChange={handleChange}
      />
    </label>

    <label>
      9-10 months old
      <input
        type="checkbox"
        name="wellChildVisit9_10Months"
        checked={formData.wellChildVisit9_10Months || false}
        onChange={handleChange}
      />
    </label>
    <label>
      12-13 months old
      <input
        type="checkbox"
        name="wellChildVisit12_13Months"
        checked={formData.wellChildVisit12_13Months || false}
        onChange={handleChange}
      />
    </label>
    <label>
      15-16 months old
      <input
        type="checkbox"
        name="wellChildVisit15_16Months"
        checked={formData.wellChildVisit15_16Months || false}
        onChange={handleChange}
      />
    </label>
    <label>
      18-19 months old
      <input
        type="checkbox"
        name="wellChildVisit18_19Months"
        checked={formData.wellChildVisit18_19Months || false}
        onChange={handleChange}
      />
    </label>
    <label>
      2-2.5 years old
      <input
        type="checkbox"
        name="wellChildVisit2_2_5Years"
        checked={formData.wellChildVisit2_2_5Years|| false}
        onChange={handleChange}
      />
    </label>
    <label>
      3-3.5 years old
      <input
        type="checkbox"
        name="wellChildVisit3_3_5Years"
        checked={formData.wellChildVisit3_3_5Years || false}
        onChange={handleChange}
      />
    </label>
    <label>
      4-4.5 years old
      <input
        type="checkbox"
        name="wellChildVisit4_4_5Years"
        checked={formData.wellChildVisit4_4_5Years || false}
        onChange={handleChange}
      />
    </label>

    {/* Add additional checkboxes for each age group as necessary */}
  </div>
</div>

</div>
<div className="question-item">
  <p>What kind of health insurance coverage does your child have? (check one)</p>
  <label>
    Medicaid or Texas KidCare
    <input
      type="radio"
      name="childInsurance"
      value="Medicaid or Texas KidCare"
      checked={formData.childInsurance === 'Medicaid or Texas KidCare'}
      onChange={handleChange}
    />
  </label>
  <label>
    Private health insurance
    <input
      type="radio"
      name="childInsurance"
      value="Private health insurance"
      checked={formData.childInsurance === 'Private health insurance'}
      onChange={handleChange}
    />
  </label>
  <label>
    Tri-Care
    <input
      type="radio"
      name="childInsurance"
      value="Tri-Care"
      checked={formData.childInsurance === 'Tri-Care'}
      onChange={handleChange}
    />
  </label>
  <label>
    No health insurance
    <input
      type="radio"
      name="childInsurance"
      value="No health insurance"
      checked={formData.childInsurance === 'No health insurance'}
      onChange={handleChange}
    />
  </label>
  <label>
    Other health insurance
    <input
      type="radio"
      name="childInsurance"
      value="Other health insurance"
      checked={formData.childInsurance === 'Other health insurance'}
      onChange={handleChange}
    />
    {formData.childInsurance === 'Other health insurance' && (
      <input
        type="text"
        name="childInsuranceOther"
        value={formData.childInsuranceOther || ''}
        onChange={handleChange}
      />
    )}
  </label>
</div>


      
      <button type="submit">Submit</button>
      <button
  type="button"
  onClick={() => navigate('/dashboard')}>
  Cancel
</button>

  
</form>
    </div>
  );
}

export default TargetChild;