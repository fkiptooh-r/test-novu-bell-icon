import React from 'react';
import '../assets/styles/LoadMoreSkeleton.css';

export const LoadMoreSkeleton: React.FC = () => {
  return (
    <div className="load-more-skeleton">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  );
};

