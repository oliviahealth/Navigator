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
import DemographicsOthers from './components/DemographicsOthers'
import CageScreening from './components/CageScreening'
import ChildDemographics from './components/ChildDemographics';
import SupportSystems from './components/SupportSystems';
import CurrentLiving from './components/CurrentLiving';
import ChildNeeds from './components/ChildNeeds';
import ReferralsServices from './components/ReferralsServices';
import EmergencyContact from './components/EmergencyContact';
import GoalPlanning from './components/GoalPlanning';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/participants-demographic-record" element={<PatientDemographics />} />
        <Route path="/demographics-others" element={<DemographicsOthers />} />
        <Route path="/child-demographics" element={<ChildDemographics />} />
        <Route path="/support-systems" element={<SupportSystems />} />
        <Route path="/current-living" element={<CurrentLiving />} />
        <Route path="/child-needs" element={<ChildNeeds />} />
        <Route path="/referrals-services" element={<ReferralsServices />} />
        <Route path="/emergency-contact" element={<EmergencyContact />} />
        <Route path="/goal-planning" element={<GoalPlanning />} />
        <Route path="/parental-medical-history" element={<ParentalMedicalHistory />} /> 
        <Route path="/encounter-form" element={<EncounterForm />} /> 
        <Route path="/nut-history" element={<NutHistory />} />
        <Route path="/prenatal-care" element={<PrenatalCare />} /> 
        <Route path="/asq" element={<ASQ />} /> 
        <Route path="/brief-child" element={<BriefChild />} />
        <Route path="/delivery-history" element={<DeliveryHistory/>} />  
        <Route path="/breastfeeding" element={<Breastfeeding />} /> 
        <Route path="/infancy-quest" element={<InfancyQuest />} />
        <Route path="/target-child" element={<TargetChild />} /> 
        <Route path="/communications-log" element={<CommunicationsLog />} />
        <Route path="/apppointment-log" element={<AppointmentLog />} />
        <Route path="/form-cover-letter" element={<FormCoverLetter />} />
        <Route path="/release-of-information" element={<ReleaseOfInformation />} />
        <Route path="/media-appearance-release" element={<MediaAppearanceRelease />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/pregnancy" element={<Pregnancy />} />
        <Route path="/addiction-belief-scale" element={<AddictionBeliefScale />} />
        <Route path="/add-patient" element={<AddPatientModal />} />
        <Route path="/cage-screening" element={<CageScreening />} />
      </Routes>
    </Router>
  );
};

export default App;
