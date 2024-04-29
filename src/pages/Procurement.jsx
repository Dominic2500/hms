import React, { useState } from "react";
import ReusableTable from "./ReusableTable";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaClipboardList,
  FaBoxes,
  FaChartBar,
  FaClipboard,
} from "react-icons/fa";
import styled from "styled-components";
import {
  Modal,
  Button,
  Form,
  Card,
  ProgressBar,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";

// Sample data
const procurementData = [
  // Add your sample data here
];

const DepartmentNeedsTab = () => {
  const departmentNeedsColumns = [
    { Header: "Item", accessor: "item" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Department", accessor: "department" },
    { Header: "Requested By", accessor: "requestedBy" },
    { Header: "Request Date", accessor: "requestDate" },
  ];

  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <ReusableTable
      columns={departmentNeedsColumns}
      data={procurementData}
      initialState={initialState}
    />
  );
};

const OrderManagementTab = () => {
  const orderManagementColumns = [
    { Header: "Order ID", accessor: "orderId" },
    { Header: "Items", accessor: "items" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Vendor", accessor: "vendor" },
    { Header: "Status", accessor: "status" },
    { Header: "Delivery Date", accessor: "deliveryDate" },
  ];

  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <ReusableTable
      columns={orderManagementColumns}
      data={procurementData}
      initialState={initialState}
      ActionDropdown={ActionDropdown}
    />
  );
};

const InventoryTab = () => {
  return (
    <Container>
      <Card>
        <Card.Header>
          <h4>Gauze Pads</h4>
        </Card.Header>
        <Card.Body>
          <ProgressBar now={65} label={`65%`} />
        </Card.Body>
      </Card>
      {/* Add more inventory items here */}
    </Container>
  );
};

const ReportingTab = () => {
  return (
    <Container>
      <h4>Procurement Costs Over Time</h4>
      {/* Add line chart component here */}
      <h4>Item Demand by Department</h4>
      {/* Add bar chart component here */}
      <h4>Vendor Performance</h4>
      {/* Add pie chart component here */}
    </Container>
  );
};

const IssuedItemsTab = () => {
  const issuedItemsColumns = [
    { Header: "Item", accessor: "item" },
    { Header: "Issued To", accessor: "issuedTo" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Department", accessor: "department" },
    { Header: "Requested By", accessor: "requestedBy" },
    { Header: "Issued On", accessor: "issuedOn" },
  ];

  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <ReusableTable
      columns={issuedItemsColumns}
      data={procurementData}
      initialState={initialState}
    />
  );
};

const ActionDropdown = ({ row }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    // Handle edit logic here
    console.log(`Editing item: ${row.original.item}`);
    setShowModal(true);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log(`Deleting item: ${row.original.item}`);
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Container>
        <FaEdit
          onClick={handleEdit}
          style={{ cursor: "pointer", color: "green" }}
        />
        <FaTrash
          onClick={handleDelete}
          style={{ cursor: "pointer", color: "red" }}
        />
      </Container>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{/* Add form fields for editing item details */}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Procurement = () => {
  const [activeTab, setActiveTab] = useState("departmentNeeds");


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
            <Tab eventKey="departmentNeeds" title="department Needs">
              <DepartmentNeedsTab />
            </Tab>
            <Tab eventKey="orderManagement" title="order Management">
              <OrderManagementTab />
            </Tab>
            <Tab eventKey="inventory" title="Inventory">
              <InventoryTab />
            </Tab>
            <Tab eventKey="reporting" title="Reporting">
              <ReportingTab />
            </Tab>
            <Tab eventKey="issuedItems" title="Issued Items">
              <IssuedItemsTab />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Procurement;
