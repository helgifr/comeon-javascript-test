import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>
        404: Page not found
      </h1>
      <Link to="/games" className="ui secondary button inverted">
        Home
      </Link>
    </div>
  );
}