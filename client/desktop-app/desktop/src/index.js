import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AdminDashboard from "./Admin/AdminDashboard"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import AddAdmins from './Admin/AddAdmins';
import AddFaculties from './Admin/AddFaculties';
import AddStudent from './Admin/AddStudents';
import DIsplayAdmins from './Admin/DisplayAdmin';
import DisplayStudents from './Admin/DisplayStudents';
import DisplayFaculties from './Admin/DisplayFaculties';
import FacultyDashboard from './Faculty/FacultyDashboard';
import ViewExams from './Faculty/ViewExam';
import CreateExam from './Faculty/CreateExam';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={ App } />
          <Route path="/admin" exact component={ AdminDashboard } />
          <Route path="/admin/admins" exact component={AddAdmins} />
          <Route path="/admin/faculties" exact component={AddFaculties} />
          <Route path="/admin/students" exact component={AddStudent} />
          <Route path="/admin/display/admins" exact component={DIsplayAdmins} />
          <Route path="/admin/display/students" exact component={DisplayStudents} />
          <Route path="/admin/display/faculties" exact component={DisplayFaculties} />
          <Route path="/faculty/viewExam" exact component={ViewExams} />
          <Route path="/faculty/createExam" exact component={CreateExam} />
        </div>
      </BrowserRouter>
  </React.StrictMode>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
