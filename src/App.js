import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
