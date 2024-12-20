import React, { useState } from 'react';
import { useNotifications } from '@novu/react/hooks';
import '../assets/styles/Inbox.css';
import { NotificationsList } from './notification-list';

type FilterType = 'all' | 'read' | 'unread' | 'archived';

export const Inbox: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const { 
    notifications, 
    isLoading, 
    fetchMore,
    hasMore
  } = useNotifications();

  const {
    notifications: archivedNotifications, 
    isLoading: isLoadingArchived, 
    fetchMore: fetchMoreArchived,
    hasMore: hasMoreArchived
  } = useNotifications({ archived: true });


const allNotifications = [...(notifications || []), ...(archivedNotifications || [])];


const filteredNotifications = allNotifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'read') return notification.isRead;
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'archived') return notification.isArchived === true;
    return true;
  });

const totalCount = allNotifications.length;
const unreadCount = allNotifications.filter((notification) => !notification.isRead).length;
const readCount = totalCount - unreadCount;
const archivedCount = archivedNotifications?.length ?? 0;

const handleFetchMore = () => {
    if (filter === 'archived') {
      fetchMoreArchived();
    } else {
      fetchMore();
    }
  };


  return (
    <div className="inbox">
      <div className="inbox-header">
        <h2>Notifications</h2>
        <div className="header-actions">
          <button className="action-button">See all</button>
          <button className="action-button">⋯</button>
        </div>
      </div>
      
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({totalCount})
        </button>
        <button 
          className={`filter-tab ${filter === 'read' ? 'active' : ''}`}
          onClick={() => setFilter('read')}
        >
          Read ({readCount})
        </button>
        <button 
          className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button 
          className={`filter-tab ${filter === 'archived' ? 'active' : ''}`}
          onClick={() => setFilter('archived')}
        >
          Archived ({archivedCount})
        </button>
      </div>

      <NotificationsList
        notifications={filteredNotifications}
        isLoading={isLoading || isLoadingArchived}
        fetchMore={handleFetchMore}
        hasMore={(filter === 'archived' ? hasMoreArchived : hasMore) || false}
      />
    </div>
  );
};

