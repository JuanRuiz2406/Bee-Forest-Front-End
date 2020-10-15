import React from 'react';
import '../Login.css';
import beeforest from '../img/beeforest.jpeg'
class Login extends React.Component{
    render(){
        return(
            <div className="container">
                <div>
                    <img id="logo" src={beeforest} alt=""/>
                    <h1 class="text-center">Bee Forest</h1>
                </div>

                <div className="login">
                    <div className="form">
                        <h2>Iniciar sesión</h2><br/>
                        <p>Nombre de usuario: </p>
                        <input class="form-control" type="text" name="username"/><br/>
                        <p>Contraseña: </p>
                        <input class="form-control" type="password" name="password"/>
                        <p class="center"></p>
                        <input type="submit" style={{background: "#E6A500"}} class="btn btn-light text-white" value="Iniciar Sesión"/>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;