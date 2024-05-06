import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

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
    dailyConsumptionSnacks: [],
    unpasteurizedJuiceOrMilk: false,
    softCheese: false,
    rawMeat: false,
    fish: false,
    sprouts: false,
    refmeat: false,
    hotdogs: false,
    napplys: false,
    dietType: [],
    dietTypeDetails: '',
    cigarettesPrepregnancy: '',
    vitaminsPrepregnancy:'',
    cigarettesCurrently:'',
    takeVitamins:'',
    cigarettesSomeoneElse:'',
    alcoholBeforePregnancy:'',
    alcoholBeforePregnancy:'',
    currentConditions:[],
    breastFedChildren:'',
    currentBreastfeeding:'',
    babyLessThanOneYear: '',
    breastfeedingMoreThanOneChild: '',
    fromSamePregnancy: false,
    fromDifferentPregnancies: false,
    breastFeedLength:'',
    noBreastFeedReasons:[],
    medicalConcernsBreastfeeding: [],
    additionalBreastfeedingInfo:'',
    feedingMethods: '',
    alcoholAmount: '', 
    medicalConditions: '',
    medicalConditionsDetails: '',
    medications: '',
    medicationsDetails: '',
    dentalProblems: '',
    dentalProblemsDetails: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      const accessToken = Cookies.get('accessToken');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/nut_history/${patientId}/${log_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          credentials: 'omit',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 204) { // Handling no content
          return;
        }
        const data = await response.json();
        setFormValues(data[2])

      } catch (error) {
        console.error('failed to fetch');
      }
    };

    fetchLog();
  }, [patientId, log_id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      
      if (Array.isArray(formValues[name])) {
        setFormValues(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormValues(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (type === 'radio') {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (name === 'numberPregnancies' || name === 'numberLiveBabies' || name === 'pregnantTwentyWeeksCount' ||
               name === 'healthProviderVisits' || name === 'babyAge' || name === 'mealsPerDay' || name === 'snacksPerDay' || 
               name === 'milkPerDay') {
      if (value && (isNaN(value) || parseInt(value, 10) < 0)) {
        return;
      }
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  

  return (
    <div className="nut-history-form">
      
      <form>
      <h1>Nutrition History and Assessment</h1>
        <label htmlFor="todays-date">Today's Date</label>
        <input type="date" id="todays-date" name="todayDate" value={formValues.todayDate} disabled />

        <label htmlFor="name">Participant Name:</label>
        <input type="text" id="name" name="yourName" value={formValues.yourName} disabled />

        <label htmlFor="education-level">Education Level</label>
        <input type="text" id="education-level" name="educationLevel" value={formValues.educationLevel} disabled />

        <fieldset>
          <legend>Marital Status</legend>
          <label>
            <input type="radio" name="maritalStatus" value="married" checked={formValues.maritalStatus === 'married'} disabled /> Married
          </label>
          <label>
            <input type="radio" name="maritalStatus" value="unmarried" checked={formValues.maritalStatus === 'unmarried'} disabled /> Unmarried
          </label>
        </fieldset>

        <label>Are you Hispanic or Latino?</label>
        <label>
          <input type="radio" name="ethnicity" value="hispanic" checked={formValues.ethnicity === 'hispanic'} disabled /> Yes
        </label>
        <label>
          <input type="radio" name="ethnicity" value="notHispanic" checked={formValues.ethnicity === 'notHispanic'} disabled /> No
        </label>

        <label>Race: Select one or more:</label>
        <div>
          <label>
            <input type="checkbox" name="race" value="americanIndian" checked={formValues.race.includes('americanIndian')} disabled /> American Indian or Alaska Native
          </label>
          <label>
            <input type="checkbox" name="race" value="asian" checked={formValues.race.includes('asian')} disabled /> Asian
          </label>
          <label>
            <input type="checkbox" name="race" value="Black" checked={formValues.race.includes('Black')} disabled /> Black or African American
          </label>
          <label>
            <input type="checkbox" name="race" value="whiteEuro" checked={formValues.race.includes('whiteEuro')} disabled /> White European
          </label>
          <label>
            <input type="checkbox" name="race" value="northAfrican" checked={formValues.race.includes('northAfrican')} disabled /> North African
          </label>
          <label>
            <input type="checkbox" name="race" value="middleEastern" checked={formValues.race.includes('middleEastern')} disabled /> Middle Eastern
          </label>
          <label>
            <input type="checkbox" name="race" value="nativeIsland" checked={formValues.race.includes('nativeIsland')} disabled /> Native Hawaian or other Pacific Islander
          </label>
        </div>

        <fieldset>
          <legend>Pregnancy Information</legend>
        <label htmlFor="last-menstrual-period">Date of your last menstrual period:</label>
        <input type="date" id="last-menstrual-period" name="lastMenstrualPeriod" value={formValues.lastMenstrualPeriod} disabled />

        <label htmlFor="due-date">When is your baby due?</label>
        <input type="date" id="due-date" name="dueDate" value={formValues.dueDate} disabled />

        <label htmlFor="prepregnancy-weight">Pre-pregnancy Weight</label>
        <input type="text" id="prepregnancy-weight" name="prepregnancyWeight" placeholder="pounds" value={formValues.prepregnancyWeight} disabled />

        <label htmlFor="number-pregnancies">Number of pregnancies (including this one)</label>
        <input type="number" id="number-pregnancies" name="numberPregnancies" value={formValues.numberPregnancies} disabled />

        <label htmlFor="number-live-babies">Number of live babies (not including this pregnancy)</label>
        <input type="number" id="number-live-babies" name="numberLiveBabies" value={formValues.numberLiveBabies} disabled />

        <label>How many times have you been pregnant for 20 weeks or more before this pregnancy?</label>
        <input type="number" name="pregnantTwentyWeeksCount" value={formValues.pregnantTwentyWeeksCount} disabled />
        <label>How many months were you pregnant when you had your first visit for prenatal care from a doctor or a certified nurse midwife for this current/most recent pregnancy? </label>
        <input type="number" name="prenatalCareMonth" value={formValues.prenatalCareMonth} disabled />
        </fieldset>
        <fieldset>
          <legend>For this pregnancy, check all that apply:</legend>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="weightLoss" checked={formValues.pregnancyConditions.includes('weightLoss')} disabled /> Weight loss
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="nausea" checked={formValues.pregnancyConditions.includes('nausea')} disabled /> Nausea and vomiting
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="gestDiaMellitus" checked={formValues.pregnancyConditions.includes('gestDiaMellitus')} disabled /> Gestational Diabetes Mellitus
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="twins" checked={formValues.pregnancyConditions.includes('twins')} disabled /> Twins or more expected
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="fetalRestrict" checked={formValues.pregnancyConditions.includes('fetalRestrict')} disabled /> Fetal Growth Restriction
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="highBlood" checked={formValues.pregnancyConditions.includes('highBlood')} disabled /> High Blood Pressure
          </label>
        </fieldset>

        <label htmlFor="health-provider-visits">Number of visits to your health provider for this pregnancy:</label>
        <input type="number" id="health-provider-visits" name="healthProviderVisits" value={formValues.healthProviderVisits} disabled />

        <label>Have you been offered a blood test for HIV?</label>
        <label>
          <input type="radio" name="hivTestOffered" value="yes" checked={formValues.hivTestOffered === 'yes'} disabled /> Yes
        </label>
        <label>
          <input type="radio" name="hivTestOffered" value="no" checked={formValues.hivTestOffered === 'no'} disabled /> No
        </label>

        <fieldset>
          <legend>For any previous pregnancies, please check all that occurred:</legend>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="gdmHistory" checked={formValues.previousPregnancyConditions.includes('gdmHistory')} disabled /> History of GDM
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="pretermDelivery" checked={formValues.previousPregnancyConditions.includes('pretermDelivery')} disabled />Preterm delivery ({'<'} 37 weeks)
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="earlyDelivery" checked={formValues.previousPregnancyConditions.includes('earlyDelivery')} disabled /> Early term delivery (37 to {'<'} 39 weeks)
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="5poundInfant" checked={formValues.previousPregnancyConditions.includes('5poundInfant')} disabled /> Infant 5 pounds, 8 ounces or less
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="deceasedInfantFiveMonth" checked={formValues.previousPregnancyConditions.includes('deceasedInfantFiveMonth')} disabled /> Infant died after 5 months of PG
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="preeclampsia" checked={formValues.previousPregnancyConditions.includes('preeclampsia')} disabled /> History of Preeclampsia
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="deceasedInfantOneMonth" checked={formValues.previousPregnancyConditions.includes('deceasedInfantOneMonth')} disabled /> Infant born alive, but died before 1 month 
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="miscarriage" checked={formValues.previousPregnancyConditions.includes('miscarriage')} disabled /> Miscarriage
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="birthDefect" checked={formValues.previousPregnancyConditions.includes('birthDefect')} disabled />Congenital/birth defects
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="9poundInfant" checked={formValues.previousPregnancyConditions.includes('9poundInfant')} disabled /> Infant 9 pounds or more at birth
          </label>
          <label>
            <input type="checkbox" name="previousPregnancyConditions" value="noneApply" checked={formValues.previousPregnancyConditions.includes('noneApply')} disabled /> None apply
          </label>
        </fieldset>
        <h3>Medical Information</h3>
        <fieldset>
          
        <label htmlFor="medical-conditions-yes">Medical conditions/recent illnesses:</label>
    <input type="radio" id="medical-conditions-yes" name="medicalConditions" value="yes"
           checked={formValues.medicalConditions === 'yes'} disabled />
    <label htmlFor="medical-conditions-yes">Yes</label>
    <input type="radio" id="medical-conditions-no" name="medicalConditions" value="no"
           checked={formValues.medicalConditions === 'no'} disabled />
    <label htmlFor="medical-conditions-no">No</label>
    {formValues.medicalConditions === 'yes' && (
        <input type="text" name="medicalConditionsDetails" value={formValues.medicalConditionsDetails}
               disabled placeholder="Specify conditions" />
    )}

    <label htmlFor="medications-yes">Medications (prescription or non-prescription):</label>
    <input type="radio" id="medications-yes" name="medications" value="yes"
           checked={formValues.medications === 'yes'} disabled />
    <label htmlFor="medications-yes">Yes</label>
    <input type="radio" id="medications-no" name="medications" value="no"
           checked={formValues.medications === 'no'} disabled />
    <label htmlFor="medications-no">No</label>
    {formValues.medications === 'yes' && (
        <input type="text" name="medicationsDetails" value={formValues.medicationsDetails}
               disabled placeholder="Specify medications" />
    )}

    <label htmlFor="dental-problems-yes">Dental problems affecting eating?</label>
    <input type="radio" id="dental-problems-yes" name="dentalProblems" value="yes"
           checked={formValues.dentalProblems === 'yes'} disabled />
    <label htmlFor="dental-problems-yes">Yes</label>
    <input type="radio" id="dental-problems-no" name="dentalProblems" value="no"
           checked={formValues.dentalProblems === 'no'} disabled />
    <label htmlFor="dental-problems-no">No</label>
    {formValues.dentalProblems === 'yes' && (
        <input type="text" name="dentalProblemsDetails" value={formValues.dentalProblemsDetails}
               disabled placeholder="Specify dental issues" />
    )}

          <label htmlFor="cigarettes-prepregnancy">In the month before you were pregnant, how times did you take multivitamins?</label>
          <input type="number" id="cigarettes-prepregnancy" name="vitaminsPrepregnancy" value={formValues.cigarettesPrepregnancy} disabled />
          
          <label htmlFor="cigarettes-prepregnancy">Have you taken any vitamins or minerals in the past month?</label>
          <input type="radio" id="dental-problems-yes" name="takeVitamins" value="yes" checked={formValues.takeVitamins.includes('yes')} disabled />
          <label htmlFor="dental-problems-yes">Yes</label>

          <input type="radio" id="dental-problems-no" name="takeVitamins" value="no" checked={formValues.takeVitamins.includes('no')} disabled />
          <label htmlFor="dental-problems-no">No</label>

          <label htmlFor="cigarettes-prepregnancy">In the 3 months before you were pregnant, how many cigarettes did you smoke on an average day?</label>
          <input type="number" id="cigarettes-prepregnancy" name="cigarettesPrepregnancy" value={formValues.cigarettesPrepregnancy} disabled />


          <label htmlFor="cigarettes-currently">Do you smoke on an average day now?</label>
          <input type="radio" id="dental-problems-yes" name="cigarettesCurrently" value="noSmoke" checked={formValues.cigarettesCurrently.includes('noSmoke')} disabled />
          <label htmlFor="dental-problems-yes">Do not smoke</label>

          <input type="radio" id="dental-problems-no" name="cigarettesCurrently" value="smoke" checked={formValues.cigarettesCurrently.includes('smoke')} disabled />
          <label htmlFor="dental-problems-no"> I currently smoke </label>
          <input type="radio" id="dental-problems-no" name="cigarettesCurrently" value="unknown" checked={formValues.cigarettesCurrently.includes('unknown')} disabled />
          <label htmlFor="dental-problems-no">Refuse to answer</label>

          <label htmlFor="cigarettes-currently">Does anyone else living inside your household smoke inside the home? </label>
          <input type="radio" id="dental-problems-yes" name="cigarettesSomeoneElse" value="Smoke" checked={formValues.cigarettesSomeoneElse.includes('Smoke')} disabled />
          <label htmlFor="dental-problems-yes">Yes, Someone else smokes inside the home </label>

          <input type="radio" id="dental-problems-no" name="cigarettesSomeoneElse" value="Nosmoke" checked={formValues.cigarettesSomeoneElse.includes('Nosmoke')} disabled />
          <label htmlFor="dental-problems-no"> No, no one smokes in the home </label>
          <input type="radio" id="dental-problems-no" name="cigarettesSomeoneElse" value="unknown" checked={formValues.cigarettesSomeoneElse.includes('unknown')} disabled />
          <label htmlFor="dental-problems-no">Unknown</label>

          <label htmlFor="cigarettes-prepregnancy">In the 3 months before you got pregnant, how many alcoholic drinks (beer, wine, liquor, wine coolers) did you have in an average week?</label>
          <input type="number" id="cigarettes-prepregnancy" name="alcoholBeforePregnancy" value={formValues.alcoholBeforePregnancy} disabled />

          <label htmlFor="cigarettes-currently">Did you drink alcohol during your pregnancy?</label>
          <input type="radio" id="dental-problems-yes" name="alcoholBeforePregnancy" value="yes" checked={formValues.alcoholBeforePregnancy.includes('yes')} disabled />
          <label htmlFor="dental-problems-yes">Yes</label>

          <input type="radio" id="dental-problems-no" name="alcoholBeforePregnancy" value="no" checked={formValues.alcoholBeforePregnancy.includes('no')} disabled />
          <label htmlFor="dental-problems-no"> No </label>
          {formValues.alcoholBeforePregnancy === 'yes' && (
        <div>
            <label htmlFor="alcoholAmount">If yes, how much?</label>
            <input
                type="text"
                id="alcoholAmount"
                name="alcoholAmount"
                value={formValues.alcoholAmount}
                disabled
                placeholder="Enter amount of alcohol consumed"
            />
        </div>
    )}

          <fieldset>
          <legend>Are you currently (check all that apply)?:</legend>
          <label>
            <input type="checkbox" name="currentConditions" value="illegal" checked={formValues.currentConditions.includes('illegal')} disabled /> Using any illegal substance
          </label>
          <label>
            <input type="checkbox" name="currentConditions" value="abusePrescription" checked={formValues.currentConditions.includes('abusePrescription')} disabled /> Abusing any prescription medications
          </label>
          <label>
            <input type="checkbox" name="currentConditions" value="useMarijuana" checked={formValues.currentConditions.includes('useMarijuana')} disabled /> Using marijuana in any form 
          </label>
          <label>
            <input type="checkbox" name="currentConditions" value="none" checked={formValues.currentConditions.includes('none')} disabled /> None
          </label>
        </fieldset>
        </fieldset>

        <fieldset>
        <h3>Breastfeeding Information</h3>
        <fieldset>
  <legend>Household and Lifestyle</legend>

  <label htmlFor="breastFedChildren">Have you ever breastfed or pumped breast milk to feed any of your children?</label>
  <input type="radio" id="breastFedChildren-yes" name="breastFedChildren" value="yes" 
         checked={formValues.breastFedChildren === 'yes'} disabled />
  <label htmlFor="breastFedChildren-yes">Yes</label>

  <input type="radio" id="breastFedChildren-no" name="breastFedChildren" value="no" 
         checked={formValues.breastFedChildren === 'no'} disabled />
  <label htmlFor="breastFedChildren-no">No</label>

  <label htmlFor="currentBreastfeeding">Are you currently breastfeeding or pumping breast milk?</label>
  <input type="radio" id="currentBreastfeeding-yes" name="currentBreastfeeding" value="yes" 
         checked={formValues.currentBreastfeeding === 'yes'} disabled />
  <label htmlFor="currentBreastfeeding-yes">Yes</label>

  <input type="radio" id="currentBreastfeeding-no" name="currentBreastfeeding" value="no" 
         checked={formValues.currentBreastfeeding === 'no'} disabled />
  <label htmlFor="currentBreastfeeding-no">No</label>

  {formValues.currentBreastfeeding === 'yes' && (
    <>
      <label htmlFor="babyLessThanOneYear">Is the baby less than one year old?</label>
      <input type="radio" id="babyLessThanOneYear-yes" name="babyLessThanOneYear" value="yes" 
             disabled />
      <label htmlFor="babyLessThanOneYear-yes">Yes</label>

      <input type="radio" id="babyLessThanOneYear-no" name="babyLessThanOneYear" value="no" 
             disabled />
      <label htmlFor="babyLessThanOneYear-no">No</label>

      <label htmlFor="breastfeedingMoreThanOneChild">Are you breastfeeding or pumping milk for more than one child?</label>
      <input type="radio" id="breastfeedingMoreThanOneChild-yes" name="breastfeedingMoreThanOneChild" value="yes" 
             disabled />
      <label htmlFor="breastfeedingMoreThanOneChild-yes">Yes</label>

      <input type="radio" id="breastfeedingMoreThanOneChild-no" name="breastfeedingMoreThanOneChild" value="no" 
             disabled />
      <label htmlFor="breastfeedingMoreThanOneChild-no">No</label>

      {formValues.breastfeedingMoreThanOneChild === 'yes' && (
        <>
          <label htmlFor="fromSamePregnancy">From same pregnancy (multiples)?</label>
          <input type="checkbox" id="fromSamePregnancy" name="fromSamePregnancy" 
                 disabled />

          <label htmlFor="fromDifferentPregnancies">From different pregnancies?</label>
          <input type="checkbox" id="fromDifferentPregnancies" name="fromDifferentPregnancies" 
                 disabled />
        </>
      )}
      
    </>
    
  )}
  
    <label htmlFor="breastFeedLength">Did you breastfeed as long as you desired?</label>
    <input type="radio" id="breastFeedLength-yes" name="breastFeedLength" value="yes" 
           checked={formValues.breastFeedLength === 'yes'} disabled />
    <label htmlFor="breastFeedLength-yes">Yes</label>

    <input type="radio" id="breastFeedLength-no" name="breastFeedLength" value="no" 
           checked={formValues.breastFeedLength === 'no'} disabled />
    <label htmlFor="breastFeedLength-no">No</label>

    {formValues.breastFeedLength === 'no' && (
        <div>
            <label>If no, why? (Check all that apply)</label>
            <div>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="difficultyLatching"
                           checked={formValues.noBreastFeedReasons.includes('difficultyLatching')} disabled />
                    My baby had difficulty latching or nursing
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="gotSick"
                           checked={formValues.noBreastFeedReasons.includes('gotSick')} disabled />
                    I got sick or had to stop for medical reasons
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="babyNotSatisfied"
                           checked={formValues.noBreastFeedReasons.includes('babyNotSatisfied')} disabled />
                    Breast milk alone did not satisfy my baby
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="wentBackToWork"
                           checked={formValues.noBreastFeedReasons.includes('wentBackToWork')} disabled />
                    I went back to work
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="notGainingWeight"
                           checked={formValues.noBreastFeedReasons.includes('notGainingWeight')} disabled />
                    I thought my baby was not gaining enough weight
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="soreNipples"
                           checked={formValues.noBreastFeedReasons.includes('soreNipples')} disabled />
                    My nipples were sore, cracked, or bleeding or it was too painful
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="notProducingEnoughMilk"
                           checked={formValues.noBreastFeedReasons.includes('notProducingEnoughMilk')} disabled />
                    I thought I was not producing enough milk, or my milk dried up
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="wentBackToSchool"
                           checked={formValues.noBreastFeedReasons.includes('wentBackToSchool')} disabled />
                    I went back to school
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="lackOfSupport"
                           checked={formValues.noBreastFeedReasons.includes('lackOfSupport')} disabled />
                    Lack of support
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="babyIllness"
                           checked={formValues.noBreastFeedReasons.includes('babyIllness')} disabled />
                    My baby had an illness or medical condition
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="tooManyHouseholdDuties"
                           checked={formValues.noBreastFeedReasons.includes('tooManyHouseholdDuties')} disabled />
                    I had too many other household duties
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="doctorRecommendation"
                           checked={formValues.noBreastFeedReasons.includes('doctorRecommendation')} disabled />
                    Doctor recommended I supplement or wean
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="rightTimeToStop"
                           checked={formValues.noBreastFeedReasons.includes('rightTimeToStop')} disabled />
                    I felt it was the right time to stop breastfeeding
                </label>
                <label>
                    <input type="checkbox" name="noBreastFeedReasons" value="other"
                           checked={formValues.noBreastFeedReasons.includes('other')} disabled />
                    Other
                </label>
            </div>
        </div>

    )}

<div>
            <label>What have you heard about breastfeeding?</label>
            <input
                type="text"
                name="breastfeedingKnowledge"
                value={formValues.breastfeedingKnowledge}
                disabled
            />
        </div>

        <div>
</div>
        <fieldset>
            <legend>Breastfeeding Assessment</legend>
            <label>Are you worried about being able to breastfeed because of any medical conditions or medications?</label>
    <div>
        <label>
            <input
                type="checkbox"
                name="medicalConcernsBreastfeeding"
                value="breastSurgeryTrauma"
                checked={formValues.medicalConcernsBreastfeeding.includes('breastSurgeryTrauma')}
                disabled
            /> Breast Surgery/Trauma
        </label>
        <label>
            <input
                type="checkbox"
                name="medicalConcernsBreastfeeding"
                value="depression"
                checked={formValues.medicalConcernsBreastfeeding.includes('depression')}
                disabled
            /> Depression
        </label>
        <label>
            <input
                type="checkbox"
                name="medicalConcernsBreastfeeding"
                value="hypothyroidism"
                checked={formValues.medicalConcernsBreastfeeding.includes('hypothyroidism')}
                disabled
            /> Hypothyroidism
        </label>
        <label>
            <input
                type="checkbox"
                name="medicalConcernsBreastfeeding"
                value="diabetes"
                checked={formValues.medicalConcernsBreastfeeding.includes('diabetes')}
                disabled
            /> Diabetes
        </label>
        <label>
            <input
                type="checkbox"
                name="medicalConcernsBreastfeeding"
                value="hivStatus"
                checked={formValues.medicalConcernsBreastfeeding.includes('hivStatus')}
                disabled
            /> HIV (Do NOT ask. Only checked if voluntarily shared by client)
        </label>
        <label>
            <input
                type="checkbox"
                name="medicalConcernsBreastfeeding"
                value="noConcerns"
                checked={formValues.medicalConcernsBreastfeeding.includes('noConcerns')}
                disabled
            /> No Concerns
        </label>
    </div>
    <legend>How are you thinking of feeding your baby?</legend>
    <div>
        <label>
            <input
                type="radio"
                name="feedingMethods"
                value="nurse"
                checked={formValues.feedingMethods === 'nurse'}
                disabled
            /> I want to nurse my baby from the breast
        </label>
        <label>
            <input
                type="radio"
                name="feedingMethods"
                value="noBreastfeed"
                checked={formValues.feedingMethods === 'noBreastfeed'}
                disabled
            /> I don't want to breastfeed
        </label>
        <label>
            <input
                type="radio"
                name="feedingMethods"
                value="pumpAndNurse"
                checked={formValues.feedingMethods === 'pumpAndNurse'}
                disabled
            /> I want to pump and nurse from the breast
        </label>
        <label>
            <input
                type="radio"
                name="feedingMethods"
                value="unsure"
                checked={formValues.feedingMethods === 'unsure'}
                disabled
            /> I don't know
        </label>
        <label>
            <input
                type="radio"
                name="feedingMethods"
                value="pumpOnly"
                checked={formValues.feedingMethods === 'pumpOnly'}
                disabled
            /> I want to pump only
        </label>
        <label>
            <input
                type="radio"
                name="feedingMethods"
                value="bothFormulaAndBreastMilk"
                checked={formValues.feedingMethods === 'bothFormulaAndBreastMilk'}
                disabled
            /> I want to provide both formula and breast milk
        </label>
        <label>
            <input
                type="radio"
                name="feedingMethods"
                value="other"
                checked={formValues.feedingMethods === 'other'}
                disabled
            /> Other
        </label>
    </div>

    
        </fieldset>
        <label>Are you interested in receiving more information about breastfeeding?</label>
    <div>
        <input
            type="radio"
            id="additionalBreastfeedingInfo-yes"
            name="additionalBreastfeedingInfo"
            value="yes"
            checked={formValues.additionalBreastfeedingInfo === 'yes'}
            disabled
        />
        <label htmlFor="additionalBreastfeedingInfo-yes">Yes</label>

        <input
            type="radio"
            id="additionalBreastfeedingInfo-no"
            name="additionalBreastfeedingInfo"
            value="no"
            checked={formValues.additionalBreastfeedingInfo === 'no'}
            disabled
        />
        <label htmlFor="additionalBreastfeedingInfo-no">No</label>
    </div>
    


</fieldset>



        <fieldset>
          <legend>Nutrition and Diet</legend>
          <label htmlFor="mealsPerDay">Number of meals per day</label>
          <input type="number" id="mealsPerDay" name="mealsPerDay" value={formValues.mealsPerDay} disabled />

          <label htmlFor="snacksPerDay">Number of snacks per day</label>
          <input type="number" id="snacksPerDay" name="snacksPerDay" value={formValues.snacksPerDay} disabled />

          <label htmlFor="milkPerDay">Glasses of milk per day</label>
          <input type="number" id="milkPerDay" name="milkPerDay" value={formValues.milkPerDay} disabled />

          <label htmlFor="appetite">Appetite</label>
          <input type="radio" name="appetite" value="good" checked={formValues.appetite === 'good'} disabled /> Good
          <input type="radio" name="appetite" value="fair" checked={formValues.appetite === 'fair'} disabled /> Fair
          <input type="radio" name="appetite" value="poor" checked={formValues.appetite === 'poor'} disabled /> Poor

          <label htmlFor="specialDiet"> Include any special diet information that is notable</label>
          <input type="text" id="specialDiet" name="specialDiet" value={formValues.specialDiet} disabled />

          <label htmlFor="fastFoodFrequency">Fast Food per week</label>
          <input type="radio" name="fastFoodFrequency" value="yes" checked={formValues.fastFoodFrequency === 'yes'} disabled /> Yes
          <input type="radio" name="fastFoodFrequency" value="no" checked={formValues.fastFoodFrequency === 'no'} disabled /> No
          
          <label htmlFor="fastFoodDetails">If yes, what kind?</label>
          <input type="text" id="fastFoodDetails" name="fastFoodDetails" value={formValues.fastFoodDetails} disabled />
        </fieldset>
        </fieldset>

        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
}

export default NutHistoryReadOnly;

