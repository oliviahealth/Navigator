import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/BriefChild.css';

function BriefChild() {
  const { patientId } = useParams()
  const [formValues, setFormValues] = useState({
    childName: '',
    dateCompleted: '',
    timeframe: '',
    insuranceType: '',
    insuranceOther: '',
    medicalCareSource: '',
    medicalCareOther: '',
    dentalCare: '',
    familyInteraction: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;


    if (type === 'text' && /<|>|;|'|"/.test(value)) {
      return;
    }

    if (type === 'date' && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return;
    }

    const inputValue = type === 'checkbox' ? checked : value;

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
const accessToken = Cookies.get('accessToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/brief_child/${patientId}`, {
        method: 'POST',
        headers: {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${accessToken}`
},
credentials: 'omit',
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      navigate(-1);
    } catch (error) {
      console.error('failed to submit');
    }
  };

  return (
    <div className="wellness-update-form">
      <h1>Brief Child Wellness Update</h1>
      <h2>PageOne-EHR: Child Wellness TouchPoint</h2>
      <p>Complete this form for each PAGEONE-EHR target child at each required timeframe once the child is enrolled.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="childName">Child Name:</label>
          <input type="text" id="childName" name="childName" onChange={handleInputChange} value={formValues.childName} />

          <label htmlFor="dateCompleted">Date Completed*:</label>
          <input type="date" id="dateCompleted" name="dateCompleted" onChange={handleInputChange} value={formValues.dateCompleted} />

          <div className="radio-section">
            <label>Timeframe*:</label>
            <label>
              <input type="radio" name="timeframe" value="Enrollment" onChange={handleInputChange} checked={formValues.timeframe === 'Enrollment'} />
              Enrollment
            </label>
            <label>
              <input type="radio" name="timeframe" value="Update" onChange={handleInputChange} checked={formValues.timeframe === 'Update'} />
              Update
            </label>
          </div>

          <div className="radio-section">
            <label>1. What kind of health insurance coverage does your child have? (check one)</label>
            <label>
              <input type="radio" name="insuranceType" value="Medicaid" onChange={handleInputChange} checked={formValues.insuranceType === 'Medicaid'} />
              Medicaid or Texas KidCare
            </label>
            <label>
              <input type="radio" name="insuranceType" value="Private" onChange={handleInputChange} checked={formValues.insuranceType === 'Private'} />
              Private health insurance
            </label>
            <label>
              <input type="radio" name="insuranceType" value="TriCare" onChange={handleInputChange} checked={formValues.insuranceType === 'TriCare'} />
              Tri-Care
            </label>
            <label>
              <input type="radio" name="insuranceType" value="None" onChange={handleInputChange} checked={formValues.insuranceType === 'None'} />
              No health insurance
            </label>
            <input type="text" placeholder="Other" name="insuranceOther" onChange={handleInputChange} value={formValues.insuranceOther} />
          </div>

          <div className="radio-section">
            <label>2. What is your child's usual source of medical care? (check one)</label>
            <label>
              <input type="radio" name="medicalCareSource" value="Doctor" onChange={handleInputChange} checked={formValues.medicalCareSource === 'Doctor'} />
              Doctor's/Nurse Practitioner's Office
            </label>
            <label>
              <input type="radio" name="medicalCareSource" value="Hospital" onChange={handleInputChange} checked={formValues.medicalCareSource === 'Hospital'} />
              Hospital Emergency Room
            </label>
            <label>
              <input type="radio" name="medicalCareSource" value="Clinic" onChange={handleInputChange} checked={formValues.medicalCareSource === 'Clinic'} />
              Hospital Outpatient Clinic
            </label>
            <label>
              <input type="radio" name="medicalCareSource" value="FQHC" onChange={handleInputChange} checked={formValues.medicalCareSource === 'FQHC'} />
              Federally Qualified Health Center
            </label>
            <label>
              <input type="radio" name="medicalCareSource" value="None" onChange={handleInputChange} checked={formValues.medicalCareSource === 'None'} />
              No usual source of care
            </label>
            <input type="text" placeholder="Other" name="medicalCareOther" onChange={handleInputChange} value={formValues.medicalCareOther} />
          </div>

          <div className="radio-section">
            <label>3. Does your child have a usual source of dental care?</label>
            <label>
              <input type="radio" name="dentalCare" value="Yes" onChange={handleInputChange} checked={formValues.dentalCare === 'Yes'} />
              Yes
            </label>
            <label>
              <input type="radio" name="dentalCare" value="No" onChange={handleInputChange} checked={formValues.dentalCare === 'No'} />
              No
            </label>
          </div>

          <div className="radio-section">
            <label>4. In a typical week, how often do you or a family member read, tell stories, or sing songs to your child?</label>
            <label>
              <input type="radio" name="familyInteraction" value="Daily" onChange={handleInputChange} checked={formValues.familyInteraction === 'Daily'} />
              Every day
            </label>
            <label>
              <input type="radio" name="familyInteraction" value="SomeDays" onChange={handleInputChange} checked={formValues.familyInteraction === 'SomeDays'} />
              Some days
            </label>
          </div>

          <button type="submit">Submit</button>
          <button
  type="button"
  onClick={() => navigate('/dashboard')}>
  Cancel
</button>
        </div>
      </form>
    </div>
  );
}

export default BriefChild;