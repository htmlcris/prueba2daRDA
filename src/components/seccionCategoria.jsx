function SeccionCategoria({titulo, children}) {
  return (
    <section className="mb-4">
        <h3 className="border-bottom">{titulo}</h3>
        <div className="row">
            {children}
        </div>
    </section> 
  );
}

export default SeccionCategoria;