import React, { PureComponent } from "react";
import "./dashboard.css";
import { PieChart, Pie, Legend, Cell } from 'recharts';

function DashboardCategories({sellers}) {
    const data = [
        { name: 'Supermercados', value: sellers?.filter((s) => s.category === 'supermercado').length },
        { name: 'Panaderías', value: sellers?.filter((s) => s.category === 'panaderia').length },
        { name: 'Restaurantes', value: sellers?.filter((s) => s.category === 'restaurante').length }
    ]
    const COLORS = ['#FFBB28', '#FF8042', '#0088FE'];
    return (

        <div>
            
            <div className="containerCarousel">
                <h2 className="sellerTitle">Vendedores: categorías</h2>
                <PieChart width={400} height={250} onMouseEnter={PureComponent.onPieEnter}>
                    <Pie
                        data={data}
                        cx={250}
                        cy={100}
                        innerRadius={40}    
                        outerRadius={80}
                        fill="#8884d8"
                        label={data}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS?.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </div>
        </div>
    )
}


export default DashboardCategories;