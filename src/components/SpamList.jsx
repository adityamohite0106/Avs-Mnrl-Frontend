import { useEffect, useState } from 'react';
import { getSpamList } from '../utils/api';
import '../styles/Tables.css';

const SpamList = ({ user }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('Fetching spam list for user:', user);
        const res = await getSpamList();
        console.log('Spam list response:', res.data);
        setRecords(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching spam list:', err.response?.data, err.message);
        setError(err.response?.data?.message || 'Failed to load spam list');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (!user) return <div>Please log in to view this page</div>;
  if (loading) return <div>Loading spam matches...</div>;

  return (
    <div className="table-container">
      <h2>Spam Matches</h2>
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
          {records.length === 0 && !error && <tr><td colSpan="5">No spam records found</td></tr>}
          {records.map((record) => (
            <tr key={record._id || record.id}>
              <td>{record.mobileNumber}</td>
              <td>{record.customerNo}</td>
              <td>{record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}</td>
              <td>{record.effectDate ? new Date(record.effectDate).toLocaleDateString() : 'N/A'}</td>
              <td>{record.uploadId?.filename || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpamList;