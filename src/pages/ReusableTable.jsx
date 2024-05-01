import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

const ReusableTable = ({
  columns,
  data,
  initialState,
  ActionDropdown,
}) => {
  const columnsWithActions = useMemo(
    () => [
      ...columns,
      {
        Header: 'Actions',
        accessor: 'actions', // Make sure this accessor matches the one used in ActionDropdown
        Cell: ({ row }) => <ActionDropdown row={row} />,
      },
    ],
    [columns, ActionDropdown]
  );

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
  } = useTable(
    {
      columns: columnsWithActions,
      data,
      initialState,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
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
            <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <FontAwesomeIcon icon={faStepBackward} />
            </Pagination.First>
            <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Pagination.Prev>
            <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
            <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Pagination.Next>
            <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              <FontAwesomeIcon icon={faStepForward} />
            </Pagination.Last>
          </Pagination>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
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
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
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
  );
};

const TableContainer = styled.div`
  margin-top: 2rem;
  height: 500px;
  position: relative;
  overflow: auto;
  padding-bottom: 3rem;
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
    color: black; /* Make text black */
  }

  select {
    margin-left: 0.5rem;
  }
`;

export default ReusableTable;
