import React, { PureComponent } from "react";
import "./dashboard.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomer, getSellers } from "../../redux/actions";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

function DashboardCategories() {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customer)
    const sellers = useSelector(state => state.seller)

    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getSellers());
    }, [dispatch]);

    
    return (
        <div>Seller</div>
    )
}

export default DashboardCategories;