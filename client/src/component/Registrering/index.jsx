import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Register from "../register/index.jsx";
import AuthProfile from "../AuthProfile";
import LogingButton from "../LoginButton";
import VerifyProfile from "../VerifyProfile";
import "../Registrering/Registering.css";
import { useAuth0 } from "@auth0/auth0-react";

const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI


function Registrering() {
  const { isLoading } = useAuth0;
  let log = AuthProfile("profile"); // esto puede ser {}, true o false
  let db = VerifyProfile(log.email);

  const redirigir = (tipo) => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 7000);
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
      {db.exists && db.type === "customer" && db.deletedAt === null && window.location.assign(`${redirectUri}/home`)}
      {db.exists && db.type === "customer" && db.deletedAt !== null && redirigir('bloqueado')}
      {db.exists && db.type === "seller" && db.deletedAt === null && window.location.assign(`${redirectUri}/home`)}
      {db.exists && db.type === "seller" && db.deletedAt !== null && redirigir('bloqueado')}
      {db.exists && db.type === "manager" && window.location.assign(`${redirectUri}/home`)}
      {isLoading && <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      {!log && <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">Se requiere iniciar sesión</h5>
          <p className="card-text">
            Para registrarte necesitas iniciar sesión con tu cuenta de
            Google.
          </p>
          <LogingButton />
        </div>
      </div>}
      {log && !db.exists &&
        <div className="dashRegister">
          <Register {...log} />
        </div>}
      <Footer />
    </>
  );
}

export default Registrering;
