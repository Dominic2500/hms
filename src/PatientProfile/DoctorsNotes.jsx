import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical, faPills, faSyringe, faVial, faSignature } from '@fortawesome/free-solid-svg-icons';

const DoctorsNotes = () => {
  const [formData, setFormData] = useState({
    presentingSymptoms: '',
    allergies: '',
    currentMedications: '',
    primaryDiagnosis: '',
    secondaryDiagnoses: '',
    recommendedActions: '',
    longTermTreatment: '',
    newPrescriptions: '',
    medicationChanges: '',
    additionalNotes: '',
    followUpInstructions: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="bg-light mb-4">
            <Card.Body>
              <h2 className="text-center mb-4">
                <FontAwesomeIcon icon={faNotesMedical} className="mr-2" /> Doctor's Notes
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faVial} className="mr-2" /> Presenting Symptoms:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="presentingSymptoms"
                    value={formData.presentingSymptoms}
                    onChange={handleInputChange}
                    placeholder="List of symptoms and a brief description of each"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faVial} className="mr-2" /> Allergies:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="List of all known allergies, including medications, food, environmental, etc. Note reaction severity if known"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faPills} className="mr-2" /> Current Medications:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    placeholder="Medication name - Dosage - Frequency (Repeat for each medication)"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faSyringe} className="mr-2" /> Diagnosis:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="primaryDiagnosis"
                    value={formData.primaryDiagnosis}
                    onChange={handleInputChange}
                    placeholder="Primary diagnosis"
                  />
                  <Form.Control
                    type="text"
                    name="secondaryDiagnoses"
                    value={formData.secondaryDiagnoses}
                    onChange={handleInputChange}
                    placeholder="Any secondary diagnoses, if applicable"
                    className="mt-2"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faSyringe} className="mr-2" /> Treatment Plan:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="recommendedActions"
                    value={formData.recommendedActions}
                    onChange={handleInputChange}
                    placeholder="Recommended immediate actions (procedures, additional testing, etc.)"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="longTermTreatment"
                    value={formData.longTermTreatment}
                    onChange={handleInputChange}
                    placeholder="Long-term treatment strategy (lifestyle changes, ongoing medication, etc.)"
                    className="mt-2"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faPills} className="mr-2" /> Medications:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="newPrescriptions"
                    value={formData.newPrescriptions}
                    onChange={handleInputChange}
                    placeholder="New prescriptions: Medication - Dosage - Frequency - Instructions"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="medicationChanges"
                    value={formData.medicationChanges}
                    onChange={handleInputChange}
                    placeholder="Changes to existing medications, if any"
                    className="mt-2"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faNotesMedical} className="mr-2" /> Notes:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Additional important observations"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="followUpInstructions"
                    value={formData.followUpInstructions}
                    onChange={handleInputChange}
                    placeholder="Follow-up instructions"
                    className="mt-2"
                  />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faSignature} className="mr-2" /> Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorsNotes;