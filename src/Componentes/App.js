import './App.css';
import React from 'react';
import NavbarLibros from './NavBarLibros';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Carrito from './Carrito';
import Pagar from './Pagar';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'carrito': [],
      'productos': []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Guardar los datos del carrito en local storage si ha habido cambios
    if (prevState.carrito !== this.state.carrito) {
      localStorage.setItem('carrito', JSON.stringify(this.state.carrito));
    }
  }

  componentDidMount() {
    const datosCarrito = JSON.parse(localStorage.getItem('carrito'));
    if (Array.isArray(datosCarrito)) {
      if (datosCarrito.length > 0) {
        this.setState({ 'carrito': datosCarrito })
      }
    }

    fetch("http://localhost:3500")
      .then(datos => datos.json())
      .then(datos => {
        let productos = [...this.state.productos];
        productos = datos.map(p => {
          return {
            id: p.Id,
            nombre: p.Nombre,
            precio: p.Precio,
            descripcion: p.Descripcion,
            imagen: p.Imagen
          }
        });
        productos = datos;
        this.setState({ "productos": productos });
      })
      .catch(err => {
        console.log(err);
      })
  }

  manejador(p) {
    const nuevoCarrito = [...this.state.carrito];
    if (nuevoCarrito.indexOf(p) === -1) {
      p.cantidad = 1;
      nuevoCarrito.push(p);
      this.setState({ 'carrito': nuevoCarrito });
    }
  }

  eliminarProducto(p) {
    const nuevoCarrito = [...this.state.carrito];
    const filtrado = nuevoCarrito.filter(prod => prod !== p);

    this.setState({ 'carrito': filtrado });
  }

  pagar(email) {
    let nuevoCarrito = this.state.carrito.map(p => ({
      id: p.id,
      precio: p.precio,
      cantidad: p.cantidad
    }));

    let datos = {
      'carrito': nuevoCarrito,
      'email': email
    }

    let url = "http://localhost:3500/pagar";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    })
      .then(datos => datos.json())
      .then(datos => {
        if (datos === "ok") {
          let pago = this.state.pago;
          pago.idVenta = datos.idVenta;
          pago.total = datos.total;
          this.setState({ pago: pago });
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <NavbarLibros carrito={this.state.carrito.length} />
          <Routes>
            <Route path="/" exact element={<Home productos={this.state.productos} manejador={(p) => this.manejador(p)} />}></Route>
            <Route path="/carrito" element={
              <Carrito
                cart={this.state.carrito}
                eliminarProducto={(p) => this.eliminarProducto(p)}
                pagar={(email) => { this.pagar(email) }}
              />
            } />
            <Route path="/pagar" element={<Pagar total={300} />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }

}

export default App;