import Producto from "./Producto";

function Home(props) {
    return (
        <div className="row">
            {props.productos.map((producto) => (
                <Producto
                    key={producto.id}
                    value={producto}
                    onClick2={() => props.manejador(producto)}
                />
            ))}
        </div>
    )
}

export default Home;