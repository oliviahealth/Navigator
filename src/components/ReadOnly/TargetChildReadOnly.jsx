import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/TargetChild.css';
import Cookies from 'js-cookie';

function TargetChildReadOnly() {
  const { patientId, log_id } = useParams()
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

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/target_child/${patientId}/${log_id}`, {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (type === 'radio') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="target-child-questionnaire">
      <h1>Target Child Questionnaire</h1>
      <form className="target-child-questionnaire-form">
        <h2>Target Child Questionnaire</h2>

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
            name="caseID"
            value={formData.caseID}
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

        <label>
          Date Completed:
          <input
            type="date"
            name="dateCompleted"
            value={formData.dateCompleted}
            disabled
          />
        </label>

        <label>
          Child Name:
          <input
            type="text"
            name="childName"
            value={formData.childName}
            disabled
          />
        </label>
        <label>
          Child Enrollment Date:
          <input
            type="date"
            name="childDate"
            value={formData.childDate}
            disabled
          />
        </label>
        <label>
          Child SSN:
          <input
            type="text"
            name="ssn"
            value={formData.ssn}
            disabled
          />
        </label>
        <label>
          Child DOB:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            disabled
          />
        </label>
        <label>
          Gestation Age at Birth( # weeks):
          <input
            type="text"
            name="gestation"
            value={formData.gestation}
            disabled
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
              disabled
            /> Male
            <input
              type="radio"
              name="q1"
              value="Female"
              checked={formData.sleep === 'Female'}
              disabled
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
              disabled
            /> Hispanic or Latino/a
            <input
              type="radio"
              name="q1"
              value="nonHispanic"
              checked={formData.sleep === 'nonHispanic'}
              disabled
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
              disabled
            /> American Indian/Alaska Native
            <input
              type="checkbox"
              name="q1"
              value="Asian"
              checked={formData.sleep === 'Asian'}
              disabled
            /> Asian
            <input
              type="checkbox"
              name="q1"
              value="Black"
              checked={formData.sleep === 'Black'}
              disabled
            /> Black or African American
            <input
              type="checkbox"
              name="q1"
              value="NativePacificIslander"
              checked={formData.sleep === 'NativePacificIslander'}
              disabled
            /> Native Hawaiian or Pacific Islander
            <input
              type="checkbox"
              name="q1"
              value="White"
              checked={formData.sleep === 'White'}
              disabled
            /> White
            <input
              type="checkbox"
              name="q1"
              value="MoreThanOne"
              checked={formData.sleep === 'MoreThanOne'}
              disabled
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
              disabled
            /> Yes
            <input
              type="radio"
              name="isBiologicalMother"
              value="No"
              disabled
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
                  disabled
                />
              </label>

              <label>
                2-4 weeks old
                <input
                  type="checkbox"
                  name="wellChildVisit2_4Weeks"
                  checked={formData.wellChildVisit2_4Weeks || false}
                  disabled
                />
              </label>

              <label>
                2-3 months old
                <input
                  type="checkbox"
                  name="wellChildVisit2_3Months"
                  checked={formData.wellChildVisit2_3Months || false}
                  disabled
                />
              </label>

              <label>
                4-5 months old
                <input
                  type="checkbox"
                  name="wellChildVisit4_5Months"
                  checked={formData.wellChildVisit4_5Months || false}
                  disabled
                />
              </label>

              <label>
                6-7 months old
                <input
                  type="checkbox"
                  name="wellChildVisit6_7Months"
                  checked={formData.wellChildVisit6_7Months || false}
                  disabled
                />
              </label>

              <label>
                9-10 months old
                <input
                  type="checkbox"
                  name="wellChildVisit9_10Months"
                  checked={formData.wellChildVisit9_10Months || false}
                  disabled
                />
              </label>
              <label>
                12-13 months old
                <input
                  type="checkbox"
                  name="wellChildVisit12_13Months"
                  checked={formData.wellChildVisit12_13Months || false}
                  disabled
                />
              </label>
              <label>
                15-16 months old
                <input
                  type="checkbox"
                  name="wellChildVisit15_16Months"
                  checked={formData.wellChildVisit15_16Months || false}
                  disabled
                />
              </label>
              <label>
                18-19 months old
                <input
                  type="checkbox"
                  name="wellChildVisit18_19Months"
                  checked={formData.wellChildVisit18_19Months || false}
                  disabled
                />
              </label>
              <label>
                2-2.5 years old
                <input
                  type="checkbox"
                  name="wellChildVisit2_2_5Years"
                  checked={formData.wellChildVisit2_2_5Years || false}
                  disabled
                />
              </label>
              <label>
                3-3.5 years old
                <input
                  type="checkbox"
                  name="wellChildVisit3_3_5Years"
                  checked={formData.wellChildVisit3_3_5Years || false}
                  disabled
                />
              </label>
              <label>
                4-4.5 years old
                <input
                  type="checkbox"
                  name="wellChildVisit4_4_5Years"
                  checked={formData.wellChildVisit4_4_5Years || false}
                  disabled
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
              disabled
            />
          </label>
          <label>
            Private health insurance
            <input
              type="radio"
              name="childInsurance"
              value="Private health insurance"
              checked={formData.childInsurance === 'Private health insurance'}
              disabled
            />
          </label>
          <label>
            Tri-Care
            <input
              type="radio"
              name="childInsurance"
              value="Tri-Care"
              checked={formData.childInsurance === 'Tri-Care'}
              disabled
            />
          </label>
          <label>
            No health insurance
            <input
              type="radio"
              name="childInsurance"
              value="No health insurance"
              checked={formData.childInsurance === 'No health insurance'}
              disabled
            />
          </label>
          <label>
            Other health insurance
            <input
              type="radio"
              name="childInsurance"
              value="Other health insurance"
              checked={formData.childInsurance === 'Other health insurance'}
              disabled
            />
            {/* An additional text input can be provided if "Other health insurance" is selected */}
            {formData.childInsurance === 'Other health insurance' && (
              <input
                type="text"
                name="childInsuranceOther"
                value={formData.childInsuranceOther || ''}
                disabled
              />
            )}
          </label>
        </div>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
}

export default TargetChildReadOnly;