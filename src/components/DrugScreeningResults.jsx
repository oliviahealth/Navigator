import React, { useState } from 'react';
import styles from '../styles/DrugScreeningResults.module.css';
import { useParams } from 'react-router-dom';

const initialRow = {
  dateCollected: '',
  orderedBy: '',
  results: '',
  providerReviewed: '',
  reviewDate: '',
  specifyResults: '',
};

const DrugScreeningResults = () => {
  const { patientId } = useParams();
  const [rows, setRows] = useState([initialRow]);
  
  const addRow = () => {
    setRows(rows.concat({ ...initialRow }));
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
  };

  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/insert_forms/drug_screening_results/${patientId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rows),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully submitted:', data);
      window.history.back();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.drugScreeningResultsForm}>
    <p>
        Complete with Participant 
        <br></br><br></br>
        Follow up as indicated with Provider, Social Worker, Case Manager, Recovery Coach, etc. 
        <br></br><br></br>
        If client/Participant has test positive for any substance, check in and complete as necessary at any subsequent visit if appropriate.   
    </p>
      <table className={styles.drugScreeningResultsTable}>
        <thead>
          <tr>
          <th colSpan="7">
              DRUG SCREENING RESULTS
              <br />
              Complete as indicated with client/Participant.
              <br />
              Follow up as indicated with: Provider ordering UDS, Recovery Coach, etc.
          </th>
          </tr>
          <tr>
            <th>Serial No.</th>
            <th>Date Collected</th>
            <th>Ordered by (Provider and Location)</th>
            <th>Results</th>
            <th>Provider Reviewed with You</th>
            <th>If Positive, Specify Results</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="date"
                  value={row.dateCollected}
                  onChange={(e) => updateRow(index, 'dateCollected', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.orderedBy}
                  onChange={(e) => updateRow(index, 'orderedBy', e.target.value)}
                />
              </td>
              <td>
                <label>
                  <input
                    type="radio"
                    name={`results-${index}`}
                    checked={row.results === 'Positive'}
                    onChange={() => updateRow(index, 'results', 'Positive')}
                  /> Positive
                </label>
                <label>
                  <input
                    type="radio"
                    name={`results-${index}`}
                    checked={row.results === 'Negative'}
                    onChange={() => updateRow(index, 'results', 'Negative')}
                  /> Negative
                </label>
              </td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={row.providerReviewed === 'Yes'}
                    onChange={() => updateRow(index, 'providerReviewed', 'Yes')}
                  /> Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={row.providerReviewed === 'No'}
                    onChange={() => updateRow(index, 'providerReviewed', 'No')}
                  /> No
                </label>
                <input
                  type="date"
                  value={row.reviewDate}
                  onChange={(e) => updateRow(index, 'reviewDate', e.target.value)}
                  disabled={row.providerReviewed !== 'Yes'}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.specifyResults}
                  onChange={(e) => updateRow(index, 'specifyResults', e.target.value)}
                  disabled={row.results !== 'Positive'}
                />
              </td>
              <td>
              <button type="button" className={styles.removeButton} onClick={() => removeRow(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addRow}>Add Row</button>
      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default DrugScreeningResults;