import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ConsentFormStyles/NutHistoryStyle.css';

function NutHistoryReadOnly() {
  const { patientId, log_id } = useParams();
  const [formValues, setFormValues] = useState({
    todayDate: '',
    yourName: '',
    educationLevel: '',
    maritalStatus: '',
    ethnicity: '',
    race: [],
    lastMenstrualPeriod: '',
    dueDate: '',
    prepregnancyWeight: '',
    numberPregnancies: '',
    numberLiveBabies: '',
    pregnantTwentyWeeksCount: '',
    prenatalCareMonth: '',
    pregnancyConditions: [],
    healthProviderVisits: '',
    hivTestOffered: '',
    previousPregnancyConditions: [],
    medicalConditions: [],
    medications: [],
    dentalProblems: [],
    multivitaminIntake: '',
    vitaminIntakePastMonth: '',
    smokingBeforePregnancy: '',
    currentSmoking: '',
    householdSmoking: '',
    alcoholBeforePregnancy: '',
    alcoholDuringPregnancy: '',
    substanceUse: [],
    feedingDecisionLimitation: '',
    breastfedBefore: '',
    currentlyBreastfeeding: '',
    babyAge: '',
    breastfeedingMoreThanOneChild: '',
    breastfeedDuration: '',
    breastfeedDurationReason: [],
    breastfeedingInformation: '',
    feedingPlan: '',
    infoOnBreastfeeding: '',
    breastfeedingConcerns: [],
    mealsPerDay: '',
    snacksPerDay: '',
    milkPerDay: '',
    appetite: '',
    specialDiet: '',
    fastFoodFrequency: '',
    fastFoodDetails: '',
    foodAllergies: '',
    foodAllergiesDetails: '',
    dailyConsumptionMilk: '',
    dailyConsumptionSweetenedBeverages: '',
    dailyConsumptionSnacks: '',
    unpasteurizedJuiceOrMilk: [],
    softCheese: [],
    raw: [],
    fish: [],
    sprouts: [],
    refmeat: [],
    hotdogs: [],
    napplys: [],
    dietType: [],
    dietTypeDetails: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormValues(prev => ({
          ...prev,
          [name]: [...prev[name], value]
        }));
      } else {
        setFormValues(prev => ({
          ...prev,
          [name]: prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: type === 'radio' ? value : value
      }));
    }
  };


  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/nut_history/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                console.log("No support system info found for the selected patient.");
                return; 
            }
            const data = await response.json();
            setFormValues(data.data)
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  return (
    <div className="nut-history-form">
      <h1>Nutrition History and Assessment</h1>
      <form>
        {/* Basic information */}
        <label htmlFor="todays-date">Today's Date</label>
        <input type="date" id="todays-date" name="todayDate" value={formValues.todayDate} onChange={handleInputChange} />

        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" name="yourName" value={formValues.yourName} onChange={handleInputChange} />

        <label htmlFor="education-level">How many grades of school have you completed?</label>
        <input type="text" id="education-level" name="educationLevel" value={formValues.educationLevel} onChange={handleInputChange} />

        {/* Marital Status */}
        <fieldset>
          <legend>Are you currently?</legend>
          <label>
            <input type="radio" name="maritalStatus" value="married" checked={formValues.maritalStatus === 'married'} onChange={handleInputChange} /> Married
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="unmarried" checked={formValues.maritalStatus === 'unmarried'} onChange={handleInputChange} /> Unmarried
          </label>
        </fieldset>

        {/* Ethnicity and Race */}
        <label>Are you Hispanic or Latino?</label>
        <label>
          <input type="radio" name="ethnicity" value="hispanic" checked={formValues.ethnicity === 'hispanic'} onChange={handleInputChange} /> Yes
        </label>
        <label>
          <input type="radio" name="ethnicity" value="notHispanic" checked={formValues.ethnicity === 'notHispanic'} onChange={handleInputChange} /> No
        </label>

        <label>Race: Select one or more:</label>
        <div>
          <label>
            <input type="checkbox" name="race" value="americanIndian" checked={formValues.race.includes('americanIndian')} onChange={handleInputChange} /> American Indian or Alaska Native
          </label>
          <label>
            <input type="checkbox" name="race" value="asian" checked={formValues.race.includes('asian')} onChange={handleInputChange} /> Asian
          </label>
          {/* ...additional races... */}
        </div>

        {/* Pregnancy Information */}
        <label htmlFor="last-menstrual-period">What was the date of your last menstrual period?</label>
        <input type="date" id="last-menstrual-period" name="lastMenstrualPeriod" value={formValues.lastMenstrualPeriod} onChange={handleInputChange} />

        <label htmlFor="due-date">When is your baby due?</label>
        <input type="date" id="due-date" name="dueDate" value={formValues.dueDate} onChange={handleInputChange} />

        <label htmlFor="prepregnancy-weight">What was your weight just before you became pregnant with this baby?</label>
        <input type="text" id="prepregnancy-weight" name="prepregnancyWeight" placeholder="pounds" value={formValues.prepregnancyWeight} onChange={handleInputChange} />

        {/* Pregnancy History */}
        <label htmlFor="number-pregnancies">Number of pregnancies (including this pregnancy)</label>
        <input type="number" id="number-pregnancies" name="numberPregnancies" value={formValues.numberPregnancies} onChange={handleInputChange} />

        <label htmlFor="number-live-babies">Number of live babies (not including this pregnancy)</label>
        <input type="number" id="number-live-babies" name="numberLiveBabies" value={formValues.numberLiveBabies} onChange={handleInputChange} />

        <label>How many times have you been pregnant for 20 weeks or more before this pregnancy?</label>
        <input type="number" name="pregnantTwentyWeeksCount" value={formValues.pregnantTwentyWeeksCount} onChange={handleInputChange} />

        {/* Prenatal Care */}
        <fieldset>
          <legend>How many months were you pregnant when you had your first visit for prenatal care from a doctor or a certified nurse midwife for this current/most recent pregnancy?</legend>
          <label>
            <input type="radio" name="prenatalCareMonth" value="firstMonth" checked={formValues.prenatalCareMonth === 'firstMonth'} onChange={handleInputChange} /> First month
          </label>
          {/* ...other options... */}
          <label>
            <input type="radio" name="prenatalCareMonth" value="noMedicalCare" checked={formValues.prenatalCareMonth === 'noMedicalCare'} onChange={handleInputChange} /> No Medical Care
          </label>
        </fieldset>

        {/* Check all that apply for this pregnancy */}
        <fieldset>
          <legend>For this pregnancy, check all that apply:</legend>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="weightLoss" checked={formValues.pregnancyConditions.includes('weightLoss')} onChange={handleInputChange} /> Weight loss
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="nausea" checked={formValues.pregnancyConditions.includes('nausea')} onChange={handleInputChange} /> Nausea and vomiting
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="gdm" checked={formValues.pregnancyConditions.includes('gdm')} onChange={handleInputChange} /> Gestational Diabetes Mellitus
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="twins" checked={formValues.pregnancyConditions.includes('twins')} onChange={handleInputChange} /> Twins or more expected
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="fetal" checked={formValues.pregnancyConditions.includes('fetal')} onChange={handleInputChange} /> Fetal Growth Restriction
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="hbp" checked={formValues.pregnancyConditions.includes('hbp')} onChange={handleInputChange} /> High Blood Pressure
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="napply" checked={formValues.pregnancyConditions.includes('napply')} onChange={handleInputChange} /> None Apply
          </label>
        </fieldset>

        {/* Health Provider Visits */}
        <label htmlFor="health-provider-visits">How many times have you seen your health provider for this pregnancy?</label>
        <input type="number" id="health-provider-visits" name="healthProviderVisits" value={formValues.healthProviderVisits} onChange={handleInputChange} />

        {/* HIV Test */}
        <label>Have you been offered a blood test for HIV?</label>
        <label>
          <input type="radio" name="hivTestOffered" value="yes" checked={formValues.hivTestOffered === 'yes'} onChange={handleInputChange} /> Yes
        </label>
        <label>
          <input type="radio" name="hivTestOffered" value="no" checked={formValues.hivTestOffered === 'no'} onChange={handleInputChange} /> No
        </label>

        {/* Previous Pregnancies Conditions */}
        <fieldset>
          <legend>For any previous pregnancies, please check all that occurred:</legend>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="gdmHistory" checked={formValues.previousPregnancyConditions.includes('gdmHistory')} onChange={handleInputChange} /> History of GDM
          </label>
          {/* ...other conditions... */}
        </fieldset>

        <fieldset>
          <legend>Medical Information</legend>

          <label htmlFor="medical-conditions">1. Medical conditions/recent illnesses:</label>
          <div>
            <input type="checkbox" id="medical-conditions-yes" name="medicalConditions" value="yes" checked={formValues.medicalConditions.includes('yes')} onChange={handleInputChange} />
            <label htmlFor="medical-conditions-yes">Yes</label>
            <input type="checkbox" id="medical-conditions-no" name="medicalConditions" value="no" checked={formValues.medicalConditions.includes('no')} onChange={handleInputChange} />
            <label htmlFor="medical-conditions-no">No</label>
          </div>

          <label htmlFor="medications">2. Medications (prescription or non-prescription):</label>
          <div>
            <input type="checkbox" id="medications-yes" name="medications" value="yes" checked={formValues.medications.includes('yes')} onChange={handleInputChange} />
            <label htmlFor="medications-yes">Yes</label>
            <input type="checkbox" id="medications-no" name="medications" value="no" checked={formValues.medications.includes('no')} onChange={handleInputChange} />
            <label htmlFor="medications-no">No</label>
            {/* Conditional text input for medication details */}
          </div>

          <label htmlFor="dental-problems">3. Dental problems affecting eating?</label>
          <div>
            <input type="checkbox" id="dental-problems-yes" name="dentalProblems" value="yes" checked={formValues.dentalProblems.includes('yes')} onChange={handleInputChange} />
            <label htmlFor="dental-problems-yes">Yes</label>
            <input type="checkbox" id="dental-problems-no" name="dentalProblems" value="no" checked={formValues.dentalProblems.includes('no')} onChange={handleInputChange} />
            <label htmlFor="dental-problems-no">No</label>
            {/* Conditional text input for dental problem details */}
          </div>

          {/* ... other questions like multivitamin intake ... */}

          <label htmlFor="cigarettes-prepregnancy">6. In the 3 months before you were pregnant, how many cigarettes did you smoke on an average day?</label>
          <input type="number" id="cigarettes-prepregnancy" name="cigarettesPrepregnancy" value={formValues.cigarettesPrepregnancy} onChange={handleInputChange} />

          <label htmlFor="cigarettes-currently">7. How many cigarettes do you smoke on an average day now?</label>
          <input type="number" id="cigarettes-currently" name="cigarettesCurrently" value={formValues.cigarettesCurrently} onChange={handleInputChange} />

          {/* ... other questions about household smoking and alcohol consumption ... */}
        </fieldset><fieldset>
          <legend>4. In the month before this pregnancy, how many times did you take a multivitamin?</legend>
          <label>
            <input type="radio" name="multivitaminIntake" value="lessThanOncePerWeek" checked={formValues.multivitaminIntake === 'lessThanOncePerWeek'} onChange={handleInputChange} /> Less than once per week
          </label>
          <label>
            <input type="radio" name="multivitaminIntake" value="oneToSevenTimesPerWeek" checked={formValues.multivitaminIntake === 'oneToSevenTimesPerWeek'} onChange={handleInputChange} /> 1-7 times per week
          </label>
          <label>
            <input type="radio" name="multivitaminIntake" value="eightOrMoreTimesPerWeek" checked={formValues.multivitaminIntake === 'eightOrMoreTimesPerWeek'} onChange={handleInputChange} /> 8 or more times per week
          </label>
          <label>
            <input type="radio" name="multivitaminIntake" value="unknown" checked={formValues.multivitaminIntake === 'unknown'} onChange={handleInputChange} /> Unknown
          </label>
        </fieldset>

        {/* Vitamin and Mineral Intake in the Past Month */}
        <label htmlFor="vitaminIntakePastMonth">5. Have you taken any vitamins or minerals in the past month?</label>
        <div>
          <label>
            <input type="radio" id="vitaminIntakePastMonthYes" name="vitaminIntakePastMonth" value="yes" checked={formValues.vitaminIntakePastMonth === 'yes'} onChange={handleInputChange} /> Yes
          </label>
          <label>
            <input type="radio" id="vitaminIntakePastMonthNo" name="vitaminIntakePastMonth" value="no" checked={formValues.vitaminIntakePastMonth === 'no'} onChange={handleInputChange} /> No
          </label>
          <label>
            <input type="radio" id="vitaminIntakePastMonthUnknown" name="vitaminIntakePastMonth" value="unknown" checked={formValues.vitaminIntakePastMonth === 'unknown'} onChange={handleInputChange} /> Unknown
          </label>
        </div>
        <label>6. In the 3 months before you were pregnant, how many cigarettes did you smoke on an average day?</label>
        <div>
          <label>
            <input type="radio" name="smokingBeforePregnancy" value="doNotSmoke" checked={formValues.smokingBeforePregnancy === 'doNotSmoke'} onChange={handleInputChange} /> Do not smoke
          </label>
          <label>
            <input type="radio" name="smokingBeforePregnancy" value="smokedButQuantityUnknown" checked={formValues.smokingBeforePregnancy === 'smokedButQuantityUnknown'} onChange={handleInputChange} /> Smoked, but quantity unknown
          </label>
          <label>
            <input type="radio" name="smokingBeforePregnancy" value="unknownOrRefused" checked={formValues.smokingBeforePregnancy === 'unknownOrRefused'} onChange={handleInputChange} /> Unknown or refused
          </label>
        </div>
        <label htmlFor="cigarettesPerDay">Number of Cigarettes per day (1 - 96)</label>
        <input type="number" id="cigarettesPerDay" name="cigarettesPerDay" min="1" max="96" value={formValues.cigarettesPerDay} onChange={handleInputChange} />

        {/* Current Smoking Habits */}
        <label>7. How many cigarettes do you smoke on an average day now?</label>
        <div>
          <label>
            <input type="radio" name="currentSmoking" value="doNotSmokeNow" checked={formValues.currentSmoking === 'doNotSmokeNow'} onChange={handleInputChange} /> Do not smoke
          </label>
          <label>
            <input type="radio" name="currentSmoking" value="smokedButQuantityUnknownNow" checked={formValues.currentSmoking === 'smokedButQuantityUnknownNow'} onChange={handleInputChange} /> Smoked, but quantity unknown
          </label>
          <label>
            <input type="radio" name="currentSmoking" value="unknownOrRefusedNow" checked={formValues.currentSmoking === 'unknownOrRefusedNow'} onChange={handleInputChange} /> Unknown or refused
          </label>
        </div>

        {/* Exposure to Secondhand Smoke */}
        <label>8. Does anyone else living inside your household smoke inside the home?</label>
        <div>
          <label>
            <input type="radio" name="householdSmoking" value="yes" checked={formValues.householdSmoking === 'yes'} onChange={handleInputChange} /> Yes, someone else smokes inside the home
          </label>
          <label>
            <input type="radio" name="householdSmoking" value="no" checked={formValues.householdSmoking === 'no'} onChange={handleInputChange} /> No, no one else smokes inside the home
          </label>
          <label>
            <input type="radio" name="householdSmoking" value="unknown" checked={formValues.householdSmoking === 'unknown'} onChange={handleInputChange} /> Unknown
          </label>
        </div>

        {/* Alcohol Consumption Before Pregnancy */}
        <label>9. In the 3 months before you got pregnant, how many alcoholic drinks did you have in an average week?</label>
        <div>
          <label>
            <input type="radio" name="alcoholBeforePregnancy" value="didNotDrink" checked={formValues.alcoholBeforePregnancy === 'didNotDrink'} onChange={handleInputChange} /> Did not drink
          </label>
          <label>
            <input type="radio" name="alcoholBeforePregnancy" value="drankButQuantityUnknown" checked={formValues.alcoholBeforePregnancy === 'drankButQuantityUnknown'} onChange={handleInputChange} /> Drank, but quantity unknown
          </label>
          <label>
            <input type="radio" name="alcoholBeforePregnancy" value="unknownOrRefusedAlcohol" checked={formValues.alcoholBeforePregnancy === 'unknownOrRefusedAlcohol'} onChange={handleInputChange} /> Unknown or refused
          </label>
        </div>
        <label>10. Alcohol during pregnancy?</label>
        <div>
          <label>
            <input type="radio" name="alcoholDuringPregnancy" value="yes" checked={formValues.alcoholDuringPregnancy === 'yes'} onChange={handleInputChange} /> Yes
          </label>
          <label>
            <input type="radio" name="alcoholDuringPregnancy" value="no" checked={formValues.alcoholDuringPregnancy === 'no'} onChange={handleInputChange} /> No
          </label>
        </div>

        {/* Substance Use */}
        <fieldset>
          <legend>11. Are you currently (check all that apply)?</legend>
          <label>
            <input type="checkbox" name="substanceUse" value="illegalSubstances" checked={formValues.substanceUse.includes('illegalSubstances')} onChange={handleInputChange} /> Using any illegal substance
          </label>
          <label>
            <input type="checkbox" name="substanceUse" value="marijuana" checked={formValues.substanceUse.includes('marijuana')} onChange={handleInputChange} /> Using marijuana in any form
          </label>
          <label>
            <input type="checkbox" name="substanceUse" value="prescriptionMedications" checked={formValues.substanceUse.includes('prescriptionMedications')} onChange={handleInputChange} /> Abusing any prescription medications
          </label>
          <label>
            <input type="checkbox" name="substanceUse" value="none" checked={formValues.substanceUse.includes('none')} onChange={handleInputChange} /> None
          </label>
        </fieldset>

        {/* Feeding Decision Limitation */}
        <label htmlFor="feedingDecisionLimitation">12. Any other physical disability, mental health condition or intellectual disability limiting ability to make appropriate feeding decisions and/or prepare food?</label>
        <div>
          <label>
            <input type="radio" id="feedingDecisionLimitationYes" name="feedingDecisionLimitation" value="yes" checked={formValues.feedingDecisionLimitation === 'yes'} onChange={handleInputChange} /> Yes
          </label>
          <label>
            <input type="radio" id="feedingDecisionLimitationNo" name="feedingDecisionLimitation" value="no" checked={formValues.feedingDecisionLimitation === 'no'} onChange={handleInputChange} /> No
          </label>
        </div>

        <fieldset>
          <legend>1. Have you ever breastfed or pumped breast milk to feed any of your children?</legend>
          <label>
            <input type="radio" name="breastfedBefore" value="yes" checked={formValues.breastfedBefore === 'yes'} onChange={handleInputChange} /> Yes
          </label>
          <label>
            <input type="radio" name="breastfedBefore" value="no" checked={formValues.breastfedBefore === 'no'} onChange={handleInputChange} /> No
          </label>
        </fieldset>

        <fieldset>
          <legend>2. Are you currently breastfeeding or pumping breast milk?</legend>
          <label>
            <input type="radio" name="currentlyBreastfeeding" value="yes" checked={formValues.currentlyBreastfeeding === 'yes'} onChange={handleInputChange} /> Yes
          </label>
          <label>
            <input type="radio" name="currentlyBreastfeeding" value="no" checked={formValues.currentlyBreastfeeding === 'no'} onChange={handleInputChange} /> No
          </label>
        </fieldset>

        <div>
          <label htmlFor="babyAge">a. Is the baby less than one year old?</label>
          <input type="text" id="babyAge" name="babyAge" value={formValues.babyAge} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="breastfeedingMoreThanOneChild">b. Are you breastfeeding or pumping milk for more than one child?</label>
          <input type="text" id="breastfeedingMoreThanOneChild" name="breastfeedingMoreThanOneChild" value={formValues.breastfeedingMoreThanOneChild} onChange={handleInputChange} />
        </div>

        <fieldset>
          <legend>3. Did you breastfeed as long as you desired? If no, Why?</legend>
          <label>
            <input type="radio" name="breastfeedDuration" value="yes" checked={formValues.breastfeedDuration === 'yes'} onChange={handleInputChange} /> Yes
          </label>
          <label>
            <input type="radio" name="breastfeedDuration" value="no" checked={formValues.breastfeedDuration === 'no'} onChange={handleInputChange} /> No
          </label>
          {/* Add more checkbox or input fields here based on the "If no, why?" section */}
          <label>
            <input type="checkbox" name="breastfeedDurationReason" value="difficultyLatching" checked={formValues.breastfeedDurationReason.includes('difficultyLatching')} onChange={handleInputChange} /> My baby had difficulty latching or nursing
          </label>
          <label>
            <input type="checkbox" name="breastfeedDurationReason" value="medicalReasons" checked={formValues.breastfeedDurationReason.includes('medicalReasons')} onChange={handleInputChange} /> I got sick or I had to stop for medical reasons
          </label>
        </fieldset>

        <label htmlFor="breastfeedingInformation">4. What have you heard about breastfeeding?</label>
        <input type="text" id="breastfeedingInformation" name="breastfeedingInformation" value={formValues.breastfeedingInformation} onChange={handleInputChange} />

        <label htmlFor="feedingPlan">5. How are you thinking of feeding your baby?</label>
        <input type="text" id="feedingPlan" name="feedingPlan" value={formValues.feedingPlan} onChange={handleInputChange} />

        <label>6. Are you interested in receiving more information about breastfeeding?</label>
        <label>
          <input type="radio" name="infoOnBreastfeeding" value="yes" checked={formValues.infoOnBreastfeeding === 'yes'} onChange={handleInputChange} /> Yes
        </label>
        <label>
          <input type="radio" name="infoOnBreastfeeding" value="no" checked={formValues.infoOnBreastfeeding === 'no'} onChange={handleInputChange} /> No
        </label>

        {/* Breastfeeding Assessment */}
        <fieldset>
          <legend>Breastfeeding Assessment</legend>
          <label>
            <input type="checkbox" name="breastfeedingConcerns" value="breastSurgery" checked={formValues.breastfeedingConcerns.includes('breastSurgery')} onChange={handleInputChange} /> Breast Surgery/Trauma
          </label>
          {/* ...other conditions... */}
          <label>
            <input type="checkbox" name="breastfeedingConcerns" value="hypothyroidism" checked={formValues.breastfeedingConcerns.includes('hypothyroidism')} onChange={handleInputChange} /> Hypothyroidism
          </label>
          <label>
            <input type="checkbox" name="breastfeedingConcerns" value="diabetes" checked={formValues.breastfeedingConcerns.includes('diabetes')} onChange={handleInputChange} /> Diabetes
          </label>
          <label>
            <input type="checkbox" name="breastfeedingConcerns" value="depression" checked={formValues.breastfeedingConcerns.includes('depression')} onChange={handleInputChange} /> Depression
          </label>
          <label>
            <input type="checkbox" name="breastfeedingConcerns" value="hiv" checked={formValues.breastfeedingConcerns.includes('hiv')} onChange={handleInputChange} /> HIV (Do NOT ask. Only checked if voluntarily shared by client)
          </label>
          <label>
            <input type="checkbox" name="breastfeedingConcerns" value="concern" checked={formValues.breastfeedingConcerns.includes('concern')} onChange={handleInputChange} /> No Concerns
          </label>
          {/* ...other conditions... */}
        </fieldset>

        {/* Nutrition History */}
        <fieldset>
          <legend>Nutrition History</legend>

          {/* Number of Meals Per Day */}
          <div className="form-group">
            <label>1. Number of meals per day</label>
            <div className="input-group">
              {Array.from({ length: 6 }, (_, i) => (
                <label key={i}>
                  <input type="radio" name="mealsPerDay" value={i} checked={formValues.mealsPerDay === i.toString()} onChange={handleInputChange} /> {i === 5 ? '5 or more' : i}
                </label>
              ))}
            </div>
          </div>

          {/* Number of Snacks Per Day */}
          <div className="form-group">
            <label>2. Number of snacks per day</label>
            <div className="input-group">
              {Array.from({ length: 6 }, (_, i) => (
                <label key={i}>
                  <input type="radio" name="snacksPerDay" value={i} checked={formValues.snacksPerDay === i.toString()} onChange={handleInputChange} /> {i === 5 ? '5 or more' : i}
                </label>
              ))}
            </div>
          </div>

          {/* Milk Per Day */}
          <div className="form-group">
            <label>3. Milk per day</label>
            <div className="input-group">
              {Array.from({ length: 6 }, (_, i) => (
                <label key={i}>
                  <input type="radio" name="milkPerDay" value={i} checked={formValues.milkPerDay === i.toString()} onChange={handleInputChange} /> {i === 5 ? '5 or more' : i}
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <label>Appetite</label>
        <label>
          <input type="radio" name="appetite" value="good" checked={formValues.appetite === 'good'} onChange={handleInputChange} /> Good
        </label>
        <label>
          <input type="radio" name="appetite" value="fair" checked={formValues.appetite === 'fair'} onChange={handleInputChange} /> Fair
        </label>
        <label>
          <input type="radio" name="appetite" value="poor" checked={formValues.appetite === 'poor'} onChange={handleInputChange} /> Poor
        </label>

        <label htmlFor="specialDiet">A special diet</label>
        <input type="text" id="specialDiet" name="specialDiet" value={formValues.specialDiet} onChange={handleInputChange} />

        <label>Fast Food per week</label>
        <label>
          <input type="radio" name="fastFoodFrequency" value="yes" checked={formValues.fastFoodFrequency === 'yes'} onChange={handleInputChange} /> Yes
        </label>
        <label>
          <input type="radio" name="fastFoodFrequency" value="no" checked={formValues.fastFoodFrequency === 'no'} onChange={handleInputChange} /> No
        </label>
        <label htmlFor="fastFoodDetails">If yes, what kind?</label>
        <input type="text" id="fastFoodDetails" name="fastFoodDetails" value={formValues.fastFoodDetails} onChange={handleInputChange} />

        {/* Food Allergies */}
        <div className="form-group">
          <label>7. Food allergies</label>
          <div className="input-group">
            <label>
              <input type="radio" name="foodAllergies" value="yes" checked={formValues.foodAllergies === 'yes'} onChange={handleInputChange} /> Yes
            </label>
            <label>
              <input type="radio" name="foodAllergies" value="no" checked={formValues.foodAllergies === 'no'} onChange={handleInputChange} /> No
            </label>
          </div>
          <label htmlFor="foodAllergiesDetails">If yes, what kind?</label>
          <input type="text" id="foodAllergiesDetails" name="foodAllergiesDetails" value={formValues.foodAllergiesDetails} onChange={handleInputChange} />
        </div>

        {/* Daily Consumption */}
        <div className="form-group">
          <label>8. Consume every day or most days?</label>
          <div className="input-group">
            <label>Milk <input type="text" name="dailyConsumptionMilk" value={formValues.dailyConsumptionMilk} onChange={handleInputChange} /></label>
            <label>Pop or other sweetened beverages <input type="text" name="dailyConsumptionSweetenedBeverages" value={formValues.dailyConsumptionSweetenedBeverages} onChange={handleInputChange} /></label>
            <label>Sweets or salty snacks <input type="text" name="dailyConsumptionSnacks" value={formValues.dailyConsumptionSnacks} onChange={handleInputChange} /></label>
            {/* Add more items as necessary */}
          </div>
        </div>

        {/* Check all that apply */}
        <div className="form-group">
          <label>9. Check all that apply</label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="unpasteurizedJuiceOrMilk" value="unpasteurizedJuiceOrMilk" checked={formValues.unpasteurizedJuiceOrMilk.includes('unpasteurizedJuiceOrMilk')} onChange={handleInputChange} /> Unpasteurized juice or milk
            </label>
            <label>
              <input type="checkbox" name="softCheese" value="softCheese" checked={formValues.softCheese.includes('softCheese')} onChange={handleInputChange} /> Soft cheese
            </label>
            <label>
              <input type="checkbox" name="raw" value="raw" checked={formValues.raw.includes('raw')} onChange={handleInputChange} /> Raw/undercooked meat, fish, poultry, or eggs
            </label>
            <label>
              <input type="checkbox" name="fish" value="fish" checked={formValues.fish.includes('fish')} onChange={handleInputChange} /> Michigan fish
            </label>
            <label>
              <input type="checkbox" name="sprouts" value="sprouts" checked={formValues.sprouts.includes('sprouts')} onChange={handleInputChange} /> Raw Sprouts
            </label>
            <label>
              <input type="checkbox" name="refmeat" value="refmeat" checked={formValues.refmeat.includes('refmeat')} onChange={handleInputChange} /> Refrigerated pate/meat spreads
            </label>
            <label>
              <input type="checkbox" name="hotdogs" value="hotdogs" checked={formValues.hotdogs.includes('hotdogs')} onChange={handleInputChange} /> Hot dogs/lunchmeats
            </label>
            <label>
              <input type="checkbox" name="napplys" value="napplys" checked={formValues.napplys.includes('napplys')} onChange={handleInputChange} /> None apply
            </label>
            {/* Add more items as necessary */}
          </div>
        </div>

        <fieldset>
          <legend>10. Check all that apply</legend>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="dietType" value="vegetarian" checked={formValues.dietType.includes('vegetarian')} onChange={handleInputChange} /> Vegetarian diet
            </label>
            <label>
              <input type="checkbox" name="dietType" value="lowCalorie" checked={formValues.dietType.includes('lowCalorie')} onChange={handleInputChange} /> Low calorie/weight loss diet
            </label>
            <label>
              <input type="checkbox" name="dietType" value="lowCarb" checked={formValues.dietType.includes('lowCarb')} onChange={handleInputChange} /> Low-carbohydrate, high protein diet
            </label>
            <label>
              <input type="checkbox" name="dietType" value="vitamin" checked={formValues.dietType.includes('vitamin')} onChange={handleInputChange} /> Vitamin/mineral/Iodine supplement daily
            </label>
            <label>
              <input type="checkbox" name="dietType" value="herbTea" checked={formValues.dietType.includes('herbTea')} onChange={handleInputChange} /> Herbal supplement remedies/teas
            </label>
            <label>
              <input type="checkbox" name="dietType" value="bariatric" checked={formValues.dietType.includes('bariatric')} onChange={handleInputChange} />Bariatric surgery
            </label>
            <label>
              <input type="checkbox" name="dietType" value="pica" checked={formValues.dietType.includes('pica')} onChange={handleInputChange} /> PICA
            </label>
            <label>
              <input type="checkbox" name="dietType" value="fluoride" checked={formValues.dietType.includes('fluoride')} onChange={handleInputChange} /> Fluoride
            </label>
            <label>
              <input type="checkbox" name="dietType" value="napp" checked={formValues.dietType.includes('napp')} onChange={handleInputChange} /> None apply
            </label>
          </div>
          <label htmlFor="dietTypeDetails">If any, what kind?</label>
          <input type="text" id="dietTypeDetails" name="dietTypeDetails" value={formValues.dietTypeDetails} onChange={handleInputChange} />
        </fieldset>

      </form>
    </div>
  );
}

export default NutHistoryReadOnly;