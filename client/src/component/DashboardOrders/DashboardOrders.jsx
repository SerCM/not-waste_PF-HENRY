import React, { PureComponent } from "react";
import "./dashboard.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardOrders({ orders }) {
    const data = [
        {
          name: 'Ordenes ejecutadas',
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
                    <BarChart width={150} height={40} data={data}>
                        <Bar dataKey="pendiente" fill="#FFBB28" />
                        <Bar dataKey="confirmado" fill="#FF8042" />
                        <Bar dataKey="entregado" fill="#0088FE" />
                        <Bar dataKey="cancelado" fill="#00C49F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}


export default DashboardOrders;