import React, { useEffect } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomer,
  postDetail,
  postGet,
  prodDetail,
} from "../../redux/actions";
import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";
import { useParams } from "react-router-dom";
import { Auxilary } from "./auxilary";

function OderDetail() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postGet());
    // dispatch(postDetail(idPosteo))
  }, [dispatch]);

  let getPost = useSelector((state) => state.allPosts);
  let getProduct = useSelector((state) => state.product);

  const prod = useParams();
  let id = prod.id;

  let log = AuthProfile("profile");
  let profile = VerifyProfile(log.email);
  let pedidos = profile.orders;

  let ordenesId = pedidos?.filter((e) => e.id === id);

  let idPosteo = ordenesId?.map((e) => e.postId).toString();

  let unidad = getPost?.filter((e) => e.id === idPosteo);

  let idProduct = unidad?.map((e) => e.productId).toString();

  let product = getProduct?.find((p) => p.id === idProduct);
  let sellerId = product?.sellerId;

  const redirigir = () => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 7000);
    return (
      <div>
        <h2>
          Los compradores solo pueden acceder a las ordenes realizadas con su
          propia cuenta
        </h2>
        <br />
        <h4>Sera redirigido a la pagina principal.</h4>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      {idProduct === "" && (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {ordenesId && profile.id && ordenesId[0].customerId === profile.id && (
        <Auxilary
          idProduct={idProduct && idProduct}
          orden={ordenesId}
          seller={sellerId}
        />
      )}
      {ordenesId &&
        profile.id &&
        ordenesId[0].customerId !== profile.id &&
        redirigir()}
      <Footer />
    </div>
  );
}
export default OderDetail;
