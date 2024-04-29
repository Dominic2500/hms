import React, { useState } from "react";
import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import PatientManagement from "../components/Lab_PatientManagement";
import TestManagement from "../components/Lab_TestManagement";
import TasksAndReminders from "../components/Lab_TasksAndReminders";

const LaboratoryManagement = () => {
  const [activeTab, setActiveTab] = useState("patientManagement");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Row>
        <Col>
          <TabbedInterface activeTab={activeTab} onTabChange={handleTabChange}>
            <Tab eventKey="patientManagement" title="Patient Management">
              <PatientManagement />
            </Tab>
            <Tab eventKey="testManagement" title="Test Management">
              <TestManagement />
            </Tab>
            <Tab eventKey="tasksAndReminders" title="Tasks and Reminders">
              <TasksAndReminders />
            </Tab>
          </TabbedInterface>
        </Col>
      </Row>
    </Container>
  );
};

const TabbedInterface = styled(Tabs)`
  .nav-link {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 0.5rem 1rem;
    margin-right: 1rem;

    &.active {
      color: #007bff;
      border-bottom: 2px solid #007bff;
    }
  }

  .tab-content {
    border: 1px solid #dee2e6;
    border-top: none;
    padding: 1rem;
    background-color: #f8f9fa;
  }
`;

export default LaboratoryManagement;