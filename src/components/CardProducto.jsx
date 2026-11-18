import { useState, useEffect } from "react";

function CardProducto({
    nombre,
    precio,
    disponible,
    stock,
    onTotalChange,
    agregar,
    categoria,
    imagen
}) {
    const [contador, setContador] = useState(0);

    const iva = precio * 0.15;
    const totalUnidad = precio + iva;
    const totalCantidad = totalUnidad * contador;

    function mostrarProducto() {
        setContador(contadorAnterior => contadorAnterior + 1);
    }

    function agregarProducto() {
        agregar(nombre, precio, categoria);
    }

    useEffect(() => {
        if (onTotalChange) {
            onTotalChange(nombre, totalCantidad);
        }
    }, [nombre, totalCantidad, onTotalChange]);

    return (
        <div className="card shadow-sm" style={{ width: "18rem" }}>
            {imagen && (
                <img
                    src={imagen}
                    alt={nombre}
                    className="card-img-top bg-light"
                    style={{ height: "180px", objectFit: "contain" }}
                    loading="lazy"
                />
            )}

            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>

                <span className={`badge ${disponible ? "bg-success" : "bg-danger"}`}>
                    {disponible ? `${stock} disponibles` : "Agotado"}
                </span>

                <p className="mt-3 mb-1">Precio: ${precio.toFixed(2)}</p>
                <p className="mb-1">IVA (15 %): ${iva.toFixed(2)}</p>
                <p className="fw-semibold mb-3">
                    Precio por unidad con IVA: ${totalUnidad.toFixed(2)}
                </p>

                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={mostrarProducto}
                    >
                        Agregar
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={agregarProducto}
                    >
                        Comprar
                    </button>
                </div>

                <div className="border-top mt-3 pt-3">
                    <p className="mb-1">Cantidad: {contador}</p>
                    <p className="fw-bold mb-0">
                        Total por cantidad: ${totalCantidad.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CardProducto;