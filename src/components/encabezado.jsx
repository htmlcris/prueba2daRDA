import { Link } from 'react-router-dom'

function encabezado({titulo}){
    return(
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">TIENDA</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/productos">Productos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/contactos">Contactos</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/compras">Compras</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/Catalogoweb">Catalogo Web</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/ofertas">Ofertas</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
}

export default encabezado;