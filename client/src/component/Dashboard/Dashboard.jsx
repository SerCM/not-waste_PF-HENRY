import React, { PureComponent } from "react";
import "./dashboard.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomer, getOrders, getSellers } from "../../redux/actions";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import DashboardUsersRegistered from "../DashboardUsersRegistered/DashboardUsersRegistered";
import DashboardCategories from "../DashboardCategorySeller/DashboardCategories";
import DashboardOrders from "../DashboardOrders/DashboardOrders";


function Dashboard() {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customer)
    const sellers = useSelector(state => state.seller)
    const orders = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getSellers());
        dispatch(getOrders());
    }, [dispatch]);

    return (

        <div>
            <h1>Dashboard Admin</h1>
            <DashboardUsersRegistered customers={customers} sellers={sellers} />
            <DashboardCategories sellers={sellers}/>
            <DashboardOrders orders={orders} />
             {/*<DashboardCumpliments /> */}
        </div>
    )
}

export default Dashboard;