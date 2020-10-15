import React, { Component } from "react";
import Swal from "sweetalert2";
import { getProducts } from "../../services/productService";
import { getCategory } from "../../services/categoryService";

export default class productList extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.getCategoryName = this.getCategoryName.bind(this);

        this.state = {
        products: null,
        isLoading: null,

        currentProduct: {
            categoryId: null,
            categoryName: "",
            name: "",
            price: "",
            description: "",
          },
          message: ""
        };
    }

    componentDidMount() {
        this.getProducts();
    }

     onChangeCategoryName(e) {

        const categoryName = e.target.value;

            this.setState(prevState => ({
                currentProduct: {
                ...prevState.currentProduct,
                categoryName: categoryName
              }
            }));

    }

    async getCategoryName(e) {
       
        const categoryName = e.target.value;

        e.preventDefault();

        const resp = await getCategory("category", categoryName);

        if (resp.status === "success") {
            console.log(resp.data[0].id);
            this.setState(prevState => ({
                currentProduct: {
                ...prevState.currentProduct,
                categoryId : resp.data[0].id
              }
            }));
        } else {
            Swal.fire("Oops", 'No se encontro dicha categoria', "error");
        }
     
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
    const { currentProduct } = this.state;
    return (
      <div>
        {this.state.isLoading && <span>Cargando productos</span>}

        {this.state.products && (
          <div>
            <h3 className="text-center">Productos</h3>

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
              role="dialog"
              aria-labelledby="exampleModalScrollableTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title" id="exampleModalScrollableTitle">
                      Agregar Producto
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
                          id="nombre"
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                          name="precio"
                          type="number"
                          className="form-control"
                          id="precio"
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input
                          name="cantidad"
                          type="number"
                          className="form-control"
                          id="cantidad"
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <input
                          name="categoria"
                          type="categoria"
                          className="form-control"
                          value= {currentProduct.categoryName}
                          onChange={this.onChangeCategoryName}
                        ></input>

                        <button
                        className="badge badge-success mr-2"
                        value= {currentProduct.categoryName}
                        onClick={this.getCategoryName}
                        >
                        Buscar
                        </button>
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
                      className="btn btn-primary"
                      value="Agregar"
                      data-dismiss="modal"
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="ModalEditar"
 
              role="dialog"
              aria-labelledby="exampleModalScrollableTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title" id="exampleModalScrollableTitle">
                      Editar Producto
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
                        <input
                          name="codigoProductou"
                          hidden=""
                          type="text"
                          className="form-control"
                          id="codigoProductou"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                          name="nombre"
                          type="text"
                          className="form-control"
                          id="nombreu"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                          name="precio"
                          type="number"
                          className="form-control"
                          id="preciou"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input
                          name="cantidad"
                          type="number"
                          className="form-control"
                          id="cantidadu"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="categorias">Tipo de Producto</label>
                        <input
                          disabled
                          name="categoria"
                          type="text"
                          className="form-control"
                          id="categoriasu"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="file">Fotografia</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="photou"
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
                      value="Editar"
                      data-dismiss="modal"
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            <div id="divTabla" className="table-responsive">
              <table id="tabla" className="table table-hover">
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
                          className="btn btn-outline-warning"
                          data-toggle="modal"
                          data-target="#ModalEditar"
                        >
                          <i className="fas fa-edit">Editar</i>
                        </button>
                        <button className="btn btn-outline-danger">
                          <i className="fas fa-trash-alt">Eliminar</i>
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
