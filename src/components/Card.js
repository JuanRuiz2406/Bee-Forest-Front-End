import React from 'react';

class Card extends React.Component {
    render(){
        return (
            <div className="container">
                <div className="card border-warning mb-3">
                    <div className="card-body">
                        <div className="card-header font-weight-bold">Pedido</div>
                            <label className="font-weight-bold" for="">Fecha de Entrega</label>
                            <p>hola</p>
                            <label className="font-weight-bold" for="">Codigo de Pedido</label>
                            <p>hola</p>
                            <label className="font-weight-bold" for="">Tipo de envío</label>
                            <p>hola</p>
                            <label className="font-weight-bold" for="">Productos</label>
                            <table className="table table-borderedless">
                                <thead>
                                    <tr>
                                        <th scope="col">Producto</th>
                                        <th scope="col">cant.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>Miel</td>
                                    <td>100</td>
                                </tbody>
                            </table>
                            <br></br>
                            <label className="font-weight-bold" for="">Precio Total</label>
                            <p>hola</p>
                            <label className="font-weight-bold" for="">Estado</label>
                            <p>hola</p>
                            <label className="font-weight-bold" for="">Colaborador</label>
                            <p>hola</p>
                    </div>
                </div>
            </div>
           
        );
    }
}

export default Card;