import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MaternalDemographicsprofile = () => {
  const { authenticated } = useAuth();
  const userId = localStorage.getItem('userId');
  const [demographicsData, setDemographicsData] = useState(null);

  const questions = [
    'Name:',
    'Date of Birth:',
    'Current Living Arrangement:',
    'Street Address:',
    'Primary Phone Number:',
    'Phone Number:',
    'Emergency Contact (Name, Phone number, Address):',
    'Marital Status:',
    'Do you have insurance:',
  ];
  useEffect(() => {
    if (authenticated && userId) {
      fetch('/api/maternal-demographics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as required, like authorization tokens
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
        setDemographicsData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  }, [authenticated, userId]);
  

  if (!authenticated) {
    return <p>You are not authorized to access this page.</p>;
  }
  if (!demographicsData) {
    return <div className="service-profile-container">
    <h2>Maternal Demographics</h2>
    <p>Loading Maternal Demographics data...</p>
    </div>;
  }

  return (
    <div className="service-profile-container">
      <h2>Maternal Demographics</h2>
      {demographicsData ? (
        <div>
          <div className="question-container">
            <p>Name: <span className="answer">{demographicsData["First Name"]} {demographicsData["Last Name"]}</span></p>
          </div>
          <div className="question-container">
            <p>Date of Birth: <span className="answer">{demographicsData["Date of Birth"]}</span></p>
          </div>
          <div className="question-container">
            <p>Current Living Arrangement: <span className="answer">{demographicsData["Current Living Arrangement"]}</span></p>
          </div>
          <div className="question-container">
            <p>Street Address: <span className="answer">{demographicsData["Street Address"]}, {demographicsData["City"]}, {demographicsData["State"]} {demographicsData["Zip"]}</span></p>
          </div>
          <div className="question-container">
            <p>Primary Phone Number: <span className="answer">{demographicsData["Primary Phone Number"]}</span></p>
          </div>
          <div className="question-container">
            <p>Emergency Contact Name: <span className="answer">{demographicsData["Emergency Contact"]["First Name"]} {demographicsData["Emergency Contact"]["Last Name"]}</span></p>
          </div>
          <div className="question-container">
            <p>Emergency Contact Phone: <span className="answer">{demographicsData["Emergency Contact"]["Phone Number"]}</span></p>
          </div>
          <div className="question-container">
            <p>Emergency Contact Address: <span className="answer">{demographicsData["Emergency Contact"].Street}, {demographicsData["Emergency Contact"].City}, {demographicsData["Emergency Contact"].State} {demographicsData["Emergency Contact"].Zip}</span></p>
          </div>
          <div className="question-container">
            <p>Marital Status: <span className="answer">{demographicsData["Marital Status"]}</span></p>
          </div>
          <div className="question-container">
            <p>Do you have insurance: <span className="answer">{demographicsData["Has Insurance"] ? 'Yes' : 'No'}</span></p>
          </div>
        </div>
      ) :(
        <div>
          {questions.map((question, index) => (
            <div key={index} className="question-container">
              <p>{question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  
  
  
  
};

export default MaternalDemographicsprofile;
