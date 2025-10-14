import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar w-100 d-flex justify-content-between" style={{width: '100vw', background: '#7c3aed', borderBottom: '2px solid #a259e6'}}>
			<Link to="/" style={{textDecoration: 'none', marginLeft: '32px'}}>
				<span className="navbar-brand mb-0 h1" style={{fontSize: '2.3rem', fontWeight: 700, letterSpacing: '1px', color: '#fff'}}>Contactlist</span>
			</Link>
			<Link to="/add" style={{marginRight: '32px'}}>
				<button className="btn btn-success">Agregar contacto</button>
			</Link>
		</nav>
	);
};