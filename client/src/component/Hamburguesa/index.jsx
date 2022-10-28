import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth0 } from "@auth0/auth0-react"; //esto es un hook que da auth0
import { Link } from "react-router-dom";
import("./perfile.css");

const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI

export const Profile = (props) => {
  const { logout } = useAuth0();
  return (
    <div>
      {props.type === "customer" &&
        <Dropdown>
          <Dropdown.Toggle className="bg-dark" id="dropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="svg_perfil"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu className="option">
            <Dropdown.Item className="drop">
              <Link className="link" to="/profile">
                Mi Perfil
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="drop">
              <Link className="link" to="/customer/orders">
                Mis Pedidos
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              className="drop"
              type="button"
              onClick={() => logout({ returnTo: `${redirectUri}/home` })}
            >
              Cerrar Sessión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
      {props.type === "seller" &&
        <Dropdown>
          <Dropdown.Toggle className="bg-dark" id="dropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="svg_perfil"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu className="option">
            <Dropdown.Item className="drop">
              <Link className="link" to="/profile">
                Mi Perfil
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="drop">
              <Link className="link" to={"/ViewOrderSeller"}>
                Ordenes
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="drop">
              <Link className="link" to="/viewProductSeller">
                Mis Productos
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="drop">
              <Link className="link" to="/formproduct">
                Cargar Produtos
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="drop">
              <Link className="link" to="/postSeller">
                Mis Posteos
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              className="drop"
              type="button"
              onClick={() => logout({ returnTo: `${redirectUri}/home`  })}
            >
              Cerrar Sessión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
      {
        props.type === "manager" && 
        <Dropdown>
          <Dropdown.Toggle className="bg-dark" id="dropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="svg_perfil"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu className="option">
            <Dropdown.Item className="drop">
              <Link className="link" to="/home">
                Dashboard
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="drop">
              <Link className="link" to="/listSeller">
                Vendedores
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              className="drop"
              type="button"
              onClick={() => logout({ returnTo: `${redirectUri}/home` })}
            >
              Cerrar Sessión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
    </div>
  );
};
