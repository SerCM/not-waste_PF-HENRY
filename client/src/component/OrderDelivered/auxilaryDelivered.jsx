import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { getCustomer, postDetail, prodDetail, putOrder, reviewOrder } from '../../redux/actions';
import AuthProfile from '../AuthProfile';
import VerifyProfile from '../VerifyProfile';
import { useParams } from 'react-router-dom';
import { Badge, Button, Card, ListGroup } from 'react-bootstrap';

export function AuxilaryDelivered(props) {
    let id = props.idProduct
let orden = props.orden 
console.log("🚀 ~ file: auxilary.jsx ~ line 15 ~ Auxilary ~ orden", orden)

const dispatch = useDispatch()
    useEffect(()=>{ 
        dispatch(prodDetail(id));
    },[dispatch])
    // let product = useSelector((state) => state.prodDetails);
    
    let product = useSelector((state) => state.prodDetails);


    function handleSubmit (e) {
      e.preventDefault()
      console.log(e.target.value)
      dispatch(reviewOrder(props.id, {review: e.target.value}))
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
              <form onChange={handleSubmit}>
              <div className="form-outline">
              <textarea placeholder='Que te parecio el producto?' className="form-control" id="textAreaExample1" rows="4"></textarea>
                </div>
              
<div >
<div>
    <input  id="radio1" type="radio" name="review"  value="5"/>★★★★★
</div>
<div>
    <input  id="radio1" type="radio" name="review"  value="4"/>★★★★
</div>
<div>
    <input  id="radio1" type="radio" name="review"  value="3"/>★★★
</div>
<div>
    <input  id="radio1" type="radio" name="review"  value="2"/>★★
</div>
<div>
    <input  id="radio1" type="radio" name="review"  value="1"/>★
</div>
    <Button  type='submit' className=" btn btn-dark m-1 p-1">Añadir reseña</Button>
</div>
              </form>
            </div>
          </Card.Footer>
          <span pill bg="">reviews: {orden?.map(e=>{return(<>{e.review }  ★</>)})}</span>
        </Card>
    </div>
  )
}
