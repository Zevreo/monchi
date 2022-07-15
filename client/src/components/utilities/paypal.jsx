import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal(props) {
    const initialOptions = {
        "client-id": "AZ0vcv8OYdUrnj24cTQlXiINGLLg5YOLqOvSZc1eVztmox_2VMdEnbw5oo7hgIVNqo0zXTzozpSBS0c5",
        "currency": props.user.DefaultCoin,
        "intent": "capture"
    };
    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons style={{ layout: "vertical", shape: 'pill' }}
                forceReRender={[props.Total, props.user.DefaultCoin]}
                createOrder={async (data, actions) => {
                    const orderId = await actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: props.user.DefaultCoin,
                                        value: props.Total,
                                    },
                                },
                            ],
                        });
                    return orderId;
                }}
                onApprove={async function (data, actions) {
                    await actions.order.capture();
                    props.setCapture(data);
                }} />
        </PayPalScriptProvider>
    )
}