import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Import custom CSS
import { Dropdown } from 'react-bootstrap';

const Navbar2 = () => {
  const { authenticated,logout } = useAuth();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  const toggleAboutDropdown = () => {
    setShowAboutDropdown(!showAboutDropdown);
  };

  return (
    <div className="texas-a-m-branded">
      <div className="logo-container">
        <img
          className="maroon-logo"
          src="/Group.png"
          alt="Logo"
        />
      </div>
      <div className="nav-buttons">
        {authenticated ? (
          <>
            <Link to="/home2" className="nav-button open-sans-button">
              <img src="/Pageone.png" alt="Home" style={{ width: '100px' }} />
            </Link>
            <Link to="/plan-of-safe-care" className="nav-button open-sans-button">
              Plan of Safe Care
            </Link>
            <Link to="/your-documentation" className="nav-button open-sans-button">
              Documentation
            </Link>
            <Dropdown
              show={showAboutDropdown}
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
            <Dropdown.Toggle
              variant="none"
              id="about-dropdown"
              className="custom-about-toggle about-toggle-button open-sans-button"
              >
              About
              </Dropdown.Toggle>
              <Dropdown.Menu className={`custom-dropdown-menu ${showAboutDropdown ? 'show' : ''}`}>
                <Dropdown.Item className="custom-dropdown-item">
                  <Link to="/faq" className="custom-dropdown-link">
                    FAQ
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item">
                  <Link to="/contact" className="custom-dropdown-link">
                    Contact
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/profile" className="nav-button open-sans-button">
              Profile
            </Link>
            <a
              href="https://oliviahealth.org/"
              className="nav-button open-sans-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              OliviaHealth
            </a>
            <Link to="/" className="nav-button open-sans-button" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-button open-sans-button">
              <img src="/Pageone.png" alt="Home" style={{ width: '100px' }} />
            </Link>
            <a
              href="https://oliviahealth.org/"
              className="nav-button open-sans-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              OliviaHealth
            </a>
            <Link to="/signin" className="nav-button open-sans-button">
              Signin/Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar2;
