import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dashboard from '../../Componment/Dashboard';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from "react-icons/md";
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Config.jsx/Firebase'; // Adjust the import path to your Firebase configuration
import { colors } from '@mui/material';

const SubjectList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  // Fetch students from Firestore on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      const studentCollection = collection(db, 'students');
      const studentSnapshot = await getDocs(studentCollection);
      const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    };
    
    fetchStudents();
  }, []);

  // Function to delete a student
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'students', id));
    setStudents(students.filter(student => student.id !== id));
  };

  // Function to edit a student (similar to before)
  const handleEdit = (id) => {
    const student = students.find(student => student.id === id);
    const firstName = prompt('Edit First Name', student.firstName);
    const lastName = prompt('Edit Last Name', student.lastName);
    const email = prompt('Edit Email', student.email);
    const className = prompt('Edit Class Name', student.className);
    const gender = prompt('Edit Gender', student.gender);

    const updatedStudents = students.map(s =>
      s.id === id ? { ...s, firstName, lastName, email, className, gender } : s
    );
    setStudents(updatedStudents);

    // Update Firestore document (if needed)
    // You can add Firestore update logic here
  };

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
  
    iconButton: {
      cursor: 'pointer',
      marginLeft: '10px',
      fontSize: '30px',  
      color: 'red',  
    },
  };

  return (
    <div style={styles.container}>
      <Dashboard />
      <h1 style={styles.heading}>Student List</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={() => navigate('/student/student-registration')}>
          Add
        </button>
      </div>
      <div style={styles.centeredTableContainer}>
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table style={styles.table} aria-label="subject list table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeadCell}>FirstName</TableCell>
                <TableCell style={styles.tableHeadCell}>LastName</TableCell>
                <TableCell style={styles.tableHeadCell}>Email</TableCell>
                <TableCell style={styles.tableHeadCell}>ClassName</TableCell>
                <TableCell style={styles.tableHeadCell}>Gender</TableCell>
                <TableCell style={styles.tableHeadCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow
                  key={student.id}
                  style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
                >
                  <TableCell style={styles.tableBodyCell}>{student.firstName}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{student.lastName}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{student.email}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{student.className}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{student.gender}</TableCell>
                  <TableCell style={styles.tableBodyCell}>
                  <MdEdit 
                           style={{ ...styles.iconButton, color: 'green' }}  // Set color to green
                            onClick={() => handleEdit(student.id)} 
                          title="Edit"
                    />
                    <MdDelete 
                      style={styles.iconButton} 
                      onClick={() => handleDelete(student.id)} 
                      title="Delete"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SubjectList;
