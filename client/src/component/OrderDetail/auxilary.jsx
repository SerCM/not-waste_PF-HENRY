import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./orderDetail.css";
import {
  getCustomer,
  postDetail,
  prodDetail,
  disableOrder,
  modifyPost,
  cleanDetail,
  getSellers,
  postPay,
} from "../../redux/actions";
import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, ListGroup, Image } from "react-bootstrap";

export function Auxilary(props) {
  let id = props.idProduct;
  let orden = props.orden;

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd; //<------------ hace referencia a que no se puede activar un producto en una fecha anterior

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(prodDetail(id));
    dispatch(getSellers());
  }, [dispatch]);

  let product = useSelector((state) => state.prodDetails);
  let sellers = useSelector((state) => state.seller);

  let seller = sellers?.find((s) => {
    return s.id === product.sellerId;
  });
  console.log("🚀 ~ file: auxilary.jsx ~ line 49 ~ Auxilary ~ seller", seller);

  useEffect(() => {
    return function () {
      dispatch(cleanDetail());
      dispatch(getSellers());
    };
  }, [dispatch]);

  let stateOrder = orden
    ?.map((e) => {
      return e.state;
    })
    .toString();

  const desabilitar = (e) => {
    let orderFinded = orden?.find((o) => o.id === e);
    let postId = orderFinded.postId;
    let postFinded = product.posts?.find((p) => p.id === postId);
    let amountFind = postFinded?.amount;

    dispatch(disableOrder(e));
    dispatch(modifyPost(postId, { amount: amountFind + 1 }));
    window.location.replace("/customer/orders");
  };

  const handlePayment = async (product) => {
    let data = { price: product.price, postId: orden[0].id };
    let res = await postPay(data);
    window.location.replace(res.redirect);
  };

  return (
    <div>
      <Link to="/customer/orders">VOLVER</Link>
      {stateOrder === "pendiente" ? (
        <Card className="w-50 mx-auto mt-2 bgColor">
          <div className="d-flex position-relative">
            <Card.Img variant="top" src={product.image} />
            <Card.ImgOverlay className="d-flex align-items-start flex-column justify-content-between">
              <Badge pill bg="danger">
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
              <ListGroup.Item className="d-flex justify-content-between">
                <div>
                  <Card.Subtitle className="mb-2 text-muted ">
                    Descripción
                  </Card.Subtitle>
                  <span className="text-capitalize">
                    {" "}
                    {product.description}.
                  </span>
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

          <Card.Footer>
            <div className="d-flex align-items-center">
              <Button
                className="btn btn-dark m-1 p-1"
                onClick={() => handlePayment(product)}
              >
                Finalizar compra
              </Button>
              <Button
                name={orden[0].id}
                onClick={(e) => desabilitar(e.target.name)}
                variant="danger"
              >
                Cancelar
              </Button>
            </div>
          </Card.Footer>
          <Link to="">VOLVER</Link>
        </Card>
      ) : (
        <>
          <Card className="w-50 mx-auto mt-2 bgColor">
            <div className="d-flex position-relative">
              <Card.Img
                variant="top"
                src={
                  product.image
                    ? product.image
                    : "no hay imagen para este producto"
                }
                alt="no hay imagen para este producto"
              />
              <Card.ImgOverlay className="d-flex align-items-start flex-column justify-content-between">
                <Badge pill bg="warning">
                  Estado:{" "}
                  {orden?.map((e) => {
                    return <>{e.state}</>;
                  })}
                </Badge>

                <Card.Title className="text-white fw-bold bg-light rounded p-2 ">
                  <span className="text-dark text-uppercase">
                    {product.name}
                  </span>
                </Card.Title>
              </Card.ImgOverlay>
            </div>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {" "}
                  Pedido realizado el dia: {orden[0].createdAt.slice(
                    0,
                    10
                  )}{" "}
                  Fecha de Entrega: {orden[0].date}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <div>
                    <Card.Subtitle className="mb-2 text-muted ">
                      Descripción
                    </Card.Subtitle>
                    <span className="text-capitalize">
                      {" "}
                      {product.description}.
                    </span>
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
                      <Card.Subtitle className="text-muted">
                        Dietas
                      </Card.Subtitle>
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

            <Card.Footer className="">
              <div className="d-flex align-items-center mw-10r">
                <Image
                  roundedCircle
                  className="img-seller"
                  src={seller?.image}
                />
                <div>
                  <h1 className="title-seller">{seller?.name}</h1>
                </div>
              </div>
              {orden && orden[0].date === today && (
                <div>
                  <h6 className="d-flex  ">
                    Podés pasar a retirar el pedido en nuestra direccion:
                  </h6>
                </div>
              )}
              {orden && orden[0].date < today && (
                <h6 className="d-flex  ">
                  El producto se podra retirar el dia {orden[0].date} por
                  nuestra direccion:
                </h6>
              )}

              <Card.Link
                href={`https://maps.google.com/?q=${
                  seller ? seller.adress : ""
                }, Buenos Aires, Argentina`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <span className="mx-2 text-capitalize">
                  {seller ? seller.adress : ""}
                </span>
                {
                  <span className="mx-2 text-capitalize">
                    ({seller?.cities[0]?.name})
                  </span>
                }
              </Card.Link>
            </Card.Footer>
          </Card>
        </>
      )}
    </div>
  );
}
