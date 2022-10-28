import React, { useEffect } from 'react'
import Footer from '../Footer'
import NavBar from '../NavBar'
import { useDispatch, useSelector } from "react-redux";
import { getCustomer, postDetail, postGet, prodDetail } from '../../redux/actions';
import AuthProfile from '../AuthProfile';
import VerifyProfile from '../VerifyProfile';
import { useParams } from 'react-router-dom';
import { Auxilary } from './auxilary';


function OderDetail() {
    const dispatch = useDispatch()
    useEffect(()=>{ 
        dispatch(postGet());
        // dispatch(postDetail(idPosteo))
    },[dispatch]) 

    let getPost = useSelector((state) => state.allPosts);

    const prod = useParams()
    let id = prod.id


    let log = AuthProfile("profile");
    let profile = VerifyProfile(log.email)
    let pedidos = profile.orders




let ordenesId = pedidos?.filter(e=>e.id === id) 

let idPosteo= ordenesId?.map(e=>e.postId).toString()

let unidad = getPost?.filter(e=>e.id === idPosteo)

let idProduct = unidad?.map(e=>e.productId).toString()

  return (
    <div>
 <NavBar/>
    {idProduct === "" ? <></> :
<Auxilary idProduct={idProduct&&idProduct}
    orden={ordenesId}
/>
    }
<Footer/>
    </div>
  )
}
export default OderDetail