import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Prescriptions from './pharmacy_patient_prescriptions'

const Pharmacy = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');

  const renderPrescriptionsContent = () => {
    const prescriptions = [
      { id: 1, patientName: 'John Doe', medication: 'Aspirin', dosage: '500mg' },
      { id: 2, patientName: 'Jane Smith', medication: 'Lisinopril', dosage: '10mg' },
      // Add more prescriptions here
    ];

    return (
      <div>
        <h2>Prescriptions</h2>
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription.id}>
              <p>Patient: {prescription.patientName}</p>
              <p>Medication: {prescription.medication}</p>
              <p>Dosage: {prescription.dosage}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderWardOrdersContent = () => {
    return <div>Ward Orders content goes here.</div>;
  };

  const renderInventoryContent = () => {
    return <div>Inventory content goes here.</div>;
  };

  return (
    <Container>
      <Row>
        <Col>
          <Tabs
            id="pharmacy-tabs"
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="justify-content-center"
          >
            <Tab eventKey="prescriptions" title="Prescriptions">
              {/* {renderPrescriptionsContent()} */}
              <Prescriptions/>
            </Tab>
            <Tab eventKey="ward-orders" title="Ward Orders">
              {renderWardOrdersContent()}
            </Tab>
            <Tab eventKey="inventory" title="Inventory">
              {renderInventoryContent()}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Pharmacy;