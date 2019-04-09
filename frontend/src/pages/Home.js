import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-unfetch'

class Home extends Component {
  static async getInitialProps({ req, res, match }) {
    const users = await fetch('http://localhost:1337/user')
    const user = await users.json()
    return { user };
  }

  render() {
    console.log(this.props.user)
    return (
      <div className="Home">
        <p className="Home-intro">
          Hello, {this.props.user ? this.props.user[0].firstName : '...'}
        </p>
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

export default Home;
