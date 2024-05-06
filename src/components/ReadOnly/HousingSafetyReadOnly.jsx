import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import '../styles/SafetyProfileForm.css';
import Cookies from 'js-cookie';

const SafetyProfileFormReadOnly = () => {
  const incomeReasons = ['Family refusal', 'In foster care', 'Other'];
  const navigate = useNavigate();
  const { patientId, log_id } = useParams();
  const [formData, setFormData] = useState({
    participantName: '',
    caseId: '',
    dateCompleted: '',
    staffName: '',
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
    timeFrame:'',
    insuranceType:'',
    insuranceTypeName:'',

  });


  function formatCurrency(value) {
  
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = (parseInt(numericValue, 10) / 100).toFixed(2);

    return isNaN(formattedValue) ? '' : `$${formattedValue}`;
}


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'text' && /<|>|;|'|"/.test(value)) {
      return;
    }

    if (type === 'number' && (isNaN(value) || parseInt(value, 10) < 0)) {
      return;
    }

    if (type === 'date' && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return;
    }
  
     if (name === "yearlyIncome") {
      const formattedValue = formatCurrency(value);
      setFormData(prevState => ({
          ...prevState,
          [name]: formattedValue
      }));
  }

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

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/housing_safety/${patientId}/${log_id}`, {
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

  return (
    <div className="housing-safety-form">
    
      <form>
      <h2>Household Housing Safety Profile</h2>

        <label>
          Participant Name:
          <input
            type="text"
            name="participantName"
            value={formData.participantName}
            disabled
          />
        </label>
        <label>
          Case ID:
          <input
            type="text"
            name="caseId"
            value={formData.caseId}
            disabled
          />
        </label>
        <label>
          Date Completed*:
          <input
            type="date"
            name="dateCompleted"
            value={formData.dateCompleted}
            disabled
          />
        </label>
        <label>
          Staff Name:
          <input
            type="text"
            name="staffName"
            value={formData.staffName}
            disabled
          />
        </label>


        <h2>Timeframe</h2>
        <label>
  Enrollment
  <input
    type="radio"
    name="timeFrame"
    value="Enrollment"
    checked={formData.timeFrame === 'Enrollment'}
    disabled
  />
</label>
<label>
  Update
  <input
    type="radio"
    name="timeFrame"
    value="Update"
    checked={formData.timeFrame === 'Update'}
    disabled
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
              disabled
            />
          </label>
          <label>
            Private insurance
            <input
              type="radio"
              name="insuranceType"
              value="Private insurance"
              checked={formData.insuranceType === 'Private insurance'}
              disabled
            />
          </label>
          <label>
            Tricare
            <input
              type="radio"
              name="insuranceType"
              value="Tricare"
              checked={formData.insuranceType === 'Tricare'}
              disabled
            />
          </label>
          <label>
            No insurance
            <input
              type="radio"
              name="insuranceType"
              value="No insurance"
              checked={formData.insuranceType === 'No insurance'}
              disabled
            />
          </label>
          <label>
            Other insurance:
            <input
              type="radio"
              name="insuranceType"
              value="insurance"
              checked={formData.insuranceType === 'insurance'}
              disabled
            />
          </label>
          {formData.insuranceType === 'insurance' && (
              <input
                type="text"
                placeholder="Other Insurance Name"
                name="otherInsuranceName"
                value={formData.insuranceTypeName}
                disabled
              />
            )}
        </div>


        <div className="form-question">
          <h3>2. Do you have a high school diploma or GED?</h3>
          <label>
            Yes
            <input
              type="radio"
              name="hasHighSchoolDiploma"
              value="Yes"
              checked={formData.hasHighSchoolDiploma === 'Yes'}
              disabled
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="hasHighSchoolDiploma"
              value="No"
              checked={formData.hasHighSchoolDiploma === 'No'}
              disabled
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
                disabled
              />
            </label>
            <label>
              Some college/training
              <input
                type="radio"
                name="educationLevel"
                value="Some college/training"
                checked={formData.educationLevel === 'Some college/training'}
                disabled
              />
            </label>
            <label>
              Technical training/certification
              <input
                type="radio"
                name="educationLevel"
                value="Technical training/certification"
                checked={formData.educationLevel === 'Technical training/certification'}
                disabled
              />
            </label>
            <label>
              Associate's degree
              <input
                type="radio"
                name="educationLevel"
                value="Associate's degree"
                checked={formData.educationLevel === "Associate's degree"}
                disabled
              />
            </label>
            <label>
              Bachelor's degree or higher
              <input
                type="radio"
                name="educationLevel"
                value="Bachelor's degree or higher"
                checked={formData.educationLevel === "Bachelor's degree or higher"}
                disabled
              />
            </label>
          </div>
        )}
        <div className="form-question">
          <h3>4. Are you currently enrolled in any type of school or training program?</h3>
          <label>
            Yes
            <input
              type="radio"
              name="currentlyEnrolled"
              value="Yes"
              checked={formData.currentlyEnrolled === 'Yes'}
              disabled
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="currentlyEnrolled"
              value="No"
              checked={formData.currentlyEnrolled === 'No'}
              disabled
            />
          </label>
        </div>

        <div className="form-question">
          <h3>5. What is your employment status?</h3>
          <label>
            Employed full-time
            <input
              type="radio"
              name="employmentStatus"
              value="Employed full-time"
              checked={formData.employmentStatus === 'Employed full-time'}
              disabled
            />
          </label>
          <label>
            Employed part-time
            <input
              type="radio"
              name="employmentStatus"
              value="Employed part-time"
              checked={formData.employmentStatus === 'Employed part-time'}
              disabled
            />
          </label>
          <label>
            Not employed currently
            <input
              type="radio"
              name="employmentStatus"
              value="Not employed currently"
              checked={formData.employmentStatus === 'Not employed currently'}
              disabled
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
              disabled
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="tobaccoUse"
              value="No"
              checked={formData.tobaccoUse === 'No'}
              disabled
            />
          </label>
        </div>

     
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
                disabled
              />
            </label>
            <label>
              No
              <input
                type="radio"
                name="tobaccoCessation"
                value="No"
                checked={formData.tobaccoCessation === 'No'}
                disabled
              />
            </label>
            {formData.tobaccoCessation === 'Yes' && (
              <input
                type="text"
                placeholder="Service Provider"
                name="tobaccoCessationProvider"
                value={formData.tobaccoCessationProvider}
                disabled
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
              disabled
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="currentPregnancy"
              value="No"
              checked={formData.currentPregnancy === 'No'}
              disabled
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
                disabled
              />
            </label>
            <label>
              No
              <input
                type="radio"
                name="futurePregnancyPlan"
                value="No"
                checked={formData.futurePregnancyPlan === 'No'}
                disabled
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
    disabled
    placeholder="$0.00"
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
          disabled
        />
        {reason}
      </label>
    ))}
    {formData.incomeReason === 'Other' && (
      <input
        type="text"
        name="otherIncomeReason"
        value={formData.otherIncomeReason}
        disabled
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
            disabled
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
                    disabled
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
                    disabled
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>


        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};

export default SafetyProfileFormReadOnly;