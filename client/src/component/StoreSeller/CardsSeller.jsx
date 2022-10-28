import React from "react";
import {
  disableForcePost,
  disablePost,
  restorePost,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import "../StoreSeller/storeSeller.css";
import Button from "react-bootstrap/Button";

function CardSeller({ product, post }) {
  const dispatch = useDispatch();
  const readDates = () => {
    let diff = product.posts.map((post) => {
      dispatch(disableForcePost(post.id));
    });
    return diff;
  };

  readDates();

  const desabilitar = (e) => {
    console.log("DESHABILITAR");
    dispatch(disablePost(e.target.name));
    window.location.reload(true);
  };

  const habilitar = (e) => {
    dispatch(restorePost(e.target.name));
    window.location.reload(true);
  };

  return (
    <div>
      <Card
        className={post.deletedAt ? "dis" : "ok"}
        style={{ width: "40rem" }}
      >
        <Card.Img variant="top" src={product.image} />

        <Card.Body>
          <Card.Title className="name-post">{product.name}</Card.Title>
          {/* <Card.ImgOverlay>
            <Badge pill bg="warning" text="white">
              {post.amount} disponible(s)
            </Badge>
          </Card.ImgOverlay> */}
          <Card.Text className="card-description">
            {product.description}
          </Card.Text>

          <Card.Footer>
            <svg
              width="16"
              height="16"
              fill="#353253"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span className="ms-2">{Math.ceil(Math.random() * 5)}</span>
            <span className="mx-2 text-black-50">|</span>
            <span>{new Date(post.date).toLocaleDateString("es-AR")}</span>
            <span> {new Date(post.date).toLocaleTimeString("es-AR")}</span>
            <span className="mx-2 text-black-50">|</span>
            <span className="precio">$ {product.price}</span>
            <div className="habilitarBtn">
              <Button
                name={post.id}
                onClick={(e) => desabilitar(e)}
                variant="danger"
              >
                Deshabilitar
              </Button>
              <Button
                name={post.id}
                onClick={(e) => habilitar(e)}
                variant="success"
                className="ms-5"
              >
                Habilitar
              </Button>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
      <br />
      <br />
    </div>
  );
}
export default CardSeller;
