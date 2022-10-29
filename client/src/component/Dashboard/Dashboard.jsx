import React, { PureComponent } from "react";
import "./dashboard.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomer, getSellers } from "../../redux/actions";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import DashboardUsersRegistered from "../DashboardUsersRegistered/DashboardUsersRegistered";
import DashboardCategories from "../DashboardCategorySeller/DashboardCategories";


function Dashboard() {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customer)
    const sellers = useSelector(state => state.seller)

    console.log("🚀 ~ file: Dashboard.jsx ~ line 14 ~ Dashboard ~ customers", customers)
    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getSellers());
    }, [dispatch]);


    const data = [
        { name: 'Proveedores', value: sellers?.length },
        { name: 'Consumidores', value: customers?.length },
    ];
    const COLORS = ['#FFBB28', '#FF8042'];

    // '#0088FE', '#00C49F', 
    // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';


    return (

        <div>
            <h1>Dashboard Admin</h1>
            <DashboardUsersRegistered customers={customers} sellers={sellers} />
            <DashboardCategories />
            {/* <DashboardOrders />
            <DashboardCumpliments /> */}
        </div>
    )
}

export default Dashboard;