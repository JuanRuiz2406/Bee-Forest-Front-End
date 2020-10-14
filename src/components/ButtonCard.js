import React from 'react';

class ButtonCard extends React.Component {
    render(){
        return(
            <div>
                <a className="btn btn-warning text-white">Realizado</a>
                <a className="btn btn-link text-danger">Cancelar</a>
            </div> 
        );
    }

}