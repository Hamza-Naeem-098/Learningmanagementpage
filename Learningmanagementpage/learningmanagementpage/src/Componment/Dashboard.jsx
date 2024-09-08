
import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Config.jsx/Firebase';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate
  const [open, setOpen] = useState(true);
  const [listOpen, setListOpen] = useState({
    student: false,
    teacher: false,
    subject: false,
    syllabus: false,
    school: false,
    class: false,
    fees: false,
    admission: false,
    exam: false,
  });

  const [students, setStudents] = useState([]);

  const handleAddStudent = (student) => {
    setStudents([...students, student]);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (key) => {
    setListOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/'); // Redirect to login page on successful logout
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
          >
            <Typography variant="body1" noWrap component="div">
              Logout
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav">
          {/* Student Section */}
          <ListItemButton onClick={() => handleClick('student')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Student" />
            {listOpen.student ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.student} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/student/student-registration">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Student Registration Form" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/student/student-list">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Student List" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Teacher Section */}
          <ListItemButton onClick={() => handleClick('teacher')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Teacher" />
            {listOpen.teacher ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.teacher} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/teacher/teacher-registration">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Teacher Registration" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/teacher/teacher-list">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Teacher List" />
              </ListItemButton>
            </List>
          </Collapse>
          
           {/* Subject Section */}
           <ListItemButton onClick={() => handleClick('subject')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Subject" />
            {listOpen.subject ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.subject} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/subject/subject-add">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Subjects Add" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/subject/subject-list">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Subject List" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Syllabus Section */}
          <ListItemButton onClick={() => handleClick('syllabus')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Syllabus" />
            {listOpen.syllabus ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.syllabus} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/syllabus/syllabus-form">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Syllabus Form" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/syllabus/syllabus-list">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Syllabus List" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* School Section */}
          <ListItemButton onClick={() => handleClick('school')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="School" />
            {listOpen.school ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.school} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/student/student-registration">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Student Registration" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/teacher/teacher-registration">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Teacher Registration" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Class Section */}
          <ListItemButton onClick={() => handleClick('class')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Class" />
            {listOpen.class ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.class} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/class/class-form">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Class Form" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/class/class-list">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Class List" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Fees Section */}
          <ListItemButton onClick={() => handleClick('fees')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Fees" />
            {listOpen.fees ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.fees} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/fees/fees-structure">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Fees Structure" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/fees/fees-voucher">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Fees Voucher" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/fees/fees-submission">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Fees Submission" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Admission Section */}
          <ListItemButton onClick={() => handleClick('admission')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Admission" />
            {listOpen.admission ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.admission} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/admission/admission-form">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Admission Form" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Exam Section */}
          <ListItemButton onClick={() => handleClick('exam')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Exam" />
            {listOpen.exam ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listOpen.exam} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/exam/exam-schedule">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Exam Schedule" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/exam/exam-result">
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Exam Result" />
              </ListItemButton>
            </List>
          </Collapse>
   
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet context={{ students, handleAddStudent }} />
      </Box>
    </Box>
  );
}










