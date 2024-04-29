// HousingVisit.jsx
import React, { useState } from 'react';
import '../styles/HousingVisit.css';
import { useNavigate, useParams } from 'react-router-dom';

const ageRanges = [
  'Newborn', '3-7 days old', '2-4 weeks old', '2-3 months old',
  '4-5 months old', '6-7 months old', '9-10 months old',
  '12-13 months old', '15-16 months old', '18-19 months old',
  '2 - 2.5 years old', '3 - 3.5 years old', '4 - 4.5 years old'
];
const initialERVisit = { date: '', reason: 'Injury' };



const HousingVisit = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    participantName: '',
    caseId: '',
    dateOfVisit: '',
    staffName: '',
    hasInsurance: '',
    concernsDevelopment: '',
    visitedER: '',
    erVisits: [{ ...initialERVisit }],
    hadWellChildVisits: '',
    children: [{ name: '', wellChildVisits: Array(ageRanges.length).fill(false) }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/housing_vist/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'text' && /<|>|;|'|"/.test(value)) {
      return;
    }
    if (type === 'date' && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return;
    }
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleERVisitChange = (index, e) => {
    const { name, value } = e.target;
    if (name === 'date' && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return;
    }
    const newERVisits = formData.erVisits.map((visit, i) =>
      i === index ? { ...visit, [name]: value } : visit
    );
    setFormData({ ...formData, erVisits: newERVisits });
  };

  const handleWellChildVisitChange = (childIndex, visitIndex) => {
    const newChildren = formData.children.map((child, i) =>
      i === childIndex ? {
        ...child,
        wellChildVisits: child.wellChildVisits.map((visit, j) =>
          j === visitIndex ? !visit : visit
        )
      } : child
    );
    setFormData({ ...formData, children: newChildren });
  };

  const addERVisit = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      erVisits: [...prevFormData.erVisits, { ...initialERVisit }]
    }));
  };


  const removeERVisit = (index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      erVisits: prevFormData.erVisits.filter((_, i) => i !== index)
    }));
  };


  const addChild = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      children: [...prevFormData.children, { name: '', wellChildVisits: Array(ageRanges.length).fill(false) }]
    }));
  };


  const removeChild = (index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      children: prevFormData.children.filter((_, i) => i !== index)
    }));
  };
  return (
    <div className="housing-visit-form">
      <h2>Housing Security Home Visit Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Participant Name:
          <input
            type="text"
            name="participantName"
            value={formData.participantName}
            onChange={handleChange}
          />
        </label>
        <label>
          Case ID:
          <input
            type="text"
            name="caseId"
            value={formData.caseId}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Visit*:
          <input
            type="date"
            name="dateOfVisit"
            value={formData.dateOfVisit}
            onChange={handleChange}
          />
        </label>
        <label>
          Staff Name:
          <input
            type="text"
            name="staffName"
            value={formData.staffName}
            onChange={handleChange}
          />
        </label>

        <div className="form-question">
          <p>1. Do you have health insurance coverage?</p>
          <label>
            Yes
            <input
              type="radio"
              name="hasInsurance"
              value="Yes"
              checked={formData.hasInsurance === 'Yes'}
              onChange={handleChange}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="hasInsurance"
              value="No"
              checked={formData.hasInsurance === 'No'}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-question">
          <p>2. Do you have any concerns about your child's development, behavior, or learning?</p>
          <label>
            Yes
            <input
              type="radio"
              name="concernsDevelopment"
              value="Yes"
              checked={formData.concernsDevelopment === 'Yes'}
              onChange={handleChange}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="concernsDevelopment"
              value="No"
              checked={formData.concernsDevelopment === 'No'}
              onChange={handleChange}
            />
          </label>
          <label>
            Did not ask
            <input
              type="radio"
              name="concernsDevelopment"
              value="Did not ask"
              checked={formData.concernsDevelopment === 'Did not ask'}
              onChange={handleChange}
            />
          </label>
        </div>


        <div className="form-question">
          <p>3. Since our last visit, have you taken your child to the hospital Emergency Room?</p>
          <label>
            Yes
            <input
              type="radio"
              name="visitedER"
              value="Yes"
              checked={formData.visitedER === 'Yes'}
              onChange={handleChange}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="visitedER"
              value="No"
              checked={formData.visitedER === 'No'}
              onChange={handleChange}
            />
          </label>
        </div>

        {formData.visitedER === 'Yes' && (
          <div>
            {formData.erVisits.map((visit, index) => (
              <div key={index} className="er-visit-details">
                <label>
                  ER Visit {index + 1} Date:
                  <input
                    type="date"
                    name={`erVisitDate${index}`}
                    value={visit.date}
                    onChange={(e) => handleERVisitChange(index, e)}
                  />
                </label>
                <label>
                  ER Visit {index + 1} Reason:
                  <select
                    name={`erVisitReason${index}`}
                    value={visit.reason}
                    onChange={(e) => handleERVisitChange(index, e)}
                  >
                    <option value="Injury">Injury</option>
                    <option value="Other">Other reason</option>
                  </select>
                </label>
                {index !== 0 && (
                  <button type="button" onClick={() => removeERVisit(index)}>
                    Remove ER Visit
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addERVisit}>Add Another ER Visit</button>
          </div>
        )}


        <div className="form-question">
          <p>Since our last visit, has your child had any well-child visits?</p>
          <label>
            Yes
            <input
              type="radio"
              name="hadWellChildVisits"
              value="Yes"
              checked={formData.hadWellChildVisits === 'Yes'}
              onChange={handleChange}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="hadWellChildVisits"
              value="No"
              checked={formData.hadWellChildVisits === 'No'}
              onChange={handleChange}
            />
          </label>
        </div>


        {formData.hadWellChildVisits === 'Yes' && (
          <>
            {formData.children.map((child, childIndex) => (
              <div key={childIndex} className="child-section">
                <label>
                  Child Name:
                  <input
                    type="text"
                    name={`childName${childIndex}`}
                    value={child.name}
                    onChange={(e) => handleChildNameChange(childIndex, e)}
                  />
                </label>

                <div className="well-child-visit-checkboxes">
                  {child.wellChildVisits.map((checked, visitIndex) => (
                    <label key={visitIndex}>
                      <input
                        type="checkbox"
                        name={`child${childIndex}Visit${visitIndex}`}
                        checked={checked}
                        onChange={() => handleWellChildVisitChange(childIndex, visitIndex)}
                      />
                      {ageRanges[visitIndex]}
                    </label>
                  ))}
                </div>
                {childIndex !== 0 && (
                  <button type="button" onClick={() => removeChild(childIndex)}>
                    Remove Child
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addChild}>
              Add Another Child
            </button>
          </>
        )}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>
    </div>
  );

};

export default HousingVisit;