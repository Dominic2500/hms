// EmployeeManagement.js
import React, { useState } from 'react';
import ReusableTable from './ReusableTable';
import { Button, Dropdown, Tabs, Tab, Modal, Form, Badge } from 'react-bootstrap';
import * as XLSX from 'xlsx';

// Mock data for employees
const employees = [
  {
    id: 1,
    name: 'John Doe',
    clockInData: [
      { date: '2023-04-25', clockIn: '08:00', clockOut: '17:00' },
      { date: '2023-04-26', clockIn: '08:30', clockOut: '16:30' },
    ],
    wage: 5000,
    department: 'Surgery',
    dateJoined: '2020-01-01',
    position: 'Doctor',
    documentsAttached: ['resume.pdf', 'contract.docx'],
    daysOffRemaining: 10,
    daysOffRequested: [
      { date: '2023-05-01', reason: 'Personal' },
    ],
    daysAbsent: 2,
    leaveRequests: [
      { from: '2023-06-01', to: '2023-06-15', reason: 'Vacation' },
    ],
    disciplinaryActions: [
      { date: '2022-08-15', description: 'Verbal warning for tardiness' },
    ],
    itemsAllocated: [
      { item: 'Laptop', serialNumber: 'ABC123' },
      { item: 'Mobile Phone', serialNumber: 'DEF456' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    clockInData: [
      { date: '2023-04-25', clockIn: '09:00', clockOut: '18:00' },
      { date: '2023-04-26', clockIn: '09:15', clockOut: '17:45' },
    ],
    wage: 4500,
    department: 'Radiology',
    dateJoined: '2021-03-15',
    position: 'Nurse',
    documentsAttached: ['resume.pdf'],
    daysOffRemaining: 15,
    daysOffRequested: [
      { date: '2023-05-01', reason: 'Personal' },
      { date: '2023-05-02', reason: 'Personal' },
    ],
    daysAbsent: 0,
    leaveRequests: [],
    disciplinaryActions: [],
    itemsAllocated: [
      { item: 'Mobile Phone', serialNumber: 'GHI789' },
    ],
  },
  // Add more employee data as needed
];

const EmployeeManagement = () => {
  const [initialState, setInitialState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [showImportModal, setShowImportModal] = useState(false);
  const [importedData, setImportedData] = useState([]);

  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    wage: 0,
    department: '',
    position: '',
  });

  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [employeeToTerminate, setEmployeeToTerminate] = useState(null);

  const [showLeaveRequestModal, setShowLeaveRequestModal] = useState(false);
  const [employeeForLeave, setEmployeeForLeave] = useState(null);
  const [leaveRequest, setLeaveRequest] = useState({
    from: '',
    to: '',
    reason: '',
  });

  // Define the columns for the employee table
  const employeeColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    {
      Header: 'Clock In/Out',
      accessor: 'clockInData',
      Cell: ({ value }) => (
        <div>
          {value.map((data, index) => (
            <div key={index}>
              {data.date}: {data.clockIn} - {data.clockOut}
            </div>
          ))}
        </div>
      ),
    },
    { Header: 'Wage', accessor: 'wage' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Position', accessor: 'position' },
    { Header: 'Date Joined', accessor: 'dateJoined' },
    {
      Header: 'Documents',
      accessor: 'documentsAttached',
      Cell: ({ value }) => value.join(', '),
    },
    {
      Header: 'Days Off Remaining',
      accessor: 'daysOffRemaining',
      Cell: ({ value }) => (
        <Badge variant={value < 5 ? 'danger' : 'success'}>{value}</Badge>
      ),
    },
    {
      Header: 'Days Off Requested',
      accessor: 'daysOffRequested',
      Cell: ({ value }) => (
        <div>
          {value.map((request, index) => (
            <div key={index}>
              {request.date}: {request.reason}
            </div>
          ))}
        </div>
      ),
    },
    {
      Header: 'Days Absent',
      accessor: 'daysAbsent',
      Cell: ({ value }) => (
        <Badge variant={value > 5 ? 'danger' : 'success'}>{value}</Badge>
      ),
    },
    {
      Header: 'Leave Requests',
      accessor: 'leaveRequests',
      Cell: ({ value, row }) => (
        <div>
          {value.map((request, index) => (
            <div key={index}>
              {request.from} - {request.to}: {request.reason}
            </div>
          ))}
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleLeaveRequestModalOpen(row.original)}
          >
            Request Leave
          </Button>
        </div>
      ),
    },
    {
      Header: 'Disciplinary Actions',
      accessor: 'disciplinaryActions',
      Cell: ({ value }) => (
        <div>
          {value.map((action, index) => (
            <div key={index}>
              {action.date}: {action.description}
            </div>
          ))}
        </div>
      ),
    },
    {
      Header: 'Items Allocated',
      accessor: 'itemsAllocated',
      Cell: ({ value }) => (
        <div>
          {value.map((item, index) => (
            <div key={index}>
              {item.item}: {item.serialNumber}
            </div>
          ))}
        </div>
      ),
    },
  ];

  // Define the action dropdown component for employee rows
  const EmployeeActionDropdown = ({ row, handleTerminateModalOpen }) => {
    const employee = row.original;

    const handleTerminate = () => {
      setEmployeeToTerminate(employee);
      handleTerminateModalOpen();
    };

    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id={`employee-action-${employee.id}`}>
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleTerminate}>Terminate</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleImportModalOpen = () => setShowImportModal(true);
  const handleImportModalClose = () => setShowImportModal(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Validate column headers
      const expectedHeaders = ['Name', 'Clock In', 'Clock Out', 'Date'];
      const actualHeaders = jsonData[0];
      if (
        expectedHeaders.length !== actualHeaders.length ||
        !expectedHeaders.every((header, index) => header === actualHeaders[index])
      ) {
        alert('Invalid column headers. Please ensure the headers match: Name, Clock In, Clock Out, Date');
        return;
      }

      setImportedData(jsonData.slice(1)); // Exclude the header row
    };

    reader.readAsArrayBuffer(file);
  };

  const handleImport = () => {
    // Implement logic to import the clock-in/clock-out data
    console.log('Imported data:', importedData);
    handleImportModalClose();
  };

  const handleAddEmployeeModalOpen = () => setShowAddEmployeeModal(true);
  const handleAddEmployeeModalClose = () => {
    setShowAddEmployeeModal(false);
    setNewEmployee({
      name: '',
      wage: 0,
      department: '',
      position: '',
    });
  };

  const handleNewEmployeeInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleAddEmployee = () => {
    // Implement logic to add a new employee
    console.log('New employee:', newEmployee);
    handleAddEmployeeModalClose();
  };

  const handleTerminateModalOpen = (employee) => {
    setEmployeeToTerminate(employee);
    setShowTerminateModal(true);
  };

  const handleTerminateModalClose = () => {
    setShowTerminateModal(false);
    setEmployeeToTerminate(null);
  };

  const handleTerminate = () => {
    // Implement logic to terminate the employee
    console.log(`Terminating employee: ${employeeToTerminate.name}`);
    handleTerminateModalClose();
  };

  const handleLeaveRequestModalOpen = (employee) => {
    setEmployeeForLeave(employee);
    setShowLeaveRequestModal(true);
  };

  const handleLeaveRequestModalClose = () => {
    setShowLeaveRequestModal(false);
    setEmployeeForLeave(null);
    setLeaveRequest({
      from: '',
      to: '',
      reason: '',
    });
  };

  const handleLeaveRequestInputChange = (event) => {
    const { name, value } = event.target;
    setLeaveRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  const handleSubmitLeaveRequest = () => {
    // Implement logic to submit the leave request
    console.log('Leave request:', leaveRequest);
    handleLeaveRequestModalClose();
  };

  return (
    <div>
      <h2>Employee Management</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button variant="primary" onClick={handleImportModalOpen}>
          Import Clock In/Out Data
        </Button>
        <Button variant="success" onClick={handleAddEmployeeModalOpen} style={{ marginLeft: '0.5rem' }}>
          Add New Employee
        </Button>
      </div>

      <ReusableTable
        columns={employeeColumns}
        data={employees}
        initialState={initialState}
        ActionDropdown={EmployeeActionDropdown}
      />

      {/* Import Clock In/Out Modal */}
      <Modal show={showImportModal} onHide={handleImportModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Import Clock In/Out Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>Select Excel file</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} accept=".xlsx,.xls" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleImportModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleImport}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add New Employee Modal */}
      <Modal show={showAddEmployeeModal} onHide={handleAddEmployeeModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleNewEmployeeInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formWage">
              <Form.Label>Wage</Form.Label>
              <Form.Control
                type="number"
                name="wage"
                value={newEmployee.wage}
                onChange={handleNewEmployeeInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={newEmployee.department}
                onChange={handleNewEmployeeInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={newEmployee.position}
                onChange={handleNewEmployeeInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddEmployeeModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Terminate Employee Modal */}
      <Modal show={showTerminateModal} onHide={handleTerminateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Terminate Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to terminate {employeeToTerminate?.name}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTerminateModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleTerminate}>
            Terminate
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Leave Request Modal */}
      <Modal show={showLeaveRequestModal} onHide={handleLeaveRequestModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFrom">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                name="from"
                value={leaveRequest.from}
                onChange={handleLeaveRequestInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTo">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="date"
                name="to"
                value={leaveRequest.to}
                onChange={handleLeaveRequestInputChange}
              />
            </Form.Group>
           <Form.Group controlId="formReason">
             <Form.Label>Reason</Form.Label>
             <Form.Control
               type="text"
               name="reason"
               value={leaveRequest.reason}
               onChange={handleLeaveRequestInputChange}
             />
           </Form.Group>
         </Form>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleLeaveRequestModalClose}>
           Cancel
         </Button>
         <Button variant="primary" onClick={handleSubmitLeaveRequest}>
           Submit Request
         </Button>
       </Modal.Footer>
     </Modal>
   </div>
 );
};

export default EmployeeManagement;