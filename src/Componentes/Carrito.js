function Carrito(props) {
    let total = 0;
    props.cart.map(p => total += parseFloat(p.cantidad * p.precio));

    return (
        <div className="row">
            <h3>Lista del carrito</h3>
            <div class="table-responsive">
                <table class="table table-light table-bordered">
                    <thead>
                        <tr>
                            <th width="40%" scope="col">Descripción</th>
                            <th width="15%" scope="col">Cantidad</th>
                            <th width="20%" scope="col">Precio</th>
                            <th width="20%" scope="col">Total</th>
                            <th width="5%" scope="col">--</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.cart.map((producto) => (
                            <tr>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.cantidad * producto.precio} €</td>
                                <td>
                                    <button onClick={() => props.eliminarProducto(producto)} class="btn btn-danger" type="submit" value="Eliminar" name="btnAccion">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {props.cart.length !== 0 ?
                            <tr>
                                <td colspan="5">
                                    <form onSubmit={(e) => { e.preventDefault(); props.pagar(document.getElementById("email").value) }} action="">
                                        <div class="alert alert-success" role="alert">
                                            <div class="mb-3">
                                                <label for="" class="form-label">Email</label>
                                                <input type="email" name="email" id="email" class="form-control" placeholder="Escribe aquí tu email" required></input>
                                            </div>
                                            <small id="emailHelp" class="text-muted">Los productos se enviarán a este Email</small>
                                        </div>
                                        <div class="d-grid gap-2">
                                            <button type="submit" class="btn btn-primary btn-lg btn-block" name="btnAccion" value="Proceder">Proceder a pagar</button>
                                        </div>
                                    </form>
                                </td>
                            </tr>
                            : null}
                        <tr>
                            <td colspan="3" align="right">
                                <h3>Total</h3>
                            </td>
                            <td colspan="2" align="right">
                                <h3>{total} €</h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    );
}

export default Carrito;