import { useEffect, useState } from 'react';
import { getStats, getRecentActivity } from '../utils/api';
import '../styles/Tables.css';
import { useNavigate } from 'react-router-dom';

const Overview = ({ user }) => {
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !user) {
          setError('Please log in to view this page');
          navigate('/login');
          return;
        }

        const statsRes = await getStats();
        setStats(statsRes.data);

        if (user.role === 'admin') {
          try {
            const activityRes = await getRecentActivity();
            setActivities(activityRes.data);
          } catch (activityError) {
            console.error('Error fetching recent activity:', activityError);
            setError('Failed to load recent activity');
          }
        }
      } catch (error) {
        console.error('Error fetching overview data:', error);
        if (error.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(error.response?.data?.message || 'Failed to load overview data');
        }
      }
    };
    fetchData();
  }, [navigate, user]);

  return (
    <div className="table-container">
      <h2>Dashboard Overview</h2>
      {error && <p className="error">{error}</p>}
      <div className="stats">
        <div>Total Records: {stats.totalRecords || 0}</div>
        <div>Fraud: {stats.fraudCount || 0}</div>
        <div>Suspected: {stats.suspectedCount || 0}</div>
        <div>Reported: {stats.reportedCount || 0}</div>
        <div>Spam: {stats.spamCount || 0}</div>
      </div>
      {user?.role === 'admin' && (
        <>
          <h3>Recent Activity</h3>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Details</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={activity._id}>
                    <td>{activity.userId?.email || 'N/A'}</td>
                    <td>{activity.action}</td>
                    <td>{activity.details}</td>
                    <td>{new Date(activity.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No recent activity available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Overview;