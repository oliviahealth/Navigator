import React, { useState, useEffect } from 'react';
import styles from '../../styles/TenB.module.css';
import { useParams } from 'react-router-dom';

const checklistItems = [
    {
      id: 'baby',
      label: 'Baby',
      subItems: [
        { id: 'physical-exam', label: 'Physical Exam' },
        { id: 'feeding', label: 'Feeding' },
        { 
          id: 'growth-weight-gain', 
          label: 'Growth and Weight Gain', 
          subItems: [
            { id: 'who-growth-chart', label: 'WHO growth chart' }
          ] 
        }
      ]
    },
    {
      id: 'breasts',
      label: 'Breasts',
      subItems: [
        { id: 'assess-supply', label: 'Assess supply, latch, milk transfer, pain' },
        { id: 'refer-lactation', label: 'Refer to lactation consultant/public health nursing services' },
        { id: 'education-storage', label: 'Education on collection/storage of breast milk' },
        { 
          id: 'mastitis-signs', 
          label: 'Mastitis signs:', 
          subItems: [
            { id: 'fever', label: 'Fever, flu-like symptoms, erythema of breasts' }
          ]
        }
      ]
    },
    {
      id: 'bowels',
      label: 'Bowels',
      subItems: [
        { id: 'constipation-treatment', label: 'Constipation treatment to reduce perineal pain' }
      ]
    },
    {
      id: 'bladder',
      label: 'Bladder',
      subItems: [
        { id: 'urinary-incontinence', label: 'Urinary incontinence' }
      ]
    },
    {
      id: 'belly',
      label: 'Belly',
      subItems: [
        { id: 'belly-pain', label: 'Pain' }
      ]
    },
    {
      id: 'bottom',
      label: 'Bottom',
      subItems: [
        { id: 'perineal-pain', label: 'Perineal pain should resolve by now' },
        { id: 'hemorrhoids', label: 'Hemorrhoids' }
      ]
    },
    {
      id: 'bleeding',
      label: 'Bleeding',
      subItems: [
        { id: 'bleeding-finished', label: 'Should be finished by now' }
      ]
    },
    {
      id: 'baby-blues',
      label: 'Baby blues/postpartum depression',
      subItems: [
        { id: 'screen-depression', label: 'Screen for both of these' },
        { id: 'epds-tool', label: 'EPDS tool' }
      ]
    },
    {
      id: 'birth-control',
      label: 'Birth control',
      subItems: [
        { id: 'discuss-birth-control', label: 'Discuss at this point' }
      ]
    },
    {
      id: 'blood-work',
      label: 'Blood work',
      subItems: [
        { id: 'refer-if-needed', label: 'If needed, refer' },
        { id: 'diabetes-anemia', label: 'Diabetes, anemia, hormones, etc.' }
      ]
    },
  ];
  
const TenBReadOnly = () => {
    const { patientId, log_id } = useParams()
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (itemId, isChecked) => {
    setCheckedItems(prevState => ({ ...prevState, [itemId]: isChecked }));
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get_read_only_data/ten_b/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                console.log("No participant info found for the selected patient.");
                return; 
            }
            const data = await response.json();
            setCheckedItems(data[2]);
            
        } catch (error) {
            console.error('Error fetching participant info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  const renderChecklist = (items, parentId = '') => {
    return items.map((item) => (
      <li key={item.id}>
        <label>
          <input
            type="checkbox"
            checked={!!checkedItems[`${parentId}${item.id}`]}
            onChange={(e) => handleChange(`${parentId}${item.id}`, e.target.checked)}
          />
          {item.label}
        </label>
        {item.subItems && <ul>{renderChecklist(item.subItems, `${item.id}-`)}</ul>}
      </li>
    ));
  };

  return (
    <div className={styles.checklistContainer}>
      <h1 className={styles.title}>Checklist: The 10 Bs</h1>
      <form>
        <ul className={styles.checklist}>
          {renderChecklist(checklistItems)}
        </ul>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button} onClick={() => window.history.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TenBReadOnly;