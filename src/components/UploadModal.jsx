import { useState } from 'react';
import { uploadBankData } from '../utils/api';
import '../styles/UploadModal.css'; // New CSS file for UploadModal

const UploadModal = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(''); // Clear error on new file selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const response = await uploadBankData(formData);
      alert(response.data.message || 'File uploaded successfully');
      setFile(null);
      setError('');
      // Optionally reset the file input
      document.querySelector('input[type="file"]').value = '';
    } catch (err) {
      console.error('Upload error:', err.response?.data, err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-modal">
      <h3>Upload Bank Data</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadModal;