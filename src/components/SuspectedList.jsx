import { useEffect, useState, useMemo } from 'react';
import { getSuspectedList } from '../utils/api';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';
import LoadingSkeleton from './LoadingSkeleton';
import '../styles/Tables.css';

const SuspectedList = ({ user }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('Fetching suspected list for user:', user);
        const res = await getSuspectedList();
        console.log('Suspected list response:', res.data);
        setRecords(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching suspected list:', err.response?.data, err.message);
        setError(err.response?.data?.message || 'Failed to load suspected list');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Filter and search logic
  const filteredRecords = useMemo(() => {
    let filtered = records;

    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.mobileNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.customerNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.uploadId?.filename?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter(record => record.status === filterStatus);
    }

    return filtered;
  }, [records, searchTerm, filterStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const csvContent = [
      ['Mobile Number', 'Customer No', 'Date', 'Effect Date', 'Upload ID'],
      ...filteredRecords.map(record => [
        record.mobileNumber || '',
        record.customerNo || '',
        record.date ? new Date(record.date).toLocaleDateString() : '',
        record.effectDate ? new Date(record.effectDate).toLocaleDateString() : '',
        record.uploadId?.filename || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suspected-records-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!user) return <div>Please log in to view this page</div>;

  const filterOptions = [
    { value: 'Suspected', label: 'Suspected' },
    { value: 'Reported', label: 'Reported' },
    { value: 'Fraud', label: 'Fraud' },
    { value: 'Spam', label: 'Spam' }
  ];

  return (
    <div className="table-container">
      <h2>Suspected Matches</h2>
      
      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        placeholder="Search by mobile number, customer ID, or filename..."
        filterOptions={filterOptions}
        showExport={true}
        onExport={handleExport}
        exportLabel="Export CSV"
      />

      {error && <p className="error">{error}</p>}
      
      {loading ? (
        <LoadingSkeleton type="table" rows={8} columns={5} />
      ) : (
        <>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Mobile Number</th>
                  <th>Customer No</th>
                  <th>Date</th>
                  <th>Effect Date</th>
                  <th>Upload ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.length === 0 && !error && (
                  <tr>
                    <td colSpan="6" className="no-data">
                      <div className="no-data-content">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>No suspected records found</p>
                        <span>Try adjusting your search or filter criteria</span>
                      </div>
                    </td>
                  </tr>
                )}
                {paginatedRecords.map((record) => (
                  <tr key={record._id || record.id}>
                    <td>
                      <span className="mobile-number">{record.mobileNumber}</span>
                    </td>
                    <td>
                      <span className="customer-no">{record.customerNo}</span>
                    </td>
                    <td>
                      <span className="date-value">
                        {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className="date-value">
                        {record.effectDate ? new Date(record.effectDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className="upload-filename">{record.uploadId?.filename || 'N/A'}</span>
                    </td>
                    <td>
                      <span className={`status-badge status-${record.status?.toLowerCase() || 'unknown'}`}>
                        {record.status || 'Unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredRecords.length}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  );
};

export default SuspectedList;