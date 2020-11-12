import React, { Component } from "react";
import "./client-list.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitClient, { Search } from "react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import {
  getClients,
  storeClients,
  updateClients,
  deleteClients,
} from "../../services/clientService";

export default class clientList extends Component {
  constructor(props) {
    super(props);

    this.onChangeIdentificationCard = this.onChangeIdentificationCard.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      clients: null,
      isLoading: null,
      requiredItem: 0,

      currentClient: {
        identificationCard: 0,
        name: "",
        surname: "",
        telephone: 0,
        email: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getClients();
  }

  replaceModalClient(index, client) {
    this.setState({
      requiredItem: index,
      currentClient: client,
    });
  }

  onChangeIdentificationCard(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        identificationCard: e.identificationCard,
      },
    }));
  }

  onChangeName(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        name: e.name,
      },
    }));
  }

  onChangeSurname(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        surname: e.surname,
      },
    }));
  }

  onChangeTelephone(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        telephone: e.telephone,
      },
    }));
  }
  
  onChangeEmail(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        email: e.email,
      },
    }));
  }


  async getClients() {
    if (!this.state.clients) {
      this.setState({ isLoading: true });

      const resp = await getClients("client");
      if (resp.status === "success") {
        this.setState({ clients: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }
  
  async create() {
    const resp = await storeClients("client", this.state.currentClient);

    console.log(this.state.currentClient);

    if (resp.status === "success") {
      console.log(resp);
      this.refreshPage();
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }

  async update(e) {
    e.preventDefault();
    console.log(this.state.currentClient);
    let d = false;
    
    let json = {
      identificationCard: this.state.currentClient.identificationCard,
      name: this.state.currentClient.name,
      surname: this.state.currentClient.surname,
      telephone: this.state.currentClient.telephone,
      email: this.state.currentClient.email,
    };

    await Swal.fire({
      title: "Esta seguro?",
      text: "Esta seguro de actualizar el Cliente",
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
      const resp = await updateClients(
        `client/${this.state.currentClient.id}`,
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

  async delete(clientId) {
    let d = false;
    await Swal.fire({
      title: "Esta seguro?",
      text: "Se eliminaran todos los datos relacionados con este Cliente",
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
      await deleteClients(`client/${clientId}`);
      this.refreshPage();
    }
  }

  render() {
    const { currentClient } = this.state;
    
    const columns = [
      {
        dataField: "identificationCard",
        text: "Cédula",
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
        dataField: "surname",
        text: "Apellido",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "telephone",
        text: "Telefono",
        headerStyle: (colum, colIndex) => {
          return { width: "113px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "email",
        text: "Correo Electrónico",
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
                onClick={() => this.replaceModalClient(columnIndex, column)}
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
        {this.state.isLoading && <span>Cargando Clientes</span>}

        {this.state.clients && (
          <div>
            <h3 className="text-center">Clientes</h3>

            <button
              type="button"
              className="btn btn-dark text-white"
              data-toggle="modal"
              data-target="#exampleModalScrollable"
              onClick={() => {
                this.setState({ currentClient: null });
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
                      Agregar Cliente
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
                        <label htmlFor="identificationCard">Cédula</label>
                        <input
                          name="identificationCard"
                          type="number"
                          className="form-control"
                          id="ID"
                          value={
                            currentClient ? currentClient.identificationCard || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeIdentificationCard({ identificationCard: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                          name="nombre"
                          type="text"
                          className="form-control"
                          id="nombre"
                          value={
                            currentClient ? currentClient.name || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeName({ name: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="surname">Apellidos</label>
                        <input
                          name="apellido"
                          type="text"
                          className="form-control"
                          id="apellido"
                          value={
                            currentClient ? currentClient.surname || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeSurname({ surname: e.target.value })
                          }
                        ></input>
                      </div>
        
                      <div className="form-group">
                        <label htmlFor="telephone">Teléfono</label>
                        <input
                          name="telefono"
                          type="number"
                          className="form-control"
                          id="telefono"
                          value={
                            currentClient ? currentClient.telephone || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeTelephone({ telephone: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          value={
                            currentClient ? currentClient.email || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeEmail({
                              email: e.target.value,
                            })
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
                          currentClient: null,
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
                      Editar Cliente
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
                        <label htmlFor="identificationCard">Cédula</label>
                        <input
                          name="identificationCard"
                          type="number"
                          className="form-control"
                          id="identificationCard"
                          value={
                            currentClient ? currentClient.identificationCard || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeIdentificationCard({ identificationCard: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                          name="nombre"
                          type="text"
                          className="form-control"
                          id="nombre"
                          value={
                            currentClient ? currentClient.name || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeName({ name: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="surname">Apellidos</label>
                        <input
                          name="apellido"
                          type="text"
                          className="form-control"
                          id="apellido"
                          value={
                            currentClient ? currentClient.surname || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeSurname({ surname: e.target.value })
                          }
                        ></input>
                      </div>
        
                      <div className="form-group">
                        <label htmlFor="telephone">Teléfono</label>
                        <input
                          name="telefono"
                          type="number"
                          className="form-control"
                          id="telefono"
                          value={
                            currentClient ? currentClient.telephone || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeTelephone({ telephone: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          value={
                            currentClient ? currentClient.email || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeEmail({
                              email: e.target.value,
                            })
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
                          currentClient: null,
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
            <ToolkitClient
              bootstrap4
              keyField="id"
              data={this.state.clients}
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
            </ToolkitClient>
          </div>
        )}
      </div>
    );
  }
}
