import React, { useState } from 'react';
import '../styles/PatientDemographics.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PatientDemographics = () => {
    const { patientId } = useParams();
  const [formData, setFormData] = useState({
    programStartDate: '',
    caseId: '',
    homeVisitorAssigned: '',
    name: '',
    dob: '',
    address: '',
    zipCode: '',
    phone: '',
    gender: '',
    ethnicity: '',
    race: [],
    primaryLanguage: '',
    otherLanguage: '',
    pregnancyStatus: '',
    maritalStatus: '',
    childAbuse: false,
    substanceAbuse: false,
    tobaccoUse: false,
    lowStudentAchievement: false,
    developmentalDelay: false,
    armedForces: false,
    reEnrollment: false,
    transferFromAnotherSite: false
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/participant_info/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('failed to submit');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const sanitized_name = name.replace(/[^a-zA-Z0-9_]/g, '');

    if (type === 'checkbox') {
        if (sanitized_name === 'race') {
            setFormData(prev => ({
                ...prev,
                race: checked ? [...prev.race, value] : prev.race.filter(r => r !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [sanitized_name]: checked
            }));
        }
    } else {
        setFormData(prev => ({
            ...prev,
            [sanitized_name]: value
        }));
    }
};


  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Participant Demographics</h2>
      <label>Program Start Date*</label>
      <input type="date" name="programStartDate" value={formData.programStartDate} onChange={handleChange} required />
      <label>Case ID*</label>
      <input type="text" name="caseId" value={formData.caseId} onChange={handleChange} required />
      <label>Home Visitor Assigned*</label>
      <input type="text" name="homeVisitorAssigned" value={formData.homeVisitorAssigned} onChange={handleChange} required />
      <label>Name*</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      <label>Date of Birth*</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      <label>Address</label>
      <input type="text" name="address" value={formData.address} onChange={handleChange} />
      <label>Zip Code</label>
      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
      <label>Phone</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />

        <fieldset>
        <legend>Gender*</legend>
        <label>
            <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
            /> Female
        </label>
        <label>
            <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
            /> Male
        </label>
        </fieldset>

        {/* Ethnicity Selection */}
        <fieldset>
        <legend>Ethnicity</legend>
        <label>
            <input
            type="radio"
            name="ethnicity"
            value="Hispanic or Latino/a"
            checked={formData.ethnicity === 'Hispanic or Latino/a'}
            onChange={handleChange}
            /> Hispanic or Latino/a
        </label>
        <label>
            <input
            type="radio"
            name="ethnicity"
            value="Not Hispanic or Latino/a"
            checked={formData.ethnicity === 'Not Hispanic or Latino/a'}
            onChange={handleChange}
            /> Not Hispanic or Latino/a
        </label>
        </fieldset>

        {/* Race Selection - Checkboxes for multiple selections */}
        <fieldset>
        <legend>Race (check all that apply)</legend>
        <label>
            <input
            type="checkbox"
            name="race"
            value="American Indian/Alaska Native"
            checked={formData.race.includes('American Indian/Alaska Native')}
            onChange={handleChange}
            /> American Indian/Alaska Native
        </label>
        {/* Repeat for each race option */}
        <label>
            <input
            type="checkbox"
            name="race"
            value="Asian"
            checked={formData.race.includes('Asian')}
            onChange={handleChange}
            /> Asian
        </label>
        <label>
            <input
            type="checkbox"
            name="race"
            value="Black or African American"
            checked={formData.race.includes('Black or African American')}
            onChange={handleChange}
            /> Black or African American
        </label>
        <label>
            <input
            type="checkbox"
            name="race"
            value="Native Hawaiian or Pacific Islander"
            checked={formData.race.includes('Native Hawaiian or Pacific Islander')}
            onChange={handleChange}
            /> Native Hawaiian or Pacific Islander
        </label>
        <label>
            <input
            type="checkbox"
            name="race"
            value="White"
            checked={formData.race.includes('White')}
            onChange={handleChange}
            /> White
        </label>
        <label>
            <input
            type="checkbox"
            name="race"
            value="More than one race – not specified"
            checked={formData.race.includes('More than one race – not specified')}
            onChange={handleChange}
            /> More than one race – not specified
        </label>
        <label>
            <input
            type="checkbox"
            name="race"
            value="Declined to identify"
            checked={formData.race.includes('Declined to identify')}
            onChange={handleChange}
            /> Declined to identify
        </label>
        </fieldset>

        {/* Primary Language Selection */}
        <fieldset>
        <legend>Primary Language (check one)</legend>
        <label>
            <input
            type="radio"
            name="primaryLanguage"
            value="English"
            checked={formData.primaryLanguage === 'English'}
            onChange={handleChange}
            /> English
        </label>
        <label>
            <input
            type="radio"
            name="primaryLanguage"
            value="Spanish"
            checked={formData.primaryLanguage === 'Spanish'}
            onChange={handleChange}
            /> Spanish
        </label>
        <label>
            Other language:
            <input
            type="text"
            name="otherLanguage"
            value={formData.otherLanguage}
            onChange={handleChange}
            />
        </label>
        </fieldset>

        {/* Pregnancy Status Selection */}
        <fieldset>
        <legend>Pregnancy Status at Enrollment*</legend>
        <label>
            <input
            type="radio"
            name="pregnancyStatus"
            value="Pregnant"
            checked={formData.pregnancyStatus === 'Pregnant'}
            onChange={handleChange}
            /> Pregnant
        </label>
        <label>
            <input
            type="radio"
            name="pregnancyStatus"
            value="Not Pregnant"
            checked={formData.pregnancyStatus === 'Not Pregnant'}
            onChange={handleChange}
            /> Not Pregnant
        </label>
        <label>
            <input
            type="radio"
            name="pregnancyStatus"
            value="NA"
            checked={formData.pregnancyStatus === 'NA'}
            onChange={handleChange}
            /> NA (male Participant)
        </label>
        </fieldset>

        <fieldset>
        <legend>Marital Status</legend>
        <label>
            <input
            type="radio"
            name="maritalStatus"
            value="Married"
            checked={formData.maritalStatus === 'Married'}
            onChange={handleChange}
            /> Married
        </label>
        <label>
            <input
            type="radio"
            name="maritalStatus"
            value="Not married but living together"
            checked={formData.maritalStatus === 'Not married but living together'}
            onChange={handleChange}
            /> Not married but living together
        </label>
        <label>
            <input
            type="radio"
            name="maritalStatus"
            value="Never married and not living with partner"
            checked={formData.maritalStatus === 'Never married and not living with partner'}
            onChange={handleChange}
            /> Never married and not living with partner
        </label>
        <label>
            <input
            type="radio"
            name="maritalStatus"
            value="Separated or Divorced"
            checked={formData.maritalStatus === 'Separated or Divorced'}
            onChange={handleChange}
            /> Separated or Divorced
        </label>
        <label>
            <input
            type="radio"
            name="maritalStatus"
            value="Widowed"
            checked={formData.maritalStatus === 'Widowed'}
            onChange={handleChange}
            /> Widowed
        </label>
        </fieldset>

        {/* Priority Population Characteristics Section */}
        <fieldset>
        <legend>Priority Population Characteristics</legend>
        
        {/* Child Abuse/Child Welfare System */}
        <div>
            <label>Does Participant have a history of child abuse or neglect? Has Participant been involved with child welfare system?</label>
            <label>
            <input
                type="radio"
                name="childAbuse"
                value="Yes"
                checked={formData.childAbuse === 'Yes'}
                onChange={handleChange}
            /> Yes
            </label>
            <label>
            <input
                type="radio"
                name="childAbuse"
                value="No"
                checked={formData.childAbuse === 'No'}
                onChange={handleChange}
            /> No
            </label>
        </div>
        
        {/* Substance Abuse */}
        <div>
            <label>Does Participant have current or previous substance abuse problems?</label>
            <label>
            <input
                type="radio"
                name="substanceAbuse"
                value="Yes"
                checked={formData.substanceAbuse === 'Yes'}
                onChange={handleChange}
            /> Yes
            </label>
            <label>
            <input
                type="radio"
                name="substanceAbuse"
                value="No"
                checked={formData.substanceAbuse === 'No'}
                onChange={handleChange}
            /> No
            </label>
        </div>
        
        {/* Tobacco Use in the Home */}
        <div>
            <label>Are tobacco products used in the home?</label>
            <label>
            <input
                type="radio"
                name="tobaccoUse"
                value="Yes"
                checked={formData.tobaccoUse === 'Yes'}
                onChange={handleChange}
            /> Yes
            </label>
            <label>
            <input
                type="radio"
                name="tobaccoUse"
                value="No"
                checked={formData.tobaccoUse === 'No'}
                onChange={handleChange}
            /> No
            </label>
        </div>
        
        {/* Low Student Achievement */}
        <div>
            <label>Are you satisfied/dissatisfied with your level of achievement in school? Are you satisfied/dissatisfied with your child’s level of achievement in school?</label>
            <label>
            <input
                type="radio"
                name="lowStudentAchievement"
                value="Yes"
                checked={formData.lowStudentAchievement === 'Yes'}
                onChange={handleChange}
            /> Yes
            </label>
            <label>
            <input
                type="radio"
                name="lowStudentAchievement"
                value="No"
                checked={formData.lowStudentAchievement === 'No'}
                onChange={handleChange}
            /> No
            </label>
        </div>
        
        {/* Developmental Delay or Disability */}
        <div>
            <label>Does Participant have a child with a developmental delay or disability?</label>
            <label>
            <input
                type="radio"
                name="developmentalDelay"
                value="Yes"
                checked={formData.developmentalDelay === 'Yes'}
                onChange={handleChange}
            /> Yes
            </label>
            <label>
            <input
                type="radio"
                name="developmentalDelay"
                value="No"
                checked={formData.developmentalDelay === 'No'}
                onChange={handleChange}
            /> No
            </label>
        </div>
        
        <div>
            <label>Is Participant an active/former member of the U.S. military? Is Participant or child a dependent of an active/former member of the U.S. military?</label>
            <label>
            <input
                type="radio"
                name="armedForces"
                value="Yes"
                checked={formData.armedForces === 'Yes'}
                onChange={handleChange}
            /> Yes
            </label>
            <label>
            <input
                type="radio"
                name="armedForces"
                value="No"
                checked={formData.armedForces === 'No'}
                onChange={handleChange}
            /> No
            </label>
        </div>
        </fieldset>

        {/* Re-enrollment with Gap in Service */}
        <div>
        <label>Re-enrollment with gap in service:</label>
        <label>
            <input
            type="radio"
            name="reEnrollment"
            value="Yes"
            checked={formData.reEnrollment === 'Yes'}
            onChange={handleChange}
            /> Yes
        </label>
        <label>
            <input
            type="radio"
            name="reEnrollment"
            value="No"
            checked={formData.reEnrollment === 'No'}
            onChange={handleChange}
            /> No
        </label>
        </div>

        {/* Transfer from Another Site */}
        <div>
        <label>(NFP Only) Transfer from another site:</label>
        <label>
            <input
            type="radio"
            name="transferFromAnotherSite"
            value="Yes"
            checked={formData.transferFromAnotherSite === 'Yes'}
            onChange={handleChange}
            /> Yes
        </label>
        <label>
            <input
            type="radio"
            name="transferFromAnotherSite"
            value="No"
            checked={formData.transferFromAnotherSite === 'No'}
            onChange={handleChange}
            /> No
        </label>
        </div>
        <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
        <button type="button" onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white' }}>Submit</button>

    </form>
  );
};

export default PatientDemographics;