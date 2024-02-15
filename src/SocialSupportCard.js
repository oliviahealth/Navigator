import React, { useState } from 'react';
import ProgressNavBar from './ProgressNavBar';

const SocialSupportsCard = () => {
  const userId = localStorage.getItem('userId');
  const socialSupportSubmitted = localStorage.getItem('socialSupportSubmitted');
  const [formSubmitted, setFormSubmitted] = useState(socialSupportSubmitted === 'true');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    peopleInHome: [{ firstName: '', lastName: '', dob: '', relationship: '' }],
    goals: '',
    support: '',
    feelings: '',
  });

    // Total number of steps in the form
    const totalSteps = 4;

    // Function to navigate between steps (optional)
    const onNavigate = (index) => {
      setCurrentStep(index);
    };

  const handleChange = (index, key, value) => {
    const updatedPeopleInHome = answers.peopleInHome.map((person, i) => {
      if (i === index) {
        return { ...person, [key]: value };
      }
      return person;
    });

    setAnswers({ ...answers, peopleInHome: updatedPeopleInHome });
  };

  const addPerson = () => {
    setAnswers({
      ...answers,
      peopleInHome: [
        ...answers.peopleInHome,
        { firstName: '', lastName: '', dob: '', relationship: '' },
      ],
    });
  };

  const removePerson = (index) => {
    const updatedPeopleInHome = answers.peopleInHome.filter((_, i) => i !== index);
    setAnswers({ ...answers, peopleInHome: updatedPeopleInHome });
  };

  const handleInputChange = (value, field) => {
    setAnswers({ ...answers, [field]: value });
  };

  const nextStep = () => {
    setCurrentStep((prevCurrentStep) => Math.min(prevCurrentStep + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prevCurrentStep) => Math.max(prevCurrentStep - 1, 0));
  };

  const handleFinalSubmit = async () => {
    // Prepare the data to be sent to the backend
    const formData = {
      user_id: userId, // Assuming you have the user's ID stored in the state or context
      goals: answers.goals,
      support: answers.support,
      feelings: answers.feelings,
      people_in_home: answers.peopleInHome.map(person => ({
        first_name: person.firstName,
        last_name: person.lastName,
        date_of_birth: person.dob,
        relationship: person.relationship
      }))
    };
  
    try {
      // Send a POST request to the backend
      const response = await fetch('/api/plan-of-safe-care/social-supports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        console.log('Data sent successfully!');
        localStorage.setItem('socialSupportSubmitted', 'true');
        setFormSubmitted(true); // Mark the form as submitted
      } else {
        console.error('Failed to send data to the backend:', await response.text());
      }
    } catch (error) {
      console.error('An error occurred while sending data to the backend:', error);
    }
  };

  if (socialSupportSubmitted === 'true') {
    return <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
      <h2 className = "headerstyle"> Social Supports </h2>
        <p>Thank you for submitting the form!</p>
    </div>;
  }

  if (formSubmitted) {
    return (
      <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
        <h2 className="headerstyle">Social Supports</h2>
        <p>Thank you for submitting the form!</p>
      </div>
    );
  }
  

  return (
    <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
        <ProgressNavBar 
          totalQuestions={totalSteps}
          currentQuestionIndex={currentStep}
          onNavigate={onNavigate} 
        />
      <h2 className = "headerstyle">Social Supports</h2>
      <div className="question-container">
        {currentStep === 0 && (
          <>
            <h3>Enter the contact information of people in Home (First Name, Last Name, Date of Birth, Relationship)</h3>
            {answers.peopleInHome.map((person, index) => (
              <div key={index} className="contact-entry">
                <input
                  type="text"
                  placeholder="First Name"
                  value={person.firstName}
                  onChange={(e) => handleChange(index, 'firstName', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={person.lastName}
                  onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                />
                <input
                  type="date"
                  value={person.dob}
                  onChange={(e) => handleChange(index, 'dob', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  value={person.relationship}
                  onChange={(e) => handleChange(index, 'relationship', e.target.value)}
                />
                <button onClick={() => removePerson(index)}>Remove</button>
              </div>
            ))}
            <button onClick={addPerson}>Add Person</button>
          </>
        )}
        {currentStep === 1 && (
          <>
            <h3>What are your goals? (Parenting, Breastfeeding, Recovery, Etc.)</h3>
            <textarea
              className="w-full p-2 rounded-md border border-black focus:outline-none focus:ring focus:border-transparent"
              value={answers.goals}
              onChange={(e) => handleInputChange(e.target.value, 'goals')}
              placeholder="Describe your goals..."
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <h3>Who is there as your current support? (Can be friends, family, community, recovery, etc. members)</h3>
            <textarea
              className="w-full p-2 rounded-md border border-black focus:outline-none focus:ring focus:border-transparent"
              value={answers.support}
              onChange={(e) => handleInputChange(e.target.value, 'support')}
              placeholder="Who supports you..."
            />
          </>
        )}
        {currentStep === 3 && (
          <>
           <h3>How do these relationships make you feel?</h3>
            <textarea
              className="w-full p-2 rounded-md border border-black focus:outline-none focus:ring focus:border-transparent"
              value={answers.feelings}
              onChange={(e) => handleInputChange(e.target.value, 'feelings')}
              placeholder="How do you feel about your relationships..."
            />


          </>
        )}
      </div>
      <div className="question-container">
        {currentStep > 0 && <button onClick={prevStep}>Previous</button>}
        {currentStep < 3 && <button onClick={nextStep}>Next</button>}
        {currentStep === 3 && <button onClick={handleFinalSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default SocialSupportsCard;
