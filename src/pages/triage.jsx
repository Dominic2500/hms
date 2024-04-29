import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { Container, Table, InputGroup, FormControl, Pagination, Button ,Dropdown} from 'react-bootstrap';
import { AccountCircle, Assignment, Settings, ExitToApp, Notifications } from '@mui/icons-material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TriageAssessment = () => {
  const [data, setData] = useState([
    { name: 'John Doe', phoneNumber: '555-1234', address: '123 Main St', age: 35, sex: 'Male', primaryInsurance: 'ABC Insurance' },
    // { name: 'Jane Smith', phoneNumber: '555-5678', address: '456 Oak Rd', age: 42, sex: 'Female', primaryInsurance: 'XYZ Insurance' },
    // { name: 'Bob Johnson', phoneNumber: '555-9012', address: '789 Elm St', age: 28, sex: 'Male', primaryInsurance: 'DEF Insurance' },
    // { name: 'Samantha Lee', phoneNumber: '555-3456', address: '246 Pine Ave', age: 51, sex: 'Female', primaryInsurance: 'GHI Insurance' },
    // { name: 'Michael Brown', phoneNumber: '555-7890', address: '159 Maple Ln', age: 39, sex: 'Male', primaryInsurance: 'JKL Insurance' },
    // { name: 'John Doe', phoneNumber: '555-1234', address: '123 Main St', age: 35, sex: 'Male', primaryInsurance: 'ABC Insurance' },
    // { name: 'Jane Smith', phoneNumber: '555-5678', address: '456 Oak Rd', age: 42, sex: 'Female', primaryInsurance: 'XYZ Insurance' },
    // { name: 'Bob Johnson', phoneNumber: '555-9012', address: '789 Elm St', age: 28, sex: 'Male', primaryInsurance: 'DEF Insurance' },
    // { name: 'Samantha Lee', phoneNumber: '555-3456', address: '246 Pine Ave', age: 51, sex: 'Female', primaryInsurance: 'GHI Insurance' },
    // { name: 'Michael Brown', phoneNumber: '555-7890', address: '159 Maple Ln', age: 39, sex: 'Male', primaryInsurance: 'JKL Insurance' },
    // // Add more dummy data as needed
  ]);

  const COLUMNS = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Sex',
      accessor: 'sex',
    },
    {
      Header: 'Primary Insurance',
      accessor: 'primaryInsurance',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <ActionCell>
          {/* <Link to={`/patient/${row.original.name.replace(/\s/g, '-')}`}>
            <Button variant="primary" size="sm">
              View
            </Button>
          </Link> */}
           <Dropdown >
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              as={CustomToggle}
            >
               <Button variant="primary" size="sm">
              Actions
            </Button>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{marginTop: '6px' }}
            >
              <Dropdown.Item href="#">
                <Assignment /> Reports
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <Settings /> Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item style={{ color: 'red' }} href="#">
                <ExitToApp /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ActionCell>
      ),
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <Container className="triage-assessment-container">
      <TableContainer>
        <HeaderContainer>
          <InputGroup style={{ maxWidth: '300px' }}>
            <FormControl
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
          </InputGroup>
          <PaginationContainer>
          <Pagination>
            <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
            <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
            <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
            <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
            <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
          </Pagination>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </PaginationContainer>
        </HeaderContainer>
        <Table {...getTableProps()} striped bordered hover responsive style={{overflow:'visible',position:'absolute'}}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
       
      </TableContainer>
    </Container>
  );
};

const TableContainer = styled.div`
  margin-top: 2rem;
  height: 500px; /* Set a fixed height */
  position: relative; /* Position the container relatively */
  overflow: auto; /* Add scrollbars if the table content exceeds the height */
  padding-bottom: 3rem; /* Add bottom padding for the pagination */
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;

  .pagination {
    margin: 0;
  }

  span {
    margin: 0 1rem;
  }

  select {
    margin-left: 0.5rem;
  }
`;

const ActionCell = styled.div`
  display: flex;
  justify-content: center;
`;
// CustomToggle component to match the styling of AccountCircle
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export default TriageAssessment;