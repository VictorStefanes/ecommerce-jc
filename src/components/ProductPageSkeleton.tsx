import React from 'react';

export default function ProductPageSkeleton() {
  return (
    <div className="product-skeleton">
      <div className="container">
        {/* Breadcrumb skeleton */}
        <div className="breadcrumb-skeleton">
          <div className="skeleton-line short"></div>
        </div>

        <div className="product-content">
          {/* Image gallery skeleton */}
          <div className="image-section">
            <div className="main-image-skeleton">
              <div className="skeleton-box large"></div>
            </div>
            <div className="thumbnails-skeleton">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton-box thumb"></div>
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="info-section">
            <div className="skeleton-line medium"></div>
            <div className="skeleton-line short"></div>
            
            <div className="price-skeleton">
              <div className="skeleton-line price"></div>
              <div className="skeleton-line discount"></div>
            </div>

            <div className="colors-skeleton">
              <div className="skeleton-line label"></div>
              <div className="color-options">
                {[1, 2, 3].map(i => (
                  <div key={i} className="skeleton-circle"></div>
                ))}
              </div>
            </div>

            <div className="sizes-skeleton">
              <div className="skeleton-line label"></div>
              <div className="size-options">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="skeleton-box size"></div>
                ))}
              </div>
            </div>

            <div className="quantity-skeleton">
              <div className="skeleton-line label"></div>
              <div className="skeleton-box quantity"></div>
            </div>

            <div className="buttons-skeleton">
              <div className="skeleton-box button"></div>
              <div className="skeleton-box button"></div>
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="tabs-skeleton">
          <div className="tab-headers">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton-line tab"></div>
            ))}
          </div>
          <div className="tab-content">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="skeleton-line content"></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-skeleton {
          padding: 20px 0;
          background: #f8f9fa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .breadcrumb-skeleton {
          margin-bottom: 30px;
        }

        .product-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .image-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .main-image-skeleton {
          width: 100%;
          aspect-ratio: 1;
        }

        .thumbnails-skeleton {
          display: flex;
          gap: 10px;
        }

        .info-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .price-skeleton {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .colors-skeleton,
        .sizes-skeleton,
        .quantity-skeleton {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .color-options {
          display: flex;
          gap: 10px;
        }

        .size-options {
          display: flex;
          gap: 10px;
        }

        .buttons-skeleton {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .tabs-skeleton {
          border-top: 1px solid #dee2e6;
          padding-top: 40px;
        }

        .tab-headers {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
        }

        .tab-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        /* Skeleton elements */
        .skeleton-line,
        .skeleton-box,
        .skeleton-circle {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }

        .skeleton-line {
          height: 20px;
        }

        .skeleton-line.short {
          width: 30%;
        }

        .skeleton-line.medium {
          width: 60%;
        }

        .skeleton-line.price {
          width: 120px;
          height: 32px;
        }

        .skeleton-line.discount {
          width: 80px;
          height: 24px;
        }

        .skeleton-line.label {
          width: 100px;
          height: 16px;
        }

        .skeleton-line.tab {
          width: 80px;
          height: 24px;
        }

        .skeleton-line.content {
          width: 100%;
          height: 16px;
        }

        .skeleton-line.content:nth-child(even) {
          width: 85%;
        }

        .skeleton-box.large {
          width: 100%;
          height: 500px;
          border-radius: 12px;
        }

        .skeleton-box.thumb {
          width: 80px;
          height: 80px;
          border-radius: 8px;
        }

        .skeleton-box.size {
          width: 50px;
          height: 40px;
          border-radius: 6px;
        }

        .skeleton-box.quantity {
          width: 120px;
          height: 48px;
          border-radius: 8px;
        }

        .skeleton-box.button {
          width: 100%;
          height: 50px;
          border-radius: 8px;
        }

        .skeleton-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @media (max-width: 768px) {
          .product-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .thumbnails-skeleton {
            order: -1;
          }

          .main-image-skeleton {
            order: -1;
          }

          .skeleton-box.large {
            height: 300px;
          }

          .buttons-skeleton {
            flex-direction: column;
          }

          .tab-headers {
            flex-wrap: wrap;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}
