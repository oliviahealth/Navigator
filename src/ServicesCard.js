import React, { Component } from 'react';
import ProgressNavBar from './ProgressNavBar';

class ServicesCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentQuestionIndex: 0,
            userId: localStorage.getItem('userId'), // Get the user ID from local storage
            serviceNeedsSubmitted: localStorage.getItem('serviceNeedsSubmitted'),
            formSubmitted: localStorage.getItem('serviceNeedsSubmitted') === 'true',
            orgNames: Array(35).fill(''),
            orgContacts: Array(35).fill(''),
            answers: Array(35).fill(null),
            questions: [
                 // SUPPORT SERVICES
           "Parenting Classes",
           "Transportation Services",
           "SSI/Disability",
           "Temporary Assistance for Needy Families (TANF)",
           "Personal Safety",
           "Home Visitation Program",
           "Housing Assistance",
           "Healthy Start Program",
           "CHIP",
   
           // FOOD/NUTRITION
           "Breastfeeding Support",
           "Local Food Pantries",
           "SNAP",
           "Women, Infants, & Children (WIC)",
   
           // HEALTHCARE
           "Health Insurance Enrollment",
           "Prenatal Healthcare",
           "Family Planning",
           "Primary Care",
           "Mental Health/Counseling",
           "Smoking Cessation",
   
           // SUBSTANCE USE TREATMENT
           "Residential",
           "Outpatient",
           "Caring for Two Program",
           "The Cradles Program",
           "Recovery Support Services",
           "Medication-Assisted Treatment (MAT)",
   
           // CHILD RELATED
           "Early Childhood Intervention (ECI)",
           "Early Head Start",
           "NCI/Childcare Subsidy",
           "Pediatrician/Primary Care",
           "Safe Sleep Education",
   
           // LEGAL ASSISTANCE
           "Child Protective Service",
           "Legal Aid",
           "Specialty Court"
           // Add more questions as needed
            ],
            categories: {
                0: 'SUPPORT SERVICES',
                9: 'FOOD/NUTRITION',
                13: 'HEALTHCARE',
                19: 'SUBSTANCE USE TREATMENT',
                25: 'CHILD RELATED',
                30: 'LEGAL ASSISTANCE',
                // Add more categories as needed
            },
        };
    }
   
    getCategoryLabel(index) {
        const { categories } = this.state;
        let categoryLabel = '';
        for (const [key, value] of Object.entries(categories).sort((a, b) => a[0] - b[0])) {
            if (index >= key) {
                categoryLabel = value;
            } else {
                break;
            }
        }
        return categoryLabel;
    }

    handleNextClick = () => {
        const nextIndex = this.state.currentQuestionIndex + 1;
        if (nextIndex < this.state.questions.length) {
            this.setState({ currentQuestionIndex: nextIndex });
        } else {
            console.log('All questions completed!');
            console.log(this.state.answers)
        }
    };

    handlePrevClick = () => {
        const prevIndex = this.state.currentQuestionIndex - 1;
        if (prevIndex >= 0) {
            this.setState({ currentQuestionIndex: prevIndex });
        }
    };

    handleOptionChange = (changeEvent) => {
        const updatedAnswers = [...this.state.answers];
        updatedAnswers[this.state.currentQuestionIndex] = changeEvent.target.value;
        this.setState({ answers: updatedAnswers });
    };

    navigateToQuestion = (index) => {
        this.setState({ currentQuestionIndex: index });
    };

    handleOrgNameChange = (event, index) => {
        const updatedOrgNames = [...this.state.orgNames];
        updatedOrgNames[index] = event.target.value;
        this.setState({ orgNames: updatedOrgNames });
    };
    
    handleContactInfoChange = (event, index) => {
        const updatedContactInfos = [...this.state.orgContacts];
        updatedContactInfos[index] = event.target.value;
        this.setState({ orgContacts: updatedContactInfos });
    };

    handleFinalSubmit = async () => {
        const { answers, orgNames, orgContacts } = this.state;
        const formData = {
            user_id: this.state.userId, // Assuming you have the user's ID stored in the state or context
            answers,
            orgNames,
            orgContacts,
            // Include any other relevant data
        };
    
        try {
            const response = await fetch('/api/plan-of-self-care/service-needs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                console.log('Data sent successfully!');
                localStorage.setItem('serviceNeedsSubmitted', 'true');
                this.setState({ formSubmitted: true });
                // Handle successful submission (e.g., show a success message)
            } else {
                console.error('Failed to send data:', await response.text());
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    

    render() {
        const { currentQuestionIndex, questions, answers } = this.state;
        const currentQuestion = questions[currentQuestionIndex];
        const categoryLabel = this.getCategoryLabel(currentQuestionIndex);
        const options = ['Needed', 'Referred', 'Participating', 'Completed'];
        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        if (this.state.formSubmitted) {
            return (
                <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md lg:max-w-screen-lg text-center">
                    <h2 className = "headerstyle" >Service Needs</h2>
                    <p>Thank you for submitting your responses!</p>
                </div>
            );
        }
        if(this.state.serviceNeedsSubmitted === 'true') {
            return (
                <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md lg:max-w-screen-lg text-center">
                    <h2 className = "headerstyle" >Service Needs</h2>
                    <p>Thank you for submitting your responses!</p>
                </div>
            );
        }

        return (
            <div className="bg-white border-4d0000 border-8 rounded-lg p-4 mx-auto max-w-screen-md lg:max-w-screen-lg text-center">
                    <div className="relative">
             

                 <ProgressNavBar 
                  totalQuestions={questions.length}
                  currentQuestionIndex={currentQuestionIndex}
                  onNavigate={this.navigateToQuestion}
                />
                <h2 className = "headerstyle" >Service Needs</h2>
                {/* Display category label for all questions within the category */}
                <h3>{categoryLabel}</h3>
                <div className="question-container">
                    <p>{currentQuestion}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {options.map((option, index) => (
                            <div key={index} style={{ marginRight: '10px' }}>
                                <label>
                                    <input 
                                        type="radio" 
                                        name={`response_${currentQuestionIndex}`}
                                        value={option}
                                        checked={answers[currentQuestionIndex] === option}
                                        onChange={this.handleOptionChange} 
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="info-inputs" style={{ marginTop: '10px' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Organization Name: </label>
                            <input 
                                type="text" 
                                placeholder="Enter Organization Name" 
                                value={this.state.orgNames[currentQuestionIndex]}
                                onChange={(e) => this.handleOrgNameChange(e, currentQuestionIndex)} 
                            />
                        </div>
                        <div>
                            <label>Organization Contact Information: </label>
                            <input 
                                type="text" 
                                placeholder="Enter Contact Information" 
                                value={this.state.orgContacts[currentQuestionIndex]}
                                onChange={(e) => this.handleContactInfoChange(e, currentQuestionIndex)}
                            />
                        </div>
                    </div>
                </div>
                <div className='question-container'>
                    <button onClick={this.handlePrevClick}>Previous</button>
                    {isLastQuestion ? (
                        <button onClick={this.handleFinalSubmit}>Submit</button>
                    ) : (
                        <button onClick={this.handleNextClick}>Next</button>
                    )}
                </div>
                <div className="question-number-indicator">
                     Question {currentQuestionIndex + 1}
                 </div>
                 <div className="flex-none">
       
    </div>
            </div>
            
            </div>
        );
    }
}

export default ServicesCard;