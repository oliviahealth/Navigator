import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

function CSSRS() {
    const { patientId } = useParams();
    const initialIdeationState = [
        {
            question: "1. Wish to be Dead",
            detail: "Have you wished you were dead or wished you could go to sleep and not wake up?",
            lifetimeResponse: '',
            monthResponse: '',
            description: ''
        },
        {
            question: "2. Non-Specific Active Suicidal Thoughts",
            detail: "Have you actually had any thoughts of killing yourself?",
            lifetimeResponse: '',
            monthResponse: '',
            description: ''
        },
        {
            question: "3. Active Suicidal Ideation with Any Methods (Not Plan) without Intent to Act",
            detail: "Have you been thinking about how you might do this?",
            lifetimeResponse: '',
            monthResponse: '',
            description: ''
        },
        {
            question: "4. Active Suicidal Ideation with Some Intent to Act, without Specific Plan",
            detail: "Have you had these thoughts and had some intention of acting on them?",
            lifetimeResponse: '',
            monthResponse: '',
            description: ''
        },
        {
            question: "5. Active Suicidal Ideation with Specific Plan and Intent",
            detail: "Have you started to work out or worked out the details of how to kill yourself? Do you intend to carry out this plan?",
            lifetimeResponse: '',
            monthResponse: '',
            description: ''
        }
    ];

    const initialIntensityState = {
        mostSevereLifetimeType: '',
        mostSevereLifetimeDesc: '',
        mostSevereRecentType: '',
        mostSevereRecentDesc: '',
        frequencyLifetime: '',
        durationLifetime: '',
        controllabilityLifetime: '',
        deterrentsLifetime: '',
        reasonsLifetime: '',
        frequencyMonth: '',
        durationMonth: '',
        controllabilityMonth: '',
        deterrentsMonth: '',
        reasonsMonth: ''
    };

    const initialBehaviorState = {
        actualAttempt: { lifetime: '', pastThreeMonths: '', description: '' },
        selfInjuriousBehavior: { lifetime: '', pastThreeMonths: '', description: '' },
        interruptedAttempt: { lifetime: '', pastThreeMonths: '', description: '' },
        abortedAttempt: { lifetime: '', pastThreeMonths: '', description: '' },
        preparatoryActs: { lifetime: '', pastThreeMonths: '', description: '' },
        mostRecentAttemptLethality: '',
        potentialLethalityMostRecent: '',
        mostLethalAttemptLethality: '',
        potentialLethalityMostLethal: '',
        firstAttemptLethality: '',
        potentialLethalityFirstAttempt: ''
    };

    const initialLethalityState = {
        mostRecentAttemptLethality: '',
        potentialLethalityMostRecent: '',
        mostLethalAttemptLethality: '',
        potentialLethalityMostLethal: '',
        firstAttemptLethality: '',
        potentialLethalityFirstAttempt: ''
    };

    const [ideationResponses, setIdeationResponses] = useState(initialIdeationState);
    const [intensityResponses, setIntensityResponses] = useState(initialIntensityState);
    const [behaviorData, setBehaviorData] = useState(initialBehaviorState);
    const [lethalityData, setLethalityData] = useState(initialLethalityState);

    const handleChange = (index, field, value) => {
        const updatedResponses = [...ideationResponses];
        updatedResponses[index][field] = value;
        setIdeationResponses(updatedResponses);
    };

    const handleChangeIntensity = (field, value) => {
        const updatedIntensity = { ...intensityResponses, [field]: value };
        setIntensityResponses(updatedIntensity);
    };

    const handleBehaviorChange = (field, subfield, value) => {
        setBehaviorData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [subfield]: value
            }
        }));
    };

    const handleLethalityChange = (field, value) => {
        setLethalityData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            ideationResponses: ideationResponses,
            intensityResponses: intensityResponses,
            behaviorData: behaviorData,
            lethalityData: lethalityData
        }
        try {
          const response = await fetch(`http://localhost:5000/api/insert_forms/cssrs/${patientId}`, {
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
          console.error('Failed to submit:', error);
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Suicidal Ideation</h2>
            <p style={{backgroundColor: "#f7f7f7", padding: "10px", border: "1px solid #ccc"}}>
                Ask questions 1 and 2. If both are negative, proceed to “Suicidal Behavior” section. If the answer to question 2 is “yes”, ask questions 3, 4, and 5. If the answer to question 1 and/or 2 is “yes”, complete “Intensity of Ideation” section below.
            </p>
            {ideationResponses.map((item, index) => (
                <div key={index}>
                    <h3>{item.question}</h3>
                    <p>{item.detail}</p>
                    <div>
                        Lifetime:
                        <label>
                            <input type="radio" name={`lifetimeResponse${index}`} value="Yes" checked={item.lifetimeResponse === 'Yes'} onChange={e => handleChange(index, 'lifetimeResponse', 'Yes')} /> Yes
                        </label>
                        <label>
                            <input type="radio" name={`lifetimeResponse${index}`} value="No" checked={item.lifetimeResponse === 'No'} onChange={e => handleChange(index, 'lifetimeResponse', 'No')} /> No
                        </label>
                    </div>
                    <div>
                        Past Month:
                        <label>
                            <input type="radio" name={`monthResponse${index}`} value="Yes" checked={item.monthResponse === 'Yes'} onChange={e => handleChange(index, 'monthResponse', 'Yes')} /> Yes
                        </label>
                        <label>
                            <input type="radio" name={`monthResponse${index}`} value="No" checked={item.monthResponse === 'No'} onChange={e => handleChange(index, 'monthResponse', 'No')} /> No
                        </label>
                    </div>
                    <div>
                        <p>If yes, describe:</p>
                        <textarea value={item.description} onChange={e => handleChange(index, 'description', e.target.value)} placeholder="Describe:" />
                    </div>
                </div>
            ))}
            <h2>Intensity of Ideation</h2>
            <p style={{backgroundColor: "#f7f7f7", padding: "10px", border: "1px solid #ccc"}}>
            The following features should be rated with respect to the most severe type of ideation (i.e., 1-5 from above, with 1 being the least severe and 5 being the most severe). Ask about time he/she was feeling the most suicidal. 
            </p>
            <div>
                <h3 style={{ fontWeight: 'bold' }}>Frequency</h3>
                <p>
                    <i>How many times have you had these thoughts?</i>
                </p>
                <label>Most Severe (Lifetime)</label>
                <select value={intensityResponses.frequencyLifetime} onChange={e => handleChangeIntensity('frequencyLifetime', e.target.value)}>
                    <option value="1">Less than once a week</option>
                    <option value="2">Once a week</option>
                    <option value="3">2-5 times in week</option>
                    <option value="4">Daily or almost daily</option>
                    <option value="5">Many times each day</option>
                </select>
                <label>Most Severe (Past Month)</label>
                <select value={intensityResponses.frequencyMonth} onChange={e => handleChangeIntensity('frequencyMonth', e.target.value)}>
                    <option value="1">Less than once a week</option>
                    <option value="2">Once a week</option>
                    <option value="3">2-5 times in week</option>
                    <option value="4">Daily or almost daily</option>
                    <option value="5">Many times each day</option>
                </select>
            </div>

            <div>
                <h3 style={{ fontWeight: 'bold' }}>Duration</h3>
                <p>
                    <i>When you have the thoughts how long do they last?</i>
                </p>
                <label>Most Severe (Lifetime)</label>
                <select value={intensityResponses.durationLifetime} onChange={e => handleChangeIntensity('durationLifetime', e.target.value)}>
                    <option value="1">Fleeting - few seconds or minutes</option>
                    <option value="2">Less than 1 hour/some of the time</option>
                    <option value="3">1-4 hours/a lot of the time</option>
                    <option value="4">4-8 hours/most of the day</option>
                    <option value="5">More than 8 hours/persistent or continuous</option>
                </select>
                <label>Most Severe (Past Month)</label>
                <select value={intensityResponses.durationMonth} onChange={e => handleChangeIntensity('durationMonth', e.target.value)}>
                    <option value="1">Fleeting - few seconds or minutes</option>
                    <option value="2">Less than 1 hour/some of the time</option>
                    <option value="3">1-4 hours/a lot of the time</option>
                    <option value="4">4-8 hours/most of the day</option>
                    <option value="5">More than 8 hours/persistent or continuous</option>
                </select>
            </div>

            <div>
                <h3 style={{ fontWeight: 'bold' }}>Controllability</h3>
                <p>
                    <i>Could/can you stop thinking about killing yourself or wanting to die if you want to?</i>
                </p>
                <label>Most Severe (Lifetime)</label>
                <select value={intensityResponses.controllabilityLifetime} onChange={e => handleChangeIntensity('controllabilityLifetime', e.target.value)}>
                    <option value="1">Easily able to control thoughts</option>
                    <option value="2">Can control thoughts with little difficulty</option>
                    <option value="3">Can control thoughts with some difficulty</option>
                    <option value="4">Can control thoughts with a lot of difficulty</option>
                    <option value="5">Unable to control thoughts</option>
                    <option value="0">Does not attempt to control thoughts</option>
                </select>
                <label>Most Severe (Past Month)</label>
                <select value={intensityResponses.controllabilityMonth} onChange={e => handleChangeIntensity('controllabilityMonth', e.target.value)}>
                    <option value="1">Easily able to control thoughts</option>
                    <option value="2">Can control thoughts with little difficulty</option>
                    <option value="3">Can control thoughts with some difficulty</option>
                    <option value="4">Can control thoughts with a lot of difficulty</option>
                    <option value="5">Unable to control thoughts</option>
                    <option value="0">Does not attempt to control thoughts</option>
                </select>
            </div>

            <div>
                <h3 style={{ fontWeight: 'bold' }}>Deterrents</h3>
                <p>
                    <i>Are there things - anyone or anything (e.g., family, religion, pain of death) - that stopped you from wanting to die or acting on thoughts of suicide?</i>
                </p>
                <label>Most Severe (Lifetime)</label>
                <select value={intensityResponses.deterrentsLifetime} onChange={e => handleChangeIntensity('deterrentsLifetime', e.target.value)}>
                    <option value="1">Deterrents definitely stopped you</option>
                    <option value="2">Deterrents probably stopped you</option>
                    <option value="3">Uncertain if deterrents stopped you</option>
                    <option value="4">Deterrents most likely did not stop you</option>
                    <option value="5">Deterrents definitely did not stop you</option>
                    <option value="0">Does not apply</option>
                </select>
                <label>Most Severe (Past Month)</label>
                <select value={intensityResponses.deterrentsMonth} onChange={e => handleChangeIntensity('deterrentsMonth', e.target.value)}>
                    <option value="1">Deterrents definitely stopped you</option>
                    <option value="2">Deterrents probably stopped you</option>
                    <option value="3">Uncertain if deterrents stopped you</option>
                    <option value="4">Deterrents most likely did not stop you</option>
                    <option value="5">Deterrents definitely did not stop you</option>
                    <option value="0">Does not apply</option>
                </select>
            </div>

            <div>
                <h3 style={{ fontWeight: 'bold' }}>Reasons for Ideation</h3>
                <p>
                    <i>What sort of reasons did you have for thinking about wanting to die or killing yourself?  Was it to end the pain or stop the way you were feeling (in other words you couldn’t go on living with this pain or how you were feeling) or was it to get attention, revenge or a reaction from others? Or both?</i>
                </p>
                <label>Most Severe (Lifetime)</label>
                <select value={intensityResponses.reasonsLifetime} onChange={e => handleChangeIntensity('reasonsLifetime', e.target.value)}>
                    <option value="1">Completely to get attention, revenge, or a reaction from others</option>
                    <option value="2">Mostly to get attention, revenge, or a reaction from others</option>
                    <option value="3">Equally to get attention, revenge, or a reaction from others and to end/stop the pain</option>
                    <option value="4">Mostly to end or stop the pain</option>
                    <option value="5">Completely to end or stop the pain</option>
                    <option value="0">Does not apply</option>
                </select>
                <label>Most Severe (Past Month)</label>
                <select value={intensityResponses.reasonsMonth} onChange={e => handleChangeIntensity('reasonsMonth', e.target.value)}>
                    <option value="1">Completely to get attention, revenge, or a reaction from others</option>
                    <option value="2">Mostly to get attention, revenge, or a reaction from others</option>
                    <option value="3">Equally to get attention, revenge, or a reaction from others and to end/stop the pain</option>
                    <option value="4">Mostly to end or stop the pain</option>
                    <option value="5">Completely to end or stop the pain</option>
                    <option value="0">Does not apply</option>
                </select>
            </div>
            
            <h2>Suicidal Behavior</h2>

                <div>
                    <h3>Actual Attempt</h3>
                    <p style={{backgroundColor: "#f7f7f7", padding: "10px", border: "1px solid #ccc"}}>
                        A potentially self-injurious act committed with at least some wish to die, as a result of act. Behavior was in part thought of as method to kill oneself. Intent does not have to be 100%.  If there is any intent/desire to die associated with the act, then it can be considered an actual suicide attempt. There does not have to be any injury or harm, just the potential for injury or harm. If person pulls trigger while gun is in mouth but gun is broken so no injury results, this is considered an attempt.  
                        Inferring Intent: Even if an individual denies intent/wish to die, it may be inferred clinically from the behavior or circumstances. For example, a highly lethal act that is clearly not an accident so no other intent but suicide can be inferred (e.g., gunshot to head, jumping from window of a high floor/story). Also, if someone denies intent to die, but they thought that what they did could be lethal, intent may be inferred.<br></br> 
                        <i>Have you made a suicide attempt?</i><br></br> 
                        <i>Have you done anything to harm yourself?</i>
                        <i>Have you done anything dangerous where you could have died?</i><br></br> 
                        <i>What did you do?</i><br></br> 
                        <i>Did you______ as a way to end your life?</i> <br></br> 
                        <i>Did you want to die (even a little) when you_____?</i><br></br> 
                        <i>Were you trying to end your life when you _____?</i><br></br> 
                        <i>Or Did you think it was possible you could have died from_____?</i><br></br> 
                        <i>Or did you do it purely for other reasons / without ANY intention of killing yourself (like to relieve stress, feel better, 
                        get sympathy, or get something else to happen)?</i>  (Self-Injurious Behavior without suicidal intent)

                    </p>
                    <p>Have you made an actual attempt? (Lifetime)</p>
                    <label>
                        Yes
                        <input type="radio" name="lifetimeActualAttempt" value="Yes" checked={behaviorData.actualAttempt.lifetime === 'Yes'} onChange={(e) => handleBehaviorChange('actualAttempt', 'lifetime', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="lifetimeActualAttempt" value="No" checked={behaviorData.actualAttempt.lifetime === 'No'} onChange={(e) => handleBehaviorChange('actualAttempt', 'lifetime', e.target.value)} />
                    </label>

                    <p>Have you made an actual attempt? (Past 3 Months)</p>
                    <label>
                        Yes
                        <input type="radio" name="pastThreeMonthsActualAttempt" value="Yes" checked={behaviorData.actualAttempt.pastThreeMonths === 'Yes'} onChange={(e) => handleBehaviorChange('actualAttempt', 'pastThreeMonths', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="pastThreeMonthsActualAttempt" value="No" checked={behaviorData.actualAttempt.pastThreeMonths === 'No'} onChange={(e) => handleBehaviorChange('actualAttempt', 'pastThreeMonths', e.target.value)} />
                    </label>

                    <p>If yes, describe:</p>
                    <textarea value={behaviorData.actualAttempt.description} onChange={(e) => handleBehaviorChange('actualAttempt', 'description', e.target.value)} />
                </div>

                <div>
                    <h3>Self-Injurious Behavior</h3>
                    <p>Have you engaged in self-injurious behavior? (Lifetime)</p>
                    <label>
                        Yes
                        <input type="radio" name="lifetimeSelfInjuriousBehavior" value="Yes" checked={behaviorData.selfInjuriousBehavior.lifetime === 'Yes'} onChange={(e) => handleBehaviorChange('selfInjuriousBehavior', 'lifetime', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="lifetimeSelfInjuriousBehavior" value="No" checked={behaviorData.selfInjuriousBehavior.lifetime === 'No'} onChange={(e) => handleBehaviorChange('selfInjuriousBehavior', 'lifetime', e.target.value)} />
                    </label>

                    <p>Have you engaged in self-injurious behavior? (Past 3 Months)</p>
                    <label>
                        Yes
                        <input type="radio" name="pastThreeMonthsSelfInjuriousBehavior" value="Yes" checked={behaviorData.selfInjuriousBehavior.pastThreeMonths === 'Yes'} onChange={(e) => handleBehaviorChange('selfInjuriousBehavior', 'pastThreeMonths', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="pastThreeMonthsSelfInjuriousBehavior" value="No" checked={behaviorData.selfInjuriousBehavior.pastThreeMonths === 'No'} onChange={(e) => handleBehaviorChange('selfInjuriousBehavior', 'pastThreeMonths', e.target.value)} />
                    </label>
                </div>


                <div>
                    <h3>Interrupted Attempt</h3>
                    <p style={{backgroundColor: "#f7f7f7", padding: "10px", border: "1px solid #ccc"}}>
                        When the person is interrupted (by an outside circumstance) from starting the potentially self-injurious act (if not for that, actual attempt would have occurred).
                        Overdose: Person has pills in hand but is stopped from ingesting.  Once they ingest any pills, this becomes an attempt rather than an interrupted attempt. Shooting: Person has gun pointed toward self, gun is taken away by someone else, or is somehow prevented from pulling trigger. Once they pull the trigger, even if the gun fails to fire, it is an attempt. Jumping: Person is poised to jump, is grabbed and taken down from ledge. Hanging: Person has noose around neck but has not yet started to hang - is stopped from doing so.
                    </p>
                    <p>Has there been a time when you started to do something to end your life but someone or something stopped you before you actually did anything? (Lifetime)</p>
                    <label>
                        Yes
                        <input type="radio" name="lifetimeInterruptedAttempt" value="Yes" checked={behaviorData.interruptedAttempt.lifetime === 'Yes'} onChange={(e) => handleBehaviorChange('interruptedAttempt', 'lifetime', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="lifetimeInterruptedAttempt" value="No" checked={behaviorData.interruptedAttempt.lifetime === 'No'} onChange={(e) => handleBehaviorChange('interruptedAttempt', 'lifetime', e.target.value)} />
                    </label>

                    <p>Has there been a time when you started to do something to end your life but someone or something stopped you before you actually did anything? (Past 3 Months)</p>
                    <label>
                        Yes
                        <input type="radio" name="pastThreeMonthsInterruptedAttempt" value="Yes" checked={behaviorData.interruptedAttempt.pastThreeMonths === 'Yes'} onChange={(e) => handleBehaviorChange('interruptedAttempt', 'pastThreeMonths', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="pastThreeMonthsInterruptedAttempt" value="No" checked={behaviorData.interruptedAttempt.pastThreeMonths === 'No'} onChange={(e) => handleBehaviorChange('interruptedAttempt', 'pastThreeMonths', e.target.value)} />
                    </label>

                    <p>If yes, describe:</p>
                    <textarea value={behaviorData.interruptedAttempt.description} onChange={(e) => handleBehaviorChange('interruptedAttempt', 'description', e.target.value)} />
                </div>

                <div>
                    <h3>Aborted Attempt</h3>
                    <p style={{backgroundColor: "#f7f7f7", padding: "10px", border: "1px solid #ccc"}}>
                        When the person is interrupted (by an outside circumstance) from starting the potentially self-injurious act (if not for that, actual attempt would have occurred).
                        Overdose: Person has pills in hand but is stopped from ingesting.  Once they ingest any pills, this becomes an attempt rather than an interrupted attempt. Shooting: Person has gun pointed toward self, gun is taken away by someone else, or is somehow prevented from pulling trigger. Once they pull the trigger, even if the gun fails to fire, it is an attempt. Jumping: Person is poised to jump, is grabbed and taken down from ledge. Hanging: Person has noose around neck but has not yet started to hang - is stopped from doing so.
                        Has there been a time when you started to do something to end your life but someone or something stopped you before you actually did anything?
                    </p>
                    <p>Has there been a time when you started to do something to end your life but someone or something stopped you before you actually did anything? (Lifetime)</p>
                    <label>
                        Yes
                        <input type="radio" name="lifetimeAbortedAttempt" value="Yes" checked={behaviorData.abortedAttempt.lifetime === 'Yes'} onChange={(e) => handleBehaviorChange('abortedAttempt', 'lifetime', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="lifetimeAbortedAttempt" value="No" checked={behaviorData.abortedAttempt.lifetime === 'No'} onChange={(e) => handleBehaviorChange('abortedAttempt', 'lifetime', e.target.value)} />
                    </label>

                    <p>Has there been a time when you started to do something to end your life but someone or something stopped you before you actually did anything? (Past 3 Months)</p>
                    <label>
                        Yes
                        <input type="radio" name="pastThreeMonthsAbortedAttempt" value="Yes" checked={behaviorData.abortedAttempt.pastThreeMonths === 'Yes'} onChange={(e) => handleBehaviorChange('abortedAttempt', 'pastThreeMonths', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="pastThreeMonthsAbortedAttempt" value="No" checked={behaviorData.abortedAttempt.pastThreeMonths === 'No'} onChange={(e) => handleBehaviorChange('abortedAttempt', 'pastThreeMonths', e.target.value)} />
                    </label>

                    <p>If yes, describe:</p>
                    <textarea value={behaviorData.abortedAttempt.description} onChange={(e) => handleBehaviorChange('abortedAttempt', 'description', e.target.value)} />
                </div>

                <div>
                    <h3>Preparatory Acts</h3>
                    <p style={{backgroundColor: "#f7f7f7", padding: "10px", border: "1px solid #ccc"}}>
                        Acts or preparation towards imminently making a suicide attempt. This can include anything beyond a verbalization or thought, such as assembling a specific method (e.g., buying pills, purchasing a gun) or preparing for one’s death by suicide (e.g., giving things away, writing a suicide note). 
                    </p>
                    <p>Have you taken any steps towards making a suicide attempt or preparing to kill yourself (such as collecting pills, getting a gun, giving valuables away or writing a suicide note)? (Lifetime)</p>
                    <label>
                        Yes
                        <input type="radio" name="lifetimePreparatoryActs" value="Yes" checked={behaviorData.preparatoryActs.lifetime === 'Yes'} onChange={(e) => handleBehaviorChange('preparatoryActs', 'lifetime', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="lifetimePreparatoryActs" value="No" checked={behaviorData.preparatoryActs.lifetime === 'No'} onChange={(e) => handleBehaviorChange('preparatoryActs', 'lifetime', e.target.value)} />
                    </label>

                    <p>Have you taken any steps towards making a suicide attempt or preparing to kill yourself (such as collecting pills, getting a gun, giving valuables away or writing a suicide note)? (Past 3 Months)</p>
                    <label>
                        Yes
                        <input type="radio" name="pastThreeMonthsPreparatoryActs" value="Yes" checked={behaviorData.preparatoryActs.pastThreeMonths === 'Yes'} onChange={(e) => handleBehaviorChange('preparatoryActs', 'pastThreeMonths', e.target.value)} />
                    </label>
                    <label>
                        No
                        <input type="radio" name="pastThreeMonthsPreparatoryActs" value="No" checked={behaviorData.preparatoryActs.pastThreeMonths === 'No'} onChange={(e) => handleBehaviorChange('preparatoryActs', 'pastThreeMonths', e.target.value)} />
                    </label>

                    <p>If yes, describe:</p>
                    <textarea value={behaviorData.preparatoryActs.description} onChange={(e) => handleBehaviorChange('preparatoryActs', 'description', e.target.value)} />
                </div>

                <div>
                <h2>Lethality and Severity Scoring</h2>
                    <div>
                        <h4>Most Recent Attempt - Actual Lethality Score:</h4>
                        <select value={lethalityData.mostRecentAttemptLethality} onChange={(e) => handleLethalityChange('mostRecentAttemptLethality', e.target.value)}>
                            <option value="0">No physical damage or very minor physical damage</option>
                            <option value="1">Minor physical damage</option>
                            <option value="2">Moderate physical damage; medical attention needed</option>
                            <option value="3">Moderately severe physical damage; medical hospitalization and likely intensive care required</option>
                            <option value="4">Severe physical damage; medical hospitalization with intensive care required</option>
                            <option value="5">Death</option>
                        </select>

                        <h4>Most Recent Attempt - Potential Lethality (Only if Actual Lethality = 0):</h4>
                        <select value={lethalityData.potentialLethalityMostRecent} onChange={(e) => handleLethalityChange('potentialLethalityMostRecent', e.target.value)}>
                            <option value="0">Behavior not likely to result in injury</option>
                            <option value="1">Behavior likely to result in injury but not likely to cause death</option>
                            <option value="2">Behavior likely to result in death despite available medical care</option>
                        </select>

                        <h4>Most Lethal Attempt - Actual Lethality Score:</h4>
                        <select value={lethalityData.mostLethalAttemptLethality} onChange={(e) => handleLethalityChange('mostLethalAttemptLethality', e.target.value)}>
                            <option value="0">No physical damage or very minor physical damage</option>
                            <option value="1">Minor physical damage</option>
                            <option value="2">Moderate physical damage; medical attention needed</option>
                            <option value="3">Moderately severe physical damage; medical hospitalization and likely intensive care required</option>
                            <option value="4">Severe physical damage; medical hospitalization with intensive care required</option>
                            <option value="5">Death</option>
                        </select>

                        <h4>Most Lethal Attempt - Potential Lethality (Only if Actual Lethality = 0):</h4>
                        <select value={lethalityData.potentialLethalityMostLethal} onChange={(e) => handleLethalityChange('potentialLethalityMostLethal', e.target.value)}>
                            <option value="0">Behavior not likely to result in injury</option>
                            <option value="1">Behavior likely to result in injury but not likely to cause death</option>
                            <option value="2">Behavior likely to result in death despite available medical care</option>
                        </select>

                        <h4>First Attempt - Actual Lethality Score:</h4>
                        <select value={lethalityData.firstAttemptLethality} onChange={(e) => handleLethalityChange('firstAttemptLethality', e.target.value)}>
                            <option value="0">No physical damage or very minor physical damage</option>
                            <option value="1">Minor physical damage</option>
                            <option value="2">Moderate physical damage; medical attention needed</option>
                            <option value="3">Moderately severe physical damage; medical hospitalization and likely intensive care required</option>
                            <option value="4">Severe physical damage; medical hospitalization with intensive care required</option>
                            <option value="5">Death</option>
                        </select>

                        <h4>First Attempt - Potential Lethality (Only if Actual Lethality = 0):</h4>
                        <select value={lethalityData.potentialLethalityFirstAttempt} onChange={(e) => handleLethalityChange('potentialLethalityFirstAttempt', e.target.value)}>
                            <option value="0">Behavior not likely to result in injury</option>
                            <option value="1">Behavior likely to result in injury but not likely to cause death</option>
                            <option value="2">Behavior likely to result in death despite available medical care</option>
                        </select>
                    </div>
            </div>

            <button type="submit">Submit Responses</button>
        </form>
    );
}

export default CSSRS;