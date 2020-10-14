import React from 'react';

class Card extends React.Component {
    render(){
        return (
            <div className="container">
                <div className="card border-warning mb-3">
                    <div className="card-header font-weight-bold">Pedido</div>
                        <div className="card-body text-warning">
                            <h5 className="card-title">Warning card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                </div>
            </div>
           
        );
    }
}

export default Card;