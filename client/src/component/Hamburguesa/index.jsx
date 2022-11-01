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
      {props.type === "customer" && props.deletedAt === null &&
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
            <Dropdown.Item className="drop"  onClick={() => window.location.replace("/profile")}>
                Mi Perfil
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/customer/orders")}>
                Mis Pedidos
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
      {props.type === "customer" && props.deletedAt !== null &&
        <Dropdown>
          <Dropdown.Toggle className="bg-danger" id="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-exclamation-circle me-2" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg> Usuario bloqueado
          </Dropdown.Toggle>

          <Dropdown.Menu className="option">
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/profile")}>
                Mi Perfil
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/customer/orders")}>
                Mis Pedidos
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
      {props.type === "seller" && props.deletedAt === null &&
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
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/profile")}>
                Mi Perfil
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/ViewOrderSeller")}>
                Ordenes
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/viewProductSeller")}>
                Mis Productos
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/formproduct")}>
                Cargar Produtos
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/postSeller")}>
                Mis Posteos
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
      {props.type === "seller" && props.deletedAt !== null &&
        <Dropdown>
          <Dropdown.Toggle className="bg-danger" id="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-exclamation-circle me-2" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg> Usuario bloqueado
          </Dropdown.Toggle>
          <Dropdown.Menu className="option">
          <Dropdown.Item className="drop" onClick={() => window.location.replace("/profile")}>
                Mi Perfil
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/ViewOrderSeller")}>
                Ordenes
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/viewProductSeller")}>
                Mis Productos
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/formproduct")}>
                Cargar Produtos
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/postSeller")}>
                Mis Posteos
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
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/dashboard")}>
                Dashboard
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/listSeller")}>
                Vendedores
            </Dropdown.Item>
            <Dropdown.Item className="drop" onClick={() => window.location.replace("/listCustomer")}>
                Consumidores
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
