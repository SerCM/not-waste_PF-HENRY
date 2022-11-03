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
import NavBar from "../NavBar";
import Footer from "../Footer/index";
import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";

function Dashboard() {

    let log = AuthProfile("profile"); // esto puede ser {}, true o false
    let db = VerifyProfile(log.email);

    const dispatch = useDispatch();
    const customers = useSelector(state => state.customer)
    const sellers = useSelector(state => state.seller)
    const orders = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getSellers());
        dispatch(getOrders());
    }, [dispatch]);

    const redirigir = () => {
        setTimeout(() => {
            window.location.replace("/home");
        }, 7000);
        return (
            <div>
                <h2>
                    Seccion habilitada unicamente para administradores.
                </h2>
                <br />
                <h4>
                    Sera redirigido a la pagina principal.
                </h4>
            </div>)
    }

    return (

        <div>
            <NavBar />
            {db.exists === false && <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {db.exists && db.type === "manager" && <>
                <div className="d-flex justify-content-center my-5">
                    <h1>Dashboard</h1>
                </div>
                <DashboardUsersRegistered customers={customers} sellers={sellers} />
                <DashboardCategories sellers={sellers} />
                <DashboardOrders orders={orders} /></>}
            {db.exists && db.type !== "manager" && redirigir()}
            <Footer />
        </div>
    )
}

export default Dashboard;