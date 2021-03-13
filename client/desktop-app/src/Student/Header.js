import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from './Student3.png';


function logout(){
  //  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   // document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   //document.cookie = "orgId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

   return '/' 
}
export default function StudentHeader(props) {
    return (
        <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Student Dashboard</h3>
                    <div style={{ display: "flex" }}>
                        <ReactRoundedImage image={MyPhoto} roundedColor="#D1D0CE" hoverColor="#4863A0" />
                    </div>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/student/viewExam">View Exams</Link></li>
                    <li><Link to="#">View Result</Link></li>
                    <li><Link to={logout()}>Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}