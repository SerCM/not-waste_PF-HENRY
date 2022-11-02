import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCustomer,
  getOrders,
  getProduct,
  putOrder,
} from "../../redux/actions";
import "./order.css";
import { Card, Badge, ListGroup, Button } from "react-bootstrap";
import NavBar from "../NavBar";
import Footer from "../Footer/index";
import OrderItem from "../OrderItem/OrderItem";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, Link } from "react-router-dom";
import { notificaciones } from "../../redux/actions";

import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";

const Order = () => {
  let { user } = useAuth0();
  const log = AuthProfile("profile"); // esto puede ser {}, true o false
  const db = VerifyProfile(log.email);

  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();

  let orderId = query.get("external_reference");

  let customers = useSelector((state) => state.customer);
  let customer = customers?.find((c) => c.email === user?.email);
  let orderFinished = customer?.orders?.filter((o) => orderId.includes(o.id));
  let orderPending = customer?.orders?.filter((o) => orderId.includes(o.id) && o.state === "pendiente")
  console.log("🚀 ~ file: index.jsx ~ line 37 ~ Order ~ orderPending", orderPending)
  let products = useSelector((state) => state.product);
  const dispatch = useDispatch();
    useEffect(() => {
    if (orderPending?.length > 0 ) {
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
      orderFinished?.map(of => dispatch(putOrder(of?.id, { state: "confirmado" })));
      dispatch(getOrders());
      dispatch(
        notificaciones({
          email: db.email,
          mensaje: "Gracias por su compra en not Waste, vuelva pronto",
        })
      );
    }
  }, [orderFinished, dispatch]);

  ///////////////////////////////////////////////
  useEffect(() => {
    dispatch(getCustomer());
    dispatch(getProduct());
    dispatch(getOrders());
  }, [dispatch]);

  let ordersInProgress = customer?.orders.filter(
    (order) => order.state !== "entregado"
  );

  let ordersInProgressId = ordersInProgress?.map((o) => {
    return o.postId;
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

  let i = 0;
  let j = 0;

  const redirigir = (tipo) => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 7000);
    if (tipo === "manager")
      return (
        <div>
          <h2>
            Esta seccion muestra los pedidos realizados por sus compradores.
          </h2>
          <br />
          <h4>
            Su usuario "administrador" no tiene datos para mostrar en esta
            seccion. Sera redirigido a la pagina principal.
          </h4>
        </div>
      );
    if (tipo === "seller")
      return (
        <div>
          <h2>Esta seccion muestra los pedidos realizados por compradores.</h2>
          <br />
          <h4>
            Su usuario "Vendedor" no tiene datos para mostrar en esta seccion.
            Sera redirigido a la pagina principal.
          </h4>
        </div>
      );
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
  };

  return (
    <>
      <NavBar />
      {db.exists && db.type === "customer" && db.deletedAt === null && (
        <Card className="w-50 mx-auto mt-5 mb-50">
          <div className="d-flex position-relative justify-content-center">
            <Card.Title className="text-white fw-bold bg-light rounded p-2 ">
              <span className="text-dark text-uppercase justify-content-center">
                Mis pedidos
              </span>
            </Card.Title>
           
          </div>
          <Card.Body className="p-0">
          {ordersInProgress.length < 1 && ordersFinished.length < 1
            && 
            <Card.Subtitle variant="flush" className="d-flex justify-content-center">Aún no se han realizado pedidos</Card.Subtitle>}
            <ListGroup variant="flush">
              {ordersInProgress.length > 0 && 
              <ListGroup.Item className="d-flex justify-content-between">
                <div className="d-flex row">
                  <Card.Subtitle className="mb-2 text-muted ">
                    Pedidos en curso
                  </Card.Subtitle>
                  {productOrderInProgress?.map((p) => {
                    return (
                      <div key={i++}>
                        <Link
                          className="link"
                          to={`/orderDetial/${ordersInProgress[i].id}`}
                        >
                          <OrderItem product={p} order={ordersInProgress[i]} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </ListGroup.Item>}
              {orderFinished &&
                <ListGroup.Item className="d-flex justify-content-between">
                <div className="d-flex row">
                  <Card.Subtitle className="mb-2 text-muted">
                    Pedidos finalizados
                  </Card.Subtitle>
                  {productOrderFinished?.map((p) => {
                    return (
                      <div key={j++}>
                        <Link
                          className="link"
                          to={`/orderDelivered/${ordersFinished[j].id}`}
                        >
                          <OrderItem product={p} order={ordersFinished[j]} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </ListGroup.Item>}
            </ListGroup>
          </Card.Body>
          <Card.Footer className="mb-4"></Card.Footer>
        </Card>
      )}
      {db.exists &&
        db.type === "customer" &&
        db.deletedAt !== null &&
        redirigir("bloqueado")}
      {db.exists && db.type !== "customer" && redirigir(db.type)}
      {db.exists === false && (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <Footer className="footer-orders" />
    </>
  );
};

export default Order;
