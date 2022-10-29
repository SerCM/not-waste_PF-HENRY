import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { getCustomer, postDetail, prodDetail, putOrder, reviewOrder } from '../../redux/actions';
import AuthProfile from '../AuthProfile';
import VerifyProfile from '../VerifyProfile';
import { useParams } from 'react-router-dom';
import { Badge, Button, Card, ListGroup } from 'react-bootstrap';

export function AuxilaryDelivered(props) {
  let id = props.idProduct
  let orden = props.orden 

const dispatch = useDispatch()
    useEffect(()=>{ 
        dispatch(prodDetail(id));
    },[dispatch])
    // let product = useSelector((state) => state.prodDetails);
    
    let product = useSelector((state) => state.prodDetails);

    const [input, setInput] = useState({
      reviewValue: "",
      reviewComment: "",
})


    function handleReviewComment(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    function handleReviewValue(e) {
      setInput({
        ...input,
        reviewValue: e.target.value,
      });
    }
    
    function handleSubmit (e) {
      e.preventDefault()
      console.log(e.target.value)
      dispatch(reviewOrder(props.id, (input)))
      setInput({
        reviewValue:"",
        reviewComment:"",
      })
    }
  return (
    <div>
         <Card className="w-50 mx-auto mt-2 bgColor">
          <div className="d-flex position-relative">
            <Card.Img variant="top" src={product.image} />
            <Card.ImgOverlay className="d-flex align-items-start flex-column justify-content-between">

              <Badge pill bg="success">Estado: {orden?.map(e=>{return(<>{e.state}</>)})}</Badge>

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
            Monto Total: {orden?.map(e=>{return(<>{e.amount}</>)})} unidades
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>

          <Card.Footer>
            <div>
              <form onSubmit={handleSubmit}>
              <div className="form-outline">
              <textarea 
              onChange={(e) => handleReviewComment(e)}
                name="reviewComment"
                type="text"
                value={input.name}
                placeholder='Que te parecio el producto?' 
                className="form-control" 
                rows="4"
                ></textarea>
                </div>
              
                <div>
              <label>Temporada</label>

              <select
                
                onChange={(e) => handleReviewValue(e)}
              >
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
                <option value="5">★★★★★</option>
              </select>
            </div>
    <Button type='submit' className=" btn btn-dark m-1 p-1">Añadir reseña</Button>
              </form>
            </div>
          </Card.Footer>
          <span bg="">reviews: {orden?.map(e=>{return(<>{e.review }  ★</>)})}</span>
        </Card>
    </div>
  )
}
