import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import ProgressNavBar from './ProgressNavBar';


const MaternalDemographicsCard = () => {
  //get userId from localStoage
  const userId = localStorage.getItem('userId');
  const { authenticated } = useAuth();

  const maternalDemographicsSubmitted = localStorage.getItem('maternalDemographicsSubmitted');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [formSubmitted, setFormSubmitted] = useState(maternalDemographicsSubmitted === 'true');
  
  const onNavigate = (index) => {
    setCurrentQuestionIndex(index);
  };
  const [answers, setAnswers] = useState(Array(8).fill(''));
  const [emergencyContact, setEmergencyContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    state: '',
  });

  const [phoneNum, setPhone] = useState({
    phone: '',
  });
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: '',
    state: '',
  });
  
  const questions = [
    'Name:',
    'Date of Birth:',
    'Current Living Arrangement:',
    'Street Address:',
    'Primary Phone Number:',
    'Emergency Contact (Name, Phone number, Address):',
    'Marital Status:',
    'Do you have insurance?',
  ];

  const answerTypes = [
    'text', // Name
    'date', // Date of Birth (Changed to date input)
    'radio', // Current Living Arrangement
    'text', // Street Address
    'tel', // Updated input type for Primary Phone Number
    'group', // Group for Emergency Contact
    'radio', // Marital Status
    'radio', // Do you have insurance
  ];

  // Additional options for 'Current Living Arrangement'
  const currentLivingArrangementOptions = [
    'Rent/Own a Home',
    'Living with Relatives or Friends',
    'Residential Treatment Center',
    'Correctional Facility',
    'Emergency Shelter',
    'Homeless',
    'Other',
  ];

  // Options for 'Marital Status' and 'Do you have insurance'
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];

  const insuranceOptions = ['Yes', 'No'];

  const handleNextClick = () => {
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  
  const handlePreviousClick = () => {
    // Move to the previous question
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleFinalSubmit = async () => {
    // Assuming you have all the necessary state variables defined and updated
    // with the user's input as they interact with the form.
  
    // Construct the payload to match the backend's expected structure
    const payload = {
      userId: userId, // Replace with actual user ID variable
      name: {
        firstName: name.firstName,
        lastName: name.lastName,
      },
      address: {
        street: address.street,
        city: address.city,
        zip: address.zip,
        state: address.state,
      },
      phoneNum: {
        phone: phoneNum.phone,
      },
      emergencyContact: {
        firstName: emergencyContact.firstName,
        lastName: emergencyContact.lastName,
        phone: emergencyContact.phone,
        street: emergencyContact.street,
        city: emergencyContact.city,
        zip: emergencyContact.zip,
        state: emergencyContact.state,
      },
      maritalStatus: answers[6], // Replace with actual state variable if available
      hasInsurance: answers[7], // Replace with actual state variable if available
      dateOfBirth: answers[1], // Replace with actual state variable if available
      currentLivingArrangement: answers[2], // Replace with actual state variable if available
    };
  
    try {
      const response = await fetch('/api/plan-of-safe-care/maternal-demographics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.status === 200) {
        console.log('Data sent successfully');
        // Update the form submission status in local storage
        localStorage.setItem('maternalDemographicsSubmitted', true);
        setFormSubmitted(true);
        
      } else {
        console.error('Error sending data');
      }
    } catch (error) {
      console.error('There was an error sending the data:', error);
    }
  };
  

  const handleInputChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;

    // Update the answers array when the user types
    setAnswers(newAnswers);
  };



  const handleRadioChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;

    // Update the answers array when the user selects a radio option
    setAnswers(newAnswers);
  };

  const handlePhoneInputChange = (event) => {
    const { value } = event.target;
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, '');
    // Update the phoneNum state with the numeric value
    setPhone({ phone: numericValue });
  };
  
  

  const handleGroupInputChange = (event, fieldName) => {
    const { value } = event.target;
  
    // If the field is 'phone', we want to ensure it's only numbers
    if (fieldName === 'phone') {
      // Check if the entered value is numeric by trying to convert it to a number
      const numericValue = value.replace(/\D/g, ''); // Remove non-digits
      // Now, update only if the value is numeric
      setEmergencyContact((prevState) => ({
        ...prevState,
        [fieldName]: numericValue
      }));
    } else {
      // For all other fields, update the state normally
      setEmergencyContact((prevState) => ({
        ...prevState,
        [fieldName]: value
      }));
    }
  };

  // useEffect(() => {
  //   const checkIfFormSubmitted = async () => {
  //     const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
  //     try {
  //       const response = await fetch(`/api/check-form-submission/${userId}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       const data = await response.json();
  //       if (response.ok) {
  //         setFormSubmitted(data.submitted); // Set the form submission status
  //       } else {
  //         throw new Error(data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error checking form submission:', error);
  //     } finally {
  //       setIsLoading(false); // Set loading to false after the check
  //     }
  //   };
  //   checkIfFormSubmitted();
  //   }, []);

  // if (formSubmitted) {
  //   return (
  //       <div className="maternal-demographics-card">
  //           <p>Thank you for submitting the form!</p>
  //       </div>
  //   );
  // }

  // useEffect(() => {
  //   if (maternalDemographicsSubmitted) {
  //     // Show a message or handle the case when the form is already submitted
  //     setFormAlreadySubmitted(true);
  //   }
  // }, [maternalDemographicsSubmitted]);

  if (maternalDemographicsSubmitted === 'true') {
    return <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
      <h2 className = "headerstyle"> Maternal Demographics </h2>
        <p>Thank you for submitting the form!</p>
    </div>;
  }

  if (formSubmitted) {
    return (
      <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
        <h2 className="headerstyle">Maternal Demographics</h2>
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
                <h2 className = "headerstyle"> Maternal Demographics </h2>
                { formSubmitted ? (
                    <p>Thank you for submitting the form!</p>
                  ):(
                    <div className="question-container">
                        <p>{questions[currentQuestionIndex]}</p>

                        {answerTypes[currentQuestionIndex] === 'text' && currentQuestionIndex == 0 &&(
                           <>
                           <input
                             type="text"
                             placeholder="First Name"
                             value={name.firstName}
                             onChange={(e) => setName({ ...name, firstName: e.target.value })}
                           />
                           <input
                             type="text"
                             placeholder="Last Name"
                             value={name.lastName}
                             onChange={(e) => setName({ ...name, lastName: e.target.value })}
                           />
                         </>
                        )}

                        {answerTypes[currentQuestionIndex] === 'date' && (
                            <input
                                type="date"
                                value={answers[currentQuestionIndex]}
                                onChange={handleInputChange}
                            />
                        )}

                        {answerTypes[currentQuestionIndex] === 'radio' && currentQuestionIndex === 2 && (
                            currentLivingArrangementOptions.map((option) => (
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

                        {answerTypes[currentQuestionIndex] === 'text' && currentQuestionIndex === 3 && (
                        <>
                            <input
                            type="text"
                            placeholder="Street"
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            />
                            <input
                            type="text"
                            placeholder="City"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            />
                            <input
                            type="text"
                            placeholder="ZIP"
                            value={address.zip}
                            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                            />
                            <input
                            type="text"
                            placeholder="State"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            />
                        </>
                        )}


                        {answerTypes[currentQuestionIndex] === 'radio' && currentQuestionIndex === 6 && (
                            maritalStatusOptions.map((option) => (
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

                        {answerTypes[currentQuestionIndex] === 'radio' && currentQuestionIndex === 7 && (
                            insuranceOptions.map((option) => (
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

                         
                        {answerTypes[currentQuestionIndex] === 'tel' && (
                        <input
                            type="tel"
                            inputMode="numeric"
                            maxLength="15" // Keep the maxLength as 15 to prevent more digits from being entered
                            pattern="[0-9]*"
                            value={phoneNum.phone} // Use the phoneNum state here
                            onChange={handlePhoneInputChange}
                            placeholder="Enter phone number"
                        />
                        )}

                                            
                      {answerTypes[currentQuestionIndex] === 'group' && (
                        <>
                            <h3>Emergency Contact Name</h3>
                            <input
                            type="text"
                            placeholder="First Name"
                            value={emergencyContact.firstName}
                            onChange={(e) => handleGroupInputChange(e, 'firstName')}
                            />
                            <input
                            type="text"
                            placeholder="Last Name"
                            value={emergencyContact.lastName}
                            onChange={(e) => handleGroupInputChange(e, 'lastName')}
                            />
                            
                            <h3>Phone Information</h3>
                            <input
                            type="tel"
                            inputMode="numeric"
                            placeholder="Phone Number"
                            pattern="[0-9]*"
                            maxLength="15"
                            value={emergencyContact.phone}
                            onChange={(e) => handleGroupInputChange(e, 'phone')}
                            />

                            <h3>Address Information</h3>
                            <input
                            type="text"
                            placeholder="Street"
                            value={emergencyContact.street}
                            onChange={(e) => handleGroupInputChange(e, 'street')}
                            />
                            <input
                            type="text"
                            placeholder="City"
                            value={emergencyContact.city}
                            onChange={(e) => handleGroupInputChange(e, 'city')}
                            />
                            <input
                            type="text"
                            placeholder="ZIP"
                            pattern="\d{5}(-\d{4})?"
                            maxLength="10"
                            value={emergencyContact.zip}
                            onChange={(e) => handleGroupInputChange(e, 'zip')}
                            />
                            
                            <input
                            type="text"
                            placeholder="State"
                            value={emergencyContact.state}
                            onChange={(e) => handleGroupInputChange(e, 'state')}
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
            <p>Thank You!</p>
        )}
    </div>
  );

};

export default MaternalDemographicsCard;
