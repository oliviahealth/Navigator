import React, {useState, useEffect} from 'react';
import { useAuth } from './AuthContext';

const SocialSupportProfile = () => {
  const { authenticated } = useAuth();
  const userId = localStorage.getItem('userId');
  const [socialSupportData, setSocialSupportData] = useState(null);
  const [currentCaregiverIndex, setCurrentCaregiverIndex] = useState(0);
  const questions = [
    'First Name:',
    'Last Name:', 
    'Date of Birth:',
    'Relationship',
    'Goals:',
    'Support:',
    'Feelings about Relationships:',
  ];

  useEffect(() => {
    if (authenticated && userId) {
      fetch('/api/social-support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        setSocialSupportData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  }, [authenticated, userId]);

  const handleNext = () => {
    if (currentCaregiverIndex < socialSupportData.people_in_home.length - 1) {
      setCurrentCaregiverIndex(currentCaregiverIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCaregiverIndex > 0) {
      setCurrentCaregiverIndex(currentCaregiverIndex - 1);
    }
  };


  if (!authenticated) {
    return <p>You are not authorized to access this page.</p>;
  }
  if (!socialSupportData) {
    return <div className="service-profile-container">
      <h2>Social Support Profile</h2>
      <p>Loading Social Support Data...</p>
    </div>;
  }

  return (
    <div className="service-profile-container">
      <h2>Social Support Profile</h2>
      {socialSupportData && (
        <>
          <div className="primary-caregiver-info">
            <h3 class="subsectionProfile">Primary Caregiver</h3>
            {socialSupportData.people_in_home.length > 0 && (
              <div>
                <p>First Name: {socialSupportData.people_in_home[currentCaregiverIndex].first_name}</p>
                <p>Last Name: {socialSupportData.people_in_home[currentCaregiverIndex].last_name}</p>
                <p>Date of Birth: {socialSupportData.people_in_home[currentCaregiverIndex].date_of_birth}</p>
                <p>Relationship: {socialSupportData.people_in_home[currentCaregiverIndex].relationship}</p>
              </div>
            )}
            <button className="profile-rectangular-button" onClick={handlePrevious} disabled={currentCaregiverIndex === 0}>Previous</button>
            <button className="profile-rectangular-button" onClick={handleNext} disabled={currentCaregiverIndex === socialSupportData.people_in_home.length - 1}>Next</button>
          </div>
          <div className="support-details">
            <h3 class="subsectionProfile">Support Details</h3>
            <p>Goals: {socialSupportData.goals}</p>
            <p>Support: {socialSupportData.support}</p>
            <p>Feelings about Relationships: {socialSupportData.feelings}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialSupportProfile;
