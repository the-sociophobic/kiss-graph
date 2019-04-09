import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-unfetch'

class Home extends Component {
  static async getInitialProps({ req, res, match }) {
    const stuff = await fetch('http://localhost:1337/user')
    return { stuff };
  }

  render() {
    return (
      <div className="Home">
        <p className="Home-intro">
          To get started, edit <code>src/Home.js</code> or{' '}
          <code>src/About.js</code>and save to reload.
        </p>
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

export default Home;
