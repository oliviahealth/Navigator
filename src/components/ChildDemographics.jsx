import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ChildDemographics() {
  const { patientId } = useParams();
  const [childData, setChildData] = useState({
    childName: '',
    dateOfBirth: '',
    sex: '',
    livingWith: {
      mother: false,
      father: false,
      grandparents: false,
      siblings: false,
      fosterFamily: false,
      other: ''
    },
    parents: [
      { name: '', involved: false },
      { name: '', involved: false }
    ],
    insurancePlan: '',
    insuranceEffectiveDate: '',
    subscriberId: '',
    groupId: '',
    medicalHistory: {
      primaryCareProvider: '',
      providerPhone: '',
      birthWeight: '',
      gestationalAgeAtBirth: '',
      nicuStay: false,
      nicuDuration: '',
      prenatalDrugExposure: false,
      drugDetails: '',
      medicalComplicationsAtBirth: '',
      ongoingMedicalIssues: '',
      ongoingMedications: '',
      healthConcerns: ''
    },
    relatedHistory: {
      serviceDifficulties: '',
      lactationConsultant: false,
      legalSystemInvolvement: false,
      cpsInvolvement: 'No',
      caseworker: '',
      caseworkerPhone: '',
      otherImportantInfo: ''
    }
  });

  const handleChangeLivingWith = (event) => {
    // Extract values from event target
    let { name, checked } = event.target;

    // Sanitize 'name' to allow only alphanumeric characters and underscores
    const sanitized_name = name.replace(/[^a-zA-Z0-9_]/g, '');

    checked = !!checked;

    // Update state with sanitized values
    setChildData(prevData => ({
        ...prevData,
        livingWith: {
            ...prevData.livingWith,
            [sanitized_name]: checked
        }
    }));
};

const handleChange = ({ target: { name, value, type, checked } }) => {
  // Sanitize 'name' to allow only alphanumeric characters, underscores, and dots for nested paths
  const sanitized_name = name.replace(/[^a-zA-Z0-9_.]/g, '');

  // For fields directly under childData
  if (sanitized_name in childData) {
      setChildData({ ...childData, [sanitized_name]: type === 'checkbox' ? checked : value });
      return;
  }

  // For nested fields
  const keys = sanitized_name.split('.');
  setChildData(prevData => {
      const newData = { ...prevData };
      let currentSection = newData;
      keys.forEach((key, index) => {
          // Further sanitize each key in the path to remove dots which are not needed in keys
          const sanitized_key = key.replace(/[\W]+/g, '');
          if (index === keys.length - 1) {
              currentSection[sanitized_key] = type === 'checkbox' ? checked : value;
          } else {
              if (!(sanitized_key in currentSection)) {
                  currentSection[sanitized_key] = {};
              }
              currentSection = currentSection[sanitized_key];
          }
      });
      return newData;
  });
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/child_demographics/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(childData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Child Demographics Record</h2>

      <label>
        Child's Name:
        <input type="text" name="childName" value={childData.childName} onChange={handleChange} />
      </label>

      <label>
        Date of Birth:
        <input type="date" name="dateOfBirth" value={childData.dateOfBirth} onChange={handleChange} />
      </label>

      <fieldset>
        <legend>Sex:</legend>
        <label><input type="radio" name="sex" value="Female" checked={childData.sex === 'Female'} onChange={handleChange} /> Female</label>
        <label><input type="radio" name="sex" value="Male" checked={childData.sex === 'Male'} onChange={handleChange} /> Male</label>
      </fieldset>

      <fieldset>
            <legend>Who is the child currently living with? Select all that apply:</legend>
            <label><input type="checkbox" name="mother" checked={childData.livingWith.mother} onChange={handleChangeLivingWith} /> Mother</label>
            <label><input type="checkbox" name="father" checked={childData.livingWith.father} onChange={handleChangeLivingWith} /> Father</label>
            <label><input type="checkbox" name="grandparents" checked={childData.livingWith.grandparents} onChange={handleChangeLivingWith} /> Grandparents</label>
            <label><input type="checkbox" name="siblings" checked={childData.livingWith.siblings} onChange={handleChangeLivingWith} /> Sibling(s)</label>
            <label><input type="checkbox" name="fosterFamily" checked={childData.livingWith.fosterFamily} onChange={handleChangeLivingWith} /> Foster Family</label>
            <label>
                Other:
                <input type="text" name="livingWith.other" value={childData.livingWith.other} onChange={handleChange} />
            </label>
        </fieldset>

        {/* Parent Involvement Section */}
        {childData.parents.map((parent, index) => (
          <div key={index}>
            <label>
              Parent Name:
              <input type="text" name={`parents.${index}.name`} value={parent.name} onChange={handleChange} />
            </label>
            <label>
              Involved in the child's life?
              <input type="checkbox" name={`parents.${index}.involved`} checked={parent.involved} onChange={handleChange} /> Yes
            </label>
          </div>
        ))}

        <label>
          Insurance Plan:
          <input type="text" name="insurancePlan" value={childData.insurancePlan} onChange={handleChange} />
        </label>
        <label>
          Effective Date:
          <input type="date" name="insuranceEffectiveDate" value={childData.insuranceEffectiveDate} onChange={handleChange} />
        </label>
        <label>
          Subscriber ID:
          <input type="text" name="subscriberId" value={childData.subscriberId} onChange={handleChange} />
        </label>
        <label>
          Group ID:
          <input type="text" name="groupId" value={childData.groupId} onChange={handleChange} />
        </label>

        <fieldset>
          <legend>MEDICAL HISTORY</legend>
          <label>
            Primary Care Provider:
            <input type="text" name="medicalHistory.primaryCareProvider" value={childData.medicalHistory.primaryCareProvider} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input type="tel" name="medicalHistory.providerPhone" value={childData.medicalHistory.providerPhone} onChange={handleChange} />
          </label>
          <label>
            Birth Weight:
            <input type="text" name="medicalHistory.birthWeight" value={childData.medicalHistory.birthWeight} onChange={handleChange} />
          </label>
          <label>
            Gestational Age at Birth:
            <input type="text" name="medicalHistory.gestationalAgeAtBirth" value={childData.medicalHistory.gestationalAgeAtBirth} onChange={handleChange} />
          </label>
          <label>
            NICU stay?
            <input type="checkbox" name="medicalHistory.nicuStay" checked={childData.medicalHistory.nicuStay} onChange={handleChange} /> No
            <input type="text" name="medicalHistory.nicuDuration" placeholder="# of days" value={childData.medicalHistory.nicuDuration} onChange={handleChange} disabled={!childData.medicalHistory.nicuStay} />
          </label>
          <label>
            Prenatal Drug Exposure:
            <input type="checkbox" name="medicalHistory.prenatalDrugExposure" checked={childData.medicalHistory.prenatalDrugExposure} onChange={handleChange} /> No
            <input type="text" name="medicalHistory.drugDetails" placeholder="What drug" value={childData.medicalHistory.drugDetails} onChange={handleChange} disabled={!childData.medicalHistory.prenatalDrugExposure} />
          </label>
          <label>
            Medical Complications at Birth:
            <input type="text" name="medicalHistory.medicalComplicationsAtBirth" value={childData.medicalHistory.medicalComplicationsAtBirth} onChange={handleChange} />
          </label>
          <label>
            Ongoing Medical Issues and Diagnoses:
            <input type="text" name="medicalHistory.ongoingMedicalIssues" value={childData.medicalHistory.ongoingMedicalIssues} onChange={handleChange} />
          </label>
          <label>
          Ongoing Medications:
            <input type="text" name="medicalHistory.ongoingMedications" value={childData.medicalHistory.ongoingMedications} onChange={handleChange} />
          </label>
          <label>
            Do you have any concerns about this child’s physical, mental, or behavioral health?
            <textarea name="medicalHistory.healthConcerns" value={childData.medicalHistory.healthConcerns} onChange={handleChange} />
          </label>
        </fieldset>

        <fieldset>
          <legend>RELATED HISTORY AND COMMUNITY LINKAGE</legend>
          <label>
            List any difficulties or services this child has received (difficulties breastfeeding, failure to thrive, etc.):
            <textarea name="relatedHistory.serviceDifficulties" value={childData.relatedHistory.serviceDifficulties} onChange={handleChange} />
          </label>
          <label>
            Does your child have a relationship with a lactation consultant or other provider?
            <input type="checkbox" name="relatedHistory.lactationConsultant" checked={childData.relatedHistory.lactationConsultant} onChange={handleChange} /> Yes
          </label>
          <label>
            Is your child involved with the court/legal system?
            <input type="checkbox" name="relatedHistory.legalSystemInvolvement" checked={childData.relatedHistory.legalSystemInvolvement} onChange={handleChange} /> Yes
          </label>
          <label>
            Has your child had any involvement with Child Protective Service (CPS)?
            <select name="relatedHistory.cpsInvolvement" value={childData.relatedHistory.cpsInvolvement} onChange={handleChange}>
              <option value="No">No, Never</option>
              <option value="Yes, Currently Involved">Yes, Currently Involved with CPS</option>
              <option value="Yes, Previously Involved">Yes, Previously Involved with CPS</option>
            </select>
          </label>
          <label>
            Caseworker:
            <input type="text" name="relatedHistory.caseworker" value={childData.relatedHistory.caseworker} onChange={handleChange} />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="relatedHistory.caseworkerPhone" value={childData.relatedHistory.caseworkerPhone} onChange={handleChange} />
          </label>
          <label>
            Other important information about this child:
            <textarea name="relatedHistory.otherImportantInfo" value={childData.relatedHistory.otherImportantInfo} onChange={handleChange} />
          </label>
        </fieldset>

        <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
        <button type="submit">Submit</button>
    </form>
  );
}

export default ChildDemographics;


