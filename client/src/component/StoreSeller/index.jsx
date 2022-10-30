import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSellers, restorePost, disablePost } from "../../redux/actions";
import Footer from "../Footer";
import { Image } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import CardSeller from "./CardsSeller";
import NavBar from "../NavBar";

function StoreSeller() {
  const dispatch = useDispatch();
  var sellers = useSelector((state) => state.seller);
  var { user } = useAuth0();
  let seller = sellers?.find((s) => s.email === user?.email);

  useEffect(() => {
    dispatch(getSellers());
  }, []);

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
    <>
      <NavBar />

      <div className="card-title">
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

        <Footer />
      </div>
    </>
  );
}

export default StoreSeller;
