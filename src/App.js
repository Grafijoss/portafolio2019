import React, { Component } from 'react';
import './App.scss';
import Face from './components/face'
import Menuicons from './components/menuicons'
import Perfil from './components/perfil'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import reducer from './reducers/data'

const initialState = {
	aniStep: 0,
	openRight: false
}

const store = createStore(
  reducer,
	initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {

	componentDidMount (prev_props, prev_state) {
		// this.props.history.push('/home')
	}

  render() {
    return (
			<div className="App">
			<BrowserRouter>
				<Provider 
				store={store}>
					<Face />	
					{/* <Redirect from="/" to="/home"/> */}
					<Route exact path="/" component={Menuicons} />
					<Route exact path="/perfil" component={Perfil} />
				</Provider>
			</BrowserRouter>
			</div>
    );
  }
}

export default App;
