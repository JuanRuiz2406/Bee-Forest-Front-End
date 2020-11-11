import React, { Component } from "react";
import "./category-list.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitCategory, { Search } from "react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import {
  getCategories,
  storeCategories,
  updateCategories,
  deleteCategories,
} from "../../services/categoryService";

export default class categoryList extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      categories: null,
      isLoading: null,
      requiredItem: 0,

      currentCategory: {
        id: 0,
        name: "",
        description: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  replaceModalCategory(index, category) {
    this.setState({
      requiredItem: index,
      currentCategory: category,
    });
  }

  onChangeName(e) {
    this.setState((prevState) => ({
      currentCategory: {
        ...prevState.currentCategory,
        name: e.name,
      },
    }));
  }

  onChangeDescription(e) {
    this.setState((prevState) => ({
      currentCategory: {
        ...prevState.currentCategory,
        description: e.description,
      },
    }));
  }
  
  async getCategories() {
    if (!this.state.categories) {
      this.setState({ isLoading: true });

      const resp = await getCategories("category");
      if (resp.status === "success") {
        this.setState({ categories: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }
  
  async create() {
    const resp = await storeCategories("category", this.state.currentCategory);

    console.log(this.state.currentCategory);

    if (resp.status === "success") {
      console.log(resp);
      this.refreshPage();
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }

  async update(e) {
    e.preventDefault();
    console.log(this.state.currentCategory);
    let d = false;
    
    let json = {
      name: this.state.currentCategory.name,
      description: this.state.currentCategory.description,
    };

    await Swal.fire({
      title: "Esta seguro?",
      text: "Esta seguro de actualizar el Tipo de Producto",
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
      const resp = await updateCategories(
        `category/${this.state.currentCategory.id}`,
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

  async delete(categoryId) {
    let d = false;
    await Swal.fire({
      title: "Esta seguro?",
      text: "Se eliminaran todos los datos relacionados con este Tipo de Producto",
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
      await deleteCategories(`category/${categoryId}`);
      this.refreshPage();
    }
  }

  render() {
    const { currentCategory } = this.state;
    
    const columns = [
      {
        dataField: "id",
        text: "#",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
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
        dataField: "description",
        text: "Descripción",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
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
                onClick={() => this.replaceModalCategory(columnIndex, column)}
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
        {this.state.isLoading && <span>Cargando Tipos de Productos</span>}

        {this.state.categories && (
          <div>
            <h3 className="text-center">Tipos de Productos</h3>

            <button
              type="button"
              className="btn btn-dark text-white"
              data-toggle="modal"
              data-target="#exampleModalScrollable"
              onClick={() => {
                this.setState({ currentCategory: null });
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
                      Agregar Tipo de Producto
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
                            currentCategory ? currentCategory.name || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeName({ name: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <input
                          name="description"
                          type="text"
                          className="form-control"
                          id="description"
                          value={
                            currentCategory ? currentCategory.description || "" : ""
                          }
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
                      onClick={() => {
                        this.setState({
                          currentCategory: null,
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
                      Editar Tipo de Producto
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
                            currentCategory ? currentCategory.name || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeName({ name: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <input
                          name="description"
                          type="text"
                          className="form-control"
                          id="description"
                          value={
                            currentCategory ? currentCategory.description || "" : ""
                          }
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
                      onClick={() => {
                        this.setState({
                          currentCategory: null,
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
            <ToolkitCategory
              bootstrap4
              keyField="id"
              data={this.state.categories}
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
            </ToolkitCategory>
          </div>
        )}
      </div>
    );
  }
}
