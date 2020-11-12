import React, { Component } from "react";
import "./direction-list.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitDirection, { Search } from "react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import {
  getDirections,
  storeDirections,
  updateDirections,
  deleteDirections,
} from "../../services/directionService";

export default class directiontList extends Component {
    constructor(props) {
        super(props);
        this.onChangeClientId = this.onChangeClientId.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeProvince = this.onChangeProvince.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeZipCode = this.onChangeZipCode.bind(this);
        this.onChangeDirection = this.onChangeDirection.bind(this);

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    
        this.state = {
          directions: null,
          isLoading: null,
          requiredItem: 0,

          currentDirection:{
              id: 0,
              clientId: "",
              country: "",
              province: "",
              city: "",
              zipCode: "",
              direction: "",
          },
          message: "",
        };
    }

    componentDidMount() {
        this.getDirections();
    }
    async getDirections() {
        if (!this.state.directions) {
          this.setState({ isLoading: true });
    
          const resp = await getDirections("direction");
            console.log(resp);
          if (resp.status === "success") {
            console.log(resp);
            this.setState({ directions: resp.data, isLoading: false });
          } else {
            Swal.fire("Error", resp.message, "error");
          }
        }
    }

    replaceModalDirection(index, direction) {
        this.setState({
          requiredItem: index,
          currentDirection: direction,
        });
    }

    onChangeClientId(e) {
        this.setState((prevState) => ({
          currentDirection: {
            ...prevState.currentDirection,
            clientId: e.clientId,
          },
        }));
    }

    onChangeCountry(e) {
        this.setState((prevState) => ({
          currentDirection: {
            ...prevState.currentDirection,
            country: e.country,
          },
        }));
    }

    onChangeProvince(e) {
        this.setState((prevState) => ({
          currentDirection: {
            ...prevState.currentDirection,
            province: e.province,
          },
        }));
    }

    onChangeCity(e) {
        this.setState((prevState) => ({
          currentDirection: {
            ...prevState.currentDirection,
            city: e.city,
          },
        }));
    }

    onChangeZipCode(e) {
        this.setState((prevState) => ({
          currentDirection: {
            ...prevState.currentDirection,
            zipCode: e.zipCode,
          },
        }));
    }

    onChangeDirection(e) {
        this.setState((prevState) => ({
          currentDirection: {
            ...prevState.currentDirection,
            direction: e.direction,
          },
        }));
    }
    refreshPage() {
        window.location.reload();
    }

    async create() {
        const resp = await storeDirections("direction", this.state.currentDirection);
    
        console.log(this.state.currentDirection);
    
        if (resp.status === "success") {
          console.log(resp);
          this.refreshPage();
        } else {
          Swal.fire("Error", resp.message, "error");
        }
    }

