import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "../admin.png";

export default function AdminHeader(props) {
    return (
        <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3> Admin Dashboard</h3>
                    <div style={{ display: "flex" }}>
                        <ReactRoundedImage image={MyPhoto} hoverColor="#D1D0CE"/>
                    </div>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/admin/faculties">Add Faculties</Link></li>
                    <li><Link to="/admin/students"> Add Students</Link></li>
                    <li><Link to="/admin/admins">Add Admins</Link></li>
                    <li><Link to="/admin/display/faculties">Display Faculties</Link></li>
                    <li><Link to="/admin/display/students">Display students</Link></li>
                    <li><Link to="/admin/display/admins">Display admins</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}