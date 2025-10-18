import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SuspectedList from '../components/SuspectedList';
import ReportedList from '../components/ReportedList';
import SpamList from '../components/SpamList';
import { useState } from 'react';
import '../styles/Dashboard.css';

const UserDashboard = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('suspected-list');

  const renderContent = () => {
    switch (activeTab) {
      case 'suspected-list':
        return <SuspectedList />;
      case 'reported-list':
        return <ReportedList />;
      case 'spam-list':
        return <SpamList />;
      default:
        return <SuspectedList />;
    }
  };

  return (
    <div className="dashboard">
      <Navbar user={user} setUser={setUser} />
      <div className="dashboard-content">
        <Sidebar setActiveTab={setActiveTab} role={user.role} activeTab={activeTab} />
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;