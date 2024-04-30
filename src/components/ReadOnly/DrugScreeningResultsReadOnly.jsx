import React, { useState, useEffect } from 'react';
import styles from '../../styles/DrugScreeningResults.module.css';
import { useParams } from 'react-router-dom';

const initialRow = {
  dateCollected: '',
  orderedBy: '',
  results: '',
  providerReviewed: '',
  reviewDate: '',
  specifyResults: '',
};

const DrugScreeningResultsReadOnly = () => {
  const { patientId, log_id } = useParams();
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

  const handleCancel = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchLog = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_read_only_data/drug_screening_results/${patientId}/${log_id}`, {
              method: 'GET',
              credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.status === 204) { // Handling no content
                return; 
            }
            const data = await response.json();
            setRows(data[2])
            
        } catch (error) {
            console.error('Error fetching sipport system info:', error);
        }
    };

    fetchLog();
}, [patientId, log_id]);

  return (
    <form className={styles.drugScreeningResultsForm}>
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
                  disabled
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.orderedBy}
                  disabled
                />
              </td>
              <td>
                <label>
                  <input
                    type="radio"
                    name={`results-${index}`}
                    checked={row.results === 'Positive'}
                    disabled
                  /> Positive
                </label>
                <label>
                  <input
                    type="radio"
                    name={`results-${index}`}
                    checked={row.results === 'Negative'}
                    disabled
                  /> Negative
                </label>
              </td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={row.providerReviewed === 'Yes'}
                    disabled
                  /> Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={row.providerReviewed === 'No'}
                    disabled
                  /> No
                </label>
                <input
                  type="date"
                  value={row.reviewDate}
                  disabled
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.specifyResults}
                  disabled
                />
              </td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default DrugScreeningResultsReadOnly;