/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import '../assets/styles/Inbox.css';
import '../assets/styles/Notifications.css';
import { NotificationsList } from './notification-list';
import { InboxNotification, ListNotificationsResponse } from '@novu/js';
import { useNovu } from '../context/novu-context';

// 
type TabType = 'unread' | 'read' | 'archived';

// const preferenceData = await novu.preferences.list();
// console.log(preferenceData.data);
export const Inbox: React.FC = () => {
  const novu = useNovu();
  novu.on("notifications.notification_received", (data) => {
    console.log("new notification =>", data);
  });
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('read');


  const fetchNotifications = async (limit?: number) => {
    try {
      setIsLoading(true);
      const response = await novu.notifications.list({
        limit,
      });
      const { notifications: fetchedNotifications, hasMore: moreAvailable } = response.data as ListNotificationsResponse;

      setNotifications(fetchedNotifications); // Replace old notifications with fresh ones
      setHasMore(moreAvailable);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMore = async () => {
    if (hasMore && !isLoading) {
      try {
        setIsLoading(true);
        const response = await novu.notifications.list({
          limit: notifications.length + 10, // Increment limit dynamically
        });
        const { notifications: fetchedNotifications, hasMore: moreAvailable } = response.data as ListNotificationsResponse;

        setNotifications(fetchedNotifications); // Replace all notifications
        setHasMore(moreAvailable);
      } catch (error) {
        console.error('Error fetching more notifications:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Add a listener for new notifications
    const cleanup = novu.on('notifications.notification_received', (newNotification) => {
      console.log('New notification received:', newNotification);
      setNotifications((prev) => [newNotification, ...prev]);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      cleanup();
    };
  }, [novu]);

  const filteredNotifications = notifications.filter((notification) => {
    switch (activeTab) {
      case 'read':
        return notification.isRead && !notification.isArchived;
      case 'unread':
        return !notification.isRead && !notification.isArchived;
      case 'archived':
        return notification.isArchived;
      default:
        return true;
    }
  });

  const tabCounts = {
    unread: notifications.filter((n) => !n.isRead && !n.isArchived).length,
    read: notifications.filter((n) => n.isRead && !n.isArchived).length,
    archived: notifications.filter((n) => n.isArchived).length,
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

      <div className="notifications-tabs">
        <div className="tabs-list" role="tablist">
          {(['read', 'unread', 'archived'] as TabType[]).map((tab) => (
            <button
              key={tab}
              className={`tab-trigger ${activeTab === tab ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`${tab}-tab`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="tab-badge">{tabCounts[tab]}</span>
            </button>
          ))}
        </div>
        <div className="tab-content active" role="tabpanel" id={`${activeTab}-tab`}>
          <NotificationsList
            notifications={filteredNotifications}
            isLoading={isLoading}
            fetchMore={fetchMore}
            hasMore={hasMore}
          />
        </div>
      </div>
    </div>
  );
};