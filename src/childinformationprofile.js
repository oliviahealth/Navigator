import React, {useState, useEffect} from 'react';
import { useAuth } from './AuthContext';

const ChildInformationProfile = () => {
  const { authenticated } = useAuth();
  const userId = localStorage.getItem('userId');
  const [childInformationData, setChildInformationData] = useState(null);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [currentMedicationIndex, setCurrentMedicationIndex] = useState(0);

  const questions = [
    "Child's Full Name:",
    "Child's Date of Birth:",
    "Child's Gender:", 
    "Child's Relationship to You:",
    "Child's medical conditions:",
    "Child's Doctor's Name:",
    "Doctor's Phone Number:", 
    "Date of Last Doctor Visit:",
    "Did your infant stay at the Neonatal Intensive Care Unit (NICU)?:", // Updated NICU Visit question
    'Infant Urine Drug Screening at Birth:', // Updated Infant Urine Drug Screening at Birth
    'Meconium Results:', 
    'Neonatal Opioid Withdraw/Neonatal Abstinence Syndrome:', 
    "Infant’s Medications:",
  ];

  useEffect(() => {
    const fetchChildInformation = async () => {
      try {
        const response = await fetch('/api/child-information', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setChildInformationData(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    if (userId) {
      fetchChildInformation();
      // console.log(childInformationData)
    }
  }, [userId]);
  

  const handleNextChild = () => {
    if (currentChildIndex < childInformationData.length - 1) {
      setCurrentChildIndex(currentChildIndex + 1);
      setCurrentMedicationIndex(0); // Reset medication index when changing child
    }
  };

  const handlePreviousChild = () => {
    if (currentChildIndex > 0) {
      setCurrentChildIndex(currentChildIndex - 1);
      setCurrentMedicationIndex(0); // Reset medication index when changing child
    }
  };

  const handleNextMedication = () => {
    const currentChild = childInformationData[currentChildIndex];
    if (currentMedicationIndex < currentChild.medications.length - 1) {
      setCurrentMedicationIndex(currentMedicationIndex + 1);
    }
  };

  const handlePreviousMedication = () => {
    if (currentMedicationIndex > 0) {
      setCurrentMedicationIndex(currentMedicationIndex - 1);
    }
  };

  if (!authenticated) {
    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <div className="service-profile-container">
      <h2>Child Information</h2>
      {childInformationData && childInformationData.length > 0 ? (
        <>
          <div className="child-info">
            <h3 class="subsectionProfile">Child's Information</h3>
            <p>Child's Full Name: {childInformationData[currentChildIndex].first_name} {childInformationData[currentChildIndex].last_name}</p>
            <p>Child's Date of Birth: {childInformationData[currentChildIndex].date_of_birth}</p>
            <p>Child's Gender: {childInformationData[currentChildIndex].gender}</p>
            <p>Child's Relationship to You: {childInformationData[currentChildIndex].relationship_to_you}</p>
            <p>Child's Medical Conditions: {childInformationData[currentChildIndex].medical_conditions}</p>
            <p>Child's Doctor's Name: {childInformationData[currentChildIndex].doctor_first_name} {childInformationData[currentChildIndex].doctor_last_name}</p>
            <p>Doctor's Phone Number: {childInformationData[currentChildIndex].doctor_phone_number}</p>
            <p>Date of Last Doctor Visit: {childInformationData[currentChildIndex].last_doctor_visit}</p>
            <p>Did your infant stay at the NICU?: {childInformationData[currentChildIndex].visited_nicu}</p>
            <p>Infant Urine Drug Screening at Birth: {childInformationData[currentChildIndex].urine_drug_screening}</p>
            <p>Meconium Results: {childInformationData[currentChildIndex].meconium_results}</p>
            <p>Neonatal Opioid Withdraw/Neonatal Abstinence Syndrome: {childInformationData[currentChildIndex].neonatal_withdraw}</p>
          </div>

          <div className="profile-navigation-buttons">
            {currentChildIndex > 0 && (
              <button className="profile-rectangular-button infantProfileButton" onClick={handlePreviousChild}>Previous Child</button>
            )}
            {currentChildIndex < childInformationData.length - 1 && (
              <button className="profile-rectangular-button infantProfileButton" onClick={handleNextChild}>Next Child</button>
            )}
          </div>
  
          <div className="medication-info">
            <h3 class="subsectionProfile">Infant’s Medications</h3>
            {childInformationData[currentChildIndex].medications[currentMedicationIndex] && (
              <div>
                <p>Medication Name: {childInformationData[currentChildIndex].medications[currentMedicationIndex].medication_name}</p>
                <p>Dose: {childInformationData[currentChildIndex].medications[currentMedicationIndex].dose}</p>
                <p>Prescriber: {childInformationData[currentChildIndex].medications[currentMedicationIndex].prescriber}</p>
              </div>
            )}
          </div>
          <div className="profile-navigation-buttons">
            {currentMedicationIndex > 0 && (
              <button className="profile-rectangular-button infantProfileButton" onClick={handlePreviousMedication}>Previous Medication</button>
            )}
            {childInformationData[currentChildIndex].medications && currentMedicationIndex < childInformationData[currentChildIndex].medications.length - 1 && (
              <button className="profile-rectangular-button infantProfileButton" onClick={handleNextMedication}>Next Medication</button>
            )}
          </div>
        </>
      ) : (
        <p>Loading child information...</p>
      )}
    </div>
  );
  
};

export default ChildInformationProfile;
