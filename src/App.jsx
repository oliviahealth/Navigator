import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ClientDashboard from './components/ClientDashboard';
import Login from './components/LoginModal'; // Import the Login component
import PatientDemographics from "./components/PatientDemographics";
import ParentalMedicalHistory from './components/ParentalMedicalHistory';
import CommunicationsLog from './components/CommunicationsLog';
import AppointmentLog from './components/AppointmentLog';
import FormCoverLetter from './components/FormCoverLetter'
import ReleaseOfInformation from './components/ReleaseOfInformation'
import MediaAppearanceRelease from './components/MediaAppearanceRelease'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/participants-demographic-record" element={<PatientDemographics />} />
        <Route path="/parental-medical-history" element={<ParentalMedicalHistory />} /> 
        <Route path="/communications-log" element={<CommunicationsLog />} />
        <Route path="/apppointment-log" element={<AppointmentLog />} />
        <Route path="/form-cover-letter" element={<FormCoverLetter />} />
        <Route path="/release-of-information" element={<ReleaseOfInformation />} />
        <Route path="/media-appearance-release" element={<MediaAppearanceRelease />} />
      </Routes>
    </Router>
  );
};

export default App;
