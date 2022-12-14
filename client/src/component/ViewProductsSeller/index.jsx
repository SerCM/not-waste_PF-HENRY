import AuthProfile from "../AuthProfile";
import NavBar from "../NavBar";
import VerifyProfile from "../VerifyProfile";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import Createcards from "./auxiliary";
import "../ViewProductsSeller/viewproductseller.css";

function ViewProductSeller() {

  let log = AuthProfile("profile"); // esto puede ser {}, true o false
  let db = VerifyProfile(log.email);


  const redirigir = (tipo) => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 7000);
    if (tipo === "manager") return (
      <div>
        <h2>
          Esta seccion muestra los productos cargados por cada uno de sus vendedores.
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
    if (tipo === "bloqueado")
      return (
        <div>
          <h4>
            Su usuario se encuentra bloqueado.
            <br />
            Sera redirigido a la pagina principal.
          </h4>
        </div>
      );
  }

  return (
    <>
      <NavBar />
      {db.exists === false && <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      {db.type === "seller" && db.deletedAt === null && db.products.length &&  <div className="d-flex justify-content-center my-5">
        <h1>Mis productos</h1>
      </div>} 
      {db.type === "seller" && db.deletedAt === null && db.products.length && Createcards(db.products)}
      {db.type === "seller" && db.deletedAt === null && !db.products.length &&
        <h1>
          <br />
          Aun no tiene productos cargados, por favor dirijase a <Link to="/formproduct"> creacion de productos!</Link>
        </h1>}
      {db.exists && db.type === "seller" && db.deletedAt !== null && redirigir("bloqueado")}
      {db.exists && db.type !== "seller" && redirigir(db.type)}
      <Footer />
    </>
  );
}

export default ViewProductSeller;
