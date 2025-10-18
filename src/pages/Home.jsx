
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ContactCard({ id }) {
	const { store, dispatch } = useGlobalReducer();
	const contacto = store.contactos.find((c) => c.id === id);
	const navegar = useNavigate();

	function editar() {
		navegar("/edit/" + contacto.id, { state: contacto });
	}

	function eliminar() {
		if (window.confirm("¿Seguro que deseas eliminar este contacto?")) {
			store.eliminarContacto(dispatch, store, contacto.id, function (e) {
				if (e) alert(e);
			});
		}
	}

	return (
		<div className="contact-card">
			<div className="contact-img">
				<img src="https://i.redd.it/fcnh4ty49i791.png" alt="profile" />
			</div>
			<div className="contact-info">
				<h3>{contacto?.name}</h3>
				<p>
					<i className="fas fa-map-marker-alt"></i> {contacto?.address}
				</p>
				<p>
					<i className="fas fa-phone"></i> {contacto?.phone}
				</p>
				<p>
					<i className="fas fa-envelope"></i> {contacto?.email}
				</p>
			</div>
			<div className="contact-actions">
				<span onClick={editar} style={{ cursor: "pointer", color: "#7c3aed", fontSize: "1.2rem" }} title="Editar">
					<i className="fa fa-pencil-alt"></i>
				</span>
				<span onClick={eliminar} style={{ cursor: "pointer", color: "#ff5e5b", fontSize: "1.2rem" }} title="Eliminar">
					<i className="fa fa-trash"></i>
				</span>
			</div>
		</div>
	);
}

function Inicio() {
	const datos = useGlobalReducer();
	const navegar = useNavigate();

	useEffect(
		function () {
			datos.store.traerContactos(datos.dispatch, datos.store);
		},
		[]
	);

	return (
		<div className="container contact-list">
			{datos.store.cargando ? <p>Cargando...</p> : null}
			{datos.store.error ? <p className="error">{datos.store.error}</p> : null}
			<div className="contacts">
				{datos.store.contactos.length === 0 && !datos.store.cargando ? (
					<p>No hay contactos aún.</p>
				) : (
					datos.store.contactos.map(function (c) {
						return <ContactCard key={c.id} id={c.id} />;
					})
				)}
			</div>
		</div>
	);
}

export default Inicio;