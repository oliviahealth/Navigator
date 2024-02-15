import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSide from './SignInSide';
import SignUp from './SignUp';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./Navbar2";
import Home from "./Home";
import PlanOfSafeCare from "./PlanOfSafeCare";
import YourDocumentation from "./YourDocumentation";
import About from "./About";
import SubBar from "./SubBar";
import Home2 from "./HomeAuthenticated";
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import MaternalDemographicsCard from './MaternalDemographicsCard';
import MedicalHistory from './MedicalHistory';
import SocialSupportCard from './SocialSupportCard';
import ChildInformationCard from './ChildInformationCard';
import ServicesCard from './ServicesCard';
import RelapsePlanCard from './RelapsePlanCard';
import SubstanceUseServices from'./Substanceuse';
import DrugScreeningResult from './Drugscreening'
import Profile  from './profile';
import { useAuth } from './AuthContext';
import Faq from './faq';
import Contact from './contact';
function App() {
  const { authenticated } = useAuth(); 
  return (
 
    <Router>
      <Navbar2 />
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/home2" /> : <Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/plan-of-safe-care" element={<PlanOfSafeCare />} />
        <Route path="/documentation" element={<YourDocumentation />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plan-of-safe-care/maternal-demographics" element={<MaternalDemographicsCard />} />
        <Route path="/plan-of-safe-care/medical-history" element={<MedicalHistory />} />
        <Route path="/plan-of-safe-care/social-support" element={<SocialSupportCard />} />
        <Route path="/plan-of-safe-care/infant-demographics" element={<ChildInformationCard />} />
        <Route path="/plan-of-safe-care/services-card" element={<ServicesCard />} />
        <Route path="/plan-of-safe-care/relapse-card" element={<RelapsePlanCard />} />
        <Route path="/plan-of-safe-care/services-for-substance-use" element={<SubstanceUseServices/>} />
        <Route path="/plan-of-safe-care/drug-screening-results" element={<DrugScreeningResult/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/contact" element={<Contact/>} />

      </Routes>
      <SubBar />
    </Router>
   
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

