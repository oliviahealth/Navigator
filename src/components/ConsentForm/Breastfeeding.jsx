import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/BreastFeeding.css';

function BreastFeeding() {
  const { patientId } = useParams()
  const [assessment, setAssessment] = useState({
    questions: {
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      q5: 0,
      q6: 0,
      q7: 0,
      q8: 0,
      q9: 0,
      q10: 0,
      q11: 0,
      q12: 0,
      q13: 0,
      q14: 0,
      q15: 0,
      q16: 0,
      q17: 0,
      q18: 0,
      q19: 0,
      q20: 0,
      q21: 0,
      q22: 0,
      q23: 0,
      q24: 0,
      q25: 0,
      q26: 0,
      q27: 0,
      q28: 0,



    }
  });

  const handleAssessmentChange = (name, value) => {

    const sanitizedValue = Math.max(1, Math.min(5, Number(value)));

    setAssessment(prevAssessment => ({
      ...prevAssessment,
      questions: {
        ...prevAssessment.questions,
        [name]: sanitizedValue,
      }
    }));
  };
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
const accessToken = Cookies.get('accessToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/breastfeeding/${patientId}`, {
        method: 'POST',
        headers: {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${accessToken}`
},
credentials: 'omit',
        body: JSON.stringify(assessment),
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

  return (
    <div className="breastfeeding-form">
      <form onSubmit={handleSubmit} className="encounter-form">
        <h1>Breastfeeding & Lactation</h1>
        <h2>Breastfeeding and Lactation CHECKLIST</h2>
        <p>How can I tell that breastfeeding is going well?</p>

        <div className="guidance-section">
          <h2>Breastfeeding is going well when:</h2>
          <div className="guidance-item">
            <li>Your baby has 8 feeds or more in 24 hours </li>
            <li>Your baby is feeding for between 5 and 40 minutes at each feed</li>
            <li>Your baby has normal skin colour </li>
            <li>Your baby is generally calm and relaxed whist feeding and is content after most feeds </li>
            <li>Your baby has wet and dirty nappies (see chart over page) </li>
            <li>Breastfeeding is comfortable </li>
            <li>When your baby is 3-4 days old and beyond you should be able to hear your baby swallowing frequently during the feed </li>
          </div>
        </div>
        <div className="guidance-section">
          <h2>Talk to your midwife / health visitor if: </h2>
          <div className="guidance-item">
            <li>Your baby is sleepy and has had less than 6 feeds in 24 hours</li>
            <li>Your baby consistently feeds for 5 minutes or less at each feed</li>
            <li>Your baby consistently feeds for longer than 40 minutes at each feed</li>
            <li>Your baby always falls asleep on the breast and/or never finishes the feed himself</li>
            <li>Your baby appears jaundiced (yellow discolouration of the skin)</li>
            <li>Most jaundice in babies is not harmful, however, it is important to check your baby for any signs of yellow colouring particularly during the first week of life. The yellow colour will usually appear around the face and forehead first and then spread to the body, arms and legs. A good time to check is when you are changing a nappy or clothes. From time to time press your baby’s skin gently to see if you can see a yellow tinge developing. Also check the whites of your baby’s eyes when they are open and the inside of his/her mouth when open to see if the sides, gums or roof of the mouth look yellow</li>
            <li>Your baby comes on and off the breast frequently during the feed or refuses to breastfeed</li>
            <li>Your baby is not having the wet and dirty nappies explained overleaf</li>
            <li>You are having pain in your breasts or nipples, which doesn’t disappear after the baby’s first few sucks. Your nipple comes out of the baby’s mouth looking pinched or flattened on one side</li>
            <li>You cannot tell if your baby is swallowing any milk when your baby is 3-4 days old and beyond</li>
            <li>You think your baby needs a dummy</li>
            <li>You feel you need to give your baby formula milk</li>
          </div>
        </div>

        <div className="nappies-info">
          <table>
            <caption>Nappies</caption>
            <thead>
              <tr>
                <th>Baby's age</th>
                <th>Wet nappies</th>
                <th>Dirty nappies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1-2 days old</td>
                <td>1-2 or more per day urates may be present*</td>
                <td>1 or more dark green/black 'tar like' called meconium</td>
              </tr>
              <tr>
                <td>3-4 days old</td>
                <td>3 or more per day nappies feel heavier</td>
                <td>At least 2, changing in colour and consistency – brown/green/yellow, becoming looser ('changing stool')</td>
              </tr>
              <tr>
                <td>5-6 days old</td>
                <td>5 or more Heavy wet**</td>
                <td>At least 2, yellow; may be quite watery</td>
              </tr>
              <tr>
                <td>7 days to 28 days old</td>
                <td>6 or more heavy wet</td>
                <td>At least 2, at least the size of a £2 coin yellow and watery, 'seedy' appearance</td>
              </tr>
            </tbody>
          </table>
          <p>
            * The contents of your baby's nappies will change during the first week. These changes will help you know if feeding is going well.
            Speak to your midwife if you have any concerns.
          </p>
          <p>
            ** Heavy wet: A piece of dry cotton wool when held under running water will weigh approximately 40g when saturated.
            This would represent a 'heavy wet' nappy.
          </p>
          <p>
            For more information, please refer to the <a href="https://www.unicef.org.uk/babyfriendly/wp-content/uploads/sites/2/2016/10/mothers_breastfeeding_checklist.pdf">UNICEF Baby Friendly Initiative breastfeeding checklist</a>.
          </p>

        </div>
        <div className="breastfeeding-form">
          {/* ... other parts of the form */}

          <div className="assessment-tool">
            <h3>Neonatal Breastfeeding Assessment Tool</h3>
            <p>How you and your nurse/midwife can recognise that your baby is feeding well</p>
            <p>What to look for/ask about</p>

            {/* Add a section for each question */}
            <div className="question">
              <p>Your baby is not interested, when offered breast, sleepy</p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q1"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q1 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Your baby is not interested, when offered breast, sleepy (*A) </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q2"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q2 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>

            <div className="question">
              <p>Your baby is showing feeding cues but not attaching (*B) </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q3"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q3 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>


            <div className="question">
              <p>Your baby attaches at the breast but quickly falls asleep (*C) </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q4"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q4 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Your baby attaches at the breast but quickly falls asleep (*C) </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q5"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q5 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Your baby attaches for short bursts with long pauses (*D) </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q6"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q6 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Attaches well with long rhythmical sucking and swallowing for a short feed (requiring stimulation)(*E)  </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q7"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q7 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Attaches well for a sustained period with long rhythmical sucking and swallowing (*F)  </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q8"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q8 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Normal skin colour and tone  </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q9"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q9 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Gaining weight appropriately  </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q10"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q10 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Your baby’s nappies are at least 5-6 heavy, wet nappies in 24 hours </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q11"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q11 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Your baby's nappies are at least 2 dirty nappies in 24hrs, at least £2 coin size, yellow and runny </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q12"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q12 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>Your breasts and nipples are comfortable </p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q13"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q13 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <div className="question">
              <p>You Referred for additional breastfeeding support</p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="q14"
                    value={rating}
                    onChange={(e) => handleAssessmentChange(e.target.name, e.target.value)}
                    checked={assessment.questions.q14 === rating}
                  />
                  {rating}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="frequency-guidance">
          <h4>Wet nappies:</h4>
          <p>Day 1-2 = 1-2 or more in 24 hours</p>
          <p>Day 3-4 = 3-4 or more in 24 hours, heavier</p>
          <p>Day 6 plus = 6 or more in 24 hours, heavy</p>

          <h4>Stools/dirty nappies:</h4>
          <p>Day 1-2 = 1 or more in 24 hours, meconium</p>
          <p>Day 3-4 = 2 (preferably more) in 24 hours changing stools</p>
          <p>By day 10-14 babies should pass frequent soft, runny stools everyday; 2 dirty nappies in 24 hours being the minimum you would expect.</p>
          <p>Exclusively breastfed babies should not have a day when they do not pass stool within the first 4-6 weeks. If they do then a full breastfeed should be observed to check for effective feeding. However, it is recognised that very preterm babies who transition to breastfeeding later may have developed their individual stooling pattern before beginning to breastfeed, and therefore this may be used as a guide to what is normal for each baby. </p>
          <h4>Feed Frequency:</h4>
          <p>Babies who are born preterm/sick may not be able to feed responsively in the way a term baby does. It is important that they have 8-10 feeds in 24 hours and they may need to be wakened if they don’t show feeding cues after 3 hours. During this time it is important that you protect your milk supply by continuing to express. </p>
          <p>Being responsive to your baby’s need to breastfeed for food, drink, comfort and security will ensure you have a good milk supply and a secure, happy baby.</p>
          <p>To be used in conjunction with the assessment of maternal lactation, attachment and signs of effective milk transfer.</p>
        </div>
        <div className="score-guidance">
          <h4>Breastfeeding assessment score to determine tube top ups:</h4>
          <table>
            <thead>
              <tr>
                <th>Score</th>
                <th>Definition</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>Offered the breast, not showing feeding cues, sleepy</td>
                <td>Full top up</td>
              </tr>
              <tr>
                <td>B</td>
                <td>Some interest in feeding (licking and mouth opening/head turning) but does not attach</td>
                <td>Full top up</td>
              </tr>
              {/* ... more rows ... */}
              <tr>
                <td>C</td>
                <td>Attaches onto the breast but comes on and off or falls asleep</td>
                <td>Full top up</td>
              </tr>
              <tr>
                <td>D</td>
                <td>Attaches only for a short burst of sucking, uncoordinated with breathing and swallowing and/or frequent long pauses</td>
                <td>Half top up if the mother is available for next feed. The baby may wake early</td>
              </tr>
              <tr>
                <td>E</td>
                <td>Attaches well, long, slow, rhythmical sucking and swallowing – sustained for a short time with breasts not softened throughout</td>
                <td>Half top up if mother is not available for next feed. If mother is available for next feed do not top up, and assess effectiveness of next feed.</td>
              </tr>
              <tr>
                <td>F</td>
                <td>Attaches well, long, slow, rhythmical sucking and swallowing – sustained for a longer time with breasts feeling soft following feed</td>
                <td>No top up</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form-group">
          <button className="btn" type="submit">Submit</button>
        </div>
        <button
  type="button"
  onClick={() => navigate('/dashboard')}>
  Cancel
</button>

      </form>



    </div>


  );
}

export default BreastFeeding;