import React, { useState } from "react";
import {
  Button,
  Card,
  ListGroup,
  Alert,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import {
  FaCalendarAlt,
  FaRegClipboard,
  FaClock,
  FaPlus,
  FaSave,
  FaTrash,
  FaEdit,
  FaEllipsisV,
} from "react-icons/fa";
import { format, addDays, subDays, isSameDay } from "date-fns";
import styled from "styled-components";

const TasksAndReminders = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review John Doe's CBC results",
      dueDate: new Date(),
      reminder: {
        time: "09:00",
        description: "Check for abnormal values",
      },
      priority: "high",
      done: false,
    },
    {
      id: 2,
      title: "Order new test kits for Lipid Panel",
      dueDate: addDays(new Date(), 2),
      reminder: null,
      priority: "medium",
      done: false,
    },
    {
      id: 3,
      title: "Schedule QC check for glucose analyzer",
      dueDate: addDays(new Date(), 3),
      reminder: {
        time: "14:00",
        description: "Perform daily QC check",
      },
      priority: "low",
      done: false,
    },
  ]);
  const [notes, setNotes] = useState([
    {
      id: 1,
      date: new Date(),
      content:
        "Remember to update the test catalog with the new pricing effective July 1st.",
    },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleEditTask = (taskId, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
  };

  const handleToggleTaskDone = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div>
      <Card>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
            <h4 style={{ margin: 0 }}>
              {format(currentDate, "EEEE, MMMM d, yyyy")}
            </h4>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="date-dropdown">
              Change Date
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => setCurrentDate(subDays(currentDate, 1))}
              >
                Previous Day
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setCurrentDate(addDays(currentDate, 1))}
              >
                Next Day
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                style={{ textDecoration: task.done ? "line-through" : "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h5>
                      {task.title}
                      {task.reminder && (
                        <span style={{ marginLeft: "1rem" }}>
                          <FaClock style={{ marginRight: "0.25rem" }} />
                          {task.reminder.time}
                          <span
                            style={{
                              marginLeft: "0.5rem",
                              fontWeight: "bold",
                              color:
                                task.priority === "high"
                                  ? "red"
                                  : task.priority === "medium"
                                  ? "orange"
                                  : "green",
                            }}
                          >
                            {task.priority.toUpperCase()}
                          </span>
                        </span>
                      )}
                    </h5>
                    {task.reminder && (
                      <p style={{ margin: 0 }}>{task.reminder.description}</p>
                    )}
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-primary"
                      id={`task-dropdown-${task.id}`}
                    >
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleDeleteTask(task.id)}>
                        <FaTrash /> Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleToggleTaskDone(task.id)}
                      >
                        {task.done ? "Undo" : "Done"}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setShowTaskModal(true)}>
                        <FaEdit /> Edit
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <TaskModal
            show={showTaskModal}
            onHide={() => setShowTaskModal(false)}
            onSubmit={(values) => {
              const newTask = {
                id: tasks.length + 1,
                title: values.title,
                dueDate: values.dueDate,
                reminder: values.reminder,
                priority: values.priority,
                done: false,
              };
              setTasks([...tasks, newTask]);
              setShowTaskModal(false);
            }}
          />
          <Button
            variant="primary"
            onClick={() => setShowTaskModal(true)}
            style={{ marginBottom: "1rem" }}
          >
            <FaPlus /> Add Task
          </Button>
        </Card.Body>
      </Card>

      <Card style={{ marginTop: "1rem" }}>
        <Card.Header>
          <h4>
            <FaRegClipboard style={{ marginRight: "0.5rem" }} />
            Notes
          </h4>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {notes.map((note) => (
              <ListGroup.Item key={note.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ marginBottom: 0, fontWeight: "bold" }}>
                      {format(note.date, "MMMM d, yyyy")}
                    </p>
                    <p style={{ marginBottom: 0 }}>{note.content}</p>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-primary"
                      id={`note-dropdown-${note.id}`}
                    >
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleDeleteNote(note.id)}>
                        <FaTrash />
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setShowNoteModal(true)}>
                        <FaEdit /> Edit
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <NoteModal
            show={showNoteModal}
            onHide={() => setShowNoteModal(false)}
            onSubmit={(values) => {
              const newNote = {
                id: notes.length + 1,
                date: new Date(),
                content: values.content,
              };
              setNotes([...notes, newNote]);
              setShowNoteModal(false);
            }}
          />
          <Button
            variant="primary"
            onClick={() => setShowNoteModal(true)}
            style={{ marginBottom: "1rem" }}
          >
            <FaPlus /> Add Note
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

const TaskModal = ({ show, onHide, onSubmit }) => {
  const initialValues = {
    title: "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    reminder: { time: "", description: "" },
    priority: "low",
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Field
                  as={Form.Control}
                  type="date"
                  name="dueDate"
                  placeholder="Enter due date"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reminder</Form.Label>
                <Field
                  as={Form.Control}
                  type="time"
                  name="reminder.time"
                  placeholder="Enter reminder time"
                />
                <Field
                  as={Form.Control}
                  type="text"
                  name="reminder.description"
                  placeholder="Enter reminder description"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Field as="select" name="priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Field>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <FaSave /> Add Task
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

const NoteModal = ({ show, onHide, onSubmit }) => {
  const initialValues = {
    content: "",
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Note</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="content"
                  placeholder="Enter note content"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <FaSave /> Add Note
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default TasksAndReminders;
