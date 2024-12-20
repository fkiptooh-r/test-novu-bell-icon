import React from 'react';
import '../assets/styles/NotificationListSkeleton.css';

export const NotificationListSkeleton: React.FC = () => {
  return (
    <div className="notification-list-skeleton">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="skeleton-item">
          <div className="skeleton-icon"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-body"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

