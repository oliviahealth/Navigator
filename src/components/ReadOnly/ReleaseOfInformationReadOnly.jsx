import React, { useState, useEffect } from 'react';
import styles from '../styles/ReleaseOfInformation.module.css';
import { useParams } from 'react-router-dom';

const ReleaseOfInformationReadOnly = () => {
    const { patientId } = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/release_of_information/${patientId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching release of information:', error);
            }
        };

        fetchData();
    }, [patientId]);

    const handleBack = () => {
        window.history.back();
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.releaseForm}>
            <div className={styles.pageContent}>
                <h2>ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT & RELEASE OF INFORMATION</h2>
                <p>GC-MOMS is a free community health care program. The Program provides pregnancy and parenting support...</p>
                {/* Display the fetched data */}
                <p><strong>Program Eligibility:</strong> {formData.eligibility}</p>
                <p><strong>Contact Information:</strong></p>
                <ul>
                    <li>First Name: {formData.firstName}</li>
                    <li>Last Name: {formData.lastName}</li>
                    <li>Address: {formData.address}</li>
                    <li>City/State/Zip: {formData.cityStateZip}</li>
                    <li>Home Phone: {formData.homePhone}</li>
                    <li>Cell Phone: {formData.cellPhone}</li>
                    <li>Email: {formData.email}</li>
                    <li>Date of Birth: {formData.dob}</li>
                </ul>
                <p><strong>Emergency Contact Information:</strong></p>
                {formData.emergencyContacts && formData.emergencyContacts.map((contact, index) => (
                    <ul key={index}>
                        <li>Name: {contact.name}</li>
                        <li>Relationship: {contact.relationship}</li>
                        <li>Telephone: {contact.telephone}</li>
                        <li>Email: {contact.email}</li>
                    </ul>
                ))}
                {/* Assume additional sections for other pages are similarly displayed */}
                <div className={styles.buttonSection}>
                    <button type="button" onClick={handleBack} className={styles.backButton}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default ReleaseOfInformationReadOnly;
