
import { useNavigate } from "react-router-dom";

function TarjetaOferta({
    nombre,
    precio,
    descuento,
    agregar,
    ahorro
}) {

    const navegar = useNavigate();

    // Calcular descuento
    const valorDescuento = precio * descuento / 100;

    // Precio con descuento
    const precioFinal = precio - valorDescuento;

    // Calcular IVA del 15%
    const iva = precioFinal * 0.15;

    // Precio final con IVA
    const precioFinalIva = precioFinal + iva;

    function agregarProducto() {

        // Enviar nombre, precio y descuento a App.jsx
        agregar(nombre, precioFinalIva, "", valorDescuento);

        // Redirigir a compras
        navegar("/compras");
    }

    return (
        <div>

            {/* Mostrar ahorro únicamente si fue agregado */}
            {ahorro !== undefined && (
                <p>
                    Ahorraste: {ahorro.toFixed(2)}$
                </p>
            )}

            <div
                className="card shadow-sm"
                style={{ width: "18rem" }}
            >

                <div className="card-body">

                    <h5 className="card-title">
                        {nombre}
                    </h5>

                    <span
                        className={`badge ${
                            descuento ? "bg-danger" : "bg-secondary"
                        }`}
                    >
                        {descuento >= 0.1
                            ? "Gran Oferta"
                            : "Oferta"}
                    </span>

                    <p className="mt-3 mb-1">
                        Antes: ${precio.toFixed(2)}
                    </p>

                    <p className="mb-1">
                        Descuento: {descuento.toFixed(2)}%
                        (-${valorDescuento.toFixed(2)})
                    </p>

                    <p className="mb-1">
                        Ahora: ${precioFinal.toFixed(2)}
                    </p>

                    <p className="fw-semibold mb-3">
                        CON IVA: ${precioFinalIva.toFixed(2)}
                    </p>

                    <div className="d-flex gap-2">

                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={agregarProducto}
                        >
                            Agregar
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TarjetaOferta;
