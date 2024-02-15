import React, {useState, useEffect} from 'react';
import { useAuth } from './AuthContext';

const MedicalHistoryprofile = () => {
  const { authenticated } = useAuth();
  const userId = localStorage.getItem('userId');
  const [medicalHistoryData, setMedicalHistoryData] = useState(null);
  
  const questions = [
    'Prenatal Care (for current or most recent pregnancy)',
    'Age at Entry of Care (When you join POSC):',
    'How many weeks pregnant:',
    'Anticipated Delivery Date:',
    'Planned Mode of Delivery:',
    'Actual Mode of Delivery:',
    'Attended Postpartum Visit:',
    'Location:',
    'Date Completed:',
    'Obstetric History: Please Explain Complications During Prior Pregnancies:',
    'Total Number of Pregnancies:',
    'Number of Live Births:',
    'Number of Children Currently Living with Mother:',
  ];

  useEffect(() => {
    if (authenticated && userId) {
      fetch('/api/medical-history', {
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
        // console.log(data);
        setMedicalHistoryData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  }, [authenticated, userId]);

  useEffect(() => {
    // console.log(medicalHistoryData);
  }, [medicalHistoryData]);

  if (!authenticated) {
    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <div className="service-profile-container">
      <h2>Medical History</h2>
      {medicalHistoryData ? (
        <div>
          <div className="question-container">
            <p>Prenatal Care (for current or most recent pregnancy): <span className="answer">{medicalHistoryData["Prenatal Care"]}</span></p>
          </div>
          <div className="question-container">
            <p>Age at Entry of Care (When you join POSC): <span className="answer">{medicalHistoryData["Age at Entry of Care"]}</span></p>
          </div>
          <div className="question-container">
            <p>How many weeks pregnant: <span className="answer">{medicalHistoryData["Weeks Pregnant"]}</span></p>
          </div>
          <div className="question-container">
            <p>Anticipated Delivery Date: <span className="answer">{medicalHistoryData["Anticipated Delivery Date"]}</span></p>
          </div>
          <div className="question-container">
            <p>Planned Mode of Delivery: <span className="answer">{medicalHistoryData["Planned Mode of Delivery"]}</span></p>
          </div>
          <div className="question-container">
            <p>Actual Mode of Delivery: <span className="answer">{medicalHistoryData["Actual Mode of Delivery"]}</span></p>
          </div>
          <div className="question-container">
            <p>Attended Postpartum Visit: <span className="answer">{medicalHistoryData["Attended Postpartum Visit"] ? 'Yes' : 'No'}</span></p>
          </div>
          <div className="question-container">
            <p>Location: <span className="answer">{medicalHistoryData["Postpartum Visit Location"]}</span></p>
          </div>
          <div className="question-container">
            <p>Date Completed: <span className="answer">{medicalHistoryData["Postpartum Visit Date"]}</span></p>
          </div>
          <div className="question-container">
            <p>Obstetric History: Please Explain Complications During Prior Pregnancies: <span className="answer">{medicalHistoryData["Obstetric History"]}</span></p>
          </div>
          <div className="question-container">
            <p>Total Number of Pregnancies: <span className="answer">{medicalHistoryData["Total Number of Pregnancies"]}</span></p>
          </div>
          <div className="question-container">
            <p>Number of Live Births: <span className="answer">{medicalHistoryData["Number of Live Births"]}</span></p>
          </div>
          <div className="question-container">
            <p>Number of Children Currently Living with Mother: <span className="answer">{medicalHistoryData["Number of Children Living with Mother"]}</span></p>
          </div>
        </div>
      ) : (
        <p>Loading medical history data...</p>
      )}
    </div>
  );
  
  
  
};

export default MedicalHistoryprofile;
