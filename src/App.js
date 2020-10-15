import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import productList from './components/product/product-list'
import providerList from './components/provider/provider-list'
import materialList from './components/material/material-list'
import clientList from './components/client/client-list'
import collaboratorList from './components/collaborator/collaborator-list'
import Login from './components/Login';
import Navbar from './components/Navbar';
import RowTickets from './components/RowTicket';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/home">
            <Navbar/>
            <Route path="/home/pedidos" component={RowTickets}/>
            <Route path="/home/productos" component={productList}/>
            <Route path="/home/proveedores" component={providerList}/>
            <Route path="/home/materiales" component={materialList}/>
            <Route path="/home/clientes" component={clientList}/>
            <Route path="/home/colaboradores" component={collaboratorList}/>
          </Route>
          <Route path="/algo">
            <Link to="/home/productos" className="btn btn-primary">Hola</Link>
          </Route>

         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
