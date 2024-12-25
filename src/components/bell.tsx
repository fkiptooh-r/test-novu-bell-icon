/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNovu } from '../context/novu-context';
interface BellButtonProps {
  onClick: () => void;
}

export const BellButton: React.FC<BellButtonProps> = ({ onClick }) => {
  const novu = useNovu();
  const [count, setCount] = useState<number>(0);

  // useEffect(() => {
  //   const fetchNotificationCount = async () => {
  //     try {
  //       const response = await novu.notifications.count({ read: false, archived: false });
  //       setCount(response.data?.count ?? 0);
  //     } catch (error) {
  //       console.error('Error fetching notification count:', error);
  //     }
  //   };

  //   fetchNotificationCount();

  //   // Add a listener for unread count changes
  //  const cleanup = novu.on('notifications.unread_count_changed', (newCount) => {
  //     // console.log('New unread count:', newCount);
  //     setCount(newCount.result);
  //   });

  //   // Cleanup the listener when the component unmounts
  //   return () => {
  //     cleanup();

  //   };
  // }, [novu]);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await novu.notifications.count({ read: false, archived: false });
        setCount(response.data?.count ?? 0);
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };
  
    fetchNotificationCount();
  
    // Define the event listener
    const handleUnreadCountChanged = (newCount: any) => {
      setCount(newCount.result);
    };
  
    // Add the listener
    novu.on('notifications.unread_count_changed', handleUnreadCountChanged);
  
    // Cleanup the listener when the component unmounts
    return () => {
      novu.off('notifications.unread_count_changed', handleUnreadCountChanged);
    };
  }, [novu]);
  

  return (
    <button 
      onClick={onClick}
      className="bell-button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      {count > 0 && (
        <span className="notification-badge">{count}</span>
      )}
    </button>
  );
};

