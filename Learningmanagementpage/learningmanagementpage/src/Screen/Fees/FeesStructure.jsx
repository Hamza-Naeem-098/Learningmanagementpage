import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import Dashboard from '../../Componment/Dashboard';

const feeStructureData = [
  { class: '1', monthlyFee: 500, yearlyFee: 6000 },
  { class: '2', monthlyFee: 600, yearlyFee: 7200 },
  { class: '3', monthlyFee: 700, yearlyFee: 8400 },
  { class: '4', monthlyFee: 800, yearlyFee: 9600 },
  { class: '5', monthlyFee: 900, yearlyFee: 10800 },
];

const FeeStructure = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Dashboard />
            <h1 style={{ textDecoration: 'underline', textAlign: 'center', color: 'blue', marginTop: '10px' }}>
        Fees Structure
      </h1>
      {feeStructureData.map((fee, index) => (
        <Paper
          key={index}
          sx={{
            padding: 2,
            marginBottom: 2,
            borderRadius: '10px',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" align="center">
                Class {fee.class}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" color="green">
                  Monthly Fee:
                </Typography>
                <Typography variant="body1" color="green">
                  Rs:{fee.monthlyFee}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" color="green">
                  Yearly Fee:
                </Typography>
                <Typography variant="body1" color="green">
                  Rs:{fee.yearlyFee}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default FeeStructure;
