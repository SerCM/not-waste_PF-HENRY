import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomer } from "../../redux/actions";

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
  console.log(allCustomer, 'SOY CUSTOMER')

  useEffect(() => {
    dispatch(getCustomer())
  }, [dispatch])
  return (
    <div>
      <NavBar />
      {
        db.type === 'manager' ?
          allCustomer?.map((cu, i) => {
            return (
              <div className="row justify-content-center">
                <div className="col-auto p-5">
                  <Card className='cardbox'>
                    <Card.Body>
                      <div className="d-flex">
                        <div className="contadminseller mx-5">
                          <h2>Nombre: {cu.name}</h2>
                          <h3>Email: {cu.email}</h3>
                          <div className="mt-5">
                            <Button
                              name={cu.id}
                              variant="danger"
                              id="buttondeshabi"
                            >
                              Deshabilitar
                            </Button>
                            <Button
                              name={cu.id}
                              variant="success"
                              className="ms-5"
                              id="buttondeshabi"
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
            <div>Panel unicamente habilitado para administradores</div>
          )
      }
      <Footer />
    </div>
  )
}