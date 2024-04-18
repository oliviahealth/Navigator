import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/SafetyProfileForm.css';

const SafetyProfileForm = () => {
    const incomeReasons = ['Family refusal', 'In foster care', 'Other'];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    participantName: '',
    caseId: '',
    dateCompleted: '',
    staffName: '',
    insuranceCoverage: '',
    highSchoolDiploma: '',
    highestEducationLevel: '',
    currentlyEnrolled: '',
    employmentStatus: '',
    tobaccoUse: '',
    receivingServices: '',
    currentlyPregnant: '',
    likeToBecomePregnant: '',
    yearlyIncome: '',
    incomeDependents: '',
    housingSituation: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData(prevFormData => {
      let newFormData = { ...prevFormData };
  
      if (type === 'radio') {
        newFormData = {
          ...newFormData,
          [name]: value,
          ...(name === 'tobaccoUse' && value === 'No' && { tobaccoCessation: '', tobaccoCessationProvider: '' }),
          ...(name === 'currentPregnancy' && value === 'Yes' && { futurePregnancyPlan: '' }),
          ...(name === 'incomeReason' && value !== 'Other' && { yearlyIncome: '' }),
        };
      } else if (type === 'checkbox') {
        newFormData[name] = checked;
      } else if (name === 'yearlyIncome') {
        newFormData = {
          ...newFormData,
          yearlyIncome: value,
          incomeReason: '',
        };
      } else {
        newFormData[name] = value;
      }
  
      return newFormData;
    });
  };
  
  

  const housingOptions = {
    notHomeless: [
      "Owns or shares own home",
      "Rents or shares rented home",
      "Lives in public housing",
      "Lives with parent/family member",
      "Some other arrangement"
    ],
    homeless: [
      "Sharing housing",
      "Lives in a shelter",
      "Some other arrangement"
    ]
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data Submitted:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="housing-safety-form">
      <h2>Household Housing Safety Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Participant Information Section */}
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
            name="caseId"
            value={formData.caseId}
            onChange={handleChange}
          />
        </label>
        <label>
          Date Completed*:
          <input
            type="date"
            name="dateCompleted"
            value={formData.dateCompleted}
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
        
        {/* Timeframe */}
        <label>
          Enrollment
          <input
            type="checkbox"
            name="timeframeEnrollment"
            checked={formData.timeframeEnrollment}
            onChange={handleChange}
          />
        </label>
        <label>
          Update
          <input
            type="checkbox"
            name="timeframeUpdate"
            checked={formData.timeframeUpdate}
            onChange={handleChange}
          />
        </label>
        
        {/* Health Insurance Coverage */}
        <div className="form-question">
          <h3>1. What kind of health insurance coverage do you have? (check one)</h3>
          <label>
            Medicaid or Texas KidCare
            <input
              type="radio"
              name="insuranceType"
              value="Medicaid or Texas KidCare"
              checked={formData.insuranceType === 'Medicaid or Texas KidCare'}
              onChange={handleChange}
            />
          </label>
          <label>
            Private insurance
            <input
              type="radio"
              name="insuranceType"
              value="Private insurance"
              checked={formData.insuranceType === 'Private insurance'}
              onChange={handleChange}
            />
          </label>
          <label>
            Tricare
            <input
              type="radio"
              name="insuranceType"
              value="Tricare"
              checked={formData.insuranceType === 'Tricare'}
              onChange={handleChange}
            />
          </label>
          <label>
            No insurance
            <input
              type="radio"
              name="insuranceType"
              value="No insurance"
              checked={formData.insuranceType === 'No insurance'}
              onChange={handleChange}
            />
          </label>
          <label>
            Other insurance:
            <input
              type="text"
              name="otherInsurance"
              value={formData.otherInsurance}
              onChange={handleChange}
            />
          </label>
        </div>
        
        {/* High School Diploma or GED */}
        <div className="form-question">
          <h3>2. Do you have a high school diploma or GED?</h3>
          <label>
            Yes
            <input
              type="radio"
              name="hasHighSchoolDiploma"
              value="Yes"
              checked={formData.hasHighSchoolDiploma === 'Yes'}
              onChange={handleChange}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="hasHighSchoolDiploma"
              value="No"
              checked={formData.hasHighSchoolDiploma === 'No'}
              onChange={handleChange}
            />
          </label>
        </div>
  

{/* Education Level (conditional based on having a diploma or GED) */}
{formData.hasHighSchoolDiploma === 'Yes' && (
  <div className="form-question">
    <h3>3. If Yes, what is the highest level of education completed? (check one)</h3>
    <label>
      HS diploma/GED
      <input
        type="radio"
        name="educationLevel"
        value="HS diploma/GED"
        checked={formData.educationLevel === 'HS diploma/GED'}
        onChange={handleChange}
      />
    </label>
    <label>
      Some college/training
      <input
        type="radio"
        name="educationLevel"
        value="Some college/training"
        checked={formData.educationLevel === 'Some college/training'}
        onChange={handleChange}
      />
    </label>
    <label>
      Technical training/certification
      <input
        type="radio"
        name="educationLevel"
        value="Technical training/certification"
        checked={formData.educationLevel === 'Technical training/certification'}
        onChange={handleChange}
      />
    </label>
    <label>
      Associate's degree
      <input
        type="radio"
        name="educationLevel"
        value="Associate's degree"
        checked={formData.educationLevel === "Associate's degree"}
        onChange={handleChange}
      />
    </label>
    <label>
      Bachelor's degree or higher
      <input
        type="radio"
        name="educationLevel"
        value="Bachelor's degree or higher"
        checked={formData.educationLevel === "Bachelor's degree or higher"}
        onChange={handleChange}
      />
    </label>
  </div>
)}

