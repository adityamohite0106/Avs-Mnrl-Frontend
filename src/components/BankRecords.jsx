import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBankRecords } from '../utils/api';
import '../styles/Tables.css';

const BankRecords = () => {
  const { uploadId } = useParams();
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBankRecords(uploadId);
        console.log('Bank records response:', res.data);
        setRecords(res.data);
        setError('');
      } catch (error) {
        console.error('Error fetching bank records:', error);
        setError(error.response?.data?.message || 'Failed to load bank records');
      }
    };
    fetchData();
  }, [uploadId]);

  return (
    <div className="table-container">
      <h2>Bank Records</h2>
      {error && <p className="error">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Customer No</th>
            <th>Mobile</th>
            <th>Date</th>
            <th>Effect Date</th>
            <th>Status</th>
            <th>Matched</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && !error && <tr><td colSpan="6">No records found</td></tr>}
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.custno}</td>
              <td>{record.mobile}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{new Date(record.effectDate).toLocaleDateString()}</td>
              <td>{record.status || 'N/A'}</td>
              <td>{record.matched ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankRecords;