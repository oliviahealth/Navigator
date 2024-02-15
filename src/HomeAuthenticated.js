import React from "react";
import { useAuth } from './AuthContext'; // Import the useAuth hook
import './background.css'; // Import the CSS
import { Navigate,Link } from 'react-router-dom'; // Import Navigate

const Home2 = () => {
  const { authenticated } = useAuth(); // Get the authenticated state from the context

  const handleButtonClick = (buttonId) => {
    console.log(`Button ${buttonId} clicked`);
  };

  if (!authenticated) {
    return <Navigate to="/" />; // Redirect to signin if not authenticated
  }

  return (
    <div className="background-container">
      <div className="text-container">
        <div className="header-home"> PageOne </div>
        <Link to="/plan-of-safe-care">
          <button id="button1">Plan of Safe Care </button>
        </Link>
        <Link to="/your-documentation">
          <button id="button2">Documentation </button>
        </Link>
        <Link to="/faq">
          <button id="button3">About </button>
        </Link>
      </div>
    </div>
  );
};

export default Home2;


