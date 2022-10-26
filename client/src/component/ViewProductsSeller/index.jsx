import AuthProfile from "../AuthProfile";
import NavBar from "../NavBar";
import VerifyProfile from "../VerifyProfile";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import Createcards from "./auxiliary";
import "../ViewProductsSeller/viewproductseller.css";

function ViewProductSeller() {
  //esta es la linea que tiene que estar funcionando ------->
  let log = AuthProfile("profile"); // esto puede ser {}, true o false
  let db = VerifyProfile(log.email);
  // <------------ esta es la linea que tiene que estar funcionando
  // let db = VerifyProfile("sweetlove@gmail.com"); //<------------ linea hardcore

  return (
    <>
      <NavBar />
      {!db.exists && (
        <h1> debe ser un usuario registrado para utilizar esta sesion</h1>
      )}
      {db.exists && db.type === "customer" && (
        <h1>Los clientes no pueden cargar productos</h1>
      )}
      {db.type === "seller" && db.products.length ? (
        Createcards(db.products)
      ) : (
        <h1>
          {" "}
          Aun no tiene productos cargados, por favor dirijase a{" "}
          <Link to="/formproduct"> creacion de productos!</Link>
        </h1>
      )}
      <Footer />
    </>
  );
}

export default ViewProductSeller;
