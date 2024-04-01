import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const patientDocuments = [
    { id: 1, name: "Patient Document 1" },
    { id: 2, name: "Patient Document 2" },
    { id: 3, name: "Patient Document 3" },
    // Add more documents as needed
  ];

  return (
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
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
  );
};

export default Documents;
