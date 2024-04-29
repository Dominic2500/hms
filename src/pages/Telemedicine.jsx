import React, { useMemo, useState } from 'react';
import { Container, DropdownButton, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import ReusableTable from './ReusableTable'; // Import the ReusableTable component
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'; // Import any necessary icons

const Telemedicine = () => {
  const [data, setData] = useState([
    { patientName: 'John Doe', specialist: 'Dr. Smith', startTime: '10:00 AM', duration: '30 min', date: '2024-04-10', status: 'Scheduled' },
    { patientName: 'Jane Smith', specialist: 'Dr. Johnson', startTime: '11:00 AM', duration: '45 min', date: '2024-04-11', status: 'Pending Approval' },
    { patientName: 'Bob Johnson', specialist: 'Dr. Lee', startTime: '02:00 PM', duration: '20 min', date: '2024-04-12', status: 'Completed' },
    // Add more dummy data as needed
  ]);

  const COLUMNS = [
    {
      Header: 'Patient Name',
      accessor: 'patientName',
    },
    {
      Header: 'Specialist',
      accessor: 'specialist',
    },
    {
      Header: 'Start Time',
      accessor: 'startTime',
    },
    {
      Header: 'Duration',
      accessor: 'duration',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  return (
    <Container className="telemedicine-container">
      <ReusableTable
        columns={columns}
        data={data}
        initialState={{ pageIndex: 0, pageSize: 10 }}
        ActionDropdown={({ row }) => (
          <ActionCell>
            <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
              <Dropdown.Item href="#/action-1" onClick={() => openSession(row)}>
                Start Session
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Reschedule Session
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Rebook Session</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Cancel Session</Dropdown.Item>
            </DropdownButton>
          </ActionCell>
        )}
      />
    </Container>
  );
};

const ActionCell = styled.div`
  display: flex;
  justify-content: center;
`;

const openSession = (row) => {
  // Function to open a session based on the row data
  console.log('Opening session for:', row.original.patientName);
  // Implement your logic here
};

export default Telemedicine;
