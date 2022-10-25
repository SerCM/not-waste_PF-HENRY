import AuthProfile from "../AuthProfile";
import NavBar from "../NavBar";
import VerifyProfile from "../VerifyProfile";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import createCardsOrders from "./auxiliary";

function ViewOrderSeller() {

    //esta es la linea que tiene que estar funcionando ------->
    let log = AuthProfile("profile"); // esto puede ser {}, true o false
    let db = VerifyProfile(log.email);
    // <------------ esta es la linea que tiene que estar funcionando
    // let db = VerifyProfile("sweetlove@gmail.com"); //<------------ linea hardcore

    return (
        <>
            <NavBar />
            {!db.exists && <h1> debe ser un usuario registrado para utilizar esta sesion</h1>}
            {db.exists && db.type === "customer" && <h1>Los clientes no pueden cargar productos, sera redirigilo al Home</h1>}
            {db.exists && db.type === "customer" && setTimeout(() => {
                window.location.assign("http://localhost:3000/home");
            }, 5000)}
            {db.type === "seller" && !db.products.length && <h1> Aun no tiene productos cargados, por favor dirijase a <Link to="/formproduct"> creacion de productos!
            </Link></h1>}
            {db.type === "seller" && db.products.length && createCardsOrders(db)}
            <Footer />
        </>
    )
}

export default ViewOrderSeller