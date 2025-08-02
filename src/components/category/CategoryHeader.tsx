"use client";

import React from 'react';
import './CategoryHeader.scss';

interface CategoryHeaderProps {
  title: string;
  subtitle?: string;
  bannerImage?: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, subtitle, bannerImage }) => {
  return (
    <div className="category-header">
      {bannerImage && (
        <div className="header-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
          <div className="banner-overlay">
            <div className="container">
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      {!bannerImage && (
        <div className="header-simple">
          <div className="container">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryHeader;
