function Carrito(props) {
    return (
        <div className="row">
            <h1>Carrito</h1>
            {props.cart.map((producto) => (
                <p>{producto.nombre}</p>
            ))}
        </div>
    );
}

export default Carrito;