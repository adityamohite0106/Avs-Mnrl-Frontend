import React from 'react';
import '../styles/LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'table', rows = 5, columns = 4 }) => {
  if (type === 'table') {
    return (
      <div className="skeleton-table-container">
        <div className="skeleton-table">
          <div className="skeleton-table-header">
            {Array.from({ length: columns }).map((_, index) => (
              <div key={index} className="skeleton-header-cell" />
            ))}
          </div>
          <div className="skeleton-table-body">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="skeleton-table-row">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <div key={colIndex} className="skeleton-table-cell" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="skeleton-cards-container">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-card-header">
              <div className="skeleton-avatar" />
              <div className="skeleton-text-group">
                <div className="skeleton-text skeleton-text-title" />
                <div className="skeleton-text skeleton-text-subtitle" />
              </div>
            </div>
            <div className="skeleton-card-content">
              <div className="skeleton-text skeleton-text-line" />
              <div className="skeleton-text skeleton-text-line" />
              <div className="skeleton-text skeleton-text-line skeleton-text-short" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="skeleton-stats-container">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="skeleton-stat-card">
            <div className="skeleton-stat-label" />
            <div className="skeleton-stat-value" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-default">
      <div className="skeleton-text skeleton-text-line" />
      <div className="skeleton-text skeleton-text-line" />
      <div className="skeleton-text skeleton-text-line skeleton-text-short" />
    </div>
  );
};

export default LoadingSkeleton;
