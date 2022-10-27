import React, { useState } from "react";
import "../Cart/Cart.css";
import ProductItem from "../../component/ProductItem/ProductItem";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { postOrder, postPay, addCart, modifyPost } from "../../redux/actions";

function Cart(props) {
  var { user } = useAuth0();
  let customers = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let cart = useSelector((state) => state.cart);
  
  const productId = cart?.productId;
  
  const price = cart?.amount * cart?.price;
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  
 
  
  const handlePayment = async (cart) => {
    await dispatch(postOrder(cart));
    let payId = await postPay({ price: price, postId: cart.postId });
    cart.payId = payId.id; 
    window.location.replace(payId.redirect);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(addCart(null));
  };
  return (
    <div>
      {props.type === "customer" ? (
        <div>
          <div
            width="50px"
            className="mx-4"
            variant="primary"
            onClick={handleShow}
            id="logocart"
            left="0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>

          <div className="cart-container">
            <Offcanvas show={show} onHide={handleClose} top="0" left="0">
              <Offcanvas.Header className="mt-1 p-1">
                <Offcanvas.Title className="d-flex align-items-center mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <span className="mx-4 mt-2">Tu Carrito</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              {cart?.amount ? (
                <Offcanvas.Body>
                  <Card>
                    <Card.Header className="d-flex row">
                      <span>
                        Los artículos de tu carrito no están reservados.
                      </span>
                      <span>Completa tu compra para hacerte con ellos.</span>
                      <br></br>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup
                        variant="flush"
                        className="d-flex justify-content-between"
                      >
                        <ListGroup.Item>
                          <div className="d-flex justify-content-between">
                            <span>Total</span>
                            <span className="fw-bold text-success">
                              ${price}
                            </span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex column">
                          <ProductItem cart={cart}></ProductItem>
                          <button
                            type="button"
                            className="close"
                            onClick={(e) => handleDelete(e)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-center">
                      <Button
                        variant="dark"
                        className="d-flex w-50 justify-content-center"
                        onClick={() => handlePayment(cart)}
                        value={price}
                      >
                        Pagar
                      </Button>
                    </Card.Footer>
                  </Card>
                </Offcanvas.Body>
              ) : (
                <div className="cart-message">Tu carrito está vacío!</div>
              )}
            </Offcanvas>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Cart;
