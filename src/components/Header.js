import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Sales Dashboard</h1>
      <nav>
        <Link to="/dashboard1">Today's Sales</Link>
        <Link to="/dashboard2">Sales Comparison</Link>
      </nav>
    </header>
  );
}

export default Header;
