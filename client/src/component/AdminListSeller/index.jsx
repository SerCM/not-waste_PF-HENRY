import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSellers, disableSeller, restoreSeller } from "../../redux/actions";

import NavBar from "../NavBar/index";
import Footer from "../Footer/index";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./AdminListSeller.css";

export default function AdminListSeller() {
  const dispatch = useDispatch();
  const allSellers = useSelector((state) => state.seller);
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
      {allSellers?.map((se, i) => {
        return (
          <div className="container">
            <Card>
              <Card.Body className={se.deletedAt ? "resaltar" : "sinResaltar"}>
                <div className="d-flex">
                  <img
                    src={se.image}
                    alt="imgSeller"
                    height="250px"
                    width="250px"
                    className="imgadmin"
                  />
                  <div className="contadminseller">
                    <h2>Nombre: {se.name}</h2>
                    <h4>Categoria: {se.category}</h4>
                    <h5>Ciudades: {se.cities.map((e) => e.name)}</h5>
                    <div className="mt-5">
                      <Button
                        name={se.id}
                        onClick={(e) => handleDisableSeller(e)}
                        variant="danger"
                      >
                        Deshabilitar
                      </Button>
                      <Button
                        name={se.id}
                        onClick={(e) => handleRestoreSeller(e)}
                        variant="success"
                        className="ms-5"
                      >
                        Habilitar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
