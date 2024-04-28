import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const IPVScreeningAndAssessmentFormReadOnly = () => {
  const { patientId, log_id } = useParams();
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
    const { name, value } = event.target;
    setResponses(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/dashboard'); 
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/ipv/${patientId}/${log_id}`, {
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
            setResponses(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);


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
      
      <form>
      <h2>IPV Screening and Assessment Questions</h2>
        {/* Indirect Questions */}
        <div className="question">
          <label>How does your partner treat you?</label>
          <input 
            type="text" 
            name="partnerTreatment"
            value={responses.partnerTreatment} 
            disabled
          />
        </div>
        <div className="question">
          <label>Do you feel safe at home?</label>
          <input 
            type="text" 
            name="feelSafeAtHome"
            value={responses.feelSafeAtHome} 
            disabled
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
                disabled
              />
            </label>
            <label>
              No
              <input
                type="radio"
                name={key}
                value="no"
                checked={responses[key] === 'no'}
                disabled
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
            disabled
          />
        </div>
        <div className="question">
          <label>Threats of homicide?</label>
          <input 
            type="text" 
            name="threatsOfHomicide"
            value={responses.threatsOfHomicide} 
            disabled
          />
        </div>
        <div className="question">
          <label>Weapons involved?</label>
          <input 
            type="text" 
            name="weaponsInvolved"
            value={responses.weaponsInvolved} 
            disabled
          />
        </div>
        <div className="question">
          <label>History of strangulation or stalking?</label>
          <input 
            type="text" 
            name="historyOfStrangulation"
            value={responses.historyOfStrangulation} 
            disabled
          />
        </div>
        <div className="question">
          <label>Assess for suicidality and homicidality?</label>
          <input 
            type="text" 
            name="suicidalityAndHomicidality"
            value={responses.suicidalityAndHomicidality} 
            disabled
          />
        </div>

        <div className="question">
          <label>Assess for safety of children?</label>
          <input 
            type="text" 
            name="assessSafetyOfChildren"
            value={responses.assessSafetyOfChildren} 
            disabled
          />
        </div>
        <h2>Assessment of history of IPV</h2>
        <div className="question">
          <label>Patterns of abuse:</label>
          <input 
            type="text" 
            name="patternsOfAbuse"
            value={responses.patternsOfAbuse} 
            disabled
          />
        </div>
        <div className="question">
          <label>History of effects of abuse:</label>
          <input 
            type="text" 
            name="historyOfEffects"
            value={responses.historyOfEffects} 
            disabled
          />
        </div>
        <div className="question">
          <label>Injuries/hospitalizations:</label>
          <input 
            type="text" 
            name="injuriesHospitalizations"
            value={responses.injuriesHospitalizations} 
            disabled
          />
        </div>
        <div className="question">
          <label>Physical and psychological health effects; economic, social, or other effects:</label>
          <input 
            type="text" 
            name="healthEffects"
            value={responses.healthEffects} 
            disabled
          />
        </div>
        <div className="question">
          <label>Support and coping strategies:</label>
          <input 
            type="text" 
            name="supportStrategies"
            value={responses.supportStrategies} 
            disabled
          />
        </div>
        <div className="question">
          <label>Readiness for change:</label>
          <input 
            type="text" 
            name="readinessForChange"
            value={responses.readinessForChange} 
            disabled
          />
        </div>
        <button type="button" onClick={handleCancel}>Cancel</button>
       
      </form>
    </div>
  );
};


export default IPVScreeningAndAssessmentFormReadOnly;