
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ContactCard(props) {
       return (
	       <div className="contact-card">
		       <div className="contact-img">
			       <img src="https://i.redd.it/fcnh4ty49i791.png" alt="profile" />
		       </div>
		       <div className="contact-info">
			       <h3>{props.contacto.name}</h3>
			       <p><i className="fas fa-map-marker-alt"></i> {props.contacto.address}</p>
			       <p><i className="fas fa-phone"></i> {props.contacto.phone}</p>
			       <p><i className="fas fa-envelope"></i> {props.contacto.email}</p>
		       </div>
		       <div className="contact-actions">
			       <span onClick={function(){props.editar(props.contacto)}} style={{cursor:'pointer', color:'#7c3aed', fontSize:'1.2rem'}} title="Editar">
				       <i className="fa fa-pencil-alt"></i>
			       </span>
			       <span onClick={function(){props.borrar(props.contacto.id)}} style={{cursor:'pointer', color:'#ff5e5b', fontSize:'1.2rem'}} title="Eliminar">
				       <i className="fa fa-trash"></i>
			       </span>
		       </div>
	       </div>
       )
}

function Inicio() {
	var datos = useGlobalReducer()
	var navegar = useNavigate()

	useEffect(function() {
		datos.store.traerContactos(datos.dispatch, datos.store)
	}, [])

	function editar(c) {
		navegar("/edit/" + c.id, { state: c })
	}
	function borrar(id) {
		if(window.confirm("¿Seguro que deseas eliminar este contacto?")){
			datos.store.borrarContacto(datos.dispatch, datos.store, id, function(e){
				if(e) alert(e)
			})
		}
	}

	return (
		<div className="container contact-list">
			{datos.store.cargando ? <p>Cargando...</p> : null}
			{datos.store.error ? <p className="error">{datos.store.error}</p> : null}
			<div className="contacts">
				{datos.store.contactos.length === 0 && !datos.store.cargando ? (
					<p>No hay contactos aún.</p>
				) : (
					datos.store.contactos.map(function(c) {
									   return <ContactCard key={c.id} contacto={c} editar={editar} borrar={borrar} />
					})
				)}
			</div>
		</div>
	)
}

export default Inicio;