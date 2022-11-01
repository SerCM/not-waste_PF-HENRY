import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomer, disabledCustomer, restoreCustomer } from "../../redux/actions";

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
  // console.log(allCustomer, 'SOY CUSTOMER')

  useEffect(() => {
    dispatch(getCustomer())
  }, [dispatch])

  function handleDisabledCustomer(e) {
    dispatch(disabledCustomer(e.target.name));
    window.location.reload(true)
  }

  function handleRestoreCustomer(e) {
    dispatch(restoreCustomer(e.target.name));
    window.location.reload(true)
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
      {
        db.type === 'manager' ?
          allCustomer?.map((cu, i) => {
            return (
              <div className="row justify-content-center" key={i}>
                <div className="col-auto p-5">
                  <Card className='cardbox'>
                    <Card.Body className={cu.deletedAt ? "resaltar" : "sinResaltar"}>
                      <div className="d-flex">
                        <div className="contadminseller mx-5">
                          <h2>Nombre: {cu.name}</h2>
                          <h3>Email: {cu.email}</h3>
                          <div className="mt-5">
                            <Button
                              name={cu.id}
                              variant="danger"
                              id="buttondeshabi"
                              onClick={(e) => handleDisabledCustomer(e)}
                            >
                              Deshabilitar
                            </Button>
                            <Button
                              name={cu.id}
                              variant="success"
                              className="ms-5"
                              id="buttondeshabi"
                              onClick={(e) => handleRestoreCustomer(e)}
                            >
                              Habilitar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            )
          }) : (
            redirigir()
          )
      }
      <Footer />
    </div>
  )
}