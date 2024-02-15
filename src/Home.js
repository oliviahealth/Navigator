import React from "react";
import './background.css'; // Import the CSS
import { Link } from 'react-router-dom'; // Import Navigate

const Home = () => {
  const handleButtonClick = (buttonId) => {
    console.log(`Button ${buttonId} clicked`);
  };

  return (
    React.createElement("div", { className: "background-container" },
      React.createElement("div", { className: "text-container" },
        React.createElement("div", { className: "header-home" }, "PageOne"),
        <Link to="/signin">
        <button id="button1">Get started</button>
      </Link>
      )
    )
  );
};

export default Home;
