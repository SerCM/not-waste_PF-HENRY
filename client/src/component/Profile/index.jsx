import React from "react"; //{ useEffect }
import Navbar from "../NavBar/index";
import Footer from "../Footer/index";
// import { getSellers } from "../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";

function Profile() {
  let log = AuthProfile("profile"); // esto puede ser {}, true o false
  let db = VerifyProfile(log.email);

  const redirigir = () => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 7000);
    return (
    <div>
      <h2>Esta seccion muestra los datos de perfil de sus vendedores y compradores.
      </h2>
      <br/>
      <h4>
        Su usuario "administrador" no tiene datos para mostrar en esta seccion. Sera redirigido a la pagina principal.
      </h4>
    </div>)
  }
  
  return (
    <>
      <Navbar />
      {db.exists && db.type === "customer" &&
        <ListGroup variant="flush">
          <ListGroup.Item className="textx-capitalice">
            <strong>Nombre: {db.name}</strong>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email: </strong>
            {db.email}
          </ListGroup.Item>
        </ListGroup>
      }
      {db.exists && db.type === "seller" &&
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Logo: </strong>
            <img alt="asd" src={db.image} width="50px" height="50px" />
          </ListGroup.Item>
          <ListGroup.Item className="textx-capitalice">
            <strong>Nombre: {db.name}</strong>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email: </strong>
            {db.email}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Número: </strong>
            {db.phone}
          </ListGroup.Item>
          <ListGroup.Item className="text-capitalize">
            <strong>Dirección: </strong>
            {db.adress}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Cuil: </strong>
            {db.cuit}
          </ListGroup.Item>
          {db.cities?.map((e) => {
            return (
              <ListGroup.Item className="text-capitalize">
                <strong>Ciudad: </strong>
                {e.name}
              </ListGroup.Item>
            );
          })}
          <ListGroup.Item className="text-capitalize">
            <strong>categoria: </strong>
            {db.category ? db.category : <h6>No hay categorias cargadas</h6>}
          </ListGroup.Item>
        </ListGroup>
      }
      {db.exists && db.type === "manager" && redirigir()}
      <Footer />
      {console.log(db)}
    </>
  );
}

export default Profile;
