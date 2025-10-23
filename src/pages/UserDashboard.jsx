import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SuspectedList from '../components/SuspectedList';
import ReportedList from '../components/ReportedList';
import SpamList from '../components/SpamList';
import { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

const UserDashboard = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('suspected-list');

  useEffect(() => {
    console.log('UserDashboard user:', user, 'activeTab:', activeTab);
  }, [user, activeTab]);

  const renderContent = () => {
    if (!user) {
      return <div>Please log in to view this page</div>;
    }
    switch (activeTab) {
      case 'suspected-list':
        return <SuspectedList user={user} />; // pass user in case child needs it
      case 'reported-list':
        return <ReportedList user={user} />;
      case 'spam-list':
        return <SpamList user={user} />;
      default:
        return <SuspectedList user={user} />;
    }
  };

  return (
    <div className="dashboard">
      <Navbar user={user} setUser={setUser} />
      <Sidebar setActiveTab={setActiveTab} role={user?.role} activeTab={activeTab} />
      <div className="main-content">
        {/* debug: remove this once you confirm values */}
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;