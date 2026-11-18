
import { useState } from "react";

const TASA_ICE = 0.10;

function Compras({ lista, guardarCompra }) {

    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [genero, setGenero] = useState("");
    const [factura, setFactura] = useState(null);

    // Datos del cliente
    const edadCliente = Number(edad);

    const edadValida =
        edad !== "" &&
        Number.isInteger(edadCliente) &&
        edadCliente >= 1;

    const esMenor = edadValida && edadCliente < 18;

    // Calcular porcentaje de IVA
    let tasaIva = 0;

    if (edadValida) {
        if (edadCliente < 18) {
            tasaIva = 0;
        } else if (edadCliente <= 65) {
            tasaIva = 0.15;
        } else {
            tasaIva = 0.08;
        }
    }

    // Filtrar licores si el cliente es menor
    const productosFacturables = esMenor
        ? lista.filter(
            producto => producto.categoria !== "licores"
        )
        : lista;

    const licoresExcluidos =
        lista.length - productosFacturables.length;

    // Calcular subtotal
    let subtotal = 0;
    let subtotalLicores = 0;

    for (let i = 0; i < productosFacturables.length; i++) {

        const producto = productosFacturables[i];

        // Las ofertas ya incluyen el IVA del 15%
        let precioBase = producto.precio;

        if (producto.descuento > 0) {
            precioBase = producto.precio / 1.15;
        }

        subtotal = subtotal + precioBase;

        if (producto.categoria === "licores") {
            subtotalLicores =
                subtotalLicores + precioBase;
        }
    }

    // Calcular impuestos
    const iva = subtotal * tasaIva;

    const ice = edadValida
        ? subtotalLicores * TASA_ICE
        : 0;

    // Total de compra
    const total = subtotal + iva + ice;

    // Generar factura
    function generarFactura(evento) {

        evento.preventDefault();

        if (
            !edadValida ||
            !nombre.trim() ||
            !ciudad ||
            !genero ||
            productosFacturables.length === 0
        ) {
            return;
        }

        setFactura({
            nombre: nombre.trim(),
            edad: edadCliente,
            ciudad,
            genero,
            productos: [...productosFacturables],
            subtotal,
            iva,
            ice,
            tasaIva,
            total
        });
    }

    // Guardar compra
    function guardar() {

        guardarCompra();

        setFactura(null);
        setNombre("");
        setEdad("");
        setCiudad("");
        setGenero("");
    }

    return (
        <section className="container py-4 py-md-5">

            <header className="mb-4">

                <h1 className="h2 fw-bold mb-1">
                    Mis compras
                </h1>

                <p className="text-muted mb-0">
                    Productos seleccionados:
                    <strong> {lista.length}</strong>
                </p>

            </header>

            <form
                className="row g-4"
                onSubmit={generarFactura}
            >

                <div className="col-12 col-lg-8">

                    {/* DATOS DEL CLIENTE */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body p-4">

                            <h2 className="h5 mb-3">
                                Datos del cliente
                            </h2>

                            <div className="row g-3">

                                <div className="col-12 col-md-8">

                                    <label className="form-label">
                                        Nombre del cliente
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-12 col-md-4">

                                    <label className="form-label">
                                        Edad
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        step="1"
                                        value={edad}
                                        onChange={(e) =>
                                            setEdad(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-12 col-md-6">

                                    <label className="form-label">
                                        Ciudad
                                    </label>

                                    <select
                                        className="form-select"
                                        value={ciudad}
                                        onChange={(e) =>
                                            setCiudad(e.target.value)
                                        }
                                        required
                                    >

                                        <option value="">
                                            Selecciona una ciudad
                                        </option>

                                        <option value="Ibarra">
                                            Ibarra
                                        </option>

                                        <option value="Quito">
                                            Quito
                                        </option>

                                        <option value="Otavalo">
                                            Otavalo
                                        </option>

                                        <option value="Cotacachi">
                                            Cotacachi
                                        </option>

                                    </select>

                                </div>

                                <div className="col-12 col-md-6">

                                    <label className="form-label">
                                        Género
                                    </label>

                                    <select
                                        className="form-select"
                                        value={genero}
                                        onChange={(e) =>
                                            setGenero(e.target.value)
                                        }
                                        required
                                    >

                                        <option value="">
                                            Selecciona una opción
                                        </option>

                                        <option value="Femenino">
                                            Femenino
                                        </option>

                                        <option value="Masculino">
                                            Masculino
                                        </option>

                                        <option value="Otro">
                                            Otro
                                        </option>

                                        <option value="Prefiero no indicarlo">
                                            Prefiero no indicarlo
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* PRODUCTOS SELECCIONADOS */}

                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                        <div className="card-header bg-light px-4 py-3">

                            <h2 className="h5 mb-0">
                                Productos seleccionados
                            </h2>

                        </div>

                        {lista.length === 0 ? (

                            <p className="text-muted text-center p-4 mb-0">
                                Tu lista de compras está vacía.
                            </p>

                        ) : (

                            <ul className="list-group list-group-flush">

                                {lista.map((producto, indice) => {

                                    const excluido =
                                        esMenor &&
                                        producto.categoria === "licores";

                                    return (

                                        <li
                                            key={indice}
                                            className="list-group-item d-flex justify-content-between align-items-center gap-3 px-4 py-3"
                                        >

                                            <div>

                                                <span>
                                                    {producto.nombre}
                                                </span>

                                                {producto.descuento > 0 && (

                                                    <p className="text-muted mb-0">

                                                        Ahorro:
                                                        ${producto.descuento.toFixed(2)}

                                                    </p>

                                                )}

                                            </div>

                                            {excluido ? (

                                                <span className="badge bg-warning text-dark">
                                                    Fuera de la factura
                                                </span>

                                            ) : (

                                                <strong>
                                                    ${producto.precio.toFixed(2)}
                                                </strong>

                                            )}

                                        </li>

                                    );

                                })}

                            </ul>

                        )}

                    </div>

                </div>

                {/* RESUMEN DE COMPRA */}

                <div className="col-12 col-lg-4">

                    <div className="card bg-dark text-white border-0 shadow rounded-4">

                        <div className="card-body p-4">

                            <h2 className="h5 mb-4">
                                Resumen de compra
                            </h2>

                            <div className="d-flex justify-content-between mb-2">

                                <span>Subtotal</span>

                                <span>
                                    ${subtotal.toFixed(2)}
                                </span>

                            </div>

                            <div className="d-flex justify-content-between mb-2">

                                <span>
                                    IVA ({tasaIva * 100}%)
                                </span>

                                <span>
                                    {edadValida
                                        ? `$${iva.toFixed(2)}`
                                        : "Pendiente"}
                                </span>

                            </div>

                            <div className="d-flex justify-content-between mb-2">

                                <span>ICE</span>

                                <span>
                                    {edadValida
                                        ? `$${ice.toFixed(2)}`
                                        : "Pendiente"}
                                </span>

                            </div>

                            <div className="d-flex justify-content-between align-items-center border-top border-secondary mt-3 pt-3">

                                <strong>
                                    Total a pagar
                                </strong>

                                <strong className="fs-4 text-warning">

                                    {edadValida
                                        ? `$${total.toFixed(2)}`
                                        : "Pendiente"}

                                </strong>

                            </div>

                            {licoresExcluidos > 0 && (

                                <p className="alert alert-warning mt-3">

                                    Se excluyeron {licoresExcluidos}
                                    productos de licores porque
                                    el cliente es menor de edad.

                                </p>

                            )}

                            <button
                                type="submit"
                                className="btn btn-warning fw-semibold w-100 mt-4"
                                disabled={
                                    !edadValida ||
                                    productosFacturables.length === 0
                                }
                            >
                                Generar factura
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-light w-100 mt-2"
                                onClick={guardar}
                                disabled={lista.length === 0}
                            >
                                Guardar compra
                            </button>

                        </div>

                    </div>

                </div>

            </form>

            {/* FACTURA GENERADA */}

            {factura && (

                <div className="card shadow-sm mt-4">

                    <div className="card-body p-4">

                        <h2 className="h4 mb-3">
                            Factura generada
                        </h2>

                        <p>
                            <strong>Cliente:</strong> {factura.nombre}
                        </p>

                        <p>
                            <strong>Edad:</strong> {factura.edad}
                        </p>

                        <p>
                            <strong>Ciudad:</strong> {factura.ciudad}
                        </p>

                        <p>
                            <strong>Género:</strong> {factura.genero}
                        </p>

                        <h5>Productos comprados</h5>

                        <ul>

                            {factura.productos.map((producto, indice) => (

                                <li key={indice}>

                                    {producto.nombre} -
                                    ${producto.precio.toFixed(2)}

                                </li>

                            ))}

                        </ul>

                        <hr />

                        <p>
                            Subtotal: ${factura.subtotal.toFixed(2)}
                        </p>

                        <p>
                            IVA: ${factura.iva.toFixed(2)}
                        </p>

                        <p>
                            ICE: ${factura.ice.toFixed(2)}
                        </p>

                        <h4>
                            Total: ${factura.total.toFixed(2)}
                        </h4>

                    </div>

                </div>

            )}

        </section>
    );
}

export default Compras;
