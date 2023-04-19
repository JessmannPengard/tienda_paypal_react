import './App.css';
import React from 'react';
import Producto from './Producto';
import NavbarLibros from './NavBarLibros';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'carrito': [4],
      'productos': [{
        id: 1,
        nombre: "Learn PHP 7",
        imagen: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4842/9781484217290.jpg",
        descripcion: "This new book on PHP 7 introduces writing solid, secure, object-oriented code in the new PHP 7: you will create a complete three-tier application using a natural process of building and testing modules within each tier. This practical approach teaches you about app development and introduces PHP features when they are actually needed rather than providing you with abstract theory and contrived examples.",
        precio: 300
      },
      {
        id: 2,
        nombre: "Learn PHP 7",
        imagen: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4842/9781484217290.jpg",
        descripcion: "This new book on PHP 7 introduces writing solid, secure, object-oriented code in the new PHP 7: you will create a complete three-tier application using a natural process of building and testing modules within each tier. This practical approach teaches you about app development and introduces PHP features when they are actually needed rather than providing you with abstract theory and contrived examples.",
        precio: 300
      },
      {
        id: 3,
        nombre: "Learn PHP 7",
        imagen: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4842/9781484217290.jpg",
        descripcion: "This new book on PHP 7 introduces writing solid, secure, object-oriented code in the new PHP 7: you will create a complete three-tier application using a natural process of building and testing modules within each tier. This practical approach teaches you about app development and introduces PHP features when they are actually needed rather than providing you with abstract theory and contrived examples.",
        precio: 300
      }
      ]
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

  render() {
    return (
      <div className="container">
        <NavbarLibros carrito={this.state.carrito.length} />
        <div className="row">
          {this.state.productos.map((producto) => (
            <Producto
              key={producto.id}
              value={producto}
              onClick2={() => this.manejador(producto)}
            />
          ))}
        </div>
      </div>
    );
  }
  manejador(p) {
    const nuevoCarrito = [...this.state.carrito];
    nuevoCarrito.push(p);
    this.setState({ 'carrito': nuevoCarrito });
  }
}

export default App;