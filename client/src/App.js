import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-devtools';

//Redux
import { loadUser } from './actions/authActions';
import store from './store';
import { Provider } from 'react-redux';

//Components
import Navigation from './components/navigation';
import Login from './components/login';
import Register from './components/register';
import Welcome from './components/welcome';
import Perfil from './components/perfil';
import MakeStore from './components/store/makeStore';
import MyStore from './components/store/myStore';
import NewAddress from './components/direcciones/newAddress';
import ParamsTest from './components/paramsTest';
import Footer from './components/footer';
import CreateProduct from './components/productos/createProduct';

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Welcome />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/makeStore" element={<MakeStore />} />
            <Route path="/myStore/page=:page" element={<MyStore />} />
            <Route path="/myStore" element={<MyStore />} />
            <Route path="/newAddress" element={<NewAddress />} />
            <Route path="/paramstest/:id&page=:page&search=:search" element={<ParamsTest />} />
            <Route path="/paramstest/:id&page=:page" element={<ParamsTest />} />
            <Route path="/paramstest/:id" element={<ParamsTest />}/>
            <Route path="/paramstest" element={<ParamsTest />}/>
            <Route path="/createProduct" element={<CreateProduct />} />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    );
  };
};

// debugger; // TO INSPECT THE PAGE BEFORE 1ST RENDER

export default App;