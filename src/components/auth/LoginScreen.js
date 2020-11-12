import React from "react";
import Swal from "sweetalert2";
import { useForm } from '../../hooks/useForm';
import "./Login.css";
import beeforest from "../../img/beeforest.jpeg";

import { loginCollaborator } from "../../services/collaboratorService";

export const LoginScreen = ({ history }) => {

const [formLoginValues, handleLoginInputChange] = useForm({
username: "admin2",
password: "admin",
});

const { username, password } = formLoginValues;

 const handleLogin =  async (e) => {
e.preventDefault();

    const resp = await loginCollaborator(
        "collaborator/login",
        {username: username, password: password}
    );

    if(resp.status != 'error'){
       
        const resp2 = await loginCollaborator(
            "collaborator/login",
            {username: username, password: password, gettoken: true}
        );

        localStorage.setItem('token', resp);
        localStorage.setItem('identity', JSON.stringify(resp2));

        history.push('/');

    } else {
        Swal.fire("Error", resp.message, "error");
    }
    

};

return (
<div className="container">
    <div>
    <img id="logo" src={beeforest} alt="" />
    <h1 className="text-center">Bee Forest</h1>
    </div>

    <form onSubmit={handleLogin}>
    <div className="login">
        <div className="form">
        <h2>Iniciar sesión</h2>
        <br />
        <p>Nombre de usuario: </p>

        <input
            value={username}
            onChange={handleLoginInputChange}
            className="form-control"
            type="text"
            name="username"
        />
        <br />
        <p>Contraseña: </p>
        <input
            value={password}
            onChange={handleLoginInputChange}
            className="form-control"
            type="password"
            name="password"
        />
        <p className="center"></p>
        <input
            type="submit"
            style={{ background: "#E6A500" }}
            className="btn btn-light text-white"
            value="Iniciar Sesión"
        />
        </div>
    </div>
    </form>
</div>
);
};
