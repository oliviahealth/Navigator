import React, { Component } from 'react';
import ProgressNavBar from './ProgressNavBar';

class RelapsePlanCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: localStorage.getItem('userId'),
      formSubmitted: localStorage.getItem('relapse_plan_submitted') === 'true',
      currentQuestionIndex: 0,
      questions: [
        'List 3 things that you know trigger your desire to use:',
        'List 3 skills or things you enjoy doing that can help get your mind off using:',
        'List 3 people you can talk to if you are thinking about using:',
        'In the case I relapse, my safe caregivers will be:',
      ],
      answerTypes: [
        'list', // List of triggers
        'list', // Skills or things to get mind off using
        'list', // List of people to talk to
        'group', // Safe caregivers
      ],
      listAnswers: [['', '', ''], ['', '', ''], ['', '', '']], // Initialize list answers with empty strings
      safeCaregivers: [
        {
          firstName: '',
          lastName: '',
          contactNumber: '',
          relationship: '',
        },
        {
          firstName: '',
          lastName: '',
          contactNumber: '',
          relationship: '',
        },
      ],
    };

    // Define placeholders for each type of question
    this.listPlaceholders = [
      'Item 1', 'Item 2', 'Item 3',
      'Skill 1', 'Skill 2', 'Skill 3',
      'Person 1', 'Person 2', 'Person 3',
    ];

    this.groupPlaceholders = [
      'First Name', 'Last Name', 'Contact Number', 'Relationship',
      'First Name', 'Last Name', 'Contact Number', 'Relationship',
    ];
  }

  handleNextClick = () => {
    // Move to the next question or step
    this.setState((prevState) => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }));
  };

  handlePrevClick = () => {
    // Move to the previous question or step
    this.setState((prevState) => ({
      currentQuestionIndex: prevState.currentQuestionIndex - 1,
    }));
  };

  handleInputChange = (event, index) => {
    const { currentQuestionIndex, listAnswers } = this.state;
    const newAnswers = [...listAnswers];
  
    // Update the specific item in the listAnswers array
    newAnswers[currentQuestionIndex][index] = event.target.value;
  
    // Update the state with the new listAnswers array
    this.setState({ listAnswers: newAnswers });
  };
  

  handleGroupInputChange = (event, index, field) => {
    const { safeCaregivers } = this.state;
    const updatedSafeCaregivers = [...safeCaregivers];
    updatedSafeCaregivers[index][field] = event.target.value;

    // Restrict the contact number field to accept only numbers with a max length of 15
    if (field === 'contactNumber') {
      updatedSafeCaregivers[index][field] = event.target.value.replace(/[^0-9]/g, '').slice(0, 15);
    }

    this.setState({ safeCaregivers: updatedSafeCaregivers });
  };

  handleFinalSubmit = async () => {
    const { listAnswers, safeCaregivers, userId } = this.state; // Assuming you have userId in your state
  
    // Prepare the data in the format expected by the backend
    const formData = {
      userId: userId,
      triggers: listAnswers[0], // Assuming the first list answer contains triggers
      skills: listAnswers[1], // Assuming the second list answer contains skills
      peopleToTalk: listAnswers[2], // Assuming the third list answer contains people to talk to
      safeCaregivers: safeCaregivers.map(caregiver => ({
        firstName: caregiver.firstName,
        lastName: caregiver.lastName,
        contactNumber: caregiver.contactNumber,
        relationship: caregiver.relationship
      }))
    };
  
    try {
      // Send a POST request to the backend
      const response = await fetch('/api/plan-of-safe-care/relapse-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        console.log('Data sent successfully!');
        localStorage.setItem('relapse_plan_submitted', 'true');
        this.setState({ formSubmitted: true }); // Mark the form as submitted
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
  

  render() {
    const { currentQuestionIndex, questions, answerTypes, listAnswers, safeCaregivers } = this.state;
  
    const placeholders = {
      list: this.listPlaceholders,
      group: this.groupPlaceholders,
    };
  
    if (this.state.formSubmitted) {
      return (
        <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
          <h2 className="headerstyle">Relapse Plan</h2>
          <p>Relapse Plan submitted!</p>
        </div>
      );
    }
    if (localStorage.getItem('relapse_plan_submitted') === 'true') {
      return (
        <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
          <h2 className="headerstyle">Relapse Plan</h2>
          <p>Relapse Plan submitted!</p>
        </div>
      );
    }
  
    return (
      <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md text-center">
        <ProgressNavBar 
          totalQuestions={questions.length}
          currentQuestionIndex={currentQuestionIndex}
          onNavigate={(index) => this.setState({ currentQuestionIndex: index })}
        />
        <h2 className="headerstyle">Relapse Plan</h2>
        <div className="question-container">
          {currentQuestionIndex < questions.length ? (
            <>
              <p>{questions[currentQuestionIndex]}</p>
              {answerTypes[currentQuestionIndex] === 'list' ? (
                <>
                  {[0, 1, 2].map((itemIndex) => (
                    <div key={itemIndex}>
                      <input
                        type="text"
                        placeholder={placeholders.list[currentQuestionIndex * 3 + itemIndex]}
                        value={listAnswers[currentQuestionIndex][itemIndex]}
                        onChange={(e) => this.handleInputChange(e, itemIndex)}
                      />
                    </div>
                  ))}
                  <div>
                    {currentQuestionIndex > 0 && <button onClick={this.handlePrevClick}>Previous</button>}
                    {currentQuestionIndex < questions.length - 1 ? (
                      <button onClick={this.handleNextClick}>Next</button>
                    ) : (
                      <button onClick={this.handleNextClick}>Enter</button>
                    )}
                  </div>
                </>
              ) : answerTypes[currentQuestionIndex] === 'group' ? (
                <>
                  {safeCaregivers.map((caregiver, index) => (
                    <div key={index}>
                      <label>{`Safe Caregiver ${index + 1}`}</label>
                      <input
                        type="text"
                        placeholder={placeholders.group[index * 4]}
                        value={caregiver.firstName}
                        onChange={(e) => this.handleGroupInputChange(e, index, 'firstName')}
                      />
                      <input
                        type="text"
                        placeholder={placeholders.group[index * 4 + 1]}
                        value={caregiver.lastName}
                        onChange={(e) => this.handleGroupInputChange(e, index, 'lastName')}
                      />
                      <input
                        type="text"
                        placeholder={placeholders.group[index * 4 + 2]}
                        value={caregiver.contactNumber}
                        onChange={(e) => this.handleGroupInputChange(e, index, 'contactNumber')}
                      />
                      <input
                        type="text"
                        placeholder={placeholders.group[index * 4 + 3]}
                        value={caregiver.relationship}
                        onChange={(e) => this.handleGroupInputChange(e, index, 'relationship')}
                      />
                    </div>
                  ))}
                  <div>
                    {currentQuestionIndex > 0 && <button onClick={this.handlePrevClick}>Previous</button>}
                    {currentQuestionIndex < questions.length - 1 ? (
                      <button onClick={this.handleNextClick}>Next</button>
                    ) : (
                      <button onClick={this.handleFinalSubmit}>Enter</button>
                    )}
                    
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <div className="question-number-indicator">
                     Question {currentQuestionIndex + 1}
                 </div>
      </div>
    );
  }  
}

export default RelapsePlanCard;
