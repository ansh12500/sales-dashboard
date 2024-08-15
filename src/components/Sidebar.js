import React from 'react';

function Sidebar() {
  return (
    <aside>
      <h2>Menu</h2>
      <ul>
        <li><a href="/dashboard1">Today's Sales</a></li>
        <li><a href="/dashboard2">Sales Comparison</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
