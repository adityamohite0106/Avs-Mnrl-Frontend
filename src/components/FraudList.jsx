// components/FraudList.jsx (update SuspectedList, ReportedList, SpamList similarly)
import { useEffect, useState } from 'react';
import { getFraudList } from '../utils/api';
import '../styles/Tables.css';

const FraudList = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFraudList();
        console.log('Fraud list response:', res.data);
        setRecords(res.data);
      } catch (error) {
        console.error('Error fetching fraud list:', error.response?.data, error.message);
        setError(error.response?.data?.message || 'Failed to load fraud list');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h2>Fraud Numbers</h2>
      {error && <p className="error">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Mobile Number</th>
            <th>Customer No</th>
            <th>Date</th>
            <th>Effect Date</th>
            <th>Upload ID</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && !error && <tr><td colSpan="5">No fraud records found</td></tr>}
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.mobileNumber}</td>
              <td>{record.customerNo}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{new Date(record.effectDate).toLocaleDateString()}</td>
              <td>{record.uploadId?.filename || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FraudList;