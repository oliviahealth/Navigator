// HousingVisit.jsx
import React, { useState } from 'react';
import '../styles/HousingVisit.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

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
const accessToken = Cookies.get('accessToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/insert_forms/housing_vist/${patientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'omit',
        body: JSON.stringify(formData),
      });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    window.history.back();
  } catch (error) {
    console.error('failed to submit');
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

const handleERVisitChange = (id, e) => {
  const { name, value } = e.target;
  const newERVisits = formData.erVisits.map((visit) =>
    visit.id === id ? { ...visit, [name]: value } : visit
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

const handleChildNameChange = (index, event) => {
  const newName = event.target.value;
  const updatedChildren = formData.children.map((child, idx) => {
    if (idx === index) {
      return { ...child, name: newName };
    }
    return child;
  });

  setFormData(prevFormData => ({
    ...prevFormData,
    children: updatedChildren
  }));
};

const addERVisit = () => {
  setFormData(prevFormData => ({
    ...prevFormData,
    erVisits: [...prevFormData.erVisits, { ...initialERVisit, id: prevFormData.erVisits.length + 1 }]
  }));
};


const removeERVisit = (visitId) => {
  setFormData(prevFormData => ({
    ...prevFormData,
    erVisits: prevFormData.erVisits.filter(visit => visit.id !== visitId)
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
         {formData.erVisits.map((visit) => (
  <div key={visit.id} className="er-visit-details">
    <label>
      ER Visit Date:
      <input
        type="date"
        name="date"
        value={visit.date}
        onChange={(e) => handleERVisitChange(visit.id, e)}
      />
    </label>
    <label>
      ER Visit Reason:
      <select
        name="reason"
        value={visit.reason}
        onChange={(e) => handleERVisitChange(visit.id, e)}
      >
        <option value="Injury">Injury</option>
        <option value="Other">Other reason</option>
      </select>
    </label>
    {visit.id !== formData.erVisits[0].id && (
      <button type="button" onClick={() => removeERVisit(visit.id)}>
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
          {formData.children.map((child, index) => (
            <div key={index} className="child-section">
            <label>
              <h4>Child Name:</h4>
              <input
                type="text"
                name={`childName${index}`}
                value={child.name}
                onChange={(e) => handleChildNameChange(index, e)}
              />
            </label>
        

            <div className="well-child-visit-checkboxes">
              <h4>Fill in Well-Child visits completed on these timeframes after birth </h4>
              {child.wellChildVisits.map((visited, visitIndex) => (
                <label key={visitIndex}>
                  <input
                    type="checkbox"
                    checked={visited}
                    onChange={() => handleWellChildVisitChange(index, visitIndex)}
                  /> {ageRanges[visitIndex]}
                </label>
              ))}
            </div>
        
              {index !== 0 && (
                <button type="button" onClick={() => removeChild(index)}>
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