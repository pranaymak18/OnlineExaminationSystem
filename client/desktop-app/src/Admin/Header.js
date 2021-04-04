import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "./Admin.png";
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
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
                    <li><Link to="/admin/faculties"><GroupAddTwoToneIcon/> Add Faculties</Link></li>
                    <li><Link to="/admin/students"><GroupAddTwoToneIcon/>  Add Students</Link></li>
                    <li><Link to="/admin/admins"><BusinessTwoToneIcon /> Add Admins</Link></li>
                    <li><Link to="/admin/display/faculties"><VisibilityTwoToneIcon/> Display Faculties</Link></li>
                    <li><Link to="/admin/display/students"><VisibilityTwoToneIcon /> Display students</Link></li>
                    <li><Link to="/admin/display/admins"><VisibilityTwoToneIcon /> Display admins</Link></li>
                    <li><Link to="/"><ExitToAppTwoToneIcon /> Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}