import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import {
  getCollaborators,
  storeCollaborator,
  updateCollaborator,
  deleteCollaborator,
} from "../../services/collaboratorService";

export default class collaboratorList extends Component {
  constructor(props) {
    super(props);

    this.getCollaborators = this.getCollaborators.bind(this);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.replaceModalCollaborator = this.replaceModalCollaborator.bind(this);

    this.state = {
      collaborators: null,
      isLoading: null,
      requiredItem: 0,

      currentCollaborator: {
       id: '',
        username: "",
        password: "",
        email: "",
        role: "",
      },
    };
  }

  async getCollaborators() {
    if (!this.state.collaborators) {
      this.setState({ isLoading: true });

      const resp = await getCollaborators("collaborator/all");
      if (resp.status === "success") {
        console.log(resp);
        this.setState({ collaborators: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  componentDidMount() {
    this.getCollaborators();
  }

  onChangeUsername(e) {
    this.setState((prevState) => ({
      currentCollaborator: {
        ...prevState.currentCollaborator,
        username: e.username,
      },
    }));
  }

  onChangePassword(e) {
    this.setState((prevState) => ({
      currentCollaborator: {
        ...prevState.currentCollaborator,
        password: e.password,
      },
    }));
  }

  onChangeEmail(e) {
    this.setState((prevState) => ({
      currentCollaborator: {
        ...prevState.currentCollaborator,
        email: e.email,
      },
    }));
  }

  onChangeRole(e) {
    console.log(e.role);
    this.setState((prevState) => ({
      currentCollaborator: {
        ...prevState.currentCollaborator,
        role: e.role,
      },
    }));
  }

  refreshPage() {
    window.location.reload();
  }
  async create() {
    const resp = await storeCollaborator(
      "collaborator/register",
      this.state.currentCollaborator
    );

    console.log(this.state.currentCollaborator);

    if (resp.status === "success") {
      console.log(resp);
      this.refreshPage();
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }

  async update(e) {

    let d = false;
    await Swal.fire({
      title: "Esta seguro?",
      text: "Desea actualizar este colaborador",
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
      const resp = await updateCollaborator(
        `collaborator/update/${ this.state.currentCollaborator.id }`,
        this.state.currentCollaborator
      );
      this.refreshPage();
    }
  }

  async delete(collaboratorId, collaborator) {

    if(collaborator.role === 'admin'){
      Swal.fire("Error", 'No puedes eliminar un role admin', "error");
    } else {

  
    let d = false;
    await Swal.fire({
      title: "Esta seguro?",
      text: "Seguro que quiere eliminar este colaborador",
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
      const resp = await deleteCollaborator(`collaborator/delete/${collaboratorId}`);
      this.refreshPage();
    }
  }
  }

  replaceModalCollaborator(index, collaborator) {
    this.setState({
      requiredItem: index,
      currentCollaborator: collaborator,
    });
  }

  render() {
    const { currentCollaborator } = this.state;

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
        dataField: "username",
        text: "Usuario",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "role",
        text: "Roll",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "email",
        text: "Correo",
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
                data-target="#ModalEdit"
                onClick={() =>
                  this.replaceModalCollaborator(columnIndex, column)
                }
              >
                Editar
              </button>
              <button
                onClick={() => this.delete(column.id,column )}
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
        dataField: "username",
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
        {this.state.isLoading && <span>Cargando Colaboradores</span>}

        {this.state.collaborators && (
          <div>
            <h3 className="text-center">Colaboradores</h3>

            <button
              type="button"
              className="btn btn-dark text-white"
              data-toggle="modal"
              data-target="#exampleModalScrollable"
              onClick={() => {
                this.setState({ currentCollaborator: null });
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
                      Agregar Colaborador
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
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                          name="username"
                          type="text"
                          className="form-control"
                          id="username"
                          value={
                            currentCollaborator
                              ? currentCollaborator.username || ""
                              : ""
                          }
                          onChange={(e) =>
                            this.onChangeUsername({ username: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="password"
                          value={
                            currentCollaborator
                              ? currentCollaborator.password || ""
                              : ""
                          }
                          onChange={(e) =>
                            this.onChangePassword({ password: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Correo</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          value={
                            currentCollaborator
                              ? currentCollaborator.email || ""
                              : ""
                          }
                          onChange={(e) =>
                            this.onChangeEmail({
                              email: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <label htmlFor="role">Role</label>
                      <div className="row">
                        <div className="col-sm-12">
                          <select
                            value={
                              currentCollaborator
                                ? currentCollaborator.role || ""
                                : ""
                            }
                            onChange={(e) =>
                              this.onChangeRole({
                                role: e.target.value,
                              })
                            }
                            className="form-control"
                          >
                            <option value="admin">Super Admin</option>
                            <option value="standard">Admin</option>
                          </select>
                        </div>
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
                          currentCollaborator: null,
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
              id="ModalEdit"
              role="dialog"
              aria-labelledby="modalUpdate"
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
                      id="modalUpdate"
                    >
                      Editar Colaborador
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
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                          name="username"
                          type="text"
                          className="form-control"
                          id="username"
                          value={
                            currentCollaborator
                              ? currentCollaborator.username || ""
                              : ""
                          }
                          onChange={(e) =>
                            this.onChangeUsername({ username: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="password"
                          value={
                            currentCollaborator
                              ? currentCollaborator.password || ""
                              : ""
                          }
                          onChange={(e) =>
                            this.onChangePassword({ password: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Correo</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          value={
                            currentCollaborator
                              ? currentCollaborator.email || ""
                              : ""
                          }
                          onChange={(e) =>
                            this.onChangeEmail({
                              email: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      <label htmlFor="role">Role</label>
                      <div className="row">
                        <div className="col-sm-12">
                          <select
                            value={
                              currentCollaborator
                                ? currentCollaborator.role || ""
                                : ""
                            }
                            onChange={(e) =>
                              this.onChangeRole({
                                role: e.target.value,
                              })
                            }
                            className="form-control"
                          >
                            <option value="admin">Super Admin</option>
                            <option value="standard">Admin</option>
                          </select>
                        </div>
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
                          currentCollaborator: null,
                        });
                      }}
                    >
                      Cerrar
                    </button>
                    <input
                      name="edit"
                      id="edit"
                      type="submit"
                      className="btn btn-primary"
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
              data={this.state.collaborators}
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
