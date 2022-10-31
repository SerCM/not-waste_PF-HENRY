import AuthProfile from "../AuthProfile";
import NavBar from "../NavBar";
import VerifyProfile from "../VerifyProfile";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import CreateCardsOrders from "./auxiliary";

// const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI


function ViewOrderSeller() {

    let log = AuthProfile("profile"); // esto puede ser {}, true o false
    let db = VerifyProfile(log.email);


    const redirigir = (tipo) => {
        setTimeout(() => {
            window.location.replace("/home");
        }, 7000);
        if (tipo === "manager") return (
            <div>
                <h2>
                    Esta seccion muestra las ordenes correspondiente a cada uno de sus vendedores.
                </h2>
                <br />
                <h4>
                    Su usuario "Adminitrador" no tiene datos para mostrar en esta seccion.  Sera redirigido a la pagina principal.
                </h4>
            </div>)
          if (tipo === "customer") return (
            <div>
                <h2>
                    Esta seccion es para vendedores
                </h2>
                <br />
                <h4>
                    Sera redirigido a la pagina principal.
                </h4>
            </div>)
    }

    return (
        <>
            <NavBar />
            {db.exists === false && <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>}
            {db.type === "seller" && db.products.length && <CreateCardsOrders {...db} />}
            {db.type === "seller" && !db.products.length && <h1> Aun no tiene productos cargados, por favor dirijase a <Link to="/formproduct"> creacion de productos!
            </Link></h1>}
            {db.exists && db.type !== "seller" && redirigir(db.type)}
            <Footer />
        </>
    )
}

export default ViewOrderSeller