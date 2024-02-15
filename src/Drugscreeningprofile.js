import React, {useState, useEffect} from 'react';
import { useAuth } from './AuthContext';

const Drugscreeningprofile = () => {
  const { authenticated } = useAuth();
  const userId = localStorage.getItem('userId');
  const [drugScreeningData, setDrugScreeningData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const questions = [
    'DateCollected:',
    'Ordered by:',
    'Result:',
    'ProviderReviewed:',
    'Specify Results:',
  ];

  useEffect(() => {
    if (authenticated && userId) {
      fetch('/api/drug-screening', {
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
        setDrugScreeningData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  }, [authenticated, userId]);

  const handleNext = () => {
    if (currentIndex < drugScreeningData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!authenticated) {
    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <div className="maternal-demographics-card">
      <h2>Drug Screening Results</h2>
      {drugScreeningData && drugScreeningData.length > 0 ? (
        <div>
          {Object.entries(drugScreeningData[currentIndex]).map(([key, value]) => (
            value && (
              <div key={key} className="question-container">
                <p>{key}: <span className="answer">{value}</span></p>
              </div>
            )
          ))}
          <div className="button-container">
            {currentIndex > 0 && (
              <button onClick={handlePrevious} className="profile-rectangular-button">Previous</button>
            )}
            {currentIndex < drugScreeningData.length - 1 && (
              <button onClick={handleNext} className="profile-rectangular-button">Next</button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading drug screening data...</p>
      )}
    </div>
  );
};

export default Drugscreeningprofile;