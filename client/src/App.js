import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-devtools';

//Redux
import { loadUser } from './actions/authActions';
import store from './store';
import { Provider } from 'react-redux';

//COMPONENTS
import Navigation from './components/navigation';
import Login from './components/user/login';
import Register from './components/user/register';
import Dashboard from './components/user/dashboard';
import MakeStore from './components/store/makeStore';
import MyStore from './components/store/myStore';
import NewAddress from './components/user/direcciones/newAddress';
import ParamsTest from './components/paramsTest';
import Footer from './components/footer';
import CreateProduct from './components/productos/createProductHook';
import EditProduct from './components/productos/editProduct';
import AllProducts from './components/productos/Allproducts';
import SingleProduct from './components/productos/singleproduct';
import Results from './components/results';
import PaginateProducts from './components/productos/paginateproducts';
import ShoppingCart from './components/user/shoppingcart';
import MySales from './components/store/mySales';

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
            <Route path="/" element={<AllProducts />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Dashboard />} />
            <Route path="/makeStore" element={<MakeStore />} />
            <Route path="/myStore" element={<MyStore />} />
            <Route path="/newAddress" element={<NewAddress />} />
            <Route path="/paramstest/:id&page=:page&search=:search" element={<ParamsTest />} />
            <Route path="/paramstest/:id&page=:page" element={<ParamsTest />} />
            <Route path="/paramstest/:id" element={<ParamsTest />} />
            <Route path="/paramstest" element={<ParamsTest />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/results/search=:search" element={<Results />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
            <Route path="/paginater" element={<PaginateProducts />} />
            <Route path="/mySales" element={<MySales />} />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    );
  };
};

// debugger; // TO INSPECT THE PAGE BEFORE 1ST RENDER

export default App;