import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faHeart,
  faThermometerHalf,
  faLungsVirus,
  faHeartbeat,
  faSmileWink,
} from "@fortawesome/free-solid-svg-icons";

const VitalSignsForm = () => {
  const [systolicBloodPressure, setSystolicBloodPressure] = useState("");
  const [diastolicBloodPressure, setDiastolicBloodPressure] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");
  const [respiration, setRespiration] = useState("");
  const [pulse, setPulse] = useState("");
  const [pain, setPain] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const painEmojis = ["😃", "😐", "😕", "😟", "😫"];

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">
            <FontAwesomeIcon icon={faTint} className="mr-2 text-primary" />
            Vital Signs
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit} className="bg-light p-4 rounded">
            <Form.Group controlId="bloodPressure" className="mb-4">
              <Form.Label>
                <FontAwesomeIcon icon={faHeart} className="mr-2 text-danger" />
                Blood Pressure
              </Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="120"
                    value={systolicBloodPressure}
                    onChange={(e) => setSystolicBloodPressure(e.target.value)}
                    className="text-center"
                  />
                  <Form.Text className="text-muted text-center">
                    Systolic (mmHg)
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="80"
                    value={diastolicBloodPressure}
                    onChange={(e) => setDiastolicBloodPressure(e.target.value)}
                    className="text-center"
                  />
                  <Form.Text className="text-muted text-center">
                    Diastolic (mmHg)
                  </Form.Text>
                </Col>
              </Row>
              <Form.Text className="text-muted">
                Normal: &lt;120/80 mmHg
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="temperature" className="mb-4">
              <Form.Label>
                <FontAwesomeIcon icon={faThermometerHalf} className="mr-2 text-warning" />
                Temperature
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="37.0"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="text-center"
              />
              <Form.Text className="text-muted">Celsius (°C)</Form.Text>
            </Form.Group>

            <Form.Group controlId="oxygenSaturation" className="mb-4">
              <Form.Label>
                <FontAwesomeIcon icon={faLungsVirus} className="mr-2 text-info" />
                Oxygen Saturation
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="96 - 100%"
                value={oxygenSaturation}
                onChange={(e) => setOxygenSaturation(e.target.value)}
                className="text-center"
              />
              <Form.Text className="text-muted">
                Low levels of oxygen = Hypoxia
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="respiration" className="mb-4">
              <Form.Label>
                <FontAwesomeIcon icon={faLungsVirus} className="mr-2 text-info" />
                Respiration
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="12-20 breaths per minute"
                value={respiration}
                onChange={(e) => setRespiration(e.target.value)}
                className="text-center"
              />
            </Form.Group>

            <Form.Group controlId="pulse" className="mb-4">
              <Form.Label>
                <FontAwesomeIcon icon={faHeartbeat} className="mr-2 text-success" />
                Pulse
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="60 - 100 bpm"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                className="text-center"
              />
            </Form.Group>

            <Form.Group controlId="pain" className="mb-4">
              <Form.Label>
                <FontAwesomeIcon icon={faSmileWink} className="mr-2 text-danger" />
                Pain
              </Form.Label>
              <div className="d-flex justify-content-between">
                {painEmojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant={index === pain ? "danger" : "outline-danger"}
                    onClick={() => setPain(index)}
                    className="rounded-circle p-2"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
              <Form.Text className="text-muted">
                0 = no pain, 4 = the worst
              </Form.Text>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" className="px-5">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VitalSignsForm;
