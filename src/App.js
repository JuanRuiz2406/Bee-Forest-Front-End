import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RowTickets from './components/RowTicket';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            Login
          </Route>
          <Route path="/home">
            <div className="container">
            <header className="container marginTop">
              <h1 className="text-center">Bee-Forest</h1>
            </header>
            <div className="container">
              
              <nav className="navbar navbar-expand-lg navbar-light bg-light navPrincipal rounded-lg">
                  <a className="navbar-brand font-weight-bold" href="!#">Bee-Forest</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation" _msthidden="A" _msthiddenattr="1375998" _mstaria-label="320099">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarColor03">
                      <ul className="navbar-nav mr-auto">
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle font-weight-bold" data-toggle="dropdown" href="!#" role="button" aria-haspopup="true" aria-expanded="false">Productos</a>
                          <div className="dropdown-menu" _mstvisible="0">
                            <a className="dropdown-item" href="!#" _msthash="812344" _msttexthash="93353" _mstvisible="1">Productos</a>
                            <a className="dropdown-item" href="!#" _msthash="812851" _msttexthash="180622" _mstvisible="1">Tipos de Producto</a>
                            <a className="dropdown-item" href="!#" _msthash="813358" _msttexthash="230152" _mstvisible="1">Materiales</a>
                            <a className="dropdown-item" href="!#" _msthash="813358" _msttexthash="230152" _mstvisible="1">Proveedores</a>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle font-weight-bold" data-toggle="dropdown" href="!#" role="button" aria-haspopup="true" aria-expanded="false">Personas</a>
                          <div className="dropdown-menu" _mstvisible="0">
                            <a className="dropdown-item" href="!#" _msthash="812344" _msttexthash="93353" _mstvisible="1">Clientes</a>
                            <a className="dropdown-item" href="!#" _msthash="812851" _msttexthash="180622" _mstvisible="1">Colaboradores</a>
                          </div>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle font-weight-bold" data-toggle="dropdown" href="!#" role="button" aria-haspopup="true" aria-expanded="false">Pedidos</a>
                          <div className="dropdown-menu" _mstvisible="0">
                            <a className="dropdown-item" href="!#" _msthash="812344" _msttexthash="93353" _mstvisible="1">Pedidos</a>
                            <a className="dropdown-item" href="!#" _msthash="812851" _msttexthash="180622" _mstvisible="1">Devoluciones</a>
                            <a className="dropdown-item" href="!#" _msthash="813358" _msttexthash="230152" _mstvisible="1">Tipos de Envio</a>
                          </div>
                        </li>
                        </ul>
                      </div>
                </nav>

            </div>

            </div>
            <RowTickets/>
          </Route>
          <Route path="/algo">
            Algo
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
