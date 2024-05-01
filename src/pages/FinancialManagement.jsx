import React, { useState } from 'react';
import ReusableTable from './ReusableTable';
import { Button, Dropdown, Tabs, Tab, Modal, Form, Badge } from 'react-bootstrap';
import styled from 'styled-components';

// Mock data for procurement items, department budgets, employee wages, and projections
const procurementItems = [
  { id: 1, item: 'Surgical Gloves', quantity: 1000, requestedBy: 'Surgery Dept', addedBy: 'John Doe', status: 'Pending' },
  { id: 2, item: 'Gauze Pads', quantity: 500, requestedBy: 'Emergency Dept', addedBy: 'Jane Smith', status: 'Approved' },
  // Add more procurement items as needed
];

const departmentBudgets = [
  { id: 1, department: 'Surgery', budgetAllocated: 500000 },
  { id: 2, department: 'Radiology', budgetAllocated: 300000 },
  // Add more department budgets as needed
];

const employeeWages = [
  { id: 1, name: 'John Doe', position: 'Doctor', department: 'Surgery', wage: 8000 },
  { id: 2, name: 'Jane Smith', position: 'Nurse', department: 'Emergency', wage: 5000 },
  // Add more employee wages as needed
];

const projections = [
  { id: 1, department: 'Surgery', revenue: 1000000, expenses: 800000, profit: 200000 },
  { id: 2, department: 'Radiology', revenue: 600000, expenses: 400000, profit: 200000 },
  // Add more projections as needed
];

const FinancialManagement = () => {
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedProcurementItem, setSelectedProcurementItem] = useState(null);

  // Define the columns for the procurement items table
  const procurementItemsColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Item', accessor: 'item' },
    { Header: 'Quantity', accessor: 'quantity' },
    { Header: 'Requested By', accessor: 'requestedBy' },
    { Header: 'Added By', accessor: 'addedBy' },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <Badge variant={value === 'Approved' ? 'success' : 'warning'}>{value}</Badge>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <ProcurementItemActionDropdown
          row={row}
          handleApprovalModalOpen={handleApprovalModalOpen}
        />
      ),
    },
  ];

  // Define the columns for the department budgets table
  const departmentBudgetsColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Budget Allocated', accessor: 'budgetAllocated' },
  ];

  // Define the columns for the employee wages table
  const employeeWagesColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Position', accessor: 'position' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Wage', accessor: 'wage' },
  ];

  // Define the columns for the projections table
  const projectionsColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Revenue', accessor: 'revenue' },
    { Header: 'Expenses', accessor: 'expenses' },
    { Header: 'Profit', accessor: 'profit' },
  ];

  // Define the action dropdown component for procurement item rows
  const ProcurementItemActionDropdown = ({ row, handleApprovalModalOpen }) => {
    const procurementItem = row.original;

    const handleApprove = () => {
      setSelectedProcurementItem(procurementItem);
      handleApprovalModalOpen();
    };

    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id={`procurement-action-${procurementItem.id}`}>
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {procurementItem.status === 'Pending' && (
            <Dropdown.Item onClick={handleApprove}>Approve</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleApprovalModalOpen = (procurementItem) => {
    setSelectedProcurementItem(procurementItem);
    setShowApprovalModal(true);
  };

  const handleApprovalModalClose = () => {
    setSelectedProcurementItem(null);
    setShowApprovalModal(false);
  };

  const handleApprove = () => {
    // Implement logic to approve the selected procurement item
    console.log(`Approved procurement item: ${selectedProcurementItem.item}`);
    handleApprovalModalClose();
  };

  return (
    <div>
      <h2>Financial Management</h2>

      <Tabs defaultActiveKey="procurement">
        <Tab eventKey="procurement" title="Procurement">
          <ReusableTable
            columns={procurementItemsColumns}
            data={procurementItems}
            initialState={initialState}
          />
        </Tab>
        <Tab eventKey="budgets" title="Department Budgets">
          <ReusableTable
            columns={departmentBudgetsColumns}
            data={departmentBudgets}
            initialState={initialState}
          />
        </Tab>
        <Tab eventKey="wages" title="Employee Wages">
          <ReusableTable
            columns={employeeWagesColumns}
            data={employeeWages}
            initialState={initialState}
          />
        </Tab>
        <Tab eventKey="projections" title="Projections">
          <ReusableTable
            columns={projectionsColumns}
            data={projections}
            initialState={initialState}
          />
        </Tab>
      </Tabs>

      <Modal show={showApprovalModal} onHide={handleApprovalModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Procurement Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProcurementItemDetails item={selectedProcurementItem} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleApprovalModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const ProcurementItemDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default FinancialManagement;