import { Link } from "react-router-dom";

import '../css/bootstrap.min.css';

import Buscador from './Buscador'


function Header(props) {
    return (
        <header>
            <nav className="navbar bg-body-tertiary">                    
                    <div className="container-fluid d-flex justify-content-start">
                        <Link to="/" className="nav-link ms-1">Home</Link>
                        <Link to="/listado" className="nav-link ms-5">Listado</Link>
                        <Link to="/contacto" className="nav-link ms-5">Contacto</Link>
                        <Link to="/favoritos" className="nav-link ms-5">Favoritos</Link>
                        <span className="nav-link ms-5 text-success">
                            { props.favorites.length > 0 && <>Peliculas en Favoritos: {props.favorites.length}</>}
                        </span>
                        <Buscador />
                        
                    </div>
                    
            </nav>
        </header>
    )
}

export default Header;