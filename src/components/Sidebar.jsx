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
          onClick={handleActive}
          icon={<i className="fas fa-tachometer-alt"></i>}
        >
          <Link
            to="/dashboard"
            className="link page-link"
            onClick={handleActive}
          >
            Dashboard
          </Link>
        </MenuItem>
        <SubMenu label="Patient Reception" icon={<i class="fas fa-user-nurse"></i>}>
          <MenuItem icon={<PersonAddIcon />}>
            <Link
            to="/registration"
            className="link page-link"
            onClick={handleActive}
          >
            Patient Registration
          </Link>
          </MenuItem>
          <MenuItem icon={<i class="fas fa-clipboard-list"></i>}>
            <Link
            to="/TriageAssessment"
            className="link page-link"
            onClick={handleActive}
          >
            Triage & Assessment
          </Link>
          </MenuItem>
          <MenuItem icon={<i class="fas fa-procedures"></i>}>
            <Link
            to="/PatientProfile"
            className="link page-link"
            onClick={handleActive}
          >
             Inpatient Management
          </Link>
          </MenuItem>
          <MenuItem icon={<OutpatientIcon />}>Outpatient Management</MenuItem>
          <MenuItem icon={<MedicalRecordsIcon />}>
            Electronic Medical Records
          </MenuItem>
          <MenuItem icon={<PatientManagementIcon />}>
            Patient Management Systems
          </MenuItem>
          <MenuItem icon={<VideoIcon />}>Telemedicine Systems</MenuItem>
          <MenuItem icon={<CashRegisterIcon />}>Cashier</MenuItem>
        </SubMenu>

        <SubMenu label="Diagnostics" icon={<i class="fas fa-vial"></i>}>
          <MenuItem icon={<i class="fas fa-x-ray"></i>}>
            {" "}
            Radiology Services{" "}
          </MenuItem>
          <MenuItem icon={<i class="fas fa-flask"></i>}>
            {" "}
            Laboratory Services{" "}
          </MenuItem>
        </SubMenu>
        <MenuItem icon={<i class="fas fa-pills"></i>}>
          {" "}
          Pharmacy Management{" "}
        </MenuItem>
        <SubMenu
          label="Nursing Management"
          icon={<i className="fas fa-user-nurse"></i>}
        >
          <MenuItem icon={<i className="fas fa-tasks"></i>}>
            Task Management
          </MenuItem>
          <MenuItem icon={<i className="fas fa-hospital"></i>}>
            Ward Management
          </MenuItem>
          <MenuItem icon={<i className="fas fa-exchange-alt"></i>}>
            Shift Handover
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Doctor Management"
          icon={<i className="fas fa-user-md"></i>}
        >
          <MenuItem icon={<i className="fas fa-calendar-alt"></i>}>
            Physician Scheduling
          </MenuItem>
          <MenuItem icon={<i className="fas fa-clinic-medical"></i>}>
            Clinic Management
          </MenuItem>
          <MenuItem icon={<i className="fas fa-clipboard-list"></i>}>
            Order Management
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Financial Management"
          icon={<i className="fas fa-money-bill-wave"></i>}
        >
          <MenuItem icon={<i className="fas fa-file-invoice-dollar"></i>}>
            Billing & Insurance
          </MenuItem>
          <MenuItem icon={<i className="fas fa-hand-holding-usd"></i>}>
            Collections & Denials Management
          </MenuItem>
          <MenuItem icon={<i className="fas fa-chart-line"></i>}>
            Reporting & Analytics
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Specialty Clinics"
          icon={<i className="fas fa-clinic-medical"></i>}
        >
          <MenuItem icon={<i className="fas fa-heartbeat"></i>}>
            Cardiology
          </MenuItem>
          <MenuItem icon={<i className="fas fa-lungs"></i>}>Oncology</MenuItem>
          <MenuItem icon={<i className="fas fa-brain"></i>}>Neurology</MenuItem>
          <MenuItem icon={<i className="fas fa-stomach"></i>}>
            Gastroenterology
          </MenuItem>
          <MenuItem icon={<i className="fas fa-brain"></i>}>
            Psychiatry
          </MenuItem>
          <MenuItem icon={<i className="fas fa-ellipsis-h"></i>}>
            Others
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Surgery Management"
          icon={<i className="fas fa-procedures"></i>}
        >
          <MenuItem icon={<i className="fas fa-calendar-alt"></i>}>
            OR Scheduling
          </MenuItem>
          <MenuItem icon={<i className="fas fa-file-medical-alt"></i>}>
            Pre-Operative Management
          </MenuItem>
          <MenuItem icon={<i className="fas fa-file-medical"></i>}>
            Post-Operative Management
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Supply Chain Management"
          icon={<i className="fas fa-truck"></i>}
        >
          <MenuItem icon={<i className="fas fa-clipboard-list-check"></i>}>
            Inventory Management
          </MenuItem>
          <MenuItem icon={<i className="fas fa-shopping-cart"></i>}>
            Purchasing & Ordering
          </MenuItem>
          <MenuItem icon={<i className="fas fa-truck-loading"></i>}>
            Receiving & Vendor Management
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Human Resources"
          icon={<i className="fas fa-users"></i>}
        >
          <MenuItem icon={<i className="fas fa-users-cog"></i>}>
            Employee Management
          </MenuItem>
          <MenuItem icon={<i className="fas fa-money-bill-wave"></i>}>
            Payroll
          </MenuItem>
          <MenuItem icon={<i className="fas fa-briefcase"></i>}>
            Benefits Administration
          </MenuItem>
          <MenuItem icon={<i className="fas fa-building"></i>}>
            Department Management
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Recording & Reporting"
          icon={<i className="fas fa-chart-bar"></i>}
        >
          <MenuItem icon={<i className="fas fa-file-medical-alt"></i>}>
            Clinical Reports
          </MenuItem>
          <MenuItem icon={<i className="fas fa-file-invoice-dollar"></i>}>
            Financial Reports
          </MenuItem>
          <MenuItem icon={<i className="fas fa-chart-pie"></i>}>
            Operational Reports
          </MenuItem>
        </SubMenu>
        <SubMenu label="Administration" icon={<i className="fas fa-cogs"></i>}>
          <MenuItem icon={<i className="fas fa-cogs"></i>}>
            System Configuration
          </MenuItem>
          <MenuItem icon={<i className="fas fa-users-cog"></i>}>
            User Management
          </MenuItem>
          <MenuItem icon={<i className="fas fa-shield-alt"></i>}>
            Security Management
          </MenuItem>
        </SubMenu>
        <SubMenu label="Settings" icon={<i className="fas fa-cog"></i>}>
          <MenuItem icon={<i className="fas fa-building"></i>}>
            Facility Settings
          </MenuItem>
          <MenuItem icon={<i className="fas fa-user-cog"></i>}>
            User Preferences
          </MenuItem>
        </SubMenu>

        <MenuItem onClick={handleActive} icon={<LogoutRoundedIcon />}>
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
