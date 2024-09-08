import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dashboard from '../../Componment/Dashboard';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { db } from '../../Config.jsx/Firebase'; // Your Firebase config
import { MdEdit, MdDelete } from 'react-icons/md'; // Import icons

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const classesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClasses(classesList);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'classes', id));
      setClasses(classes.filter(cls => cls.id !== id));
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleEdit = (id) => {
    const cls = classes.find(cls => cls.id === id);
    const newFirstName = prompt('Edit First Name', cls.firstName);
    const newLastName = prompt('Edit Last Name', cls.lastName);
    const newEmail = prompt('Edit Email', cls.email);
    const newPhoneNumber = prompt('Edit Phone Number', cls.phoneNumber);
    const newDob = prompt('Edit Date Of Birth', cls.dob);
    const newQualification = prompt('Edit Qualification', cls.qualification);
    const newGender = prompt('Edit Gender', cls.gender);

    if (newFirstName && newLastName && newEmail && newPhoneNumber && newDob && newQualification && newGender) {
      const updatedClass = { firstName: newFirstName, lastName: newLastName, email: newEmail, phoneNumber: newPhoneNumber, dob: newDob, qualification: newQualification, gender: newGender };

      const updateClass = async () => {
        try {
          await updateDoc(doc(db, 'classes', id), updatedClass);
          setClasses(classes.map(cls =>
            cls.id === id ? { ...cls, ...updatedClass } : cls
          ));
        } catch (error) {
          console.error('Error updating class:', error);
        }
      };

      updateClass();
    }
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
      marginLeft: '15px',
      fontSize: '30px',
      color: 'red',
    },
  };

  return (
    <div style={styles.container}>
      <Dashboard />
      <h1 style={styles.heading}>Class List</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={() => window.location.href = '/class/class-form'}>
          Add Class
        </button>
      </div>
      <div style={styles.centeredTableContainer}>
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table style={styles.table} aria-label="class list table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeadCell}>First Name</TableCell>
                <TableCell style={styles.tableHeadCell}>Last Name</TableCell>
                <TableCell style={styles.tableHeadCell}>Email</TableCell>
                <TableCell style={styles.tableHeadCell}>Phone Number</TableCell>
                <TableCell style={styles.tableHeadCell}>Date Of Birth</TableCell>
                <TableCell style={styles.tableHeadCell}>Qualification</TableCell>
                <TableCell style={styles.tableHeadCell}>Gender</TableCell>
                <TableCell style={styles.tableHeadCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((cls, index) => (
                <TableRow
                  key={cls.id}
                  style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
                >
                  <TableCell style={styles.tableBodyCell}>{cls.firstName}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{cls.lastName}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{cls.email}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{cls.phoneNumber}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{cls.dob}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{cls.qualification}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{cls.gender}</TableCell>
                  <TableCell style={styles.tableBodyCell}>
                    <MdEdit
                      style={{ ...styles.iconButton, color: 'green' }}
                      onClick={() => handleEdit(cls.id)}
                      title="Edit"
                    />
                    <MdDelete
                      style={styles.iconButton}
                      onClick={() => handleDelete(cls.id)}
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

export default ClassList;
