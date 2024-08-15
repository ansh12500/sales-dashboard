import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard1Page from './pages/Dashboard1Page';
import Dashboard2Page from './pages/Dashboard2Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard1" element={<Dashboard1Page />} />
        <Route path="/dashboard2" element={<Dashboard2Page />} />
        <Route path="/" element={<div>Welcome to Sales Dashboard</div>} />
      </Routes>
    </Router>
  );
}

export default App;
