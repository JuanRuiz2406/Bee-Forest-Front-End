import React, { Component } from "react";
import Swal from "sweetalert2";
import { getShipping, storeShippings, updateShipping } from "../../services/shippingService";

export default class shippingList extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.replaceModalShipping = this.replaceModalShipping.bind(this);


        this.state = {
            shippings: null,
            isLoading: null,

            requiredItem: 0,

            currentShipping: {
                id: "",
                name: "",
                price: "",
                description: ""
            },
            message: "",
        };
    }

    replaceModalShipping(index) {
        this.setState({
            requiredItem: index
        });
    }

    componentDidMount(){
        this.getShipping();
    }

    onChangeName(e) {
        this.setState((prevState) => ({
            currentShipping: {
                ...prevState.currentShipping,
                name: e.name,
            },
        }));
    }

    onChangePrice(e) {
        this.setState((prevState) => ({
            currentShipping: {
                ...prevState.currentShipping,
                price: e.price,
            },
        }));
    }

    onChangeDescription(e) {
        this.setState((prevState) => ({
            currentShipping: {
                ...prevState.currentShipping,
                description: e.description,
            },
        }));
    }

    refreshPage() {
        window.location.reload();
      }

    async getShipping() {
        if (!this.state.shippings) {
            this.setState({ isLoading: true });

            const resp = await getShipping("shipping");

            if (resp.status === "success") {
                console.log(resp);
                this.setState({ shippings: resp.data, isLoading: false });
            }else {
                Swal.fire("Error", resp.message, "error");
            }
        }
    }

    async create() {

        const resp =  await storeShippings("shipping", this.state.currentShipping);

        if(resp.status === "success"){
                console.log(resp);
                this.refreshPage();
        }else{
            Swal.fire("Error", resp.message, "error");
        }
    }

    update(e) {
        // update entity - PUT
        e.preventDefault();
      }

    render() {

        const { currentShipping } = this.state;

        return (
            <div>
                {this.state.isLoading && <span>Cargando Tipos de envios</span>}

                {this.state.shippings && (
                    <div>
                        <h3 className="text-center">Tipos de Envío</h3>

                        <button
                        type="button"
                        className="btn btn-dark text-white"
                        data-toggle="modal"
                        data-target="#exampleModalScrollable"
                        >
                        Agregar
                        </button>
                        <br></br>
                        <br></br>

                        <div
                        className="modal fade"
                        id="exampleModalScrollable"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalScrollableTitle"
                        aria-hidden="true"
                        >
                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="exampleModalScrollableTitle">
                                Agregar Tipo de envio
                                </h6>
                                <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                >
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                    name="nombreEdit"
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={currentShipping.name}
                                    onChange={(e) => 
                                        this.onChangeName({ name: e.target.value })
                                    }
                                    ></input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Precio</label>
                                    <input
                                    name="priceEdit"
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={currentShipping.price}
                                    onChange={(e) => 
                                        this.onChangePrice({ price: e.target.value })
                                    }
                                    ></input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripcion</label>
                                    <input
                                    name="descriptionEdit"
                                    type="text"
                                    className="form-control"
                                    id="descripcion"
                                    value={currentShipping.description}
                                    onChange={(e) => 
                                        this.onChangeDescription({ description: e.target.value })
                                    }
                                    ></input>
                                </div>


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                >
                                Cerrar
                                </button>
                                <input
                                name="agregar"
                                id="realizado2"
                                type="submit"
                                className="btn btn-light"
                                value="Agregar"
                                data-dismiss="modal"
                                onClick={this.create}
                                ></input>
                            </div>
                            </div>
                        </div>
                        </div>




                        <div
                        className="modal fade"
                        id="ModalEditar"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalScrollableTitle"
                        aria-hidden="true"
                        >
                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="exampleModalScrollableTitle">
                                Editar Tipo de envio
                                </h6>
                                <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                >
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                    name="nombre"
                                    type="text"
                                    className="form-control"
                                    id="nombreu"
                                    value={ this.state.shippings.length > 0 && this.state.shippings[this.state.requiredItem].name}
                                    onChange={(e) => 
                                        this.onChangeName({ name: e.target.value })
                                    }
                                    ></input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Precio</label>
                                    <input
                                    name="price"
                                    type="number"
                                    className="form-control"
                                    id="priceu"
                                    value={ this.state.shippings.length > 0 && this.state.shippings[this.state.requiredItem].price}
                                    onChange={(e) => 
                                        this.onChangePrice({ price: e.target.value })
                                    }
                                    ></input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripcion</label>
                                    <input
                                    name="descripcion"
                                    type="text"
                                    className="form-control"
                                    id="descripcionu"
                                    value={ this.state.shippings.length > 0 && this.state.shippings[this.state.requiredItem].description}
                                    onChange={(e) => 
                                        this.onChangeDescription({ description: e.target.value })
                                    }
                                    ></input>
                                </div>


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                >
                                Cerrar
                                </button>
                                <input
                                name="Editar"
                                id="realizado2"
                                type="submit"
                                className="btn btn-light"
                                value="Editar"
                                data-dismiss="modal"
                                ></input>
                            </div>
                            </div>
                        </div>
                        </div>


                        <div id="divTable" className="table-responsive">
                            <table id="tabla" className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Descripcion</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="datosT">
                                    {this.state.shippings.map((shippings, index) =>(
                                        <tr id={shippings.id} key={shippings.id}>
                                            <th>{shippings.name}</th>
                                            <th>{shippings.price}</th>
                                            <th>{shippings.description}</th>
                                            <th>
                                            <button
                                                className="btn btn-outline-warning"
                                                data-toggle="modal"
                                                data-target="#ModalEditar"
                                                onClick={() => this.replaceModalShipping(index)}
                                                >
                                                <i className="fas fa-edit">Editar</i>
                                            </button>
                                            <button className="btn btn-outline-danger">
                                                <i className="fas fa-trash-alt">Eliminar</i>
                                            </button>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>              
                )}
            </div>
        );
    }
}