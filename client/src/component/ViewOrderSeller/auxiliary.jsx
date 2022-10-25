import { v4 as uuidv4 } from "uuid";


export default function createCardsOrders(db) {
     console.log(db)
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
        let ordenesDelDia= []
        let ordenesViejas = []
        let ordenesFuturas = []

        for (let i = 0; i < products.length; i++) {
           if(products[i].posts.length) products[i].posts.map(post => posts.push(post))
        }
        
        if(posts.length) {
            for (let i = 0; i < posts.length; i++) {
                if(posts[i].orders.length) {
                    posts[i].orders.map(order => orders.push(order))
                }
            }
        }

        if(orders.length) {
                ordenesDelDia = orders.filter(orden => orden.date === today)
                ordenesViejas = orders.filter(orden => orden.date < today)
                ordenesFuturas = orders.filter(orden => orden.date > today)
        }

        console.log('products', products)
        console.log('post', posts)
        console.log('orders', orders)
        console.log("deldia" , ordenesDelDia)
        console.log("viejas" , ordenesViejas)
        console.log("futuras" , ordenesFuturas)

        function cardOrderSellers(orden) {
            let post = posts.find(p => p.id === orden.postId)
            let producto = products.find(p => p.id === post.productId)
            return <h1>{producto.name}</h1>
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

        return (<>
          <h1>Ordenes de el dia de hoy:</h1>
                {cardOrderSellers(ordenesDelDia[0])}
                {ordenesDelDia? ordenesDelDia.map(orden => cardOrderSellers(orden)) : <h1> No hay ordenes para el dia de hoy</h1>}
        </>
              

            // data ? data.map((e) =>
            //     <div key={uuidv4()} className="card text-bg-light w-75 m-3" height={"250px"}>
            //         <div className="row g-0">
            //             <div className="col-md-4">
            //                 <img src={e.image} className="img-fluid border border-3 rounded-5" alt="No es posible cargar la imagen" />
            //             </div>
            //             <div className="col-md-8">
            //                 <div className="card-body" >
            //                     {/* <button className="btn btn-outline-danger col-md-4 mb-2" type="button" name={e.id} onClick={(event) => eliminar(event)}>Eliminar producto</button> */}
            //                     <h5 className="card-title">Nombre: {e.name}</h5>
            //                     <p className="card-text">Descripcion: {e.description}</p>
            //                     <p className="card-text"><small className="text-muted">Precio: ${e.price}</small></p>
            //                     <p className="card-text"><small className="text-muted">Precio real: ${e.realValue}</small></p>
            //                     {/* <p className="card-text"><small className="text-muted">Stock: {e.stock}</small></p> */}
            //                     <p className="card-text"><small className="text-muted">Publicaciones activas: {e.posts.length ? e.posts.length : " Aun no publico este producto, haga click abajo para que sea visible por el cliente."}</small></p>
            //                 </div>
            //                 {/* <form id={e.id} name={e.id} onSubmit={(e) => posteo(e)}>
            //                     <div className="card-body" >
            //                         <p>Seleccione fecha y cantidad para realizar una publicacion:</p>
            //                         <input type="date" min={today} required></input>
            //                         <input id="number" type="number" min="1" max="10" required/>
            //                         <button form={e.id} type="subtmit">Publicar</button>
            //                     </div>
            //                 </form> */}
            //             </div>
            //         </div></div>) : <h1>chau</h1>
        )

    }