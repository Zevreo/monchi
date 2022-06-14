import React, { Component } from 'react';
import ReactDOM from "react-dom";
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
import Perfil from './components/perfil';
import MakeStore from './components/store/makeStore';
import MyStore from './components/store/myStore';

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
            <Route path="/" element={<Welcome />} exact/>
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />}/>
          </Routes>
          <Routes>
            <Route path="/register" element={<Register />}/>
          </Routes>
          <Routes>
            <Route path="/perfil" element={<Perfil />}/>
          </Routes>
          <Routes>
            <Route path="/makeStore" element={<MakeStore />}/>
          </Routes>
          <Routes>
            <Route path="/myStore" element={<MyStore />}/>
          </Routes>
        </Provider>
      </Router>
    );
  };
};

// debugger; // TO INSPECT THE PAGE BEFORE 1ST RENDER

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;