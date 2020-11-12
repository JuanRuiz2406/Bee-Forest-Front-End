import React from 'react';
import {
  Switch,
  Route,

} from "react-router-dom";

import productList from './components/product/product-list'
import categoryList from './components/category/category-list'
import providerList from './components/provider/provider-list'
import materialList from './components/material/material-list'
import clientList from './components/client/client-list'
import Navbar from './components/Navbar';
import RowTickets from './components/RowTicket';
import shippingList from './components/shipping/shipping-list'

export const App = () => {

  return (
    <>
      <Navbar />

      <div className="container">
        <Switch>
            <Route exact path="/pedidos" component={RowTickets}/>
            <Route exact path="/productos"  component={productList}/>
            <Route exact path="/tipo-de-productos"  component={categoryList}/>
            <Route exact path="/proveedores" component={providerList}/>
            <Route exact path="/materiales" component={materialList}/>
            <Route exact path="/clientes" component={clientList}/>
            <Route exact path="/envios" component={shippingList}/>

    
        </Switch>
      </div>
    </>
  )
}