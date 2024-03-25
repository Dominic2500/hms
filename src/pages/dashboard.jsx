import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Badge, Nav } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './dashboard.css';

// Sample data for upcoming meetings
const meetings = [
  { id: 1, title: 'Meeting with Bob', date: '2024-03-24T10:00:00', location: 'Conference Room A' },
  { id: 2, title: 'Team Sync', date: '2024-03-25T14:30:00', location: 'Virtual' },
  // ... Add more meeting data as needed
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <>
            <h3>Upcoming meetings</h3>
            <ListGroup variant="flush">
              {meetings.map((meeting) => (
                <ListGroup.Item key={meeting.id} className="meeting-item d-flex align-items-center">
                  {/* Replace with actual user avatar URLs */}
                  <img src="path-to-avatar.jpg" alt="User Avatar" className="avatar me-3" />
                  <div className="meeting-details">
                    <strong>{meeting.title}</strong>
                    <p>
                      {new Date(meeting.date).toLocaleString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                      @ {meeting.location}
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        );
      case 'work-schedule':
        return <div>Work schedule content goes here</div>;
      case 'announcements':
        return <div>Announcements content goes here</div>;
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)} className="dashboard-tabs">
            <Nav.Item>
              <Nav.Link eventKey="appointments">
                <i className="bi bi-calendar-check me-2"></i>
                Appointments
                <Badge bg="primary" className="ms-2">
                  5
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="work-schedule">
                <i className="bi bi-calendar-week me-2"></i>
                Work Schedule
                <Badge bg="secondary" className="ms-2">
                  2
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="announcements">
                <i className="bi bi-megaphone me-2"></i>
                Announcements
                <Badge bg="success" className="ms-2">
                  1
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col md={7}>{renderTabContent()}</Col>
        <Col md={5} className="calendar-section">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={meetings}
            className="custom-calendar"
            height={500}
          />
          <Button variant="primary" className="mt-3 add-event-btn">
            Add event
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;