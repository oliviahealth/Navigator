import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IPVDisclosureForm = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log(formData);
    navigate('/dashboard'); 
  };

  const handleCancel = () => {
    navigate('/dashboard'); 
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      <h2>Intimate Partner Violence (IPV) Disclosure Screening Tool</h2>
        {/* Participant Info */}
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
          Date Completed:
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

        <div>
          <h3>Screening Tool Used:</h3>
          <label>
            Relationship Assessment Tool (PAT and HFA)
            <input 
              type="radio" 
              name="screeningToolUsed" 
              value="PAT_HFA" 
              checked={formData.screeningToolUsed === 'PAT_HFA'} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Clinical IPV Assessment/HITS (NFP)
            <input 
              type="radio" 
              name="screeningToolUsed" 
              value="HITS_NFP" 
              checked={formData.screeningToolUsed === 'HITS_NFP'} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Not Screened
            <input 
              type="radio" 
              name="screeningToolUsed" 
              value="Not_Screened" 
              checked={formData.screeningToolUsed === 'Not_Screened'} 
              onChange={handleChange} 
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
              onChange={handleChange} 
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
                onChange={handleCheckboxChange} 
              />
            </label>
            <label>
              IPV Disclosure Date:
              <input 
                type="date" 
                name="disclosureDate" 
                value={formData.disclosureDate} 
                onChange={handleChange} 
              />
            </label>
          </>
        )}
        

        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default IPVDisclosureForm;
