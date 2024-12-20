import React, { useState } from 'react';
import { BellButton } from './bell';
import '../assets/styles/styles.css';
import { Inbox } from './inbox';

export const NotificationSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-system">
      <BellButton onClick={handleToggle} />
      {isOpen && (
        <div className="notification-dialog">
          <Inbox />
        </div>
      )}
    </div>
  );
};

