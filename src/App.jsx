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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/participants-demographic-record/:patientId" element={<PatientDemographics />} />
        <Route path="/demographics-others/:patientId" element={<DemographicsOthers />} />
        <Route path="/child-demographics/:patientId" element={<ChildDemographics />} />
        <Route path="/support-systems/:patientId" element={<SupportSystems />} />
        <Route path="/current-living/:patientId" element={<CurrentLiving />} />
        <Route path="/child-needs/:patientId" element={<ChildNeeds />} />
        <Route path="/referrals-services/:patientId" element={<ReferralsServices />} />
        <Route path="/emergency-contact/:patientId" element={<EmergencyContact />} />
        <Route path="/goal-planning/:patientId" element={<GoalPlanning />} />
        <Route path="/parental-medical-history/:patientId" element={<ParentalMedicalHistory />} /> 
        <Route path="/encounter-form/:patientId" element={<EncounterForm />} /> 
        <Route path="/nut-history/:patientId" element={<NutHistory />} />
        <Route path="/prenatal-care/:patientId" element={<PrenatalCare />} /> 
        <Route path="/addiction-belief-scale/:patientId" element={<AddictionBeliefScale />} /> 
        <Route path="/asq" element={<ASQ />} /> 
        <Route path="/brief-child" element={<BriefChild />} />
        <Route path="/delivery-history" element={<DeliveryHistory/>} />  
        <Route path="/breastfeeding" element={<Breastfeeding />} /> 
        <Route path="/infancy-quest" element={<InfancyQuest />} />
        <Route path="/target-child" element={<TargetChild />} /> 
        <Route path="/communications_log/:patientId" element={<CommunicationsLog />} />
        <Route path="/appointment_log/:patientId" element={<AppointmentLog />} />
        <Route path="/form-cover-letter" element={<FormCoverLetter />} />
        <Route path="/release-of-information/:patientId" element={<ReleaseOfInformation />} />
        <Route path="/media-appearance-release/:patientId" element={<MediaAppearanceRelease />} />
        <Route path="/medications/:patientId" element={<Medications />} />
        <Route path="/pregnancy/:patientId" element={<Pregnancy />} />
        <Route path="/crafft-screening/:patientId" element={<CrafftScreening />} />
        <Route path="/drug-abuse-screening/:patientId" element={<DrugAbuseScreening />} />
        <Route path="/cage-screening/:patientId" element={<CageScreening />} />

        <Route path="/add-patient" element={<AddPatientModal />} />
        <Route path="/forms-dashboard/:formType/:patientId" element={<FormsDashboard />} />

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
      </Routes>
    </Router>
  );
};

export default App;
