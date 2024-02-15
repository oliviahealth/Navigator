import React, { useState } from 'react';
import "./App.css"; 
import { useAuth } from './AuthContext';
import MaternalDemographicsprofile from './maternaldemoprofile';
import MedicalHistoryprofile from './medicalhistoryprofile';
import Substanceuseprofile from './substanceuseprofile';
import DrugScreeningProfile from './Drugscreeningprofile';
import SocialSupportProfile from './socialsupportprofile';
import ChildInformationProfile from './childinformationprofile';
import ServicesProfile from './referralandservicesprofile';
import Relapseplanprofile from './relapesplanprofile';
const Profile = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const { authenticated } = useAuth();
  const sections = [
    "Maternal Demographics",
    "Medical History",
    "Services for Substance Use",
    "Drug Screening Results",
    "Social Supports",
    "Infant Information",
    "Referrals and Services",
    "Relapse Prevention Plan",
  ];

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  if (!authenticated) {
    // Redirect or show a message for unauthenticated users
    return <div>You need to be logged in to access this page.</div>;
  }

  return (
    <div className="profile-container">
      <div className="left-bar">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`section-button ${selectedSection === section ? 'active' : ''}`}
            onClick={() => handleSectionClick(section)}
          >
            {section}
          </button>
        ))}
      </div>
      <div className="right-content">
        {selectedSection && (
          <div className="section-details">
            {selectedSection === "Maternal Demographics" && <MaternalDemographicsprofile />}
            {selectedSection === 'Medical History' && <MedicalHistoryprofile />}
            {selectedSection === 'Services for Substance Use' && <Substanceuseprofile />}
            {selectedSection === 'Drug Screening Results' && <DrugScreeningProfile />}
            {selectedSection === 'Social Supports' && <SocialSupportProfile />}
            {selectedSection === 'Infant Information' && <ChildInformationProfile />}
            {selectedSection === 'Referrals and Services' && <ServicesProfile />}
            {selectedSection === 'Relapse Prevention Plan' && <Relapseplanprofile />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

