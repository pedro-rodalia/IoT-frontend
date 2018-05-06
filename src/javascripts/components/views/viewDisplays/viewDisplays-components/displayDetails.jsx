/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require( 'moment' );
moment.locale( 'es' )
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
/* IMPORT COMPONENTS */
import { Associated } from '../../associated.jsx'
import { Tag } from '../../../tags/tag.jsx'
/* COMPONENT */
export class DisplayDetails extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      // form data stored in state
      display: this.props.display,
      device_synced: false,
      active_image: '',
      error: null
    }
  }
  componentDidMount() {
    const { active_image, device } = this.props.display
    const device_synced = ( !active_image || active_image._id == device.active_image )
    this.setState( {
      active_image: active_image ? active_image._id : '',
      device_synced: device_synced
    } )
  }
  componentWillReceiveProps( nextProps ) {
    if ( nextProps != this.props ) {
      const { active_image, device } = nextProps.display
      const device_synced = ( !active_image || active_image._id == device.active_image )
      this.setState( {
        display: nextProps.display,
        active_image: active_image ? active_image._id : '',
        device_synced: device_synced
      } )
    }
  }
  sync = () => {
    //this.props.sync_device_image( this.state.active_image, this.state.display.device._id )
    const url = process.env.API_URL + 'update/' + this.state.display.device._id // set url for the request
    const body = { // set body containing the image to be uploaded to the device
      image_id: this.state.active_image
    }
    axios.put( url, body, { // send request
        timeout: process.env.TIMEOUT,
        headers: {
          Authorization: 'Bearer ' + this.props.token
        }
      } )
      .then( res => {
        if ( res.status == 201 ) { // with success
          this.props.update( 'devices', res.data.resourceId, 'edit', res.data.resource ) // update the device info with new active_image
          this.props.notify( 'Imagen sincronizada con éxito', 'notify-success', 'check', toast.POSITION.BOTTOM_LEFT ) // notify success
          this.setState( { device_synced: true } )
        } else {
          this.props.notify( 'Error al sincronizar la imagen', 'notify-error', 'times', toast.POSITION.BOTTOM_LEFT ) // notify error
        }
      } )
  }
  /* HANDLE INPUT CHANGE */
  handleInputChange = ( event ) => {
    const value = event.target.value
    const image = this.props.data.images.find(
      ( i ) => value == i._id )
    const form = {
      active_image: image ? image._id : null
    }
    axios( {
        method: 'put',
        url: process.env.API_URL + 'displays/' + this.state.display._id,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.token
        },
        data: form
      } )
      .then( ( res ) => {
        if ( res.status >= 200 && res.status < 300 ) {
          this.props.notify( 'Imagen cambiada con éxito', 'notify-success', 'upload', toast.POSITION.BOTTOM_LEFT )
          this.props.update( 'displays', res.data.resourceId, 'edit', res.data.resource ) // update dataset
        } else {
          this.props.notify( 'Error al cambiar la imagen', 'notify-error', 'times', toast.POSITION.BOTTOM_LEFT )
          this.setState( { error: res.data } ) // set error
        }
      } )
      .catch( ( err ) => {
        this.props.notify( 'Error al cambiar la imagen', 'notify-error', 'times', toast.POSITION.BOTTOM_LEFT )
        console.log( 'Something went wrong' )
      } )
  }
  render() {
    // define constants from state for better readability
    const {
      _id,
      name,
      description,
      groups,
      images,
      active_image,
      device,
      tags,
      updated_at,
      updated_by
    } = this.state.display
    // refactor date constants with format
    const updated = moment( updated_at )
      .format( "dddd, D [de] MMMM [de] YYYY" )
    // generate tag list
    const tag_list = tags.map( ( tag, i ) => <Tag key={i} category='displays' tag={tag}/> )
    // define routes for edit and delete based on the id
    const linktoEdit = '/displays/' + _id + '/edit'
    const linktoDelete = '/displays/' + _id + '/delete'
    // check if active_image is set and if not set the undefined img
    const src = active_image && active_image.src_url
    const imagesOptions = images.map( ( i ) => <option value={i._id} key={i._id}>{i.name}</option> )
    // get screen info
    const screen = this.props.data.screens.find(
      ( s ) => s.screen_code == device.screen )
    return ( <div className="card detalles">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo">
              <i className='fa fa-television mr-3' aria-hidden="true"></i>{name}</h2>
          </li>
          <li className="nav-item mr-2">
            <Link to={linktoEdit}>
              <button type="button" className="btn btn-outline-warning">
                <i className="fa fa-pencil-square-o mr-2" aria-hidden="true"></i>Editar</button>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to={linktoDelete}>
              <button type="button" className="btn btn-outline-danger">
                <i className="fa fa-trash-o mr-2" aria-hidden="true"></i>Eliminar</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <p className="titulo">DETALLES</p>
            <p className="card-text">
              <i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true"></i>{description}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-map-marker mr-2" aria-hidden="true"></i>{
                device.gateway
                  ? (
                    device.gateway.location
                    ? device.gateway.location.name
                    : 'Localización no especificada')
                  : 'Localización no especificada'
              }</p>
            <p className="card-text">
              <i className="fa fa-fw fa-arrows-alt mr-2" aria-hidden="true"></i>{
                screen != -1
                  ? screen.name
                  : device.screen
              }</p>
            <p className="card-text">
              <i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>{updated}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-user-o mr-2" aria-hidden="true"></i>{
                updated_by
                  ? updated_by.name
                  : 'Usuario eliminado'
              }</p>
            <p className="titulo">ETIQUETAS</p>
            {tag_list}
          </div>
          <div className="col">
            <div className="vista-previa">
              <p className="titulo text-right">IMAGEN ACTIVA</p>
              <div className="vista-imagen-display d-flex w-100 justify-content-center mb-3">
                {
                  src
                    ? <img className="imagen" src={src}/>
                    : <div className="image-placeholder align-self-center">
                        <h4>La imagen activa aun no ha sido determinada</h4>
                        <small>Suba una imagen al servidor</small>
                      </div>
                }
              </div>
              {
                ! this.state.device_synced
                  ? <button onClick={this.sync} type="submit" className="btn btn-block btn-outline-primary mb-3" >Sincronizar imagen en dispositivo</button>
                  : <button type="submit" className="btn btn-block btn-outline-primary mb-3" disabled >Imagen sincronizada</button>
              }
              <select className="custom-select" id="active_image" name='active_image' value={this.state.active_image} onChange={this.handleInputChange}>
                <option value={''} key={0}>Sin imagen activa</option>
                {imagesOptions}
              </select>
            </div>
          </div>
        </div>
        <hr className="card-division"></hr>
        <div className="row">
          <div className="col">
            <div className="asociados">
              <p className="titulo">IMAGENES ASOCIADAS ({images.length})</p>
              <Associated content={images} category="images" appearance="elemento-imagen" icon="picture-o" active={this.state.active_image}/>
            </div>
          </div>
          <div className="col">
            <div className="asociados">
              <p className="titulo text-right">GRUPOS ({groups.length})</p>
              <Associated content={groups} category="groups" appearance="elemento-grupo" icon="list"/>
            </div>
          </div>
        </div>
      </div>
    </div> )
  }
}
