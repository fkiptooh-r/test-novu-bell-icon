/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { NotificationListSkeleton } from './notification-skeleton';
import { Show } from './show';
import { EmptyNotificationList } from './empty-state';
import { InfiniteScroll } from './infinite-scroll';
import { LoadMoreSkeleton } from './load-more-skeleton';
import { NotificationItem } from './notification-item';

interface NotificationsListProps {
  notifications: any[] | undefined;
  isLoading: boolean;
  fetchMore: () => void;
  hasMore: boolean;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications = [],
  isLoading,
  fetchMore,
  hasMore,
}) => {
  return (
    <Show when={!isLoading} fallback={<NotificationListSkeleton />}>
      <Show when={notifications.length > 0} fallback={<EmptyNotificationList />}>
        <InfiniteScroll
          fetchMore={fetchMore}
          hasMore={hasMore}
          loader={<LoadMoreSkeleton />}
        >
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </InfiniteScroll>
      </Show>
    </Show>
  );
};
