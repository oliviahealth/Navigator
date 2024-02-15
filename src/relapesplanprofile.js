import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const Relapseplanprofile = () => {
  const { authenticated } = useAuth();
  const userId = localStorage.getItem('userId');
  const [relapsePlanData, setRelapsePlanData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/relapse-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setRelapsePlanData(data);
        } else {
          console.error('Error fetching relapse plan data:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userId]);

  const renderCaregivers = (caregivers) => {
    return caregivers.map((caregiver, index) => (
      <div key={`caregiver-${index}`} className="question-container">
        <p>My Safe Caregiver {index + 1}:</p>
        <p>
          <span className="answer">First Name: {caregiver.first_name}</span>
        </p>
        <p>
          <span className="answer">Last Name: {caregiver.last_name}</span>
        </p>
        <p>
          <span className="answer">Contact Number: {caregiver.contact_number}</span>
        </p>
        <p>
          <span className="answer">Relationship: {caregiver.relationship}</span>
        </p>
      </div>
    ));
  };

  const renderList = (items) => {
    return items.map((item, index) => (
      <p>{index+1}: <span key={index} className="answer">{item}</span></p>
    ));
  };

  if (!authenticated) {
    return <p>You are not authorized to access this page.</p>;
  }
  if (!relapsePlanData) {
    return <div className="service-profile-container">
      <h2>Relapse Plan</h2>
      <p>Loading relapse plan data...</p>
      </div>;
  }

  return (
    <div className="service-profile-container">
      <h2>Relapse Plan</h2>
      {relapsePlanData ? (
        <>
          <div className="question-container">
            <p>3 things that trigger your desire to use:</p>
            {renderList(relapsePlanData.triggers)}
          </div>
          <div className="question-container">
            <p>3 skills or things you enjoy doing that can help get your mind off using:</p>
            {renderList(relapsePlanData.skills)}
          </div>
          <div className="question-container">
            <p>3 people you can talk to if you are thinking about using:</p>
            {renderList(relapsePlanData.people_to_talk)}
          </div>
          {relapsePlanData.safe_caregivers && renderCaregivers(relapsePlanData.safe_caregivers)}
        </>
      ) : (
        <p>Loading relapse plan data...</p>
      )}
    </div>
  );
};

export default Relapseplanprofile;
