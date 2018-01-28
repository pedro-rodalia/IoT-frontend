/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Location } from '../../../lists/lists-components/location.jsx';

/* COMPONENTS */
export class ManageLocations extends Component {

  constructor(props){
    super(props);
    const { user } = this.props;
    this.state = {
      locations: false,
      isLoaded: false,
      error: null,
      edit: false,
      element_id: '',
      // form
      name: '',
      description: ''
    };
  }

  // Handle changes
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]:value});
  }

  componentDidMount(){
    fetch("http://localhost:4000/locations")
      .then(res => res.json())
      .then(
        (locations) => { // resolve callback
          this.setState({ isLoaded: true, locations });
        },
        (error) => { // reject callback
          this.setState({ isLoaded: true, error });
        }
      )
  }

  edit = (element_id) => {
    const location = this.state.locations.find(l => l._id == element_id);
    this.setState({
      name: location.name,
      description: location.description,
      element_id: element_id,
      edit: true
    })
  }

  cancel = () => {
    this.setState({
      name: '',
      description: '',
      element_id: '',
      edit: false
    })
  }

  /* HANDLE SUBMIT */
  handleSubmit = (method) => {
    // FORM DATA
    const form = {
      'name': this.state.name,
    };
    if(this.state.description != ''){form.description = this.state.description}
    fetch( this.state.edit ? 'http://localhost:4000/locations/' + this.state.element_id : 'http://localhost:4000/locations',
      {
      method: method, // post, delete or put method
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(form)
      }
    )
    .then(() => fetch('http://localhost:4000/locations'))
    .then(res => res.json())
    .then(
      (locations) => { // resolve callback
        this.setState({
          isLoaded: true,
          locations,
          name: '',
          description: '',
          element_id: '',
          edit: false
        });
      },
      (error) => { // reject callback
        this.setState({ isLoaded: true, error });
      }
    )
  }

  render(){
    const { locations, error, isLoaded } = this.state;

    if (error) {
      return null // TODO: handle error
    } else if (!isLoaded) {
      return null // TODO: handle loading
    } else {
      const list = locations.map(location => {
        if (location._id == this.state.element_id){
          return <Location location={location} key={location._id} edit={this.edit} active={true}/>
        } else {
          return <Location location={location} key={location._id} edit={this.edit} active={false}/>
        }
      });
      return(
        <div className="row mb-3">
          <div className="col">
            <div className="card detalles bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className='fa fa-map-marker mr-3' aria-hidden="true"></i>Localizaciones</h2>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h3>{ this.state.edit ? 'Editar Localización' : 'Añadir Localizacion'}</h3>
                    <hr></hr>
                    <form>
                      <div className="form-row">
                        <div className="form-group col">
                          <label htmlFor="name"><i className="fa fa-map-marker mr-2"></i>Nombre</label>
                          <input type="text" className="form-control" id="name" placeholder="Nombre de la localización" name="name" value={this.state.name} onChange={this.handleInputChange}></input>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col">
                          <label htmlFor="description"><i className="fa fa-info-circle mr-2"></i>Descripción</label>
                          <input type="text" className="form-control" id="description" placeholder="Descripción" name="description" value={this.state.description} onChange={this.handleInputChange}></input>
                        </div>
                      </div>
                      { !this.state.edit ?
                        <button onClick={() => this.handleSubmit('post')} type="button" className="btn btn-block btn-small btn-outline-success"><i className="fa fa-plus-circle mr-1" aria-hidden="true"></i>Añadir</button> :
                        <div className="d-flex w-100 justify-content-between">
                          <button onClick={() => this.handleSubmit('put')} type="button" className="btn btn-block btn-small btn-outline-success mr-2"><i className="fa fa-floppy-o mr-1" aria-hidden="true"></i>Actualizar</button>
                          <button onClick={() => this.handleSubmit('delete')} type="button" className="btn btn-block btn-small btn-outline-danger ml-1 mr-1"><i className="fa fa-trash-o mr-1" aria-hidden="true"></i>Eliminar</button>
                          <button onClick={() => this.cancel()} type="button" className="btn btn-block btn-small btn-outline-warning ml-2"><i className="fa fa-times mr-1" aria-hidden="true"></i>Cancelar</button>
                        </div>
                      }
                    </form>
                  </div>
                  <div className="col-6">
                    <h3 className="d-flex w-100 justify-content-between">Localizaciones<span>{this.state.locations.length}</span></h3>
                    <hr></hr>
                    <div className="lista">
                      <div className="list-group mb-3">
                        {list}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};
