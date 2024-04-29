import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import OutpatientIcon from "@mui/icons-material/Accessible";
import MedicalRecordsIcon from "@mui/icons-material/Newspaper";
import PatientManagementIcon from "@mui/icons-material/ManageAccounts";
import VideoIcon from "@mui/icons-material/VideoChat";
import CashRegisterIcon from "@mui/icons-material/Paid";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "../index.css";
import React, { useState } from "react";

import logoImage from "./logo.png";

const SideBar = () => {
  const [activePage, setActivePage] = useState(null);

  function handleActive(event) {
    const target = event.currentTarget;
    if (activePage !== target) {
      if (activePage) {
        activePage.classList.remove("active");
      }
      target.classList.add("active");
      setActivePage(target);
    }
  }

  const menuItemStyles = {
    root: {
      fontSize: "14px",
      fontWeight: 500,
    },
    icon: {
      color: "#63b3ed",
    },
    SubMenuExpandIcon: {
      color: "#a0aec0",
    },
    subMenuContent: () => ({
      backgroundColor: "#2d3748",
    }),
    label: () => ({
      fontWeight: 600,
    }),
    button: {
      color: "#e2e8f0",
      fontSize: "0.9rem",
      fontWeight: "600",
      transition: "color 0.3s ease, background-color 0.3s ease",
      "&:hover": {
        color: "#e2e8f0",
        backgroundColor: "#4a5568",
      },
      "&.active": {
        backgroundColor: "#63b3ed",
        color: "#1a202c",
      },
      textDecoration: "none",
    },
  };

  return (
    <Sidebar
      className="app"
      backgroundColor="#1a202c"
      rootStyles={{
        color: "#e2e8f0",
      }}
      style={{
        borderRight: "1px solid #2d3748",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: "80px", height: "80px" }}
        />
        <h3 style={{ color: "#63b3ed", marginTop: "0.5rem" }}>
          Hospital System
        </h3>
      </div>
      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem
          component={
            <Link to="/dashboard" onClick={handleActive}>
              Dashboard
            </Link>
          }
          icon={<i className="fas fa-tachometer-alt"></i>}
        >
          Dashboard
        </MenuItem>
        <SubMenu
          label="Patient Reception"
          icon={<i className="fas fa-user-nurse"></i>}
        >
          <MenuItem
            component={
              <Link to="/registration" onClick={handleActive}>
                Patient Registration
              </Link>
            }
            icon={<PersonAddIcon />}
          >
            Patient Registration
          </MenuItem>
          <MenuItem
            component={
              <Link to="/TriageAssessment" onClick={handleActive}>
                Triage & Assessment
              </Link>
            }
            icon={<i className="fas fa-clipboard-list"></i>}
          >
            Triage & Assessment
          </MenuItem>

          <MenuItem
            component={
              <Link to="/outpatient-management" onClick={handleActive}>
                Outpatient Management
              </Link>
            }
            icon={<OutpatientIcon />}
          >
            Outpatient Management
          </MenuItem>
          
        </SubMenu>
        <MenuItem
          component={
            <Link to="/electronic-health-records" onClick={handleActive}>
              Electronic Health Records
            </Link>
          }
          icon={<i className="fas fa-stethoscope"></i>}
        >
          Electronic Health Records
        </MenuItem>
        <MenuItem
          component={
            <Link to="/TeleMedicine" onClick={handleActive}>
              Telemedicine System
            </Link>
          }
          icon={<i className="fas fa-mobile-alt"></i>}
        >
          Telemedicine System
        </MenuItem>
        <SubMenu label="Diagnostics" icon={<i className="fas fa-vial"></i>}>
          <MenuItem
            component={
              <Link to="/ImagingDashboard" onClick={handleActive}>
                Imaging
              </Link>
            }
            icon={<i className="fas fa-x-ray"></i>}
          >
            Imaging
          </MenuItem>
          <MenuItem
            component={
              <Link to="/Laboratory" onClick={handleActive}>
                Laboratory
              </Link>
            }
            icon={<i className="fas fa-flask"></i>}
          >
            Laboratory
          </MenuItem>
        </SubMenu>
        <MenuItem
          component={
            <Link to="/Pharmacy" onClick={handleActive}>
              Pharmacy Management
            </Link>
          }
          icon={<i className="fas fa-pills"></i>}
        >
          Pharmacy Management
        </MenuItem>
        <MenuItem
          component={
            <Link to="/inpatient" onClick={handleActive}>
              Inpatient Management
            </Link>
          }
          icon={<i className="fas fa-procedures"></i>}
        >
          Inpatient Management
        </MenuItem>
        <SubMenu
          label="Nursing Management"
          icon={<i className="fas fa-user-nurse"></i>}
        >
          <MenuItem
            component={
              <Link to="/patient-management-systems" onClick={handleActive}>
                Patient Management Systems
              </Link>
            }
            icon={<PatientManagementIcon />}
          >
            Patient Management Systems
          </MenuItem>
          <MenuItem
            component={
              <Link to="/ward-management" onClick={handleActive}>
                Ward Management
              </Link>
            }
            icon={<i className="fas fa-hospital"></i>}
          >
            Ward Management
          </MenuItem>
          <MenuItem
            component={
              <Link to="/shift-handover" onClick={handleActive}>
                Shift Handover
              </Link>
            }
            icon={<i className="fas fa-exchange-alt"></i>}
          >
            Shift Handover
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Doctor Management"
          icon={<i className="fas fa-user-md"></i>}
        >
          <MenuItem
            component={
              <Link to="/physician-scheduling" onClick={handleActive}>
                Physician Scheduling
              </Link>
            }
            icon={<i className="fas fa-calendar-alt"></i>}
          >
            Physician Scheduling
          </MenuItem>
          <MenuItem
            component={
              <Link to="/clinic-management" onClick={handleActive}>
                Clinic Management
              </Link>
            }
            icon={<i className="fas fa-clinic-medical"></i>}
          >
            Clinic Management
          </MenuItem>
          <MenuItem
            component={
              <Link to="/order-management" onClick={handleActive}>
                Order Management
              </Link>
            }
            icon={<i className="fas fa-clipboard-list"></i>}
          >
            Order Management
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Financial Management"
          icon={<i className="fas fa-money-bill-wave"></i>}
        >
          <MenuItem
            component={
              <Link to="/billing-insurance" onClick={handleActive}>
                Billing & Insurance
              </Link>
            }
            icon={<i className="fas fa-file-invoice-dollar"></i>}
          >
            Billing & Insurance
          </MenuItem>
          <MenuItem
            component={
              <Link to="/collections-denials" onClick={handleActive}>
                Collections & Denials Management
              </Link>
            }
            icon={<i className="fas fa-hand-holding-usd"></i>}
          >
            Collections & Denials Management
          </MenuItem>
          <MenuItem
            component={
              <Link to="/reporting-analytics" onClick={handleActive}>
                Reporting & Analytics
              </Link>
            }
            icon={<i className="fas fa-chart-line"></i>}
          >
            Reporting & Analytics
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Specialty Clinics"
          icon={<i className="fas fa-clinic-medical"></i>}
        >
          <MenuItem
            component={
              <Link to="/cardiology" onClick={handleActive}>
                Cardiology
              </Link>
            }
            icon={<i className="fas fa-heartbeat"></i>}
          >
            Cardiology
          </MenuItem>
          <MenuItem
            component={
              <Link to="/oncology" onClick={handleActive}>
                Oncology
              </Link>
            }
            icon={<i className="fas fa-lungs"></i>}
          >
            Oncology
          </MenuItem>
          <MenuItem
            component={
              <Link to="/neurology" onClick={handleActive}>
                Neurology
              </Link>
            }
            icon={<i className="fas fa-brain"></i>}
          >
            Neurology
          </MenuItem>
          <MenuItem
            component={
              <Link to="/gastroenterology" onClick={handleActive}>
                Gastroenterology
              </Link>
            }
            icon={<i className="fas fa-stomach"></i>}
          >
            Gastroenterology
          </MenuItem>
          <MenuItem
            component={
              <Link to="/psychiatry" onClick={handleActive}>
                Psychiatry
              </Link>
            }
            icon={<i className="fas fa-brain"></i>}
          >
            Psychiatry
          </MenuItem>
          <MenuItem
            component={
              <Link to="/other-clinics" onClick={handleActive}>
                Others
              </Link>
            }
            icon={<i className="fas fa-ellipsis-h"></i>}
          >
            Others
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Surgery Management"
          icon={<i className="fas fa-procedures"></i>}
        >
          <MenuItem
            component={
              <Link to="/or-scheduling" onClick={handleActive}>
                OR Scheduling
              </Link>
            }
            icon={<i className="fas fa-calendar-alt"></i>}
          >
            OR Scheduling
          </MenuItem>
          <MenuItem
            component={
              <Link to="/pre-operative-management" onClick={handleActive}>
                Pre-Operative Management
              </Link>
            }
            icon={<i className="fas fa-file-medical-alt"></i>}
          >
            Pre-Operative Management
          </MenuItem>
          <MenuItem
            component={
              <Link to="/post-operative-management" onClick={handleActive}>
                Post-Operative Management
              </Link>
            }
            icon={<i className="fas fa-file-medical"></i>}
          >
            Post-Operative Management
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Supply Chain Management"
          icon={<i className="fas fa-truck"></i>}
        >
          <MenuItem
            component={
              <Link to="/Procurement" onClick={handleActive}>
                Inventory Management
              </Link>
            }
            icon={<i className="fas fa-clipboard-list-check"></i>}
          >
            Inventory Management
          </MenuItem>
          <MenuItem
            component={
              <Link to="/purchasing-ordering" onClick={handleActive}>
                Purchasing & Ordering
              </Link>
            }
            icon={<i className="fas fa-shopping-cart"></i>}
          >
            Purchasing & Ordering
          </MenuItem>
          <MenuItem
            component={
              <Link to="/receiving-vendor-management" onClick={handleActive}>
                Receiving & Vendor Management
              </Link>
            }
            icon={<i className="fas fa-truck-loading"></i>}
          >
            Receiving & Vendor Management
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Human Resources"
          icon={<i className="fas fa-users"></i>}
        >
          <MenuItem
            component={
              <Link to="/" onClick={handleActive}>
                Employee Management
              </Link>
            }
            icon={<i className="fas fa-users-cog"></i>}
          >
            Employee Management
          </MenuItem>
          <MenuItem
            component={
              <Link to="/payroll" onClick={handleActive}>
                Payroll
              </Link>
            }
            icon={<i className="fas fa-money-bill-wave"></i>}
          >
            Payroll
          </MenuItem>
          <MenuItem
            component={
              <Link to="/benefits-administration" onClick={handleActive}>
                Benefits Administration
              </Link>
            }
            icon={<i className="fas fa-briefcase"></i>}
          >
            Benefits Administration
          </MenuItem>
          <MenuItem
            component={
              <Link to="/department-management" onClick={handleActive}>
                Department Management
              </Link>
            }
            icon={<i className="fas fa-building"></i>}
          >
            Department Management
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Recording & Reporting"
          icon={<i className="fas fa-chart-bar"></i>}
        >
          <MenuItem
            component={
              <Link to="/clinical-reports" onClick={handleActive}>
                Clinical Reports
              </Link>
            }
            icon={<i className="fas fa-file-medical-alt"></i>}
          >
            Clinical Reports
          </MenuItem>
          <MenuItem
            component={
              <Link to="/financial-reports" onClick={handleActive}>
                Financial Reports
              </Link>
            }
            icon={<i className="fas fa-file-invoice-dollar"></i>}
          >
            Financial Reports
          </MenuItem>
          <MenuItem
            component={
              <Link to="/operational-reports" onClick={handleActive}>
                Operational Reports
              </Link>
            }
            icon={<i className="fas fa-chart-pie"></i>}
          >
            Operational Reports
          </MenuItem>
        </SubMenu>
        <SubMenu label="Administration" icon={<i className="fas fa-cogs"></i>}>
          <MenuItem
            component={
              <Link to="/system-configuration" onClick={handleActive}>
                System Configuration
              </Link>
            }
            icon={<i className="fas fa-cogs"></i>}
          >
            System Configuration
          </MenuItem>
          <MenuItem
            component={
              <Link to="/UserManagement" onClick={handleActive}>
                User Management
              </Link>
            }
            icon={<i className="fas fa-users-cog"></i>}
          >
            User Management
          </MenuItem>
          <MenuItem
            component={
              <Link to="/security-management" onClick={handleActive}>
                Security Management
              </Link>
            }
            icon={<i className="fas fa-shield-alt"></i>}
          >
            Security Management
          </MenuItem>
        </SubMenu>
        <SubMenu label="Settings" icon={<i className="fas fa-cog"></i>}>
          <MenuItem
            component={
              <Link to="/facility-settings" onClick={handleActive}>
                Facility Settings
              </Link>
            }
            icon={<i className="fas fa-building"></i>}
          >
            Facility Settings
          </MenuItem>
          <MenuItem
            component={
              <Link to="/user-preferences" onClick={handleActive}>
                User Preferences
              </Link>
            }
            icon={<i className="fas fa-user-cog"></i>}
          >
            User Preferences
          </MenuItem>
        </SubMenu>
        <MenuItem
          component={
            <Link to="/logout" onClick={handleActive}>
              Logout
            </Link>
          }
          icon={<LogoutRoundedIcon />}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
