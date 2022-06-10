import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'react-devtools';

//Redux
import { loadUser } from './actions/authActions';
import store from './store';
import { Provider } from 'react-redux';

//Components
import Navigation from './components/navigation';
import Login from './components/login';

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Router>
        <Provider store={store}>
          <Navigation/>
          <Switch>
            <Route path="/login" exact>
              <Login/>
            </Route>
          </Switch>
        </Provider>
      </Router>
    );
  };
};

export default App;
