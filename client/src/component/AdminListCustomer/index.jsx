import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomer, disabledCustomer, restoreCustomer } from "../../redux/actions";
import { notificaciones } from "../../redux/actions";

import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";

import NavBar from "../NavBar/index";
import Footer from "../Footer/index";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function AdminListCustomer() {
  const dispatch = useDispatch();

  let log = AuthProfile("profile"); // esto puede ser {}, true o false
  let db = VerifyProfile(log.email);

  const allCustomer = useSelector(state => state.customer)
  

  useEffect(() => {
    dispatch(getCustomer());
    dispatch(disabledCustomer());
    dispatch(restoreCustomer());
  }, [dispatch])

  function handleDisabledCustomer(e, email) {
    dispatch(disabledCustomer(e.target.name));
    dispatch(getCustomer());
    dispatch(
      notificaciones({
        email: email,
        mensaje: "Su usuario ha sido deshabilitado por incumplimiento de normas, el administrar se pondrá en contacto con usted.",
      })
    )
  }

  function handleRestoreCustomer(e, email) {
    dispatch(restoreCustomer(e.target.name));
    dispatch(getCustomer());
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
          <h1>Consumidores registrados</h1>
        </div>}

      {db.exists && db.type === "manager" &&
        allCustomer?.map((cu, i) => {
          return (
            <div className="row justify-content-center" key={i}>
              <div className="col-auto p-5">
                <Card style={{ width: '700px' }} className='cardbox'>
                  <Card.Body className={cu.deletedAt ? "resaltar" : "sinResaltar"}>
                    <div className="d-flex">
                      <div className="contadminseller mx-5">
                        <h2>Nombre: {cu.name}</h2>
                        <h3>Email: {cu.email}</h3>
                        <div className="mt-5">
                          {!cu?.deletedAt ? 
                          <Button
                              className="btn-deshabilitar"
                              name={cu.id}
                              variant="danger"
                              id="buttondeshabi"
                              onClick={(e) => handleDisabledCustomer(e, cu?.email)}
                            >
                              Deshabilitar
                             </Button>
                            : <Button
                            className="btn-habilitar ms-5"
                              name={cu.id}
                              variant="success"
                              id="buttondeshabi"
                              onClick={(e) => handleRestoreCustomer(e, cu?.email)}
                            >
                              Habilitar
                            </Button> 
          }
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )
        })}
      {db.exists && db.type !== "manager" && redirigir()}


      <Footer />
    </div>
  )
}