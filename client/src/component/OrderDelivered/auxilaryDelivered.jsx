import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanDetail,
  getCustomer,
  postDetail,
  prodDetail,
  putOrder,
  reviewOrder,
} from "../../redux/actions";
import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import swal from "sweetalert";
import "./orderDelivered.css";
export function AuxilaryDelivered(props) {
  let id = props.idProduct;
  let orden = props.orden;
console.log(props)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(prodDetail(id));
  }, [dispatch]);
  // let product = useSelector((state) => state.prodDetails);

  let product = useSelector((state) => state.prodDetails);
  const [input, setInput] = useState({
    reviewValue: "",
    reviewComment: "",
    promValue: 0,
    cantvaluaciones: 0
  });

  function handleReviewComment(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  (function() {
    /**
     * Ajuste decimal de un número.
     *
     * @param {String}  tipo  El tipo de ajuste.
     * @param {Number}  valor El numero.
     * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
     * @returns {Number} El valor ajustado.
     */
  function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

  function handleReviewValue(e) {
    let nuevapuntuacion = product.puntuacion * product.cantPuntuaciones
    nuevapuntuacion = nuevapuntuacion + Number(e.target.value)
    let nuevacantdepuntuaciones = product.cantPuntuaciones + 1
    let prompuntuacion = nuevapuntuacion / nuevacantdepuntuaciones
    prompuntuacion = Math.round10(prompuntuacion, -1)
    setInput({
      ...input,
      reviewValue: e.target.value,
      promValue: prompuntuacion,
      cantvaluaciones: nuevacantdepuntuaciones
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    swal({
      title: "Reseña envidada con exito",
      text: "Gracias por compratir opinion",
      icon: "success",
    });
    dispatch(reviewOrder(props.id, input, props.idProduct));
    setInput({
      reviewValue: "",
      reviewComment: "",
      promValue: 0,
      cantvaluaciones: 0
    });
  }

  useEffect(() => {
    return function () {
      dispatch(cleanDetail());
    };
  }, [dispatch]);

  return (
    <div>
      <Card className="w-50 mx-auto mt-2 bgColor">
        <div className="d-flex position-relative">
          <Card.Img variant="top" src={product.image} />
          <Card.ImgOverlay className="d-flex align-items-start flex-column justify-content-between">
            <Badge pill bg="success">
              Estado:{" "}
              {orden?.map((e) => {
                return <>{e.state}</>;
              })}
            </Badge>

            <Card.Title className="text-white fw-bold bg-light rounded p-2 ">
              <span className="text-dark text-uppercase">{product.name}</span>
            </Card.Title>
          </Card.ImgOverlay>
        </div>
        <Card.Body className="p-0">
          <ListGroup variant="flush">
            <ListGroupItem> Pedido realizado el dia: {orden[0].createdAt.slice(0,10)} Fecha de Entrega: {orden[0].date}</ListGroupItem>
            <ListGroup.Item className="d-flex justify-content-between">
              <div>
                <Card.Subtitle className="mb-2 text-muted ">
                  Descripción
                </Card.Subtitle>
                <span className="text-capitalize"> {product.description}.</span>
              </div>
              <span className="text-decoration-line-through text-green">
                ${product.realValue}
              </span>
              <span className="mx-2">|</span>
              <span className="fw-bold text-success">${product.price}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              {product?.diets?.length > 0 && (
                <>
                  <Card.Subtitle className="text-muted">Dietas</Card.Subtitle>
                  {product.diets?.map((diet) => {
                    return (
                      <Badge
                        pill
                        className="pill-diets"
                        bg="light"
                        text="dark"
                        key={diet.id}
                      >
                        {diet.name}
                      </Badge>
                    );
                  })}
                </>
              )}
              Monto Total:{" "}
              {orden?.map((e) => {
                return <>{e.amount}</>;
              })}{" "}
              unidades
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>

        {orden && orden[0].reviewValue === null && <Card.Footer>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-outline">
                <textarea
                  onChange={(e) => handleReviewComment(e)}
                  name="reviewComment"
                  type="text"
                  value={input.name}
                  placeholder="Que te parecio el producto?"
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>

              <div>
                <label>Puntuación</label>
                <div
                  onChange={(e) => handleReviewValue(e)}
                  className="clasificacion"
                >
                  <input
                    className="inputs"
                    id="radio1"
                    type="radio"
                    name="estrellas"
                    value="5"
                  />

                  <label className="labels" for="radio1">
                    ★
                  </label>

                  <input
                    className="inputs"
                    id="radio2"
                    type="radio"
                    name="estrellas"
                    value="4"
                  />

                  <label className="labels" for="radio2">
                    ★
                  </label>

                  <input
                    className="inputs"
                    id="radio3"
                    type="radio"
                    name="estrellas"
                    value="3"
                  />

                  <label className="labels" for="radio3">
                    ★
                  </label>

                  <input
                    className="inputs"
                    id="radio4"
                    type="radio"
                    name="estrellas"
                    value="2"
                  />

                  <label className="labels" for="radio4">
                    ★
                  </label>

                  <input
                    className="inputs"
                    id="radio5"
                    type="radio"
                    name="estrellas"
                    value="1"
                  />

                  <label className="labels" for="radio5">
                    ★
                  </label>
                </div>
                {/* 
              <select onChange={(e) => handleReviewValue(e)}>

              </select> */}
              </div>
              <Button type="submit" className="d-flex btn btn-dark m-1 p-1">
                Añadir reseña
              </Button>
            </form>
          </div>
        </Card.Footer>}
        {orden && orden[0].reviewValue !== null && <Card.Footer>Reseña ya enviada: {orden[0].reviewValue} ★ - Comentarios: {orden[0].reviewComment && orden[0].reviewComment}</Card.Footer>}
      </Card>
    </div>
  );
}
