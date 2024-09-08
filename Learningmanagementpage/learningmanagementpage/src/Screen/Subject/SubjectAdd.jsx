import React, { useState } from 'react';
import Dashboard from '../../Componment/Dashboard';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Config.jsx/Firebase'; // Your Firebase config
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import './SubjectAdd.css'; // Import the CSS file

const SubjectAdd = () => {
  const [subjectName, setSubjectName] = useState('');
  const [className, setClassName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save subject data to Firestore
      await addDoc(collection(db, 'subjects'), {
        subjectName,
        className,
        selectedGroup,
      });

      // Clear form
      setSubjectName('');
      setClassName('');
      setSelectedGroup('');

      // Redirect to SubjectList
      navigate('/subject/subject-list');
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  return (
    <div className="registration-container">
      <Dashboard />
      <h1 className="header">Subject Add</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="subjectName">Subject Name:</label>
        <input
          id="subjectName"
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Enter your subject name"
        />
        <label htmlFor="className">Class:</label>
        <input
          id="className"
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter your class"
        />
        <label>Select Group:</label>
        <div className="gender-options">
          <input
            id="generalScience"
            type="radio"
            name="group"
            value="General Science"
            checked={selectedGroup === 'General Science'}
            onChange={(e) => setSelectedGroup(e.target.value)}
          />
          <label htmlFor="generalScience">General Science</label>
          <input
            id="preEngineering"
            type="radio"
            name="group"
            value="Pre Engineering"
            checked={selectedGroup === 'Pre Engineering'}
            onChange={(e) => setSelectedGroup(e.target.value)}
          />
          <label htmlFor="preEngineering">Pre Engineering</label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default SubjectAdd;
