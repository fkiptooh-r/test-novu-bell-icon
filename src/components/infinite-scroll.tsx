import React, { useEffect, useRef, useCallback } from 'react';
import '../assets/styles/InfiniteScroll.css';

interface InfiniteScrollProps {
  fetchMore: () => void;
  hasMore: boolean;
  loader: React.ReactNode;
  children: React.ReactNode;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  fetchMore,
  hasMore,
  loader,
  children,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 20 && hasMore) {
        fetchMore();
      }
    }
  }, [fetchMore, hasMore]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="infinite-scroll" ref={scrollRef}>
      {children}
      {hasMore && loader}
    </div>
  );
};
