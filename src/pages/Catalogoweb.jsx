import { useState, useEffect } from 'react';
import CardProducto from "../components/CardProducto.jsx";

function Catalogo() {
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error en la respuesta");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos.products);
        setCargando(false);
      })
      .catch(() => {
        setError("No se cargaron los datos");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (error !== "") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="d-flex flex-wrap gap-3">
      {productos.map((item) => (
        <CardProducto
        key={item.id}
        nombre={item.title}
        precio={item.price}
        disponible={item.stock > 0}
        stock={item.stock}
        categoria={item.category}
        imagen={item.thumbnail}
        agregar={() => console.log("Producto comprado:", item.title)}
        />
      ))}
    </div>
  );
}

export default Catalogo;
