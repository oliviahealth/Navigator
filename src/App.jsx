import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ClientDashboard from './components/ClientDashboard';
import Login from './components/LoginModal'; // Import the Login component
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


const App = () => {
  return (
    <Router>
      <Routes>
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
        <Route path="/drug-screening-results" element={<DrugScreeningResults />} />
        <Route path="/smoking-tobacco-use" element={<SmokingTobaccoUse />} />
        <Route path="/substance-use-history" element={<SubstanceUseHistory />} />
        <Route path="/tweak-test" element={<TweakTest />} />
        <Route path="/substance-use-relapse" element={<SubstanceUseRelapse />} />
        
        {/* Tab-10: Prenatal Care */}
        <Route path="/prenatal-care/:patientId" element={<PrenatalCare />} />
        
        {/* Tab-11: Child Development */}
        <Route path="/asq/:patientId" element={<ASQ />} /> 
        <Route path="/brief-child/:patientId" element={<BriefChild />} />
        <Route path="/delivery-history/:patientId" element={<DeliveryHistory/>} />  
        <Route path="/breastfeeding/:patientId" element={<Breastfeeding />} /> 
        <Route path="/infancy-quest/:patientId" element={<InfancyQuest />} />
        <Route path="/target-child/:patientId" element={<TargetChild />} /> 
        
        {/* Read-Only Routes */}
        {/* Communications and Information Forms */}
        <Route path="communications_log-read-only/:patientId/:log_id" element={<CommunicationsLogReadOnly />} />
        <Route path="appointment_log-read-only/:patientId/:log_id" element={<AppointmentLogReadOnly />} />
        <Route path="release-of-information-read-only/:patientId/:log_id" element={<ReleaseOfInformationReadOnly />} />
        <Route path="media-appearance-release-read-only/:patientId/:log_id" element={<MediaAppearanceReleaseReadOnly />} />

        {/* Demographics and Social History */}
        <Route path="/participants-demographic-record-read-only/:patientId/:log_id" element={<PatientsDemographicsReadOnly />} />
        <Route path="/demographics-others-read-only/:patientId/:log_id" element={<DemographicsOthersReadOnly />} />
        <Route path="/child-demographics-read-only/:patientId/:log_id" element={<ChildDemographicsReadOnly />} />
        <Route path="/support-systems-read-only/:patientId/:log_id" element={<SupportSystemsReadOnly />} />
        <Route path="/current-living-read-only/:patientId/:log_id" element={<CurrentLivingReadOnly />} />
        <Route path="/child-needs-read-only/:patientId/:log_id" element={<ChildNeedsReadOnly />} />
        <Route path="/referrals-services-read-only/:patientId/:log_id" element={<ReferralsServicesReadOnly />} />
        <Route path="/emergency-contact-read-only/:patientId/:log_id" element={<EmergencyContactReadOnly />} />
        <Route path="/goal-planning-read-only/:patientId/:log_id" element={<GoalPlanningReadOnly />} />

        {/* Medical and Nutritional History */}
        <Route path="/parental-medical-history-read-only/:patientId/:log_id" element={<ParentalMedicalHistoryReadOnly />} /> 
        <Route path="/encounter-form-read-only/:patientId/:log_id" element={<EncounterFormReadOnly />} /> 
        <Route path="/nut-history-read-only/:patientId/:log_id" element={<NutHistoryReadOnly />} />
        
        {/* Medications */}
        <Route path="/medications-read-only/:patientId/:log_id" element={<MedicationsReadOnly />} />
        
        {/* Substance Use Screening */}
        <Route path="/pregnancy-read-only/:patientId/:log_id" element={<PregnancyReadOnly />} />
        <Route path="/addiction-belief-scale-read-only/:patientId/:log_id" element={<AddictionBeliefScaleReadOnly />} /> 
        <Route path="/cage-screening-read-only/:patientId/:log_id" element={<CageScreeningReadOnly />} />
        <Route path="/crafft-screening-read-only/:patientId/:log_id" element={<CrafftScreeningReadOnly />} />
        <Route path="/drug-abuse-screening-read-only/:patientId/:log_id" element={<DrugAbuseScreeningReadOnly />} />
        
        {/* Prenatal Care */}
        <Route path="/prenatal-care-read-only/:patientId/:log_id" element={<PrenatalCareReadOnly />} /> 
        
        {/* Child Development */}
        <Route path="/asq-read-only/:patientId/:log_id" element={<ASQReadOnly />} /> 
        <Route path="/brief-child-read-only/:patientId/:log_id" element={<BriefChildReadOnly />} />
        <Route path="/delivery-history-read-only/:patientId/:log_id" element={<DeliveryHistoryReadOnly/>} />  
        <Route path="/breastfeeding-read-only/:patientId/:log_id" element={<BreastFeedingReadOnly />} /> 
        <Route path="/infancy-quest-read-only/:patientId/:log_id" element={<InfancyReadOnly />} />
        <Route path="/target-child-read-only/:patientId/:log_id" element={<TargetChildReadOnly />} /> 
      </Routes>
    </Router>
  );
};

export default App;




/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ClientDashboard from './components/ClientDashboard';
import Login from './components/LoginModal'; // Import the Login component
import AddPatientModal from './components/AddPatient';
import FormsDashboard from './components/FormsDashboard';

// Tab-1 Routes
import CommunicationsLog from './components/CommunicationsLog';
import AppointmentLog from './components/AppointmentLog';
import FormCoverLetter from './components/FormCoverLetter'
import ReleaseOfInformation from './components/ReleaseOfInformation';
import MediaAppearanceRelease from './components/MediaAppearanceRelease';

// Tab-2 Routes
import PatientDemographics from "./components/PatientDemographics";
import ChildDemographics from './components/ChildDemographics';
import SupportSystems from './components/SupportSystems';
import DemographicsOthers from './components/DemographicsOthers';
import CurrentLiving from './components/CurrentLiving';
import ChildNeeds from './components/ChildNeeds';
import ReferralsServices from './components/ReferralsServices';
import EmergencyContact from './components/EmergencyContact';
import GoalPlanning from './components/GoalPlanning';

// Tab-3 Routes
import ParentalMedicalHistory from './components/ParentalMedicalHistory';
import EncounterForm from './components/ConsentForm/EncounterForm';
import NutHistory from './components/ConsentForm/NutHistory';

// Tab-4 Routes
import Medications from './components/Medications';

// Tab-5 Routes
import Pregnancy from './components/Pregnancy';
import AddictionBeliefScale from './components/AddictionBeliefScale';
import CageScreening from './components/CageScreening';
import CrafftScreening from './components/CrafftScreening';
import DrugAbuseScreening from './components/DrugAbuseScreening';
import DrugScreeningResults from './components/DrugScreeningResults';
import SmokingTobaccoUse from './components/SmokingTobaccoUse';
import SubstanceUseHistory from './components/SubstanceUseHistory';
import TweakTest from './components/TweakTest';
import SubstanceUseRelapse from './components/SubstanceUseRelapse';

// Tab-10 Routes
import PrenatalCare from './components/ConsentForm/PrenatalCare';

// Tab-11 Routes
import ASQ from './components/ConsentForm/ASQ';
import BriefChild from './components/ConsentForm/BriefChild';
import DeliveryHistory from './components/ConsentForm/DeliveryHistory';
import Breastfeeding from './components/ConsentForm/Breastfeeding';
import InfancyQuest from './components/ConsentForm/Infancy';
import TargetChild from './components/ConsentForm/TargetChild';

// Read-Only Routes
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
*/