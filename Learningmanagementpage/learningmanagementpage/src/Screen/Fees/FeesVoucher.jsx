import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography, Grid, Box } from '@mui/material';
import Dashboard from '../../Componment/Dashboard';

const FeeVoucher = () => {
  const [voucherDetails, setVoucherDetails] = useState({
    studentName: '',
    class: '',
    admissionFee: '',
    monthlyFee: '',
    totalFee: '',
  });

  const handleGenerateVoucher = () => {
    if (voucherDetails.admissionFee && voucherDetails.monthlyFee) {
      const total = parseFloat(voucherDetails.admissionFee) + parseFloat(voucherDetails.monthlyFee);
      setVoucherDetails({ ...voucherDetails, totalFee: total });
    }
  };

  return (
    <Container
      component={Paper}
      sx={{
        padding: 4,
        marginTop: 4,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        maxWidth: '800px',
      }}
    >
      <Dashboard />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textDecoration: 'underline',
          textAlign: 'center',
          color: 'blue',
          marginTop: '10px',
          marginBottom: '20px',
          fontWeight: 'bold',
        }}
      >
        Fees Voucher
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ width: '100%', maxWidth: '1000px' }}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Student Name"
              value={voucherDetails.studentName}
              onChange={(e) => setVoucherDetails({ ...voucherDetails, studentName: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '8px',
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Class"
              value={voucherDetails.class}
              onChange={(e) => setVoucherDetails({ ...voucherDetails, class: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '8px',
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Admission Fee"
              type="number"
              value={voucherDetails.admissionFee}
              onChange={(e) => setVoucherDetails({ ...voucherDetails, admissionFee: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '8px',
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Monthly Fee"
              type="number"
              value={voucherDetails.monthlyFee}
              onChange={(e) => setVoucherDetails({ ...voucherDetails, monthlyFee: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '8px',
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateVoucher}
        sx={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 3,
          padding: '10px 20px',
          borderRadius: '20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#155a99',
          },
        }}
      >
        Generate Voucher
      </Button>

      {voucherDetails.totalFee && (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          Total Fee: {voucherDetails.totalFee}
        </Typography>
      )}
    </Container>
  );
};

export default FeeVoucher;
