// App.js
import React from 'react';
import './App.css'; // Import your CSS file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/dashboard';
import Registration from './pages/registration';
import TriageAssessment from './pages/triage';
import PatientProfile from './pages/patientProfile';
import SideBar from './components/Sidebar'
function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <SideBar />

          <div className="content-container">
            <NavBar />
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<Dashboard />} />
              {/* Dashboard Route */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* registration route */}
              <Route path="/registration" element={<Registration />} />
              {/* Triage Assessment Route */}
              <Route path="/TriageAssessment" element={<TriageAssessment />} />
              {/* Patient Profile Route */}
              <Route path="/PatientProfile" element={<PatientProfile />} />
              {/* Other routes */}
            </Routes>
          </div>
        </div>
        {/* <Footer /> */}

      </Router>
    </>
  );
}

export default App;
