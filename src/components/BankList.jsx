import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { getBankList } from '../utils/api';
import '../styles/Tables.css';

const BankList = () => {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBankList();
        console.log('Bank uploads response:', res.data);
        setUploads(res.data);
      } catch (error) {
        console.error('Error fetching bank uploads:', error);
        setError(error.response?.data?.message || 'Failed to load bank uploads');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h2>Bank Uploads</h2>
      {error && <p className="error">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Uploaded By</th>
            <th>Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {uploads.length === 0 && !error && <tr><td colSpan="3">No uploads found</td></tr>}
          {uploads.map((upload) => (
            <tr key={upload._id}>
              <td>
                <Link to={`/bank-records/${upload._id}`}>{upload.filename}</Link>
              </td>
              <td>{upload.uploadedBy?.email || 'N/A'}</td>
              <td>{new Date(upload.uploadedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankList;