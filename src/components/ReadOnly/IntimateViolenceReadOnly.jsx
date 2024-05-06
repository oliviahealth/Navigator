import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const IPVDisclosureFormReadOnly = () => {
  const { patientId, log_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    participantName: '',
    caseId: '',
    dateCompleted: '',
    staffName: '',
    screeningDate: '',
    screeningToolUsed: '',
    totalScore: '',
    notScreenedButDisclosed: false,
    disclosureDate: '',
    notes: '',
    referralNeeded: false
  });

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/intimate_violence/${patientId}/${log_id}`, {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      referralNeeded: shouldReferralBeMade(value)
    }));
  };



  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };
  const showTotalScoreInput = ['PAT_HFA', 'HITS_NFP'].includes(formData.screeningToolUsed);

  const shouldReferralBeMade = (value) => {
    const RAT_THRESHOLD = 20;
    const HITS_THRESHOLD = 9;

    if (formData.screeningToolUsed === 'PAT_HFA' && value >= RAT_THRESHOLD) {
      return true;
    } else if (formData.screeningToolUsed === 'HITS_NFP' && value >= HITS_THRESHOLD) {
      return true;
    }

    return false;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>

      <form>
        <h2>Intimate Partner Violence (IPV) Disclosure Screening Tool</h2>
        {/* Participant Info */}
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
          Date Completed:
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

        <div>
          <h3>Screening Tool Used:</h3>
          <label>
            Relationship Assessment Tool (PAT and HFA)
            <input
              type="radio"
              name="screeningToolUsed"
              value="PAT_HFA"
              checked={formData.screeningToolUsed === 'PAT_HFA'}
              disabled
            />
          </label>
          <label>
            Clinical IPV Assessment/HITS (NFP)
            <input
              type="radio"
              name="screeningToolUsed"
              value="HITS_NFP"
              checked={formData.screeningToolUsed === 'HITS_NFP'}
              disabled
            />
          </label>
          <label>
            Not Screened
            <input
              type="radio"
              name="screeningToolUsed"
              value="Not_Screened"
              checked={formData.screeningToolUsed === 'Not_Screened'}
              disabled
            />
          </label>
        </div>
        {showTotalScoreInput && (
          <label>
            Total Score from Screening Tool:
            <input
              type="number"
              name="totalScore"
              value={formData.totalScore}
              disabled
            />
          </label>
        )}
        {formData.screeningToolUsed === 'Not_Screened' && (
          <>
            <label>
              Participant was not screened but disclosed current IPV:
              <input
                type="checkbox"
                name="notScreenedButDisclosed"
                checked={formData.notScreenedButDisclosed}
                disabled
              />
            </label>
            <label>
              IPV Disclosure Date:
              <input
                type="date"
                name="disclosureDate"
                value={formData.disclosureDate}
                disabled
              />
            </label>
          </>
        )}
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default IPVDisclosureFormReadOnly;