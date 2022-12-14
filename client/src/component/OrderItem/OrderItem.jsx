import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prodDetail, getSellers } from "../../redux/actions";
import "./orderItem.css";
import { Card, Image } from "react-bootstrap";

const OrderItem = ({ product, order }) => {
  let post = product?.posts?.find(p => p?.id === order?.postId)

  return (
    <>
      <div
        className={
          order?.deletedAt || !product
            ? "null"
            : "d-flex align-items-center my-2 justify-content-around"
        }
      >
        <Card className="card container-fluid">
          <Card.Title>
            Tu pedido con fecha de entrega el {" "}
            {new Date(post?.date).toLocaleDateString("es-AR")}
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
              <Card.Subtitle className="text-danger text-capitalize text-center">
                {order.state}
              </Card.Subtitle>
            )}

            <div className="d-flex justify-content-around">
              <img
                className="rounded float-start pe-2"
                src={product?.image}
                alt="imagen no disponible"
                height="100px"
              />
              <span>{order.amount}</span>
              <span className="text-capitalize">{product && product.name}</span>
              <span>{product && product.price}</span>
              <span>
                Total: {product && order && product.price * order.amount}
              </span>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default OrderItem;
