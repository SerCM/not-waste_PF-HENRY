import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  prodDetail,
  addCart,
  postDetail,
  getProduct,
  modifyPost,
} from "../../redux/actions";
import "./postDetail.css";
import { useParams } from "react-router-dom";
import {
  Card,
  Badge,
  ListGroup,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import NavBar from "../NavBar";
import Footer from "../Footer/index";
import amountPostArray from "../../utils/amountPostArray";
import { useAuth0 } from "@auth0/auth0-react";

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  var { user } = useAuth0();

  let post = useSelector((state) => state.postDetail);
  let postO = post[0]
  let products = useSelector((state) => state.product);
  let product = products.find((p) => p.id === postO.productId);
  let sellers = useSelector((state) => state.seller);
  let customers = useSelector((state) => state.customer);

  const [orders, setOrders] = useState({});
  let customer = customers?.find((c) => c.email === user?.email);
  let productId = post.productId;
  let ordersReview = post[0]?.orders?.map(e=>e);

  useEffect(() => {
    dispatch(postDetail(postId));
    dispatch(prodDetail(productId));
    dispatch(getProduct());
  }, []);

  function handleAmount(a) {
    setOrders((orders) => ({ ...orders, amount: a }));
  }

  const handleCart = (input) => {
    if (input.amount > 0) {
      dispatch(addCart(input));
      alert(input.name + " se añadio correctamente");
    }
  };

  let seller = sellers.find((s) => s.id === product.sellerId);

  if (product?.id) {
    return (
      <>
        <NavBar />
        <Card className="w-50 mx-auto mt-4 bgColor">
          <div className="d-flex position-relative">
            <Card.Img variant="top" src={product.image} />
            <Card.ImgOverlay className="d-flex align-items-start flex-column justify-content-between">
              <Badge pill bg="warning">
                {postO.amount + " disponible(s)"}
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
                <Card.Subtitle className="mb-2 text-muted">
                  Dirección
                </Card.Subtitle>

                <Card.Link
                  href={`https://maps.google.com/?q=${seller ? seller.adress : ""
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
                      ({seller?.cities[0].name})
                    </span>
                  }
                </Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                {product?.diets.length > 0 && (
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
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            {postO.amount === 0 ?
              <div>no hay disponibilidad</div>
              : <div className="d-flex align-items-center">
                <span className="mx-2">
                  {new Date(postO.date).toLocaleDateString("es-AR")}
                </span>
                <span className="mx-2">
                  {new Date(postO.date).toLocaleTimeString("es-AR")}
                </span>
                <DropdownButton
                  variant="light"
                  className="mx-4"
                  key={`newOrder_${orders.amount}`}
                  title={orders.amount || "Cantidad"}
                >
                  {amountPostArray(postO).map((a) => {
                    return (
                      <Dropdown.Item
                        onClick={() => handleAmount(a)}
                        key={`${a}+${postO.date}`}
                        as="button"
                      >
                        {a}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <Button
                  onClick={() =>
                    handleCart({
                      amount: orders.amount,
                      date: postO.date,
                      image: product.image,
                      price: product.price,
                      name: product.name,
                      image: product.image,
                      customerId: customer.id,
                      postId: postO.id,
                    })
                  }
                  className="btn btn-dark m-1 p-1"
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </Button>
              </div>
            }
          </Card.Footer>
          {ordersReview?.map(e=>{return <div>{e.reviewValue}</div>}) + "review"}
        </Card>
        <Footer />
      </>
    );
  }
};

export default PostDetail;
