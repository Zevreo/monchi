import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import Footer from './components/footer';

export class App extends Component {
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
          <Routes>
            <Route path="/welcome" element={<Welcome />}/>
          </Routes>
          <Footer/>
        </Provider>
      </Router>
    );
  };
};

export default App;
