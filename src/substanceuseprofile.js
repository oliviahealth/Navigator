import React, {useState, useEffect} from 'react';
import { useAuth } from './AuthContext';

const Substanceuseprofile = () => {
  const { authenticated } = useAuth();
  const userId = localStorage.getItem('userId');
  const [substanceUseData, setSubstanceUseData] = useState(null);
  
  const questions = [
    'Medication Assisted Treatment (MAT) Engaged:',
    'Date of Last use:',
    'Medication(s) and Dose:',
    'Addiction Medicine Services:',
    'Date of Last Appointment:',
    'Name and Contact Information for MAT Clinic:',
    'Name and Contact Information for Addiction Medicine Clinic:',
  ];

  useEffect(() => {
    if (authenticated && userId) {
      fetch('/api/substance-use', {
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
        setSubstanceUseData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  }, [authenticated, userId]);

  if (!authenticated) {
    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <div className="service-profile-container">
      <h2>Substance Use</h2>
      {substanceUseData ? (
        <div>
          {/* Map through each question and display its answer */}
          {Object.entries(substanceUseData).map(([key, value], index) => (
            <div key={index} className="question-container">
              <p>{key}: <span className="answer">{value}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading substance use data...</p>
      )}
    </div>
  );
};

export default Substanceuseprofile;
