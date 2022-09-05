import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = {
    path: window.location.pathname
  };

  handleClick = (e) => {
    this.setState({
      path: e.target.name
    })
  }

  render() {
    return (
      <header>
        <ul>
          <li><Link to="/" name="/" onClick={this.handleClick} className={this.state.path === "/" ? "active" : ""}>Home</Link></li>
          <li><Link to="/saved" name="/saved" onClick={this.handleClick} className={this.state.path === "/saved" ? "active" : ""}>Saved Books</Link></li>
        </ul>
      </header>
    )
  }
};

export default Header;