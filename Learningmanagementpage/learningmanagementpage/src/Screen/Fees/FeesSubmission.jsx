import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography } from '@mui/material';
import Dashboard from '../../Componment/Dashboard';

const FeeSubmission = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    studentName: '',
    class: '',
    feeAmount: '',
    paymentDate: '',
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Submit the payment details to your backend here
    console.log("Payment submitted:", paymentDetails);
    alert("Payment Submitted Successfully!");
  };

  return (

    <Container component={Paper} sx={{ padding: 4, marginTop: 4 }}>
          <Dashboard />
            <h1 style={{ textDecoration: 'underline', textAlign: 'center', color: 'blue', marginTop: '10px' }}>
        Fees Submission
      </h1>
     
      <form onSubmit={handlePaymentSubmit}>
        <TextField
          fullWidth
          label="Student Name"
          value={paymentDetails.studentName}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, studentName: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Class"
          value={paymentDetails.class}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, class: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Fee Amount"
          type="number"
          value={paymentDetails.feeAmount}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, feeAmount: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Payment Date"
          type="date"
          value={paymentDetails.paymentDate}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentDate: e.target.value })}
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Payment
        </Button>
      </form>
    </Container>
  );
};

export default FeeSubmission;
