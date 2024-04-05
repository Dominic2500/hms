import React, { useState } from "react";
import { Container, ListGroup, Button, Form, Modal } from "react-bootstrap";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const NursingNotes = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    const now = new Date();
    const author = "Nurse Jane";
    const note = {
      id: notes.length + 1,
      content: newNote,
      dateTime: now.toLocaleString(),
      author,
    };
    setNotes([note, ...notes]);
    setNewNote("");
    setShowModal(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container fluid >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <AddCircleOutlineIcon fontSize="small" />
          Add Note
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", padding: "0px", width: "100%" }}>
  {/* <div style={{ flexGrow: 1 }}>
    <Timeline>
      {notes.map((note) => (
        <TimelineItem key={note.id}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
        </TimelineItem>
      ))}
    </Timeline>
  </div> */}
  <div style={{ flex: "100%" }}>
    <ListGroup>
      {notes.map((note) => (
        <ListGroup.Item key={note.id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "10px" }}>
              <small style={{ fontWeight: "bold" }}>
                {note.dateTime}
              </small>
              <br />
              <small style={{ fontStyle: "italic" }}>
                By: {note.author}
              </small>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ marginBottom: "0" }}>{note.content}</p>
            </div>
            <div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteNote(note.id)}
                style={{ marginRight: "5px" }}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </Button>
              <Button variant="warning" size="sm">
                <EditOutlinedIcon fontSize="small" />
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
</div>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={3}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddNote}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NursingNotes;
