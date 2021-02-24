import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "./Faculty.png";

export default function FacultyHeader(props) {
    return (
        <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Faculty Dashboard</h3>
                    <div style={{ display: "flex" }}>
                        <ReactRoundedImage image={MyPhoto} roundedColor="#D1D0CE" hoverColor="#4863A0" />
                    </div>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/faculty/viewExam">View Created Exams</Link></li>
                    <li><Link to="/faculty/createExam">Create Exam</Link></li>
                    <li><Link to="/faculty/result">Upload Result</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}