import React, { Component } from "react";
import Swal from "sweetalert2";
import { getProducts } from "../../services/productService";

export default class productList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      isLoading: null,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    if (!this.state.products) {
      this.setState({ isLoading: true });

      const resp = await getProducts("product");

      if (resp.status === "success") {
        console.log(resp);
        this.setState({ products: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <span>Cargando productos</span>}

        {this.state.products && (
          <div>
            <h3 class="text-center">Productos</h3>

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
                      Agregar Producto
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
                        <label for="cantidad">Cantidad</label>
                        <input
                          name="cantidad"
                          type="number"
                          class="form-control"
                          id="cantidad"
                        ></input>
                      </div>

                      <div class="form-group">
                        <label for="categoria">Categoria</label>
                        <input
                          name="categoria"
                          type="categoria"
                          class="form-control"
                          id="categoria"
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
                      Editar Producto
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
                        <input
                          name="codigoProductou"
                          hidden=""
                          type="text"
                          class="form-control"
                          id="codigoProductou"
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input
                          name="nombre"
                          type="text"
                          class="form-control"
                          id="nombreu"
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="precio">Precio</label>
                        <input
                          name="precio"
                          type="number"
                          class="form-control"
                          id="preciou"
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="cantidad">Cantidad</label>
                        <input
                          name="cantidad"
                          type="number"
                          class="form-control"
                          id="cantidadu"
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="categorias">Tipo de Producto</label>
                        <input
                          disabled
                          name="categoria"
                          type="text"
                          class="form-control"
                          id="categoriasu"
                        ></input>
                      </div>
                      <div class="form-group">
                        <label for="file">Fotografia</label>
                        <input
                          type="file"
                          class="form-control-file"
                          id="photou"
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
                    <th scope="col">ID</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody id="datosT">
                  {this.state.products.map((product) => (
                    <tr id={product.id} key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.image}</td>
                      <td>{product.name}</td>
                      <td>{product.amount}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
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
