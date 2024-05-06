import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/Infancy.css';
import Cookies from 'js-cookie';

function InfancyReadOnly() {
  const { patientId, log_id } = useParams()
  const [formData, setFormData] = useState({
    participantName: '',
    caseID: '',
    staffName: '',
    dateCompleted: '',
    childName: '',
    socialSecurityNumber: '',
    timeframe: '',
    sleepOnBack: '',
    sleepAlone: '',
    sleepWithoutSoftBedding: '',
    readingFrequency: '',
    isBiologicalMother: '',
    postpartumCheckup: '',
    datePostpartumVisit: '',
    breastMilk: '',
    breastMilk2Months: '',
    breastMilk6Months: '',

  });

  const [additionalQuestionsVisible, setAdditionalQuestionsVisible] = useState({
    "Birth – 1 month old": false,
    "2 – 3 months old": false,
    "6 – 7 months old": false,
    "10 – 11 months old": false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/infancy_quest/${patientId}/${log_id}`, {
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setAdditionalQuestionsVisible({
        "Birth – 1 month old": false,
        "2 – 3 months old": false,
        "6 – 7 months old": false,
        "10 – 11 months old": false,
        [name]: true,
      });
    }
    setFormData(prevFormData => ({
      ...prevFormData,
      timeframe: checked ? name : '',
    }));
  };

  const [isBiologicalMother, setIsBiologicalMother] = useState(false);

  const handleMotherChange = (e) => {
    setIsBiologicalMother(e.target.value === 'Yes');

  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'text' && /<|>|&|"|'|\//.test(value)) {
      return;
    }

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
    <div className="infancy-questionnaire">
      <h1>Infancy Questionnaire</h1>
      <form className="infancy-questionnaire-form">
        <h2>Infancy Questionnaire</h2>

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

        <div className="timeframe-question">
          <p>Please select the timeframe for which you're providing information and fill in the corresponding details:</p>
          <label>
            <input
              type="checkbox"
              name="Birth – 1 month old"
              disabled
              checked={additionalQuestionsVisible["Birth – 1 month old"]}
            />
            Birth – 1 month old
          </label>
          <label>
            <input
              type="checkbox"
              name="2 – 3 months old"
              disabled
              checked={additionalQuestionsVisible["2 – 3 months old"]}
            />
            2 – 3 months old
          </label>
          <label>
            <input
              type="checkbox"
              name="6 – 7 months old"
              disabled
              checked={additionalQuestionsVisible["6 – 7 months old"]}
            />
            6 - 7 months old
          </label>
          <label>
            <input
              type="checkbox"
              name="10 – 11 months old"
              disabled
              checked={additionalQuestionsVisible["10 – 11 months old"]}
            />
            10 - 11 months old
          </label>

        </div>

        <div className="general-questions">
  <label style={{ marginRight: '30px' }}>
    Do you always place your baby to sleep on his or her back?
    <input  type="radio" name="sleepOnBack" value="Yes" checked={formData.sleepOnBack === 'Yes'} disabled />
    Yes
    <input type="radio" name="sleepOnBack" value="No" checked={formData.sleepOnBack === 'No'} disabled />
    No
  </label>
</div>
        <div className="general-questions">
          <label>
            Do you always place your baby to sleep alone without bed sharing?
            <input
              type="radio"
              name="sleepAlone"
              value="Yes"
              checked={formData.sleepAlone === 'Yes'}
              disabled
            /> Yes
            <input
              type="radio"
              name="sleepAlone"
              value="No"
              checked={formData.sleepAlone === 'No'}
              disabled
            /> No
          </label>

        </div>
        <div className="general-questions">
          <label style={{ marginRight: '30px' }}>
            Do you always place your baby to sleep without so bedding?
            <input
              type="radio"
              name="sleepWithoutSoftBedding"
              value="Yes"
              checked={formData.sleepWithoutSoftBedding === 'Yes'}
              disabled
            /> Yes
            <input
              type="radio"
              name="sleepWithoutSoftBedding"
              value="No"
              checked={formData.sleepWithoutSoftBedding === 'No'}
              disabled
            /> No
          </label>

        </div>
        <div className="general-questions">
          <label>
            In a typical week, how often do you or a family member read, tell stories, or sing songs to your child?
            <input
              type="radio"
              name="readingFrequency"
              value="Yes"
              checked={formData.readingFrequency === 'Yes'}
              disabled
            /> Yes
            <input
              type="radio"
              name="readingFrequency"
              value="No"
              checked={formData.readingFrequency === 'No'}
              disabled
            /> No
          </label>

        </div>

        <div className="general-questions">
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

        {isBiologicalMother && additionalQuestionsVisible["Birth – 1 month old"] && (
          <div className="additional-questions-for-mother">
            <div className="general-questions">
              <label>
                Have you been to your medical provider for a postpartum check-up since the birth of your baby?
                <input
                  type="radio"
                  name="postpartumCheckup"
                  value="Yes"
                  checked={formData.postpartumCheckup === 'Yes'}
                  disabled
                /> Yes
                <input
                  type="radio"
                  name="postpartumCheckup"
                  value="No"
                  checked={formData.postpartumCheckup === 'No'}
                  disabled
                /> No
              </label>

            </div>
            <div className="general-questions">
              <label>
                If yes, date of postpartum visit
                <input
                  type="date"
                  name="datePartum"
                  checked={formData.datePartum}
                  disabled
                />
              </label>

            </div>
            <div className="general-questions">
              <label>
                Has your baby ever had breast milk?
                <p>(If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):</p>
                <input
                  type="radio"
                  name="breastMilk"
                  value="Yes"
                  checked={formData.breastMilk === 'Yes'}
                  disabled
                /> Yes
                <input
                  type="radio"
                  name="breastMilk"
                  value="No"
                  checked={formData.breastMilk === 'No'}
                  disabled
                /> No
              </label>

            </div>
          </div>
        )}
        {isBiologicalMother && additionalQuestionsVisible["2 – 3 months old"] && (
          <div className="additional-questions-for-mother">
            <div className="general-questions">
              <label>
                Have you been to your medical provider for a postpartum check-up since the birth of your baby?
                <input
                  type="radio"
                  name="postpartumCheckup"
                  value="Yes"
                  checked={formData.postpartumCheckup === 'Yes'}
                  disabled
                /> Yes
                <input
                  type="radio"
                  name="postpartumCheckup"
                  value="No"
                  checked={formData.postpartumCheckup === 'No'}
                  disabled
                /> No
              </label>

            </div>
            <div className="general-questions">
              <label>
                If yes, date of postpartum visit
                <input
                  type="date"
                  name="datePartum"
                  checked={formData.datePostpartumVisit}
                  disabled
                />
              </label>

            </div>
            <div className="general-questions">
              <label>
                When your baby turned 2 months old, was he/she getting any breast milk?
                <p> (If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):</p>
                <input
                  type="radio"
                  name="breastMilk2Months"
                  value="Yes"
                  checked={formData.breastMilk2Months === 'Yes'}
                  disabled
                /> Yes
                <input
                  type="radio"
                  name="breastMilk2Months"
                  value="No"
                  checked={formData.breastMilk2Months === 'No'}
                  disabled
                /> No
              </label>

            </div>

          </div>
        )}
        {isBiologicalMother && additionalQuestionsVisible["6 – 7 months old"] && (
          <div className="additional-questions-for-mother">
            <div className="general-questions">
              <label>
                When your baby turned 6 months old, was he/she getting any breast milk?
                (If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):
                <input
                  type="radio"
                  name="breastMilk6Months"
                  value="Yes"
                  checked={formData.breastMilk6Months === 'Yes'}
                  disabled
                /> Yes
                <input
                  type="radio"
                  name="breastMilk6Months"
                  value="No"
                  checked={formData.breastMilk6Months === 'No'}
                  disabled
                /> No
              </label>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate(-1)}>
          Cancel
        </button>


      </form>
    </div>
  );
}

export default InfancyReadOnly;