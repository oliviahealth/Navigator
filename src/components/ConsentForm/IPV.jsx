import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const IPVScreeningAndAssessmentForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState({
    partnerTreatment: '',
    feelSafeAtHome: '',
    everHitOrThreatened: '',
    makeYouFeelAfraid: '',
    forcedToHaveSex: '',
    pastPartnerViolence: '',
    pastPartnerTreatment: '',
    pastForcedSex: '',

    perpetratorWithClient: '',
    threatsOfHomicide: '',
    weaponsInvolved: '',
    historyOfStrangulation: '',
    suicidalityAndHomicidality: '',
    assessSafetyOfChildren: '',
    assessPatternsOfAbuse: '',
    assessHistoryEffects: '',
    assessInjuries: '',
    assessHealthEffects: '',
    assessSupportStrategies: '',
    assessReadinessForChange: ''
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === 'radio' && !['yes', 'no'].includes(value)) {
      return;
    }
    if (type === 'text' && /<|>/.test(value)) {
      return;
    }
    setResponses(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/ipv/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      navigate(-1);
    } catch (error) {
      console.error('failed to submit');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard'); 
  };


  const directQuestions = {
    everHitOrThreatened: "Has your partner ever hit you, hurt you, or threatened you?",
    makeYouFeelAfraid: "Does your partner make you feel afraid?",
    forcedToHaveSex: "Has your partner ever forced you to have sex when you didn’t want to?",
    pastPartnerViolence: "Have you ever had a partner who hit you, hurt you, or threatened you? ",
    pastPartnerTreatment: "Have you ever had a partner who treated you badly?",
    pastForcedSex: "Have you ever had a partner who forced you to have sex when you didn‘t want to?"
   
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      <h2>IPV Screening and Assessment Questions</h2>
        {/* Indirect Questions */}
        <div className="question">
          <label>How does your partner treat you?</label>
          <input 
            type="text" 
            name="partnerTreatment"
            value={responses.partnerTreatment} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>Do you feel safe at home?</label>
          <input 
            type="text" 
            name="feelSafeAtHome"
            value={responses.feelSafeAtHome} 
            onChange={handleChange}
          />
        </div>

        
        {Object.entries(directQuestions).map(([key, question]) => (
          <div className="question" key={key}>
            <p>{question}</p>
            <label>
              Yes
              <input
                type="radio"
                name={key}
                value="yes"
                checked={responses[key] === 'yes'}
                onChange={handleChange}
              />
            </label>
            <label>
              No
              <input
                type="radio"
                name={key}
                value="no"
                checked={responses[key] === 'no'}
                onChange={handleChange}
              />
            </label>
          </div>
        ))} 
    <h2>Assessment of current IPV</h2>
<div className="question">
          <label>Is perpetrator with client?</label>
          <input 
            type="text" 
            name="perpetratorWithClient"
            value={responses.perpetratorWithClient} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>Threats of homicide?</label>
          <input 
            type="text" 
            name="threatsOfHomicide"
            value={responses.threatsOfHomicide} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>Weapons involved?</label>
          <input 
            type="text" 
            name="weaponsInvolved"
            value={responses.weaponsInvolved} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>History of strangulation or stalking?</label>
          <input 
            type="text" 
            name="historyOfStrangulation"
            value={responses.historyOfStrangulation} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>Assess for suicidality and homicidality?</label>
          <input 
            type="text" 
            name="suicidalityAndHomicidality"
            value={responses.suicidalityAndHomicidality} 
            onChange={handleChange}
          />
        </div>

        <div className="question">
          <label>Assess for safety of children?</label>
          <input 
            type="text" 
            name="assessSafetyOfChildren"
            value={responses.assessSafetyOfChildren} 
            onChange={handleChange}
          />
        </div>
        <h2>Assessment of history of IPV</h2>
        <div className="question">
          <label>Patterns of abuse:</label>
          <input 
            type="text" 
            name="patternsOfAbuse"
            value={responses.patternsOfAbuse} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>History of effects of abuse:</label>
          <input 
            type="text" 
            name="historyOfEffects"
            value={responses.historyOfEffects} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>Injuries/hospitalizations:</label>
          <input 
            type="text" 
            name="injuriesHospitalizations"
            value={responses.injuriesHospitalizations} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>Physical and psychological health effects; economic, social, or other effects:</label>
          <input 
            type="text" 
            name="healthEffects"
            value={responses.healthEffects} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>Support and coping strategies:</label>
          <input 
            type="text" 
            name="supportStrategies"
            value={responses.supportStrategies} 
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label>Readiness for change:</label>
          <input 
            type="text" 
            name="readinessForChange"
            value={responses.readinessForChange} 
            onChange={handleChange}
          />
        </div>
       
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
       
      </form>
    </div>
  );
};


export default IPVScreeningAndAssessmentForm;