{/* Current Enrollment in Education or Training */}
<div className="form-question">
  <h3>4. Are you currently enrolled in any type of school or training program?</h3>
  <label>
    Yes
    <input
      type="radio"
      name="currentlyEnrolled"
      value="Yes"
      checked={formData.currentlyEnrolled === 'Yes'}
      onChange={handleChange}
    />
  </label>
  <label>
    No
    <input
      type="radio"
      name="currentlyEnrolled"
      value="No"
      checked={formData.currentlyEnrolled === 'No'}
      onChange={handleChange}
    />
  </label>
</div>

<div className="form-question">
  <p>5. What is your employment status?</p>
  <label>
    Employed full-time
    <input
      type="radio"
      name="employmentStatus"
      value="Employed full-time"
      checked={formData.employmentStatus === 'Employed full-time'}
      onChange={handleChange}
    />
  </label>
  <label>
    Employed part-time
    <input
      type="radio"
      name="employmentStatus"
      value="Employed part-time"
      checked={formData.employmentStatus === 'Employed part-time'}
      onChange={handleChange}
    />
  </label>
  <label>
    Not employed currently
    <input
      type="radio"
      name="employmentStatus"
      value="Not employed currently"
      checked={formData.employmentStatus === 'Not employed currently'}
      onChange={handleChange}
    />
  </label>
</div>


{/* Question 6: Tobacco Use */}
<div className="form-question">
  <h3>6. Do you use tobacco?</h3>
  <label>
    Yes
    <input
      type="radio"
      name="tobaccoUse"
      value="Yes"
      checked={formData.tobaccoUse === 'Yes'}
      onChange={handleChange}
    />
  </label>
  <label>
    No
    <input
      type="radio"
      name="tobaccoUse"
      value="No"
      checked={formData.tobaccoUse === 'No'}
      onChange={handleChange}
    />
  </label>
</div>

{/* Question 7: Tobacco Cessation Services (conditional) */}
{formData.tobaccoUse === 'Yes' && (
  <div className="form-question">
    <h3>7. If Yes, are you currently receiving tobacco cessation services?</h3>
    <label>
      Yes
      <input
        type="radio"
        name="tobaccoCessation"
        value="Yes"
        checked={formData.tobaccoCessation === 'Yes'}
        onChange={handleChange}
      />
    </label>
    <label>
      No
      <input
        type="radio"
        name="tobaccoCessation"
        value="No"
        checked={formData.tobaccoCessation === 'No'}
        onChange={handleChange}
      />
    </label>
    {formData.tobaccoCessation === 'Yes' && (
      <input
        type="text"
        placeholder="Service Provider"
        name="tobaccoCessationProvider"
        value={formData.tobaccoCessationProvider}
        onChange={handleChange}
      />
    )}
  </div>
)}

{/* Question 8: Pregnancy Status (for female participants only) */}
<div className="form-question">
  <h3>8. Are you currently pregnant?</h3>
  <label>
    Yes
    <input
      type="radio"
      name="currentPregnancy"
      value="Yes"
      checked={formData.currentPregnancy === 'Yes'}
      onChange={handleChange}
    />
  </label>
  <label>
    No
    <input
      type="radio"
      name="currentPregnancy"
      value="No"
      checked={formData.currentPregnancy === 'No'}
      onChange={handleChange}
    />
  </label>
</div>

{/* Question 9: Future Pregnancy Plans (conditional) */}
{formData.currentPregnancy === 'No' && (
  <div className="form-question">
    <h3>9. If No, would you like to become pregnant in the next year?</h3>
    <label>
      Yes
      <input
        type="radio"
        name="futurePregnancyPlan"
        value="Yes"
        checked={formData.futurePregnancyPlan === 'Yes'}
        onChange={handleChange}
      />
    </label>
    <label>
      No
      <input
        type="radio"
        name="futurePregnancyPlan"
        value="No"
        checked={formData.futurePregnancyPlan === 'No'}
        onChange={handleChange}
      />
    </label>
  </div>
)}
{/* Question 10 */}
<div className="form-question">
          <h3>10. During the past 12 months, what was your yearly total household income before taxes?</h3>
          <input
            type="text"
            name="yearlyIncome"
            value={formData.yearlyIncome}
            onChange={handleChange}
          />
          <h3>If income cannot be determined indicate the primary reason</h3>
          <div>
            {incomeReasons.map((reason, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="incomeReason"
                  value={reason}
                  checked={formData.incomeReason === reason}
                  onChange={handleChange}
                />
                {reason}
              </label>
            ))}
            {formData.incomeReason === 'Other' && (
              <input
                type="text"
                name="otherIncomeReason"
                value={formData.otherIncomeReason}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        
        {/* Question 11 */}
        <div className="form-question">
          <h3>11. How many people depend on this income?</h3>
          <input
            type="number"
            name="incomeDependents"
            value={formData.incomeDependents}
            onChange={handleChange}
          />
        </div>
        
          {/* Question 12 */}
          <div className="form-question">
          <h3>12. Which of the following best describes the family's housing situation?</h3>
          <div className="housing-options">
            <div className="not-homeless-options">
              <p>Not Homeless</p>
              {housingOptions.notHomeless.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="housingSituation"
                    value={option}
                    checked={formData.housingSituation === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="homeless-options">
              <p>Homeless</p>
              {housingOptions.homeless.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="housingSituation"
                    value={option}
                    checked={formData.housingSituation === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>


        
        {/* Submit and Cancel buttons */}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );
};

export default SafetyProfileForm;
