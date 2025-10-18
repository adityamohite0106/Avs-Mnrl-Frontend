import { useEffect, useState } from 'react';
import { getSuspectedList } from '../utils/api';
import '../styles/Tables.css';

const SuspectedList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSuspectedList();
        setRecords(res.data);
      } catch (error) {
        console.error('Error fetching suspected list:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h2>Suspected Matches</h2>
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

export default SuspectedList;