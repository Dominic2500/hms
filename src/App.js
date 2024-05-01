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
import TeleMedicine from './pages/Telemedicine';
import ImagingDashboard from './pages/imaging'
import LaboratoryManagement from './pages/laboratory'
import UserManagement from './pages/UserManagement';
import Pharmacy from './pages/pharmacy';
import Procurement from './pages/Procurement';
import InpatientManagement from './pages/inpatientManagement'
import FinancialManagement from './pages/FinancialManagement'
import SideBar from './components/Sidebar';
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
              {/* imaging dashboard */}
              <Route path='/ImagingDashboard' element={<ImagingDashboard/>}/>
              {/* Laboratory route */}
              <Route path='/Laboratory' element={<LaboratoryManagement/>}/>
              {/* Telemedicine Route */}
              <Route path="/TeleMedicine" element={<TeleMedicine />} />
              {/* User Management Route */}
              <Route path="/UserManagement" element={<UserManagement/>}/>
              {/* Pharmacy Route */}
              <Route path="/Pharmacy" element={<Pharmacy/>}/>
              {/* Procurement Route */}
              <Route path="/Procurement" element={<Procurement/>}/>
              {/* Inpatient management Route */}
              <Route path='/InpatientManagement' element={<InpatientManagement/>}/>
              {/* FinancialManagement */}
              <Route path='./FinancialManagement' element={<FinancialManagement/>}/>
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
