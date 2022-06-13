import products from "../assets/products.json";
import Product from "./products";

export default function App() {
    return (
        <div class="container">
            <main class="main">
                <h1>
                    monchi
                </h1>
                <div class="grid">
                    {
                        products.map((product, i) => <Product {...product} key={i} />)
                    }
                </div>
            </main>
            <div
                id="snipcart"
                data-api-key="NWMwZWNkZGMtZjU2ZS00YzM3LWFlZjYtMmM5Zjk0MWViZDcxNjM3Njg0OTY0ODg5NTk4MTM3" hidden
            >
            </div>
        </div>
    );
};