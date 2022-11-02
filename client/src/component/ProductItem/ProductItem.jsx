import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { prodDetail, getSellers } from '../../redux/actions'
import './productItem.css';
import { useParams } from "react-router-dom";
import { Image } from 'react-bootstrap';
import CartButton from '../CartButton';



const ProductItem = ({ cart }) => {

    return (
        <>

            <div className='d-flex align-items-center justify-content-between'>
                <span className='mr-2 font-weight-normal'>{cart.amount}</span>
                <span className='ms-2 text-capitalize font-weight-normal'>{cart.name}</span>
                <Image roundedCircle className='product-image' src={cart.image} />
                
            </div>
        </>
    )
}


export default ProductItem;
