import React, { Component } from "react";
import Swal from "sweetalert2";
import { getCollaborators } from "../../services/collaboratorService";

export default class collaboratorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: null,
      isLoading: null,
    };
  }

  componentDidMount() {
    this.getCollaborators();
  }

  async getCollaborators() {
    if (!this.state.collaborators) {
      this.setState({ isLoading: true });

      const resp = await getCollaborators("collaborator");

      if (resp.status === "success") {
        console.log(resp);
        this.setState({ collaborators: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <span>Cargando Colaboradores</span>}

        {this.state.collaborators && (
          <div>
            <h3 class="text-center">Colaboradores</h3>

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
                      Agregar Colaborador
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
                        <label for="username">Nombre de Usuario</label>
                        <input
                          name="username"
                          type="text"
                          class="form-control"
                          id="username"
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

                      <div class="form-group">
                        <label for="rol">Rol</label>
                        <select name="rol" id="rol">
                        <option value="admin">Administrador</option>
                        <option value="standart">Estándar</option>
                      </select>
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
                      Editar Colaborador
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
                        <label for="username">Nombre de Usuario</label>
                        <input
                          name="username"
                          type="text"
                          class="form-control"
                          id="username"
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

                      <div class="form-group">
                        <label for="rol">Rol</label>
                        <select name="rol" id="rol">
                        <option value="admin">Administrador</option>
                        <option value="standart">Estándar</option>
                      </select>
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
                    <th scope="col">Nombre de Usuario</th>

                    <th scope="col">Correo Electrónico</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody id="datosT">
                  {this.state.collaborators.map((collaborator) => (
                    <tr id={collaborator.id} key={collaborator.id}>
                      <td>{collaborator.username}</td>

                      <td>{collaborator.email}</td>
                      <td>{collaborator.role}</td>
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
