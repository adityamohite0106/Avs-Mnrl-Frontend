// import '../styles/Sidebar.css';
import '../styles/Dashboard.css';
const Sidebar = ({ setActiveTab, role, activeTab }) => {
  const menuItems = role === 'admin'
    ? [
        { id: 'overview', label: 'Overview' },
        { id: 'bank-list', label: 'Bank Uploads' },
        { id: 'fraud-list', label: 'Fraud Numbers' },
        { id: 'suspected-list', label: 'Suspected Matches' },
        { id: 'reported-list', label: 'Reported Matches' },
        { id: 'spam-list', label: 'Spam Matches' },
      ]
    : [
        { id: 'suspected-list', label: 'Suspected Matches' },
        { id: 'reported-list', label: 'Reported Matches' },
        { id: 'spam-list', label: 'Spam Matches' },
      ];

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={activeTab === item.id ? 'active' : ''}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;