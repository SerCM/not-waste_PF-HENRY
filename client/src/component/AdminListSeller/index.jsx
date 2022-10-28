import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSellers, disableSeller, restoreSeller } from "../../redux/actions";

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
  // console.log(db)

  useEffect(() => {
    dispatch(getSellers());
  }, [dispatch]);

  function handleDisableSeller(e) {
    dispatch(disableSeller(e.target.name));
    window.location.reload(true);
  }

  function handleRestoreSeller(e) {
    dispatch(restoreSeller(e.target.name));
    window.location.reload(true);
  }

  return (
    <div>
      <NavBar />
      <h1 className="text-center">Lista de proveedores</h1>
        {
          db.type === 'manager' ? 
          allSellers?.map((se, i) => {
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
                          <h4>Categoria: {se.category}</h4>
                          <h5>Ciudades: {se.cities.map((e) => e.name)}</h5>
                          <div className="mt-5">
                            <Button
                              name={se.id}
                              onClick={(e) => handleDisableSeller(e)}
                              variant="danger"
                              id="buttondeshabi"
                            >
                              Deshabilitar
                            </Button>
                            <Button
                              name={se.id}
                              onClick={(e) => handleRestoreSeller(e)}
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
            );
          }) : (
            <div>
              <h2>¡Panel unicamente habilidato para administradores!</h2>
            </div>
          )
        }
      <Footer />
    </div>
  );
}
