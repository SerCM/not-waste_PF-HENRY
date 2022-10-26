import React, { useEffect } from 'react'
import Footer from '../Footer'
import NavBar from '../NavBar'
import { useDispatch, useSelector } from "react-redux";
import PostDetail from '../PostDetail'
import { getCustomer, postDetail, prodDetail } from '../../redux/actions';
import AuthProfile from '../AuthProfile';
import VerifyProfile from '../VerifyProfile';
import { useParams } from 'react-router-dom';
import { Badge, Button, Card, ListGroup } from 'react-bootstrap';
// import { filtro } from '../Profile';
//order id

function OderDetail() {

    const prod = useParams()
    console.log("🚀 ~ file: orderDetail.jsx ~ line 17 ~ OderDetail ~ prod", prod)
    let id = prod.id
    // console.log("🚀 ~ file: orderDetail.jsx ~ line 19 ~ OderDetail ~ hola", id)
    const dispatch = useDispatch()
    // useEffect(()=>{ 

    //     dispatch(prodDetail());
    // },[dispatch])
    let product = useSelector((state) => state.prodDetails);
    // console.log("POSTEO PARA SACAR", product)
    
    let log = AuthProfile("profile");
    let profile = VerifyProfile(log.email)
    // console.log("PERFIL",profile)

    let pedidos = profile.orders
    // console.log("PEDIDOS", pedidos)

let productId = pedidos?.find(e=>e === id) 
console.log("🚀 ~ ORDEEEEEEN", productId)

let holaa = pedidos?.find(e=>e.postId?.find(e=>e === prod?.id)) 
console.log("🚀 ~ file: orderDetail.jsx ~ line 39 ~ OderDetail ~ holaa", holaa)
//     let idPost = product.posts?.filter(e=>e.id)
//     console.log("product.posts?.filter(e=>e)", idPost)

// let verdad = product.post?.map

    // let idCoincide = pedidos?.filter(e=>e.postId)
    // console.log("🚀 ~ file: orderDetail.jsx ~ line 36 ~ OderDetail ~ idCoincide", idCoincide)
    let g = product?.posts?.find(e=>e.orders.find(e=>e.state))
    // let orderState = g?.find(e=>e)
    // console.log("🚀 ~ file: orderDetail.jsx ~ line 45 ~ OderDetail ~ orderState", orderState)
console.log(g)

  return (
    <div>
        {/* {
            pedidos?.map(e=>{
                return(<div>{e.state}</div>)
            })
        } */}
 <NavBar/>
        <Card className="w-50 mx-auto mt-4 bgColor">
          <div className="d-flex position-relative">
            <Card.Img variant="top" src={product.image} />
            <Card.ImgOverlay className="d-flex align-items-start flex-column justify-content-between">
              <Badge pill bg="warning">
                Estado: {g?.orders?.map(e=>{return(<>{e.state}</>)})}

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
            Monto Total: {g?.orders?.map(e=>{return(<>{e.amount}</>)})}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>

          <Card.Footer>
            <div className="d-flex align-items-center">
              <Button className="btn btn-dark m-1 p-1">Finalizar compra</Button>
            </div>
          </Card.Footer>
        </Card>

        <Footer/>
    </div>
  )
}
export default OderDetail