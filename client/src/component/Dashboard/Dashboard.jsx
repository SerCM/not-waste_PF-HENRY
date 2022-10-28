import React, { PureComponent } from "react";
import "./dashboard.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomer, getSellers } from "../../redux/actions";
import DashboardUsersRegistered from "../DashboardUsersRegistered/DashboardUsersRegistered";

function Dashboard() {
    return (

        <div>
            <DashboardUsersRegistered/>
        </div>
    )
}

export default Dashboard;