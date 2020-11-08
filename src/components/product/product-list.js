import React, { Component } from "react";
import Swal from "sweetalert2";
import {
  getProducts,
  storeProducts,
  uploadProduct,
  updateProducts,
  deleteProducts,
} from "../../services/productService";
import { getCategory } from "../../services/categoryService";

export default class productList extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.getCategoryName = this.getCategoryName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
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
      categoryExist: undefined,
      requiredItem: 0,

      currentProduct: {
        categoryId: null,
        categoryName: "",
        name: "",
        price: "",
        amount: "",
        description: "",
        image: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  replaceModalProduct(index, product) {
    this.setState({
      requiredItem: index,
      currentProduct: product,
    });
  }

  onChangeCategoryName(e) {
    e.preventDefault();
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

  onChangeAmount(e) {
    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        amount: e.amount,
      },
    }));
  }

  async getCategoryName(e) {
    e.preventDefault();
    if (this.state.currentProduct.categoryName === "") {
      this.state.currentProduct.categoryName = "no exist";
    }
    const resp = await getCategory(
      "category",
      this.state.currentProduct.categoryName
    );

    if (resp.status === "success") {
      console.log(resp.data[0].id);
      this.state.categoryExist = true;
      this.setState((prevState) => ({
        currentProduct: {
          ...prevState.currentProduct,
          categoryId: resp.data[0].id,
          image: "",
        },
      }));

      Swal.fire({
        icon: "success",
        title: `Nombre de la categoria ${resp.data[0].name}`,
        timer: 1500,
      });
    } else {
      Swal.fire("Oops", "No se encontro dicha categoria", "error");
    }
  }

  async getProducts() {
    if (!this.state.products) {
      this.setState({ isLoading: true });

      const resp = await getProducts("product");
      if (resp.status === "success") {
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

    console.log(this.state.currentProduct);

    if (resp.status === "success") {
      console.log(resp);
      this.refreshPage();
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }

  async update(e) {
    // update entity - PUT
    e.preventDefault();

    console.log(this.state.currentProduct);

    const resp = await updateProducts(
      `product/${this.state.currentProduct.id}`,
      this.state.currentProduct
    );

    if (resp.status === "success") {
      console.log(resp);
      this.refreshPage();
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }

  async delete(productId) {
    // delete entity - DELET
    let d = false;
    await Swal.fire({
      title: "Esta seguro?",
      text: "Se eliminaran todos los datos relacionados con este producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        d = true;
      }
    });

    if (d) {
      await deleteProducts(`product/${productId}`);
      this.refreshPage();
    }
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
      Swal.fire({
        icon: "success",
        title: `Imagen subida`,
        timer: 1500,
      });
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }
  render() {
    const { currentProduct, selectedFiles, categoryExist } = this.state;

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
              onClick={() => {
                this.setState({ currentProduct: null });
              }}
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
                          value={
                            currentProduct ? currentProduct.name || "" : ""
                          }
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
                          value={
                            currentProduct ? currentProduct.price || "" : ""
                          }
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
                          value={
                            currentProduct
                              ? currentProduct.description || ""
                              : ""
                          }
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
                          value={
                            currentProduct
                              ? currentProduct.categoryName || ""
                              : ""
                          }
                          onChange={this.onChangeCategoryName || ""}
                        ></input>

                        <button
                          className="badge badge-success mr-2"
                          onClick={
                            currentProduct ? this.getCategoryName || null : null
                          }
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
                      onClick={() => {
                        this.setState({
                          currentProduct: null,
                          categoryExist: undefined,
                        });
                      }}
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
                      disabled={!categoryExist}
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
                          value={
                            currentProduct ? currentProduct.name || "" : ""
                          }
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
                          id="preciou"
                          value={
                            currentProduct ? currentProduct.price || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangePrice({ price: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="amount">Cantidad</label>
                        <input
                          name="amount"
                          type="number"
                          className="form-control"
                          id="amount"
                          value={
                            currentProduct ? currentProduct.amount || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeAmount({ amount: e.target.value })
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
                          value={
                            currentProduct
                              ? currentProduct.description || ""
                              : ""
                          }
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
                          value={
                            currentProduct
                              ? currentProduct.categoryName || ""
                              : ""
                          }
                          onChange={this.onChangeCategoryName || ""}
                        ></input>

                        <button
                          className="badge badge-success mr-2"
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
                      onClick={() => {
                        this.setState({
                          currentProduct: null,
                          categoryExist: undefined,
                          selectedFiles: null,
                        });
                      }}
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
                      disabled={!categoryExist || !selectedFiles}
                      onClick={this.update}
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
                    <th scope="col">Cantidad</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody id="datosT">
                  {this.state.products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      {this.state.products[index].image ? (
                        <td>
                          <img
                            className="img"
                            src={`http://127.0.0.1:8000/api/product/image/${product.image}`}
                            width="200"
                            height="250"
                          ></img>
                        </td>
                      ) : (
                        <td>
                          <img
                            className="img"
                            src="https://elperiodicocr.com/wp-content/uploads/2018/05/no-imagen.jpg"
                            width="200"
                            height="250"
                          ></img>
                        </td>
                      )}
                      <td>{product.name}</td>
                      <td>
                        {new Intl.NumberFormat("en-EN").format(product.price)}
                      </td>
                      <td>
                        {new Intl.NumberFormat("en-EN").format(product.amount)}
                      </td>
                      <td>{product.description}</td>
                      <td>
                        <button
                          className="btn btn-outline-warning"
                          data-toggle="modal"
                          data-target="#ModalEditar"
                          onClick={() =>
                            this.replaceModalProduct(index, product)
                          }
                        >
                          editar
                        </button>
                        <button
                          onClick={() => this.delete(product.id)}
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
