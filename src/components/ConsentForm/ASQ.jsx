import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/ASQ-3.css';

function ASQ() {
  const { patientId } = useParams()
  const [formValues, setFormValues] = useState({
    participantName: '',
    caseId: '',
    dateCompleted: '',
    staffName: '',
    childName: '',
    questionnaireUsed: '',
    adjustedForPrematurity: '',
    communicationScore: '',
    grossMotorScore: '',
    fineMotorScore: '',
    problemSolvingScore: '',
    personalSocialScore: '',
    developmentalSupport: false,
    rescreen: false,
    referEarlySteps: false,
    referCommunityAgency: false,
    noFurtherAction: false,
    describeActivities: '',
    followUpNotes: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue;
  
    switch (type) {
      case 'checkbox':
        inputValue = name === 'questionnaireUsed' ? value : checked;
        break;
      case 'number':
        inputValue = parseFloat(value);
        break;
      default:
        inputValue = value;
        break;
    }
  
    setFormValues({
      ...formValues,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/asq_three/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      navigate(-1);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <div className="ASQ-form">
      <h1>ASQ-3 Questionnaire</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="participantName">Participant Name</label>
        <input type="text" id="participantName" name="participantName" onChange={handleInputChange} value={formValues.participantName} />

        <label htmlFor="caseId">Case ID</label>
        <input type="text" id="caseId" name="caseId" onChange={handleInputChange} value={formValues.caseId} />

        <label htmlFor="dateCompleted">Date Completed*</label>
        <input type="date" id="dateCompleted" name="dateCompleted" onChange={handleInputChange} value={formValues.dateCompleted} />

        <label htmlFor="staffName">Staff Name</label>
        <input type="text" id="staffName" name="staffName" onChange={handleInputChange} value={formValues.staffName} />

        <label htmlFor="childName">Child Name*</label>
        <input type="text" id="childName" name="childName" onChange={handleInputChange} value={formValues.childName} />

        <div className="form-section questionnaire">
          <p>Complete this form when an ASQ-3 Questionnaire required by PAGEONE-EHR is administered.</p>
          <label>Questionnaire Used*</label>
          {Array.from({ length: 21 }, (_, i) => i * 2).map((month) => (
            <div key={month}>
              <input
                type="checkbox"
                id={`${month}month`}
                name="questionnaireUsed"
                value={month}
                onChange={handleInputChange}
                checked={formValues.questionnaireUsed === `${month}`}
              />
              <label htmlFor={`${month}month`}>{month} month</label>
            </div>
          ))}
        </div>

        <div className="form-section">
          <label htmlFor="adjustedForPrematurity">Was age adjusted for prematurity?*</label>
          <div>
            <input
              type="radio"
              id="yesPremature"
              name="adjustedForPrematurity"
              value="Yes"
              onChange={handleInputChange}
              checked={formValues.adjustedForPrematurity === 'Yes'}
            />
            <label htmlFor="yesPremature">Yes</label>
            <input
              type="radio"
              id="noPremature"
              name="adjustedForPrematurity"
              value="No"
              onChange={handleInputChange}
              checked={formValues.adjustedForPrematurity === 'No'}
            />
            <label htmlFor="noPremature">No</label>
          </div>
        </div>

        <label htmlFor="communicationScore">Communication Score:</label>
        <input
          type="number"
          id="communicationScore"
          name="communicationScore"
          onChange={handleInputChange}
          value={formValues.communicationScore}
        />

        <label htmlFor="grossMotorScore">Gross Motor Score:</label>
        <input
          type="number"
          id="grossMotorScore"
          name="grossMotorScore"
          onChange={handleInputChange}
          value={formValues.grossMotorScore}
        />

        <label htmlFor="fineMotorScore">Fine Motor:</label>
        <input
          type="number"
          id="fineMotorScore"
          name="fineMotorScore"
          onChange={handleInputChange}
          value={formValues.fineMotorScore}
        />

        <label htmlFor="problemSolvingScore">Problem Solving:</label>
        <input
          type="number"
          id="problemSolvingScore"
          name="problemSolvingScore"
          onChange={handleInputChange}
          value={formValues.problemSolvingScore}
        />

        <label htmlFor="personalSocialScore">Personal-Social:</label>
        <input
          type="number"
          id="personalSocialScore"
          name="personalSocialScore"
          onChange={handleInputChange}
          value={formValues.personalSocialScore}
        />

        <div className="form-section follow-up">
          <h2>Follow-Up</h2>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                id="developmentalSupport"
                name="developmentalSupport"
                onChange={handleInputChange}
                checked={formValues.developmentalSupport}
              />
              Provide developmental support activities
            </label>

            <label>
              <input
                type="checkbox"
                id="rescreen"
                name="rescreen"
                onChange={handleInputChange}
                checked={formValues.rescreen}
              />
              Rescreen at next interval
            </label>

            <label>
              <input
                type="checkbox"
                id="referEarlySteps"
                name="referEarlySteps"
                onChange={handleInputChange}
                checked={formValues.referEarlySteps}
              />
              Refer to Early Steps or Child Find
            </label>

            <label>
              <input
                type="checkbox"
                id="referCommunityAgency"
                name="referCommunityAgency"
                onChange={handleInputChange}
                checked={formValues.referCommunityAgency}
              />
              Refer to other community agency/provider
            </label>

            <label>
              <input
                type="checkbox"
                id="noFurtherAction"
                name="noFurtherAction"
                onChange={handleInputChange}
                checked={formValues.noFurtherAction}
              />
              No further action taken at this time
            </label>
          </div>

          {formValues.developmentalSupport && (
            <div>
              <label htmlFor="describeActivities">
                Describe activities below. Check all that apply (required if developmental support activities are provided)
              </label>
              <textarea
                id="describeActivities"
                name="describeActivities"
                onChange={handleInputChange}
                value={formValues.describeActivities}
              ></textarea>
            </div>
          )}
        </div>

        <label htmlFor="followUpNotes">Describe activities below (required if developmental support activities are provided)</label>
        <textarea
          id="followUpNotes"
          name="followUpNotes"
          onChange={handleInputChange}
          value={formValues.followUpNotes}
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <div className="guidance-section">
        <h2>Guidance for ASQ-3 Results & Follow-Up</h2>

        <h3>This form is completed when the home visitor administers one of the ASQ-3 Questionnaires required by PAGEONE-EHR.</h3>

        <div className="guidance-item">
          <h3>Date Completed*</h3>
          <p>The date the ASQ-3 was completed.</p>
          <p>In <strong>PAGEONE-EHR</strong>, this is “Date Taken” and is a required field.</p>
        </div>

        <div className="guidance-item">
          <h3>ASQ-3 Administration & Results</h3>
          <p>Indicate which questionnaire was used. PAGEONE-EHR is only required to report on the 10-month, 18-month, and 30-month questionnaires so those are the only ones required in PAGEONE-EHR. All questionnaires are included in the list and should be recorded in PAGEONE-EHR for the following reasons, if applicable:</p>
          <ul>
            <li>To track additional ASQ-3 screenings after a previous ASQ-3 score was below the cut-off or in the monitoring zone. A rescreen after a low score should be recorded in PAGEONE-EHR.</li>
            <li>To track ASQ-3 completion and follow-up for CQI purposes.</li>
            <li>If the child was not screened during the required timeframe, home visitors should use the questionnaire for the next interval to screen the child.</li>
          </ul>
          <p>If the child is less than 24 months old and was born premature (less than 37 weeks gestation), the ASQ-3 User’s Guide provides guidance on how to adjust the age of the child so that the required Questionnaire is completed at the appropriate time. Be sure that you have entered the child’s gestational age at birth in the Target Child Record and that you check this field “Was age adjusted for prematurity?” so that PAGEONE-EHR can report timely screening accurately.</p>
        </div>

        <div className="guidance-item">
          <h3>Was age adjusted for prematurity?</h3>
          <p>If the child is less than 24 months old and was born premature (less than 37 weeks gestation), the ASQ-3 User’s Guide provides guidance on how to adjust the age of the child so that the required Questionnaire is completed at the appropriate time.  Be sure that you have entered the child’s gestational age at birth in the Target Child Record and that you check this field “Was age adjusted for prematurity?” so that PAGEONE-EHR can report timely screening accurately. </p>
        </div>
        <div className="guidance-item">
          <h3>Subscale Scores(Communication, Gross Motor, Fine Motor, Problem Solving, Personal-Social )</h3>
          <p>Record the score for each subscale.</p>
          <p>If the child has already been identified as having a delay in one or more areas and is currently receiving services to address the area(s) of concern, do not complete the screen for that area/subscale and mark the box “Score not recorded for this subscale because child is currently receiving services in this area”. You should still complete the screen for other areas, unless the child’s service provider provides documentation they have screened in those areas at the required interval or that it is clinically inappropriate to screen in other areas. If the child is receiving services for all five areas, complete the form and TouchPoint and mark all five of the “Score not recorded...” boxes.</p>
        </div>

        <div className="guidance-item">
          <h3>Follow-up Action Taken* (check all that apply) </h3>
          <p>This field is required in PageOne-EHR.  If the child scored in the white zone and there are no concerns about the child’s development, mark “No further action taken at this time”. </p>
          <p>If the child scored in the grey zone (monitoring), the home visitor should (at a minimum) provide developmental support activities that specifically address the area(s) of concern and then rescreen the child at the next ASQ-3 interval.  If the activities option is marked, you will be required to describe the activities provided in order to save the TouchPoint in PageOne-EHR. </p>
          <p>If the child scored below the cut-off (black zone) on one or more subscales, complete a PageOne-EHR Referral Form.  A referral to Early Steps (age 0-36 months) should always be offered to the parent as soon as possible and always within 7 calendar days.  Referrals should always be recorded, even if the parent declines.  Other referrals may also be made and should be recorded in the [Follow-up Action Taken] field as Refer to other community agency/provider. These referrals may include FDLRS Child Find for children older than 36 months, a private provider of speech and/or occupational therapy, or primary health care provider.   </p>
        </div>
        <div className="guidance-item">
          <h3>Follow-up Action Taken* (continued)</h3>
          <p>The home visitor should also provide developmental support activities, at least until the child receives an Early Steps evaluation, service from another community provider, or scores above the cutoff when re-screened. </p>
          <p>If a child is already receiving services from Early Steps and scores low on a new domain, the home visitor should notify Early Steps that the child scored low in a new domain. This notification should be recorded in PAGEONE-EHR as a new referral, with service received the same day as the Date of Referral. </p>
        </div>

        <div className="guidance-item">
          <h3>Describe Activites provided</h3>
          <p><strong>Briefly document the developmental support activities provided, which may include:</strong></p>
          <ul>
            <li><strong>Activities from model curriculum:</strong> Program activities and resources from the home visiting model’s curriculum or recommended approaches.</li>
            <li>
              <strong>ASQ Learning Activities:</strong> An activity set from Brookes Publishing for use with parents and children to support any of the five developmental areas of the ASQ-3.
            </li>
            <li>
              <strong>CDC materials and activities:</strong> The Centers for Disease Control (CDC) provide a multitude of resources on child development. The “Learn the signs. Act early.” campaign focuses on children birth to age 5 and offers materials to help parents understand the importance of early intervention, age-specific milestones, and activities for supporting children’s development.
              <a href="http://www.cdc.gov/ncbddd/actearly" style={{ color: 'blue' }}>www.cdc.gov/ncbddd/actearly</a>
            </li>
            <li>
              <strong>Birth to 5 Watch Me Thrive:</strong> This campaign encourages healthy child development, universal screening, and support for the families and providers who care for them. For tips and resources for families to help, promote their child’s development:
              <a href="http://www.acf.hhs.gov/ecd/child-health-development/watch-me-thrive/families" style={{ color: 'blue' }}>www.acf.hhs.gov/ecd/child-health-development/watch-me-thrive/families</a>
            </li>
            <li>
              <strong>Other activities specifically designed to impact development in the area(s) of concern.</strong>
            </li>
          </ul>

          <p>According to HRSA, developmental support activities are defined as “a home visitor-delivered, specific developmental promotion to address the area of concern.” In order for these requirements to be clearly met, we ask that the name of the activity/activities be listed in PAGEOne-EHR, as well as the date(s) delivered and area(s) of concern being addressed. It is not enough to tell the parent about an activity. The home visitor must lead or support the parent in completing the activity with the child.</p>

          <p>Here are some examples of sufficient documentation:</p>
          <ul>
            <li>5/22 Sing a Song activity for communication</li>
            <li>6/29 Zip Zap Boing book (motor, language), 7/17 Drumming up Fun (motor, social emotional)</li>
            <li>2/18 Gross motor: Walking practice- Baby held on chair and pushed around room. Problem Solving: Scarf pull- put scarf into cardboard tube and baby pulled it out.</li>
          </ul>

          <p>Here are some examples of insufficient documentation:</p>
          <ul>
            <li>Will complete scarf pull at next visit (activity not completed yet, no area identified)</li>
            <li>11/8 ASQ Activities – Fine Motor (specific name of the activity or description not provided)</li>
            <li>12/2 Advised mom to try Cheerios pincer grab for fine motor (advising is not enough; home visitor must lead or support parent in the activity)</li>
          </ul>

          <p><strong>Do not use this field to record other notes or information!</strong></p>
        </div>


      </div>
    </div>
  );
}

export default ASQ;