import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { TextField, Typography, Box, Grid } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const BloodSugarLog = () => {
  const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box>
      <Typography variant="h6" align="center" gutterBottom>
        Weekly Logbook
      </Typography>
      <div style={{ marginBottom: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      {daysOfWeek.map((day, index) => (
        <Grid container spacing={2} key={day}>
          <Grid item xs={1} style={{ maxWidth: '80px' }}>
            <Typography variant="subtitle1">{day}.</Typography>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              {`${index + 1}${getSuffix(index + 1)} ${getMonthName()}`}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Table bordered>
              <thead>
                <tr>
                  <th></th>
                  {mealTimes.map((meal) => (
                    <th colSpan={2} key={meal}>
                      {meal}
                    </th>
                  ))}
                </tr>
                <tr>
                  <th></th>
                  {mealTimes.map((meal) => (
                    <>
                      <th key={`${meal}-pre`}>Pre</th>
                      <th key={`${meal}-post`}>Post</th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Blood Sugar</th>
                  {mealTimes.map((meal) => (
                    <>
                      <td key={`${meal}-pre`}>
                        <TextField size="small" fullWidth />
                      </td>
                      <td key={`${meal}-post`}>
                        <TextField size="small" fullWidth />
                      </td>
                    </>
                  ))}
                </tr>
                <tr>
                  <th>Time</th>
                  {mealTimes.map((meal) => (
                    <>
                      <td key={`${meal}-pre`}>
                        <TextField size="small" fullWidth type="time" />
                      </td>
                      <td key={`${meal}-post`}>
                        <TextField size="small" fullWidth type="time" />
                      </td>
                    </>
                  ))}
                </tr>
                <tr>
                  <th>Meds</th>
                  {mealTimes.map((meal) => (
                    <>
                      <td key={`${meal}-pre`}>
                        <TextField size="small" fullWidth />
                      </td>
                      <td key={`${meal}-post`}>
                        <TextField size="small" fullWidth />
                      </td>
                    </>
                  ))}
                </tr>
                <tr>
                  <th>Carbs</th>
                  {mealTimes.map((meal) => (
                    <>
                      <td key={`${meal}-pre`}>
                        <TextField size="small" fullWidth type="number" />
                      </td>
                      <td key={`${meal}-post`}>
                        <TextField size="small" fullWidth type="number" />
                      </td>
                    </>
                  ))}
                </tr>
              </tbody>
            </Table>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

function getSuffix(date) {
  if (date === 1 || date === 21 || date === 31) return 'st';
  if (date === 2 || date === 22) return 'nd';
  if (date === 3 || date === 23) return 'rd';
  return 'th';
}

function getMonthName() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentDate = new Date();
  return monthNames[currentDate.getMonth()];
}

export default BloodSugarLog;
