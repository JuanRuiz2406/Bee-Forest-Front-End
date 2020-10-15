import React, { Component } from "react";
import Swal from "sweetalert2";
import { getClients } from "../../services/clientService";

export default class clientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: null,
      isLoading: null,
    };
  }

  componentDidMount() {
    this.getClients();
  }

  async getClients() {
    if (!this.state.clients) {
      this.setState({ isLoading: true });

      const resp = await getClients("client");

      if (resp.status === "success") {
        console.log(resp);
        this.setState({ clients: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <span>Cargando clientes</span>}

        {this.state.clients && (
          <div>
            <h3 class="text-center">Clientes</h3>

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
                      Agregar Cliente
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
                    <th scope="col">Cédula</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Correo Electrónico</th>



                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody id="datosT">
                  {this.state.clients.map((client) => (
                    <tr id={client.id} key={client.id}>
                      <td>{client.identificationCard}</td>
                      <td>{client.name}</td>
                      <td>{client.surname}</td>
                      <td>{client.telephone}</td>
                      <td>{client.email}</td>
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
