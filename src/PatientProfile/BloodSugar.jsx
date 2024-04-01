import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BloodSugarForm = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [bloodSugarReadings, setBloodSugarReadings] = useState({
    monday: { beforeBreakfast: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeDinner: '', afterDinner: '', notes: '' },
    tuesday: { beforeBreakfast: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeDinner: '', afterDinner: '', notes: '' },
    wednesday: { beforeBreakfast: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeDinner: '', afterDinner: '', notes: '' },
    thursday: { beforeBreakfast: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeDinner: '', afterDinner: '', notes: '' },
    friday: { beforeBreakfast: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeDinner: '', afterDinner: '', notes: '' },
    saturday: { beforeBreakfast: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeDinner: '', afterDinner: '', notes: '' },
    sunday: { beforeBreakfast: '', afterBreakfast: '', beforeLunch: '', afterLunch: '', beforeDinner: '', afterDinner: '', notes: '' },
  });

  const handleWeekChange = (date) => {
    setSelectedWeek(date);
  };

  const handleInputChange = (day, event) => {
    const { name, value } = event.target;
    setBloodSugarReadings((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [name]: value,
      },
    }));
  };

  const renderDayForm = (day) => (
    <div>
      <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
      <Row>
        <Col>
          <Form.Group controlId={`${day}BeforeBreakfast`}>
            <Form.Label>Before Breakfast:</Form.Label>
            <Form.Control
              type="text"
              name="beforeBreakfast"
              value={bloodSugarReadings[day].beforeBreakfast}
              onChange={(e) => handleInputChange(day, e)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`${day}AfterBreakfast`}>
            <Form.Label>After Breakfast:</Form.Label>
            <Form.Control
              type="text"
              name="afterBreakfast"
              value={bloodSugarReadings[day].afterBreakfast}
              onChange={(e) => handleInputChange(day, e)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId={`${day}BeforeLunch`}>
            <Form.Label>Before Lunch:</Form.Label>
            <Form.Control
              type="text"
              name="beforeLunch"
              value={bloodSugarReadings[day].beforeLunch}
              onChange={(e) => handleInputChange(day, e)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`${day}AfterLunch`}>
            <Form.Label>After Lunch:</Form.Label>
            <Form.Control
              type="text"
              name="afterLunch"
              value={bloodSugarReadings[day].afterLunch}
              onChange={(e) => handleInputChange(day, e)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId={`${day}BeforeDinner`}>
            <Form.Label>Before Dinner:</Form.Label>
            <Form.Control
              type="text"
              name="beforeDinner"
              value={bloodSugarReadings[day].beforeDinner}
              onChange={(e) => handleInputChange(day, e)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`${day}AfterDinner`}>
            <Form.Label>After Dinner:</Form.Label>
            <Form.Control
              type="text"
              name="afterDinner"
              value={bloodSugarReadings[day].afterDinner}
              onChange={(e) => handleInputChange(day, e)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId={`${day}Notes`}>
        <Form.Label>Notes:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="notes"
          value={bloodSugarReadings[day].notes}
          onChange={(e) => handleInputChange(day, e)}
        />
      </Form.Group>
    </div>
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={10}>
          <h2 className="text-center mb-4">Blood Sugar Log</h2>
          <Form>
            <Form.Group controlId="week">
              <Form.Label>Week:</Form.Label>
              <DatePicker
                selected={selectedWeek}
                onChange={handleWeekChange}
                dateFormat="MMMM d, yyyy"
                showWeekNumbers
                className="form-control"
              />
            </Form.Group>

            {renderDayForm('monday')}
            {renderDayForm('tuesday')}
            {renderDayForm('wednesday')}
            {renderDayForm('thursday')}
            {renderDayForm('friday')}
            {renderDayForm('saturday')}
            {renderDayForm('sunday')}

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BloodSugarForm;