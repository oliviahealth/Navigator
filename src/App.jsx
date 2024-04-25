import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ClientDashboard from './components/ClientDashboard';
import Login from './components/LoginModal';
import PatientDemographics from "./components/PatientDemographics";
import ParentalMedicalHistory from './components/ParentalMedicalHistory';
import EncounterForm from './components/ConsentForm/EncounterForm';
import NutHistory from './components/ConsentForm/NutHistory';
import PrenatalCare from './components/ConsentForm/PrenatalCare';
import ASQ from './components/ConsentForm/ASQ';
import BriefChild from './components/ConsentForm/BriefChild';
import DeliveryHistory from './components/ConsentForm/DeliveryHistory';
import Breastfeeding from './components/ConsentForm/Breastfeeding';
import InfancyQuest from './components/ConsentForm/Infancy';
import TargetChild from './components/ConsentForm/TargetChild';
import CommunicationsLog from './components/CommunicationsLog';
import AppointmentLog from './components/AppointmentLog';
import FormCoverLetter from './components/FormCoverLetter'
import ReleaseOfInformation from './components/ReleaseOfInformation'
import MediaAppearanceRelease from './components/MediaAppearanceRelease'
import Medications from './components/Medications'
import Pregnancy from './components/Pregnancy'
import AddictionBeliefScale from './components/AddictionBeliefScale'
import AddPatientModal from './components/AddPatient';
import FormsDashboard from './components/FormsDashboard';
import ChildDemographics from './components/ChildDemographics';
import SupportSystems from './components/SupportSystems';
import DemographicsOthers from './components/DemographicsOthers';
import CurrentLiving from './components/CurrentLiving';
import ChildNeeds from './components/ChildNeeds';
import ReferralsServices from './components/ReferralsServices';
import EmergencyContact from './components/EmergencyContact';
import GoalPlanning from './components/GoalPlanning';
import CrafftScreening from './components/CrafftScreening';
import DrugAbuseScreening from './components/DrugAbuseScreening';
import CageScreening from './components/CageScreening';
import DrugScreeningResults from './components/DrugScreeningResults';
import SmokingTobaccoUse from './components/SmokingTobaccoUse';
import SubstanceUseHistory from './components/SubstanceUseHistory';
import TweakTest from './components/TweakTest';
import SubstanceUseRelapse from './components/SubstanceUseRelapse';
import TenB from './components/TenB'
import PregnancySpacing from './components/PregnancySpacing'
import DomesticViolenceScreenForm from './components/ConsentForm/DomesticViolence';
import IPVScreeningAndAssessmentForm from './components/ConsentForm/IPV';
import IPVDisclosureForm from './components/ConsentForm/IntimateViolence';
import IntimatePartnerViolenceForm from './components/ConsentForm/PartnerViolence';
import SocialSupportForm from './components/FamilyDynamics';
import MentalHealthHistory from './components/MentalHealthHistory';
import CSSRS from './components/CSSRS';
import DUREL from './components/DUREL';
import EPDS from './components/EPDS';
import GAD7 from './components/GAD7.';
import PSS from './components/PSS';
import PHQ9 from './components/PHQ9';
import HousingVisit from './components/HousingVisit';
import SafetyProfileForm from './components/HousingSafety';

