import React, { useState } from "react";
import {
  Button,
  Modal,
  Badge,
  Dropdown,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import {
  FaPlus,
  FaEdit,
  FaSave,
  FaTrashAlt,
  FaClipboardCheck,
  FaUpload,
} from "react-icons/fa";
import { format } from "date-fns";
import * as Yup from 'yup';
import styled from "styled-components";
import ReusableTable from "../pages/ReusableTable";

const PatientManagement = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 35,
      gender: "Male",
      email: "john@example.com",
      phone: "1234567890",
      orders: [
        {
          id: 1,
          test: "CBC",
          status: "pending",
          dateOrdered: "2023-05-01",
          orderingDoctor: "Dr. Smith",
          priority: "routine",
          specimenType: "blood",
        },
        {
          id: 2,
          test: "Lipid Panel",
          status: "complete",
          dateOrdered: "2023-05-02",
          orderingDoctor: "Dr. Johnson",
          priority: "urgent",
          specimenType: "blood",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 42,
      gender: "Female",
      email: "jane@example.com",
      phone: "9876543210",
      orders: [
        {
          id: 3,
          test: "Glucose",
          status: "pending",
          dateOrdered: "2023-05-03",
          orderingDoctor: "Dr. Williams",
          priority: "routine",
          specimenType: "blood",
        },
        {
          id: 4,
          test: "TSH",
          status: "pending",
          dateOrdered: "2023-05-04",
          orderingDoctor: "Dr. Brown",
          priority: "urgent",
          specimenType: "blood",
        },
      ],
    },
  ]);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "complete":
        return "success";
      default:
        return "secondary";
    }
  };

  const COLUMNS = [
    {
      Header: "Patient Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Test",
      accessor: "test",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <Badge bg={getStatusColor(value)}>{value}</Badge>,
    },
    {
      Header: "Date Ordered",
      accessor: "dateOrdered",
    },
    {
      Header: "Ordering Doctor",
      accessor: "orderingDoctor",
    },
    {
      Header: "Priority",
      accessor: "priority",
    },
    {
      Header: "Specimen Type",
      accessor: "specimenType",
    },
  ];

  const data = patients.flatMap((patient) =>
    patient.orders.map((order) => ({
      ...patient,
      ...order,
    }))
  );

  const ActionDropdown = ({ row }) => (
    <Dropdown>
      <Dropdown.Toggle variant="link" id={`dropdown-${row.original.id}`}>
        Actions
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            setSelectedPatient(row.original);
            setSelectedOrder(row.original);
            setShowOrderModal(true);
          }}
        >
          <FaEdit /> Edit Test
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSelectedPatient(row.original);
            setSelectedOrder(row.original);
            setShowOrderModal(true);
          }}
        >
          <FaClipboardCheck /> Add Result
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            const updatedPatients = patients.map((p) => {
              if (p.id === row.original.id) {
                const updatedOrders = p.orders.filter(
                  (o) => o.id !== row.original.id
                );
                return { ...p, orders: updatedOrders };
              }
              return p;
            });
            setPatients(updatedPatients);
          }}
        >
          <FaTrashAlt /> Delete Test
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div>
      <ReusableTable
        columns={COLUMNS}
        data={data}
        initialState={{
          pageSize: 10,
        }}
        ActionDropdown={ActionDropdown}
      />

      <OrderModal
        show={showOrderModal}
        onHide={() => {
          setShowOrderModal(false);
          setSelectedPatient(null);
          setSelectedOrder(null);
        }}
        patient={selectedPatient}
        order={selectedOrder}
        handleSubmit={(values) => {
          const updatedPatients = patients.map((p) => {
            if (p.id === selectedPatient.id) {
              const updatedOrders = p.orders.map((o) => {
                if (o.id === selectedOrder?.id) {
                  return { ...o, ...values, status: "complete" };
                }
                return o;
              });
              if (!selectedOrder) {
                const newOrder = {
                  id: p.orders.length + 1,
                  ...values,
                  status: "pending",
                };
                updatedOrders.push(newOrder);
              }
              return { ...p, orders: updatedOrders };
            }
            return p;
          });
          setPatients(updatedPatients);
          setShowOrderModal(false);
          setSelectedPatient(null);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

const validationSchema = Yup.object().shape({
  test: Yup.string().required('Test name is required'),
  dateOrdered: Yup.date().required('Date ordered is required'),
  orderingDoctor: Yup.string().required('Ordering doctor is required'),
  priority: Yup.string().required('Priority is required'),
  specimenType: Yup.string().required('Specimen type is required'),
  resultValue: Yup.number().when('order', {
    is: (order) => !!order,
    then: Yup.number().required('Result value is required'),
  }),
  referenceRange: Yup.string().when('order', {
    is: (order) => !!order,
    then: Yup.string().required('Reference range is required'),
  }),
  abnormalFlag: Yup.bool().when('order', {
    is: (order) => !!order,
    then: Yup.bool().required('Abnormal flag is required'),
  }),
  notes: Yup.string().when('order', {
    is: (order) => !!order,
    then: Yup.string(),
  }),
});

const OrderModal = ({ show, onHide, patient, order, handleSubmit }) => {
  const initialValues = order
    ? {
        test: order.test,
        dateOrdered: order.dateOrdered,
        orderingDoctor: order.orderingDoctor,
        priority: order.priority,
        specimenType: order.specimenType,
        resultValue: order.resultValue || '',
        referenceRange: order.referenceRange || '',
        abnormalFlag: order.abnormalFlag || false,
        notes: order.notes || '',
      }
    : {
        test: '',
        dateOrdered: format(new Date(), 'yyyy-MM-dd'),
        orderingDoctor: '',
        priority: 'routine',
        specimenType: '',
        resultValue: '',
        referenceRange: '',
        abnormalFlag: false,
        notes: '',
      };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{order ? 'Update Test Order' : 'Add New Test Order'}</Modal.Title>
      </Modal.Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <p>
                Patient: {patient?.name} <br />
                Patient ID: {patient?.id}
              </p>
              <Form.Group>
                <Form.Label>Test</Form.Label>
                <Field as={Form.Control} type="text" name="test" placeholder="Enter test name" />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Date Ordered</Form.Label>
                    <Field as={Form.Control} type="date" name="dateOrdered" placeholder="Enter date ordered" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Ordering Doctor</Form.Label>
                    <Field as={Form.Control} type="text" name="orderingDoctor" placeholder="Enter ordering doctor" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Field as={Form.Select} name="priority">
                      <option value="routine">Routine</option>
                      <option value="urgent">Urgent</option>
                    </Field>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Specimen Type</Form.Label>
                    <Field as={Form.Select} name="specimenType">
                      <option value="">Select specimen type</option>
                      <option value="blood">Blood</option>
                      <option value="urine">Urine</option>
                      <option value="stool">Stool</option>
                      <option value="other">Other</option>
                    </Field>
                  </Form.Group>
                </Col>
              </Row>
              {order && (
                <>
                  <Form.Group>
                    <Form.Label>Result Value</Form.Label>
                    <Field as={Form.Control} type="number" name="resultValue" placeholder="Enter result value" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Reference Range</Form.Label>
                    <Field as={Form.Control} type="text" name="referenceRange" placeholder="Enter reference range" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Abnormal Flag</Form.Label>
                    <Field as={Form.Check} type="checkbox" name="abnormalFlag" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Field as={Form.Control} type="textarea" name="notes" placeholder="Enter notes" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Upload Results</Form.Label>
                    <Button variant="primary" size="lg" block>
                      <FaUpload /> Upload Results
                    </Button>
                  </Form.Group>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <FaSave /> {order ? 'Save Changes' : 'Add Order'}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default PatientManagement;