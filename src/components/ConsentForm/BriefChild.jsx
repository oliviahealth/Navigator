import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ConsentFormStyles/BriefChild.css';

function BriefChild() {
  const { patientId } = useParams()
  const [formValues, setFormValues] = useState({
    
    pregDate: '',
    startDate: '',
    name: '',
    phoneNum: '',
    email:'',
    
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the formData here
    console.log(formValues);
    // After processing your form you can navigate to the Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="wellness-update-form">
      <h1>Brief Child Wellness Update</h1>
      <h2>PageOne-EHR: Child Wellness TouchPoint</h2>
      <p>Complete this form for each PAGEONE-EHR target child at each required timeframe once the child is enrolled.</p>
  
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="childName">Child Name:</label>
          <input type="text" id="childName" name="childName" />
          
          <label htmlFor="dateCompleted">Date Completed*:</label>
          <input type="date" id="dateCompleted" name="dateCompleted" />
  
          <div className="radio-section">
            <label>Timeframe*:</label>
            <label><input type="radio" name="timeframe" value="Enrollment" /> Enrollment</label>
            <label><input type="radio" name="timeframe" value="Update" /> Update</label>
          </div>
  
          <div className="radio-section">
            <label>1. What kind of health insurance coverage does your child have? (check one)</label>
            <label><input type="radio" name="insuranceType" value="Medicaid" /> Medicaid or Texas KidCare</label>
            <label><input type="radio" name="insuranceType" value="Private" /> Private health insurance</label>
            <label><input type="radio" name="insuranceType" value="TriCare" /> Tri-Care</label>
            <label><input type="radio" name="insuranceType" value="None" /> No health insurance</label>
            <input type="text" placeholder="Other" name="insuranceOther" />
          </div>
  
          <div className="radio-section">
            <label>2. What is your child's usual source of medical care? (check one)</label>
            <label><input type="radio" name="medicalCareSource" value="Doctor" /> Doctor’s/Nurse Practitioner’s Office</label>
            <label><input type="radio" name="medicalCareSource" value="Hospital" /> Hospital Emergency Room</label>
            <label><input type="radio" name="medicalCareSource" value="Clinic" /> Hospital Outpatient Clinic</label>
            <label><input type="radio" name="medicalCareSource" value="FQHC" /> Federally Qualified Health Center</label>
            <label><input type="radio" name="medicalCareSource" value="None" /> No usual source of care</label>
            <input type="text" placeholder="Other" name="medicalCareOther" />
          </div>
  
          <div className="radio-section">
            <label>3. Does your child have a usual source of dental care?</label>
            <label><input type="radio" name="dentalCare" value="Yes" /> Yes</label>
            <label><input type="radio" name="dentalCare" value="No" /> No</label>
          </div>
  
          <div className="radio-section">
            <label>4. In a typical week, how often do you or a family member read, tell stories, or sing songs to your child?</label>
            <label><input type="radio" name="familyInteraction" value="Daily" /> Every day</label>
            <label><input type="radio" name="familyInteraction" value="SomeDays" /> Some days</label>
          </div>
  
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
  
        }

export default BriefChild;