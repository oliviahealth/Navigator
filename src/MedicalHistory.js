import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import ProgressNavBar from './ProgressNavBar';

const MedicalHistory = () => {
  const userId = localStorage.getItem('userId');
  const { authenticated } = useAuth();
  const medicalHistorySubmitted = localStorage.getItem('medicalHistorySubmitted');
  const [formSubmitted, setFormSubmitted] = useState(medicalHistorySubmitted === 'true');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(11).fill(''));
  const [additionalQuestionsVisible, setAdditionalQuestionsVisible] = useState(false);
  const [locationAnswer, setLocationAnswer] = useState('');
  const [dateCompletedAnswer, setDateCompletedAnswer] = useState('');

  const onNavigate = (index) => {
    setCurrentQuestionIndex(index);
  };
  
  const questions = [
    'Prenatal Care (for current or most recent pregnancy)',
    'Age at Entry of Care (When you join POSC):',
    'How many weeks pregnant:',
    'Anticipated Delivery Date:',
    'Planned Mode of Delivery:',
    'Actual Mode of Delivery:',
    'Attended Postpartum Visit:',
    'Obstetric History: Please Explain Complications During Prior Pregnancies:',
    'Total Number of Pregnancies:',
    'Number of Live Births:',
    'Number of Children Currently Living with Mother:',
  ];

  const answerTypes = [
    'text',
    'text',
    'number',
    'date',
    'radio',
    'radio',
    'radio',
    'text',
    'number',
    'number',
    'number',
  ];

  const vaginalCesareanOptions = ["Vaginal",  "Cesarean"];
  const yesNoOptions = ['Yes', 'No'];

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  
  const handleFinalSubmit = async () => {
    console.log(answers);


    // Prepare the data to be sent to the backend
    const formData = {
      user_id: userId, // Assuming you have the user's ID stored in the state or context
      prenatal_care: answers[0],
      age_at_entry_of_care: answers[1],
      weeks_pregnant: parseInt(answers[2]),
      anticipated_delivery_date: answers[3],
      planned_mode_of_delivery: answers[4],
      actual_mode_of_delivery: answers[5],
      attended_postpartum_visit: answers[6] === 'Yes',
      obstetric_history: answers[7],
      total_number_of_pregnancies: parseInt(answers[8]),
      number_of_live_births: parseInt(answers[9]),
      number_of_children_currently_living_with_mother: parseInt(answers[10]),
    };
    if (answers[6] === 'Yes'){
      formData.postpartum_visit_location = locationAnswer;
      formData.postpartum_visit_date = dateCompletedAnswer;
    }
    else{
      formData.postpartum_visit_location = '';
      formData.postpartum_visit_date = '';
    }

    try {
      // Send a POST request to the backend
      const response = await fetch('/api/plan-of-safe-care/medical-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful
      if (response.ok) {
        console.log('Data sent successfully!');
        localStorage.setItem('medicalHistorySubmitted', 'true');
        setFormSubmitted(true); // Mark the form as submitted
      } else {
        console.error('Failed to send data to the backend:', await response.text());
      }
    } catch (error) {
      console.error('An error occurred while sending data to the backend:', error);
    }

    
};

  

  const handleInputChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };
  

  const handleRadioChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);

    // Check if the current question is about attending Postpartum Visit
    if (currentQuestionIndex === 6) {
      if (event.target.value === 'Yes') {
        // If "Yes" is selected, show additional questions
        setAdditionalQuestionsVisible(true);
      } else {
        // If "No" is selected, hide additional questions
        setAdditionalQuestionsVisible(false);
      }
    }
  };

  if (medicalHistorySubmitted === 'true') {
    return <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
      <h2 className = "headerstyle"> Medical History </h2>
        <p>Thank you for submitting the form!</p>
    </div>;
  }

  if (formSubmitted) {
    return (
      <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
        <h2 className="headerstyle">Medical History</h2>
        <p>Thank you for submitting the form!</p>
      </div>
    );
  }


  return (
    <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
     <ProgressNavBar 
        totalQuestions={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        onNavigate={onNavigate} // using the onNavigate function
      />
      {authenticated ? (
        <>
          <h2 className = "headerstyle">Medical History</h2>
          {formSubmitted ? (
            <p>Thank you for submitting the form!</p>
          ) : (
            <div className="question-container">
              <p>{questions[currentQuestionIndex]}</p>
              {answerTypes[currentQuestionIndex] === 'text' && (
                <input
                  type="text"
                  value={answers[currentQuestionIndex]}
                  onChange={handleInputChange}
                />
              )}
              {answerTypes[currentQuestionIndex] === 'number' && (
                <input
                  type="number"
                  value={answers[currentQuestionIndex]}
                  onChange={handleInputChange}
                />
              )}
              {answerTypes[currentQuestionIndex] === 'date' && (
                <input
                  type="date"
                  value={answers[currentQuestionIndex]}
                  onChange={handleInputChange}
                />
              )}
              {answerTypes[currentQuestionIndex] === 'radio' && (
                <div>
                  {currentQuestionIndex === 4 || currentQuestionIndex === 5 ? (
                    vaginalCesareanOptions.map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          value={option}
                          checked={answers[currentQuestionIndex] === option}
                          onChange={handleRadioChange}
                        />
                        {option}
                      </label>
                    ))
                  ) : (
                    yesNoOptions.map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          value={option}
                          checked={answers[currentQuestionIndex] === option}
                          onChange={handleRadioChange}
                        />
                        {option}
                      </label>
                    ))
                  )}
                </div>
              )}
 {currentQuestionIndex === 6 && additionalQuestionsVisible && (
      <>
        <p>Location:</p>
        <input
          type="text"
          value={locationAnswer}
          onChange={(event) => setLocationAnswer(event.target.value)}
        />
        <p>Date Completed:</p>
        <input
          type="date"
          value={dateCompletedAnswer}
          onChange={(event) => setDateCompletedAnswer(event.target.value)}
        />
      </>
    )}
              <div>
                {currentQuestionIndex > 0 && (
                  <button onClick={handlePreviousClick}>Previous</button>
                )}
                {currentQuestionIndex < questions.length - 1 ? (
                  <button onClick={handleNextClick}>Next</button>
                ) : (
                  <button onClick={handleFinalSubmit}>Enter</button>
                )}
              </div>
              <div className="question-number-indicator">
                     Question {currentQuestionIndex + 1}
                 </div>
            </div>
          )}
        </>
      ) : (
        <p>You are not authorized to access this page.</p>
      )}
    </div>
  );
};
export default MedicalHistory;


