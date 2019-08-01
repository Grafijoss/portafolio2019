import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';

class Header extends Component {
  /* estado */
  state = {
    prueba: 'jghugug ugiugug'
  }
  /* estado */
  /* methods */
  clickPrueba = (event) => {
    // console.log(this.props.title)
    this.setState({ prueba: 'si cambioo' })
    console.log(this.state.prueba)
  }
  /* methods */
  render() {
    return (
      <header className="App-header">
        <img 
        onClick={this.clickPrueba}
        src={logo} 
        className="App-logo" 
        alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reloadddd. si si si
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    );
  }
}

Header.PropTypes = {

}

export default Header;