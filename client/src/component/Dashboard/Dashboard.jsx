import React, { useState } from "react";
import "./dashboard.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomer, getSellers } from "../../redux/actions";

function Dashboard() {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customer)
    const sellers = useSelector(state => state.seller)

    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getSellers());
    }, [dispatch]);


    return (

        <div>
            <div>Dashboard Admin</div>
            <div className="containerCarousel">
                <h1 className="sellerTitle">
                    Usuarios registrados
                </h1>
                <h2>Consumidores</h2>
                <p>{customers?.length}</p>
                <h2>Proveedores</h2>
                <p>{sellers?.length}</p>
            </div>
            <div className="containerCarousel">
                <h1 className="sellerTitle">
                    Publicaciones realizadas vs ventas concretadas
                </h1>
            </div>
            <div className="containerCarousel">
                <h1 className="sellerTitle">
                    Reclamos
                </h1>
            </div>
        </div>
    )
}

export default Dashboard;