import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ConsentFormStyles/Infancy.css';

function Infancy() {
  const [formData, setFormData] = useState({
    participantName: '',
    caseID: '',
    staffName: '',
    dateCompleted: '',
    childName: '',
    socialSecurityNumber: '',
    timeframe: '',
    sleepOnBack: null,
    sleepAlone: null,
    sleepWithoutSoftBedding: null,
    readingFrequency: null,
    
  });

  const [additionalQuestionsVisible, setAdditionalQuestionsVisible] = useState({
    "Birth – 1 month old": false,
    "2 – 3 months old": false,
    "6 – 7 months old": false,
    "10 – 11 months old": false,
  });

  const navigate = useNavigate();

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
    // Update the selected timeframe
    setFormData(prevFormData => ({
      ...prevFormData,
      timeframe: checked ? name : '',
    }));
  };

  const [isBiologicalMother, setIsBiologicalMother] = useState(false);

  const handleMotherChange = (e) => {
    setIsBiologicalMother(e.target.value === 'Yes');
    // Set additional questions to show or hide
  };

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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/dashboard');
  };
  return (
    <div className="infancy-questionnaire">
      <h1>Infancy Questionnaire</h1>
      <form onSubmit={handleSubmit} className="infancy-questionnaire-form">
  <h2>Infancy Questionnaire</h2>
  
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
      name="caseID"
      value={formData.caseID}
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
    Child Name:
    <input
      type="text"
      name="childName"
      value={formData.childName}
      onChange={handleChange}
    />
  </label>

  <div className="questions">
    <label>
      Do you always place your baby to sleep on his or her back?
      Yes
      <input
        type="radio"
        name="sleepOnBack"
        value="Yes"
        checked={formData.sleepOnBack === 'Yes'}
        onChange={handleChange}
      />
      No
      <input
        type="radio"
        name="sleepOnBack"
        value="No"
        checked={formData.sleepOnBack === 'No'}
        onChange={handleChange}
      />
    </label>
   
  </div>
  <div className="timeframe-question">
        <label>
          <input
            type="checkbox"
            name="Birth – 1 month old"
            onChange={handleCheckboxChange}
            checked={additionalQuestionsVisible["Birth – 1 month old"]}
          />
          Birth – 1 month old
        </label>
        <label>
          <input
            type="checkbox"
            name="2 – 3 months old"
            onChange={handleCheckboxChange}
            checked={additionalQuestionsVisible["2 – 3 months old"]}
          />
          2 – 3 months old
        </label>
       
      </div>

      <div className="general-questions">
        <label>
          Do you always place your baby to sleep on his or her back?
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
          /> No
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        Do you always place your baby to sleep alone without bed sharing?
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
          /> No
        </label>
        
      </div>
      <div className="general-questions">
        <label>
          Do you always place your baby to sleep without so bedding?
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
          /> No
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        In a typical week, how often do you or a family member read, tell stories, or sing songs to your child? 
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
          /> No
        </label>
        
      </div>

      <div className="biological-mother-question">
        <label>
          Is the Participant the biological mother of the child?
          <input
            type="radio"
            name="isBiologicalMother"
            value="Yes"
            onChange={handleMotherChange}
          /> Yes
          <input
            type="radio"
            name="isBiologicalMother"
            value="No"
            onChange={handleMotherChange}
          /> No
        </label>
      </div>

      {isBiologicalMother && (
        <div className="additional-questions-for-mother">
            <div className="general-questions">
        <label>
        Have you been to your medical provider for a postpartum check-up since the birth of your baby? 
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        7.  Has your baby ever had breast milk? 
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
          /> No
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        (If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
        </label>
        
      </div>
        </div>
      )}
      {isBiologicalMother && (
        <div className="additional-questions-for-mother">
            <div className="general-questions">
        <label>
        Have you been to your medical provider for a postpartum check-up since the birth of your baby? 
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        7.  Has your baby ever had breast milk? 
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
          /> No
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        (If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        When your baby turned 6 months old, was he/she getting any breast milk?
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
          <input
            type="radio"
            name="q1"
            value="No"
            checked={formData.sleep === 'No'}
            onChange={handleChange}
          /> No
        </label>
        
      </div>
      <div className="general-questions">
        <label>
        (If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):
          <input
            type="radio"
            name="q1"
            value="Yes"
            checked={formData.sleep === 'Yes'}
            onChange={handleChange}
          /> Yes
        </label>
        
      </div>
        </div>
      )}

      <button type="submit">Submit</button>

  
</form>
    </div>
  );
}

export default Infancy;