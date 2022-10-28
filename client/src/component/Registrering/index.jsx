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

  return (
    <>
      {db.exists && window.location.assign(`${redirectUri}/home`)}
      <div>
        <NavBar />
        <div className="dashRegister">
          {isLoading && <h1>Cargando....</h1>}
          {log ? (
            <Register {...log} />
          ) : (
            <div className="card w-75">
              <div className="card-body">
                <h5 className="card-title">Se requiere iniciar sesión</h5>
                <p className="card-text">
                  Para registrarte necesitas iniciar sesión con tu cuenta de
                  Google.
                </p>
                <LogingButton />
              </div>
            </div>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Registrering;
