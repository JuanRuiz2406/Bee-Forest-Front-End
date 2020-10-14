import React from 'react';
import Card from './Card';
import '../App.css';

class RowTickets extends React.Component{
    render(){
        return(
            <div className="container rowMargin">
                <div className="row">
                    <div className="col-md-4">
                        <Card/>
                    </div>
                </div>
            </div>
        );
    }
}

export default RowTickets;