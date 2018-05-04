/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

/* COMPONENTS */
export class ImageForm extends Component{

  /* STATE */
  constructor(props){
    super(props);
    const { image, user } = this.props;
    this.state = {
      name: image ? image.name : '',
      description: image ? image.description : '',
      created_by: image ? ( image.created_by || { name:'Usuario eliminado' }) : user,
      updated_by: user.name,
      category: image ? ( image.category ? image.category : '' ) : '',
      tags: image ? image.tags : [],
      created_at: image ? moment(image.created_at) : moment(),
      updated_at: moment(),
      displays: image ? image.displays.map((d) => d._id) : [],
      groups: image ? image.groups.map((g) => g._id) : [],
      color: image ? image.color_profile : 'color',

      redirect: false,
      location: '/images',
      error: null
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount(){
    const { images, image } = this.props;
    // set state with initial values
    this.setState({
      location: image ? '/images/' + image._id : '/images' // Redirect url
    });
  }

  /* HANDLE INPUT CHANGE (CONTROLLED FORM) */
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    if (name === 'tags'){
      var value = target.value.split(','); // TODO: better string to array conversion
    } else {
      var value = target.value;
    }

    this.setState({
      [name]: value
    });
  }

  /* HANDLE MULTIPLE CHECKBOX */
  handleCheckDisplays = (event) => {
    // get value from the checkbox
    const target = event.target;
    const value = target.value;
    // check if the checkbox has been selected
    if (!this.state.displays.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.displays;
      prevState.push(value);
      this.setState({displays: prevState});
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.displays;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({displays: prevState});
    }
  }

  handleCheckGroups = (event) => {
    // get value from the checkbox
    const target = event.target;
    const value = target.value;
    // check if the checkbox has been selected
    if (!this.state.groups.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.groups;
      prevState.push(value);
      this.setState({groups: prevState});
      target.checked = true;
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.groups;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({groups: prevState});
      target.checked = false;
    }
  } // TODO: filter options and hide unselected options for reviewing / Also limit images could be an option


  /* HANDLE SUMBIT (PUT OR POST) */
  handleSubmit = () => {
    // get image if any
    const { image } = this.props;
    // define form values to send
    const form = {
      name: this.state.name,
      description: this.state.description,
      updated_by: this.state.updated_by._id, // send user_id
      category: this.state.category,
      tags: this.state.tags,
      color_profile: this.state.color,
      userGroup: this.props.userGroup._id
    };
    // possible empty fields
    if (!this.props.image) form.created_by = this.props.user._id;
    this.state.displays.length > 0 ? form.displays = this.state.displays : form.displays = [];
    this.state.groups.length > 0 ? form.groups = this.state.groups : form.groups = [];
    // HTTP request
    axios({
      method: image ? 'put' : 'post',
      url: image ? image.url : 'http://localhost:4000/images',
      data: form,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
    .then((res) => {
      if (res.status == 201 || res.status == 200){
        this.props.notify('Imagen configurada con éxito', 'notify-success', 'check', toast.POSITION.BOTTOM_LEFT);
        return this.props.update(this.props.user); // update dataset
      }
    })
    .then((res) => {
      this.setState({ redirect : true });
      return res;
    })
    .catch((err) => {
      console.log(err);
      return this.props.notify('Error al configurar la imagen', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT);
    });
  }

  /* RENDER COMPONENT */
  render(){

    const { data: { devices, images, groups, displays }, image } = this.props;

    // Options
    const optionsGroups = groups.map((g) =>
      <label key={g._id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckGroups} type="checkbox" defaultChecked={this.state.groups.find((c) => c == g._id)} name={g._id} defaultValue={g._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{g.name}</span>
      </label>
    );
    const optionsDisplays = displays.sort((a, b) => a.updated_at - b.updated_at).map((d) =>
      <label key={d._id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckDisplays} type="checkbox" defaultChecked={this.state.displays.find((c) => c == d._id)} name={d._id} defaultValue={d._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{d.name}</span>
      </label>
    );

    // Render return
    if (this.state.redirect) {
      return( <Redirect to={this.state.location} /> );
    } else {
      return(
        <div className="card detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                { image ?
                  <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true"></i>Editar una imagen</h2> :
                  <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir una nueva imagen</h2>
                }
              </li>
              <li className="nav-item ml-2">
                { image ?
                  <button onClick={this.handleSubmit} type="button" className="btn btn-outline-info"><i className="fa fa-save mr-2" aria-hidden="true"></i>Guardar cambios</button> :
                  <button onClick={this.handleSubmit} type="button" className="btn btn-outline-info"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
                }
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id="form">
              <div className="form-group">
                <label htmlFor="nombre"><i className="fa fa-picture-o mr-2"></i>Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Nombre de la imagen" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la imagen" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
              </div>
              <div className="form-row">
                <div className="form-group col-6">
                  <label htmlFor="category"><i className="fa fa-th-large mr-2"></i>Categoría</label>
                  <input type="text" className="form-control" id="category" name='category' value={this.state.category} onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group col">
                  <label htmlFor="color"><i className="fa fa-tint mr-2"></i>Color</label>
                  <div>
                    <select className="custom-select" name='color' value={this.state.color} onChange={this.handleInputChange}>
                      <option value="color">Color</option>
                      <option value="escala de grises">Escala de grises</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="displays"><i className="fa fa-television mr-2"></i>Asociar uno o varios displays</label>
                  <div className="custom-controls-stacked shadow">
                    {optionsDisplays}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="groups"><i className="fa fa-list mr-2"></i>Asociar uno o varios grupos</label>
                  <div className="custom-controls-stacked shadow">
                    {optionsGroups}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="etiquetas"><i className="fa fa-tags mr-2"></i>Etiquetas</label>
                  <input type="text" className="form-control" name="tags" id="etiquetas" value={this.state.tags} onChange={this.handleInputChange}></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  {this.state.tags.map((t, i) => t.length > 1 ? <button type="button" className="btn mr-1 btn-outline-imagen btn-tiny" key={i}>{t}</button> : '')}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="creador"><i className="fa fa-user-o mr-2"></i>Creador</label>
                <input type="text" className="form-control" id="creador" name='user' value={this.state.created_by.name} readOnly></input>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="fechaCreacion"><i className="fa fa-calendar-o mr-2"></i>Fecha de creación</label>
                  <input type="text" className="form-control" id="fechaCreacion" name='created_at ' value={moment(this.state.created_at).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fechaModificacion"><i className="fa fa-calendar-o mr-2"></i>Fecha de modificación</label>
                  <input type="text" className="form-control" id="fechaModificacion" name='updated_at' value={moment(this.state.updated_at).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
};
