import React, { Component } from "react";
import Swal from "sweetalert2";
import { getDirections } from "../../services/directionService";

export default class clientList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          directions: null,
          isLoading: null,
        };
    }
    componentDidMount() {
        this.getDirections();
    }
    async getDirections() {
        if (!this.state.directions) {
          this.setState({ isLoading: true });
    
          const resp = await getDirections("direction");
    
          if (resp.status === "success") {
            console.log(resp);
            this.setState({ directions: resp.data, isLoading: false });
          } else {
            Swal.fire("Error", resp.message, "error");
          }
        }
    }
    render() {
        return (
          <div>
            {this.state.isLoading && <span>Cargando Direccioness</span>}
    
            {this.state.directions && (
              <div>
                <h3 class="text-center">Direcciones</h3>
    
                <button
                  type="button"
                  class="btn btn-dark text-white"
                  data-toggle="modal"
                  data-target="#exampleModalScrollable"
                >
                  Agregar
                </button>
                <br></br>
                <br></br>
                <div
                  class="modal fade"
                  id="exampleModalScrollable"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalScrollableTitle"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalScrollableTitle">
                          Agregar Dirección
                        </h6>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          
                          <div class="form-group">
                            <label for="cliente">Cliente</label>
                            <input
                              name="cliente"
                              type="text"
                              class="form-control"
                              id="cliente"
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="pais">País</label>
                            <input
                              name="pais"
                              type="text"
                              class="form-control"
                              id="pais"
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="provincia">Provincia</label>
                            <input
                              name="provincia"
                              type="text"
                              class="form-control"
                              id="provincia"
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="ciudad">Ciudad</label>
                            <input
                              name="ciudad"
                              type="text"
                              class="form-control"
                              id="ciudad"
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="zipCode">Codigo Postal</label>
                            <input
                              name="zipCode"
                              type="text"
                              class="form-control"
                              id="zipCode"
                            ></input>
                          </div>

                          <div class="form-group">
                            <label for="direccion">Dirección</label>
                            <input
                              name="direccion"
                              type="text"
                              class="form-control"
                              id="direccion"
                            ></input>
                          </div>
    
    
    
    
    
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
    
                <div
                  class="modal fade"
                  id="ModalEditar"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalScrollableTitle"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalScrollableTitle">
                          Editar Cliente
                        </h6>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          
                        <div class="form-group">
                            <label for="cedula">Cédula</label>
                            <input
                              name="cedula"
                              type="number"
                              class="form-control"
                              id="cedula"
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input
                              name="nombre"
                              type="text"
                              class="form-control"
                              id="nombre"
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="apellido">Apellido</label>
                            <input
                              name="apellido"
                              type="text"
                              class="form-control"
                              id="apellido"
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="telefono">Teléfono</label>
                            <input
                              name="telefono"
                              type="number"
                              class="form-control"
                              id="telefono"
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="email">Correo Electrónico</label>
                            <input
                              name="email"
                              type="text"
                              class="form-control"
                              id="email"
                            ></input>
                          </div>
    
    
    
                          
    
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cerrar
                        </button>
                        <input
                          name="agregar"
                          id="realizado2"
                          type="submit"
                          class="btn btn-light"
                          value="Editar"
                          data-dismiss="modal"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
    
                <div id="divTabla" class="table-responsive">
                  <table id="tabla" class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">País</th>
                        <th scope="col">Provincia</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Codigo Postal</th>
                        <th scope="col">Dirección</th>
    
    
    
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="datosT">
                      {this.state.directions.map((direction) => (
                        <tr id={direction.id} key={direction.id}>
                          <td>{direction.clientId}</td>
                          <td>{direction.country}</td>
                          <td>{direction.province}</td>
                          <td>{direction.city}</td>
                          <td>{direction.zipCode}</td>
                          <td>{direction.direction}</td>
                          <td>
                            <button
                              class="btn btn-outline-warning"
                              data-toggle="modal"
                              data-target="#ModalEditar"
                            >
                              <i class="fas fa-edit">Editar</i>
                            </button>
                            <button class="btn btn-outline-danger">
                              <i class="fas fa-trash-alt">Eliminar</i>
                            </button>
                          </td>
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