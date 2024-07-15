// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import LoginBtn from './components/loginBtn';
import DashBoard from './components/dashBoard.jsx';

const App = () => {
    return (
      <Router>
        <Routes>
            <Route path="/login" element={<LoginBtn />} />
            <Route path="/landing" element={<DashBoard />} />
            {/* Add other routes here */}
        </Routes>
      </Router>
    );
};

export default App;
