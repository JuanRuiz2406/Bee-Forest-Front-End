import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import productList from './components/product/product-list'
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
