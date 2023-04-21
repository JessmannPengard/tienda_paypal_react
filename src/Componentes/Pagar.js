import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Pagar(props) {
    return (
        <div class="p-5 mb-4 bg-light rounded-3 text-center">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Paso final</h1>
                <p>Estás a punto de pagar con paypal la cantidad de:</p>
                <h4>{props.total} €</h4>
                <div id="paypal-button-container"></div>
                <p>Los productos podrán ser descargados una vez se procese el pago.</p>
                <strong>Para aclaraciones contacto@jessmann.com</strong>

                <PayPalScriptProvider options={{ "client-id": "test" }}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: props.total,
                                            currency: 'EUR'
                                        },
                                        description: 'Compra en la tienda',
                                        reference_id: props.id
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const name = details.payer.name.given_name;
                                alert(`Transaction completed by ${name}`);
                                fetch("http://localhost:3500/confirmarpago", {
                                    method: "POST",
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        datos: details
                                    })
                                }).then(data => data.text())
                                    .then(datos => {
                                        console.log(datos);
                                        window.location = "descargas.php";
                                    }).catch(err => {
                                        console.log(err);
                                    });
                            });
                        }}
                        onCancel={(data, actions) => {
                            alert('Pago cancelado');
                            console.log(data);
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    );
}