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
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const fetchSubjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'subjects'));
      const subjectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubjects(subjectsList);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'subjects', id));
      setSubjects(subjects.filter(subject => subject.id !== id));
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const handleEdit = (id) => {
    const subject = subjects.find(subject => subject.id === id);
    const newSubjectName = prompt('Edit Subject Name', subject.subjectName);
    const newClassName = prompt('Edit Class Name', subject.className);
    const newGroup = prompt('Edit Group', subject.selectedGroup);

    if (newSubjectName && newClassName && newGroup) {
      const updatedSubject = { subjectName: newSubjectName, className: newClassName, selectedGroup: newGroup };

      const updateSubject = async () => {
        try {
          await updateDoc(doc(db, 'subjects', id), updatedSubject);
          setSubjects(subjects.map(subject =>
            subject.id === id ? { ...subject, ...updatedSubject } : subject
          ));
        } catch (error) {
          console.error('Error updating subject:', error);
        }
      };

      updateSubject();
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
      marginLeft: '10px',
      fontSize: '30px',  
      color: 'red',  
    },
  };

  return (
    <div style={styles.container}>
      <Dashboard />
      <h1 style={styles.heading}>Subject List</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={() => navigate('/subject/subject-add')}>
          Add
        </button>
      </div>
      <div style={styles.centeredTableContainer}>
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table style={styles.table} aria-label="subject list table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeadCell}>Subject Name</TableCell>
                <TableCell style={styles.tableHeadCell}>Class</TableCell>
                <TableCell style={styles.tableHeadCell}>Group</TableCell>
                <TableCell style={styles.tableHeadCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject, index) => (
                <TableRow
                  key={subject.id}
                  style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
                >
                  <TableCell style={styles.tableBodyCell}>{subject.subjectName}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{subject.className}</TableCell>
                  <TableCell style={styles.tableBodyCell}>{subject.selectedGroup}</TableCell>
                  <TableCell style={styles.tableBodyCell}>
                    <MdEdit
                      style={{ ...styles.iconButton, color: 'green' }} // Set color to green
                      onClick={() => handleEdit(subject.id)} // Handle edit logic
                      title="Edit"
                    />
                    <MdDelete
                      style={styles.iconButton}
                      onClick={() => handleDelete(subject.id)} // Handle delete logic
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
