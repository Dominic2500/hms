import React from 'react';
import { FieldArray } from 'formik';
import { Grid, TextField, IconButton, Typography, Chip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MedicationList = ({ name, formik }) => {
  const { values, handleChange, errors, touched } = formik;

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {values[name].map((medication, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name={`${name}.${index}.name`}
                  label="Medication Name"
                  value={medication.name}
                  onChange={handleChange}
                  error={touched[name]?.[index]?.name && Boolean(errors[name]?.[index]?.name)}
                  helperText={touched[name]?.[index]?.name && errors[name]?.[index]?.name}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name={`${name}.${index}.dosage`}
                  label="Dosage"
                  value={medication.dosage}
                  onChange={handleChange}
                  error={touched[name]?.[index]?.dosage && Boolean(errors[name]?.[index]?.dosage)}
                  helperText={touched[name]?.[index]?.dosage && errors[name]?.[index]?.dosage}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name={`${name}.${index}.instructions`}
                  label="Instructions"
                  value={medication.instructions}
                  onChange={handleChange}
                  error={touched[name]?.[index]?.instructions && Boolean(errors[name]?.[index]?.instructions)}
                  helperText={touched[name]?.[index]?.instructions && errors[name]?.[index]?.instructions}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton
                  aria-label="Delete"
                  onClick={() => arrayHelpers.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Add Medication
            </Typography>
            <TextField
              fullWidth
              label="Medication Name"
              value={values.newMedicationName}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  arrayHelpers.push({
                    name: values.newMedicationName,
                    dosage: '',
                    instructions: '',
                  });
                  formik.setFieldValue('newMedicationName', ''); // Clear input field
                }
              }}
            />
          </Box>
        </div>
      )}
    />
  );
};

export default MedicationList;
