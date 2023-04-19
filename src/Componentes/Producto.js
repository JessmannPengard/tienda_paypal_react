
import { OverlayTrigger, Popover, Button, Card } from 'react-bootstrap';

function Producto(props) {
    return (
        <Card style={{ width: '18rem', position: 'relative' }}>
            <OverlayTrigger
                trigger="hover"
                placement="bottom"
                overlay={<Popover style={{ position: 'absolute', top: '50px', left: '250px' }}>
                    <Popover.Header as="h3">{props.value.nombre}</Popover.Header>
                    <Popover.Body>
                        {props.value.descripcion}
                    </Popover.Body>
                </Popover>}>
                <Card.Img data-bs-trigger="hover" className="card-img-top" height="300px" data-bs-toggle="popover" data-bs-content={props.value.descripcion} variant="top" src={props.value.imagen} />
            </OverlayTrigger>
            <Card.Body>
                <Card.Title>{props.value.nombre}</Card.Title>
                <Card.Text>
                    {props.value.precio}€
                </Card.Text>
                <Button onClick={() => { props.onClick2() }} variant="primary">Añadir al carrito</Button>
            </Card.Body>
        </Card>

    );
}


export default Producto;