import React from 'react';
import '../App.css';

import {
  Link
} from "react-router-dom";

class Navbar extends React.Component{
    render(){
        return(
            <div className="container">
            <header className="container marginTop">
              <h1 className="text-center">Bee-Forest</h1>
            </header>
            <div className="container">
              
              <nav className="navbar navbar-expand-lg navbar-light bg-light navPrincipal rounded-lg">
                  <Link to="/home/pedidos" className="navbar-brand font-weight-bold" type="button">Bee-Forest</Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation" _msthidden="A" _msthiddenattr="1375998" _mstaria-label="320099">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarColor03">
                      <ul className="navbar-nav mr-auto">
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle font-weight-bold" data-toggle="dropdown" href="!#" role="button" aria-haspopup="true" aria-expanded="false">Productos</a>
                          <div className="dropdown-menu" _mstvisible="0">
                            <Link to="/productos" className="dropdown-item">Productos</Link>
                            <Link to="/tipo-de-productos" className="dropdown-item">Tipos de Producto</Link>
                            <Link to="/materiales" className="dropdown-item">Materiales</Link>
                            <Link to="/proveedores" className="dropdown-item">Proveedores</Link>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle font-weight-bold" data-toggle="dropdown" href="!#" role="button" aria-haspopup="true" aria-expanded="false">Personas</a>
                          <div className="dropdown-menu" _mstvisible="0">
                            <Link to="/clientes" className="dropdown-item">Clientes</Link>
                            <Link to="/colaboradores" className="dropdown-item">Colaboradores</Link>
                            <Link to="/direcciones" className="dropdown-item">Direcciones</Link>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle font-weight-bold" data-toggle="dropdown" href="!#" role="button" aria-haspopup="true" aria-expanded="false">Pedidos</a>
                          <div className="dropdown-menu" _mstvisible="0">
                            <Link to="/pedidos" className="dropdown-item">Pedidos</Link>
                            <Link to="/devoluciones" className="dropdown-item">Devoluciones</Link>
                            <Link to="/envios" className="dropdown-item">Tipos de Envio</Link>
                          </div>
                        </li>
                        </ul>
                      </div>
                </nav>
            </div>
            </div>
        );
    }
}

export default Navbar;