import React, { useState, useEffect } from 'react';
import '../../styles/PatientDemographics.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const PatientDemographicsReadOnly = () => {
    const { patientId, log_id } = useParams();

    const handleCancel = () => {
        window.history.back();
    };

    // Initial form state
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

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const accessToken = Cookies.get('accessToken');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/participant_info/${patientId}/${log_id}`, {
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
                setFormData(data[2]);

            } catch (error) {
                console.error('failed to fetch');
            }
        };

        fetchLog();
    }, [patientId, log_id]);


    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'race') {
                setFormData(prev => ({
                    ...prev,
                    race: checked ? [...prev.race, value] : prev.race.filter(r => r !== value)
                }));
            } else {

                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <form>
            <h2>Participant Demographics</h2>
            <label>Program Start Date*</label>
            <input type="date" name="programStartDate" value={formData.programStartDate} disabled />
            <label>Case ID*</label>
            <input type="text" name="caseId" value={formData.caseId} disabled />
            <label>Home Visitor Assigned*</label>
            <input type="text" name="homeVisitorAssigned" value={formData.homeVisitorAssigned} disabled />
            <label>Name*</label>
            <input type="text" name="name" value={formData.name} disabled />
            <label>Date of Birth*</label>
            <input type="date" name="dob" value={formData.dob} disabled />
            <label>Address</label>
            <input type="text" name="address" value={formData.address} disabled />
            <label>Zip Code</label>
            <input type="text" name="zipCode" value={formData.zipCode} disabled />
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} disabled />

            <fieldset>
                <legend>Gender*</legend>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        disabled
                    /> Female
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        disabled
                    /> Male
                </label>
            </fieldset>

            <fieldset>
                <legend>Ethnicity</legend>
                <label>
                    <input
                        type="radio"
                        name="ethnicity"
                        value="Hispanic or Latino/a"
                        checked={formData.ethnicity === 'Hispanic or Latino/a'}
                        disabled
                    /> Hispanic or Latino/a
                </label>
                <label>
                    <input
                        type="radio"
                        name="ethnicity"
                        value="Not Hispanic or Latino/a"
                        checked={formData.ethnicity === 'Not Hispanic or Latino/a'}
                        disabled
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
                        disabled
                    /> American Indian/Alaska Native
                </label>
                {/* Repeat for each race option */}
                <label>
                    <input
                        type="checkbox"
                        name="race"
                        value="Asian"
                        checked={formData.race.includes('Asian')}
                        disabled
                    /> Asian
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="race"
                        value="Black or African American"
                        checked={formData.race.includes('Black or African American')}
                        disabled
                    /> Black or African American
                </label>
            </fieldset>

            <fieldset>
                <legend>Primary Language (check one)</legend>
                <label>
                    <input
                        type="radio"
                        name="primaryLanguage"
                        value="English"
                        checked={formData.primaryLanguage === 'English'}
                        disabled
                    /> English
                </label>
                <label>
                    <input
                        type="radio"
                        name="primaryLanguage"
                        value="Spanish"
                        checked={formData.primaryLanguage === 'Spanish'}
                        disabled
                    /> Spanish
                </label>
                <label>
                    Other language:
                    <input
                        type="text"
                        name="otherLanguage"
                        value={formData.otherLanguage}
                        disabled
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
                        disabled
                    /> Pregnant
                </label>
                <label>
                    <input
                        type="radio"
                        name="pregnancyStatus"
                        value="Not Pregnant"
                        checked={formData.pregnancyStatus === 'Not Pregnant'}
                        disabled
                    /> Not Pregnant
                </label>
                <label>
                    <input
                        type="radio"
                        name="pregnancyStatus"
                        value="NA"
                        checked={formData.pregnancyStatus === 'NA'}
                        disabled
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
                        disabled
                    /> Married
                </label>
                <label>
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="Not married but living together"
                        checked={formData.maritalStatus === 'Not married but living together'}
                        disabled
                    /> Not married but living together
                </label>
                <label>
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="Never married and not living with partner"
                        checked={formData.maritalStatus === 'Never married and not living with partner'}
                        disabled
                    /> Never married and not living with partner
                </label>
                <label>
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="Separated or Divorced"
                        checked={formData.maritalStatus === 'Separated or Divorced'}
                        disabled
                    /> Separated or Divorced
                </label>
                <label>
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="Widowed"
                        checked={formData.maritalStatus === 'Widowed'}
                        disabled
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
                            disabled
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="childAbuse"
                            value="No"
                            checked={formData.childAbuse === 'No'}
                            disabled
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
                            disabled
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="substanceAbuse"
                            value="No"
                            checked={formData.substanceAbuse === 'No'}
                            disabled
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
                            disabled
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tobaccoUse"
                            value="No"
                            checked={formData.tobaccoUse === 'No'}
                            disabled
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
                            disabled
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="lowStudentAchievement"
                            value="No"
                            checked={formData.lowStudentAchievement === 'No'}
                            disabled
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
                            disabled
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="developmentalDelay"
                            value="No"
                            checked={formData.developmentalDelay === 'No'}
                            disabled
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
                            disabled
                        /> Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="armedForces"
                            value="No"
                            checked={formData.armedForces === 'No'}
                            disabled
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
                        disabled
                    /> Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="reEnrollment"
                        value="No"
                        checked={formData.reEnrollment === 'No'}
                        disabled
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
                        disabled
                    /> Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="transferFromAnotherSite"
                        value="No"
                        checked={formData.transferFromAnotherSite === 'No'}
                        disabled
                    /> No
                </label>
            </div>

            <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
        </form>
    );
};

export default PatientDemographicsReadOnly;