/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';

/* IMPORT COMPONENTS*/
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class GatewayDetails extends Component {

	render() {
		// define constants from props for better readability
		const { id, name, description, location, created_at, updated_at, created_by, mac_address, ip_address, devices } = this.props.gateway;
		// refactor date constants with format
		const created = moment(created_at).format("dddd, D [de] MMMM [de] YYYY");
		const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
		// define routes for edit and delete based on the id
		const linktoEdit = '/gateways/' + id + '/edit';
		const linktoDelete = '/gateways/' + id + '/delete';

		return(
		<div className="col">
			<div className="card detalles">
				<div className="card-header">
					<ul className="nav nav-pills card-header-pills justify-content-end mx-1">
						<li className="nav-item mr-auto">
							<h2 className="detalles-titulo"><i className='fa fa-sitemap mr-3' aria-hidden="true"></i>{name}</h2>
						</li>
						<li className="nav-item mr-2">
              <Link to={linktoEdit}>
                <button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Editar</button>
              </Link>
            </li>
            <li className="nav-item ml-2">
              <Link to={linktoDelete}>
                <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash-o" aria-hidden="true"></i>Eliminar</button>
              </Link>
            </li>
					</ul>
				</div>
				<div>
					<div className="row">
						<div className="col">
							<div className="card-body">
								<p className="titulo">DETALLES</p>
								<p className="card-text"><i className="fa fa-fw fa-hashtag mr-1" aria-hidden="true"></i>{id}</p>
								<p className="card-text"><i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true"></i>{description}</p>
								<p className="card-text"><i className="fa fa-fw fa-server mr-2" aria-hidden="true"></i>{mac_address}</p>
								<p className="card-text"><i className="fa fa-fw fa-wifi mr-2" aria-hidden="true"></i>{ip_address}</p>
								<p className="card-text"><i className="fa fa-fw fa-map-marker mr-2" aria-hidden="true"></i>{location ? location.name : 'Localización no especificada'}</p>
								<p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>{updated}</p>
								<p className="card-text"><i className="fa fa-fw fa-user-o mr-2" aria-hidden="true"></i>{created_by ? created_by.name : 'Usuario eliminado'}</p>
							</div>
						</div>
						<div className="col">
							<div className="asociados">
								<p className="titulo text-right">DISPOSITIVOS ({devices.length})</p>
								<Associated contenido={devices} category="devices" appearance="elemento-dispositivo" icon="tablet"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
};