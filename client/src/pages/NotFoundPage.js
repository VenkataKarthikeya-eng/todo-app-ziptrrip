import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage — Displayed for any unmatched routes (404).
 */
const NotFoundPage = () => {
  return (
    <div className="page not-found-page">
      <div className="container">
        <div className="not-found-container">
          <div className="not-found-code">404</div>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary">
            ← Back to Todos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
