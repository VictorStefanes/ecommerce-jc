import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  current: string;
}

export default function Breadcrumbs({ items, current }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link href="/" className="breadcrumb-link">
            <Home size={16} />
            <span>Início</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            <ChevronRight size={16} className="breadcrumb-separator" />
            <Link href={item.href} className="breadcrumb-link">
              {item.label}
            </Link>
          </li>
        ))}
        
        <li className="breadcrumb-item">
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{current}</span>
        </li>
      </ol>

      <style jsx>{`
        .breadcrumbs {
          margin-bottom: 30px;
          padding: 15px 0;
          border-bottom: 1px solid #e9ecef;
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 14px;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #6c757d;
          text-decoration: none;
          padding: 5px 8px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .breadcrumb-link:hover {
          color: #007bff;
          background-color: #f8f9fa;
        }

        .breadcrumb-separator {
          color: #adb5bd;
        }

        .breadcrumb-current {
          color: #495057;
          font-weight: 500;
          padding: 5px 8px;
        }

        @media (max-width: 768px) {
          .breadcrumbs {
            margin-bottom: 20px;
            padding: 10px 0;
          }

          .breadcrumb-list {
            font-size: 13px;
          }

          .breadcrumb-link span {
            display: none;
          }

          .breadcrumb-link {
            padding: 4px 6px;
          }

          .breadcrumb-current {
            padding: 4px 6px;
            font-size: 13px;
          }
        }
      `}</style>
    </nav>
  );
}
