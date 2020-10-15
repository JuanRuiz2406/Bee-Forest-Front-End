import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
          <Route path="/" exact>
            <Navbar/>
            <RowTickets/>
          </Route>
          <Route path="/algo">
            Algo
          </Route>

          <Route exact path="/productos" component={productList}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
