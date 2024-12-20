import React, { useState } from 'react';
import { Bell, UserPlus, Store, Shield, Link, Check, Archive, RotateCcw } from 'lucide-react';
import '../assets/styles/NotificationItem.css';

interface Notification {
  id: string;
  subject: string;
  body: string;
  isRead: boolean;
  isArchived: boolean;
  tags: string[];
  read: () => void;
  archive: () => void;
  unarchive: () => void;
}

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (tags: string[]) => {
    if (tags.includes('Follow')) {
      return <UserPlus className="notification-icon normal-priority" />;
    }
    if (tags.includes('Link Account')) {
      return <Bell className="notification-icon high-priority" />;
    }
    if (tags.includes('Connect-Store')) {
      return <Store className="notification-icon medium-priority" />;
    }
    if (tags.includes('Security')) {
      return <Shield className="notification-icon high-priority" />;
    }
    return <Link className="notification-icon normal-priority" />;
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`notification-item ${notification.isRead ? 'read' : 'unread'} ${notification.isArchived ? 'archived' : ''}`}>
      <div className="notification-icon-wrapper">
        {getIcon(notification.tags)}
      </div>
      <div className="notification-content">
        <div className="notification-title">
          {notification.subject || 'Notification'}
        </div>
        <div className="notification-body">
          {isExpanded ? notification.body : `${notification.body.slice(0, 100)}${notification.body.length > 100 ? '...' : ''}`}
          {notification.body.length > 100 && (
            <button
              onClick={toggleExpand}
              className="read-more"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
      <div className="notification-actions">
        {!notification.isRead && (
          <button 
            className="action-button read-button" 
            onClick={() => notification.read()}
            aria-label="Mark as read"
          >
            <Check size={16} />
          </button>
        )}
        {notification.isArchived ? (
          <button 
            className="action-button unarchive-button" 
            onClick={() => notification.unarchive()}
            aria-label="Unarchive"
          >
            <RotateCcw size={16} />
          </button>
        ) : (
          <button 
            className="action-button archive-button" 
            onClick={() => notification.archive()}
            aria-label="Archive"
          >
            <Archive size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

