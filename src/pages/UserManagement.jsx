import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    permissions: [],
    isHead: false,
  });
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Fetch users, roles, and permissions from the server or database
    const fetchedUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Cardiology', role: 'Doctor', permissions: ['viewPatientRecords', 'createPrescriptions'] },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Nursing', role: 'Nurse', permissions: ['updatePatientVitals', 'scheduleAppointments'] },
      // Add more dummy user data as needed
    ];
    setUsers(fetchedUsers);

    const fetchedRoles = ['Doctor', 'Nurse', 'Admin', 'Receptionist'];
    setRoles(fetchedRoles);

    const fetchedPermissions = [
      { id: 'viewPatientRecords', name: 'View Patient Records' },
      { id: 'createPrescriptions', name: 'Create Prescriptions' },
      { id: 'updatePatientVitals', name: 'Update Patient Vitals' },
      { id: 'scheduleAppointments', name: 'Schedule Appointments' },
      // Add more permissions as needed
    ];
    setPermissions(fetchedPermissions);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (user = null) => {
    setSelectedUser(user);
    setNewUser(user || { name: '', email: '', department: '', role: '', permissions: [], isHead: false });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveUser = (user) => {
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id ? user : u
      );
      setUsers(updatedUsers);
    } else {
      // Create new user
      const newUserId = users.length + 1;
      const newUserData = { ...user, id: newUserId };
      setUsers([...users, newUserData]);
    }
    handleCloseModal();
  };

  const handlePermissionChange = (permissionId) => {
    const updatedPermissions = newUser.permissions.includes(permissionId)
      ? newUser.permissions.filter((p) => p !== permissionId)
      : [...newUser.permissions, permissionId];
    setNewUser({ ...newUser, permissions: updatedPermissions });
  };

  return (
    <div>
      <h2>User Management</h2>
      <Form.Control
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>{user.role}</td>
              <td>
                {user.permissions.map((permissionId) => (
                  <span key={permissionId}>{permissions.find((p) => p.id === permissionId).name}, </span>
                ))}
              </td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(user)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={() => handleShowModal()}>
        Add User
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Permissions</Form.Label>
              {permissions.map((permission) => (
                <Form.Check
                  key={permission.id}
                  type="checkbox"
                  id={`permission-${permission.id}`}
                  label={permission.name}
                  checked={newUser.permissions.includes(permission.id)}
                  onChange={() => handlePermissionChange(permission.id)}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser(newUser)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
