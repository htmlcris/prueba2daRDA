import { useState } from "react";
import CardProducto from '../components/CardProducto';
import SeccionCategoria from '../components/seccionCategoria';

function Productos({agregar}) {

    // Totales individuales de los productos
    const [pilsener, setPilsener] = useState(0);
    const [club, setClub] = useState(0);
    const [caran, setCaran] = useState(0);

    const [kachitos, setKachitos] = useState(0);
    const [papitas, setPapitas] = useState(0);
    const [cueritos, setCueritos] = useState(0);

    const [cocacola, setCocacola] = useState(0);
    const [pepsi, setPepsi] = useState(0);
    const [sevenup, setSevenup] = useState(0);

    const [kipitos, setKipitos] = useState(0);
    const [perlitas, setPerlitas] = useState(0);
    const [chicles, setChicles] = useState(0);

    // Sumar los totales de todos los productos
    let totalGeneral = pilsener + club + caran +
                       kachitos + papitas + cueritos +
                       cocacola + pepsi + sevenup +
                       kipitos + perlitas + chicles;

    return (
        <div className="bg bg-info p-3 min-vh-100">

            <div className="row">

                <div className="col-lg-9">

                    <h3 className="badge bg-secondary">
                        Mi lista de productos
                    </h3>

                    <div className="row g-3">

                        <CardProducto
                            nombre="Pilsener"
                            precio={5}
                            disponible={false}
                            stock={16}
                            onTotalChange={(nombre, total) => setPilsener(total)}
                            agregar={agregar}
                            categoria="licores"

                        />

                        <CardProducto
                            nombre="Club"
                            precio={6}
                            disponible={true}
                            stock={6}
                            onTotalChange={(nombre, total) => setClub(total)}
                            agregar={agregar}
                            categoria="licores"

                        />

                        <CardProducto
                            nombre="Caran"
                            precio={10}
                            disponible={true}
                            stock={4}
                            onTotalChange={(nombre, total) => setCaran(total)}
                            agregar={agregar}
                            categoria="licores"

                        />

                        <h3 className="mb-3">Secciones</h3>

                        <SeccionCategoria titulo="Snacks">

                            <CardProducto
                                nombre="Kachitos"
                                precio={0.5}
                                disponible={true}
                                stock={30}
                                onTotalChange={(nombre, total) => setKachitos(total)}
                                agregar={agregar}
                            />

                            <CardProducto
                                nombre="Papitas"
                                precio={1}
                                disponible={true}
                                stock={5}
                                onTotalChange={(nombre, total) => setPapitas(total)}
                                agregar={agregar}
                            />

                            <CardProducto
                                nombre="Cueritos"
                                precio={1.5}
                                disponible={true}
                                stock={25}
                                onTotalChange={(nombre, total) => setCueritos(total)}
                                agregar={agregar}                            />

                        </SeccionCategoria>

                        <SeccionCategoria titulo="Bebidas">

                            <CardProducto
                                nombre="Coca-Cola"
                                precio={1}
                                disponible={true}
                                stock={30}
                                onTotalChange={(nombre, total) => setCocacola(total)}
                                agregar={agregar}
                            />

                            <CardProducto
                                nombre="Pepsi"
                                precio={1.5}
                                disponible={true}
                                stock={5}
                                onTotalChange={(nombre, total) => setPepsi(total)}
                                agregar={agregar}
                            />

                            <CardProducto
                                nombre="7-UP"
                                precio={0.75}
                                disponible={true}
                                stock={25}
                                onTotalChange={(nombre, total) => setSevenup(total)}
                                agregar={agregar}
                            />

                        </SeccionCategoria>

                        <SeccionCategoria titulo="Dulces">

                            <CardProducto
                                nombre="Kipitos"
                                precio={0.25}
                                disponible={true}
                                stock={10}
                                onTotalChange={(nombre, total) => setKipitos(total)}
                                agregar={agregar}
                            />

                            <CardProducto
                                nombre="Perlitas"
                                precio={0.05}
                                disponible={true}
                                stock={5}
                                onTotalChange={(nombre, total) => setPerlitas(total)}
                                agregar={agregar}
                            />

                            <CardProducto
                                nombre="Chicles"
                                precio={0.5}
                                disponible={true}
                                stock={25}
                                onTotalChange={(nombre, total) => setChicles(total)}
                                agregar={agregar}
                            />

                        </SeccionCategoria>

                    </div>
                </div>
            </div>

            {/* Formulario fijo a la derecha */}

            <div className="position-fixed top-50 end-0 translate-middle-y bg-light p-4 rounded shadow m-3 col-3">

                <h4 className="text-center mb-4">
                    Datos del Cliente
                </h4>

                <form onSubmit={(e) => e.preventDefault()}>

                    <div className="mb-3">
                        <label className="form-label">
                            Nombre del cliente
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese su nombre"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Ciudad
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese su ciudad"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Edad
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Ingrese su edad"
                            min="1"
                            required
                        />
                    </div>

                    {/* Total general de productos */}

                    <div className="mb-3">

                        <label className="form-label fw-bold">
                            Total de productos
                        </label>

                        <div className="alert alert-success text-center">

                            <h4 className="mb-0">
                                ${totalGeneral.toFixed(2)}
                            </h4>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Guardar
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Productos;