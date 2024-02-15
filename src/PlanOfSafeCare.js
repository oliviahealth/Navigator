import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import "./App.css"; // Import the CSS file

const PlanOfSafeCare = () => {
  const { authenticated } = useAuth(); // Get the authenticated state from the context

  if (!authenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" />;
  }
  


  return (
    <div>
      <div className="button-container">
        <div className="button-row">
        <Link to="/plan-of-safe-care/maternal-demographics" className="rectangular-button">
          <div className="button-bg-image" style={{ backgroundImage: 'url(/MaternalDemographics.jpg)' }}></div>
          Maternal Demographics
        </Link>
        <Link to="/plan-of-safe-care/medical-history" className="rectangular-button">
          <div className="button-bg-image" style={{ backgroundImage: 'url(/MaternalDemographics.jpg)' }}></div>
          Medical History
        </Link>
        <Link to="/plan-of-safe-care/services-for-substance-use" className="rectangular-button">
          <div className="button-bg-image" style={{ backgroundImage: 'url(/MaternalDemographics.jpg)' }}></div>
          Services for Substance Use
        </Link>
        <Link to="/plan-of-safe-care/drug-screening-results" className="rectangular-button">
          <div className="button-bg-image" style={{ backgroundImage: 'url(/MaternalDemographics.jpg)' }}></div>
          Drug Screening Results
        </Link>
        </div>
        <div className="button-row">
        <Link to="/plan-of-safe-care/social-support" className="rectangular-button">
          <div className="button-bg-image" style={{ backgroundImage: 'url(/MaternalDemographics.jpg)' }}></div>
          Social Supports
        </Link>
        <Link to="/plan-of-safe-care/infant-demographics" className="rectangular-button">
          <div className="button-bg-image" style={{ backgroundImage: 'url(/MaternalDemographics.jpg)' }}></div>
          Infant Information
        </Link>
        <Link to="/plan-of-safe-care/services-card" className="rectangular-button">
          <div className="button-bg-image" style={{ backgroundImage: 'url(/MaternalDemographics.jpg)' }}></div>
          Referrals and Services
        </Link>
        <Link to="/plan-of-safe-care/relapse-card" className="rectangular-button">
          <div className="button-bg-image" style={{ backgroundImage: 'url(/MaternalDemographics.jpg)' }}></div>
          Relapse Prevention Plan
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanOfSafeCare;

