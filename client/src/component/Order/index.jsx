import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer, getProduct, putOrder } from "../../redux/actions";
import "./order.css";
import { Card, Badge, ListGroup, Button } from "react-bootstrap";
import NavBar from "../NavBar";
import Footer from "../Footer/index";
import OrderItem from "../OrderItem/OrderItem";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useLocation, Link } from "react-router-dom";

const Order = () => {
  let { user } = useAuth0();

  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();

  let postIdToModify = query.get('external_reference')

  let customers = useSelector((state) => state.customer);
  let customer = customers?.find((c) => c.email === user?.email);
  let orderFinished = customer?.orders?.find(o => o.postId === postIdToModify)
  let products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  if (orderFinished) {
    dispatch(putOrder(orderFinished?.id, {state: 'confirmado'}));
  }

  
  useEffect(() => {
    dispatch(getCustomer());
    dispatch(getProduct());
  }, []);

  let ordersInProgress = customer?.orders.filter(
    (order) => order.state !== "entregado"
  );


  let ordersInProgressId = ordersInProgress?.map((p) => {
    return p.postId;
  });
  let productOrderInProgress = ordersInProgressId?.map((post) =>
    products.find((prod) => prod.posts.find((p) => p.id === post))
  );

  
  let ordersFinished = customer?.orders.filter(
    (order) => order.state === "entregado"
  );
  let ordersFinishedId = ordersFinished?.map((p) => {
    return p.postId;
  });
  let productOrderFinished = ordersFinishedId?.map((post) =>
    products.find((prod) => prod.posts.find((p) => p.id === post))
  );

  const params = useParams(); //No esta trayendo los parametros
  let orderConfirmed = customer?.orders.find(
    (order) => order.payId === params.preference_id
  );

  if (orderConfirmed) {
    console.log("🚀 ~ file: index.jsx ~ line 65 ~ Order ~ orderConfirmed", orderConfirmed)
    putOrder(orderConfirmed.id, { state: "confirmado" });
  }

  let i = 0;
  let j = 0;
  return (
    <>
      <NavBar />
      <Card className="w-50 mx-auto mt-16 mb-50">
        <div className="d-flex position-relative justify-content-center">
          <Card.Title className="text-white fw-bold bg-light rounded p-2 ">
            <span className="text-dark text-uppercase justify-content-center">
              Mis pedidos
            </span>
          </Card.Title>
        </div>
        <Card.Body className="p-0">
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between">
              <div className="d-flex row">
                <Card.Subtitle className="mb-2 text-muted ">
                  Pedidos en curso
                </Card.Subtitle>
                {productOrderInProgress?.map((p) => {
                  return (
                  <div key={i++}>
                    <Link to={`/orderDetial/${ordersInProgress[i].id}`}>
                      <OrderItem product={p} order={ordersInProgress[i]} />
                    </Link>
                  </div>
                  );
                })}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between">
              <div className="d-flex row">
                <Card.Subtitle className="mb-2 text-muted">
                  Pedidos finalizados
                </Card.Subtitle>
                {productOrderFinished?.map((p) => {
                  return (
                    <div key={j++}>
                    <Link to={`/orderDelivered/${ordersFinished[j].id}`}>
                      <OrderItem product={p} order={ordersFinished[j]} />
                    </Link>
                    </div>
                  );
                })}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="mb-4"></Card.Footer>
      </Card>
      <Footer className="footer-orders" />
    </>
  );
};

export default Order;
