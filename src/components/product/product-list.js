import React, { Component } from "react";
import Swal from "sweetalert2";
import {
  getProducts,
  storeProducts,
  uploadProduct,
} from "../../services/productService";
import { getCategory } from "../../services/categoryService";

export default class productList extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.getCategoryName = this.getCategoryName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.replaceModalProduct = this.replaceModalProduct.bind(this);

    this.state = {
      products: null,
      isLoading: null,

      selectedFiles: undefined,
      requiredItem: 0,
      
      currentProduct: {
        categoryId: null,
        categoryName: "",
        name: "",
        price: "",
        description: "",
        image: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  replaceModalProduct(index) {
    this.setState({
      requiredItem: index
    });
  }

   /*
  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    tempbrochure[requiredItem] = item;
    this.setState({ brochure: tempbrochure });
  }
 
  deleteProduct(index) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });
  }
  */

  onChangeCategoryName(e) {
    const categoryName = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        categoryName: categoryName,
      },
    }));
  }

  onChangeDescription(e) {
    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        description: e.description,
      },
    }));
  }

  onChangeName(e) {
    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        name: e.name,
      },
    }));
  }

  onChangePrice(e) {
    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        price: e.price,
      },
    }));
  }

  async getCategoryName(e) {
    const categoryName = e.target.value;

    e.preventDefault();

    const resp = await getCategory("category", categoryName);

    if (resp.status === "success") {
      console.log(resp.data[0].id);
      this.setState((prevState) => ({
        currentProduct: {
          ...prevState.currentProduct,
          categoryId: resp.data[0].id,
        },
      }));
    } else {
      Swal.fire("Oops", "No se encontro dicha categoria", "error");
    }
  }

  async getProducts() {
    if (!this.state.products) {
      this.setState({ isLoading: true });

      const resp = await getProducts("product");
      console.log(resp);
      if (resp.status === "success") {
        console.log(resp);
        this.setState({ products: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }
  async create() {
    const resp = await storeProducts("product", this.state.currentProduct);

    if (resp.status === "success") {
      console.log(resp);
      this.refreshPage();
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
  }

  selectFile(e) {
    e.preventDefault();
    this.setState({
      selectedFiles: e.target.files,
    });

    console.log(this.state);
  }

  async uploadImage(e) {
    e.preventDefault();
    const resp = await uploadProduct(
      `product/upload/${this.state.products[this.state.requiredItem].id}`,
      this.state.selectedFiles[0]
    );

    if (resp.status === "success") {

      console.log(resp);
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }
  render() {

    const { currentProduct, selectedFiles } = this.state;

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
              <div
                className="modal-dialog modal-dialog-scrollable"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6
                      className="modal-title"
                      id="exampleModalScrollableTitle"
                    >
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
                          value={currentProduct.name}
                          onChange={(e) =>
                            this.onChangeName({ name: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                          name="precio"
                          type="number"
                          className="form-control"
                          id="precio"
                          value={currentProduct.price}
                          onChange={(e) =>
                            this.onChangePrice({ price: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="description">Descripcion</label>
                        <input
                          name="description"
                          type="text"
                          className="form-control"
                          id="description"
                          value={currentProduct.description}
                          onChange={(e) =>
                            this.onChangeDescription({
                              description: e.target.value,
                            })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <input
                          name="categoria"
                          type="categoria"
                          className="form-control"
                          value={currentProduct.categoryName}
                          onChange={this.onChangeCategoryName}
                        ></input>

                        <button
                          className="badge badge-success mr-2"
                          value={currentProduct.categoryName}
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
                      onClick={this.create}
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
              <div
                className="modal-dialog modal-dialog-scrollable"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6
                      className="modal-title"
                      id="exampleModalScrollableTitle"
                    >
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
                        <label htmlFor="nombre">Nombre</label>
                        <input
                          name="nombre"
                          type="text"
                          className="form-control"
                          id="nombreu"
                          value = { this.state.products.length > 0 && this.state.products[this.state.requiredItem].name }
                          onChange={(e) =>
                            this.onChangeName({ name : e.target.value })
                          }
                        ></input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                          name="precio"
                          type="number"
                          className="form-control"
                          id="preciou"
                          value = { this.state.products.length > 0 && this.state.products[this.state.requiredItem].price }
                          onChange={(e) =>
                            this.onChangePrice({ price : e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="description">Descripcion</label>
                        <input
                          name="description"
                          type="text"
                          className="form-control"
                          id="description"
                          value = { this.state.products.length > 0 && this.state.products[this.state.requiredItem].description }
                          onChange={(e) =>
                            this.onChangeDescription({
                              description: e.target.value,
                            })
                          }
                        ></input>
                      </div>
           
                      <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <input
                          name="categoria"
                          type="categoria"
                          className="form-control"
                          value={currentProduct.categoryName}
                          onChange={this.onChangeCategoryName}
                        ></input>

                        <button
                          className="badge badge-success mr-2"
                          value={currentProduct.categoryName}
                          onClick={this.getCategoryName}
                        >
                          Buscar
                        </button>
                      </div>
                      <label className="btn btn-default">
                        <input type="file" onChange={this.selectFile} />
                      </label>

                      <button
                        className="btn btn-success"
                        disabled={!selectedFiles}
                        onClick={this.uploadImage}
                      >
                        subir
                      </button>
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
                    <th scope="col">Precio</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody id="datosT">
                  {this.state.products.map(( product, index) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      {this.state.products[index].image ? <td > <img className="img" src={`http://127.0.0.1:8000/api/product/image/${product.image}`} width="200" height="200"></img></td>: 
                      <td > No image</td>}
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                        <button
                          className="btn btn-outline-warning"
                          data-toggle="modal"
                          data-target="#ModalEditar"
                          onClick={() => this.replaceModalProduct(index)}
                        >
                          editar
                        </button>
                        <button
                          className="btn btn-outline-danger"
                        >
                          Eliminar
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
