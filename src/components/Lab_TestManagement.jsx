import React, { useState, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import {
  Button,
  Form,
  Modal,
  Table,
  Pagination,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import { FaSearch, FaPlus, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import styled from "styled-components";

const TestManagement = () => {
  const [tests, setTests] = useState([
    {
      id: 1,
      name: "CBC",
      price: 50,
      description: "Complete Blood Count",
      testType: "Hematology",
      specimenType: "blood",
    },
    {
      id: 2,
      name: "Lipid Panel",
      price: 75,
      description: "Cholesterol and Triglycerides",
      testType: "Chemistry",
      specimenType: "blood",
    },
    {
      id: 3,
      name: "Glucose",
      price: 30,
      description: "Blood Sugar",
      testType: "Chemistry",
      specimenType: "blood",
    },
    {
      id: 4,
      name: "TSH",
      price: 40,
      description: "Thyroid Stimulating Hormone",
      testType: "Endocrinology",
      specimenType: "blood",
    },
  ]);

  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const TEST_COLUMNS = [
    {
      Header: "Test Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Test Type",
      accessor: "testType",
    },
    {
      Header: "Specimen Type",
      accessor: "specimenType",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <Button
          variant="link"
          size="sm"
          onClick={() => {
            setSelectedTest(row.original);
            setShowTestModal(true);
          }}
        >
          <FaEdit />
        </Button>
      ),
    },
  ];

  const testColumns = useMemo(() => TEST_COLUMNS, []);

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
      columns: testColumns,
      data: tests,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div>
      <TableContainer>
        <HeaderContainer>
          <InputGroup style={{ width: "50%" }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search tests..."
              aria-label="Search"
            />
          </InputGroup>
          <Button variant="primary" onClick={() => setShowTestModal(true)}>
            <FaPlus /> Add Test
          </Button>
        </HeaderContainer>
        <Table {...getTableProps()} striped bordered hover responsive>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
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
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <PaginationContainer>
          <Pagination>
            <Pagination.First
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <Pagination.Prev
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
            <Pagination.Next
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            <Pagination.Last
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />
          </Pagination>
          <span>
            Page{" "}
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
      </TableContainer>

      <TestModal
        show={showTestModal}
        onHide={() => {
          setShowTestModal(false);
          setSelectedTest(null);
        }}
        test={selectedTest}
        handleSubmit={(values) => {
          const updatedTests = tests.map((t) => {
            if (t.id === selectedTest?.id) {
              return values;
            }
            return t;
          });
          if (!selectedTest) {
            const newTest = { id: tests.length + 1, ...values };
            updatedTests.push(newTest);
          }
          setTests(updatedTests);
          setShowTestModal(false);
          setSelectedTest(null);
        }}
      />
    </div>
  );
};

const TableContainer = styled.div`
  margin-top: 2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  select {
    margin-left: 0.5rem;
  }
`;

const TestModal = ({ show, onHide, test, handleSubmit }) => {
  const initialValues = test
    ? {
        name: test.name,
        price: test.price,
        description: test.description,
        testType: test.testType,
        specimenType: test.specimenType,
      }
    : {
        name: "",
        price: "",
        description: "",
        testType: "",
        specimenType: "",
      };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header style={{ backgroundColor: "#f8d7da", position: "relative" }}>
        <Modal.Title style={{ textAlign: "center", flex: 1 }}>
          {test ? "Edit Test" : "Add New Test"}
        </Modal.Title>
        <CloseButton variant="danger" onClick={onHide}>
          <FaTimes />
        </CloseButton>
      </Modal.Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Test Name</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="name"
                  placeholder="Enter test name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Field
                  as={Form.Control}
                  type="number"
                  name="price"
                  placeholder="Enter test price"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="description"
                  placeholder="Enter test description"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Test Type</Form.Label>
                <Field as={Form.Select} name="testType">
                  <option value="">Select test type</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Microbiology">Microbiology</option>
                </Field>
              </Form.Group>
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <FaSave /> {test ? "Save Changes" : "Add Test"}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TestManagement;