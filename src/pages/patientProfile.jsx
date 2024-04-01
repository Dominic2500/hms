import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Tab,
  Tabs,
  Form,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
} from "react-bootstrap"; // Import Bootstrap components
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faHeart,
  faThermometer,
  faTint,
  faWeight,
  faXRay,
  faFileAlt,
  faSyringe,
  faUserFriends,
  faPills,
  faMinusSquare,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import Documents from "../PatientProfile/Documents";
import VitalSignsForm from "../PatientProfile/vitalSigns";
import BloodSugarForm from "../PatientProfile/BloodSugar"

const PatientProfile = () => {
  const [tabValue, setTabValue] = useState(0); // State for handling tab value
  const [editMode, setEditMode] = useState(false); // State for handling edit mode
  const [allergies, setAllergies] = useState(["Peanuts", "Penicillin"]); // State for handling allergies
  const [vitalSigns, setVitalSigns] = useState({
    temperature: 98.6,
    systolic: 120,
    diastolic: 80,
    heartRate: 70,
    bloodType: "A+",
    weight: 70,
  }); // State for handling vital signs
  const [minimized, setMinimized] = useState(false); // State for handling card minimization
  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  }; // Function to handle edit mode toggle

  // Placeholder content for each tab
  const renderTabContent = () => {
    switch (tabValue) {
      case 0:
        return <Documents />;
      case 1:
        return <BloodSugarChart />;
      case 2:
        return <BloodSugarChart/>;
      case 3:
        return <div>Content for Medication tab</div>;
      case 4:
        return <div>Content for Medical History tab</div>;
      case 5:
        return <div>Content for Family History tab</div>;
      case 6:
        return <div>Content for Immunization tab</div>;
      default:
        return null; // or return a default content component
    }
  };

  const handleAllergyChange = (index, value) => {
    const newAllergies = [...allergies];
    newAllergies[index] = value;
    setAllergies(newAllergies);
  }; // Function to handle allergy change

  const handleVitalSignChange = (field, value) => {
    setVitalSigns({ ...vitalSigns, [field]: value });
  }; // Function to handle vital sign change

  const handleMinimizeCard = () => {
    setMinimized(!minimized);
  }; // Function to handle card minimization

  return (
    <Container fluid>
      <Row>
        {/* Profile Overview */}
        <Col xs={12}>
          <Card className="mb-3 shadow">
            <CardHeader
              className="d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#ffcdd2", color: "#c63737" }}
            >
              {minimized ? (
                <div className="d-flex align-items-center">
                  <Avatar
                    alt="Patient"
                    src="/path/to/profile/image.jpg"
                    className="mr-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span style={{ marginLeft: "10px" }}>John Doe</span>
                </div>
              ) : (
                <span>
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    style={{ color: "#c63737" }}
                  />{" "}
                  Patient Profile
                </span>
              )}
              <Button variant="outline-danger" onClick={handleMinimizeCard}>
                <FontAwesomeIcon
                  icon={minimized ? faPlusSquare : faMinusSquare}
                  style={{ color: "#c63737" }}
                />
              </Button>
            </CardHeader>
            <CardBody style={{ display: minimized ? "none" : "block" }}>
              <Row className="align-items-start">
                <Col md={6}>
                  <Row>
                    <Col md={12}>
                      {/* Patient Photo */}
                      <Avatar
                        alt="Patient"
                        src="/path/to/profile/image.jpg"
                        className="mb-3"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      {/* Patient Information */}
                      <h5>
                        <b>Full Name:</b> John Doe
                      </h5>
                      <p>
                        <b>National ID:</b> 123456789
                      </p>
                      <p>
                        <b>Insurance:</b> Blue Cross Blue Shield
                      </p>
                      <p>
                        <b>Age:</b> 32 years
                      </p>
                      <p>
                        <b>Sex:</b> Male
                      </p>
                      <p>
                        <b>Phone Number:</b> 123-456-7890
                      </p>
                      <p>
                        <b>Emergency Contact:</b> Jane Doe
                      </p>
                      <p>
                        <b>Relation to Emergency Contact:</b> Spouse
                      </p>
                    </Col>
                  </Row>
                </Col>
                {/* Quick Info Sidebar */}
                <Col xs={12} lg={6} className="d-flex justify-content-end">
                  <Card className="mb-3 shadow">
                    <Card.Header
                      className="d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#ffcdd2", color: "#c63737" }}
                    >
                      <span>
                        <FontAwesomeIcon
                          icon={faSyringe}
                          style={{ color: "#c63737" }}
                        />{" "}
                        Vital Signs & Allergies
                      </span>
                      <Button
                        variant="outline-danger"
                        onClick={handleEditClick}
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ color: "#c63737" }}
                        />
                        {editMode ? "Save" : "Edit"}
                      </Button>
                    </Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Form.Label>
                          <FontAwesomeIcon
                            icon={faSyringe}
                            style={{ color: "#c63737" }}
                          />{" "}
                          Allergies:{" "}
                          {editMode && (
                            <FontAwesomeIcon
                              icon={faPen}
                              style={{ cursor: "pointer", color: "#c63737" }}
                              onClick={() => setEditMode(!editMode)}
                            />
                          )}
                        </Form.Label>
                        {editMode ? (
                          <div>
                            {allergies.map((allergy, index) => (
                              <Form.Control
                                key={index}
                                type="text"
                                value={allergy}
                                onChange={(e) =>
                                  handleAllergyChange(index, e.target.value)
                                }
                                className="mb-2"
                                style={{
                                  width: "200px",
                                  display: "inline-block",
                                  marginRight: "10px",
                                }}
                              />
                            ))}
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => setAllergies([...allergies, ""])}
                            >
                              Add Allergy
                            </Button>
                          </div>
                        ) : (
                          allergies.join(", ")
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Label>
                          <FontAwesomeIcon
                            icon={faThermometer}
                            style={{ color: "#c63737", marginRight: "10px" }}
                          />{" "}
                          Temperature:
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="number"
                            value={vitalSigns.temperature}
                            onChange={(e) =>
                              handleVitalSignChange(
                                "temperature",
                                e.target.value
                              )
                            }
                            style={{
                              width: "100px",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          />
                        ) : (
                          `${vitalSigns.temperature}°F`
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Label style={{ marginRight: "10px" }}>
                          <FontAwesomeIcon
                            icon={faTint}
                            style={{ color: "#c63737" }}
                          />{" "}
                          Blood Pressure:
                        </Form.Label>
                        <span
                          style={{
                            marginRight: "10px",
                            backgroundColor: "#c63737",
                            color: "white",
                            padding: "2px 5px",
                            borderRadius: "4px",
                          }}
                        >
                          <b>Systolic:</b>
                        </span>
                        {editMode ? (
                          <Form.Control
                            type="number"
                            value={vitalSigns.systolic}
                            onChange={(e) =>
                              handleVitalSignChange("systolic", e.target.value)
                            }
                            style={{
                              width: "80px",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          />
                        ) : (
                          `${vitalSigns.systolic}`
                        )}
                        <span
                          style={{
                            marginRight: "10px",
                            backgroundColor: "#c63737",
                            color: "white",
                            padding: "2px 5px",
                            borderRadius: "4px",
                          }}
                        >
                          <b>Diastolic:</b>
                        </span>
                        {editMode ? (
                          <Form.Control
                            type="number"
                            value={vitalSigns.diastolic}
                            onChange={(e) =>
                              handleVitalSignChange("diastolic", e.target.value)
                            }
                            style={{
                              width: "80px",
                              display: "inline-block",
                            }}
                          />
                        ) : (
                          `${vitalSigns.diastolic}`
                        )}
                        <span style={{ marginLeft: "10px" }}>mmHg</span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Label>
                          <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: "#c63737", marginRight: "10px" }}
                          />{" "}
                          Heart Rate:
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="number"
                            value={vitalSigns.heartRate}
                            onChange={(e) =>
                              handleVitalSignChange("heartRate", e.target.value)
                            }
                            style={{
                              width: "100px",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          />
                        ) : (
                          `${vitalSigns.heartRate} bpm`
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Label>
                          <FontAwesomeIcon
                            icon={faTint}
                            style={{ color: "#c63737", marginRight: "10px" }}
                          />{" "}
                          Blood Type:
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="text"
                            value={vitalSigns.bloodType}
                            onChange={(e) =>
                              handleVitalSignChange("bloodType", e.target.value)
                            }
                            style={{
                              width: "100px",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          />
                        ) : (
                          vitalSigns.bloodType
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Label>
                          <FontAwesomeIcon
                            icon={faWeight}
                            style={{ color: "#c63737", marginRight: "10px" }}
                          />{" "}
                          Weight:
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="number"
                            value={vitalSigns.weight}
                            onChange={(e) =>
                              handleVitalSignChange("weight", e.target.value)
                            }
                            style={{
                              width: "100px",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          />
                        ) : (
                          `${vitalSigns.weight} kg`
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Tabs
                id="patient-profile-tabs"
                activeKey={tabValue}
                onSelect={(k) => setTabValue(k)}
                className="mb-3"
              >
                <Tab
                  eventKey={0}
                  title={
                    <>
                      <FontAwesomeIcon icon={faFileAlt} /> Documents
                    </>
                  }
                >
                  <Documents />
                </Tab>
                <Tab
                  eventKey={1}
                  title={
                    <>
                      <FontAwesomeIcon icon={faSyringe} /> Laboratory Results
                    </>
                  }
                >
                  <VitalSignsForm />
                </Tab>
                <Tab
                  eventKey={2}
                  title={
                    <>
                      <FontAwesomeIcon icon={faXRay} /> Imaging
                    </>
                  }
                >
                 <BloodSugarForm/>
                </Tab>
                <Tab
                  eventKey={3}
                  title={
                    <>
                      <FontAwesomeIcon icon={faPills} /> Medication
                    </>
                  }
                ></Tab>
                <Tab
                  eventKey={4}
                  title={
                    <>
                      <FontAwesomeIcon icon={faFileAlt} /> Medical History
                    </>
                  }
                ></Tab>
                <Tab
                  eventKey={5}
                  title={
                    <>
                      <FontAwesomeIcon icon={faUserFriends} /> Family History
                    </>
                  }
                ></Tab>
                <Tab
                  eventKey={6}
                  title={
                    <>
                      <FontAwesomeIcon icon={faSyringe} /> Immunization
                    </>
                  }
                ></Tab>
              </Tabs>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {/* Container for tab content */}
      {/* <Container>{renderTabContent()}</Container> */}
    </Container>
  );
};

export default PatientProfile;
