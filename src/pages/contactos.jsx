export default function Contactos() {
    return (
        <form action="mailto:tucorreo@ejemplo.com" method="POST" encType="text/plain">
            <label htmlFor="nombre">Tu Nombre:</label>
            <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Escribe tu nombre..." 
                required 
            />
            
            <label htmlFor="mensaje">Escribe tu mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="5" cols="30" placeholder="Escribe aquí..." required></textarea>

            <button type="submit">Enviar mensaje</button>
        </form>
    );
}