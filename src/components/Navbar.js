import React from "react";
import "../App.css";

import { Link } from "react-router-dom";

class Navbar extends React.Component {
  logout() {
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
    window.location.reload();
  }

  render() {
    return (
      <div className="container">
        <header className="container marginTop">
          <h1 className="text-center">Bee-Forest</h1>
        </header>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light navPrincipal rounded-lg">
            <Link
              to="/pedidos"
              className="navbar-brand font-weight-bold"
              type="button"
            >
              Bee-Forest
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarColor03"
              aria-controls="navbarColor03"
              aria-expanded="false"
              aria-label="Toggle navigation"
              _msthidden="A"
              _msthiddenattr="1375998"
              _mstaria-label="320099"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle font-weight-bold"
                    data-toggle="dropdown"
                    href="!#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Productos
                  </a>
                  <div className="dropdown-menu" _mstvisible="0">
                    <Link to="/productos" className="dropdown-item">
                      Productos
                    </Link>
                    <Link to="/tipo-de-productos" className="dropdown-item">
                      Tipos de Producto
                    </Link>
                    <Link to="/materiales" className="dropdown-item">
                      Materiales
                    </Link>
                    <Link to="/proveedores" className="dropdown-item">
                      Proveedores
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle font-weight-bold"
                    data-toggle="dropdown"
                    href="!#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Personas
                  </a>
                  <div className="dropdown-menu" _mstvisible="0">
                    <Link to="/clientes" className="dropdown-item">
                      Clientes
                    </Link>
                    <Link to="/colaboradores" className="dropdown-item">
                      Colaboradores
                    </Link>
                    <Link to="/direcciones" className="dropdown-item">
                      Direcciones
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle font-weight-bold"
                    data-toggle="dropdown"
                    href="!#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Envios
                  </a>
                  <div className="dropdown-menu" _mstvisible="0">
                    <Link to="/envios" className="dropdown-item">
                      Tipos de Envio
                    </Link>
                  </div>
                </li>
              </ul>

              <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                      <a    onClick={this.logout} class="nav-link" href="#">
                      Cerrar sesion
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
