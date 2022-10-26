import { v4 as uuidv4 } from "uuid";
import React from 'react'
import { useSelector } from "react-redux";
import { cancelado, entregado } from "./middleware";


const CreateCardsOrders = (db) => {

    let compradores = useSelector((state) => state.customer)
    // console.log(db)
    // hace referencia a que no se puede activar un producto en una fecha anterior ------------->
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;  //<------------ hace referencia a que no se puede activar un producto en una fecha anterior




    let products = db.products
    let posts = []
    let orders = []
    let ordenesDelDia = []
    let ordenesViejas = []
    let ordenesFuturas = []

    for (let i = 0; i < products.length; i++) {
        if (products[i].posts.length) products[i].posts.map(post => posts.push(post))
    }

    if (posts.length) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].orders.length) {
                posts[i].orders.map(order => orders.push(order))
            }
        }
    }

    if (orders.length) {
        ordenesDelDia = orders.filter(orden => orden.date === today)
        ordenesViejas = orders.filter(orden => orden.date < today)
        ordenesFuturas = orders.filter(orden => orden.date > today)
    }

    // console.log('products', products)
    // console.log('post', posts)
    // console.log('orders', orders)
    // console.log("deldia", ordenesDelDia)
    // console.log("viejas", ordenesViejas)
    // console.log("futuras", ordenesFuturas)
    // console.log("compradores", compradores)

     const marcarComoEntregado = (id) => {
         setTimeout(() => {
             window.location.reload()
            }, 1000);
            entregado(id)
        }
    
        const marcarComoCancelado = (id) => {
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            cancelado(id)
        }
    
    function cardOrderSellers(orden) {

   

        let comprador = compradores.find(c => c.id === orden.customerId)
        let post = posts.find(p => p.id === orden.postId)
        let producto = products.find(p => p.id === post.productId)
        let total = orden.amount * producto.price
        return <div className="list-group-item list-group-item-action list-group-item-light">
            <img className="rounded float-start pe-2" src={producto.image} alt="producto sin imagen" height="40px" />
            <figure className="text-end">
                <ul className="list-inline-end"><li className="list-inline-item">Cliente: <strong>{comprador.name}</strong></li><li className="list-inline-item">Cant: <strong>{orden.amount}</strong></li><li className="list-inline-item">Total: $<strong>{total}</strong></li></ul>
            </figure>
            <figure className="text-start">
                <ul className="list-inline">
                    <li className="list-inline-item">Prodcucto: {producto.name} |</li>
                    <li className="list-inline-item">Precio Unit. ${producto.price} |</li>
                    <li className="list-inline-item">Fecha de entrega: {orden.date}</li>
                    <li className="list-inline-item">Estado: <strong>{orden.state}</strong></li>
                    {orden.state === "confirmado" && orden.date === today && <div className="form-check form-switch m-1" onChange={() => marcarComoEntregado(orden.id)}>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" for="flexSwitchCheckDefault"><strong>Marcar el pedido como Entregado</strong></label>
                    </div>}
                    {orden.state === "confirmado" && orden.date < today && <div className="form-check form-switch m-1" onChange={() => marcarComoCancelado(orden.id)}>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" for="flexSwitchCheckDefault"><strong>Marcar el pedido como Cancelado</strong></label>
                    </div>}
                </ul>
            </figure>
        </div>
    }

    // const posteo = (e) => {
    // let data = {productId: e.target.name, date: e.target[0].value, amount: Number(e.target[1].value)}
    // registerPost(data)
    // document.getElementById(e.target.name).reset()
    // }

    // const eliminar = (e) => {
    //     setTimeout(() => {
    //         window.location.reload()
    //     }, 100);
    //     disDeleteProduct(e.target.name)
    // }

    return (
        <div>
            <br />
            <h3 key={uuidv4}>Ordenes del dia - {today}</h3>
            <div className="list-group">{ordenesDelDia ? ordenesDelDia.map(orden => cardOrderSellers(orden)) : <h1> No hay ordenes para el dia de hoy</h1>}</div>
            <br />
            <h3 key={uuidv4}>Ordenes antiguas:</h3>
            <div className="list-group">{ordenesViejas ? ordenesViejas.map(orden => cardOrderSellers(orden)) : <h1> No hay ordenes para el dia de hoy</h1>}</div>
            <br />
            <h3 key={uuidv4}>Proximas ordenes:</h3>
            <div className="list-group">{ordenesFuturas ? ordenesFuturas.map(orden => cardOrderSellers(orden)) : <h1> No hay ordenes para el dia de hoy</h1>}</div>
            <br />
        </div>
    )

}

export default CreateCardsOrders