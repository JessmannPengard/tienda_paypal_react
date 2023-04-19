import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarLibros(props) {

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Tienda</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className='nav-link'>Home</Link>
                    <Link to="/carrito" className='nav-link'>Carrito({props.carrito})</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarLibros;