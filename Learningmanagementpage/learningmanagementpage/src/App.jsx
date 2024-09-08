import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Componment/Dashboard';
import StudentRegistration from './Screen/Students/StudentRegistration';
import StudentList from './Screen/Students/StudentList';
import TeacherRegistration from './Screen/Teacher/TeacherRegistration';
import TeacherList from './Screen/Teacher/TeacherList';
import SubjectAdd from './Screen/Subject/SubjectAdd';
import SubjectList from './Screen/Subject/SubjectList';
import SyllabusForm from './Screen/Syllabus/SyllabusForm';
import SyllabusList from './Screen/Syllabus/SyllabusList';
import StudentRegistrationschool from './Screen/School/StudentRegistrationschool';
import TeacherRegistrationschool from './Screen/School/TeacherRegistrationschool';
import ClassForm from './Screen/Class/ClassForm';
import ClassList from './Screen/Class/ClassList';
import FeesStructure from './Screen/Fees/FeesStructure';
import FeesVoucher from './Screen/Fees/FeesVoucher';
import FeesSubmission from './Screen/Fees/FeesSubmission';
import AdmissionForm from './Screen/Admission/AdmissionForm';
import ExamSchedule from './Screen/Exam/ExamSchedule';
import ExamResult from './Screen/Exam/ExamResult';
import Login from './Screen/Login/Login';
import Signup from './Screen/Signup/Signup';

function App() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [syllabusData, setSyllabusData] = useState([]);



  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const addTeacher = (newTeacher) => {
    setTeachers([...teachers, newTeacher]);
  };

  const addSubject = (newSubject) => {
    setSubjects([...subjects, newSubject]);
  };

  const handleAddSyllabus = (newSyllabus) => {
    setSyllabusData([...syllabusData, newSyllabus]);
  };


  
  
  return (

      <>
      <Routes>


      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
       {/* Route for Student Registration */}
        <Route path="/student/student-registration" element={<StudentRegistration onAddStudent={addStudent} />} />

        {/* Route for Student List */}
        <Route path="/student/student-list" element={<StudentList  students={students} />} />
        <Route path="/teacher/teacher-registration" element={<TeacherRegistration  onAddTeacher={addTeacher}/>} />
        <Route path="/teacher/teacher-list" element={<TeacherList  teachers={teachers}/>} />
        <Route path="/subject/subject-add" element={<SubjectAdd onAddSubject={addSubject} />} />
        <Route path="/subject/subject-list" element={<SubjectList    subjects={subjects} />}/> /
        <Route path="/syllabus/syllabus-form" element={<SyllabusForm   onAddSyllabus={handleAddSyllabus} />} />
        <Route path="/syllabus/syllabus-list" element={<SyllabusList syllabusData={syllabusData} />} />   
        <Route path="/student/student-registration" element={<StudentRegistrationschool />} />
        <Route path="/teacher/teacher-registration" element={<TeacherRegistrationschool />} />
        <Route path="/class/class-form" element={<ClassForm  />} />
        <Route path="/class/class-list" element={<ClassList  />} />
        <Route path="/fees/fees-structure" element={<FeesStructure />} />
        <Route path="/fees/fees-voucher" element={<FeesVoucher />} />
        <Route path="/fees/fees-submission" element={<FeesSubmission />} />
        <Route path="/admission/admission-form" element={<AdmissionForm />} />
        <Route path="/exam/exam-schedule" element={<ExamSchedule />} />
        <Route path="/exam/exam-result" element={<ExamResult />} />



      </Routes>
      </>
  )
}

export default App;
