// SyllabusList.js
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dashboard from '../../Componment/Dashboard';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Config.jsx/Firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

const SyllabusList = () => {
  const [syllabusData, setSyllabusData] = useState([]);
  const navigate = useNavigate();

  const fetchSyllabusData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'syllabuses'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSyllabusData(data);
    } catch (error) {
      console.error('Error fetching syllabus data:', error);
    }
  };

  useEffect(() => {
    fetchSyllabusData();
  }, []);

  const styles = {
    container: {
      marginLeft: '250px',
    },
    centeredTableContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    },
    tableContainer: {
      width: '80%',
    },
    table: {
      minWidth: '500px',
    },
    tableHeadCell: {
      backgroundColor: 'black',
      color: 'white',
      fontWeight: 'bold',
    },
    tableBodyCell: {
      fontSize: '14px',
      border: '1px solid #ddd',
    },
    tableRowOdd: {
      backgroundColor: '#f5f5f5',
    },
    tableRowEven: {
      backgroundColor: 'white',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: '110px',
      marginBottom: '20px',
    },
    addButton: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <Dashboard />
      <h1 style={styles.heading}>Syllabus List</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={() => navigate('/syllabus/syllabus-form')}>
          Add
        </button>
      </div>
      <div style={styles.centeredTableContainer}>
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table style={styles.table} aria-label="syllabus list table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeadCell}>Subject Name</TableCell>
                <TableCell style={styles.tableHeadCell}>Class</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {syllabusData.map((syllabus, index) => (
                <TableRow
                  key={syllabus.id}
                  style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
                >
                  <TableCell style={styles.tableBodyCell}>{syllabus.subjectName}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{syllabus.className}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SyllabusList;
