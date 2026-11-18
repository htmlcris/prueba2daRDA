{lista.map((producto, indice) => {
    const excluido =
        esMenor && producto.categoria === 'licores';

    return (
        <li
            key={indice}
            className="list-group-item d-flex justify-content-between align-items-center gap-3 px-4 py-3"
        >
            <span>{producto.nombre}</span>

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

export default Compras;