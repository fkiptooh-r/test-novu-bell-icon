import React from 'react';
import '../assets/styles/EmptyNotificationList.css';
export const EmptyNotificationList: React.FC = () => {
  return (
    <div className="empty-notification-list">
      <div className="empty-icon">📭</div>
      <h3>No notifications</h3>
      <p>You're all caught up! Check back later for new notifications.</p>
    </div>
  );
};

