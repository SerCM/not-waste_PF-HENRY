import React, { useEffect } from "react";
import Navbar from "../NavBar/index";
import Footer from "../Footer/index";
import { getSellers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useParams();

  useEffect(() => {
    dispatch(getSellers());
  }, [dispatch]);
  const userData = useSelector((state) => state.seller);

  const filtro = userData.filter((e) => e.email === user);

  return (
    <div>
      <Navbar />
      {filtro.map((e) => {
        return (
          <>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Logo: </strong>
                <img alt="asd" src={e.image} width="50px" height="50px" />
              </ListGroup.Item>
              <ListGroup.Item className="textx-capitalice">
                <strong>Nombre: {e.name}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email: </strong>
                {e.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Número: </strong>
                {e.phone}
              </ListGroup.Item>
              <ListGroup.Item className="text-capitalize">
                <strong>Dirección: </strong>
                {e.adress}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Cuil: </strong>
                {e.cuit}
              </ListGroup.Item>
              {e.cities?.map((e) => {
                return (
                  <ListGroup.Item className="text-capitalize">
                    <strong>Ciudad: </strong>
                    {e.name}
                  </ListGroup.Item>
                );
              })}
              <ListGroup.Item className="text-capitalize">
                <strong>categoria: </strong>
                {e.category}
              </ListGroup.Item>
            </ListGroup>
          </>
        );
      })}
      <Footer />
    </div>
  );
}

export default Profile;