import CommunicationsLogReadOnly from './components/ReadOnly/CommunicationsLogReadOnly';
import AppointmentLogReadOnly from './components/ReadOnly/AppointmentLogReadOnly';
import ReleaseOfInformationReadOnly from './components/ReadOnly/ReleaseOfInformationReadOnly';
import MediaAppearanceReleaseReadOnly from './components/ReadOnly/MediaAppearanceReleaseReadOnly';
import PatientsDemographicsReadOnly from './components/ReadOnly/PatientDemographicsReadOnly';
import DemographicsOthersReadOnly from './components/ReadOnly/DemographicsOthersReadOnly';
import ChildDemographicsReadOnly from './components/ReadOnly/ChildDemographicsReadOnly';
import SupportSystemsReadOnly from './components/ReadOnly/SupportSystemsReadOnly';
import CurrentLivingReadOnly from './components/ReadOnly/CurrentLivingReadOnly';
import ChildNeedsReadOnly from './components/ReadOnly/ChildNeedsReadOnly';
import ReferralsServicesReadOnly from './components/ReadOnly/ReferralsServicesReadOnly';
import EmergencyContactReadOnly from './components/ReadOnly/EmergencyContactReadOnly';
import GoalPlanningReadOnly from './components/ReadOnly/GoalPlanningReadOnly';
import ParentalMedicalHistoryReadOnly from './components/ReadOnly/ParentalMedicalHistoryReadOnly';
import EncounterFormReadOnly from './components/ReadOnly/EncounterFormReadOnly';
import NutHistoryReadOnly from './components/ReadOnly/NutHistoryReadOnly';
import MedicationsReadOnly from './components/ReadOnly/MedicationsReadOnly';
import PregnancyReadOnly from './components/ReadOnly/PregnancyReadOnly';
import AddictionBeliefScaleReadOnly from './components/ReadOnly/AddictionBeliefScaleReadOnly';
import CageScreeningReadOnly from './components/ReadOnly/CageScreeningReadOnly';
import CrafftScreeningReadOnly from './components/ReadOnly/CrafftScreeningReadOnly';
import DrugAbuseScreeningReadOnly from './components/ReadOnly/DrugAbuseScreeningReadOnly';
import ASQReadOnly from './components/ReadOnly/ASQReadOnly';
import BriefChildReadOnly from './components/ReadOnly/BriefChildReadOnly';
import DeliveryHistoryReadOnly from './components/ReadOnly/DeliveryHistoryReadOnly';
import BreastFeedingReadOnly from './components/ReadOnly/BreastfeedingReadOnly';
import InfancyReadOnly from './components/ReadOnly/InfancyReadOnly';
import TargetChildReadOnly from './components/ReadOnly/TargetChildReadOnly';
import PrenatalCareReadOnly from './components/ReadOnly/PrenatalCareReadOnly';
import DrugScreeningResultsReadOnly from './components/ReadOnly/DrugScreeningResultsReadOnly';
import SubstanceUseHistoryReadOnly from './components/ReadOnly/SubstanceUseHistoryReadOnly';
import SubstanceUseRelapseReadOnly from './components/ReadOnly/SubstanceUseRelapseReadOnly';
import TweakTestReadOnly from './components/ReadOnly/TweakTestReadOnly';
import PregnancySpacingReadOnly from './components/ReadOnly/PregnancySpacingReadOnly';
import TenBReadOnly from './components/ReadOnly/TenBReadOnly';
import DomesticViolenceScreenFormReadOnly from './components/ReadOnly/DomesticViolenceReadOnly';
import IPVScreeningAndAssessmentFormReadOnly from './components/ReadOnly/IPVReadOnly';
import IPVDisclosureFormReadOnly from './components/ReadOnly/IntimateViolenceReadOnly';
import IntimatePartnerViolenceFormReadOnly from './components/ReadOnly/PartnerViolenceReadOnly';
import SocialSupportFormReadOnly from './components/ReadOnly/FamilyDynamicsReadOnly';
import MentalHealthHistoryReadOnly from './components/ReadOnly/MentalHealthHistoryReadOnly';
import CSSRSReadOnly from './components/ReadOnly/CSSRSReadOnly';
import DURELReadOnly from './components/ReadOnly/DURELReadOnly';
import EPDSReadOnly from './components/ReadOnly/EPDSReadOnly';
import GAD7ReadOnly from './components/ReadOnly/GAD7ReadOnly.';
import PSSReadOnly from './components/ReadOnly/PSSReadOnly';
import PHQ9ReadOnly from './components/ReadOnly/PHQ9ReadOnly';
import HousingVisitReadOnly from './components/ReadOnly/HousingVisitReadOnly';
import SafetyProfileFormReadOnly from './components/ReadOnly/HousingSafetyReadOnly';
import SmokingTobaccoUseReadOnly from './components/ReadOnly/SmokingTobaccoUseReadOnly';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-patient" element={<AddPatientModal />} />
        <Route path="/forms-dashboard/:formType/:patientId" element={<FormsDashboard />} />

        {/* Tab-1: Communication and Information Forms */}
        <Route path="/communications_log/:patientId" element={<CommunicationsLog />} />
        <Route path="/appointment_log/:patientId" element={<AppointmentLog />} />
        <Route path="/form-cover-letter" element={<FormCoverLetter />} />
        <Route path="/release-of-information/:patientId" element={<ReleaseOfInformation />} />
        <Route path="/media-appearance-release/:patientId" element={<MediaAppearanceRelease />} />
        
        {/* Tab-2: Demographics and Social History */}
        <Route path="/participants-demographic-record/:patientId" element={<PatientDemographics />} />
        <Route path="/demographics-others/:patientId" element={<DemographicsOthers />} />
        <Route path="/child-demographics/:patientId" element={<ChildDemographics />} />
        <Route path="/support-systems/:patientId" element={<SupportSystems />} />
        <Route path="/current-living/:patientId" element={<CurrentLiving />} />
        <Route path="/child-needs/:patientId" element={<ChildNeeds />} />
        <Route path="/referrals-services/:patientId" element={<ReferralsServices />} />
        <Route path="/emergency-contact/:patientId" element={<EmergencyContact />} />
        <Route path="/goal-planning/:patientId" element={<GoalPlanning />} />
        
        {/* Tab-3: Medical and Nutritional History */}
        <Route path="/parental-medical-history/:patientId" element={<ParentalMedicalHistory />} /> 
        <Route path="/encounter-form/:patientId" element={<EncounterForm />} /> 
        <Route path="/nut-history/:patientId" element={<NutHistory />} />
        
        {/* Tab-4: Medications */}
        <Route path="/medications/:patientId" element={<Medications />} />
        
        {/* Tab-5: Substance Use Screening */}
        <Route path="/pregnancy/:patientId" element={<Pregnancy />} />
        <Route path="/addiction-belief-scale/:patientId" element={<AddictionBeliefScale />} /> 
        <Route path="/cage-screening/:patientId" element={<CageScreening />} />
        <Route path="/crafft-screening/:patientId" element={<CrafftScreening />} />
        <Route path="/drug-abuse-screening/:patientId" element={<DrugAbuseScreening />} />
        <Route path="/drug-screening-results/:patientId" element={<DrugScreeningResults />} />
        <Route path="/smoking-tobacco-use/:patientId" element={<SmokingTobaccoUse />} />
        <Route path="/substance-use-history/:patientId" element={<SubstanceUseHistory />} />
        <Route path="/tweak-test/:patientId" element={<TweakTest />} />
        <Route path="/substance-use-relapse/:patientId" element={<SubstanceUseRelapse />} />

        {/* Tab-6: Interpersonal Relations Assessment*/}
        <Route path="partner-violence/:patientId" element={<IntimatePartnerViolenceForm />} />
        <Route path="domestic-violence/:patientId" element={<DomesticViolenceScreenForm />} />
        <Route path="ipv/:patientId" element={<IPVScreeningAndAssessmentForm />} />
        <Route path="intimate-violence/:patientId" element={<IPVDisclosureForm />} />
        <Route path="family-dynamics/:patientId" element={<SocialSupportForm />} />

        {/* Tab-7: Physical Assessments */}
        <Route path="/ten-b/:patientId" element={<TenB />} />
        <Route path="/pregnancy-spacing/:patientId" element={<PregnancySpacing />} />
        
        {/*Tab-8: Mental Health Assessments*/}
        <Route path="/mentalhealthhistory/:patientId" element={<MentalHealthHistory />} />
        <Route path="/cssrs/:patientId" element={<CSSRS />} />
        <Route path="/durel/:patientId" element={<DUREL />} />
        <Route path="/epds/:patientId" element={<EPDS />} />
        <Route path="/gad7/:patientId" element={<GAD7 />} />
        <Route path="/pss/:patientId" element={<PSS />} />
        <Route path="/phq9/:patientId" element={<PHQ9 />} />

        {/* Tab-9*/}
        <Route path="housingVisit/:patientId" element={<HousingVisit/>} />
        <Route path="housingSafety/:patientId" element={<SafetyProfileForm/>} />

        {/* Tab-10: Prenatal Care */}
        <Route path="/prenatal-care/:patientId" element={<PrenatalCare />} />
        
        {/* Tab-11: Child Development */}
        <Route path="/asq/:patientId" element={<ASQ />} /> 
        <Route path="/brief-child/:patientId" element={<BriefChild />} />
        <Route path="/delivery-history/:patientId" element={<DeliveryHistory/>} />  
        <Route path="/breastfeeding/:patientId" element={<Breastfeeding />} /> 
        <Route path="/infancy-quest/:patientId" element={<InfancyQuest />} />
        <Route path="/target-child/:patientId" element={<TargetChild />} /> 

        <Route path="communications_log-read-only/:patientId/:log_id" element={<CommunicationsLogReadOnly />} />
        <Route path="appointment_log-read-only/:patientId/:log_id" element={<AppointmentLogReadOnly />} />
        <Route path="release-of-information-read-only/:patientId/:log_id" element={<ReleaseOfInformationReadOnly />} />
        <Route path="media-appearance-release-read-only/:patientId/:log_id" element={<MediaAppearanceReleaseReadOnly />} />

        <Route path="/participants-demographic-record-read-only/:patientId/:log_id" element={<PatientsDemographicsReadOnly />} />
        <Route path="/demographics-others-read-only/:patientId/:log_id" element={<DemographicsOthersReadOnly />} />
        <Route path="/child-demographics-read-only/:patientId/:log_id" element={<ChildDemographicsReadOnly />} />
        <Route path="/support-systems-read-only/:patientId/:log_id" element={<SupportSystemsReadOnly />} />
        <Route path="/current-living-read-only/:patientId/:log_id" element={<CurrentLivingReadOnly />} />
        <Route path="/child-needs-read-only/:patientId/:log_id" element={<ChildNeedsReadOnly />} />
        <Route path="/referrals-services-read-only/:patientId/:log_id" element={<ReferralsServicesReadOnly />} />
        <Route path="/emergency-contact-read-only/:patientId/:log_id" element={<EmergencyContactReadOnly />} />
        <Route path="/goal-planning-read-only/:patientId/:log_id" element={<GoalPlanningReadOnly />} />
        <Route path="/parental-medical-history-read-only/:patientId/:log_id" element={<ParentalMedicalHistoryReadOnly />} /> 
        <Route path="/encounter-form-read-only/:patientId/:log_id" element={<EncounterFormReadOnly />} /> 
        <Route path="/nut-history-read-only/:patientId/:log_id" element={<NutHistoryReadOnly />} />
        <Route path="/addiction-belief-scale-read-only/:patientId/:log_id" element={<AddictionBeliefScaleReadOnly />} /> 
        <Route path="/medications-read-only/:patientId/:log_id" element={<MedicationsReadOnly />} />
        <Route path="/pregnancy-read-only/:patientId/:log_id" element={<PregnancyReadOnly />} />
        <Route path="/crafft-screening-read-only/:patientId/:log_id" element={<CrafftScreeningReadOnly />} />
        <Route path="/drug-abuse-screening-read-only/:patientId/:log_id" element={<DrugAbuseScreeningReadOnly />} />
        <Route path="/cage-screening-read-only/:patientId/:log_id" element={<CageScreeningReadOnly />} />
        <Route path="/asq-read-only/:patientId/:log_id" element={<ASQReadOnly />} /> 
        <Route path="/brief-child-read-only/:patientId/:log_id" element={<BriefChildReadOnly />} />
        <Route path="/delivery-history-read-only/:patientId/:log_id" element={<DeliveryHistoryReadOnly/>} />  
        <Route path="/breastfeeding-read-only/:patientId/:log_id" element={<BreastFeedingReadOnly />} /> 
        <Route path="/infancy-quest-read-only/:patientId/:log_id" element={<InfancyReadOnly />} />
        <Route path="/target-child-read-only/:patientId/:log_id" element={<TargetChildReadOnly />} /> 
        <Route path="/prenatal-care-read-only/:patientId/:log_id" element={<PrenatalCareReadOnly />} /> 
      
        <Route path="/drug-screening-results-read-only/:patientId/:log_id" element={<DrugScreeningResultsReadOnly />} />
        <Route path="/substance-use-history-read-only/:patientId/:log_id" element={<SubstanceUseHistoryReadOnly />} />
        <Route path="/tweak-test-read-only/:patientId/:log_id" element={<TweakTestReadOnly />} />
        <Route path="/substance-use-relapse-read-only/:patientId/:log_id" element={<SubstanceUseRelapseReadOnly />} />
        <Route path="/ten-b-read-only/:patientId/:log_id" element={<TenBReadOnly />} />
        <Route path="/pregnancy-spacing-read-only/:patientId/:log_id" element={<PregnancySpacingReadOnly />} />
        
        <Route path="partner-violence-read-only/:patientId/:log_id" element={<IntimatePartnerViolenceFormReadOnly />} />
        <Route path="domestic-violence-read-only/:patientId/:log_id" element={<DomesticViolenceScreenFormReadOnly />} />
        <Route path="ipv-read-only/:patientId/:log_id" element={<IPVScreeningAndAssessmentFormReadOnly />} />
        <Route path="intimate-violence-read-only/:patientId/:log_id" element={<IPVDisclosureFormReadOnly />} />
        <Route path="family-dynamics-read-only/:patientId/:log_id" element={<SocialSupportFormReadOnly/>} />
      
        {/*Tab-8: Mental Health Assessments*/}
        <Route path="/mentalhealthhistory-read-only/:patientId/:log_id" element={<MentalHealthHistoryReadOnly />} />
        <Route path="/cssrs-read-only/:patientId/:log_id" element={<CSSRSReadOnly />} />
        <Route path="/durel-read-only/:patientId/:log_id" element={<DURELReadOnly />} />
        <Route path="/epds-read-only/:patientId/:log_id" element={<EPDSReadOnly />} />
        <Route path="/gad7-read-only/:patientId/:log_id" element={<GAD7ReadOnly />} />
        <Route path="/pss-read-only/:patientId/:log_id" element={<PSSReadOnly />} />
        <Route path="/phq9-read-only/:patientId/:log_id" element={<PHQ9ReadOnly />} />

        {/* Tab-9*/}
        <Route path="housingVisit-read-only/:patientId/:log_id" element={<HousingVisitReadOnly/>} />
        <Route path="housingSafety-read-only/:patientId/:log_id" element={<SafetyProfileFormReadOnly/>} />
      
        <Route path="/smoking-tobacco-use-read-only/:patientId/:log_id" element={<SmokingTobaccoUseReadOnly />} />
      </Routes>
    </Router>
  );
};

export default App;
