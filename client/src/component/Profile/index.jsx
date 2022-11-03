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

  const redirigir = (tipo) => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 7000);
    if (tipo === "manager") return (
      <div>
        <h2>Esta seccion muestra los datos de perfil de sus vendedores y compradores.
        </h2>
        <br />
        <h4>
          Su usuario "administrador" no tiene datos para mostrar en esta seccion. Sera redirigido a la pagina principal.
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
      <Navbar />
      {db.exists === false && <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      <div className="d-flex justify-content-center my-5">
        <h1>Mi Perfil</h1>
      </div>
      {db.exists && db.deletedAt === null && db.type === "customer" &&
        <div className="position-relative">
          <div className="card text-center w-50 start-50 translate-middle-x">
            <div className="card-body">
              <h5 className="card-title">Nombre: {db.name}</h5>
              <p className="card-text"> {db.email}</p>
            </div>
          </div>
        </div>
      }
      {db.exists && db.deletedAt === null && db.type === "seller" &&
        <div className="position-relative">
          <div className="card text-center w-50 start-50 translate-middle-x">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <img alt="asd" src={db.image} height="100px" />
              </ListGroup.Item>
              <ListGroup.Item className="textx-capitalice">
                <strong>Nombre:</strong> {db.name}
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
          </div>
        </div>
      }
      {db.exists && db.deletedAt !== null && redirigir("bloqueado")}
      {db.exists && db.type === "manager" && redirigir(db.type)}
      <Footer />
    </>
  );
}

export default Profile;
