import React from 'react';
import './App.css';
import 'jquery';
import 'bootswatch/dist/litera/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <header className="container marginTop">
        <h1 className="text-center">Bee-Forest</h1>
      </header>
      <div className="container">
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="!#" _msthash="1455025" _msttexthash="75387">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation" _msthidden="A" _msthiddenattr="1375998" _mstaria-label="320099">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="!#"><font _mstmutation="1" _msthash="574236" _msttexthash="42250">Casa </font><span class="sr-only" _msthash="870259" _msttexthash="97968">(actual)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="!#" _msthash="574613" _msttexthash="136006">Funciones</a>
                  </li>
                   <li className="nav-item">
                    <a className="nav-link" href="!#" _msthash="574990" _msttexthash="95589">Precios</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="!#" _msthash="575367" _msttexthash="110331">acerca de</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="!#" role="button" aria-haspopup="true" aria-expanded="false" _msthash="575744" _msttexthash="174863">Desplegable</a>
                     <div className="dropdown-menu" _mstvisible="0">
                      <a className="dropdown-item" href="!#" _msthash="812344" _msttexthash="93353" _mstvisible="1">Acción</a>
                      <a className="dropdown-item" href="!#" _msthash="812851" _msttexthash="180622" _mstvisible="1">Otra acción</a>
                      <a className="dropdown-item" href="!#" _msthash="813358" _msttexthash="230152" _mstvisible="1">Algo más aquí</a>
                      <div className="dropdown-divider" _mstvisible="1"></div>
                      <a className="dropdown-item" href="!#" _msthash="814372" _msttexthash="254163" _mstvisible="1">Enlace separado</a>
                    </div>
                  </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Búsqueda" _mstplaceholder="127192"></input>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit" _msthash="728481" _msttexthash="127192">Búsqueda</button>
                  </form>
                </div>
          </nav>

      </div>

    </div>
  );
}

export default App;
