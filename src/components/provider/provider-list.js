import React, { Component } from "react";
import "./provider-list.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import {
  getProviders,
  storeProviders,
  updateProviders,
  deleteProviders,
} from "../../services/providerService";

export default class providerList extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeDirection = this.onChangeDirection.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeStartDay = this.onChangeStartDay.bind(this);
    this.onChangeFinalDay = this.onChangeFinalDay.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeFinalTime = this.onChangeFinalTime.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      providers: null,
      isLoading: null,
      requiredItem: 0,

      currentProvider: {
        id: 0,
        name: "",
        surname: "",
        telephone: 0,
        direction: "",
        email: "",
        startDay: "",
        finalDay: "",
        StartTime: "",
        finalTime: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProviders();
  }

  replaceModalProvider(index, provider) {
    this.setState({
      requiredItem: index,
      currentProvider: provider,
    });
  }

  onChangeName(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        name: e.name,
      },
    }));
  }

  onChangeSurname(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        surname: e.surname,
      },
    }));
  }

  onChangeTelephone(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        telephone: e.telephone,
      },
    }));
  }
  
  onChangeDirection(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        direction: e.direction,
      },
    }));
  }

  onChangeEmail(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        email: e.email,
      },
    }));
  }

  onChangeStartDay(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        startDay: e.startDay,
      },
    }));
  }
  
  onChangeFinalDay(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        finalDay: e.finalDay,
      },
    }));
  }

  onChangeStartTime(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        StartTime: e.StartTime,
      },
    }));
  }

  onChangeFinalTime(e) {
    this.setState((prevState) => ({
      currentProvider: {
        ...prevState.currentProvider,
        finalTime: e.finalTime,
      },
    }));
  }
  
  
  async getProviders() {
    if (!this.state.providers) {
      this.setState({ isLoading: true });

      const resp = await getProviders("provider");
      if (resp.status === "success") {
        this.setState({ providers: resp.data, isLoading: false });
      } else {
        Swal.fire("Error", resp.message, "error");
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }
  
  async create() {
    const resp = await storeProviders("provider", this.state.currentProvider);

    console.log(this.state.currentProvider);

    if (resp.status === "success") {
      console.log(resp);
      this.refreshPage();
    } else {
      Swal.fire("Error", resp.message, "error");
    }
  }

  async update(e) {
    e.preventDefault();
    console.log(this.state.currentProvider);
    let d = false;
    
    let json = {
      name: this.state.currentProvider.name,
      surname: this.state.currentProvider.surname,
      telephone: this.state.currentProvider.telephone,
      direction: this.state.currentProvider.direction,
      email: this.state.currentProvider.email,
      startDay: this.state.currentProvider.startDay,
      finalDay: this.state.currentProvider.finalDay,
      StartTime: this.state.currentProvider.StartTime,
      finalTime: this.state.currentProvider.finalTime,
    };

    await Swal.fire({
      title: "Esta seguro?",
      text: "Esta seguro de actualizar el Proveedor",
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
      const resp = await updateProviders(
        `provider/${this.state.currentProvider.id}`,
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

  async delete(providerId) {
    let d = false;
    await Swal.fire({
      title: "Esta seguro?",
      text: "Se eliminaran todos los datos relacionados con este Proveedor",
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
      await deleteProviders(`provider/${providerId}`);
      this.refreshPage();
    }
  }

  render() {
    const { currentProvider } = this.state;
    
    const columns = [
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
        dataField: "direction",
        text: "Direccion",
        headerStyle: (colum, colIndex) => {
          return { width: "250px", textAlign: "center" };
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
        dataField: "startDay",
        text: "Día de Inicio",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "finalDay",
        text: "Día de Cierre",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "StartTime",
        text: "Hora de Inicio",
        headerStyle: (colum, colIndex) => {
          return { width: "150px", textAlign: "center" };
        },
        sort: true,
      },
      {
        dataField: "finalTime",
        text: "Hora de Cierre",
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
                onClick={() => this.replaceModalProvider(columnIndex, column)}
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
        {this.state.isLoading && <span>Cargando Proveedores</span>}

        {this.state.providers && (
          <div>
            <h3 className="text-center">Proveedores</h3>

            <button
              type="button"
              className="btn btn-dark text-white"
              data-toggle="modal"
              data-target="#exampleModalScrollable"
              onClick={() => {
                this.setState({ currentProvider: null });
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
                      Agregar Proveedor
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
                            currentProvider ? currentProvider.name || "" : ""
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
                            currentProvider ? currentProvider.surname || "" : ""
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
                            currentProvider ? currentProvider.telephone || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeTelephone({ telephone: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="direction">Dirección</label>
                        <input
                          name="direction"
                          type="text"
                          className="form-control"
                          id="direction"
                          value={
                            currentProvider ? currentProvider.direction || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeDirection({
                              direction: e.target.value,
                            })
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
                            currentProvider ? currentProvider.email || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeEmail({
                              email: e.target.value,
                            })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="startDay">Día de Inicio</label>
                        <input
                          name="startDay"
                          type="text"
                          className="form-control"
                          id="startDay"
                          value={
                            currentProvider ? currentProvider.startDay || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeStartDay({ startDay: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="finalDay">Día de Cierre</label>
                        <input
                          name="finalDay"
                          type="text"
                          className="form-control"
                          id="finalDay"
                          value={
                            currentProvider ? currentProvider.finalDay || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeFinalDay({ finalDay: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="StartTime">Hora de Inicio</label>
                        <input
                          name="StartTime"
                          type="text"
                          className="form-control"
                          id="StartTime"
                          value={
                            currentProvider ? currentProvider.StartTime || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeStartTime({ StartTime: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="finalTime">Hora de Cierre</label>
                        <input
                          name="finalTime"
                          type="text"
                          className="form-control"
                          id="finalTime"
                          value={
                            currentProvider ? currentProvider.finalTime || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeFinalTime({ finalTime: e.target.value })
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
                          currentProvider: null,
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
                      Editar Proveedor
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
                            currentProvider ? currentProvider.name || "" : ""
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
                            currentProvider ? currentProvider.surname || "" : ""
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
                            currentProvider ? currentProvider.telephone || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeTelephone({ telephone: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="direction">Dirección</label>
                        <input
                          name="direction"
                          type="text"
                          className="form-control"
                          id="direction"
                          value={
                            currentProvider ? currentProvider.direction || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeDirection({
                              direction: e.target.value,
                            })
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
                            currentProvider ? currentProvider.email || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeEmail({
                              email: e.target.value,
                            })
                          }
                        ></input>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="startDay">Día de Inicio</label>
                        <input
                          name="startDay"
                          type="text"
                          className="form-control"
                          id="startDay"
                          value={
                            currentProvider ? currentProvider.startDay || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeStartDay({ startDay: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="finalDay">Día de Cierre</label>
                        <input
                          name="finalDay"
                          type="text"
                          className="form-control"
                          id="finalDay"
                          value={
                            currentProvider ? currentProvider.finalDay || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeFinalDay({ finalDay: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="StartTime">Hora de Inicio</label>
                        <input
                          name="StartTime"
                          type="text"
                          className="form-control"
                          id="StartTime"
                          value={
                            currentProvider ? currentProvider.StartTime || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeStartTime({ StartTime: e.target.value })
                          }
                        ></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="finalTime">Hora de Cierre</label>
                        <input
                          name="finalTime"
                          type="text"
                          className="form-control"
                          id="finalTime"
                          value={
                            currentProvider ? currentProvider.finalTime || "" : ""
                          }
                          onChange={(e) =>
                            this.onChangeFinalTime({ finalTime: e.target.value })
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
                          currentProvider: null,
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
              data={this.state.providers}
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
