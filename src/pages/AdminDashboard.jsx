import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Overview from '../components/Overview';
import BankList from '../components/BankList';
import FraudList from '../components/FraudList';
import SuspectedList from '../components/SuspectedList';
import ReportedList from '../components/ReportedList';
import SpamList from '../components/SpamList';
import UploadModal from '../components/UploadModal';
import { useState } from 'react';
import '../styles/Dashboard.css';

const AdminDashboard = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'bank-list':
        return <BankList />;
      case 'fraud-list':
        return <FraudList />;
      case 'suspected-list':
        return <SuspectedList />;
      case 'reported-list':
        return <ReportedList />;
      case 'spam-list':
        return <SpamList />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard">
      <Navbar user={user} setUser={setUser} />
      <div className="dashboard-content">
        <Sidebar setActiveTab={setActiveTab} role={user.role} activeTab={activeTab} />
        <div className="main-content">
          <UploadModal />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;