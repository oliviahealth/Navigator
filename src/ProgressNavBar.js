import React from 'react';
import './App.css'; // Ensure you have this CSS file for styles
import './ProgressBar.css'; // Ensure you have this CSS file for styles


const ProgressNavBar = ({ totalQuestions, currentQuestionIndex, onNavigate }) => {
    const progressPercentage = (currentQuestionIndex + 1) / totalQuestions * 100;
  
    return (
      <>
        {/* Progress bar */}
        <div className="progress-meter">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
            <span className="progress-text">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
        </div>
  
        {/* Sidebar navigation */}
        <div className="sidebar-navigation">
          <div className="question-list">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <button
                key={index}
                className={`question-button ${currentQuestionIndex === index ? 'active' : ''}`}
                onClick={() => onNavigate(index)}
              >
                Question {index + 1}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default ProgressNavBar;