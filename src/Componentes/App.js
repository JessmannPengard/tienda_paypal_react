import './App.css';
import React from 'react';
import NavbarLibros from './NavBarLibros';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Carrito from './Carrito';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'carrito': [],
      'productos': []
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <Router>
        <div className="container">
          <NavbarLibros carrito={this.state.carrito.length} />
          <Routes>
            <Route path="/" exact element={<Home productos={this.state.productos} manejador={(p) => this.manejador(p)} />}></Route>
            <Route path="/carrito" element={<Carrito cart={this.state.carrito} eliminarProducto={(p) => this.eliminarProducto(p)} />} />
          </Routes>
        </div>
      </Router>
    );
  }

}

export default App;