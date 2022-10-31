import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prodDetail, getSellers } from "../../redux/actions";
import "./orderItem.css";
import { Card, Image } from "react-bootstrap";

const OrderItem = ({ product, order }) => {
  return (
    <>
      <div
        className={
          order?.deletedAt
            ? "null"
            : "d-flex align-items-center my-2 justify-content-around"
        }
      >
        <Card className="card-container">
          <Card.Title>
            Tu pedido realizado el{" "}
            {new Date(order?.createdAt).toLocaleDateString("es-AR")}
          </Card.Title>
          <Card.Body>
            {order?.state === "entregado" && (
              <Card.Subtitle className="text-success text-capitalize">
                {order.state}
              </Card.Subtitle>
            )}
            {order?.state === "confirmado" && (
              <Card.Subtitle className="text-warning text-capitalize">
                {order.state}
              </Card.Subtitle>
            )}
            {order?.state === "pendiente" && (
              <Card.Subtitle className="text-danger text-capitalize">
                {order.state}
              </Card.Subtitle>
            )}

            <div className="d-flex justify-content-around">
              <Card.Img
                variant="left"
                className="product-image"
                src={product?.image}
              />
              <span>{order.amount}</span>
              <span className="text-capitalize">{product.name}</span>
              <span>{product.price}</span>
              <span>Total: {product.price * order.amount}</span>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default OrderItem;
