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
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { db } from '../../Config.jsx/Firebase'; // Your Firebase config
import { MdEdit, MdDelete } from 'react-icons/md'; // Import icons

const SubjectList = () => {
  const [teachers, setTeachers] = useState([]); // State to store teachers
  const navigate = useNavigate();

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

  // Fetch data from Firestore when the component is mounted
  useEffect(() => {
    const fetchTeachers = async () => {
      const querySnapshot = await getDocs(collection(db, 'teachers'));
      const teachersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeachers(teachersList);
    };

    fetchTeachers();
  }, []);

  // Function to delete a teacher
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'teachers', id));
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  // Function to edit a teacher
  const handleEdit = (id) => {
    const teacher = teachers.find(teacher => teacher.id === id);
    const firstName = prompt('Edit First Name', teacher.firstName);
    const lastName = prompt('Edit Last Name', teacher.lastName);
    const email = prompt('Edit Email', teacher.email);
    const subject = prompt('Edit Subject', teacher.subject);
    const gender = prompt('Edit Gender', teacher.gender);

    const updatedTeacher = { firstName, lastName, email, subject, gender };

    // Update Firestore document
    const updateTeacher = async () => {
      await updateDoc(doc(db, 'teachers', id), updatedTeacher);
    };

    updateTeacher().then(() => {
      // Update local state
      setTeachers(teachers.map(teacher =>
        teacher.id === id ? { ...teacher, ...updatedTeacher } : teacher
      ));
    });
  };

  return (
    <div style={styles.container}>
      <Dashboard />
      <h1 style={styles.heading}>Teacher List</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={() => navigate('/teacher/teacher-registration')}>
          Add
        </button>
      </div>
      <div style={styles.centeredTableContainer}>
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table style={styles.table} aria-label="teacher list table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeadCell}>First Name</TableCell>
                <TableCell style={styles.tableHeadCell}>Last Name</TableCell>
                <TableCell style={styles.tableHeadCell}>Email</TableCell>
                <TableCell style={styles.tableHeadCell}>Subject</TableCell>
                <TableCell style={styles.tableHeadCell}>Gender</TableCell>
                <TableCell style={styles.tableHeadCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow
                  key={teacher.id}
                  style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
                >
                  <TableCell style={styles.tableBodyCell}>{teacher.firstName}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{teacher.lastName}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{teacher.email}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{teacher.subject}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{teacher.gender}</TableCell>
                  <TableCell style={styles.tableBodyCell}>
                    <MdEdit
                      style={{ ...styles.iconButton, color: 'green' }} // Set color to green
                      onClick={() => handleEdit(teacher.id)} // Handle edit logic
                      title="Edit"
                    />
                    <MdDelete
                      style={styles.iconButton}
                      onClick={() => handleDelete(teacher.id)} // Handle delete logic
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
