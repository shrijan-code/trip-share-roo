
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  currentPage: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPage }) => {
  return (
    <div className="flex text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-primary">Home</Link>
      <span className="mx-2">/</span>
      <Link to="/find-rides" className="hover:text-primary">Find Rides</Link>
      <span className="mx-2">/</span>
      <span className="text-gray-700">{currentPage}</span>
    </div>
  );
};

export default Breadcrumbs;
