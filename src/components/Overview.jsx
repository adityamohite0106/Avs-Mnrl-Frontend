import { useEffect, useState } from 'react';
import { getStats, getRecentActivity } from '../utils/api';
import UploadModal from './UploadModal';
import LoadingSkeleton from './LoadingSkeleton';
import '../styles/Tables.css';
import { useNavigate } from 'react-router-dom';

const Overview = ({ user }) => {
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate, user]);

  return (
    <div className="overview-container">
      {/* Upload Modal - Only shown in Overview for admins */}
      {user?.role === 'admin' && <UploadModal />}
      
      <div className="table-container">
        <h2>Dashboard Overview</h2>
        {error && <p className="error">{error}</p>}
        
        {/* Statistics Cards */}
        {loading ? (
          <LoadingSkeleton type="stats" rows={1} columns={5} />
        ) : (
          <div className="stats">
            <div className="stat-card">
              <span className="stat-label">Total Records</span>
              <span className="stat-value">{stats.totalRecords || 0}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Fraud</span>
              <span className="stat-value">{stats.fraudCount || 0}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Suspected</span>
              <span className="stat-value">{stats.suspectedCount || 0}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Reported</span>
              <span className="stat-value">{stats.reportedCount || 0}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Spam</span>
              <span className="stat-value">{stats.spamCount || 0}</span>
            </div>
          </div>
        )}
        
        {/* Recent Activity Section */}
        {user?.role === 'admin' && (
          <div className="activity-section">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;