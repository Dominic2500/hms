import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// Import the components you want to render
import VitalSignsForm from "../PatientProfile/vitalSigns";
import BloodSugarForm from "../PatientProfile/BloodSugar";
import DoctorsNotes from "../PatientProfile/DoctorsNotes";
import BloodSugarLog from "../PatientProfile/BloodSugarLog";
import NursingNotes from "../PatientProfile/NursingNotes";
import DischargeSummary from "./DischargeSummary";

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const patientDocuments = [
    { id: 1, name: "Patient Document 1" },
    { id: 2, name: "Patient Document 2" },
    { id: 3, name: "Patient Document 3" },
    { id: 4, name: "Patient Document 4" },
    { id: 5, name: "Patient Document 5" },
    { id: 6, name: "Discharge Summary" },
    // Add more documents as needed
  ];

  const renderDocumentComponent = () => {
    switch (selectedDocument?.id) {
      case 1:
        return <VitalSignsForm />;
      case 2:
        return <BloodSugarForm />;
      case 3:
        return <DoctorsNotes />;
      case 4:
        return <BloodSugarLog />;
      case 5:
        return <NursingNotes />;
      case 6:
        return <DischargeSummary />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Autocomplete
            id="document-select"
            options={patientDocuments}
            autoHighlight
            getOptionLabel={(option) => option.name}
            value={selectedDocument}
            onChange={(event, newValue) => {
              setSelectedDocument(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a patient document"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col>{renderDocumentComponent()}</Col>
      </Row>
    </Container>
  );
};

export default Documents;
