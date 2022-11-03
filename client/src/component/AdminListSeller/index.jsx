import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSellers, disableSeller, restoreSeller } from "../../redux/actions";
import { notificaciones } from "../../redux/actions";

import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";

import NavBar from "../NavBar/index";
import Footer from "../Footer/index";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./AdminListSeller.css";

export default function AdminListSeller() {
  const dispatch = useDispatch();
  const allSellers = useSelector((state) => state.seller);

  let log = AuthProfile("profile"); // esto puede ser {}, true o false
  let db = VerifyProfile(log.email);

  useEffect(() => {
    dispatch(getSellers());
    dispatch(disableSeller());
    dispatch(restoreSeller());
  }, [dispatch]);

  async function handleDisableSeller(e, email) {
 
    dispatch(disableSeller(e.target.name));
    dispatch(getSellers());
    dispatch(
      notificaciones({
        email: email,
        mensaje: "Su usuario ha sido deshabilitado por incumplimiento de normas, el administrar se pondrá en contacto con usted.",
      })
    )
  
  }

  async function handleRestoreSeller(e, email) {
  
    dispatch(restoreSeller(e.target.name));
    dispatch(getSellers());
    dispatch(
      notificaciones({
        email: email,
        mensaje: "Su usuario ha sido habilitado nuevamente.",
      })
    )
  }

  const redirigir = () => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 7000);
    return (
      <div>
        <h2>
          Seccion habilitada unicamente para administradores.
        </h2>
        <br />
        <h4>
          Sera redirigido a la pagina principal.
        </h4>
      </div>)
  }

  return (
    <div>
      <NavBar />
      {db.exists === false && <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      {db.exists && db.type === "manager" &&
        <div className="d-flex justify-content-center my-5">
          <h1>Lista de proveedores</h1>
        </div>}
      {db.exists && db.type === "manager" && allSellers?.map((se, i) => {
        return (
          <div className="row justify-content-center" key={i}>
            <div className="col-auto p-5">
              <Card style={{ width: '700px' }} className='cardbox'>
                <Card.Body className={se.deletedAt ? "resaltar" : "sinResaltar"}>
                  <div className="d-flex">
                    <img
                      src={se.image}
                      alt="imgSeller"
                      height="250px"
                      width="250px"
                      className="imgadmin"
                    />
                    <div className="contadminseller mx-5">
                      <h2>Nombre: {se.name}</h2>
                      <h4>Categoría: {se.category}</h4>
                      <h5>Ciudades: {se.cities.map((e) => e.name)}</h5>
                      <div className="mt-5">
                        {!se?.deletedAt ? 
                        <Button
                          className="btn-deshabilitar"
                          name={se.id}
                          onClick={(e) => handleDisableSeller(e, se?.email)}
                          variant="danger"
                          id="buttondeshabi"
                        >
                          Deshabilitar
                        </Button>
                        : <Button
                          name={se.id}
                          onClick={(e) => handleRestoreSeller(e, se?.email)}
                          variant="success"
                          className="btn-habilitar ms-5"
                          id="buttondeshabi"
                        >
                          Habilitar
                        </Button>}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        );
      })}

      {db.exists && db.type !== "manager" && redirigir()}
      <Footer />
    </div>
  );
}
