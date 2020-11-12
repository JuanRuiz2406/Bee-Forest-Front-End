import React, { Component } from "react";
import "./material-list.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import {
  getMaterials,
  storeMaterial,
  uploadMaterial,
  updateMaterial,
  deleteMaterial,
} from "../../services/materialService";
import { getProvider } from "../../services/providerService";

export default class materialList extends Component {
  constructor(props) {
    super(props);

    this.onChangeProviderName = this.onChangeProviderName.bind(this);
    this.getProviderName = this.getProviderName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.replaceModalMaterial = this.replaceModalMaterial.bind(this);

    this.state = {
      material: null,
      isLoading: null,
      selectedFiles: undefined,
      providerExist: undefined,
      requiredItem: 0,

      currentMaterial: {
        providerId: 0,
        providerName: "",
        name: "",
        price: "",
        amount: 0,
        description: "",
        image: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getMaterials();
  }

  replaceModalMaterial(index, material) {
    this.setState({
      requiredItem: index,
      currentMaterial: material,
    });
  }

  onChangeProviderName(e) {
    e.preventDefault();
    const providerName = e.target.value;

    this.setState((prevState) => ({
      currentMaterial: {
        ...prevState.currentMaterial,
        providerName: providerName,
      },
    }));
  }

  onChangeDescription(e) {
    this.setState((prevState) => ({
      currentMaterial: {
        ...prevState.currentMaterial,
        description: e.description,
      },
    }));
  }

  onChangeName(e) {
    this.setState((prevState) => ({
      currentMaterial: {
        ...prevState.currentMaterial,
        name: e.name,
      },
    }));
  }

  onChangePrice(e) {
    this.setState((prevState) => ({
      currentMaterial: {
        ...prevState.currentMaterial,
        price: e.price,
      },
    }));
  }

  onChangeAmount(e) {
    this.setState((prevState) => ({
      currentMaterial: {
        ...prevState.currentMaterial,
        amount: e.amount,
      },
    }));
  }

  async getProviderName(e) {
    e.preventDefault();
    if (this.state.currentMaterial.providerName === "") {
      this.state.currentMaterial.providerName = "no exist";
    }
    const resp = await getProvider(
      "provider",
      this.state.currentMaterial.providerName
    );

    if (resp.status === "success") {
      this.state.providerExist = true;
      this.setState((prevState) => ({
        currentMaterial: {
          ...prevState.currentMaterial,
          providerId: resp.data[0].id,
          image: "",
        },
      }));

      Swal.fire({
        icon: "success",
        title: `Nombre del proveedor ${resp.data[0].name}`,
        timer: 1500,
      });
    } else {
      Swal.fire("Oops", "No se encontro dicho proveedor", "error");
    }
  }

  async getMaterials() {
    if (!this.state.material) {
      this.setState({ isLoading: true });

      const resp = await getMaterials("material");
      if (resp.status === "success") {
        this.setState({ material: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }

  async create() {
    const resp = await storeMaterial("material", this.state.currentMaterial);

    console.log(this.state.currentMaterial);

    if (resp.status === "success") {
      console.log(resp);
      this.refreshPage();
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }

  async update(e) {
    e.preventDefault();
    console.log(this.state.currentMaterial);

    let json = {
      providerId: this.state.currentMaterial.providerId,
      name: this.state.currentMaterial.name,
      price: this.state.currentMaterial.price,
      amount: this.state.currentMaterial.amount,
      description: this.state.currentMaterial.description,
      image: this.state.currentMaterial.image,
    };

    let d = false;
    await Swal.fire({
      title: "Esta seguro?",
      text: "Esta seguro de actualizar el material",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar!",
    }).then((result) => {
      if (result.isConfirmed) {
        d = true;
      }
    });

    if (d) {
      const resp = await updateMaterial(
        `material/${this.state.currentMaterial.id}`,
        json
      );

      if (resp.status === "success") {
        console.log(resp);
      } else {
        Swal.fire("Error", resp.message, "error");
      }

      this.refreshPage();
    }
  }

  async delete(materialId) {
    // delete entity - DELET
    let d = false;
    await Swal.fire({
      title: "Esta seguro?",
      text: "Se eliminaran todos los datos relacionados con este material",
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
      await deleteMaterial(`material/${materialId}`);
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
    const resp = await uploadMaterial(
      `material/upload/${this.state.material[this.state.requiredItem].id}`,
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
    const { currentMaterial, selectedFiles, providerExist } = this.state;

    const columns = [
      {
        dataField: "id",
        text: "ID",
        headerStyle: (colum, colIndex) => {
          return { width: "60px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "name",
        text: "Nombre",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "image",
        text: "Imagen",
        formatter: (e, column, columnIndex) => {
          console.log(column);
          console.log(columnIndex);

          return (
            <img
              className="img"
              src={`http://127.0.0.1:8000/api/material/image/${column.image ? column.image || null : "../img/noImagen.png"
                }`}
              width="200"
              height="250"
            ></img>
          );
        },
        headerStyle: (colum, colIndex) => {
          return { width: "250px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "price",
        text: "Precio",
        formatter: (e, column, columnIndex) => {
          return <p>{new Intl.NumberFormat("en-EN").format(column.price)}</p>;
        },
        headerStyle: (colum, colIndex) => {
          return { width: "100px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "amount",
        text: "Cantidad",
        formatter: (e, column, columnIndex) => {
          return <p>{new Intl.NumberFormat("en-EN").format(column.amount)}</p>;
        },
        headerStyle: (colum, colIndex) => {
          return { width: "113px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "description",
        text: "Descripcion",
        headerStyle: (colum, colIndex) => {
          return { width: "250px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "accions",
        text: "Aciones",
        formatter: (e, column, columnIndex) => {
          return (
            <div>
              <button
                className="btn btn-outline-warning"
                data-toggle="modal"
                data-target="#ModalEditar"
                onClick={() => this.replaceModalMaterial(columnIndex, column)}
              >
                Editar
              </button>
              <button
                onClick={() => this.delete(column.id)}
                className="btn btn-outline-danger"
              >
                Eliminar
              </button>

            </div>
          );
        },
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
        },
      },
    ];
    const defaultSorted = [
      {
        dataField: "name",
        order: "desc",
      },
    ];

    const pagination = paginationFactory({
      page: 1,
      sizePerPage: 5,
      lastPageText: ">>",
      firstPageText: "<<",
      nextPageText: ">",
      prePageText: "<",
      showTotal: true,
      alwaysShowAllBtns: true,
    });
    const { SearchBar, ClearSearchButton } = Search;

    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        <div>
          <button className="btn btn-success" onClick={handleClick}>
            Exportar a CSV
          </button>
          <br />
          <br />
        </div>
      );
    };

    return (
      <div>
        {this.state.isLoading && <span>Cargando materiales</span>}

        {this.state.material && (
          <div>
            <h3 className="text-center">Materiales</h3>

            <button
              type="button"
              className="btn btn-dark text-white"
              data-toggle="modal"
              data-target="#exampleModalScrollable"
              onClick={() => {
                this.setState({ currentMaterial: null });
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
                      Agregar Material
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
                            currentMaterial ? currentMaterial.name || "" : ""
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
                            currentMaterial ? currentMaterial.price || "" : ""
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
                            currentMaterial
                              ? currentMaterial.description || ""
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
                        <label htmlFor="proveedor">Proveedor</label>
                        <input
                          name="proveedor"
                          type="proveedor"
                          className="form-control"
                          value={
                            currentMaterial
                              ? currentMaterial.providerName || ""
                              : ""
                          }
                          onChange={this.onChangeProviderName || ""}
                        ></input>

                        <button
                          className="badge badge-success mr-2"
                          onClick={
                            currentMaterial ? this.getProviderName || null : null
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
                          currentMaterial: null,
                          providerExist: undefined,
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
                      disabled={!providerExist}
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
                      Editar Material
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
                            currentMaterial ? currentMaterial.name || "" : ""
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
                            currentMaterial ? currentMaterial.price || "" : ""
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
                            currentMaterial
                              ? currentMaterial.description || ""
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
                        <label htmlFor="proveedor">Proveedor</label>
                        <input
                          name="proveedor"
                          type="proveedor"
                          className="form-control"
                          value={
                            currentMaterial
                              ? currentMaterial.providerName || ""
                              : ""
                          }
                          onChange={this.onChangeProviderName || ""}
                        ></input>

                        <button
                          className="badge badge-success mr-2"
                          onClick={this.getProviderName}
                        >
                          Buscar Proveedor
                        </button>
                      </div>

                      <hr></hr>

                      <div className="form-group">
                        <label htmlFor="amount">Cantidad</label>
                        <input
                          name="amount"
                          type="number"
                          className="form-control"
                          id="amount"
                          value={
                            currentMaterial ? currentMaterial.amount || 0 : 0
                          }
                          onChange={(e) =>
                            this.onChangeAmount({ amount: e.target.value })
                          }
                        ></input>
                      </div>

                      <hr></hr>

                      <label htmlFor="amount">Imagen</label>
                      <br />
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
                          currentMaterial: null,
                          providerExist: undefined,
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
                      onClick={this.update}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <ToolkitProvider
              bootstrap4
              keyField="id"
              data={this.state.material}
              columns={columns}
              search
              exportCSV
            >
              {(props) => (
                <div>
                  <h6>Busca por cualquier parametro</h6>
                  <SearchBar {...props.searchProps} />
                  <ClearSearchButton {...props.searchProps} />
                  <hr />
                  <MyExportCSV {...props.csvProps} />
                  <BootstrapTable
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                    {...props.baseProps}
                    wrapperClasses="table-responsive"
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        )}
      </div>
    );
  }
}