import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/nut_history/${patientId}/${log_id}`, {
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
            setFormValues(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handling checkboxes that are part of a group (array in state)
      setFormValues(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else if (type === 'radio') {
      // Handling radio buttons
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      // Handling other inputs like 'text', 'date', etc.
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="nut-history-form">
      <h1>Nutrition History and Assessment</h1>
      <form>
        <label htmlFor="todays-date">Today's Date</label>
        <input type="date" id="todays-date" name="todayDate" value={formValues.todayDate} disabled />

        <label htmlFor="name">Your Name</label>
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
          {/* Additional races here */}
        </div>

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

        <fieldset>
          <legend>Prenatal Care</legend>
          <label>
            <input type="radio" name="prenatalCareMonth" value="firstMonth" checked={formValues.prenatalCareMonth === 'firstMonth'} disabled /> First month
          </label>
          <label>
            <input type="radio" name="prenatalCareMonth" value="noMedicalCare" checked={formValues.prenatalCareMonth === 'noMedicalCare'} disabled /> No Medical Care
          </label>
          {/* Additional options here */}
        </fieldset>

        <fieldset>
          <legend>For this pregnancy, check all that apply:</legend>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="weightLoss" checked={formValues.pregnancyConditions.includes('weightLoss')} disabled /> Weight loss
          </label>
          <label>
            <input type="checkbox" name="pregnancyConditions" value="nausea" checked={formValues.pregnancyConditions.includes('nausea')} disabled /> Nausea and vomiting
          </label>
          {/* Additional conditions here */}
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
          {/* Additional conditions here */}
        </fieldset>

        <fieldset>
          <legend>Medical Information</legend>
          <label htmlFor="medical-conditions-yes">Medical conditions/recent illnesses:</label>
          <input type="checkbox" id="medical-conditions-yes" name="medicalConditions" value="yes" checked={formValues.medicalConditions.includes('yes')} disabled />
          <label htmlFor="medical-conditions-yes">Yes</label>

          <input type="checkbox" id="medical-conditions-no" name="medicalConditions" value="no" checked={formValues.medicalConditions.includes('no')} disabled />
          <label htmlFor="medical-conditions-no">No</label>

          <label htmlFor="medications-yes">Medications (prescription or non-prescription):</label>
          <input type="checkbox" id="medications-yes" name="medications" value="yes" checked={formValues.medications.includes('yes')} disabled />
          <label htmlFor="medications-yes">Yes</label>

          <input type="checkbox" id="medications-no" name="medications" value="no" checked={formValues.medications.includes('no')} disabled />
          <label htmlFor="medications-no">No</label>

          <label htmlFor="dental-problems-yes">Dental problems affecting eating?</label>
          <input type="checkbox" id="dental-problems-yes" name="dentalProblems" value="yes" checked={formValues.dentalProblems.includes('yes')} disabled />
          <label htmlFor="dental-problems-yes">Yes</label>

          <input type="checkbox" id="dental-problems-no" name="dentalProblems" value="no" checked={formValues.dentalProblems.includes('no')} disabled />
          <label htmlFor="dental-problems-no">No</label>
          
          <label htmlFor="cigarettes-prepregnancy">In the 3 months before you were pregnant, how many cigarettes did you smoke on an average day?</label>
          <input type="number" id="cigarettes-prepregnancy" name="cigarettesPrepregnancy" value={formValues.cigarettesPrepregnancy} disabled />

          <label htmlFor="cigarettes-currently">How many cigarettes do you smoke on an average day now?</label>
          <input type="number" id="cigarettes-currently" name="cigarettesCurrently" value={formValues.cigarettesCurrently} disabled />
        </fieldset>

        <fieldset>
          <legend>Household and Lifestyle</legend>
          <label>Does anyone else living inside your household smoke inside the home?</label>
          <input type="radio" name="householdSmoking" value="yes" checked={formValues.householdSmoking === 'yes'} disabled /> Yes
          <input type="radio" name="householdSmoking" value="no" checked={formValues.householdSmoking === 'no'} disabled /> No
          <input type="radio" name="householdSmoking" value="unknown" checked={formValues.householdSmoking === 'unknown'} disabled /> Unknown
          
          <label>Alcohol consumption before pregnancy?</label>
          <input type="radio" name="alcoholBeforePregnancy" value="didNotDrink" checked={formValues.alcoholBeforePregnancy === 'didNotDrink'} disabled /> Did not drink
          <input type="radio" name="alcoholBeforePregnancy" value="drankButQuantityUnknown" checked={formValues.alcoholBeforePregnancy === 'drankButQuantityUnknown'} disabled /> Drank, but quantity unknown
          <input type="radio" name="alcoholBeforePregnancy" value="unknownOrRefusedAlcohol" checked={formValues.alcoholBeforePregnancy === 'unknownOrRefusedAlcohol'} disabled /> Unknown or refused
          
          <label>Alcohol during pregnancy?</label>
          <input type="radio" name="alcoholDuringPregnancy" value="yes" checked={formValues.alcoholDuringPregnancy === 'yes'} disabled /> Yes
          <input type="radio" name="alcoholDuringPregnancy" value="no" checked={formValues.alcoholDuringPregnancy === 'no'} disabled /> No
        </fieldset>

        <fieldset>
          <legend>Nutrition and Diet</legend>
          <label htmlFor="mealsPerDay">Number of meals per day</label>
          <input type="number" id="mealsPerDay" name="mealsPerDay" value={formValues.mealsPerDay} disabled />

          <label htmlFor="snacksPerDay">Number of snacks per day</label>
          <input type="number" id="snacksPerDay" name="snacksPerDay" value={formValues.snacksPerDay} disabled />

          <label htmlFor="milkPerDay">Milk per day</label>
          <input type="number" id="milkPerDay" name="milkPerDay" value={formValues.milkPerDay} disabled />

          <label htmlFor="appetite">Appetite</label>
          <input type="radio" name="appetite" value="good" checked={formValues.appetite === 'good'} disabled /> Good
          <input type="radio" name="appetite" value="fair" checked={formValues.appetite === 'fair'} disabled /> Fair
          <input type="radio" name="appetite" value="poor" checked={formValues.appetite === 'poor'} disabled /> Poor

          <label htmlFor="specialDiet">A special diet</label>
          <input type="text" id="specialDiet" name="specialDiet" value={formValues.specialDiet} disabled />

          <label htmlFor="fastFoodFrequency">Fast Food per week</label>
          <input type="radio" name="fastFoodFrequency" value="yes" checked={formValues.fastFoodFrequency === 'yes'} disabled /> Yes
          <input type="radio" name="fastFoodFrequency" value="no" checked={formValues.fastFoodFrequency === 'no'} disabled /> No
          
          <label htmlFor="fastFoodDetails">If yes, what kind?</label>
          <input type="text" id="fastFoodDetails" name="fastFoodDetails" value={formValues.fastFoodDetails} disabled />
        </fieldset>
      </form>
    </div>
  );
}

export default NutHistoryReadOnly;

