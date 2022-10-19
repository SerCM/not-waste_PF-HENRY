import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { prodDetail, getSellers } from '../../redux/actions'
import './order.css';
import { useParams } from "react-router-dom";
import { Card, Badge, ListGroup, Button } from 'react-bootstrap';
import NavBar from '../NavBar';
import Footer from '../Footer/index';
import ProductItem from '../ProductItem/ProductItem';

const Order = () => {
    // const { productId } = useParams()
    // const dispatch = useDispatch()
    // const product = useSelector(state => state.prodDetails)
    // // const seller = sellers.find(seller => seller.id === product.sellerId)
    // useEffect(() => {
    //     dispatch(prodDetail(productId));
    //     // dispatch(getSellers())
    // }, [])

    return (
        <>
            <NavBar />
            <Card className="w-50 mx-auto mt-16 mb-50">
                <div className='d-flex position-relative justify-content-center' >
                    <Card.Title className='text-white fw-bold bg-light rounded p-2 '>
                        <span className='text-dark text-uppercase justify-content-center'>Mis pedidos</span>
                    </Card.Title>
                </div>
                <Card.Body className='p-0'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='d-flex justify-content-between'>
                            <div className='d-flex row'>
                                <Card.Subtitle className="mb-2 text-muted ">Pedidos en curso</Card.Subtitle>
                                {/* se agrega un product item por cada orden que esté en estado "en curso" */}
                                <ProductItem />
                                <div className='d-flex column justify-content-between'>
                                    <span>Fecha de la orden</span>
                                    <span>|</span>
                                    {/* el proveedor tendrá link para su store */}
                                    <span>Proveedor</span>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between'>
                            <div>
                                <Card.Subtitle className="mb-2 text-muted ">Pedidos entregados</Card.Subtitle>
                                {/* se agrega un product item por cada orden que esté en estado "entregado" */}
                                <ProductItem />
                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                </Card.Body>
                <Card.Footer className='mb-4'></Card.Footer>
            </Card>
            <Footer className='footer-orders' />
        </>
    )
}


export default Order;