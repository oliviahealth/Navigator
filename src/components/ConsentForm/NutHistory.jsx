import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ConsentFormStyles/NutHistoryStyle.css';
// Import any additional components or hooks you may need

function NutHistory() {
  const [formValues, setFormValues] = useState({
    // Initialize your state with all the fields you have in the form.
    // For example:
    todayDate: '',
    yourName: '',
    educationLevel: '',
    maritalStatus: false,
    // ...other fields
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle the change for checkboxes differently
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the formData here
    console.log(formValues);
    // After processing your form you can navigate to the Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="nut-history-form">
      <h1>Nutrition History and Assessment</h1>
      
      <form>
        {/* Basic information */}
        <label htmlFor="todays-date">Today's Date</label>
        <input type="date" id="todays-date" name="todaysDate" />

        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="education-level">How many grades of school have you completed?</label>
        <input type="text" id="education-level" name="educationLevel" />

        {/* Marital Status */}
        <fieldset>
          <legend>Are you currently?</legend>
          <label>
            <input type="radio" name="maritalStatus" value="married" /> Married
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="unmarried" /> Unmarried
          </label>
        </fieldset>

        {/* Ethnicity and Race */}
        <label>Are you Hispanic or Latino?</label>
        <label>
          <input type="radio" name="ethnicity" value="hispanic" /> Yes
        </label>
        <label>
          <input type="radio" name="ethnicity" value="notHispanic" /> No
        </label>

        <label>Race: Select one or more:</label>
        <div>
          <label>
            <input type="checkbox" name="race" value="americanIndian" /> American Indian or Alaska Native
          </label>
          <label>
            <input type="checkbox" name="race" value="asian" /> Asian
          </label>
          {/* ...additional races... */}
        </div>

        {/* Pregnancy Information */}
        <label htmlFor="last-menstrual-period">What was the date of your last menstrual period?</label>
        <input type="date" id="last-menstrual-period" name="lastMenstrualPeriod" />

        <label htmlFor="due-date">When is your baby due?</label>
        <input type="date" id="due-date" name="dueDate" />

        <label htmlFor="prepregnancy-weight">What was your weight just before you became pregnant with this baby?</label>
        <input type="text" id="prepregnancy-weight" name="prepregnancyWeight" placeholder="pounds" />


        {/* Pregnancy History */}
        <label htmlFor="number-pregnancies">Number of pregnancies (including this pregnancy)</label>
        <input type="number" id="number-pregnancies" name="numberPregnancies" />

        <label htmlFor="number-live-babies">Number of live babies (not including this pregnancy)</label>
        <input type="number" id="number-live-babies" name="numberLiveBabies" />

        <label>How many times have you been pregnant for 20 weeks or more before this pregnancy?</label>
        <input type="number" name="pregnantTwentyWeeksCount" />

        {/* Prenatal Care */}
        <fieldset>
        <legend>How many months were you pregnant when you had your first visit for prenatal care from a doctor or a certified nurse midwife for this current/most recent pregnancy?</legend>
        <label>
            <input type="radio" name="prenatalCareMonth" value="firstMonth" /> First month
        </label>
        {/* ...other options... */}
        <label>
            <input type="radio" name="prenatalCareMonth" value="noMedicalCare" /> No Medical Care
        </label>
        </fieldset>

        {/* Check all that apply for this pregnancy */}
        <fieldset>
        <legend>For this pregnancy, check all that apply:</legend>
        <label>
            <input type="checkbox" name="pregnancyConditions" value="weightLoss" /> Weight loss
        </label>
        <label>
            <input type="checkbox" name="pregnancyConditions" value="nausea" /> Nausea and vomiting
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="gdm" /> Gestational Diabetes Mellitus
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="twins" /> Twins or more expected
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="fetal" /> Fetal Growth Restriction
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="hbp" /> High Blood Pressure
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="napply" /> None Apply
          </label>
        </fieldset>

        {/* Health Provider Visits */}
        <label htmlFor="health-provider-visits">How many times have you seen your health provider for this pregnancy?</label>
        <input type="number" id="health-provider-visits" name="healthProviderVisits" />

        {/* HIV Test */}
        <label>Have you been offered a blood test for HIV?</label>
        <label>
        <input type="radio" name="hivTestOffered" value="yes" /> Yes
        </label>
        <label>
        <input type="radio" name="hivTestOffered" value="no" /> No
        </label>

        {/* Previous Pregnancies Conditions */}
        <fieldset>
        <legend>For any previous pregnancies, please check all that occurred:</legend>
        <label>
            <input type="checkbox" name="previousPregnancyConditions" value="gdmHistory" /> History of GDM
        </label>
        {/* ...other conditions... */}
        </fieldset>

        <fieldset>
  <legend>Medical Information</legend>
  
  <label htmlFor="medical-conditions">1. Medical conditions/recent illnesses:</label>
  <div>
    <input type="checkbox" id="medical-conditions-yes" name="medicalConditions" value="yes" />
    <label htmlFor="medical-conditions-yes">Yes</label>
    <input type="checkbox" id="medical-conditions-no" name="medicalConditions" value="no" />
    <label htmlFor="medical-conditions-no">No</label>
  </div>

  <label htmlFor="medications">2. Medications (prescription or non-prescription):</label>
  <div>
    <input type="checkbox" id="medications-yes" name="medications" value="yes" />
    <label htmlFor="medications-yes">Yes</label>
    <input type="checkbox" id="medications-no" name="medications" value="no" />
    <label htmlFor="medications-no">No</label>
    {/* Conditional text input for medication details */}
  </div>

  <label htmlFor="dental-problems">3. Dental problems affecting eating?</label>
  <div>
    <input type="checkbox" id="dental-problems-yes" name="dentalProblems" value="yes" />
    <label htmlFor="dental-problems-yes">Yes</label>
    <input type="checkbox" id="dental-problems-no" name="dentalProblems" value="no" />
    <label htmlFor="dental-problems-no">No</label>
    {/* Conditional text input for dental problem details */}
  </div>

  {/* ... other questions like multivitamin intake ... */}

  <label htmlFor="cigarettes-prepregnancy">6. In the 3 months before you were pregnant, how many cigarettes did you smoke on an average day?</label>
  <input type="number" id="cigarettes-prepregnancy" name="cigarettesPrepregnancy" />

  <label htmlFor="cigarettes-currently">7. How many cigarettes do you smoke on an average day now?</label>
  <input type="number" id="cigarettes-currently" name="cigarettesCurrently" />

  {/* ... other questions about household smoking and alcohol consumption ... */}
</fieldset><fieldset>
  <legend>4. In the month before this pregnancy, how many times did you take a multivitamin?</legend>
  <label>
    <input type="radio" name="multivitaminIntake" value="lessThanOncePerWeek" /> Less than once per week
  </label>
  <label>
    <input type="radio" name="multivitaminIntake" value="oneToSevenTimesPerWeek" /> 1-7 times per week
  </label>
  <label>
    <input type="radio" name="multivitaminIntake" value="eightOrMoreTimesPerWeek" /> 8 or more times per week
  </label>
  <label>
    <input type="radio" name="multivitaminIntake" value="unknown" /> Unknown
  </label>
</fieldset>

{/* Vitamin and Mineral Intake in the Past Month */}
<label htmlFor="vitaminIntakePastMonth">5. Have you taken any vitamins or minerals in the past month?</label>
<div>
  <label>
    <input type="radio" id="vitaminIntakePastMonthYes" name="vitaminIntakePastMonth" value="yes" /> Yes
  </label>
  <label>
    <input type="radio" id="vitaminIntakePastMonthNo" name="vitaminIntakePastMonth" value="no" /> No
  </label>
  <label>
    <input type="radio" id="vitaminIntakePastMonthUnknown" name="vitaminIntakePastMonth" value="unknown" /> Unknown
  </label>
</div>
<label>6. In the 3 months before you were pregnant, how many cigarettes did you smoke on an average day?</label>
<div>
  <label>
    <input type="radio" name="smokingBeforePregnancy" value="doNotSmoke" /> Do not smoke
  </label>
  <label>
    <input type="radio" name="smokingBeforePregnancy" value="smokedButQuantityUnknown" /> Smoked, but quantity unknown
  </label>
  <label>
    <input type="radio" name="smokingBeforePregnancy" value="unknownOrRefused" /> Unknown or refused
  </label>
</div>
<label htmlFor="cigarettesPerDay">Number of Cigarettes per day (1 - 96)</label>
<input type="number" id="cigarettesPerDay" name="cigarettesPerDay" min="1" max="96" />

{/* Current Smoking Habits */}
<label>7. How many cigarettes do you smoke on an average day now?</label>
<div>
  <label>
    <input type="radio" name="currentSmoking" value="doNotSmokeNow" /> Do not smoke
  </label>
  <label>
    <input type="radio" name="currentSmoking" value="smokedButQuantityUnknownNow" /> Smoked, but quantity unknown
  </label>
  <label>
    <input type="radio" name="currentSmoking" value="unknownOrRefusedNow" /> Unknown or refused
  </label>
</div>

{/* Exposure to Secondhand Smoke */}
<label>8. Does anyone else living inside your household smoke inside the home?</label>
<div>
  <label>
    <input type="radio" name="householdSmoking" value="yes" /> Yes, someone else smokes inside the home
  </label>
  <label>
    <input type="radio" name="householdSmoking" value="no" /> No, no one else smokes inside the home
  </label>
  <label>
    <input type="radio" name="householdSmoking" value="unknown" /> Unknown
  </label>
</div>

{/* Alcohol Consumption Before Pregnancy */}
<label>9. In the 3 months before you got pregnant, how many alcoholic drinks did you have in an average week?</label>
<div>
  <label>
    <input type="radio" name="alcoholBeforePregnancy" value="didNotDrink" /> Did not drink
  </label>
  <label>
    <input type="radio" name="alcoholBeforePregnancy" value="drankButQuantityUnknown" /> Drank, but quantity unknown
  </label>
  <label>
    <input type="radio" name="alcoholBeforePregnancy" value="unknownOrRefusedAlcohol" /> Unknown or refused
  </label>
</div>
<label>10. Alcohol during pregnancy?</label>
<div>
  <label>
    <input type="radio" name="alcoholDuringPregnancy" value="yes" /> Yes
  </label>
  <label>
    <input type="radio" name="alcoholDuringPregnancy" value="no" /> No
  </label>
</div>

{/* Substance Use */}
<fieldset>
  <legend>11. Are you currently (check all that apply)?</legend>
  <label>
    <input type="checkbox" name="substanceUse" value="illegalSubstances" /> Using any illegal substance
  </label>
  <label>
    <input type="checkbox" name="substanceUse" value="marijuana" /> Using marijuana in any form
  </label>
  <label>
    <input type="checkbox" name="substanceUse" value="prescriptionMedications" /> Abusing any prescription medications
  </label>
  <label>
    <input type="checkbox" name="substanceUse" value="none" /> None
  </label>
</fieldset>

{/* Feeding Decision Limitation */}
<label htmlFor="feedingDecisionLimitation">12. Any other physical disability, mental health condition or intellectual disability limiting ability to make appropriate feeding decisions and/or prepare food?</label>
<div>
  <label>
    <input type="radio" id="feedingDecisionLimitationYes" name="feedingDecisionLimitation" value="yes" /> Yes
  </label>
  <label>
    <input type="radio" id="feedingDecisionLimitationNo" name="feedingDecisionLimitation" value="no" /> No
  </label>
</div>

<fieldset>
  <legend>1. Have you ever breastfed or pumped breast milk to feed any of your children?</legend>
  <label>
    <input type="radio" name="breastfedBefore" value="yes" /> Yes
  </label>
  <label>
    <input type="radio" name="breastfedBefore" value="no" /> No
  </label>
</fieldset>

<fieldset>
  <legend>2. Are you currently breastfeeding or pumping breast milk?</legend>
  <label>
    <input type="radio" name="currentlyBreastfeeding" value="yes" /> Yes
  </label>
  <label>
    <input type="radio" name="currentlyBreastfeeding" value="no" /> No
  </label>
</fieldset>

<div>
  <label htmlFor="babyAge">a. Is the baby less than one year old?</label>
  <input type="text" id="babyAge" name="babyAge" />
</div>

<div>
  <label htmlFor="breastfeedingMoreThanOneChild">b. Are you breastfeeding or pumping milk for more than one child?</label>
  <input type="text" id="breastfeedingMoreThanOneChild" name="breastfeedingMoreThanOneChild" />
</div>



{/* Reasons for Not Breastfeeding as Long as Desired */}
<fieldset>
  <legend>3. Did you breastfeed as long as you desired? If no, Why?</legend>
  <label>
    <input type="radio" name="breastfeedDuration" value="yes" /> Yes
  </label>
  <label>
    <input type="radio" name="breastfeedDuration" value="no" /> No
  </label>
  {/* Add more checkbox or input fields here based on the "If no, why?" section */}
  <label>
    <input type="checkbox" name="breastfeedDurationReason" value="difficultyLatching" /> My baby had difficulty latching or nursing
  </label>
  <label>
    <input type="checkbox" name="breastfeedDurationReason" value="medicalReasons" /> I got sick or I had to stop for medical reasons
  </label>
  <label>
    <input type="checkbox" name="breastfeedDuration" value="duration" />
    </label>
    <div>
    <label>3. Did you breastfeed as long as you desired?</label>
    <label>
      <input type="radio" name="breastfeedDuration" value="yes" /> Yes
    </label>
    <label>
      <input type="radio" name="breastfeedDuration" value="no" /> No
    </label>
    <div>
      {/* Conditional questions if 'No' is selected */}
      <label>If no, why?</label>
      <div className="checkbox-group">
        <label>
          <input type="checkbox" name="reasonForStopping" value="difficultLatching" /> My baby had difficulty latching or nursing
        </label>
        {/* ...additional reasons... */}
        <label>
          <input type="checkbox" name="reasonForStopping" value="notEnoughMilk" /> Breast milk alone did not satisfy my baby
        </label>
        <label>
          <input type="checkbox" name="reasonForStopping" value="wentBackToWork" /> I went back to work
        </label>
        {/* ...additional reasons... */}
      </div>
    </div>
  </div>

  <label htmlFor="breastfeedingInformation">4. What have you heard about breastfeeding?</label>
  <input type="text" id="breastfeedingInformation" name="breastfeedingInformation" />

  <label htmlFor="feedingPlan">5. How are you thinking of feeding your baby?</label>
  <input type="text" id="feedingPlan" name="feedingPlan" />

  <label>6. Are you interested in receiving more information about breastfeeding?</label>
  <label>
    <input type="radio" name="infoOnBreastfeeding" value="yes" /> Yes
  </label>
  <label>
    <input type="radio" name="infoOnBreastfeeding" value="no" /> No
  </label>
    

</fieldset>
{/* Breastfeeding Assessment */}
<fieldset>
  <legend>Breastfeeding Assessment</legend>
  <label>
    <input type="checkbox" name="breastfeedingConcerns" value="breastSurgery" /> Breast Surgery/Trauma
  </label>
  {/* ...other conditions... */}
  <label>
    <input type="checkbox" name="breastfeedingConcerns" value="hypothyroidism" /> Hypothyroidism
  </label>
  <label>
    <input type="checkbox" name="breastfeedingConcerns" value="diabetes" /> Diabetes
  </label>
  <label>
    <input type="checkbox" name="breastfeedingConcerns" value="depression" /> Depression
  </label>
  <label>
    <input type="checkbox" name="breastfeedingConcerns" value="hiv" /> HIV(Do NOT ask. Only checked if volunttarily shared by client)
  </label>
  <label>
    <input type="checkbox" name="breastfeedingConcerns" value="concern" /> No Conserns
  </label>
  {/* ...other conditions... */}
</fieldset>

{/* Nutrition History */}
<fieldset>
  {/* Nutrition History */}
<fieldset>
  <legend>Nutrition History</legend>
  
  {/* Number of Meals Per Day */}
  <div className="form-group">
    <label>1. Number of meals per day</label>
    <div className="input-group">
      {Array.from({ length: 6 }, (_, i) => (
        <label key={i}>
          <input type="radio" name="mealsPerDay" value={i} /> {i === 5 ? '5 or more' : i}
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
          <input type="radio" name="snacksPerDay" value={i} /> {i === 5 ? '5 or more' : i}
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
          <input type="radio" name="milkPerDay" value={i} /> {i === 5 ? '5 or more' : i}
        </label>
      ))}
    </div>
  </div>
</fieldset>

  
  <label>Appetite</label>
  <label>
    <input type="radio" name="appetite" value="good" /> Good
  </label>
  <label>
    <input type="radio" name="appetite" value="fair" /> Fair
  </label>
  <label>
    <input type="radio" name="appetite" value="poor" /> Poor 
  </label>

  <label htmlFor="specialDiet"> A special diet</label>
  <input type="text" id="specialDiet" name="specialDiet" />
  
  <label>Fast Food per week</label>
  <label>
    <input type="radio" name="fastFoodFrequency" value="yes" /> Yes
  </label>
  <label>
    <input type="radio" name="fastFoodFrequency" value="no" /> No
  </label>
  <label htmlFor="fastFoodDetails">If yes, what kind?</label>
  <input type="text" id="fastFoodDetails" name="fastFoodDetails" />

  {/* Food Allergies */}
<div className="form-group">
  <label>7. Food allergies</label>
  <div className="input-group">
    <label>
      <input type="radio" name="foodAllergies" value="yes" /> Yes
    </label>
    <label>
      <input type="radio" name="foodAllergies" value="no" /> No
    </label>
  </div>
  <label htmlFor="foodAllergiesDetails">If yes, what kind?</label>
  <input type="text" id="foodAllergiesDetails" name="foodAllergiesDetails" />
</div>

{/* Daily Consumption */}
<div className="form-group">
  <label>8. Consume every day or most days?</label>
  <div className="input-group">
    <label>Milk <input type="text" name="dailyConsumptionMilk" /></label>
    <label>Pop or other sweetened beverages <input type="text" name="dailyConsumptionSweetenedBeverages" /></label>
    <label>Sweets or salty snacks <input type="text" name="dailyConsumptionSnacks" /></label>
    {/* Add more items as necessary */}
  </div>
</div>

{/* Check all that apply */}
<div className="form-group">
  <label>9. Check all that apply</label>
  <div className="checkbox-group">
    <label>
      <input type="checkbox" name="unpasteurizedJuiceOrMilk" /> Unpasteurized juice or milk
    </label>
    <label>
      <input type="checkbox" name="softCheese" /> Soft cheese
    </label>
    <label>
      <input type="checkbox" name="raw" /> Raw/undercooked meat, fish, poultry, or eggs
    </label>
    <label>
      <input type="checkbox" name="fish" /> Michigan fish
    </label>
    <label>
      <input type="checkbox" name="sprouts" /> Raw Sprouts
    </label>
    <label>
      <input type="checkbox" name="refmeat" /> Refrigerated pate/meat spreads
    </label>
    <label>
      <input type="checkbox" name="hotdogs" /> Hot dogs/lunchmeats
    </label>
    <label>
      <input type="checkbox" name="napplys" /> None apply
    </label>
    {/* Add more items as necessary */}
  </div>
</div>

{/* Diet Types */}
<div className="form-group">
  <label>10. Check all that apply</label>
  <div className="checkbox-group">
    <label>
      <input type="checkbox" name="dietType" value="vegetarian" /> Vegetarian diet
    </label>
    <label>
      <input type="checkbox" name="dietType" value="lowCalorie" /> Low calorie/weight loss diet
    </label>
    <label>
      <input type="checkbox" name="dietType" value="lowCarb" /> Low-carbohydrate, high protein diet
    </label>
    <label>
      <input type="checkbox" name="dietType" value="vitamin" /> Vitamin/mineral/Iodine supplement daily
    </label>
    <label>
      <input type="checkbox" name="dietType" value="herbTea" /> Herbal supplement remedies/teas
    </label>

    <label>
      <input type="checkbox" name="dietType" value="bariatic" />Bariatric surgery
    </label>

    <label>
      <input type="checkbox" name="dietType" value="pica" /> PICA
    </label>

    <label>
      <input type="checkbox" name="dietType" value="fluoride" /> Fluoride
    </label>

    <label>
      <input type="checkbox" name="dietType" value="napp" /> None apply
    </label>
    {/* Add more items as necessary */}
  </div>
  <label htmlFor="dietTypeDetails">If any, what kind?</label>
  <input type="text" id="dietTypeDetails" name="dietTypeDetails" />
</div>

</fieldset>

{/* ... continue with additional questions ... */}

        <button type="submit">Submit</button>
            </form>
            </div>
        );
        }

export default NutHistory;