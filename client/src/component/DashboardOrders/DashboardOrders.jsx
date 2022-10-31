import React, { PureComponent } from "react";
import "./dashboard.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardOrders({ orders }) {
    const data = [
        {
            name: 'Ordenes recibidas',
            pendiente: orders?.filter(o => o.state === 'pendiente').length,
            confirmado: orders?.filter(o => o.state === 'confirmado').length,
            entregado: orders?.filter(o => o.state === 'entregado').length,
            cancelado: orders?.filter(o => o.state === 'cancelado').length
        }
    ];

    return (

        <div>

            <div className="containerCarousel">
                <h2 className="sellerTitle">Ordenes realizadas</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={150} height={40} data={data} margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cancelado" fill="#0088FE" />
                        <Bar dataKey="pendiente" fill="#FF8042" />
                        <Bar dataKey="confirmado" fill="#FFBB28" />
                        <Bar dataKey="entregado" fill="#00C49F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}


export default DashboardOrders;