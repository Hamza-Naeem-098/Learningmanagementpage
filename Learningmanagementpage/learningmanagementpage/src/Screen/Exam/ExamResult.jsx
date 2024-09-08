import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import Dashboard from '../../Componment/Dashboard'; // Ensure the path is correct
import './Examresult.css'; // Ensure the CSS file is correctly imported

const ExamResult = () => {
  return (
    <div className="dashboard-container">
      <Dashboard className="dashboard" />
      <div className="dashboard-content">
        <div className="exam-result">
          <h1>Exam Result</h1>
          <div>
            <h4>Class 1 Results</h4>
            <TableHead sx={{ backgroundColor: 'black', width: '100%' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', width: '45%' }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Roll Number</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Grades</TableCell>
              </TableRow>
            </TableHead>
          </div>
          <div>
            <h4>Class 2 Results</h4>
            <TableHead sx={{ backgroundColor: 'black', width: '100%' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', width: '45%' }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Roll Number</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Grades</TableCell>
              </TableRow>
            </TableHead>
          </div>
          <div>
            <h4>Class 3 Results</h4>
            <TableHead sx={{ backgroundColor: 'black', width: '100%' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', width: '45%' }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Roll Number</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Grades</TableCell>
              </TableRow>
            </TableHead>
          </div>
          <div>
            <h4>Class 4 Results</h4>
            <TableHead sx={{ backgroundColor: 'black', width: '100%' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', width: '45%' }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Roll Number</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Grades</TableCell>
              </TableRow>
            </TableHead>
          </div>
          <div>
            <h4>Class 5 Results</h4>
            <TableHead sx={{ backgroundColor: 'black', width: '100%' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', width: '45%' }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Roll Number</TableCell>
                <TableCell sx={{ color: 'white', width: '45%' }}>Grades</TableCell>
              </TableRow>
            </TableHead>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
