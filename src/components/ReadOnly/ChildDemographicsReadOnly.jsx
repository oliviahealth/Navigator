import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ChildDemographicsReadOnly() {
  const { patientId, log_id } = useParams();
  const handleCancel = () => {
    window.history.back();
  };
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
    const { name, checked } = event.target;
    setChildData(prevData => ({
      ...prevData,
      livingWith: {
        ...prevData.livingWith,
        [name]: checked
      }
    }));
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/child_demographics/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                return; 
            }
            const data = await response.json();
            setChildData(data[2]);
            
        } catch (error) {
            console.error('Error fetching participant info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);


  const handleChange = ({ target: { name, value, type, checked } }) => {
    // For fields directly under childData
    if (name in childData) {
      setChildData({ ...childData, [name]: type === 'checkbox' ? checked : value });
      return;
    }

    // For nested fields
    const keys = name.split('.');
    setChildData(prevData => {
      const newData = { ...prevData };
      let currentSection = newData;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentSection[key] = type === 'checkbox' ? checked : value;
        } else {
          if (!(key in currentSection)) {
            currentSection[key] = {};
          }
          currentSection = currentSection[key];
        }
      });
      return newData;
    });
  };


  return (
    <form>
      <h2>Child Demographics Record</h2>

      <label>
        Child's Name:
        <input type="text" name="childName" value={childData.childName} disabled />
      </label>

      <label>
        Date of Birth:
        <input type="date" name="dateOfBirth" value={childData.dateOfBirth} disabled />
      </label>

      <fieldset>
        <legend>Sex:</legend>
        <label><input type="radio" name="sex" value="Female" checked={childData.sex === 'Female'} disabled /> Female</label>
        <label><input type="radio" name="sex" value="Male" checked={childData.sex === 'Male'} disabled /> Male</label>
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
                <input type="text" name="livingWith.other" value={childData.livingWith.other} disabled />
            </label>
        </fieldset>

        {/* Parent Involvement Section */}
        {childData.parents.map((parent, index) => (
          <div key={index}>
            <label>
              Parent Name:
              <input type="text" name={`parents.${index}.name`} value={parent.name} disabled />
            </label>
            <label>
              Involved in the child's life?
              <input type="checkbox" name={`parents.${index}.involved`} checked={parent.involved} disabled /> Yes
            </label>
          </div>
        ))}

        <label>
          Insurance Plan:
          <input type="text" name="insurancePlan" value={childData.insurancePlan} disabled />
        </label>
        <label>
          Effective Date:
          <input type="date" name="insuranceEffectiveDate" value={childData.insuranceEffectiveDate} disabled />
        </label>
        <label>
          Subscriber ID:
          <input type="text" name="subscriberId" value={childData.subscriberId} disabled />
        </label>
        <label>
          Group ID:
          <input type="text" name="groupId" value={childData.groupId} disabled />
        </label>

        <fieldset>
          <legend>MEDICAL HISTORY</legend>
          <label>
            Primary Care Provider:
            <input type="text" name="medicalHistory.primaryCareProvider" value={childData.medicalHistory.primaryCareProvider} disabled />
          </label>
          <label>
            Phone:
            <input type="tel" name="medicalHistory.providerPhone" value={childData.medicalHistory.providerPhone} disabled />
          </label>
          <label>
            Birth Weight:
            <input type="text" name="medicalHistory.birthWeight" value={childData.medicalHistory.birthWeight} disabled />
          </label>
          <label>
            Gestational Age at Birth:
            <input type="text" name="medicalHistory.gestationalAgeAtBirth" value={childData.medicalHistory.gestationalAgeAtBirth} disabled />
          </label>
          <label>
            NICU stay?
            <input type="checkbox" name="medicalHistory.nicuStay" checked={childData.medicalHistory.nicuStay} disabled /> No
            <input type="text" name="medicalHistory.nicuDuration" placeholder="# of days" value={childData.medicalHistory.nicuDuration} disabled />
          </label>
          <label>
            Prenatal Drug Exposure:
            <input type="checkbox" name="medicalHistory.prenatalDrugExposure" checked={childData.medicalHistory.prenatalDrugExposure} disabled /> No
            <input type="text" name="medicalHistory.drugDetails" placeholder="What drug" value={childData.medicalHistory.drugDetails} disabled />
          </label>
          <label>
            Medical Complications at Birth:
            <input type="text" name="medicalHistory.medicalComplicationsAtBirth" value={childData.medicalHistory.medicalComplicationsAtBirth} disabled />
          </label>
          <label>
            Ongoing Medical Issues and Diagnoses:
            <input type="text" name="medicalHistory.ongoingMedicalIssues" value={childData.medicalHistory.ongoingMedicalIssues} disabled />
          </label>
          <label>
          Ongoing Medications:
            <input type="text" name="medicalHistory.ongoingMedications" value={childData.medicalHistory.ongoingMedications} disabled />
          </label>
          <label>
            Do you have any concerns about this child’s physical, mental, or behavioral health?
            <textarea name="medicalHistory.healthConcerns" value={childData.medicalHistory.healthConcerns} disabled />
          </label>
        </fieldset>

        <fieldset>
          <legend>RELATED HISTORY AND COMMUNITY LINKAGE</legend>
          <label>
            List any difficulties or services this child has received (difficulties breastfeeding, failure to thrive, etc.):
            <textarea name="relatedHistory.serviceDifficulties" value={childData.relatedHistory.serviceDifficulties} disabled />
          </label>
          <label>
            Does your child have a relationship with a lactation consultant or other provider?
            <input type="checkbox" name="relatedHistory.lactationConsultant" checked={childData.relatedHistory.lactationConsultant} disabled /> Yes
          </label>
          <label>
            Is your child involved with the court/legal system?
            <input type="checkbox" name="relatedHistory.legalSystemInvolvement" checked={childData.relatedHistory.legalSystemInvolvement} disabled /> Yes
          </label>
          <label>
            Has your child had any involvement with Child Protective Service (CPS)?
            <select name="relatedHistory.cpsInvolvement" value={childData.relatedHistory.cpsInvolvement} disabled>
              <option value="No">No, Never</option>
              <option value="Yes, Currently Involved">Yes, Currently Involved with CPS</option>
              <option value="Yes, Previously Involved">Yes, Previously Involved with CPS</option>
            </select>
          </label>
          <label>
            Caseworker:
            <input type="text" name="relatedHistory.caseworker" value={childData.relatedHistory.caseworker} disabled />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="relatedHistory.caseworkerPhone" value={childData.relatedHistory.caseworkerPhone} disabled />
          </label>
          <label>
            Other important information about this child:
            <textarea name="relatedHistory.otherImportantInfo" value={childData.relatedHistory.otherImportantInfo} disabled />
          </label>
        </fieldset>
        <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</button>
    </form>
  );
}

export default ChildDemographicsReadOnly;


