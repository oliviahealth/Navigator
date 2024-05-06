import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/BriefChild.css';
import Cookies from 'js-cookie';

function BriefChildReadOnly() {
  const { patientId, log_id } = useParams()
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
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/brief_child/${patientId}/${log_id}`, {
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
        setFormValues(data[2])

      } catch (error) {
        console.error('failed to fetch');
      }
    };

    fetchLog();
  }, [patientId, log_id]);

  return (
    <div className="wellness-update-form">
      <h1>Brief Child Wellness Update</h1>
      <h2>PageOne-EHR: Child Wellness TouchPoint</h2>
      <p>Complete this form for each PAGEONE-EHR target child at each required timeframe once the child is enrolled.</p>

      <form>
        <div className="form-section">
          <label htmlFor="childName">Child Name:</label>
          <input type="text" id="childName" name="childName" disabled value={formValues.childName} />

          <label htmlFor="dateCompleted">Date Completed*:</label>
          <input type="date" id="dateCompleted" name="dateCompleted" disabled value={formValues.dateCompleted} />

          <div className="radio-section">
            <label>Timeframe*:</label>
            <label>
              <input type="radio" name="timeframe" value="Enrollment" disabled checked={formValues.timeframe === 'Enrollment'} />
              Enrollment
            </label>
            <label>
              <input type="radio" name="timeframe" value="Update" disabled checked={formValues.timeframe === 'Update'} />
              Update
            </label>
          </div>

          <div className="radio-section">
            <label>1. What kind of health insurance coverage does your child have? (check one)</label>
            <label>
              <input type="radio" name="insuranceType" value="Medicaid" disabled checked={formValues.insuranceType === 'Medicaid'} />
              Medicaid or Texas KidCare
            </label>
            <label>
              <input type="radio" name="insuranceType" value="Private" disabled checked={formValues.insuranceType === 'Private'} />
              Private health insurance
            </label>
            <label>
              <input type="radio" name="insuranceType" value="TriCare" disabled checked={formValues.insuranceType === 'TriCare'} />
              Tri-Care
            </label>
            <label>
              <input type="radio" name="insuranceType" value="None" disabled checked={formValues.insuranceType === 'None'} />
              No health insurance
            </label>
            <input type="text" placeholder="Other" name="insuranceOther" disabled value={formValues.insuranceOther} />
          </div>

          <div className="radio-section">
            <label>2. What is your child's usual source of medical care? (check one)</label>
            <label>
              <input type="radio" name="medicalCareSource" value="Doctor" disabled checked={formValues.medicalCareSource === 'Doctor'} />
              Doctor's/Nurse Practitioner's Office
            </label>
            <label>
              <input type="radio" name="medicalCareSource" value="Hospital" disabled checked={formValues.medicalCareSource === 'Hospital'} />
              Hospital Emergency Room
            </label>
            <label>
              <input type="radio" name="medicalCareSource" value="Clinic" disabled checked={formValues.medicalCareSource === 'Clinic'} />
              Hospital Outpatient Clinic
            </label>
            <label>
              <input type="radio" name="medicalCareSource" value="FQHC" disabled checked={formValues.medicalCareSource === 'FQHC'} />
              Federally Qualified Health Center
            </label>
            <label>
              <input type="radio" name="medicalCareSource" value="None" disabled checked={formValues.medicalCareSource === 'None'} />
              No usual source of care
            </label>
            <input type="text" placeholder="Other" name="medicalCareOther" disabled value={formValues.medicalCareOther} />
          </div>

          <div className="radio-section">
            <label>3. Does your child have a usual source of dental care?</label>
            <label>
              <input type="radio" name="dentalCare" value="Yes" disabled checked={formValues.dentalCare === 'Yes'} />
              Yes
            </label>
            <label>
              <input type="radio" name="dentalCare" value="No" disabled checked={formValues.dentalCare === 'No'} />
              No
            </label>
          </div>

          <div className="radio-section">
            <label>4. In a typical week, how often do you or a family member read, tell stories, or sing songs to your child?</label>
            <label>
              <input type="radio" name="familyInteraction" value="Daily" disabled checked={formValues.familyInteraction === 'Daily'} />
              Every day
            </label>
            <label>
              <input type="radio" name="familyInteraction" value="SomeDays" disabled checked={formValues.familyInteraction === 'SomeDays'} />
              Some days
            </label>
          </div>
        </div>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
}

export default BriefChildReadOnly;