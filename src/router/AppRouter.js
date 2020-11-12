import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { App } from '../App';
import { LoginScreen } from '../components/auth/LoginScreen';


export const AppRouter = () => {

    let identity = JSON.parse(localStorage.getItem('identity'));
    
    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ !!identity }
                    />

                    <PrivateRoute 
                        path="/"
                        component={ App } 
                        isAuthenticated={ !!identity }
                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
