import React, { Component } from "react";
import Swal from "sweetalert2";
import { getMaterials } from "../../services/materialService";
//import { getProviders } from "../../services/providerService";

export default class materialList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materials: null,
      isLoading: null,
    };
  }

  componentDidMount() {
    this.getMaterials();
  }

  async getMaterials() {
    if (!this.state.materials) {
      this.setState({ isLoading: true });

      const resp = await getMaterials("material");

      if (resp.status === "success") {
        console.log(resp);
        this.setState({ materials: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <span>Cargando materiales</span>}

        {this.state.materials && (
          <div>
            <h3 class="text-center">Materiales</h3>

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
                      Agregar Material
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
                        <label for="idproveedor">Código de Proveedor</label>
                        <input
                          name="idproveedor"
                          type="text"
                          class="form-control"
                          id="idproveedor"
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
                        <label for="precio">Precio</label>
                        <input
                          name="precio"
                          type="number"
                          class="form-control"
                          id="precio"
                        ></input>
                      </div>

                      <div class="form-group">
                        <label for="descripcion">Descripción</label>
                        <input
                          name="descripcion"
                          type="text"
                          class="form-control"
                          id="descripcion"
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
                      Editar Material
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
                        <label for="idproveedor">Código de Proveedor</label>
                        <input
                          name="idproveedor"
                          type="text"
                          class="form-control"
                          id="idproveedor"
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
                        <label for="precio">Precio</label>
                        <input
                          name="precio"
                          type="number"
                          class="form-control"
                          id="precio"
                        ></input>
                      </div>

                      <div class="form-group">
                        <label for="descripcion">Descripción</label>
                        <input
                          name="descripcion"
                          type="text"
                          class="form-control"
                          id="descripcion"
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
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Descripción</th>



                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody id="datosT">
                  {this.state.materials.map((material) => (
                    <tr id={material.id} key={material.id}>
                      <td>{material.id}</td>
                      <td>{material.name}</td>
                      <td>{material.price}</td>
                      <td>{material.amount}</td>
                      <td>{material.description}</td>
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
