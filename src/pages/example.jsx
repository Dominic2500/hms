import React from 'react';
import ReusableTable from './ReusableTable'; // assuming your ReusableTable component is in a file named ReusableTable.js
import { Container, Dropdown } from 'react-bootstrap';
const SimplePage = () => {
  // Sample data
  const data = React.useMemo(
    () => [
      {
        id: 1,
        name: 'John Doe',
        age: 30,
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 25,
      },
      // Add more sample data as needed
    ],
    []
  );

  // Columns configuration
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
    ],
    []
  );

  // Action dropdown component
  const ActionDropdown = ({ row }) => (
    <div>
      {/* create a dropdown with three options each with a function */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={() => handleAction1(row)}>
            Action 1
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={() => handleAction2(row)}>
            Action 2
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={() => handleAction3(row)}>
            Action 3
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  // Define the action functions
  const handleAction1 = (row) => {
    // Code for handling Action 1
    console.log('Action 1 clicked for row:', row);
  };

  const handleAction2 = (row) => {
    // Code for handling Action 2
    console.log('Action 2 clicked for row:', row);
  };

  const handleAction3 = (row) => {
    // Code for handling Action 3
    console.log('Action 3 clicked for row:', row);
  };

  // Initial state
  const initialState = {
    pageIndex: 0,
    pageSize: 5,
    sortBy: [],
  };

  return (
    <Container>
    <ReusableTable
      columns={columns}
      data={data}
      initialState={initialState}
      ActionDropdown={ActionDropdown}
    />
    </Container>
  );
};

export default SimplePage;
