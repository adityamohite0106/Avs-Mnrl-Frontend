// components/AllRecordsList.jsx
import { useEffect, useState } from 'react';
import { getAllRecords } from '../utils/api';
import '../styles/Tables.css';

const AllRecordsList = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllRecords();
        console.log('All records response:', res.data);
        setRecords(res.data);
      } catch (error) {
        console.error('Error fetching all records:', error.response?.data, error.message);
        setError(error.response?.data?.message || 'Failed to load records');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h2>All Uploaded Records</h2>
      {error && <p className="error">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Customer No</th>
            <th>Mobile Number</th>
            <th>Date</th>
            <th>Effect Date</th>
            <th>Status</th>
            <th>Matched</th>
            <th>Upload ID</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && !error && <tr><td colSpan="7">No records found</td></tr>}
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.custno}</td>
              <td>{record.mobile}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{new Date(record.effectDate).toLocaleDateString()}</td>
              <td>{record.status || 'None'}</td>
              <td>{record.matched ? 'Yes' : 'No'}</td>
              <td>{record.uploadId?.filename || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRecordsList;