import React, { useState } from 'react';
import { useAuth } from './AuthContext';


const DrugScreeningResult = () => {
  const { authenticated } = useAuth();
  const userId = localStorage.getItem('userId');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [results, setResults] = useState([
    {
      dateCollected: '',
      orderedBy: '',
      result: 'Negative',
      providerReviewed: 'No',
      specifyResult: '',
    },
  ]);

  const handleAddResult = () => {
    setResults([...results, { dateCollected: '', orderedBy: '', result: 'Negative', providerReviewed: 'No', specifyResult: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedResults = [...results];
    updatedResults[index][field] = value;
    setResults(updatedResults);
  };
  const handleRemoveResult = () => {
    if (results.length > 1) {
      const updatedResults = results.slice(0, -1);
      setResults(updatedResults);
    }
  };

  const handleFinalSubmit = async () => {
    // Prepare the data to be sent to the backend
    const formData = {
      userId: userId, // Include the userId if needed by the backend
      drugScreeningResults: results.map(result => ({
        dateCollected: result.dateCollected,
        orderedBy: result.orderedBy,
        result: result.result,
        providerReviewed: result.providerReviewed === 'Yes',
        specifyResult: result.result === 'Positive' ? result.specifyResult : null,
      })),
    };
  
    try {
      // Send a POST request to the backend
      const response = await fetch('/api/plan-of-self-care/drug-screening-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        console.log('Data sent successfully!');
        setFormSubmitted(true); // Mark the form as submitted
        // Additional logic here if needed, e.g., redirecting the user or updating the state
      } else {
        console.error('Failed to send data to the backend:', await response.text());
        // Handle the error case, e.g., showing an error message to the user
      }
    } catch (error) {
      console.error('An error occurred while sending data to the backend:', error);
      // Handle the network error case, e.g., showing an error message to the user
    }
  };

  if(formSubmitted){
    return (
      <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
        <p>Thank you for submitting the form!</p>
      </div>
    );
  }
  

  return (
    <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">

              
      {authenticated ? (
        <>
          <h2 className = "headerstyle">Drug Screening Results</h2>
          {formSubmitted ? (
            <p>Thank you for submitting the form!</p>
          ) : (
            <div className="question-container">
              {results.map((result, index) => (
                <div key={index}>
                  <p>Result {index + 1}</p>
                  <label>Date Collected:</label>
                  <input
                    type="date"
                    value={result.dateCollected}
                    onChange={(e) => handleInputChange(index, 'dateCollected', e.target.value)}
                  />
                  <label>Ordered by (Provider and Location):</label>
                  <input
                    type="text"
                    value={result.orderedBy}
                    onChange={(e) => handleInputChange(index, 'orderedBy', e.target.value)}
                  />
                  <label>Results:</label>
                  <select
                    value={result.result}
                    onChange={(e) => handleInputChange(index, 'result', e.target.value)}
                  >
                    <option value="Negative">Negative</option>
                    <option value="Positive">Positive</option>
                  </select>
                  {result.result === 'Positive' && (
                    <div>
                      <label>Specify Results:</label>
                      <input
                        type="text"
                        value={result.specifyResult}
                        onChange={(e) => handleInputChange(index, 'specifyResult', e.target.value)}
                      />
                    </div>
                  )}
                  <label>Provider Reviewed with you:</label>
                  <select
                    value={result.providerReviewed}
                    onChange={(e) => handleInputChange(index, 'providerReviewed', e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              ))}
              <button onClick={handleAddResult}>Add</button>
              <button onClick={handleRemoveResult}>Remove</button>
              <button onClick={handleFinalSubmit}>Enter</button>
            </div>
          )}
        </>
      ) : (
        <p>You are not authorized to access this page.</p>
      )}
    </div>
  );
};

export default DrugScreeningResult;
