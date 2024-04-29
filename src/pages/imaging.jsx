import React, { useMemo, useState } from "react";
import {
  Container,
  DropdownButton,
  Dropdown,
  Modal,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import styled from "styled-components";
import { FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaExclamationCircle,
  FaBrain,
} from "react-icons/fa";
import ReusableTable from "./ReusableTable"; // Import the ReusableTable component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const ImagingDashboard = () => {
  const [data, setData] = useState([
    {
      patientName: "John Doe",
      patientId: "123456",
      age: 35,
      sex: "Male",
      examType: "X-ray",
      orderStatus: "ordered",
      priority: "routine",
      orderingPhysician: "Dr. Smith",
    },
    {
      patientName: "Jane Smith",
      patientId: "789012",
      age: 42,
      sex: "Female",
      examType: "CT",
      orderStatus: "scheduled",
      priority: "urgent",
      orderingPhysician: "Dr. Johnson",
    },
    // Add more dummy data as needed
  ]);

  const COLUMNS = [
    {
      Header: "Patient Name",
      accessor: "patientName",
    },
    {
      Header: "Patient ID",
      accessor: "patientId",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Sex",
      accessor: "sex",
    },
    {
      Header: "Exam Type",
      accessor: "examType",
    },
    {
      Header: "Order Status",
      accessor: "orderStatus",
      Cell: ({ value }) => (
        <Badge
          bg={
            value === "ordered"
              ? "warning"
              : value === "scheduled"
              ? "info"
              : value === "in progress"
              ? "primary"
              : value === "results pending"
              ? "secondary"
              : "success"
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      Header: "Priority",
      accessor: "priority",
      Cell: ({ value }) => (
        <Badge bg={value === "urgent" ? "danger" : "success"}>{value}</Badge>
      ),
    },
    {
      Header: "Ordering Physician",
      accessor: "orderingPhysician",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const handleEdit = (row) => {
    // Handle edit action, open modal for editing results
    console.log("Editing results for:", row.original.patientName);
    setShowModal(true);
    // Implement your logic here
  };

  const handleDelete = (row) => {
    // Handle delete action
    console.log("Deleting:", row.original.patientName);
    // Implement your logic here
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="imaging-dashboard-container">
      <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <ActionCell>
            <DropdownButton dropup id={`dropdown-${row.id}`} title="Actions">
              <Dropdown.Item onClick={() => handleEdit(row)}>
                Edit Results
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDelete(row)}>
                Delete
              </Dropdown.Item>
            </DropdownButton>
          </ActionCell>
        )}
      />
      <UploadModal show={showModal} handleClose={handleCloseModal} />
      <ToastContainer />
    </Container>
  );
};

const ActionCell = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadModal = ({ show, handleClose }) => {
  const [imagingData, setImagingData] = useState({
    patientName: "",
    imagingType: "",
    bodyPart: "",
    date: "",
    time: "",
    orderingPhysician: "",
    reasonForImaging: "",
    imagingFindings: "",
    radiologistInterpretation: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImagingData({ ...imagingData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const schema = Yup.object().shape({
        patientName: Yup.string().required("Patient Name is required"),
        imagingType: Yup.string().required("Imaging Type is required"),
        bodyPart: Yup.string().required("Body Part is required"),
        date: Yup.date().required("Date is required"),
        time: Yup.string().required("Time is required"),
        orderingPhysician: Yup.string().required(
          "Ordering Physician is required"
        ),
        reasonForImaging: Yup.string().required(
          "Reason for Imaging is required"
        ),
        imagingFindings: Yup.string().required("Imaging Findings is required"),
        radiologistInterpretation: Yup.string().required(
          "Radiologist Interpretation is required"
        ),
        notes: Yup.string().required("Notes is required"),
      });

      await schema.validate(imagingData, { abortEarly: false });

      // Code to save data to Firestore goes here

      // Show success toast
      toast.success("Imaging data saved successfully");

      handleClose();
    } catch (error) {
      // Show error toast
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Imaging Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              <FaUserMd style={{ marginRight: "0.5rem", color: "blue" }} /> Patient Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter patient name"
              name="patientName"
              value={imagingData.patientName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaBrain style={{ marginRight: "0.5rem", color: "blue" }} /> Imaging Type
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter imaging type"
              name="imagingType"
              value={imagingData.imagingType}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaStethoscope style={{ marginRight: "0.5rem", color: "blue" }} /> Body Part
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter body part"
              name="bodyPart"
              value={imagingData.bodyPart}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaCalendarAlt style={{ marginRight: "0.5rem", color: "blue" }} /> Date
            </Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={imagingData.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaClock style={{ marginRight: "0.5rem", color: "blue" }} /> Time
            </Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={imagingData.time}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaUserMd style={{ marginRight: "0.5rem", color: "blue" }} /> Ordering Physician
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ordering physician"
              name="orderingPhysician"
              value={imagingData.orderingPhysician}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaExclamationCircle style={{ marginRight: "0.5rem", color: "blue" }} /> Reason for Imaging
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter reason for imaging"
              name="reasonForImaging"
              value={imagingData.reasonForImaging}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaExclamationCircle style={{ marginRight: "0.5rem", color: "blue" }} /> Imaging Findings
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter imaging findings"
              name="imagingFindings"
              value={imagingData.imagingFindings}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaExclamationCircle /> Radiologist Interpretation
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter radiologist interpretation"
              name="radiologistInterpretation"
              value={imagingData.radiologistInterpretation}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <FaExclamationCircle /> Notes
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter notes"
              name="notes"
              value={imagingData.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImagingDashboard;
