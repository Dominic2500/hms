import React, { useState } from 'react';
import ReusableTable from './ReusableTable';
import { Button, Dropdown, Tabs, Tab, Modal, Form } from 'react-bootstrap';

// Mock data for patients and wards
const patients = [
  { id: 1, name: 'John Doe', age: 35, gender: 'Male', admissionDate: '2023-04-25' },
  { id: 2, name: 'Jane Smith', age: 42, gender: 'Female', admissionDate: '2023-04-27' },
  // Add more patient data as needed
];

const wards = [
  { id: 1, name: 'General Ward', capacity: 20, occupiedBeds: 15, emptyBeds: 5, nurses: ['Nurse A', 'Nurse B'] },
  { id: 2, name: 'ICU', capacity: 10, occupiedBeds: 8, emptyBeds: 2, nurses: ['Nurse C', 'Nurse D'] },
  // Add more ward data as needed
];

const InpatientComponent = () => {
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [showAddWardModal, setShowAddWardModal] = useState(false);
  const [newWardName, setNewWardName] = useState('');
  const [newWardCapacity, setNewWardCapacity] = useState(0);

  // Define the columns for the patient table
  const patientColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Admission Date', accessor: 'admissionDate' },
  ];

  // Define the columns for the ward table
  const wardColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Capacity', accessor: 'capacity' },
    { Header: 'Occupied Beds', accessor: 'occupiedBeds' },
    { Header: 'Empty Beds', accessor: 'emptyBeds' },
    { Header: 'Nurses', accessor: 'nurses', Cell: ({ value }) => value.join(', ') },
  ];

  // Define the action dropdown component for patient rows
  const PatientActionDropdown = ({ row }) => {
    const patient = row.original;

    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id={`patient-action-${patient.id}`}>
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>View Details</Dropdown.Item>
          <Dropdown.Item>Transfer Ward</Dropdown.Item>
          <Dropdown.Item>Discharge</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  // Define the action dropdown component for ward rows
  const WardActionDropdown = ({ row }) => {
    const ward = row.original;

    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id={`ward-action-${ward.id}`}>
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>View Details</Dropdown.Item>
          <Dropdown.Item>Add Nurse</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleAddWardModalOpen = () => setShowAddWardModal(true);
  const handleAddWardModalClose = () => setShowAddWardModal(false);

  const handleAddWard = () => {
    // Add logic to create a new ward with the provided name and capacity
    console.log(`Adding new ward: ${newWardName} with capacity ${newWardCapacity}`);
    handleAddWardModalClose();
  };

  return (
    <div>
      <h2>Inpatient Management</h2>

      <Tabs defaultActiveKey="patients">
        <Tab eventKey="patients" title="Patients">
          <ReusableTable
            columns={patientColumns}
            data={patients}
            initialState={initialState}
            ActionDropdown={PatientActionDropdown}
          />
        </Tab>
        <Tab eventKey="wards" title="Wards">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <Button variant="primary" onClick={handleAddWardModalOpen}>
              Add New Ward
            </Button>
          </div>
          <ReusableTable
            columns={wardColumns}
            data={wards}
            initialState={initialState}
            ActionDropdown={WardActionDropdown}
          />
        </Tab>
      </Tabs>

      <Modal show={showAddWardModal} onHide={handleAddWardModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Ward</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formWardName">
              <Form.Label>Ward Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ward name"
                value={newWardName}
                onChange={(e) => setNewWardName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formWardCapacity">
              <Form.Label>Ward Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ward capacity"
                value={newWardCapacity}
                onChange={(e) => setNewWardCapacity(parseInt(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddWardModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddWard}>
            Add Ward
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InpatientComponent;