    async update(e) {
        e.preventDefault();
        console.log(this.state.currentDirection);
        let d = false;
        
        let json = {
          clientId: this.state.currentDirection.clientId,
          country: this.state.currentDirection.country,
          province: this.state.currentDirection.province,
          city: this.state.currentDirection.city,
          zipCode: this.state.currentDirection.zipCode,
          direction: this.state.currentDirection.direction,

        };
    
        await Swal.fire({
          title: "Esta seguro?",
          text: "Esta seguro de actualizar la Dirección",
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
          const resp = await updateDirections(
            `direction/${this.state.currentDirection.id}`,
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
      async delete(directionId) {
        let d = false;
        await Swal.fire({
          title: "Esta seguro?",
          text: "Se eliminaran todos los datos relacionados con esta Dirección",
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
          await deleteDirections(`direction/${directionId}`);
          this.refreshPage();
        }
      }

    render() {
        const { currentDirection } = this.state;
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
              dataField: "clientId",
              text: "Cliente",
              headerStyle: (colum, colIndex) => {
                return { width: "150px", textAlign: "center" };
              },
              sort: true,
            },
            {
              dataField: "country",
              text: "País",
              headerStyle: (colum, colIndex) => {
                return { width: "150px", textAlign: "center" };
              },
              sort: true,
            },
            {
                dataField: "province",
                text: "Provincia",
                headerStyle: (colum, colIndex) => {
                  return { width: "150px", textAlign: "center" };
                },
                sort: true,
            },
            {
                dataField: "city",
                text: "Ciudad",
                headerStyle: (colum, colIndex) => {
                  return { width: "150px", textAlign: "center" };
                },
                sort: true,
            },
            {
                dataField: "zipCode",
                text: "Codigo Postal",
                headerStyle: (colum, colIndex) => {
                  return { width: "150px", textAlign: "center" };
                },
                sort: true,
            },
            {
                dataField: "direction",
                text: "Dirección",
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
                      onClick={() => this.replaceModalDirection(columnIndex, column)}
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
            {this.state.isLoading && <span>Cargando Direccioness</span>}
    
            {this.state.directions && (
              <div>
                <h3 class="text-center">Direcciones</h3>
    
                <button
                  type="button"
                  class="btn btn-dark text-white"
                  data-toggle="modal"
                  data-target="#exampleModalScrollable"
                  onClick={() => {
                    this.setState({ currentDirection: null });
                  }}
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
                          Agregar Dirección
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
                            <label for="cliente">Cliente</label>
                            <input
                              name="cliente"
                              type="text"
                              class="form-control"
                              id="cliente"
                              value={
                                currentDirection ? currentDirection.clientId || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeClientId({ clientId: e.target.value })
                              }
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="pais">País</label>
                            <input
                              name="pais"
                              type="text"
                              class="form-control"
                              id="pais"
                              value={
                                currentDirection ? currentDirection.country || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeCountry({ country: e.target.value })
                              }
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="provincia">Provincia</label>
                            <input
                              name="provincia"
                              type="text"
                              class="form-control"
                              id="provincia"
                              value={
                                currentDirection ? currentDirection.province || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeProvince({ province: e.target.value })
                              }
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="ciudad">Ciudad</label>
                            <input
                              name="ciudad"
                              type="text"
                              class="form-control"
                              id="ciudad"
                              value={
                                currentDirection ? currentDirection.city || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeCity({ city: e.target.value })
                              }
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="zipCode">Codigo Postal</label>
                            <input
                              name="zipCode"
                              type="text"
                              class="form-control"
                              id="zipCode"
                              value={
                                currentDirection ? currentDirection.zipCode || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeZipCode({ zipCode: e.target.value })
                              }
                            ></input>
                          </div>

                          <div class="form-group">
                            <label for="direccion">Dirección</label>
                            <input
                              name="direccion"
                              type="text"
                              class="form-control"
                              id="direccion"
                              value={
                                currentDirection ? currentDirection.direction || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeDirection({ direction: e.target.value })
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
                          currentDirection: null,
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
                          Editar Direccion
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
                            <label for="cliente">Cliente</label>
                            <input
                              name="cliente"
                              type="text"
                              class="form-control"
                              id="cliente"
                              value={
                                currentDirection ? currentDirection.clientId || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeClientId({ clientId: e.target.value })
                              }
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="pais">País</label>
                            <input
                              name="pais"
                              type="text"
                              class="form-control"
                              id="pais"
                              value={
                                currentDirection ? currentDirection.country || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeCountry({ country: e.target.value })
                              }
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="provincia">Provincia</label>
                            <input
                              name="provincia"
                              type="text"
                              class="form-control"
                              id="provincia"
                              value={
                                currentDirection ? currentDirection.province || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeProvince({ province: e.target.value })
                              }
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="ciudad">Ciudad</label>
                            <input
                              name="ciudad"
                              type="text"
                              class="form-control"
                              id="ciudad"
                              value={
                                currentDirection ? currentDirection.city || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeCity({ city: e.target.value })
                              }
                            ></input>
                          </div>
    
                          <div class="form-group">
                            <label for="zipCode">Codigo Postal</label>
                            <input
                              name="zipCode"
                              type="text"
                              class="form-control"
                              id="zipCode"
                              value={
                                currentDirection ? currentDirection.zipCode || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeZipCode({ zipCode: e.target.value })
                              }
                            ></input>
                          </div>

                          <div class="form-group">
                            <label for="direccion">Dirección</label>
                            <input
                              name="direccion"
                              type="text"
                              class="form-control"
                              id="direccion"
                              value={
                                currentDirection ? currentDirection.direction || "" : ""
                              }
                              onChange={(e) =>
                                this.onChangeDirection({ direction: e.target.value })
                              }
                            ></input>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={() => {
                            this.setState({
                              currentDirection: null,
                            });
                          }}
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
                          onClick={this.update}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <ToolkitDirection
              bootstrap4
              keyField="id"
              data={this.state.directions}
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
            </ToolkitDirection>

              </div>
            )}
          </div>
        );
      }
}