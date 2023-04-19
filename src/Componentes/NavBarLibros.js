import { Navbar, Nav } from 'react-bootstrap';

function NavbarLibros(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Tienda</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#inicio">Home</Nav.Link>
                    <Nav.Link href="#carrito">Carrito({props.carrito})</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarLibros;