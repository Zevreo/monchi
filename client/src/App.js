import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'react-devtools';
import "./index.css"
import "./App.css"
import products from "./assets/products.json"
import Product from "./components/Product";


//Redux
import { loadUser } from './actions/authActions';
import store from './store';
import { Provider } from 'react-redux';

//Components
import Navigation from './components/navigation';
import Login from './components/login';
import Register from './components/register';

/*export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Router>
        <Provider store={store}>
          <Navigation/>
          <Routes>
            <Route path="/login" element={<Login />}/>
          </Routes>
          <Routes>
            <Route path="/register" element={<Register />}/>
          </Routes>
        </Provider>
      </Router>
    );
  };
};*/
//export default App;
export default function App() {
  return (
      <div className={"container"}>
        <main className={"main"}>
          <h1>
            monchi
          </h1>

          <div className={"grid"}>
            {
              products.map((product, i) => <Product {...product} key={i}/>)
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