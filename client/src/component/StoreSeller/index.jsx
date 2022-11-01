import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSellers, restorePost, disablePost } from "../../redux/actions";
import Footer from "../Footer";
import { Image } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import CardSeller from "./CardsSeller";
import NavBar from "../NavBar";
import AuthProfile from "../AuthProfile";
import VerifyProfile from "../VerifyProfile";
import { Link } from "react-router-dom";

function StoreSeller() {

  let log = AuthProfile("profile"); // esto puede ser {}, true o false
  let db = VerifyProfile(log.email);

  const dispatch = useDispatch();
  var sellers = useSelector((state) => state.seller);
  var { user } = useAuth0();
  let seller = sellers?.find((s) => s.email === user?.email);

  useEffect(() => {
    dispatch(getSellers());
  }, []);

  const desabilitar = (e) => {
    dispatch(disablePost(e.target.name));
    window.location.reload(true);
  };

  const habilitar = (e) => {
    dispatch(restorePost(e.target.name));
    window.location.reload(true);
  };

  const redirigir = (tipo) => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 7000);
    if (tipo === "manager") return (
      <div>
        <h2>
          Esta seccion muestra las publicaciones realizadas por cada uno de sus vendedores.
        </h2>
        <br />
        <h4>
          Su usuario "Adminitrador" no tiene datos para mostrar en esta seccion.  Sera redirigido a la pagina principal.
        </h4>
      </div>)
    if (tipo === "customer") return (
      <div>
        <h2>
          Esta seccion es para vendedores
        </h2>
        <br />
        <h4>
          Sera redirigido a la pagina principal.
        </h4>
      </div>)
    if (tipo === "bloqueado")
      return (
        <div>
          <h4>
            Su usuario se encuentra bloqueado.
            <br />
            Sera redirigido a la pagina principal.
          </h4>
        </div>
      );
  }

  return (
    <>
      <NavBar />
      {db.exists === false && <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      {db.type === "seller" && db.deletedAt === null && db.products.length && <div className="card-title">
        {
          <div className="row g-0">
            <div className="d-flex align-items-center mw-10r">
              <Image
                roundedCircle
                className="seller-image"
                src={seller?.image}
              />
              <div>
                <h1 className="card-name">{seller?.name}</h1>
                <h5 className="card-category">{seller?.category}</h5>
              </div>
            </div>
            <h4 className="titulo-h1">Posteos</h4>
            <div className="contenedor_card">
              {seller?.products.map((p) => {
                return p.posts.map((post) => {
                  return <CardSeller key={post.id} product={p} post={post} />;
                });
              })}
            </div>
          </div>
        }
      </div>}
      {db.type === "seller" && db.deletedAt === null && !db.products.length &&
        <h1>
          <br />
          Aun no tiene productos cargados, por favor dirijase a <Link to="/formproduct"> creacion de productos!</Link>
        </h1>}
      {db.exists && db.type === "seller" && db.deletedAt !== null && redirigir("bloqueado")}
      {db.exists && db.type !== "seller" && redirigir(db.type)}
      <Footer />
    </>
  );
}

export default StoreSeller;
